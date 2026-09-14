// Layer three: the buffer the client keeps, because the server does not.
//
// The whole claim rests on this holding the only copy of the series. An off
// by one here shows up as a chart that slowly loses its oldest points, or
// one that grows without bound until the tab dies, and neither looks wrong
// in a screenshot.
import { beforeEach, describe, expect, it } from "vitest";

import { History } from "../src/history";

describe("History", () => {
  let history: History;

  beforeEach(() => {
    history = new History(2, 3);
  });

  it("starts empty", () => {
    expect(history.length).toBe(0);
    expect(history.dataFor(0)).toEqual([[], []]);
  });

  it("appends a reading to every channel", () => {
    history.push({ tick: 1, values: [10, 20] });

    expect(history.length).toBe(1);
    expect(history.dataFor(0)).toEqual([[1], [10]]);
    expect(history.dataFor(1)).toEqual([[1], [20]]);
  });

  it("drops the oldest point once the window is full", () => {
    for (let tick = 1; tick <= 5; tick += 1) {
      history.push({ tick, values: [tick * 10, tick * 100] });
    }

    expect(history.length).toBe(3);
    expect(history.dataFor(0)).toEqual([
      [3, 4, 5],
      [30, 40, 50],
    ]);
  });

  it("keeps the x values and every channel the same length", () => {
    // They are handed to uPlot as one pair. A channel that trims at a
    // different moment would draw against the wrong x values.
    for (let tick = 1; tick <= 10; tick += 1) {
      history.push({ tick, values: [tick, -tick] });
      const [xs, ys] = history.dataFor(1);
      expect(xs).toHaveLength(ys.length);
    }
  });

  it("ignores a reading with the wrong number of channels", () => {
    // The server and the client disagreeing about the panel is a real
    // failure. Padding a series with undefined would hide it.
    history.push({ tick: 1, values: [1] });
    history.push({ tick: 2, values: [1, 2, 3] });

    expect(history.length).toBe(0);
  });

  it("keeps what it already holds when the window grows", () => {
    for (let tick = 1; tick <= 3; tick += 1) {
      history.push({ tick, values: [tick, tick] });
    }

    history.resize(10);

    expect(history.dataFor(0)).toEqual([
      [1, 2, 3],
      [1, 2, 3],
    ]);
  });

  it("trims immediately when the window shrinks", () => {
    for (let tick = 1; tick <= 3; tick += 1) {
      history.push({ tick, values: [tick, tick] });
    }

    history.resize(1);

    expect(history.dataFor(0)).toEqual([[3], [3]]);
  });

  it("never accepts a window below one", () => {
    history.resize(0);
    history.push({ tick: 9, values: [1, 2] });

    expect(history.length).toBe(1);
  });

  it("empties on clear but stays usable", () => {
    history.push({ tick: 1, values: [1, 2] });
    history.clear();

    expect(history.length).toBe(0);

    history.push({ tick: 2, values: [3, 4] });
    expect(history.dataFor(0)).toEqual([[2], [3]]);
  });
});
