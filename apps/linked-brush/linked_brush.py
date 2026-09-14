"""A synthetic star catalogue, and the one thing the server computes about it.

Forty thousand stars, built from a hash of the star number so all three
languages agree and the repo ships no data file.

The split this app is about:

  The client gets the whole catalogue once and then owns the brushing. Four
  panels cross filter each other while the pointer moves, and the server
  hears none of it.

  When the pointer is released, the client sends the brush rectangles. The
  server selects the same stars from its own copy and fits a line through
  them. That is one round trip, for one considered answer, and it is the
  only thing the drag costs.

The physics is real enough to be worth brushing. A magnitude limited survey
sees bright stars much further away than faint ones, so brushing the blue end
of the main sequence picks out stars a few kiloparsecs off, and brushing the
white dwarfs picks out stars inside ten parsecs. The panels make that visible.
"""

from __future__ import annotations

import base64
from dataclasses import dataclass
from functools import lru_cache

import numpy as np

STAR_COUNT = 40_000

# How faint the survey can see. Everything else follows from this: a star is
# in the catalogue only as far away as this limit allows.
APPARENT_LIMIT = 11.5

# Vertical thickness of the disc, in parsecs. Distant stars are confined to
# it, which is why the sky panel has a bright band across the middle.
DISC_SCALE_HEIGHT = 350.0

MAIN_SEQUENCE, GIANT, WHITE_DWARF = 0, 1, 2

POPULATIONS = ("Main sequence", "Giants", "White dwarfs")

# Main sequence colour to absolute magnitude, a cubic fitted to the standard
# spectral type table (B0V through M5V). Written out by Horner rather than
# with powers, so Python, R and JavaScript do the same multiplies in the same
# order and land on the same bits.
MS_C3, MS_C2, MS_C1, MS_C0 = 1.7429, -5.0307, 9.7440, 0.2686


def hash_unit(index: np.ndarray, salt: int) -> np.ndarray:
    """A repeatable value in 0 to 1, from a star number and a salt.

    Small multiplier on `index` for the same reason as elsewhere in this
    repo: a large one pushes the argument to sin into the millions, where
    the three languages stop agreeing in the last bit.
    """
    raw = np.sin(index * 0.0137 + salt * 7.919) * 43758.5453
    return raw - np.floor(raw)


def normals(index: np.ndarray, salt_a: int, salt_b: int) -> np.ndarray:
    """Box-Muller from two hashed uniforms, clamped at three sigma.

    A flat draw gives every band a hard edge, which reads as a drawn line
    rather than as measurements. Stars scatter about a relation; they do not
    fill a rectangle around it.
    """
    u1 = np.clip(hash_unit(index, salt_a), 1e-9, 1.0)
    u2 = hash_unit(index, salt_b)
    z = np.sqrt(-2.0 * np.log(u1)) * np.cos(2.0 * np.pi * u2)
    return np.clip(z, -3.0, 3.0)


def main_sequence_magnitude(colour: np.ndarray) -> np.ndarray:
    """Absolute visual magnitude of a main sequence star of this colour."""
    return ((MS_C3 * colour + MS_C2) * colour + MS_C1) * colour + MS_C0


@dataclass(frozen=True)
class Catalogue:
    """The star table, held at the precision the client is sent.

    Every field is an integer in fixed units. That is deliberate rather than
    a storage trick: the client is sent these integers, so if the server kept
    full precision floats the two would disagree about stars sitting exactly
    on a brush edge. Rounding once, here, makes the two selections identical
    by construction.
    """

    colour: np.ndarray  # B minus V, thousandths
    absolute: np.ndarray  # absolute visual magnitude, hundredths
    longitude: np.ndarray  # galactic longitude in degrees, hundredths, -180 to 180
    latitude: np.ndarray  # galactic latitude in degrees, hundredths
    log_distance: np.ndarray  # log10 parsecs, thousandths
    apparent: np.ndarray  # apparent visual magnitude, hundredths
    population: np.ndarray  # index into POPULATIONS

    @property
    def size(self) -> int:
        return int(self.colour.size)


@lru_cache(maxsize=1)
def load_catalogue(count: int = STAR_COUNT) -> Catalogue:
    """Build the whole catalogue. Cached: every session shares one copy."""
    index = np.arange(count, dtype=np.float64)

    which = hash_unit(index, 21)
    is_giant = (which >= 0.780) & (which < 0.945)
    is_dwarf = which >= 0.945

    shade = hash_unit(index, 22)

    # Two independent draws, so a band has width in both directions. Using
    # one for both would only tilt it.
    jitter = normals(index, 31, 32)
    tint = normals(index, 33, 34)

    # Main sequence. The exponent skews the draw towards the red end,
    # because faint red stars vastly outnumber bright blue ones.
    #
    # The magnitude comes off the relation at the unscattered colour and is
    # scattered separately. Scattering the colour first and then reading the
    # relation would move every star along the band instead of across it,
    # and the band would stay a line.
    base_colour = -0.33 + 2.23 * shade**0.62
    colour = base_colour + tint * 0.035
    absolute = main_sequence_magnitude(base_colour) + jitter * 0.75

    # Giants. The branch climbs to the upper right: redder and brighter.
    giant_colour = 0.80 + 0.95 * shade + tint * 0.045
    giant_absolute = 2.60 - 5.0 * (0.95 * shade) + jitter * 0.85

    # The red clump, where helium burning stars pile up. It is the densest
    # spot on a real colour magnitude diagram and the reason the giant branch
    # is worth brushing at all.
    in_clump = is_giant & (hash_unit(index, 24) < 0.42)
    giant_colour = np.where(in_clump, 1.02 + tint * 0.055, giant_colour)
    giant_absolute = np.where(in_clump, 0.70 + jitter * 0.40, giant_absolute)

    # White dwarfs: a narrow sequence far below the main one.
    dwarf_colour = -0.10 + 1.00 * shade + tint * 0.03
    dwarf_absolute = 10.40 + 4.60 * (dwarf_colour + 0.10) + jitter * 0.45

    colour = np.where(is_giant, giant_colour, np.where(is_dwarf, dwarf_colour, colour))
    absolute = np.where(
        is_giant, giant_absolute, np.where(is_dwarf, dwarf_absolute, absolute)
    )

    population = np.where(
        is_giant, GIANT, np.where(is_dwarf, WHITE_DWARF, MAIN_SEQUENCE)
    ).astype(np.uint8)

    # How far the survey can see a star of this brightness, and then a
    # uniform draw through that volume. The cube root is what makes it
    # uniform in volume rather than in radius.
    reach = np.clip(10.0 ** ((APPARENT_LIMIT - absolute + 5.0) / 5.0), 2.0, 12_000.0)
    distance = np.maximum(reach * hash_unit(index, 25) ** (1.0 / 3.0), 1.5)

    apparent = absolute + 5.0 * np.log10(distance) - 5.0

    # Latitude. A distant star has to lie within the disc to be seen at all,
    # so its possible latitudes narrow with distance. A nearby one can sit
    # anywhere. Squaring the draw pulls stars towards the plane inside that.
    limit = np.clip(np.degrees(np.arctan(DISC_SCALE_HEIGHT / distance)), 1.5, 89.0)
    offset = 2.0 * hash_unit(index, 26) - 1.0
    latitude = limit * offset * np.abs(offset)

    # Centred on the galactic centre, the way an all sky plot is drawn,
    # and it keeps the packed field inside a signed short like the rest.
    longitude = 360.0 * hash_unit(index, 27) - 180.0

    return Catalogue(
        colour=np.rint(colour * 1000).astype("<i2"),
        absolute=np.rint(absolute * 100).astype("<i2"),
        longitude=np.rint(longitude * 100).astype("<i2"),
        latitude=np.rint(latitude * 100).astype("<i2"),
        log_distance=np.rint(np.log10(distance) * 1000).astype("<i2"),
        apparent=np.rint(apparent * 100).astype("<i2"),
        population=population,
    )


# The units each packed field is stored in. The client divides by these, and
# so does everything below, so the two sides read the same numbers.
SCALES = {
    "colour": 1000,
    "absolute": 100,
    "longitude": 100,
    "latitude": 100,
    "logDistance": 1000,
    "apparent": 100,
}


def field_ranges(catalogue: Catalogue) -> dict:
    """The extent of every field, so the client can build its scales."""
    pairs = (
        ("colour", catalogue.colour),
        ("absolute", catalogue.absolute),
        ("longitude", catalogue.longitude),
        ("latitude", catalogue.latitude),
        ("logDistance", catalogue.log_distance),
        ("apparent", catalogue.apparent),
    )
    return {
        name: {
            "min": float(values.min()) / SCALES[name],
            "max": float(values.max()) / SCALES[name],
        }
        for name, values in pairs
    }


def summary() -> dict:
    """What the page needs before the catalogue arrives. Sent once."""
    catalogue = load_catalogue()
    counts = np.bincount(catalogue.population, minlength=len(POPULATIONS))
    return {
        "stars": catalogue.size,
        "populations": list(POPULATIONS),
        "populationCounts": [int(n) for n in counts],
        "apparentLimit": APPARENT_LIMIT,
        "ranges": field_ranges(catalogue),
        "scales": dict(SCALES),
    }


def catalogue_payload() -> dict:
    """The whole table, packed, sent once.

    Thirteen bytes a star. Sending doubles would be five times the size for
    precision no panel four hundred pixels wide can draw.
    """
    catalogue = load_catalogue()
    return {
        "stars": catalogue.size,
        "scales": dict(SCALES),
        "colour": _b64(catalogue.colour),
        "absolute": _b64(catalogue.absolute),
        "longitude": _b64(catalogue.longitude),
        "latitude": _b64(catalogue.latitude),
        "logDistance": _b64(catalogue.log_distance),
        "apparent": _b64(catalogue.apparent),
        "population": _b64(catalogue.population),
    }


# Which packed field each panel's axes read. The client holds the same map,
# and both sides have to agree or the server would fit a different selection
# from the one on screen.
PANEL_FIELDS = {
    "hr": ("colour", "absolute"),
    "sky": ("longitude", "latitude"),
    "distance": ("logDistance", None),
    "apparent": ("apparent", None),
}


def _values(catalogue: Catalogue, field: str) -> np.ndarray:
    packed = {
        "colour": catalogue.colour,
        "absolute": catalogue.absolute,
        "longitude": catalogue.longitude,
        "latitude": catalogue.latitude,
        "logDistance": catalogue.log_distance,
        "apparent": catalogue.apparent,
    }[field]
    return packed.astype(np.float64) / SCALES[field]


def select(catalogue: Catalogue, brushes: dict | None) -> np.ndarray:
    """Stars inside every active brush at once.

    Four panels, each holding its own rectangle, and a star has to satisfy
    all of them. That is cross filtering, and it is the reason the brushes
    are worth linking rather than just mirroring.
    """
    keep = np.ones(catalogue.size, dtype=bool)
    if not brushes:
        return keep

    for panel, rect in brushes.items():
        if not rect or panel not in PANEL_FIELDS:
            continue
        x_field, y_field = PANEL_FIELDS[panel]

        x = _values(catalogue, x_field)
        keep &= (x >= rect["x0"]) & (x <= rect["x1"])

        if y_field is not None and rect.get("y0") is not None:
            y = _values(catalogue, y_field)
            keep &= (y >= rect["y0"]) & (y <= rect["y1"])

    return keep


def fit_selection(brushes: dict | None) -> dict:
    """Least squares through the selected stars, plus what they are.

    This is the server's whole job, and it runs once per released brush
    rather than once per pointer move. Everything the panels draw while the
    pointer is down was worked out in the browser.
    """
    catalogue = load_catalogue()
    keep = select(catalogue, brushes)
    count = int(keep.sum())

    counts = np.bincount(catalogue.population[keep], minlength=len(POPULATIONS))
    result: dict = {
        "stars": count,
        "populations": list(POPULATIONS),
        "populationCounts": [int(n) for n in counts],
    }

    # Keys are left out rather than set to null when there is nothing to
    # report. R drops a NULL out of a list, and jsonlite writes an empty
    # object for one that survives, so a key that is sometimes null is a key
    # the two servers disagree about. Absent means absent in both.
    if count == 0:
        return result

    log_distance = _values(catalogue, "logDistance")[keep]
    result["medianParsecs"] = round(float(10.0 ** np.median(log_distance)), 2)

    colour = _values(catalogue, "colour")[keep]
    absolute = _values(catalogue, "absolute")[keep]
    result["colourRange"] = [
        round(float(colour.min()), 3),
        round(float(colour.max()), 3),
    ]

    # Three points is the least that gives a residual worth reporting, and a
    # selection with no spread in colour has no slope at all.
    mean_colour = float(colour.mean())
    mean_absolute = float(absolute.mean())
    dx = colour - mean_colour
    dy = absolute - mean_absolute
    sxx = float((dx * dx).sum())
    syy = float((dy * dy).sum())

    if count < 3 or sxx <= 0.0:
        return result

    # Written as sums about the mean rather than handed to a least squares
    # solver, so this file and its R twin do the same arithmetic in the same
    # order. A solver would agree to about twelve digits, which is fine until
    # a test pins a number and the two rounds land either side of it.
    sxy = float((dx * dy).sum())
    slope = sxy / sxx
    intercept = mean_absolute - slope * mean_colour
    residual = absolute - (slope * colour + intercept)

    result["fit"] = {
        "slope": round(slope, 4),
        "intercept": round(intercept, 4),
        "scatter": round(float(residual.std(ddof=1)), 4),
        "correlation": round(sxy / (sxx * syy) ** 0.5, 4) if syy > 0.0 else 0.0,
    }

    return result


def _b64(values: np.ndarray) -> str:
    return base64.b64encode(values.tobytes()).decode("ascii")
