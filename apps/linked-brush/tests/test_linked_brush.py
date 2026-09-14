"""Layer one: the star catalogue and the fit, with no Shiny.

What this app does, in plain English:

  The server builds forty thousand stars from a hash of the star number and
  sends the whole table once, packed as integers. The browser draws four
  panels from it and owns the brushing: drag a box on any panel and the other
  three follow the pointer, with nothing sent anywhere.

  When the pointer comes up, the browser sends the brush rectangles. The
  server picks out the same stars and fits a line through them. That is one
  round trip per released brush, and it is the only thing a drag costs.

The numbers pinned below come from a browser run against both servers. They
are here so that a change to the generator, or to either language's
arithmetic, shows up as a failing test rather than as two galleries quietly
drawing different stars.
"""

import base64
import sys
from pathlib import Path

import numpy as np
import pytest

APP_DIR = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(APP_DIR))

from linked_brush import (  # noqa: E402
    APPARENT_LIMIT,
    GIANT,
    MAIN_SEQUENCE,
    POPULATIONS,
    SCALES,
    STAR_COUNT,
    WHITE_DWARF,
    catalogue_payload,
    fit_selection,
    hash_unit,
    load_catalogue,
    main_sequence_magnitude,
    select,
    summary,
)

# The exact rectangle a browser drew over the white dwarfs, and the one added
# on the distance panel after it. Both servers answered with the counts and
# the fit asserted below.
DWARF_BRUSH = {"hr": {"x0": -0.1507, "x1": 0.846, "y0": 9.4116, "y1": 16.0644}}
DWARF_AND_NEAR = dict(DWARF_BRUSH, distance={"x0": 0.254, "x1": 1.541})


@pytest.fixture(scope="module")
def catalogue():
    return load_catalogue()


def test_the_hash_stays_inside_the_unit_interval():
    values = hash_unit(np.arange(STAR_COUNT, dtype=np.float64), 21)
    assert values.min() >= 0.0
    assert values.max() < 1.0


def test_the_hash_argument_stays_small_enough_to_agree_across_languages():
    """The reason the multiplier on the index is 0.0137 and not something big.

    sin() past about fifteen thousand radians is where Python, R and
    JavaScript stop agreeing in the last bit, and a catalogue that differs
    by one star between two servers is a bug nobody can find.
    """
    largest = (STAR_COUNT - 1) * 0.0137 + 34 * 7.919
    assert largest < 15_000


def test_the_main_sequence_relation_matches_the_spectral_type_table():
    # A handful of real anchors the cubic was fitted to. Half a magnitude is
    # the scatter of the fit itself, not slack in the test.
    for colour, magnitude in ((0.00, 0.60), (0.65, 4.83), (1.40, 8.80)):
        fitted = float(main_sequence_magnitude(np.array([colour]))[0])
        assert abs(fitted - magnitude) < 0.5


def test_the_catalogue_is_the_size_it_claims(catalogue):
    assert catalogue.size == STAR_COUNT
    for field in ("absolute", "longitude", "latitude", "log_distance", "apparent"):
        assert getattr(catalogue, field).size == STAR_COUNT


def test_every_field_is_packed_small_enough_to_survive_a_signed_short(catalogue):
    """R writes these with writeBin(size = 2), which silently takes the low
    two bytes. A field that outgrows a short would come back as nonsense
    from the R server only."""
    for field in (
        "colour",
        "absolute",
        "longitude",
        "latitude",
        "log_distance",
        "apparent",
    ):
        values = getattr(catalogue, field)
        assert values.dtype == np.dtype("<i2")
        assert values.min() > -32768
        assert values.max() < 32767


def test_the_populations_are_the_shares_they_were_drawn_at(catalogue):
    counts = np.bincount(catalogue.population, minlength=3)
    assert list(counts) == [31180, 6561, 2259]
    assert counts.sum() == STAR_COUNT


def test_white_dwarfs_sit_below_the_main_sequence(catalogue):
    dwarfs = catalogue.absolute[catalogue.population == WHITE_DWARF] / 100
    main = catalogue.absolute[catalogue.population == MAIN_SEQUENCE] / 100
    assert dwarfs.min() > 9.0
    assert float(np.median(dwarfs)) > float(np.median(main))


def test_giants_are_brighter_than_the_main_sequence_at_the_same_colour(catalogue):
    giants = catalogue.population == GIANT
    red = giants & (catalogue.colour > 1200)
    assert red.sum() > 100
    # Brighter is a smaller number.
    assert float(np.median(catalogue.absolute[red] / 100)) < 2.0


def test_nothing_is_further_away_than_the_survey_could_see(catalogue):
    """Every star in the catalogue is inside its own horizon.

    This is the fact the app is built to show. A bright star is visible much
    further off than a faint one, so brushing the top of the main sequence
    and brushing the white dwarfs pick out completely different distances.
    """
    apparent = catalogue.apparent / 100
    # The floor on distance lets a handful of very faint nearby stars sit
    # just past the limit. A magnitude of slack covers that and would still
    # catch a generator that stopped applying the limit at all.
    assert apparent.max() < APPARENT_LIMIT + 1.0


def test_the_furthest_stars_lie_in_the_disc(catalogue):
    far = catalogue.log_distance > 3000  # beyond a kiloparsec
    near = catalogue.log_distance < 1500  # inside about thirty parsecs
    assert far.sum() > 100 and near.sum() > 100

    spread_far = float(np.abs(catalogue.latitude[far] / 100).mean())
    spread_near = float(np.abs(catalogue.latitude[near] / 100).mean())
    assert spread_far < 10.0
    assert spread_near > 20.0


def test_the_payload_is_the_size_the_readme_claims():
    payload = catalogue_payload()
    encoded = sum(len(v) for v in payload.values() if isinstance(v, str))
    assert encoded == 693_344

    # Thirteen bytes a star: six shorts and one byte.
    raw = sum(len(base64.b64decode(v)) for v in payload.values() if isinstance(v, str))
    assert raw == STAR_COUNT * 13


def test_the_packed_bytes_decode_back_to_the_table(catalogue):
    payload = catalogue_payload()
    decoded = np.frombuffer(base64.b64decode(payload["colour"]), dtype="<i2")
    assert np.array_equal(decoded, catalogue.colour)


def test_the_summary_carries_every_range_the_client_scales_with():
    ranges = summary()["ranges"]
    assert set(ranges) == set(SCALES)
    assert ranges["colour"] == {"min": -0.388, "max": 1.985}
    assert ranges["logDistance"] == {"min": 0.176, "max": 4.076}
    assert ranges["longitude"]["min"] >= -180.0
    assert ranges["longitude"]["max"] <= 180.0


def test_no_brush_selects_everything(catalogue):
    assert select(catalogue, None).sum() == STAR_COUNT
    assert select(catalogue, {}).sum() == STAR_COUNT


def test_a_brush_edge_includes_the_star_sitting_on_it(catalogue):
    """Both ends are inclusive, and the client does the same.

    The client is sent these integers and divides them the same way, so a
    star exactly on an edge has to land on the same side in both. This is the
    assertion that would fail if either side started rounding differently.
    """
    colour = catalogue.colour.astype(np.float64) / SCALES["colour"]
    edge = float(colour[0])
    only = select(catalogue, {"hr": {"x0": edge, "x1": edge, "y0": -99, "y1": 99}})
    assert only[0]
    assert only.sum() == int((colour == edge).sum())


def test_brushes_narrow_each_other_rather_than_adding_up(catalogue):
    wide = select(catalogue, DWARF_BRUSH).sum()
    crossed = select(catalogue, DWARF_AND_NEAR).sum()
    assert crossed < wide
    assert crossed == 1901


def test_the_white_dwarf_brush_answers_what_the_browser_saw():
    result = fit_selection(DWARF_BRUSH)
    assert result["stars"] == 2110
    assert result["populationCounts"] == [0, 0, 2110]
    assert result["medianParsecs"] == 4.43
    assert result["fit"]["slope"] == 4.5996
    assert result["fit"]["intercept"] == 10.8441
    assert result["fit"]["scatter"] == 0.4433
    assert result["fit"]["correlation"] == 0.9428


def test_the_fit_recovers_the_slope_the_dwarfs_were_drawn_with():
    # The white dwarf sequence is built at 4.60 magnitudes per unit of
    # colour. A least squares line through the scattered result should find
    # it again, which is the cheapest check that the fit is a real fit.
    assert abs(fit_selection(DWARF_BRUSH)["fit"]["slope"] - 4.60) < 0.05


def test_adding_the_distance_brush_changes_the_answer():
    result = fit_selection(DWARF_AND_NEAR)
    assert result["stars"] == 1901
    assert result["medianParsecs"] == 4.94
    assert result["fit"]["slope"] == 4.4915
    assert result["fit"]["correlation"] == 0.9376


def test_the_giant_branch_slopes_the_other_way():
    result = fit_selection({"hr": {"x0": 0.8, "x1": 1.8, "y0": -3.0, "y1": 2.5}})
    assert result["stars"] == 6149
    assert result["populationCounts"] == [0, 6149, 0]
    # Redder and brighter, and brighter is a smaller magnitude.
    assert result["fit"]["slope"] < 0
    # Giants are luminous, so a magnitude limited survey sees them a long way off.
    assert result["medianParsecs"] > 1000


def test_the_main_sequence_brush_finds_mostly_main_sequence_stars():
    result = fit_selection({"hr": {"x0": 0.4, "x1": 1.3, "y0": 3.0, "y1": 9.0}})
    assert result["stars"] == 13339
    assert result["populationCounts"] == [13202, 137, 0]
    assert result["medianParsecs"] == 84.14


def test_brushing_the_dwarfs_and_the_main_sequence_disagree_about_distance():
    """The claim on the card, as an assertion.

    Both selections are a few thousand stars. One sits inside five parsecs
    and the other at eighty odd, because a survey sees a bright star much
    further away than a faint one.
    """
    dwarfs = fit_selection(DWARF_BRUSH)
    main = fit_selection({"hr": {"x0": 0.4, "x1": 1.3, "y0": 3.0, "y1": 9.0}})
    assert dwarfs["medianParsecs"] * 15 < main["medianParsecs"]


def test_an_empty_selection_leaves_the_fit_out_rather_than_nulling_it():
    """Absent, not null.

    R drops a NULL out of a list and jsonlite writes an empty object for one
    that survives, so a key that is sometimes null is a key the two servers
    disagree about. The client checks for the key, so it has to be missing.
    """
    result = fit_selection({"hr": {"x0": 9.0, "x1": 9.1, "y0": 0.0, "y1": 1.0}})
    assert result["stars"] == 0
    assert result["populationCounts"] == [0, 0, 0]
    assert "fit" not in result
    assert "medianParsecs" not in result
    assert "colourRange" not in result


def test_a_selection_with_no_spread_in_colour_gets_counted_but_not_fitted():
    catalogue = load_catalogue()
    colour = catalogue.colour.astype(np.float64) / SCALES["colour"]
    edge = float(colour[0])
    result = fit_selection({"hr": {"x0": edge, "x1": edge, "y0": -99, "y1": 99}})
    assert result["stars"] >= 1
    assert "fit" not in result


def test_the_population_names_are_the_ones_the_panel_colours(catalogue):
    assert POPULATIONS == ("Main sequence", "Giants", "White dwarfs")
    assert summary()["populations"] == list(POPULATIONS)
