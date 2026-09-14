// Layer three, part one: the decoding the client does to every payload.
//
// These are the functions where an off by one is invisible on screen. A
// scatter with the axes subtly stretched, or an index list silently
// truncated, still looks like a working app.
import { describe, expect, it } from "vitest";

import {
  asInt16,
  base64ToBytes,
  indicesToBase64,
  toCategory,
  toUnitSquare,
  toUnitValue,
} from "../src/decode";

function encode(bytes: Uint8Array): string {
  return Buffer.from(bytes).toString("base64");
}

describe("base64ToBytes", () => {
  it("round trips arbitrary bytes", () => {
    const original = new Uint8Array([0, 1, 127, 128, 255, 42]);
    expect([...base64ToBytes(encode(original))]).toEqual([...original]);
  });

  it("handles a payload longer than one chunk", () => {
    const original = new Uint8Array(100_000).map((_, i) => i % 256);
    expect(base64ToBytes(encode(original))).toHaveLength(100_000);
  });
});

describe("asInt16", () => {
  it("reads little endian signed values", () => {
    // -32767, 0, 32767
    const bytes = new Uint8Array([0x01, 0x80, 0x00, 0x00, 0xff, 0x7f]);
    expect([...asInt16(bytes)]).toEqual([-32767, 0, 32767]);
  });
});

describe("toUnitSquare", () => {
  const bounds = [-10, -5, 10, 5];

  it("puts the quantized extremes at the edges of the data range", () => {
    const { x, y } = toUnitSquare(
      new Int16Array([-32767, 32767]),
      new Int16Array([-32767, 32767]),
      bounds,
    );

    // x spans the full width, so it reaches -1 and 1.
    expect(x[0]).toBeCloseTo(-1, 5);
    expect(x[1]).toBeCloseTo(1, 5);
    // y spans half the width, so it only reaches half way.
    expect(y[0]).toBeCloseTo(-0.5, 5);
    expect(y[1]).toBeCloseTo(0.5, 5);
  });

  it("keeps the aspect ratio rather than stretching each axis to fill", () => {
    // This is the whole point of the function. Scaling each axis
    // independently would put y at -1 and 1 above, and a UMAP with the
    // aspect ratio changed is a different picture.
    const { x, y } = toUnitSquare(
      new Int16Array([-32767, 32767]),
      new Int16Array([-32767, 32767]),
      bounds,
    );
    const xSpan = x[1]! - x[0]!;
    const ySpan = y[1]! - y[0]!;
    const dataRatio = (bounds[2]! - bounds[0]!) / (bounds[3]! - bounds[1]!);

    expect(xSpan / ySpan).toBeCloseTo(dataRatio, 5);
  });

  it("centers the cloud on the origin", () => {
    const { x, y } = toUnitSquare(
      new Int16Array([-32767, 32767]),
      new Int16Array([-32767, 32767]),
      bounds,
    );

    expect((x[0]! + x[1]!) / 2).toBeCloseTo(0, 5);
    expect((y[0]! + y[1]!) / 2).toBeCloseTo(0, 5);
  });
});

describe("toCategory", () => {
  it("widens cluster bytes without changing them", () => {
    expect([...toCategory(new Uint8Array([0, 3, 7]))]).toEqual([0, 3, 7]);
  });
});

describe("toUnitValue", () => {
  it("maps a byte onto zero to one, with the top of the ramp at one", () => {
    const out = toUnitValue(new Uint8Array([0, 128, 255]));

    expect(out[0]).toBe(0);
    expect(out[2]).toBe(1);
    expect(out[1]).toBeCloseTo(128 / 255, 6);
  });
});

describe("indicesToBase64", () => {
  it("encodes indices as little endian uint32, which is what the server reads", () => {
    const bytes = base64ToBytes(indicesToBase64([1, 258]));

    expect([...bytes]).toEqual([1, 0, 0, 0, 2, 1, 0, 0]);
  });

  it("handles a selection far past the argument limit of fromCharCode", () => {
    // Spreading a 200,000 element array into String.fromCharCode throws.
    // This is the case that only shows up when somebody lassos everything.
    const everything = Array.from({ length: 200_000 }, (_, i) => i);

    const encoded = indicesToBase64(everything);

    expect(base64ToBytes(encoded)).toHaveLength(200_000 * 4);
  });

  it("returns an empty string for an empty selection", () => {
    expect(indicesToBase64([])).toBe("");
  });
});
