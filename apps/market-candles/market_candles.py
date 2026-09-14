"""Pure computation for the candle chart. No Shiny here.

Six symbols, about five months of one minute bars each, generated from a hash
of the bar number, so all three languages build the same series and the repo
ships none of it.

The split this app is about:

  The client gets one symbol's bars and then owns the chart. Panning,
  zooming and the crosshair are lightweight-charts doing its own work.

  The server can draw the same window as a picture, which is what a plain
  Shiny app does, and this app makes it do so on demand. Every pan and every
  zoom then costs a render and a round trip, which is the comparison.
"""

from __future__ import annotations

import base64
import io
import math
from dataclasses import dataclass
from functools import lru_cache

import matplotlib

# Agg before pyplot: this process has no display, and importing pyplot first
# picks a backend that wants one.
matplotlib.use("Agg")

import matplotlib.pyplot as plt
import numpy as np

# name, opening price, annual drift, annual volatility
SYMBOLS = [
    ("ACME", 142.50, 0.11, 0.28),
    ("BRDG", 68.20, -0.04, 0.35),
    ("CYGN", 311.75, 0.22, 0.44),
    ("DELT", 25.40, 0.06, 0.22),
    ("ELMR", 89.15, 0.15, 0.31),
    ("FTHM", 7.85, -0.12, 0.62),
]

# One minute bars, 390 per trading session. A hundred sessions is about five
# months, which is 39,000 candles: more than any chart draws at once, and a
# payload near a megabyte. Five hundred sessions was five megabytes, which is
# a worse trade than it looks.
BARS_PER_SESSION = 390
SESSIONS = 100
BAR_COUNT = BARS_PER_SESSION * SESSIONS

# Unix seconds for the first bar. A round number, and lightweight-charts
# wants seconds rather than milliseconds.
START_TIME = 1_700_000_000
BAR_SECONDS = 60

TRADING_MINUTES_PER_YEAR = BARS_PER_SESSION * 252


def hash_unit(index: np.ndarray, salt: int) -> np.ndarray:
    """A repeatable value in 0 to 1, from a bar number and a salt.

    Small multiplier on `index` for the same reason as elsewhere in this
    repo: a large one pushes the argument to sin into the millions, where
    the three languages stop agreeing in the last bit.
    """
    raw = np.sin(index * 0.0137 + salt * 7.919) * 43758.5453
    return raw - np.floor(raw)


def normals(index: np.ndarray, salt_a: int, salt_b: int) -> np.ndarray:
    """Box-Muller from two hashed uniforms, clamped at three sigma.

    Unclamped, a long minute series eventually produces a move that
    dwarfs everything else and flattens the rest of the chart.
    """
    u1 = np.clip(hash_unit(index, salt_a), 1e-9, 1.0)
    u2 = hash_unit(index, salt_b)
    z = np.sqrt(-2.0 * np.log(u1)) * np.cos(2.0 * np.pi * u2)
    return np.clip(z, -3.0, 3.0)


@dataclass(frozen=True)
class Series:
    symbol: str
    time: np.ndarray
    open: np.ndarray
    high: np.ndarray
    low: np.ndarray
    close: np.ndarray
    volume: np.ndarray


@lru_cache(maxsize=len(SYMBOLS))
def load_series(symbol: str) -> Series:
    """Build one symbol's whole history. Cached, because readers come back."""
    found = [row for row in SYMBOLS if row[0] == symbol]
    if not found:
        raise KeyError(f"No symbol called {symbol!r}. Known: {', '.join(names())}")
    _, start_price, drift, volatility = found[0]

    index = np.arange(BAR_COUNT, dtype=np.float64)
    # Geometric random walk, per minute.
    per_bar_drift = drift / TRADING_MINUTES_PER_YEAR
    per_bar_vol = volatility / math.sqrt(TRADING_MINUTES_PER_YEAR)
    steps = per_bar_drift + per_bar_vol * normals(index, 11, 12)

    close = start_price * np.exp(np.cumsum(steps))
    open_ = np.empty_like(close)
    open_[0] = start_price
    open_[1:] = close[:-1]

    # Wicks, as a fraction of the bar's own move plus a floor, so a quiet bar
    # still has a little range rather than being a flat line.
    spread = np.abs(close - open_) + close * per_bar_vol * 0.6
    high = np.maximum(open_, close) + spread * hash_unit(index, 13)
    low = np.minimum(open_, close) - spread * hash_unit(index, 14)

    # Volume peaks at the open and the close, the way it really does.
    minute = index % BARS_PER_SESSION
    shape = 0.35 + 0.65 * np.abs(minute / BARS_PER_SESSION - 0.5) * 2
    volume = np.rint((2_000 + hash_unit(index, 15) * 18_000) * shape).astype(np.int64)

    return Series(
        symbol=symbol,
        time=(START_TIME + index * BAR_SECONDS).astype(np.int64),
        open=np.round(open_, 4),
        high=np.round(high, 4),
        low=np.round(low, 4),
        close=np.round(close, 4),
        volume=volume,
    )


def names() -> list[str]:
    return [row[0] for row in SYMBOLS]


def catalog() -> dict:
    """The symbol list, sent once."""
    return {
        "symbols": names(),
        "bars": BAR_COUNT,
        "barSeconds": BAR_SECONDS,
        "startTime": START_TIME,
        "barsPerSession": BARS_PER_SESSION,
    }


def series_payload(series: Series) -> dict:
    """One symbol's whole history, sent when the symbol changes.

    Prices go as int32 in hundredths. Four bytes a field rather than eight,
    and a hundredth of a currency unit is finer than any chart draws.
    """
    return {
        "symbol": series.symbol,
        "bars": int(series.time.size),
        "startTime": int(series.time[0]),
        "barSeconds": BAR_SECONDS,
        "scale": 100,
        "open": _b64(_cents(series.open)),
        "high": _b64(_cents(series.high)),
        "low": _b64(_cents(series.low)),
        "close": _b64(_cents(series.close)),
        "volume": _b64(series.volume.astype("<u4")),
    }


def window_stats(series: Series, first: int, last: int) -> dict:
    """What the visible window looks like, in numbers.

    The client has the bars, so it could work most of this out. It is here
    because the server path needs it too, and both paths asking the same
    function is what makes the comparison fair.
    """
    first = max(0, min(int(first), series.time.size - 1))
    last = max(first, min(int(last), series.time.size - 1))

    close = series.close[first : last + 1]
    high = series.high[first : last + 1]
    low = series.low[first : last + 1]
    volume = series.volume[first : last + 1]

    peak = np.maximum.accumulate(close)
    drawdown = float(((close - peak) / peak).min()) if close.size else 0.0

    return {
        "bars": int(close.size),
        "first": first,
        "last": last,
        "open": float(series.open[first]),
        "close": float(close[-1]) if close.size else 0.0,
        "high": float(high.max()) if high.size else 0.0,
        "low": float(low.min()) if low.size else 0.0,
        "change": (
            round(float(close[-1] - series.open[first]), 4) if close.size else 0.0
        ),
        "changePercent": (
            round(float((close[-1] / series.open[first] - 1) * 100), 3)
            if close.size and series.open[first]
            else 0.0
        ),
        "volume": int(volume.sum()),
        "maxDrawdown": round(drawdown * 100, 3),
    }


def render_window(series: Series, first: int, last: int, width: int, height: int):
    """Draw the same window as a picture, the way a plain Shiny app would.

    This is the other half of the comparison. It exists to be slow in the
    way that a server rendered chart is slow: the work happens here, the
    result is a PNG, and every pan and zoom pays for another one.
    """
    first = max(0, min(int(first), series.time.size - 1))
    last = max(first, min(int(last), series.time.size - 1))

    # Candles are drawn per bar, so a wide window is genuinely expensive.
    # Thinning it would be the honest thing a real app does, and it would
    # also hide the cost this app is here to show.
    step = max(1, (last - first + 1) // 1_200)
    at = np.arange(first, last + 1, step)

    figure, axes = plt.subplots(
        figsize=(width / 100, height / 100), dpi=100, constrained_layout=True
    )
    up = series.close[at] >= series.open[at]

    axes.vlines(
        at,
        series.low[at],
        series.high[at],
        linewidth=0.6,
        color=np.where(up, "#26a69a", "#ef5350"),
    )
    axes.vlines(
        at,
        series.open[at],
        series.close[at],
        linewidth=2.4,
        color=np.where(up, "#26a69a", "#ef5350"),
    )

    axes.set_title(f"{series.symbol}  bars {first} to {last}", fontsize=9)
    axes.tick_params(labelsize=7)
    axes.grid(True, alpha=0.15)
    for side in ("top", "right"):
        axes.spines[side].set_visible(False)

    return figure


def png_bytes(figure) -> bytes:
    buffer = io.BytesIO()
    figure.savefig(buffer, format="png")
    return buffer.getvalue()


def warm_renderer() -> None:
    """Pay matplotlib's font cache once, at load.

    The first savefig in a process costs about a second and a half while the
    font list is built. Leaving that inside the first render would make the
    server path look slower than it is, for a reason that has nothing to do
    with the comparison.
    """
    figure = plt.figure(figsize=(1, 1))
    figure.savefig(io.BytesIO(), format="png")
    plt.close(figure)


def _cents(values: np.ndarray) -> np.ndarray:
    return np.rint(values * 100).astype("<i4")


def _b64(values: np.ndarray) -> str:
    return base64.b64encode(values.tobytes()).decode("ascii")
