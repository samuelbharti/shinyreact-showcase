"""Pure computation for the slide viewer. No Shiny here.

There is no image file. The slide is 6.4 gigapixels, which is a real size for
a scanned pathology slide and an absurd thing to put in a git repository, so
the server describes it and the browser draws it.

The split this app is about:

  The server owns the structure of the slide: how big it is, how many zoom
  levels it has, where the tissue lobes sit and which regions a reader has
  flagged. All of that is a few kilobytes.

  The client owns the pixels. It generates every tile on demand from that
  description, at whatever zoom level the viewer is showing, which is the
  thing a server rendered image cannot do at all.
"""

from __future__ import annotations

import math
from dataclasses import dataclass

# A scanned slide at 40x. 0.25 microns per pixel is what most scanners give,
# and these dimensions are ordinary for a whole slide image.
WIDTH = 98_304
HEIGHT = 65_536
TILE_SIZE = 256
MICRONS_PER_PIXEL = 0.25
MAGNIFICATION = 40

SEED = 20260913

# Tissue sits in lobes rather than covering the slide. The client draws its
# fine texture, but these decide where there is anything to draw at all.
# x, y, radius x, radius y, rotation in degrees, density
LOBES = [
    (0.30, 0.42, 0.20, 0.26, 18, 0.95),
    (0.45, 0.30, 0.16, 0.13, -25, 0.88),
    (0.62, 0.52, 0.19, 0.22, 40, 0.92),
    (0.52, 0.68, 0.13, 0.11, 5, 0.80),
    (0.22, 0.66, 0.11, 0.14, -12, 0.74),
    (0.74, 0.32, 0.10, 0.12, 55, 0.70),
    (0.38, 0.54, 0.09, 0.08, 0, 0.85),
    (0.68, 0.70, 0.08, 0.07, 30, 0.66),
]

# What a reader flagged, and what only the server knows about each one.
# The list that reaches the client carries the box and the label. The
# measurements below stay here until somebody clicks.
FINDINGS = [
    ("Tumour nest, high grade", 0.312, 0.404, 0.93),
    ("Tumour nest, high grade", 0.335, 0.437, 0.89),
    ("Mitotic figure cluster", 0.451, 0.298, 0.81),
    ("Lymphocytic infiltrate", 0.614, 0.512, 0.77),
    ("Lymphocytic infiltrate", 0.642, 0.536, 0.72),
    ("Necrosis", 0.523, 0.681, 0.86),
    ("Stroma, desmoplastic", 0.228, 0.658, 0.64),
    ("Tumour nest, low grade", 0.735, 0.324, 0.70),
    ("Vascular invasion", 0.381, 0.540, 0.88),
    ("Mitotic figure cluster", 0.678, 0.702, 0.75),
    ("Benign gland", 0.268, 0.470, 0.58),
    ("Benign gland", 0.592, 0.560, 0.55),
]


def max_level(width: int = WIDTH, height: int = HEIGHT) -> int:
    """The deepest zoom level, the way OpenSeadragon counts them.

    Level 0 is one pixel and the deepest level is the slide at full size, so
    the count is however many times you can halve the longest side.
    """
    return math.ceil(math.log2(max(width, height)))


def level_count(width: int = WIDTH, height: int = HEIGHT) -> int:
    return max_level(width, height) + 1


@dataclass(frozen=True)
class Region:
    index: int
    label: str
    confidence: float
    x: int
    y: int
    width: int
    height: int


def regions() -> list[Region]:
    """The flagged regions, in slide pixel coordinates."""
    out = []
    for index, (label, fx, fy, confidence) in enumerate(FINDINGS):
        # Box size follows the finding: an infiltrate covers more ground than
        # a mitotic figure.
        span = 2_400 if label.startswith("Lymphocytic") else 1_400
        out.append(
            Region(
                index=index,
                label=label,
                confidence=confidence,
                x=int(fx * WIDTH) - span // 2,
                y=int(fy * HEIGHT) - span // 2,
                width=span,
                height=span,
            )
        )
    return out


def slide_payload() -> dict:
    """Everything the client needs to draw the slide. A few kilobytes.

    This is the whole point: the description of a 6.4 gigapixel image fits in
    one small message, and the browser turns it into as many pixels as the
    viewer asks for.
    """
    return {
        "width": WIDTH,
        "height": HEIGHT,
        "tileSize": TILE_SIZE,
        "maxLevel": max_level(),
        "levels": level_count(),
        "micronsPerPixel": MICRONS_PER_PIXEL,
        "magnification": MAGNIFICATION,
        "seed": SEED,
        "gigapixels": round(WIDTH * HEIGHT / 1e9, 2),
        "lobes": [
            {
                "x": lobe[0],
                "y": lobe[1],
                "rx": lobe[2],
                "ry": lobe[3],
                "angle": lobe[4],
                "density": lobe[5],
            }
            for lobe in LOBES
        ],
        "regions": [
            {
                "index": region.index,
                "label": region.label,
                "x": region.x,
                "y": region.y,
                "width": region.width,
                "height": region.height,
            }
            for region in regions()
        ],
    }


def region_detail(index: int) -> dict | None:
    """The measurements behind one flagged region.

    The client has the box and the label, because it draws the marker. It
    does not have any of this, which is why clicking a marker is the one
    thing in this app that needs the server.
    """
    found = [region for region in regions() if region.index == index]
    if not found:
        return None
    region = found[0]

    area_mm2 = (
        region.width * MICRONS_PER_PIXEL * region.height * MICRONS_PER_PIXEL
    ) / 1e6

    # Counts derived from the region rather than stored, so the numbers stay
    # consistent with the box the client is drawing.
    density_per_mm2 = 3_200 + (region.index * 137) % 2_600
    nuclei = int(area_mm2 * density_per_mm2)
    mitoses = max(0, int(nuclei / 1_800) + (region.index % 5) - 2)

    return {
        "index": region.index,
        "label": region.label,
        "confidence": region.confidence,
        "x": region.x,
        "y": region.y,
        "width": region.width,
        "height": region.height,
        "areaMm2": round(area_mm2, 4),
        "nuclei": nuclei,
        "nucleiPerMm2": density_per_mm2,
        "mitoses": mitoses,
        "meanNuclearArea": round(28.0 + (region.index * 7 % 22), 1),
        "stain": "H&E",
    }


def scale_bar(zoom_level: int) -> dict:
    """How many microns one screen pixel covers at a zoom level.

    A viewer without a scale is a picture. With one it is a measurement, and
    this is the number a pathologist reads first.
    """
    downsample = 2 ** (max_level() - zoom_level)
    microns = MICRONS_PER_PIXEL * downsample
    return {
        "level": zoom_level,
        "downsample": downsample,
        "micronsPerPixel": round(microns, 4),
        "magnification": round(MAGNIFICATION / downsample, 3),
    }
