"""Layer one: the trip generator and the hexagon summary, with no Shiny.

What this app does, in plain English:

  The server makes half a million trips from a hash of the trip number, so
  there is no data file and both languages produce the same city. It sends
  only the positions. The browser bins them into hexagons and rebins on every
  zoom, which never reaches the server.

  The server keeps the hour, the fare and the duration of every trip and
  never sends them. Clicking a hexagon asks for a breakdown of exactly those
  columns, which is the one thing here the client could not work out for
  itself.
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
from city_density import (  # noqa: E402
    BOUNDS,
    CENTER_LAT,
    CENTER_LNG,
    DISTRICTS,
    METRICS,
    hash_unit,
    hexagon_summary,
    load_boundary,
    load_city,
    points_payload,
)


@pytest.fixture(scope="module")
def city():
    return load_city()


def test_hash_stays_inside_zero_to_one():
    values = hash_unit(np.arange(20_000, dtype=np.float64), 3)

    assert values.min() >= 0.0
    assert values.max() < 1.0


def test_the_hash_actually_spreads():
    # A hash that clumps would put every trip in the same place. Ten buckets
    # over twenty thousand draws should each be within a few percent.
    values = hash_unit(np.arange(20_000, dtype=np.float64), 1)
    counts = np.histogram(values, bins=10, range=(0, 1))[0]

    assert counts.min() > 1_500
    assert counts.max() < 2_500


def test_the_same_trip_always_lands_in_the_same_place(city):
    lng, lat = city.position
    again_lng, again_lat = city.position

    assert lng[7] == again_lng[7]
    assert lat[7] == again_lat[7]


def test_every_trip_is_inside_the_city_bounds(city):
    lng, lat = city.position

    assert lng.min() >= BOUNDS[0]
    assert lng.max() <= BOUNDS[2]
    assert lat.min() >= BOUNDS[1]
    assert lat.max() <= BOUNDS[3]


def test_the_tails_are_clamped_so_the_map_has_empty_space(city):
    # Unclamped normals reach halfway across the county, which puts a stray
    # trip in every hexagon and turns the map into an even smear.
    lng, _lat = city.position
    spread_lng = float(lng.max() - lng.min())

    assert spread_lng < (BOUNDS[2] - BOUNDS[0])


def test_districts_get_roughly_the_share_they_asked_for(city):
    counts = np.bincount(city.district, minlength=len(DISTRICTS))
    shares = counts / counts.sum()

    for index, district in enumerate(DISTRICTS):
        assert abs(shares[index] - district[4]) < 0.01, district[0]


def test_hours_are_hours(city):
    assert city.hour.min() >= 0
    assert city.hour.max() <= 23


def test_fares_and_durations_are_positive(city):
    assert city.fare.min() > 0
    assert city.duration.min() > 0


def test_fares_have_a_long_right_tail(city):
    # Log normal, because a symmetric fare distribution looks wrong to anyone
    # who has seen a real receipt.
    fares = city.fare
    assert float(np.mean(fares)) > float(np.median(fares))


def test_an_unknown_metric_is_refused(city):
    with pytest.raises(ValueError, match="Unknown metric"):
        city.metric("altitude")

    for name in METRICS:
        assert city.metric(name).size == city.n


def test_the_payload_carries_one_position_per_trip(city):
    payload = points_payload(city)

    assert len(base64.b64decode(payload["lng"])) == city.n * 2
    assert len(base64.b64decode(payload["lat"])) == city.n * 2
    assert payload["n"] == city.n
    assert len(payload["bounds"]) == 4


def test_the_payload_never_carries_an_attribute(city):
    # The whole split rests on this. If fares ever start riding along with
    # the positions, the server stops being needed and the app stops making
    # its point.
    payload = points_payload(city)

    assert "fare" not in payload
    assert "duration" not in payload
    assert "hour" not in payload


def test_the_boundary_loads_and_has_a_river():
    boundary = load_boundary(APP_DIR / "data")
    kinds = {f["properties"]["kind"] for f in boundary["features"]}

    assert kinds == {"boundary", "river"}


def test_the_boundary_sits_inside_the_city_bounds():
    boundary = load_boundary(APP_DIR / "data")
    for feature in boundary["features"]:
        coordinates = feature["geometry"]["coordinates"]
        points = (
            coordinates[0] if feature["geometry"]["type"] == "Polygon" else coordinates
        )
        for lng, lat in points:
            assert BOUNDS[0] <= lng <= BOUNDS[2]
            assert BOUNDS[1] <= lat <= BOUNDS[3]


def test_a_hexagon_over_the_centre_is_mostly_central(city):
    summary = hexagon_summary(city, CENTER_LNG, CENTER_LAT + 0.004, 400)

    assert summary["count"] > 1_000
    assert summary["districts"][0]["name"] == "Central"
    assert sum(summary["hours"]) == summary["count"]


def test_the_known_hexagon_summary_has_not_moved(city):
    # Pinned so a change to the generator is deliberate. The R tests assert
    # the same numbers, which is where the two servers agreeing stops being
    # an assumption.
    summary = hexagon_summary(city, CENTER_LNG, CENTER_LAT + 0.004, 400)

    assert summary["count"] == 4690
    assert summary["districts"][0] == {"name": "Central", "n": 3937}
    assert summary["fare"] == {"mean": 15.25, "median": 14.27, "p90": 22.65}
    assert summary["duration"] == {"mean": 18.7, "median": 17.9}


def test_an_empty_hexagon_summarizes_to_nothing(city):
    # Somewhere in the North Sea.
    summary = hexagon_summary(city, 2.5, 54.0, 200)

    assert summary["count"] == 0
    assert summary["fare"] is None
    assert summary["hours"] == []


def test_the_summary_is_json_serializable(city):
    # reactive_output sends this straight to the client, so a numpy scalar
    # slipping through would fail at the wire rather than here.
    summary = hexagon_summary(city, CENTER_LNG, CENTER_LAT, 300)

    json.dumps(summary)
