"""Layer one: the price series and the window numbers, with no Shiny.

What this app does, in plain English:

  The server builds six symbols of one minute bars from a hash of the bar
  number and sends one symbol's history when the symbol changes. The browser
  hands the whole series to lightweight-charts, which then owns panning,
  zooming and the crosshair.

  A toggle turns on the other path: the server draws the same visible window
  as a PNG, the way a plain Shiny app does. Every pan and zoom then costs a
  render and a round trip.
"""

import base64
import json
import sys
from pathlib import Path

import numpy as np
import pytest

APP_DIR = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(APP_DIR))

# The app directory goes on sys.path just above.
from market_candles import (  # noqa: E402
    BAR_COUNT,
    catalog,
    hash_unit,
    load_series,
    names,
    plt,
    png_bytes,
    render_window,
    series_payload,
    window_stats,
)


@pytest.fixture(scope="module")
def series():
    return load_series("ACME")


def test_the_catalog_is_small_and_names_every_symbol():
    body = catalog()

    assert len(json.dumps(body)) < 400
    assert body["symbols"] == names()
    assert len(body["symbols"]) == 6


def test_the_hash_stays_inside_zero_to_one():
    values = hash_unit(np.arange(20_000, dtype=np.float64), 11)

    assert values.min() >= 0.0
    assert values.max() < 1.0


def test_the_series_is_the_length_it_claims(series):
    assert series.time.size == BAR_COUNT
    assert series.close.size == BAR_COUNT


def test_a_candle_is_a_candle(series):
    # High is the highest and low is the lowest, on every bar. A wick the
    # wrong way round draws a chart that looks almost right.
    assert bool(np.all(series.high >= series.open))
    assert bool(np.all(series.high >= series.close))
    assert bool(np.all(series.low <= series.open))
    assert bool(np.all(series.low <= series.close))


def test_each_bar_opens_where_the_last_one_closed(series):
    # A gap between bars in a continuous session is a bug, not a gap.
    assert bool(np.allclose(series.open[1:], series.close[:-1]))


def test_prices_stay_positive(series):
    # A geometric walk cannot go negative. If it does, the drift and
    # volatility are being applied the wrong way.
    assert float(series.low.min()) > 0


def test_the_known_first_bar_has_not_moved(series):
    # Pinned in both languages. The two servers have to build one series.
    assert float(series.open[0]) == 142.5
    assert float(series.high[0]) == 142.5273
    assert float(series.low[0]) == 142.1498
    assert float(series.close[0]) == 142.303
    assert int(series.volume[0]) == 3462


def test_an_unknown_symbol_is_refused():
    with pytest.raises(KeyError, match="No symbol called"):
        load_series("NOPE")


def test_symbols_differ_from_each_other():
    # Same hash, different drift and volatility. If two symbols came out the
    # same, the selector would be decoration.
    acme = load_series("ACME")
    cygn = load_series("CYGN")

    assert not np.allclose(acme.close[:100], cygn.close[:100])


def test_the_payload_carries_every_bar(series):
    payload = series_payload(series)

    for field in ("open", "high", "low", "close", "volume"):
        assert len(base64.b64decode(payload[field])) == BAR_COUNT * 4
    assert payload["scale"] == 100


def test_the_payload_round_trips_through_int32(series):
    # Prices go as hundredths. A hundredth of a currency unit is finer than
    # any chart draws, and it halves the bytes against float64.
    payload = series_payload(series)
    raw = base64.b64decode(payload["close"])
    back = np.frombuffer(raw, dtype="<i4") / payload["scale"]

    # Half a hundredth is the exact worst case for rounding to hundredths,
    # so the bound has to include it rather than stop just short.
    assert float(np.abs(back - series.close).max()) <= 0.005 + 1e-9


def test_the_known_window_stats_have_not_moved(series):
    stats = window_stats(series, 0, 389)

    assert stats["bars"] == 390
    assert stats["open"] == 142.5
    assert stats["close"] == 143.3093
    assert stats["change"] == 0.8093
    assert stats["changePercent"] == 0.568
    assert stats["maxDrawdown"] == -1.22


def test_window_stats_clamp_to_the_series(series):
    # The client sends bar indices from a chart that can be scrolled past
    # the ends. Out of range must clamp rather than fail.
    stats = window_stats(series, -500, BAR_COUNT + 500)

    assert stats["first"] == 0
    assert stats["last"] == BAR_COUNT - 1
    assert stats["bars"] == BAR_COUNT


def test_a_single_bar_window_is_allowed(series):
    stats = window_stats(series, 100, 100)

    assert stats["bars"] == 1
    assert stats["maxDrawdown"] <= 0


def test_drawdown_is_never_positive(series):
    for first, last in ((0, 100), (1_000, 5_000), (0, BAR_COUNT - 1)):
        assert window_stats(series, first, last)["maxDrawdown"] <= 0


def test_the_server_can_draw_the_window(series):
    # The other half of the comparison. What matters is that it produces a
    # real PNG at the size it was asked for.
    figure = render_window(series, 0, 389, 900, 360)
    data = png_bytes(figure)
    plt.close(figure)

    assert data[:8] == b"\x89PNG\r\n\x1a\n"
    assert len(data) > 5_000


def test_the_server_thins_a_wide_window(series):
    # Drawing 39,000 candles one at a time is slower than it is useful. The
    # renderer steps through them, and this is the check that a wide window
    # still comes back.
    figure = render_window(series, 0, BAR_COUNT - 1, 900, 360)
    data = png_bytes(figure)
    plt.close(figure)

    assert len(data) > 5_000


def test_the_payload_is_json_serializable(series):
    json.dumps(series_payload(series))
    json.dumps(window_stats(series, 0, 100))
    json.dumps(catalog())
