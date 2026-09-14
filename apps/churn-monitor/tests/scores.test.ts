// Layer three, first half: the arithmetic behind every number on the page.
//
// Ten customers on a hundred point score grid, so every expected value below
// can be worked out on paper. That matters more than usual here, because the
// whole claim is that this arithmetic is trivial: if it needs a fixture to
// check, it is not trivial.
//
// Every function under test mirrors one in churn_monitor.py and R/churn.R.
// The compare toggle puts the two paths on screen together, so they have to
// agree or the comparison is not one.
import { describe, expect, it } from "vitest";

import {
  areaUnderCurve,
  buildCurve,
  confusionAt,
  decodeScores,
  histogram,
  metricsAt,
  money,
  percent,
  sweepCost,
  type ScoresPayload,
  type Scored,
} from "@/scores";

const SCALE = 100;

function packed(values: number[]): string {
  const bytes = new Uint8Array(Uint16Array.from(values).buffer);
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary);
}

function packedBytes(values: number[]): string {
  let binary = "";
  for (const value of values) binary += String.fromCharCode(value);
  return btoa(binary);
}

//  score  10  20  30  40  50  60  70  80  90  100
//  left    .   .   .   x   .   x   .   x   x   x
const PAYLOAD: ScoresPayload = {
  customers: 10,
  scoreScale: SCALE,
  score: packed([10, 20, 30, 40, 50, 60, 70, 80, 90, 100]),
  left: packedBytes([0, 0, 0, 1, 0, 1, 0, 1, 1, 1]),
};

function scored(): Scored {
  return decodeScores(PAYLOAD);
}

function curve() {
  return buildCurve(scored());
}

describe("decoding", () => {
  it("unpacks the scores and the labels", () => {
    const decoded = scored();

    expect(decoded.count).toBe(10);
    expect(Array.from(decoded.score)).toEqual([10, 20, 30, 40, 50, 60, 70, 80, 90, 100]);
    expect(Array.from(decoded.left)).toEqual([0, 0, 0, 1, 0, 1, 0, 1, 1, 1]);
  });
});

describe("the cumulative index", () => {
  it("counts how many of each kind sit at or above every score", () => {
    const built = curve();

    expect(built.totalLeft).toBe(5);
    expect(built.totalStay).toBe(5);
    expect(built.aboveLeft[0]).toBe(5);
    expect(built.aboveStay[0]).toBe(5);
    // Above 60: churners at 60, 80, 90 and 100.
    expect(built.aboveLeft[60]).toBe(4);
    // Above 60: only the one who stayed and scored 70.
    expect(built.aboveStay[60]).toBe(1);
    expect(built.aboveLeft[SCALE]).toBe(1);
    expect(built.aboveStay[SCALE]).toBe(0);
  });

  it("never rises as the threshold rises", () => {
    const built = curve();
    for (let at = 0; at < SCALE; at += 1) {
      expect(built.aboveLeft[at]!).toBeGreaterThanOrEqual(built.aboveLeft[at + 1]!);
      expect(built.aboveStay[at]!).toBeGreaterThanOrEqual(built.aboveStay[at + 1]!);
    }
  });
});

describe("the confusion matrix", () => {
  it("includes a customer sitting exactly on the threshold", () => {
    // The customer scoring 60 churned. Flagged means at or above, on both
    // sides, so this is the assertion that keeps the two agreeing.
    const counts = confusionAt(curve(), 60);

    expect(counts.truePositive).toBe(4);
    expect(counts.falsePositive).toBe(1);
    expect(counts.falseNegative).toBe(1);
    expect(counts.trueNegative).toBe(4);
  });

  it("flags everyone at the bottom of the range", () => {
    const counts = confusionAt(curve(), 0);

    expect(counts.truePositive).toBe(5);
    expect(counts.falsePositive).toBe(5);
    expect(counts.falseNegative).toBe(0);
    expect(counts.trueNegative).toBe(0);
  });

  it("always adds up to everyone", () => {
    const built = curve();
    for (const threshold of [0, 25, 60, 99, 100]) {
      const c = confusionAt(built, threshold);
      expect(c.truePositive + c.falsePositive + c.falseNegative + c.trueNegative).toBe(10);
    }
  });

  it("clamps a threshold off either end rather than reading past the array", () => {
    const built = curve();
    expect(confusionAt(built, -50).threshold).toBe(0);
    expect(confusionAt(built, 5000).threshold).toBe(SCALE);
  });
});

describe("the metrics", () => {
  it("works out every number the panel shows", () => {
    const shown = metricsAt(curve(), 60, 10, 2);

    expect(shown.flagged).toBe(5);
    expect(shown.precision).toBe(0.8);
    expect(shown.recall).toBe(0.8);
    expect(shown.f1).toBeCloseTo(0.8, 10);
    expect(shown.accuracy).toBe(0.8);
    expect(shown.falsePositiveRate).toBe(0.2);
    // One churner missed at ten pounds, one offer wasted at two.
    expect(shown.cost).toBe(12);
  });

  it("trades recall for precision as the threshold rises", () => {
    const built = curve();
    const low = metricsAt(built, 20, 10, 2);
    const high = metricsAt(built, 80, 10, 2);

    expect(high.precision).toBeGreaterThan(low.precision);
    expect(high.recall).toBeLessThan(low.recall);
    expect(high.flagged).toBeLessThan(low.flagged);
  });

  it("reports zeros rather than dividing by zero when nothing is flagged", () => {
    // Nobody here scores above 90, so a threshold of 100 flags no one and
    // precision has no denominator. The panel has to show something rather
    // than NaN.
    const nobodyAtTheTop = decodeScores({
      customers: 6,
      scoreScale: SCALE,
      score: packed([10, 20, 30, 70, 80, 90]),
      left: packedBytes([0, 0, 0, 1, 1, 1]),
    });
    const shown = metricsAt(buildCurve(nobodyAtTheTop), SCALE, 10, 2);

    expect(shown.flagged).toBe(0);
    expect(shown.precision).toBe(0);
    expect(shown.f1).toBe(0);
    expect(Number.isNaN(shown.f1)).toBe(false);
  });
});

describe("the cost sweep", () => {
  it("finds the cheapest threshold on the grid", () => {
    const sweep = sweepCost(curve(), 10, 2, 20);

    expect(Array.from(sweep.thresholds)).toEqual([0, 20, 40, 60, 80, 100]);
    expect(Array.from(sweep.cost)).toEqual([10, 8, 4, 12, 20, 40]);
    expect(sweep.bestThreshold).toBe(40);
    expect(sweep.bestCost).toBe(4);
  });

  it("agrees with the metrics panel at the threshold it picked", () => {
    // The two are shown side by side, so they had better be the same number.
    const built = curve();
    const sweep = sweepCost(built, 10, 2, 20);

    expect(metricsAt(built, sweep.bestThreshold, 10, 2).cost).toBe(sweep.bestCost);
  });

  it("moves the cheapest threshold down when a lost customer costs more", () => {
    // Both start from a dear offer, which is what puts the cheapest
    // threshold high enough to have somewhere to fall from. At a cheap offer
    // it already sits where every churner is caught, and no miss price can
    // push it lower than that.
    const built = curve();

    expect(sweepCost(built, 10, 40, 20).bestThreshold).toBe(80);
    expect(sweepCost(built, 400, 40, 20).bestThreshold).toBe(40);
  });

  it("moves it up when an offer costs more", () => {
    const built = curve();
    const dear = sweepCost(built, 10, 40, 20);

    expect(dear.bestThreshold).toBeGreaterThan(sweepCost(built, 10, 2, 20).bestThreshold);
  });
});

describe("the histogram", () => {
  it("bins by arithmetic, the way both servers do", () => {
    // No library anywhere in the three implementations, because none of them
    // agree about which side of a bin edge is closed.
    const bars = histogram(scored(), 5);

    expect(bars.edges).toEqual([0, 20, 40, 60, 80, 100]);
    expect(bars.left).toEqual([0, 0, 1, 1, 3]);
    expect(bars.stayed).toEqual([1, 2, 1, 1, 0]);
  });

  it("puts the very top score in the last bin rather than past it", () => {
    const bars = histogram(scored(), 5);

    expect(bars.left.reduce((a, b) => a + b, 0)).toBe(5);
    expect(bars.stayed.reduce((a, b) => a + b, 0)).toBe(5);
  });
});

describe("area under the curve", () => {
  it("is one when the model separates perfectly", () => {
    const perfect = decodeScores({
      customers: 6,
      scoreScale: SCALE,
      score: packed([10, 20, 30, 70, 80, 90]),
      left: packedBytes([0, 0, 0, 1, 1, 1]),
    });

    expect(areaUnderCurve(buildCurve(perfect))).toBe(1);
  });

  it("is zero when it gets every one of them backwards", () => {
    const backwards = decodeScores({
      customers: 6,
      scoreScale: SCALE,
      score: packed([10, 20, 30, 70, 80, 90]),
      left: packedBytes([1, 1, 1, 0, 0, 0]),
    });

    expect(areaUnderCurve(buildCurve(backwards))).toBe(0);
  });

  it("sits between the two for a model that only mostly works", () => {
    const area = areaUnderCurve(curve());

    expect(area).toBeGreaterThan(0.5);
    expect(area).toBeLessThan(1);
  });
});

describe("labels", () => {
  it("shortens money without pretending to a precision it has not got", () => {
    expect(money(931_195)).toBe("£931k");
    expect(money(4_220_200)).toBe("£4.22m");
    expect(money(220)).toBe("£220");
  });

  it("writes a rate as a percentage", () => {
    expect(percent(0.466661)).toBe("46.7%");
    expect(percent(0.12, 0)).toBe("12%");
  });
});
