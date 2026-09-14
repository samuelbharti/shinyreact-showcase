"""A supply network, and what it does when something goes wrong.

Four stages: suppliers, factories, distribution centres, markets. Demand is
pulled backwards through them, and every stage is capped, so a closed port or
a factory line down does not just shrink one arrow. It reroutes the whole
network, and some demand may go unmet.

The split this app is about:

  Choosing a scenario is a real computation and costs one round trip. That is
  the right price for it.

  What it does not cost is the diagram. A plain Shiny plot output is torn
  down and rebuilt on every change, so the picture blinks and you lose track
  of which band was which. Here the browser keeps every node and every ribbon
  mounted and moves them to their new places, so you can watch where the
  volume went.

Nothing here is random. The network is a written down table, because a supply
chain is a thing somebody decided rather than a thing that was sampled, and a
reader should be able to check the arithmetic against it.
"""

from __future__ import annotations

from dataclasses import dataclass

# Weekly volume, in thousands of units.
#
# id, label, and what each one can handle in a week. Suppliers are limited by
# what they can ship, factories by what they can build, and markets are not
# limited at all: their number is what they want.
SUPPLIERS = [
    ("rotterdam", "Rotterdam", 340.0),
    ("shenzhen", "Shenzhen", 420.0),
    ("veracruz", "Veracruz", 260.0),
    ("durban", "Durban", 180.0),
]

FACTORIES = [
    ("leeds", "Leeds", 380.0),
    ("gdansk", "Gdansk", 420.0),
    ("porto", "Porto", 300.0),
]

CENTRES = [
    ("midlands", "Midlands", 1e9),
    ("lyon", "Lyon", 1e9),
    ("milan", "Milan", 1e9),
]

MARKETS = [
    ("uk", "UK", 300.0),
    ("france", "France", 240.0),
    ("germany", "Germany", 280.0),
    ("iberia", "Iberia", 160.0),
]

# Who normally serves whom, as shares of the stage above. These are the
# routing preferences, not the outcome: a capped supplier or factory will push
# volume onto its neighbours, and that is what the scenarios are for.
MARKET_FROM_CENTRE = {
    "uk": {"midlands": 0.90, "lyon": 0.10, "milan": 0.00},
    "france": {"midlands": 0.10, "lyon": 0.75, "milan": 0.15},
    "germany": {"midlands": 0.10, "lyon": 0.40, "milan": 0.50},
    "iberia": {"midlands": 0.10, "lyon": 0.55, "milan": 0.35},
}

CENTRE_FROM_FACTORY = {
    "midlands": {"leeds": 0.70, "gdansk": 0.20, "porto": 0.10},
    "lyon": {"leeds": 0.20, "gdansk": 0.45, "porto": 0.35},
    "milan": {"leeds": 0.10, "gdansk": 0.55, "porto": 0.35},
}

FACTORY_FROM_SUPPLIER = {
    "leeds": {"rotterdam": 0.45, "shenzhen": 0.35, "veracruz": 0.15, "durban": 0.05},
    "gdansk": {"rotterdam": 0.40, "shenzhen": 0.45, "veracruz": 0.10, "durban": 0.05},
    "porto": {"rotterdam": 0.25, "shenzhen": 0.30, "veracruz": 0.30, "durban": 0.15},
}


@dataclass(frozen=True)
class Scenario:
    """One thing going wrong, as multipliers on the written down network."""

    slug: str
    title: str
    note: str
    demand: dict  # market id -> multiplier
    capacity: dict  # factory id -> multiplier
    supply: dict  # supplier id -> multiplier


SCENARIOS = [
    Scenario(
        "baseline",
        "Ordinary week",
        "Everything open, everyone building.",
        {},
        {},
        {},
    ),
    Scenario(
        "port-closed",
        "Rotterdam closed",
        "The largest European port stops. Volume has to come from further out.",
        {},
        {},
        {"rotterdam": 0.0},
    ),
    Scenario(
        "demand-spike",
        "German demand up 60%",
        "One market wants far more, and the network has to find it somewhere.",
        {"germany": 1.6},
        {},
        {},
    ),
    Scenario(
        "line-down",
        "Gdansk at half capacity",
        "The biggest factory loses a line. Its work moves, and some does not.",
        {},
        {"gdansk": 0.5},
        {},
    ),
]

STAGES = ("supplier", "factory", "centre", "market")


def scenario(slug: str) -> Scenario:
    for option in SCENARIOS:
        if option.slug == slug:
            return option
    known = ", ".join(option.slug for option in SCENARIOS)
    raise KeyError(f"No scenario called {slug!r}. Known: {known}")


def allocate(total: float, shares: dict, room: dict) -> tuple[dict, float]:
    """Split `total` by preference, then push the overflow onto whoever is left.

    Water filling. Everyone takes their share of what is left; anyone who hits
    their ceiling takes only what fits and the rest goes back in the pot for
    the next pass. That terminates, because each pass either empties the pot
    or takes at least one name out of it.

    `room` is how much headroom each name has left, and it is decremented
    here. That is the whole point: a supplier serves several factories, and a
    ceiling that is not shared between those calls is not a ceiling at all.

    Returns what each one took, and whatever could not be placed anywhere.
    """
    taken = {name: 0.0 for name in shares}
    active = [name for name in shares if shares[name] > 0 and room[name] > 1e-9]
    remaining = total

    while remaining > 1e-9 and active:
        weight = sum(shares[name] for name in active)
        if weight <= 0:
            break

        spilled = 0.0
        for name in active:
            want = remaining * shares[name] / weight
            spare = room[name]
            if want >= spare:
                taken[name] += spare
                room[name] = 0.0
                spilled += want - spare
            else:
                taken[name] += want
                room[name] -= want

        remaining = spilled
        active = [name for name in active if room[name] > 1e-9]

    return taken, remaining


def solve(slug: str) -> dict:
    """Pull demand back through the network and report every arrow.

    Backwards, because demand is what is known and supply is what has to be
    found. Each stage allocates what the stage below it asked for, subject to
    ceilings shared across the whole stage, and anything that will not fit is
    reported rather than quietly dropped.

    Markets are served in the order they are listed, so the first has first
    claim when a stage is tight. That is a policy rather than a fact, and
    saying so is better than pretending the model has not got one.
    """
    plan = scenario(slug)

    supply_room = {name: cap * plan.supply.get(name, 1.0) for name, _, cap in SUPPLIERS}
    factory_room = {
        name: cap * plan.capacity.get(name, 1.0) for name, _, cap in FACTORIES
    }
    centre_room = {name: cap for name, _, cap in CENTRES}
    wanted = {name: cap * plan.demand.get(name, 1.0) for name, _, cap in MARKETS}

    # Ceilings are consumed as they are used, so these are what is left.
    supply_left = dict(supply_room)
    factory_left = dict(factory_room)
    centre_left = dict(centre_room)

    links: list[dict] = []
    unserved = 0.0

    # Markets pull from the distribution centres.
    centre_load = {name: 0.0 for name, _, _ in CENTRES}
    for market, _, _ in MARKETS:
        taken, short = allocate(wanted[market], MARKET_FROM_CENTRE[market], centre_left)
        unserved += short
        for centre, value in taken.items():
            if value <= 1e-9:
                continue
            centre_load[centre] += value
            links.append({"source": centre, "target": market, "value": value})

    # Centres pull from the factories, which is the first real ceiling.
    factory_load = {name: 0.0 for name, _, _ in FACTORIES}
    unbuilt = 0.0
    for centre, _, _ in CENTRES:
        taken, short = allocate(
            centre_load[centre], CENTRE_FROM_FACTORY[centre], factory_left
        )
        unbuilt += short
        for factory, value in taken.items():
            if value <= 1e-9:
                continue
            factory_load[factory] += value
            links.append({"source": factory, "target": centre, "value": value})

    # Factories pull from the suppliers, which is the other one.
    supplier_load = {name: 0.0 for name, _, _ in SUPPLIERS}
    unshipped = 0.0
    for factory, _, _ in FACTORIES:
        taken, short = allocate(
            factory_load[factory], FACTORY_FROM_SUPPLIER[factory], supply_left
        )
        unshipped += short
        for supplier, value in taken.items():
            if value <= 1e-9:
                continue
            supplier_load[supplier] += value
            links.append({"source": supplier, "target": factory, "value": value})

    # Backwards found the plan. Forwards finds what actually moves.
    #
    # The pull above sized the downstream arrows from demand and the upstream
    # ones from what could be had, so a factory that cannot get materials was
    # still shipping the full amount onward. On a diagram that is volume
    # appearing out of nothing. Each stage is now scaled down to what reached
    # it, and the shortfall travels all the way to the market that goes short.
    def flowing(stage_links: list[dict]) -> dict:
        totals: dict = {}
        for link in stage_links:
            totals[link["source"]] = totals.get(link["source"], 0.0) + link["value"]
        return totals

    to_factories = [link for link in links if link["target"] in factory_load]
    to_centres = [link for link in links if link["target"] in centre_load]
    to_markets = [link for link in links if link["target"] in wanted]

    arrived_at_factory: dict = {}
    for link in to_factories:
        arrived_at_factory[link["target"]] = (
            arrived_at_factory.get(link["target"], 0.0) + link["value"]
        )

    leaving_factory = flowing(to_centres)
    for link in to_centres:
        planned = leaving_factory.get(link["source"], 0.0)
        got = arrived_at_factory.get(link["source"], 0.0)
        link["value"] = link["value"] * (got / planned) if planned > 0 else 0.0

    arrived_at_centre: dict = {}
    for link in to_centres:
        arrived_at_centre[link["target"]] = (
            arrived_at_centre.get(link["target"], 0.0) + link["value"]
        )

    leaving_centre = flowing(to_markets)
    for link in to_markets:
        planned = leaving_centre.get(link["source"], 0.0)
        got = arrived_at_centre.get(link["source"], 0.0)
        link["value"] = link["value"] * (got / planned) if planned > 0 else 0.0

    arrived_at_market: dict = {}
    for link in to_markets:
        arrived_at_market[link["target"]] = (
            arrived_at_market.get(link["target"], 0.0) + link["value"]
        )

    # A node is worth what passes through it, which upstream is what it sends
    # and everywhere else is what it receives. After the scaling above those
    # are the same number.
    loads = {
        **supplier_load,
        **arrived_at_factory,
        **arrived_at_centre,
        **arrived_at_market,
    }
    rooms = {**supply_room, **factory_room, **centre_room}

    nodes = []
    for stage, table in (
        ("supplier", SUPPLIERS),
        ("factory", FACTORIES),
        ("centre", CENTRES),
        ("market", MARKETS),
    ):
        for name, label, _ in table:
            node = {
                "id": name,
                "label": label,
                "stage": stage,
                "value": round(loads.get(name, 0.0), 1),
            }
            if stage == "market":
                node["wanted"] = round(wanted[name], 1)
                node["short"] = round(max(0.0, wanted[name] - loads.get(name, 0.0)), 1)
            if stage in ("supplier", "factory"):
                ceiling = rooms[name]
                node["capacity"] = round(ceiling, 1)
                node["spare"] = round(max(0.0, ceiling - loads.get(name, 0.0)), 1)
                node["atCeiling"] = (
                    ceiling - loads.get(name, 0.0) < 1e-6 and ceiling > 0
                )
            nodes.append(node)

    asked = sum(wanted.values())
    delivered = sum(arrived_at_market.values())

    return {
        "scenario": slug,
        "nodes": nodes,
        "links": [
            {
                "source": link["source"],
                "target": link["target"],
                "value": round(link["value"], 1),
            }
            for link in links
            if link["value"] > 1e-9
        ],
        "asked": round(asked, 1),
        "delivered": round(delivered, 1),
        "shortfall": round(max(0.0, asked - delivered), 1),
        "servedShare": round(delivered / asked, 4) if asked else 0.0,
        "shortAt": {
            "centres": round(unserved, 1),
            "factories": round(unbuilt, 1),
            "suppliers": round(unshipped, 1),
        },
    }


def catalogue() -> dict:
    """The scenario list and the shape of the network. Sent once."""
    return {
        "scenarios": [
            {"slug": s.slug, "title": s.title, "note": s.note} for s in SCENARIOS
        ],
        "stages": list(STAGES),
        "nodeCount": len(SUPPLIERS) + len(FACTORIES) + len(CENTRES) + len(MARKETS),
    }
