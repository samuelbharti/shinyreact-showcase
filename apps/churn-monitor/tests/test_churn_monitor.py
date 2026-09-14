"""Layer one: the scored model and the threshold arithmetic, with no Shiny.

What this app does, in plain English:

  The server scores fifty thousand customers, turns them into a cumulative
  count, and sends the scores to the browser once. Moving the threshold, or
  either cost, then recomputes a confusion matrix, six metrics and a cost
  sweep entirely in the browser.

  A compare toggle turns the other path back on: the server draws the same
  four panels as a PNG, the way a plain Shiny app does, and every step of
  every slider costs a render and a round trip.

The numbers pinned below come from a browser run against both servers. They
are here so that a change to the model, or to either language's arithmetic,
shows up as a failing test rather than as two galleries quietly reporting
different precision for the same threshold.
"""

import base64
import sys
from pathlib import Path

import numpy as np
import pytest

APP_DIR = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(APP_DIR))

from churn_monitor import (  # noqa: E402
    CUSTOMER_COUNT,
    SCORE_SCALE,
    auc,
    confusion,
    cost_sweep,
    hash_unit,
    histogram,
    load_curve,
    load_scores,
    metrics,
    roc_points,
    scores_payload,
    summary,
)


@pytest.fixture(scope="module")
def scored():
    return load_scores()


@pytest.fixture(scope="module")
def curve():
    return load_curve()


def test_the_hash_stays_inside_the_unit_interval():
    values = hash_unit(np.arange(CUSTOMER_COUNT, dtype=np.float64), 41)
    assert values.min() >= 0.0
    assert values.max() < 1.0


def test_the_hash_argument_stays_small_enough_to_agree_across_languages():
    """The reason the multiplier on the index is 0.0137 and not something big.

    sin() past about fifteen thousand radians is where Python, R and
    JavaScript stop agreeing in the last bit, and two servers that score the
    same customer differently is a bug nobody can find.
    """
    assert (CUSTOMER_COUNT - 1) * 0.0137 + 43 * 7.919 < 15_000


def test_every_customer_is_scored_and_labelled(scored):
    assert scored.size == CUSTOMER_COUNT
    assert scored.left.size == CUSTOMER_COUNT
    assert set(np.unique(scored.left)) == {0, 1}


def test_scores_are_integers_on_the_grid_the_browser_is_told_about(scored):
    """No float anywhere for the two sides to disagree about.

    The threshold travels as an integer too, so a customer is above it in
    the browser exactly when they are above it here.
    """
    assert scored.score.dtype == np.dtype("<u2")
    assert scored.score.min() >= 0
    assert scored.score.max() <= SCORE_SCALE


def test_the_base_rate_is_what_the_model_was_built_at(curve):
    assert curve.total_left == 8934
    assert curve.total_stay == 41066
    assert curve.total_left + curve.total_stay == CUSTOMER_COUNT
    assert summary()["baseRate"] == 0.17868


def test_churners_score_higher_than_the_rest(scored):
    left = scored.score[scored.left == 1]
    stayed = scored.score[scored.left == 0]
    assert float(np.median(left)) > float(np.median(stayed))


def test_the_model_separates_but_not_cleanly():
    """An area under the ROC near 0.82, which is what a real churn model does.

    Push the two populations apart and the curve hugs the corner, every
    threshold looks fine, and there is nothing left to decide. This test is
    here to keep the app honest about being a decision.
    """
    assert auc() == 0.81424
    assert 0.78 < auc() < 0.87


def test_the_cumulative_counts_run_the_right_way(curve):
    """above_left[t] counts churners at or above t, so it only ever falls."""
    assert curve.above_left[0] == curve.total_left
    assert curve.above_stay[0] == curve.total_stay
    assert curve.above_left[SCORE_SCALE] >= 0
    assert np.all(np.diff(curve.above_left) <= 0)
    assert np.all(np.diff(curve.above_stay) <= 0)


def test_the_lowest_threshold_flags_everyone(curve):
    counts = confusion(0)
    assert counts["truePositive"] + counts["falsePositive"] == CUSTOMER_COUNT
    assert counts["falseNegative"] == 0


def test_the_confusion_matrix_always_adds_up_to_everyone():
    for threshold in (0, 1200, 3000, 5000, 9900, SCORE_SCALE):
        counts = confusion(threshold)
        total = sum(
            counts[key]
            for key in (
                "truePositive",
                "falsePositive",
                "falseNegative",
                "trueNegative",
            )
        )
        assert total == CUSTOMER_COUNT


def test_the_default_threshold_answers_what_the_browser_saw():
    shown = metrics(3000, 220.0, 25.0)
    assert shown["truePositive"] == 5403
    assert shown["falsePositive"] == 6175
    assert shown["falseNegative"] == 3531
    assert shown["trueNegative"] == 34891
    assert shown["flagged"] == 11578
    assert shown["precision"] == 0.466661
    assert shown["recall"] == 0.604768
    assert shown["f1"] == 0.526814
    assert shown["accuracy"] == 0.80588
    assert shown["falsePositiveRate"] == 0.150368
    assert shown["cost"] == 931195.0


def test_the_far_corner_of_the_sliders_answers_what_the_browser_saw():
    shown = metrics(3500, 800.0, 200.0)
    assert shown["flagged"] == 9455
    assert shown["precision"] == 0.509572
    assert shown["recall"] == 0.539288
    assert shown["cost"] == 4220200.0


def test_raising_the_threshold_trades_recall_for_precision():
    """The whole reason the slider exists, as an assertion."""
    low = metrics(1500, 220.0, 25.0)
    high = metrics(6000, 220.0, 25.0)
    assert high["precision"] > low["precision"]
    assert high["recall"] < low["recall"]
    assert high["flagged"] < low["flagged"]


def test_a_dearer_miss_pushes_the_cheapest_threshold_down():
    """Losing a customer costs more, so flag more of them.

    This is the number a reader is meant to watch while dragging the cost
    slider, so it is worth pinning that it moves the right way.
    """
    cheap = cost_sweep(220.0, 25.0)
    dear = cost_sweep(600.0, 25.0)
    assert cheap["bestThreshold"] == 1200
    assert cheap["bestCost"] == 726970.0
    assert dear["bestThreshold"] == 400
    assert dear["bestThreshold"] < cheap["bestThreshold"]


def test_a_dearer_offer_pushes_the_cheapest_threshold_up():
    dear = cost_sweep(220.0, 120.0)
    assert dear["bestThreshold"] == 4200
    assert dear["bestCost"] == 1437300.0
    assert dear["bestThreshold"] > cost_sweep(220.0, 25.0)["bestThreshold"]


def test_the_cheapest_threshold_really_is_the_cheapest():
    sweep = cost_sweep(220.0, 25.0)
    best = sweep["cost"][sweep["thresholds"].index(sweep["bestThreshold"])]
    assert best == min(sweep["cost"])
    # And the panel agrees with the sweep, which is the thing a reader
    # compares by eye.
    assert metrics(sweep["bestThreshold"], 220.0, 25.0)["cost"] == best


def test_the_curves_are_sent_once_and_never_move():
    curves = roc_points()
    assert len(curves["thresholds"]) == 101
    assert curves["recall"][0] == 1.0
    assert curves["falsePositiveRate"][0] == 1.0
    assert curves["precision"][0] == 0.17868
    # The point at the default threshold, which is where the marker sits.
    assert curves["thresholds"][30] == 3000
    assert curves["recall"][30] == 0.60477
    assert curves["falsePositiveRate"][30] == 0.15037


def test_the_roc_only_ever_goes_one_way():
    """Both coordinates fall as the threshold rises, so the curve never loops."""
    curves = roc_points()
    for key in ("recall", "falsePositiveRate"):
        values = curves[key]
        assert all(values[i] >= values[i + 1] for i in range(len(values) - 1))


def test_the_payload_is_three_bytes_a_customer():
    payload = scores_payload()
    encoded = len(payload["score"]) + len(payload["left"])
    assert encoded == 200_004

    raw = sum(len(base64.b64decode(payload[key])) for key in ("score", "left"))
    assert raw == CUSTOMER_COUNT * 3


def test_the_packed_bytes_decode_back_to_the_scores(scored):
    payload = scores_payload()
    decoded = np.frombuffer(base64.b64decode(payload["score"]), dtype="<u2")
    assert np.array_equal(decoded, scored.score)


def test_the_histogram_accounts_for_every_customer():
    bars = histogram()
    assert bars["bins"] == 60
    assert len(bars["edges"]) == 61
    assert bars["edges"][0] == 0
    assert bars["edges"][-1] == SCORE_SCALE
    assert sum(bars["left"]) == 8934
    assert sum(bars["stayed"]) == 41066


def test_the_first_histogram_bars_are_the_ones_r_builds():
    """Both servers bin by arithmetic rather than by a library.

    numpy and R disagree about which side of a bin edge is closed, so
    neither uses its own histogram function. These counts are what the two
    agree on.
    """
    bars = histogram()
    assert bars["left"][:8] == [57, 137, 194, 212, 194, 172, 245, 230]
    assert bars["stayed"][:8] == [3021, 4413, 4033, 3431, 2952, 2574, 2233, 1907]


def test_the_summary_carries_what_the_page_needs_before_anything_else():
    shown = summary()
    assert shown["customers"] == CUSTOMER_COUNT
    assert shown["scoreScale"] == SCORE_SCALE
    assert shown["auc"] == 0.81424
    assert shown["defaultMissCost"] == 220.0
    assert shown["defaultOfferCost"] == 25.0
    assert len(shown["curves"]["thresholds"]) == 101
