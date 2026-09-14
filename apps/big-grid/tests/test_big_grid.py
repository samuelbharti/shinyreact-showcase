"""Layer one: the table and the queries over it, with no Shiny anywhere.

What this app does, in plain English:

  The server describes a million row table in about 350 bytes. The browser
  builds the same million rows from that description, using the same hash,
  and filters and sorts them locally with about twenty rows in the page.

  The server can answer the same query, and the app makes it do so on demand
  so the two can be compared. That path returns one page of fifty rows,
  because that is what a server backed grid sends.
"""

import json
import sys
from pathlib import Path

import numpy as np
import pytest

APP_DIR = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(APP_DIR))

# The app directory goes on sys.path just above.
from big_grid import (  # noqa: E402
    CATEGORIES,
    N_ROWS,
    REGIONS,
    STATUSES,
    hash_unit,
    load_orders,
    matching,
    query_from,
    row,
    run_query,
    spec,
    totals,
)


@pytest.fixture(scope="module")
def orders():
    return load_orders()


def test_the_spec_is_small_enough_to_be_the_whole_payload():
    # This is the point of generating rather than sending. A million rows as
    # a file is about thirteen megabytes. This is the alternative.
    assert len(json.dumps(spec())) < 1_000


def test_the_hash_stays_inside_zero_to_one():
    values = hash_unit(np.arange(50_000, dtype=np.float64), 2)

    assert values.min() >= 0.0
    assert values.max() < 1.0


def test_the_known_hash_values_have_not_moved():
    # Pinned in all three languages. JavaScript, Python and R have to agree
    # on this or they build different tables and the comparison in this app
    # is between two different things.
    assert hash_unit(np.array([0.0]), 1)[0] == pytest.approx(0.08570585407142062)
    assert hash_unit(np.array([7.0]), 3)[0] == pytest.approx(0.6120904732306371)


def test_the_known_rows_have_not_moved(orders):
    assert row(orders, 0) == {
        "id": 0,
        "day": 900,
        "region": "North",
        "category": "Training",
        "status": "shipped",
        "quantity": 38,
        "amount": 194,
    }
    assert row(orders, 999_999)["amount"] == 407
    assert row(orders, 2)["status"] == "pending"


def test_the_table_is_the_size_it_says(orders):
    assert orders.n == N_ROWS
    assert orders.amount.size == N_ROWS


def test_every_code_is_in_range(orders):
    assert orders.region.max() < len(REGIONS)
    assert orders.category.max() < len(CATEGORIES)
    assert orders.status.max() < len(STATUSES)


def test_statuses_follow_the_weights(orders):
    # Most orders ship. If this drifts, the status filter stops being
    # interesting because everything is in one bucket.
    shipped = float((orders.status == 0).mean())
    assert 0.70 < shipped < 0.74


def test_regions_are_evenly_spread(orders):
    counts = np.bincount(orders.region, minlength=len(REGIONS))
    assert counts.min() > N_ROWS / len(REGIONS) * 0.97


def test_no_filter_matches_everything(orders):
    assert matching(orders, query_from({})).size == N_ROWS


def test_filters_narrow_and_combine(orders):
    one = matching(orders, query_from({"regions": [0]}))
    two = matching(orders, query_from({"regions": [0, 1]}))
    both = matching(orders, query_from({"regions": [0], "statuses": [0]}))

    assert one.size < two.size
    assert both.size < one.size


def test_an_amount_filter_keeps_only_what_it_should(orders):
    rows = matching(orders, query_from({"minAmount": 50_000}))

    assert orders.amount[rows].min() >= 50_000


def test_sorting_ascending_and_descending_are_mirror_images(orders):
    up = run_query(orders, query_from({"sortBy": "amount", "limit": 3}))
    down = run_query(
        orders, query_from({"sortBy": "amount", "descending": True, "limit": 3})
    )

    assert up["rows"][0]["amount"] <= up["rows"][1]["amount"]
    assert down["rows"][0]["amount"] >= down["rows"][1]["amount"]
    assert down["rows"][0]["amount"] > up["rows"][0]["amount"]


def test_the_top_row_by_amount_has_not_moved(orders):
    # The same three ids the browser and the R server produce. Three
    # independent implementations of one hash, agreeing on a million rows.
    page = run_query(
        orders, query_from({"sortBy": "amount", "descending": True, "limit": 3})
    )

    assert [r["id"] for r in page["rows"]] == [287_216, 60_385, 836_118]
    assert page["rows"][0]["amount"] == 116_078


def test_paging_walks_the_same_order(orders):
    first = run_query(orders, query_from({"sortBy": "amount", "limit": 10}))
    second = run_query(
        orders, query_from({"sortBy": "amount", "limit": 10, "offset": 10})
    )

    assert first["total"] == second["total"] == N_ROWS
    assert first["rows"][-1]["amount"] <= second["rows"][0]["amount"]
    assert {r["id"] for r in first["rows"]} & {r["id"] for r in second["rows"]} == set()


def test_paging_past_the_end_returns_nothing_rather_than_failing(orders):
    page = run_query(
        orders, query_from({"regions": [0], "offset": 10_000_000, "limit": 10})
    )

    assert page["rows"] == []
    assert page["total"] > 0


def test_an_unknown_sort_column_is_refused():
    # The client sends this, and a client can send anything. Sorting by
    # nothing would look like a broken grid rather than an error.
    with pytest.raises(ValueError, match="Cannot sort by"):
        query_from({"sortBy": "; drop table orders"})


def test_the_page_size_is_capped():
    # A client asking for a million rows in one page would undo the point of
    # paging and stall the process building them.
    assert query_from({"limit": 10_000}).limit == 500
    assert query_from({"limit": 0}).limit == 1


def test_totals_cover_everything_that_matched_not_the_page(orders):
    query = query_from({"regions": [0], "limit": 10})
    page = run_query(orders, query)
    summary = totals(orders, query)

    assert summary["rows"] == page["total"]
    assert summary["rows"] > len(page["rows"])


def test_the_known_totals_have_not_moved(orders):
    summary = totals(orders, query_from({}))

    assert summary["rows"] == N_ROWS
    assert summary["amount"] == 9_942_166_186
    assert summary["quantity"] == 60_831_301
    assert summary["meanAmount"] == 9942.17


def test_totals_of_nothing_are_zero_not_an_error(orders):
    summary = totals(orders, query_from({"minAmount": 10_000_000}))

    assert summary == {"rows": 0, "amount": 0, "quantity": 0, "meanAmount": 0}


def test_the_page_is_json_serializable(orders):
    json.dumps(run_query(orders, query_from({"limit": 5})))
    json.dumps(totals(orders, query_from({})))
