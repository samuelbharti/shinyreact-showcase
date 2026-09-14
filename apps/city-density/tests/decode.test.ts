// Layer three: the decoding and the zoom to radius rule.
//
// radiusForZoom is where the claim lives. Bins that stay a fixed size in
// metres turn into a solid sheet when you zoom out and confetti when you zoom
// in, and neither looks broken in a screenshot.
import { describe, expect, it } from "vitest";

import { count, decodePositions, type PointsPayload, radiusForZoom } from "../src/decode";

function payload(lng: number[], lat: number[]): PointsPayload {
  const encode = (values: number[]) =>
    Buffer.from(new Int16Array(values).buffer).toString("base64");
  return {
    n: lng.length,
    bounds: [-1, -2, 1, 2],
    center: [0, 0],
    districts: [],
    metrics: ["fare"],
    lng: encode(lng),
    lat: encode(lat),
    boundary: null,
  };
}

describe("decodePositions", () => {
  it("gives three components per trip, not two", () => {
    // deck.gl reads positions as 3D and strides the buffer accordingly. With
    // two components the layer reads interleaved nonsense and silently draws
    // nothing at all, which is exactly what happened the first time.
    const out = decodePositions(payload([0, 0], [0, 0]));

    expect(out).toHaveLength(6);
  });

  it("puts the quantized extremes at the edges of the bounds", () => {
    const out = decodePositions(payload([-32767, 32767], [-32767, 32767]));

    expect(out[0]).toBeCloseTo(-1, 4);
    expect(out[1]).toBeCloseTo(-2, 4);
    expect(out[3]).toBeCloseTo(1, 4);
    expect(out[4]).toBeCloseTo(2, 4);
  });

  it("leaves the altitude at zero", () => {
    const out = decodePositions(payload([100, -100], [50, -50]));

    expect(out[2]).toBe(0);
    expect(out[5]).toBe(0);
  });

  it("stops at the shorter of the two arrays", () => {
    // A truncated payload should draw fewer trips, not read past the end of
    // a buffer and place them at random.
    const broken = payload([0, 0, 0], [0]);
    expect(decodePositions(broken)).toHaveLength(3);
  });
});

describe("radiusForZoom", () => {
  it("halves the radius for every zoom level", () => {
    const wide = radiusForZoom(10, 14);
    const closer = radiusForZoom(11, 14);

    expect(closer).toBeCloseTo(wide / 2, 0);
  });

  it("scales with the requested pixel size", () => {
    expect(radiusForZoom(12, 24)).toBeGreaterThan(radiusForZoom(12, 8));
  });

  it("never returns a radius small enough to bin every point alone", () => {
    // At high zoom the arithmetic tends to zero, and a zero radius makes
    // deck.gl build one hexagon per trip and stall.
    expect(radiusForZoom(22, 8)).toBeGreaterThanOrEqual(20);
    expect(radiusForZoom(30, 1)).toBeGreaterThanOrEqual(20);
  });

  it("returns whole metres", () => {
    expect(Number.isInteger(radiusForZoom(11.7, 13))).toBe(true);
  });
});

describe("count", () => {
  it("groups thousands so a big number is readable", () => {
    expect(count(500000)).toBe("500,000");
    expect(count(7)).toBe("7");
  });
});
