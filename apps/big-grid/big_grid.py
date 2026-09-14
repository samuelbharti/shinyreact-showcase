"""Pure computation for the grid. No Shiny here.

A million order rows. They are generated rather than stored, from a hash of
the row number, which gives the same answer in JavaScript, Python and R. A
million rows as a file would be about thirteen megabytes, and as a payload
it would be worse.

The split this app is about:

  The client holds the same million rows as columnar typed arrays and sorts
  and filters them locally. Sorting is a permutation of an index array, and
  it never touches the server.

  The server can do exactly the same work, and this app makes it do so on
  demand. That is the comparison: the same question, answered both ways,
  with the round trip counter running.
"""

from __future__ import annotations

from dataclasses import dataclass
from functools import cached_property

import numpy as np

N_ROWS = 1_000_000

REGIONS = ["North", "South", "East", "West", "Central", "Coastal"]
CATEGORIES = ["Hardware", "Software", "Services", "Support", "Training"]
STATUSES = ["shipped", "pending", "returned", "cancelled"]
# Roughly what an order book looks like: most ship, a few do not.
STATUS_WEIGHTS = [0.72, 0.18, 0.07, 0.03]

# Days covered, counted from the epoch date below.
DAY_SPAN = 1_095
EPOCH = "2023-01-01"

COLUMNS = ["id", "date", "region", "category", "status", "quantity", "amount"]
SORTABLE = set(COLUMNS)


def hash_unit(index: np.ndarray, salt: int) -> np.ndarray:
    """A repeatable value in 0 to 1, from a row number and a salt.

    The multiplier on `index` is deliberately small. With a large one the
    argument to sin reaches into the hundreds of millions for a million rows,
    where JavaScript, numpy and R can disagree in the last bit, and a
    fractional part turns that into a visibly different row. At this scale
    the argument stays under fifteen thousand and all three agree.
    """
    raw = np.sin(index * 0.0137 + salt * 7.919) * 43758.5453
    return raw - np.floor(raw)


@dataclass(frozen=True, eq=False)
class Orders:
    n: int

    @cached_property
    def index(self) -> np.ndarray:
        return np.arange(self.n, dtype=np.float64)

    @cached_property
    def region(self) -> np.ndarray:
        return (hash_unit(self.index, 1) * len(REGIONS)).astype(np.uint8)

    @cached_property
    def category(self) -> np.ndarray:
        return (hash_unit(self.index, 2) * len(CATEGORIES)).astype(np.uint8)

    @cached_property
    def status(self) -> np.ndarray:
        edges = np.cumsum(STATUS_WEIGHTS)
        return np.searchsorted(edges, hash_unit(self.index, 3)).astype(np.uint8)

    @cached_property
    def day(self) -> np.ndarray:
        """Days since EPOCH, weighted towards recent orders.

        The skews here and below are whole number powers on purpose. A
        fractional exponent costs R about 190 ms per column on a million
        rows, which is most of a second of the startup budget for three of
        them, and it buys a distribution shape that a square or a cube gives
        just as well.
        """
        u = hash_unit(self.index, 4)
        skew = 2 * u - u * u
        return np.rint(skew * DAY_SPAN).astype(np.uint16)

    @cached_property
    def quantity(self) -> np.ndarray:
        # Small orders are common, large ones are not.
        u = hash_unit(self.index, 5)
        return np.rint(1 + u * u * u * 240).astype(np.uint16)

    @cached_property
    def amount(self) -> np.ndarray:
        """Order value in whole pence, so it stays an integer on the wire."""
        u = hash_unit(self.index, 6)
        unit = 400 + u * u * 48_000
        return np.rint(unit * self.quantity / 100).astype(np.uint32)


def load_orders(n: int = N_ROWS) -> Orders:
    return Orders(n=n)


def spec() -> dict:
    """Everything the client needs to build the same million rows itself.

    The rows are not sent. This is the spec they are built from, and it is
    under a kilobyte.
    """
    return {
        "rows": N_ROWS,
        "epoch": EPOCH,
        "daySpan": DAY_SPAN,
        "regions": REGIONS,
        "categories": CATEGORIES,
        "statuses": STATUSES,
        "statusWeights": STATUS_WEIGHTS,
        "columns": COLUMNS,
    }


@dataclass(frozen=True)
class Query:
    regions: list[int]
    statuses: list[int]
    min_amount: int
    max_amount: int
    sort_by: str
    descending: bool
    offset: int
    limit: int


def query_from(raw: dict | None) -> Query:
    """Read a query off the wire, refusing anything that is not one.

    The client sends this, and a client can send anything. An unknown sort
    column would silently sort by nothing and look like a broken grid.
    """
    raw = raw or {}
    sort_by = raw.get("sortBy", "id")
    if sort_by not in SORTABLE:
        raise ValueError(
            f"Cannot sort by {sort_by!r}. Known columns: {', '.join(sorted(SORTABLE))}"
        )

    limit = int(raw.get("limit", 50))
    return Query(
        regions=[int(value) for value in raw.get("regions", [])],
        statuses=[int(value) for value in raw.get("statuses", [])],
        min_amount=int(raw.get("minAmount", 0)),
        max_amount=int(raw.get("maxAmount", 0) or 0),
        sort_by=sort_by,
        descending=bool(raw.get("descending", False)),
        offset=max(0, int(raw.get("offset", 0))),
        limit=max(1, min(500, limit)),
    )


def matching(orders: Orders, query: Query) -> np.ndarray:
    """Row numbers that pass the filters, in row order."""
    keep = np.ones(orders.n, dtype=bool)

    if query.regions:
        keep &= np.isin(orders.region, np.array(query.regions, dtype=np.uint8))
    if query.statuses:
        keep &= np.isin(orders.status, np.array(query.statuses, dtype=np.uint8))
    if query.min_amount > 0:
        keep &= orders.amount >= query.min_amount
    if query.max_amount > 0:
        keep &= orders.amount <= query.max_amount

    return np.flatnonzero(keep)


def run_query(orders: Orders, query: Query) -> dict:
    """Filter, sort and page, the way a server backed grid does it.

    This exists so the app can answer the same question both ways and show
    what each costs. Nothing else in the app calls it.
    """
    rows = matching(orders, query)

    column = _column(orders, query.sort_by)
    if column is None:
        order = rows  # already in id order
        if query.descending:
            order = order[::-1]
    else:
        # Stable, so rows with equal keys keep their id order and paging does
        # not shuffle them between requests.
        order = rows[np.argsort(column[rows], kind="stable")]
        if query.descending:
            order = order[::-1]

    page = order[query.offset : query.offset + query.limit]
    return {
        "total": int(rows.size),
        "offset": query.offset,
        "rows": [row(orders, int(index)) for index in page],
    }


def row(orders: Orders, index: int) -> dict:
    """One row, expanded into the labels a person reads."""
    return {
        "id": index,
        "day": int(orders.day[index]),
        "region": REGIONS[orders.region[index]],
        "category": CATEGORIES[orders.category[index]],
        "status": STATUSES[orders.status[index]],
        "quantity": int(orders.quantity[index]),
        "amount": int(orders.amount[index]),
    }


def totals(orders: Orders, query: Query) -> dict:
    """Sums over everything that matches, not just the visible page.

    A grid can only add up what it has. This is the question that needs the
    whole table, and it is the same either way, so it is a fair thing for
    both paths to ask.
    """
    rows = matching(orders, query)
    if rows.size == 0:
        return {"rows": 0, "amount": 0, "quantity": 0, "meanAmount": 0}

    amount = int(orders.amount[rows].sum())
    quantity = int(orders.quantity[rows].sum())
    return {
        "rows": int(rows.size),
        "amount": amount,
        "quantity": quantity,
        "meanAmount": round(amount / rows.size, 2),
    }


def _column(orders: Orders, name: str) -> np.ndarray | None:
    if name == "id":
        return None
    if name == "date":
        return orders.day
    return getattr(orders, name)
