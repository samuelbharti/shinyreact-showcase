"""Pure computation for the density map. No Shiny here.

Half a million trips, generated rather than stored. A hash of the trip number
gives the same answer in R and in Python, so the two servers show the same
city without shipping a two megabyte file, and without a random number
generator whose stream differs between languages.

The split this app is about:

  The client gets positions and bins them into hexagons on the GPU, and
  rebins on every zoom. That is a rendering problem.

  The server keeps the hour, the fare and the duration of every trip and
  never sends them. When you pick a hexagon it answers with a breakdown of
  attributes the client has never seen. That is a data problem.
"""

from __future__ import annotations

import base64
import json
import math
from dataclasses import dataclass
from functools import cached_property
from pathlib import Path

import numpy as np

N_TRIPS = 500_000

# A synthetic city. Centre roughly on the Thames, because a shape people half
# recognize reads as a city rather than as noise.
CENTER_LNG = -0.1276
CENTER_LAT = 51.5072

# name, lng offset, lat offset, spread, share, mean fare, mean minutes, peak hour
DISTRICTS = [
    ("Central", 0.000, 0.004, 0.016, 0.25, 14.5, 18, 18),
    ("Docklands", 0.085, -0.004, 0.014, 0.11, 22.0, 27, 18),
    ("North", -0.010, 0.055, 0.020, 0.13, 17.5, 24, 8),
    ("West End", -0.045, 0.012, 0.013, 0.16, 12.0, 15, 22),
    ("South Bank", 0.005, -0.028, 0.018, 0.12, 13.5, 17, 19),
    ("Airport corridor", -0.190, 0.020, 0.030, 0.07, 46.0, 52, 6),
    ("East", 0.060, 0.030, 0.024, 0.08, 19.0, 26, 9),
    ("Riverside", -0.085, -0.035, 0.022, 0.05, 21.0, 25, 17),
    ("Outer south", 0.020, -0.075, 0.028, 0.03, 26.0, 33, 7),
]

# The map fits inside this box, which is also the quantization range.
BOUNDS = (
    CENTER_LNG - 0.28,
    CENTER_LAT - 0.13,
    CENTER_LNG + 0.18,
    CENTER_LAT + 0.12,
)

METRICS = ["fare", "duration"]


def hash_unit(index: np.ndarray, salt: int) -> np.ndarray:
    """A repeatable value in 0 to 1, from a trip number and a salt.

    The fractional part of a large sine. Vectorizes in both languages and
    gives the same answer in both, which a seeded generator would not.
    """
    raw = np.sin(index * 12.9898 + salt * 78.233) * 43758.5453
    return raw - np.floor(raw)


@dataclass(frozen=True, eq=False)
class City:
    """Every trip. Positions are built at load; the rest when first asked for."""

    n: int

    @cached_property
    def index(self) -> np.ndarray:
        return np.arange(self.n, dtype=np.float64)

    @cached_property
    def district(self) -> np.ndarray:
        shares = np.array([d[4] for d in DISTRICTS], dtype=np.float64)
        edges = np.cumsum(shares / shares.sum())
        return np.searchsorted(edges, hash_unit(self.index, 0)).astype(np.uint8)

    @cached_property
    def position(self) -> tuple[np.ndarray, np.ndarray]:
        """Longitude and latitude per trip."""
        # Box-Muller from two hashed uniforms. Clipped away from zero because
        # log(0) is not a number anyone wants on a map.
        u1 = np.clip(hash_unit(self.index, 1), 1e-9, 1.0)
        u2 = hash_unit(self.index, 2)
        radius = np.sqrt(-2.0 * np.log(u1))
        # Clamped at 2.8 sigma. An unclamped normal has tails that reach
        # halfway across the county, which puts a stray trip in every
        # hexagon and turns the map into an even smear with no city in it.
        z1 = np.clip(radius * np.cos(2.0 * np.pi * u2), -2.8, 2.8)
        z2 = np.clip(radius * np.sin(2.0 * np.pi * u2), -2.8, 2.8)

        offsets = np.array([[d[1], d[2]] for d in DISTRICTS])
        spreads = np.array([d[3] for d in DISTRICTS])
        pick = self.district

        # Latitude degrees are longer than longitude degrees at this latitude,
        # so a circular blob in degrees would look like an ellipse on screen.
        squash = math.cos(math.radians(CENTER_LAT))
        lng = CENTER_LNG + offsets[pick, 0] + z1 * spreads[pick] / squash
        lat = CENTER_LAT + offsets[pick, 1] + z2 * spreads[pick]

        return (
            np.clip(lng, BOUNDS[0], BOUNDS[2]),
            np.clip(lat, BOUNDS[1], BOUNDS[3]),
        )

    @cached_property
    def hour(self) -> np.ndarray:
        """Hour of day, clustered around each district's peak."""
        peaks = np.array([d[7] for d in DISTRICTS], dtype=np.float64)
        spread = 3.4
        u1 = np.clip(hash_unit(self.index, 3), 1e-9, 1.0)
        u2 = hash_unit(self.index, 4)
        z = np.sqrt(-2.0 * np.log(u1)) * np.cos(2.0 * np.pi * u2)
        return np.mod(np.rint(peaks[self.district] + z * spread), 24).astype(np.uint8)

    @cached_property
    def fare(self) -> np.ndarray:
        means = np.array([d[5] for d in DISTRICTS], dtype=np.float64)
        # Log normal, because a fare distribution has a long right tail and a
        # symmetric one looks wrong to anyone who has seen a real receipt.
        u1 = np.clip(hash_unit(self.index, 5), 1e-9, 1.0)
        u2 = hash_unit(self.index, 6)
        z = np.sqrt(-2.0 * np.log(u1)) * np.cos(2.0 * np.pi * u2)
        return np.round(means[self.district] * np.exp(z * 0.35), 2)

    @cached_property
    def duration(self) -> np.ndarray:
        means = np.array([d[6] for d in DISTRICTS], dtype=np.float64)
        u1 = np.clip(hash_unit(self.index, 7), 1e-9, 1.0)
        u2 = hash_unit(self.index, 8)
        z = np.sqrt(-2.0 * np.log(u1)) * np.cos(2.0 * np.pi * u2)
        return np.round(means[self.district] * np.exp(z * 0.30), 1)

    def metric(self, name: str) -> np.ndarray:
        if name == "fare":
            return self.fare
        if name == "duration":
            return self.duration
        raise ValueError(f"Unknown metric {name!r}. Known: {', '.join(METRICS)}")


def load_city(n: int = N_TRIPS) -> City:
    return City(n=n)


def load_boundary(data_dir: Path) -> dict:
    """The city outline and river, for context under the hexagons.

    Under 3 KB, so the server ships it with the positions rather than making
    the client fetch it. No basemap tiles are involved: this app downloads
    nothing at run time, which is what lets the gallery deploy as one
    process.
    """
    return json.loads((data_dir / "boundary.json").read_text(encoding="utf-8"))


def points_payload(city: City, boundary: dict | None = None) -> dict:
    """Positions for every trip, sent once.

    Quantized to int16 against the city bounds, which is about a metre at
    this scale and half the bytes of float32.
    """
    lng, lat = city.position
    return {
        "n": int(city.n),
        "bounds": list(BOUNDS),
        "center": [CENTER_LNG, CENTER_LAT],
        "districts": [d[0] for d in DISTRICTS],
        "metrics": METRICS,
        "lng": _b64(_quantize(lng, BOUNDS[0], BOUNDS[2])),
        "lat": _b64(_quantize(lat, BOUNDS[1], BOUNDS[3])),
        "boundary": boundary,
    }


def hexagon_summary(city: City, lng: float, lat: float, radius_m: float) -> dict:
    """What the server knows about the trips under one hexagon.

    The client has the positions, so it could count them. It does not have
    the hour, the fare or the duration, and it never will: the whole point is
    that the server keeps the columns it is not asked for.
    """
    trip_lng, trip_lat = city.position

    # A metre in degrees, near enough at this latitude for a hit test.
    lat_degrees = radius_m / 111_320.0
    lng_degrees = lat_degrees / math.cos(math.radians(CENTER_LAT))

    inside = (np.abs(trip_lng - lng) <= lng_degrees) & (
        np.abs(trip_lat - lat) <= lat_degrees
    )
    count = int(np.count_nonzero(inside))
    if count == 0:
        return {
            "count": 0,
            "hours": [],
            "districts": [],
            "fare": None,
            "duration": None,
        }

    hours = np.bincount(city.hour[inside], minlength=24).tolist()
    district_counts = np.bincount(city.district[inside], minlength=len(DISTRICTS))
    districts = [
        {"name": DISTRICTS[i][0], "n": int(district_counts[i])}
        for i in np.argsort(-district_counts)
        if district_counts[i] > 0
    ]

    fares = city.fare[inside]
    durations = city.duration[inside]

    return {
        "count": count,
        "hours": hours,
        "districts": districts[:4],
        "fare": {
            "mean": round(float(fares.mean()), 2),
            "median": round(float(np.median(fares)), 2),
            "p90": round(float(np.percentile(fares, 90)), 2),
        },
        "duration": {
            "mean": round(float(durations.mean()), 1),
            "median": round(float(np.median(durations)), 1),
        },
    }


def _quantize(values: np.ndarray, low: float, high: float) -> np.ndarray:
    scaled = (values - low) / (high - low)
    return np.round(scaled * 65534.0 - 32767.0).astype(np.int16)


def _b64(values: np.ndarray) -> str:
    return base64.b64encode(values.tobytes()).decode("ascii")
