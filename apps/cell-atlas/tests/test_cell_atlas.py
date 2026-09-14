"""Layer one: pure functions, no Shiny. The cheapest place to check the logic."""

import sys
from pathlib import Path

import pytest

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from cell_atlas import histogram


def test_histogram_splits_a_known_range_into_equal_buckets():
    result = histogram([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], bins=5)

    assert len(result["counts"]) == 5
    assert len(result["breaks"]) == 6
    assert sum(result["counts"]) == 11
    assert result["breaks"][0] == 0
    assert result["breaks"][-1] == 10


def test_the_maximum_value_lands_in_the_last_bucket():
    result = histogram([0, 10], bins=2)

    assert sum(result["counts"]) == 2
    assert result["counts"][-1] == 1


def test_one_distinct_value_gives_one_bucket():
    result = histogram([4, 4, 4], bins=8)

    assert result["counts"] == [3.0]


def test_no_values_gives_empty_lists():
    result = histogram([], bins=4)

    assert result == {"breaks": [], "counts": []}


def test_bins_below_one_is_rejected():
    with pytest.raises(ValueError, match="at least 1"):
        histogram([1, 2, 3], bins=0)
