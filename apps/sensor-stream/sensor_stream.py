"""Pure computation for the sensor stream. No Shiny here.

The readings are generated rather than stored. A stream has no data file to
bundle, and a deterministic function of the tick number means the Python and
R servers produce the same trace, which is what makes the two deployments
comparable.

Nothing here uses a random number generator. `jitter` is the classic shader
trick of taking the fractional part of a large sine, which is reproducible
across languages in a way that R and Python RNGs are not.
"""

from __future__ import annotations

import math
from dataclasses import dataclass

# Each channel is a slow drift plus a faster ripple plus a little noise, so
# the trace looks like an instrument rather than a sine wave.
#
# name, unit, base, drift amplitude, drift period, ripple amplitude,
# ripple period, noise amplitude, color
CHANNELS = [
    ("Coolant temp", "degC", 21.5, 2.6, 37.0, 0.45, 4.3, 0.22, "#4c78a8"),
    ("Line pressure", "kPa", 101.3, 1.8, 53.0, 0.30, 2.9, 0.14, "#f58518"),
    ("Vibration", "mm/s", 1.9, 0.9, 23.0, 0.55, 1.7, 0.30, "#e45756"),
    ("Flow rate", "L/min", 48.0, 5.5, 71.0, 1.20, 6.1, 0.60, "#54a24b"),
]

MIN_HZ = 1
MAX_HZ = 30


@dataclass(frozen=True)
class Channel:
    name: str
    unit: str
    color: str


def channels() -> list[dict]:
    """What the client needs to label and color the traces."""
    return [
        {"name": name, "unit": unit, "color": color}
        for name, unit, _, _, _, _, _, _, color in CHANNELS
    ]


def jitter(tick: int, channel: int) -> float:
    """A repeatable value in -1 to 1, standing in for sensor noise.

    The fractional part of a large sine. Deterministic, vectorizes nowhere,
    and gives the same answer in R and in Python, which a seeded RNG would
    not.
    """
    raw = math.sin(tick * 12.9898 + channel * 78.233) * 43758.5453
    return (raw - math.floor(raw)) * 2.0 - 1.0


def reading(tick: int) -> list[float]:
    """One reading per channel at this tick."""
    out = []
    for index, (_, _, base, drift, drift_p, ripple, ripple_p, noise, _) in enumerate(
        CHANNELS
    ):
        value = (
            base
            + drift * math.sin(tick / drift_p)
            + ripple * math.sin(tick / ripple_p)
            + noise * jitter(tick, index)
        )
        out.append(round(value, 4))
    return out


def clamp_rate(rate: float | None) -> int:
    """Keep the requested rate inside what the server will actually serve.

    The client sends this, and a client can send anything. A rate of zero
    would busy loop the reactive timer and a very large one would flood the
    websocket.
    """
    if rate is None:
        return 10
    return max(MIN_HZ, min(MAX_HZ, int(rate)))


def interval_seconds(rate_hz: float | None) -> float:
    """Seconds between ticks, for the reactive timer."""
    return 1.0 / clamp_rate(rate_hz)
