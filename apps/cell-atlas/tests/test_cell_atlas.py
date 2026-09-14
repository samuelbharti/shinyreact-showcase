"""Layer one: the server logic, with no Shiny anywhere.

What this app does, in plain English, so the tests below have something to
be checked against rather than agreeing with the code:

  The server reads 200,000 cells from a binary file. It sends every position
  to the client once. When the client asks for a gene, the server sends that
  gene's expression for every cell, quantized to a byte. When the client
  lassoes some cells, it sends their indices, and the server answers with the
  cluster make up of that group and the genes that are higher inside it than
  outside.
"""

import base64
import sys
from pathlib import Path

import numpy as np
import pytest

APP_DIR = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(APP_DIR))

# The app directory goes on sys.path just above, so this import cannot sit
# with the others at the top of the file.
from cell_atlas import (  # noqa: E402
    decode_selection,
    expression_payload,
    load_atlas,
    points_payload,
    selection_stats,
)


@pytest.fixture(scope="module")
def atlas():
    return load_atlas(APP_DIR / "data")


def test_the_atlas_loads_the_advertised_number_of_cells(atlas):
    assert atlas.n_cells == 200_000
    assert atlas.qx.shape == (200_000,)
    assert atlas.qy.shape == (200_000,)
    assert atlas.cluster.shape == (200_000,)
    assert atlas.noise.shape == (4, 200_000)


def test_a_truncated_binary_is_refused_rather_than_read_as_garbage(tmp_path):
    (tmp_path / "atlas.json").write_text(
        (APP_DIR / "data" / "atlas.json").read_text(encoding="utf-8"), encoding="utf-8"
    )
    (tmp_path / "atlas.bin").write_bytes(b"\x00" * 100)

    with pytest.raises(ValueError, match="Regenerate it"):
        load_atlas(tmp_path)


def test_every_cell_belongs_to_a_real_cluster(atlas):
    assert atlas.cluster.min() >= 0
    assert atlas.cluster.max() < len(atlas.clusters)


def test_the_point_payload_carries_one_position_per_cell(atlas):
    payload = points_payload(atlas)

    # int16 per coordinate, so two bytes per cell per axis.
    assert len(base64.b64decode(payload["x"])) == atlas.n_cells * 2
    assert len(base64.b64decode(payload["y"])) == atlas.n_cells * 2
    assert len(base64.b64decode(payload["cluster"])) == atlas.n_cells
    assert len(payload["bounds"]) == 4
    assert payload["genes"] == atlas.genes


def test_expression_is_a_byte_per_cell_and_uses_the_full_range(atlas):
    payload = expression_payload(atlas, 0)
    values = np.frombuffer(base64.b64decode(payload["values"]), dtype=np.uint8)

    assert values.size == atlas.n_cells
    assert payload["gene"] == atlas.genes[0]
    # The brightest cell anchors the top of the ramp, or the legend lies.
    assert values.max() == 255
    assert payload["max"] > 0


def test_a_gene_outside_the_panel_is_refused(atlas):
    with pytest.raises(IndexError):
        expression_payload(atlas, 99)


def test_dropout_leaves_a_real_share_of_cells_at_zero(atlas):
    # Without dropout the coloring is a smooth gradient and looks synthetic.
    # This is the property that makes it look like counts.
    zero_share = float((atlas.expression[0] == 0).mean())
    assert 0.1 < zero_share < 0.7


def test_a_selection_survives_the_round_trip_to_base64(atlas):
    original = np.array([0, 7, 199_999], dtype="<u4")
    encoded = base64.b64encode(original.tobytes()).decode("ascii")

    assert list(decode_selection(encoded, atlas.n_cells)) == [0, 7, 199_999]


def test_an_empty_selection_is_empty_not_an_error(atlas):
    assert decode_selection("", atlas.n_cells).size == 0


def test_indices_past_the_end_are_dropped_rather_than_crashing(atlas):
    # A selection can outlive a reload, and a stale index must not take the
    # whole output down with it.
    stale = np.array([5, 999_999_999], dtype="<u4")
    encoded = base64.b64encode(stale.tobytes()).decode("ascii")

    assert list(decode_selection(encoded, atlas.n_cells)) == [5]


def test_a_selection_that_is_not_whole_uint32s_is_refused(atlas):
    with pytest.raises(ValueError, match="whole number of uint32"):
        decode_selection(base64.b64encode(b"\x01\x02\x03").decode(), atlas.n_cells)


def test_selecting_one_cluster_reports_that_cluster_and_its_marker(atlas):
    # NK cells are cluster 6 and their marker is NKG7, which is gene 3.
    # A lasso around them must say so, or the app is telling a lie about
    # data it does hold.
    nk = np.where(atlas.cluster == 6)[0].astype(np.uint32)
    stats = selection_stats(atlas, nk)

    assert stats["n"] == nk.size
    assert len(stats["composition"]) == 1
    assert stats["composition"][0]["name"] == "NK cells"
    assert stats["composition"][0]["share"] == pytest.approx(1.0)

    # Markers come back sorted, strongest first.
    assert stats["markers"][0]["gene"] == "NKG7"
    assert stats["markers"][0]["lfc"] > 1.5
    assert stats["markers"][0]["mean"] > stats["markers"][0]["rest"]


def test_composition_shares_add_up_to_one(atlas):
    mixed = np.arange(0, atlas.n_cells, 37, dtype=np.uint32)
    stats = selection_stats(atlas, mixed)

    assert sum(row["share"] for row in stats["composition"]) == pytest.approx(1.0)
    assert sum(row["n"] for row in stats["composition"]) == stats["n"]


def test_an_empty_selection_summarizes_to_nothing(atlas):
    stats = selection_stats(atlas, np.empty(0, dtype=np.uint32))

    assert stats == {"n": 0, "composition": [], "markers": []}


def test_selecting_every_cell_does_not_divide_by_an_empty_outside(atlas):
    everything = np.arange(atlas.n_cells, dtype=np.uint32)
    stats = selection_stats(atlas, everything)

    assert stats["n"] == atlas.n_cells
    assert all(np.isfinite(row["lfc"]) for row in stats["markers"])
