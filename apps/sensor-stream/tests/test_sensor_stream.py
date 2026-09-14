"""Layer one: the signal generator, with no Shiny anywhere.

What this app does, in plain English:

  The server makes one reading per tick for four channels and pushes it to
  the browser with send_message. It never publishes the series. The browser
  keeps the history in a fixed size buffer and appends each reading to four
  uPlot traces. Pausing stops the timer on the server, so a paused app sends
  nothing at all.

The readings are a function of the tick number and nothing else, which is
what lets the R and Python servers draw the same trace.
"""

import sys
from pathlib import Path

APP_DIR = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(APP_DIR))

# The app directory goes on sys.path just above.
from sensor_stream import (  # noqa: E402
    MAX_HZ,
    MIN_HZ,
    channels,
    clamp_rate,
    interval_seconds,
    jitter,
    reading,
)


def test_there_is_one_reading_per_channel():
    assert len(reading(0)) == len(channels())


def test_every_channel_is_labelled_and_colored():
    for channel in channels():
        assert channel["name"]
        assert channel["unit"]
        assert channel["color"].startswith("#")


def test_the_same_tick_always_gives_the_same_reading():
    # This is what makes the R and Python servers comparable. If it ever
    # stops holding, the two deployments quietly draw different traces.
    assert reading(1234) == reading(1234)


def test_different_ticks_give_different_readings():
    assert reading(0) != reading(1)


def test_the_known_readings_have_not_moved():
    # Pinned so a change to the signal is deliberate. The R tests assert the
    # same numbers, which is where the two servers agreeing stops being an
    # assumption.
    assert reading(0) == [21.28, 101.2112, 1.6163, 47.7233]
    assert reading(100) == [22.072, 103.0582, 1.1932, 52.1029]


def test_jitter_stays_inside_minus_one_to_one():
    values = [jitter(tick, channel) for tick in range(500) for channel in range(4)]

    assert min(values) >= -1.0
    assert max(values) <= 1.0


def test_jitter_actually_varies():
    # A hash that collapses to one value would make every trace a clean sine.
    values = {round(jitter(tick, 0), 6) for tick in range(200)}

    assert len(values) > 150


def test_readings_stay_near_their_channel_base():
    # A drifting signal is fine. One that wanders off is a broken generator,
    # and on a chart it just looks like data.
    bases = [21.5, 101.3, 1.9, 48.0]
    for tick in range(0, 5000, 7):
        for index, value in enumerate(reading(tick)):
            assert abs(value - bases[index]) < 15, (tick, index, value)


def test_a_rate_the_client_invented_is_clamped():
    # The client sends this and a client can send anything. Zero would busy
    # loop the reactive timer and a huge one would flood the websocket.
    assert clamp_rate(0) == MIN_HZ
    assert clamp_rate(-5) == MIN_HZ
    assert clamp_rate(10_000) == MAX_HZ
    assert clamp_rate(None) == 10
    assert clamp_rate(12) == 12


def test_the_interval_matches_the_clamped_rate():
    assert interval_seconds(10) == 0.1
    assert interval_seconds(0) == 1.0 / MIN_HZ
    assert interval_seconds(10_000) == 1.0 / MAX_HZ
