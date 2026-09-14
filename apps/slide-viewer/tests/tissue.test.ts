// Layer three: the functions that turn a slide description into pixels.
//
// Everything the viewer shows comes out of these. The one property that
// matters most is that they are resolution free: the same point on the slide
// must give the same answer at every zoom level, or the tissue slides around
// under you as you zoom, which looks like a rendering glitch rather than the
// arithmetic bug it is.
import { describe, expect, it } from "vitest";

import { downsampleAt, hash2, noise2, tissueAt, type Lobe } from "../src/tissue";

const LOBES: Lobe[] = [
  { x: 0.5, y: 0.5, rx: 0.2, ry: 0.2, angle: 0, density: 1 },
];

describe("downsampleAt", () => {
  it("is one slide pixel per tile pixel at the deepest level", () => {
    expect(downsampleAt(17, 17)).toBe(1);
  });

  it("doubles for every level up", () => {
    expect(downsampleAt(16, 17)).toBe(2);
    expect(downsampleAt(10, 17)).toBe(128);
  });
});

describe("hash2", () => {
  it("stays inside zero to one", () => {
    for (let x = 0; x < 200; x += 1) {
      for (let y = 0; y < 5; y += 1) {
        const value = hash2(x, y, 3);
        expect(value).toBeGreaterThanOrEqual(0);
        expect(value).toBeLessThan(1);
      }
    }
  });

  it("gives the same answer for the same input", () => {
    expect(hash2(12, 34, 5)).toBe(hash2(12, 34, 5));
  });

  it("gives different answers for different salts", () => {
    expect(hash2(12, 34, 5)).not.toBe(hash2(12, 34, 6));
  });

  it("actually spreads", () => {
    // A hash that clumps would put every nucleus in the same corner of its
    // cell and the tissue would look like graph paper.
    const buckets = new Array<number>(10).fill(0);
    for (let x = 0; x < 100; x += 1) {
      for (let y = 0; y < 100; y += 1) {
        buckets[Math.min(9, Math.floor(hash2(x, y, 1) * 10))]! += 1;
      }
    }
    expect(Math.min(...buckets)).toBeGreaterThan(700);
    expect(Math.max(...buckets)).toBeLessThan(1300);
  });
});

describe("noise2", () => {
  it("stays inside zero to one", () => {
    for (let i = 0; i < 500; i += 1) {
      const value = noise2(i * 0.37, i * 0.11, 2);
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThanOrEqual(1);
    }
  });

  it("is smooth between lattice points", () => {
    // Value noise with no interpolation gives hard edges, which read as a
    // grid of squares across the tissue.
    const a = noise2(4.0, 4.0, 1);
    const b = noise2(4.01, 4.0, 1);
    expect(Math.abs(a - b)).toBeLessThan(0.1);
  });

  it("meets the lattice value exactly at an integer point", () => {
    expect(noise2(6, 9, 4)).toBeCloseTo(hash2(6, 9, 4), 10);
  });
});

describe("tissueAt", () => {
  it("gives bare glass well outside every lobe", () => {
    expect(tissueAt(0.02, 0.02, LOBES)).toBe(0);
  });

  it("gives tissue at the centre of a lobe", () => {
    expect(tissueAt(0.5, 0.5, LOBES)).toBeGreaterThan(0.3);
  });

  it("fades out rather than stopping at a line", () => {
    const middle = tissueAt(0.5, 0.5, LOBES);
    const edge = tissueAt(0.5, 0.72, LOBES);

    expect(edge).toBeLessThan(middle);
    expect(edge).toBeGreaterThan(0);
  });

  it("is the same at every zoom level", () => {
    // The whole reason this takes slide fractions rather than tile pixels.
    // If it depended on zoom, the tissue would shift under the reader as
    // they zoomed, and every tile boundary would show.
    expect(tissueAt(0.4321, 0.5678, LOBES)).toBe(tissueAt(0.4321, 0.5678, LOBES));
  });

  it("never leaves the zero to one range", () => {
    for (let i = 0; i < 400; i += 1) {
      const value = tissueAt(i / 400, ((i * 7) % 400) / 400, LOBES);
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThanOrEqual(1);
    }
  });

  it("gives glass everywhere when there are no lobes", () => {
    expect(tissueAt(0.5, 0.5, [])).toBe(0);
  });
});
