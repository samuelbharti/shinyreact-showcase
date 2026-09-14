"""Layer one: the slide description, with no Shiny anywhere.

What this app does, in plain English:

  There is no image file. The server describes a 6.4 gigapixel slide in about
  two kilobytes: how big it is, how many zoom levels it has, where the tissue
  lobes sit and which regions a reader flagged. The browser draws every tile
  from that description at whatever zoom level the viewer is showing.

  Clicking a flagged region asks the server for its measurements, which are
  the one thing the client was never sent.
"""

import json
import sys
from pathlib import Path

APP_DIR = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(APP_DIR))

# The app directory goes on sys.path just above.
from slide_viewer import (  # noqa: E402
    HEIGHT,
    MAGNIFICATION,
    MICRONS_PER_PIXEL,
    WIDTH,
    level_count,
    max_level,
    region_detail,
    regions,
    scale_bar,
    slide_payload,
)


def test_the_slide_is_the_size_it_claims():
    assert WIDTH * HEIGHT / 1e9 > 6.0
    assert slide_payload()["gigapixels"] == 6.44


def test_the_pyramid_has_enough_levels_to_hold_the_slide():
    # The deepest level must cover the longest side, or the viewer runs out
    # of pyramid before it reaches full resolution.
    assert 2 ** max_level() >= max(WIDTH, HEIGHT)
    assert 2 ** (max_level() - 1) < max(WIDTH, HEIGHT)
    assert level_count() == max_level() + 1


def test_the_whole_description_fits_in_a_small_message():
    # This is the claim in one number. A 6.4 gigapixel image, described in
    # less than four kilobytes.
    size = len(json.dumps(slide_payload()))

    assert size < 4_000, size


def test_the_payload_carries_the_lobes_and_the_regions():
    payload = slide_payload()

    assert len(payload["lobes"]) == 8
    assert len(payload["regions"]) == 12
    for lobe in payload["lobes"]:
        assert set(lobe) == {"x", "y", "rx", "ry", "angle", "density"}


def test_the_payload_never_carries_a_measurement():
    # The whole split rests on this. If the counts ever ride along with the
    # region list, clicking a marker stops needing the server.
    for region in slide_payload()["regions"]:
        assert "nuclei" not in region
        assert "mitoses" not in region
        assert "confidence" not in region


def test_every_region_sits_inside_the_slide():
    for region in regions():
        assert region.x >= 0
        assert region.y >= 0
        assert region.x + region.width <= WIDTH
        assert region.y + region.height <= HEIGHT


def test_region_indices_are_unique_and_contiguous():
    indices = [region.index for region in regions()]

    assert indices == list(range(len(indices)))


def test_region_detail_answers_what_the_client_was_not_sent():
    detail = region_detail(0)

    assert detail is not None
    assert detail["label"] == "Tumour nest, high grade"
    assert detail["nuclei"] > 0
    assert detail["nucleiPerMm2"] > 0
    assert 0 < detail["confidence"] <= 1


def test_the_known_region_detail_has_not_moved():
    # Pinned so a change is deliberate. The R tests assert the same numbers.
    detail = region_detail(0)

    assert detail["areaMm2"] == 0.1225
    assert detail["nuclei"] == 392
    assert detail["nucleiPerMm2"] == 3200
    assert detail["mitoses"] == 0
    assert detail["meanNuclearArea"] == 28.0


def test_area_follows_the_box_and_the_scanner_resolution():
    # A 1400 pixel box at 0.25 microns per pixel is 350 microns on a side.
    detail = region_detail(0)
    expected = (1400 * 0.25) ** 2 / 1e6

    assert abs(detail["areaMm2"] - expected) < 1e-6


def test_an_unknown_region_gives_nothing_rather_than_an_error():
    # A stale click can outlive a reload.
    assert region_detail(999) is None
    assert region_detail(-1) is None


def test_the_deepest_level_is_the_scanner_resolution():
    deepest = scale_bar(max_level())

    assert deepest["downsample"] == 1
    assert deepest["micronsPerPixel"] == MICRONS_PER_PIXEL
    assert deepest["magnification"] == MAGNIFICATION


def test_each_level_up_halves_the_magnification():
    deep = scale_bar(max_level())
    one_up = scale_bar(max_level() - 1)

    assert one_up["micronsPerPixel"] == deep["micronsPerPixel"] * 2
    assert one_up["magnification"] == deep["magnification"] / 2


def test_the_payload_is_json_serializable():
    json.dumps(slide_payload())
    json.dumps(region_detail(3))
