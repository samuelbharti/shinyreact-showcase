"""Layer one: the supply network and the allocation, with no Shiny.

What this app does, in plain English:

  Four stages, fourteen places. Demand is pulled backwards through them and
  every stage has a ceiling, so a closed port or a factory line down does not
  just shrink one arrow: it reroutes the network, and some demand may go
  unmet.

  Choosing a scenario costs one round trip, which is the right price for a
  real computation. What it does not cost is the diagram. The browser keeps
  every node and every ribbon and moves them, rather than being handed a new
  picture.

The numbers pinned below come from a browser run against both servers.
"""

import sys
from pathlib import Path

import pytest

APP_DIR = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(APP_DIR))

from supply_flow import (  # noqa: E402
    CENTRES,
    FACTORIES,
    MARKETS,
    SCENARIOS,
    SUPPLIERS,
    allocate,
    catalogue,
    scenario,
    solve,
)

STAGE_SIZES = {
    "supplier": len(SUPPLIERS),
    "factory": len(FACTORIES),
    "centre": len(CENTRES),
    "market": len(MARKETS),
}


def nodes_by_id(result):
    return {node["id"]: node for node in result["nodes"]}


def test_the_shares_out_of_every_place_add_up_to_one():
    """A routing table that does not sum to one is a silent leak."""
    from supply_flow import (
        CENTRE_FROM_FACTORY,
        FACTORY_FROM_SUPPLIER,
        MARKET_FROM_CENTRE,
    )

    for table in (MARKET_FROM_CENTRE, CENTRE_FROM_FACTORY, FACTORY_FROM_SUPPLIER):
        for name, shares in table.items():
            assert abs(sum(shares.values()) - 1.0) < 1e-9, name


def test_allocate_splits_by_share_when_nobody_is_full():
    room = {"a": 100.0, "b": 100.0}
    taken, short = allocate(50.0, {"a": 0.6, "b": 0.4}, room)

    assert taken["a"] == pytest.approx(30.0)
    assert taken["b"] == pytest.approx(20.0)
    assert short == pytest.approx(0.0)
    # And the ceilings it used are gone from the pot.
    assert room["a"] == pytest.approx(70.0)


def test_allocate_pushes_the_overflow_onto_whoever_is_left():
    room = {"small": 10.0, "big": 100.0}
    taken, short = allocate(50.0, {"small": 0.5, "big": 0.5}, room)

    assert taken["small"] == pytest.approx(10.0)
    assert taken["big"] == pytest.approx(40.0)
    assert short == pytest.approx(0.0)


def test_allocate_reports_what_will_not_fit_anywhere():
    room = {"a": 10.0, "b": 10.0}
    taken, short = allocate(50.0, {"a": 0.5, "b": 0.5}, room)

    assert taken["a"] == pytest.approx(10.0)
    assert taken["b"] == pytest.approx(10.0)
    assert short == pytest.approx(30.0)


def test_allocate_shares_one_ceiling_between_callers():
    """The bug this function had, as a test.

    A supplier feeds several factories. Called once per factory against a
    fresh copy of the ceilings, every call would think it had the whole of
    that supplier, and the totals would run past capacity with nothing to
    show for it.
    """
    room = {"only": 100.0}
    first, _ = allocate(70.0, {"only": 1.0}, room)
    second, short = allocate(70.0, {"only": 1.0}, room)

    assert first["only"] == pytest.approx(70.0)
    assert second["only"] == pytest.approx(30.0)
    assert short == pytest.approx(40.0)


def test_every_scenario_names_itself_and_is_reachable():
    assert [option.slug for option in SCENARIOS] == [
        "baseline",
        "port-closed",
        "demand-spike",
        "line-down",
    ]
    for option in SCENARIOS:
        assert scenario(option.slug) is option


def test_an_unknown_scenario_says_what_it_knows():
    with pytest.raises(KeyError) as raised:
        scenario("nope")
    assert "baseline" in str(raised.value)


def test_the_network_is_the_same_shape_in_every_scenario():
    """Fourteen places, always. A place with nothing flowing through it still
    belongs on the diagram, because a node that disappears cannot be animated
    into its replacement."""
    for option in SCENARIOS:
        result = solve(option.slug)
        assert len(result["nodes"]) == sum(STAGE_SIZES.values()) == 14
        counted = {stage: 0 for stage in STAGE_SIZES}
        for node in result["nodes"]:
            counted[node["stage"]] += 1
        assert counted == STAGE_SIZES


def test_an_ordinary_week_serves_everyone():
    result = solve("baseline")
    assert result["asked"] == 980.0
    assert result["delivered"] == 980.0
    assert result["shortfall"] == 0.0
    assert result["servedShare"] == 1.0
    assert len(result["links"]) == 32


def test_rotterdam_is_already_at_its_ceiling_in_an_ordinary_week():
    """Which is why closing it costs more than its own share of the volume."""
    node = nodes_by_id(solve("baseline"))["rotterdam"]
    assert node["value"] == 340.0
    assert node["capacity"] == 340.0
    assert node["spare"] == 0.0
    assert node["atCeiling"] is True


def test_closing_the_port_leaves_demand_unmet_at_the_suppliers():
    result = solve("port-closed")
    assert result["delivered"] == 860.0
    assert result["shortfall"] == 120.0
    assert result["servedShare"] == 0.8776
    assert result["shortAt"]["suppliers"] == 120.0
    assert result["shortAt"]["factories"] == 0.0

    places = nodes_by_id(result)
    assert places["rotterdam"]["value"] == 0.0
    # Everyone else is now flat out.
    for name in ("shenzhen", "veracruz", "durban"):
        assert places[name]["atCeiling"] is True


def test_a_demand_spike_runs_out_at_the_factories_instead():
    result = solve("demand-spike")
    assert result["asked"] == 1148.0
    assert result["delivered"] == 1100.0
    assert result["shortfall"] == 48.0
    assert result["shortAt"]["factories"] == 48.0
    assert result["shortAt"]["suppliers"] == 0.0


def test_losing_a_factory_line_moves_the_work_and_loses_some_of_it():
    result = solve("line-down")
    assert result["delivered"] == 890.0
    assert result["shortfall"] == 90.0
    assert result["servedShare"] == 0.9082

    places = nodes_by_id(result)
    assert places["gdansk"]["capacity"] == 210.0
    # Leeds picks up what it can, right up to its own ceiling.
    assert places["leeds"]["atCeiling"] is True


def test_each_scenario_binds_a_different_stage():
    """The reason there are four of them rather than one.

    A disruption that always ran out in the same place would teach a reader
    nothing about where a network is actually fragile.
    """
    binding = {}
    for option in SCENARIOS[1:]:
        result = solve(option.slug)
        short = result["shortAt"]
        binding[option.slug] = max(short, key=lambda key: short[key])

    assert binding["port-closed"] == "suppliers"
    assert binding["demand-spike"] == "factories"
    assert binding["line-down"] == "factories"


def test_nothing_is_ever_allocated_past_a_ceiling():
    for option in SCENARIOS:
        for node in solve(option.slug)["nodes"]:
            if "capacity" not in node:
                continue
            assert node["value"] <= node["capacity"] + 1e-6, (option.slug, node["id"])


def test_what_arrives_at_a_place_is_what_leaves_it():
    """Conservation, at the two stages that only pass volume along."""
    for option in SCENARIOS:
        result = solve(option.slug)
        incoming: dict = {}
        outgoing: dict = {}
        for link in result["links"]:
            outgoing[link["source"]] = outgoing.get(link["source"], 0.0) + link["value"]
            incoming[link["target"]] = incoming.get(link["target"], 0.0) + link["value"]

        for node in result["nodes"]:
            if node["stage"] in ("factory", "centre"):
                went_in = incoming.get(node["id"], 0.0)
                came_out = outgoing.get(node["id"], 0.0)
                assert abs(went_in - came_out) < 0.3, (option.slug, node["id"])


def test_every_link_joins_two_places_that_exist():
    for option in SCENARIOS:
        result = solve(option.slug)
        known = {node["id"] for node in result["nodes"]}
        for link in result["links"]:
            assert link["source"] in known
            assert link["target"] in known
            assert link["value"] > 0


def test_a_link_appears_at_most_once():
    """The browser keys its ribbons by source and target, so a repeat would
    be two elements fighting over one key."""
    for option in SCENARIOS:
        pairs = [
            (link["source"], link["target"]) for link in solve(option.slug)["links"]
        ]
        assert len(pairs) == len(set(pairs))


def test_the_catalogue_lists_every_scenario_for_the_buttons():
    shown = catalogue()
    assert [row["slug"] for row in shown["scenarios"]] == [
        option.slug for option in SCENARIOS
    ]
    assert shown["nodeCount"] == 14
    assert shown["stages"] == ["supplier", "factory", "centre", "market"]
    for row in shown["scenarios"]:
        assert row["title"] and row["note"]
