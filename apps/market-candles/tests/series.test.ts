// Layer three: decoding the series and the numbers about the visible window.
//
// windowStats here and window_stats on both servers have to produce the same
// answer, because the panel beside the chart is fed by whichever path is
// running. If they drift, flipping the compare toggle changes the numbers
// and it looks like the data changed rather than the code.
import { describe, expect, it } from "vitest";

import {
  compact,
  decodeSeries,
  indexAt,
  money,
  toCandles,
  toVolume,
  windowStats,
  type SeriesPayload,
} from "../src/series";

function encodeI32(values: number[]): string {
  return Buffer.from(new Int32Array(values).buffer).toString("base64");
}

function encodeU32(values: number[]): string {
  return Buffer.from(new Uint32Array(values).buffer).toString("base64");
}

/** Four bars, with numbers chosen so every statistic is checkable by hand. */
const PAYLOAD: SeriesPayload = {
  symbol: "TEST",
  bars: 4,
  startTime: 1_700_000_000,
  barSeconds: 60,
  scale: 100,
  //              10.00  11.00   9.00  10.50
  open: encodeI32([1000, 1100, 900, 1050]),
  high: encodeI32([1150, 1200, 1080, 1120]),
  low: encodeI32([950, 880, 860, 1000]),
  close: encodeI32([1100, 900, 1050, 1080]),
  volume: encodeU32([100, 200, 300, 400]),
};

const BARS = decodeSeries(PAYLOAD);

describe("decodeSeries", () => {
  it("turns hundredths back into prices", () => {
    expect([...BARS.open]).toEqual([10, 11, 9, 10.5]);
    expect([...BARS.close]).toEqual([11, 9, 10.5, 10.8]);
  });

  it("builds the timestamps from the start and the step", () => {
    expect([...BARS.time]).toEqual([
      1_700_000_000, 1_700_000_060, 1_700_000_120, 1_700_000_180,
    ]);
  });

  it("keeps volume as whole units", () => {
    expect([...BARS.volume]).toEqual([100, 200, 300, 400]);
  });
});

describe("toCandles and toVolume", () => {
  it("gives lightweight-charts one entry per bar", () => {
    expect(toCandles(BARS)).toHaveLength(4);
    expect(toVolume(BARS)).toHaveLength(4);
  });

  it("colours a volume bar by whether the candle rose", () => {
    const volume = toVolume(BARS) as { color: string }[];

    // Bar 0 closed above its open, bar 1 below.
    expect(volume[0]!.color).toContain("26a69a");
    expect(volume[1]!.color).toContain("ef5350");
  });
});

describe("windowStats", () => {
  it("reports the whole window when given all of it", () => {
    const stats = windowStats(BARS, 0, 3);

    expect(stats.bars).toBe(4);
    expect(stats.open).toBe(10);
    expect(stats.close).toBe(10.8);
    expect(stats.high).toBe(12);
    expect(stats.low).toBe(8.6);
  });

  it("computes change against the first open, not the first close", () => {
    // Opening at 10 and closing at 10.80 is up 8 percent. Measuring from
    // the first close instead would read the window as down.
    const stats = windowStats(BARS, 0, 3);

    expect(stats.change).toBeCloseTo(0.8, 6);
    expect(stats.changePercent).toBeCloseTo(8, 3);
  });

  it("finds the worst fall from a running peak", () => {
    // Closes run 11, 9, 10.5, 10.8. The peak is 11 and the trough after it
    // is 9, which is a fall of 18.18 percent.
    const stats = windowStats(BARS, 0, 3);

    expect(stats.maxDrawdown).toBeCloseTo(-18.182, 2);
  });

  it("never reports a positive drawdown", () => {
    for (const [from, to] of [
      [0, 0],
      [0, 1],
      [2, 3],
      [0, 3],
    ]) {
      expect(windowStats(BARS, from!, to!).maxDrawdown).toBeLessThanOrEqual(0);
    }
  });

  it("sums volume over the window only", () => {
    expect(windowStats(BARS, 1, 2).volume).toBe(500);
  });

  it("clamps a range that runs past either end", () => {
    // The chart can be scrolled past the data, and it reports what it is
    // showing rather than what exists.
    const stats = windowStats(BARS, -20, 99);

    expect(stats.first).toBe(0);
    expect(stats.last).toBe(3);
    expect(stats.bars).toBe(4);
  });

  it("handles a single bar", () => {
    const stats = windowStats(BARS, 2, 2);

    expect(stats.bars).toBe(1);
    expect(stats.open).toBe(9);
    expect(stats.close).toBe(10.5);
  });
});

describe("indexAt", () => {
  it("finds the bar for a timestamp", () => {
    expect(indexAt(BARS, 1_700_000_000)).toBe(0);
    expect(indexAt(BARS, 1_700_000_120)).toBe(2);
  });

  it("clamps outside the series", () => {
    expect(indexAt(BARS, 0)).toBe(0);
    expect(indexAt(BARS, 9_999_999_999)).toBe(3);
  });

  it("rounds to the nearest bar rather than truncating", () => {
    expect(indexAt(BARS, 1_700_000_100)).toBe(2);
    expect(indexAt(BARS, 1_700_000_080)).toBe(1);
  });
});

describe("formatting", () => {
  it("shows prices to two places", () => {
    expect(money(142.5)).toBe("142.50");
    expect(money(-1.086)).toBe("-1.09");
  });

  it("shortens large volumes", () => {
    expect(compact(950)).toBe("950");
    expect(compact(2_840_000)).toBe("2.84M");
    expect(compact(5_580)).toBe("5.6k");
  });
});
