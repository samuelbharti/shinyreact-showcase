"""A scored churn model, and everything you can ask of it at a threshold.

Fifty thousand customers, each with a predicted probability of leaving and
the label saying whether they did. Built from a hash of the customer number,
so all three languages agree and the repo ships no data file.

The split this app is about:

  The arithmetic behind every number on this page is trivial. A confusion
  matrix at a threshold is two lookups into a cumulative count. Precision,
  recall and the expected cost fall straight out of it.

  Doing that on the server costs a websocket message, a reactive flush, four
  plot renders and an image download, every time the slider moves one step.
  The work is measured in microseconds and the round trip in hundreds of
  milliseconds.

So the server sends the scores once and the browser does the arithmetic. The
compare toggle turns the other path back on, so the two can be watched side
by side.

Scores are held as integers in ten thousandths, on both sides, and the
threshold travels as an integer too. There is then no such thing as a
customer who lands above the threshold in the browser and below it here.
"""

from __future__ import annotations

import base64
import io
from dataclasses import dataclass
from functools import lru_cache

import matplotlib

# Agg before pyplot: this process has no display, and importing pyplot first
# picks a backend that wants one.
matplotlib.use("Agg")

import matplotlib.pyplot as plt
import numpy as np

CUSTOMER_COUNT = 50_000

# Scores live on a 0 to 10,000 grid. That is finer than any slider step and
# finer than any pixel, and it makes the comparison an integer one.
SCORE_SCALE = 10_000

# What the model was fitted on. Churners score higher, with plenty of
# overlap, which is what makes a threshold a decision rather than a formality.
#
# The two centres are set for an area under the ROC near 0.82. Pull them
# apart and the curve hugs the corner, every threshold looks fine, and there
# is nothing to decide. A real churn model does not separate that cleanly.
BASE_RATE = 0.18
STAY_CENTRE, STAY_SPREAD = -2.20, 1.30
LEAVE_CENTRE, LEAVE_SPREAD = -0.45, 1.40

# Pounds. A customer who leaves without an offer costs their remaining value.
# An offer to someone who was staying costs the offer.
DEFAULT_MISS_COST = 220.0
DEFAULT_OFFER_COST = 25.0


def hash_unit(index: np.ndarray, salt: int) -> np.ndarray:
    """A repeatable value in 0 to 1, from a customer number and a salt.

    Small multiplier on `index` for the same reason as elsewhere in this
    repo: a large one pushes the argument to sin into the millions, where
    the three languages stop agreeing in the last bit.
    """
    raw = np.sin(index * 0.0137 + salt * 7.919) * 43758.5453
    return raw - np.floor(raw)


def normals(index: np.ndarray, salt_a: int, salt_b: int) -> np.ndarray:
    """Box-Muller from two hashed uniforms, clamped at four sigma."""
    u1 = np.clip(hash_unit(index, salt_a), 1e-9, 1.0)
    u2 = hash_unit(index, salt_b)
    z = np.sqrt(-2.0 * np.log(u1)) * np.cos(2.0 * np.pi * u2)
    return np.clip(z, -4.0, 4.0)


@dataclass(frozen=True)
class Scored:
    """One scoring run, at the precision the browser is sent.

    `score` is an integer in ten thousandths and `left` is 0 or 1. The
    browser gets exactly these, so a threshold comparison is the same
    comparison on both sides, with no rounding anywhere to disagree about.
    """

    score: np.ndarray  # uint16, 0 to SCORE_SCALE
    left: np.ndarray  # uint8, 1 if the customer churned

    @property
    def size(self) -> int:
        return int(self.score.size)


@lru_cache(maxsize=1)
def load_scores(count: int = CUSTOMER_COUNT) -> Scored:
    """Score every customer. Cached: every session shares one copy."""
    index = np.arange(count, dtype=np.float64)

    left = (hash_unit(index, 41) < BASE_RATE).astype(np.uint8)

    # A logit for each customer, drawn from whichever population they belong
    # to, then squashed. Two overlapping bumps rather than two clean ones,
    # which is what a real scored population looks like.
    spread = np.where(left == 1, LEAVE_SPREAD, STAY_SPREAD)
    centre = np.where(left == 1, LEAVE_CENTRE, STAY_CENTRE)
    logit = centre + spread * normals(index, 42, 43)
    probability = 1.0 / (1.0 + np.exp(-logit))

    return Scored(
        score=np.rint(probability * SCORE_SCALE).clip(0, SCORE_SCALE).astype("<u2"),
        left=left,
    )


@dataclass(frozen=True)
class Curve:
    """Cumulative counts, one entry per score on the grid.

    above_left[t] is how many churners scored t or higher, and above_stay[t]
    the same for the ones who stayed. Every question this app asks at a
    threshold is two reads out of these, which is the whole reason the
    browser can answer it between two frames.
    """

    above_left: np.ndarray
    above_stay: np.ndarray
    total_left: int
    total_stay: int


@lru_cache(maxsize=1)
def load_curve(count: int = CUSTOMER_COUNT) -> Curve:
    scored = load_scores(count)
    slots = SCORE_SCALE + 1

    left_hist = np.bincount(scored.score[scored.left == 1], minlength=slots)
    stay_hist = np.bincount(scored.score[scored.left == 0], minlength=slots)

    # Reverse cumulative sums: counts at or above each score.
    above_left = np.cumsum(left_hist[::-1])[::-1]
    above_stay = np.cumsum(stay_hist[::-1])[::-1]

    return Curve(
        above_left=above_left,
        above_stay=above_stay,
        total_left=int(left_hist.sum()),
        total_stay=int(stay_hist.sum()),
    )


def confusion(threshold: int, count: int = CUSTOMER_COUNT) -> dict:
    """The four counts at a threshold. Flagged means score >= threshold."""
    curve = load_curve(count)
    at = int(np.clip(threshold, 0, SCORE_SCALE))

    true_positive = int(curve.above_left[at])
    false_positive = int(curve.above_stay[at])
    return {
        "threshold": at,
        "truePositive": true_positive,
        "falsePositive": false_positive,
        "falseNegative": curve.total_left - true_positive,
        "trueNegative": curve.total_stay - false_positive,
    }


def metrics(
    threshold: int, miss_cost: float, offer_cost: float, count: int = CUSTOMER_COUNT
) -> dict:
    """Everything the panel shows, at one threshold."""
    counts = confusion(threshold, count)
    tp = counts["truePositive"]
    fp = counts["falsePositive"]
    fn = counts["falseNegative"]
    tn = counts["trueNegative"]

    flagged = tp + fp
    total = tp + fp + fn + tn

    precision = tp / flagged if flagged else 0.0
    recall = tp / (tp + fn) if (tp + fn) else 0.0
    f1 = 2 * precision * recall / (precision + recall) if (precision + recall) else 0.0

    return {
        **counts,
        "flagged": flagged,
        "precision": round(precision, 6),
        "recall": round(recall, 6),
        "f1": round(f1, 6),
        "accuracy": round((tp + tn) / total, 6) if total else 0.0,
        "falsePositiveRate": round(fp / (fp + tn), 6) if (fp + tn) else 0.0,
        "cost": round(fn * miss_cost + fp * offer_cost, 2),
    }


def roc_points(step: int = 100, count: int = CUSTOMER_COUNT) -> dict:
    """The ROC and precision recall curves, sent once.

    Both are properties of the scores alone, so neither moves when the
    threshold does. Only the marker on them moves, and that is a lookup.
    """
    curve = load_curve(count)
    at = np.arange(0, SCORE_SCALE + 1, step)

    true_positive = curve.above_left[at].astype(np.float64)
    false_positive = curve.above_stay[at].astype(np.float64)
    flagged = true_positive + false_positive

    recall = true_positive / curve.total_left
    fpr = false_positive / curve.total_stay
    precision = np.divide(
        true_positive, flagged, out=np.ones_like(flagged), where=flagged > 0
    )

    return {
        "thresholds": [int(t) for t in at],
        "recall": [round(float(v), 5) for v in recall],
        "falsePositiveRate": [round(float(v), 5) for v in fpr],
        "precision": [round(float(v), 5) for v in precision],
    }


def auc(count: int = CUSTOMER_COUNT) -> float:
    """Area under the ROC, by the trapezium rule over every score.

    Computed here rather than in the browser because it is a property of the
    model, it never changes, and it belongs in the header next to the base
    rate rather than being recomputed sixty times a second.

    Written out rather than handed to np.trapezoid so the R twin does the
    same multiplies in the same order and prints the same six decimals.
    """
    curve = load_curve(count)
    recall = curve.above_left / curve.total_left
    rate = curve.above_stay / curve.total_stay

    # Both run from 1 down to 0 as the threshold rises, so each step to the
    # right is a fall in the false positive rate.
    width = rate[:-1] - rate[1:]
    height = (recall[:-1] + recall[1:]) / 2.0
    return round(float((width * height).sum()), 6)


def summary(count: int = CUSTOMER_COUNT) -> dict:
    """What the page needs before anything else. Sent once."""
    curve = load_curve(count)
    total = curve.total_left + curve.total_stay
    return {
        "customers": total,
        "left": curve.total_left,
        "stayed": curve.total_stay,
        "baseRate": round(curve.total_left / total, 6),
        "scoreScale": SCORE_SCALE,
        "auc": auc(count),
        "defaultMissCost": DEFAULT_MISS_COST,
        "defaultOfferCost": DEFAULT_OFFER_COST,
        "curves": roc_points(count=count),
    }


def scores_payload(count: int = CUSTOMER_COUNT) -> dict:
    """Every score and label, packed, sent once.

    Three bytes a customer. The browser needs the raw scores for the
    distribution panel, and having them is also what lets it answer at a
    threshold without asking.
    """
    scored = load_scores(count)
    return {
        "customers": scored.size,
        "scoreScale": SCORE_SCALE,
        "score": _b64(scored.score),
        "left": _b64(scored.left),
    }


def histogram(bins: int = 60, count: int = CUSTOMER_COUNT) -> dict:
    """Score distribution, split by what actually happened.

    Static: the bars do not move when the threshold does, only the line
    across them. Computed here so both paths draw the same picture.

    The bin is worked out by arithmetic rather than by np.histogram, because
    R has to land every customer in the same bar and the two libraries do not
    agree about which side of an edge is closed.
    """
    scored = load_scores(count)
    slot = np.minimum((scored.score.astype(np.int64) * bins) // SCORE_SCALE, bins - 1)

    left = np.bincount(slot[scored.left == 1], minlength=bins)
    stay = np.bincount(slot[scored.left == 0], minlength=bins)
    edges = [round(i * SCORE_SCALE / bins) for i in range(bins + 1)]

    return {
        "bins": bins,
        "edges": edges,
        "left": [int(v) for v in left],
        "stayed": [int(v) for v in stay],
    }


def cost_sweep(
    miss_cost: float, offer_cost: float, step: int = 100, count: int = CUSTOMER_COUNT
) -> dict:
    """Expected cost at every threshold, and the cheapest one.

    This is the only thing on the page that moves when a cost changes rather
    than when the threshold does, and it is still a hundred and one
    multiplications. The browser does it while the slider is moving.
    """
    curve = load_curve(count)
    at = np.arange(0, SCORE_SCALE + 1, step)

    false_negative = curve.total_left - curve.above_left[at].astype(np.float64)
    false_positive = curve.above_stay[at].astype(np.float64)
    cost = false_negative * miss_cost + false_positive * offer_cost

    best = int(np.argmin(cost))
    return {
        "thresholds": [int(t) for t in at],
        "cost": [round(float(v), 2) for v in cost],
        "bestThreshold": int(at[best]),
        "bestCost": round(float(cost[best]), 2),
    }


def render_panels(
    threshold: int, miss_cost: float, offer_cost: float, width: int, height: int
):
    """The same four panels, drawn as a picture, the way plain Shiny does.

    This is the other half of the comparison. It exists to be slow in the way
    a server rendered dashboard is slow: the work happens here, the result is
    a PNG, and every step of the slider pays for another one.
    """
    curve = load_curve()
    at = int(np.clip(threshold, 0, SCORE_SCALE))
    shown = metrics(at, miss_cost, offer_cost)
    curves = roc_points()
    bars = histogram()
    sweep = cost_sweep(miss_cost, offer_cost)

    figure, axes = plt.subplots(
        2, 2, figsize=(width / 100, height / 100), dpi=100, constrained_layout=True
    )

    centres = np.array(bars["edges"][:-1]) + (bars["edges"][1] - bars["edges"][0]) / 2
    axes[0][0].bar(centres, bars["stayed"], width=150, color="#94a3b8", label="stayed")
    axes[0][0].bar(centres, bars["left"], width=150, color="#dc2626", label="left")
    axes[0][0].axvline(at, color="#111827", linewidth=1.5)
    axes[0][0].set_title("scores", fontsize=9)
    axes[0][0].legend(fontsize=7)

    axes[0][1].plot(curves["falsePositiveRate"], curves["recall"], color="#2f6fed")
    axes[0][1].plot([0, 1], [0, 1], color="#cbd5e1", linestyle="--", linewidth=1)
    axes[0][1].plot(
        [shown["falsePositiveRate"]], [shown["recall"]], "o", color="#111827"
    )
    axes[0][1].set_title(f"ROC, auc {auc():.3f}", fontsize=9)

    axes[1][0].plot(curves["thresholds"], curves["precision"], color="#0f7a4a")
    axes[1][0].plot(curves["thresholds"], curves["recall"], color="#b45309")
    axes[1][0].axvline(at, color="#111827", linewidth=1.5)
    axes[1][0].set_title("precision and recall", fontsize=9)

    axes[1][1].plot(sweep["thresholds"], sweep["cost"], color="#7c3aed")
    axes[1][1].axvline(
        sweep["bestThreshold"], color="#0f7a4a", linestyle="--", linewidth=1
    )
    axes[1][1].axvline(at, color="#111827", linewidth=1.5)
    axes[1][1].set_title("cost", fontsize=9)

    for row in axes:
        for panel in row:
            panel.tick_params(labelsize=7)
            panel.grid(True, alpha=0.15)
            for side in ("top", "right"):
                panel.spines[side].set_visible(False)

    # Silences a lint about an unused binding while keeping the read above
    # honest: the curve is what every panel here was built from.
    assert curve.total_left > 0
    return figure


def png_bytes(figure) -> bytes:
    buffer = io.BytesIO()
    figure.savefig(buffer, format="png")
    plt.close(figure)
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


def _b64(values: np.ndarray) -> str:
    return base64.b64encode(values.tobytes()).decode("ascii")
