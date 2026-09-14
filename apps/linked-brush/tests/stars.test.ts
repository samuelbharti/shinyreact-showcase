// Layer three, first half: the work a pointer move does.
//
// Everything in src/stars.ts is a plain function over typed arrays, and
// between them they are the entire cost of dragging a brush. Forty thousand
// stars against up to four rectangles, then two histograms rebinned. If that
// is fast and correct, the claim holds.
//
// The assertions about edges matter more than they look. The server selects
// from the same integers with the same comparison, so a star sitting exactly
// on a brush edge has to land on the same side here as it does there. When
// it does not, the panel and the server report counts one apart and nothing
// on screen says why.
import { describe, expect, it } from "vitest";

import {
  binInto,
  countPopulations,
  decodeStars,
  distanceLabel,
  makeBins,
  orderRect,
  PANEL_FIELDS,
  PANEL_IDS,
  roundRect,
  selectInto,
  type Brushes,
  type CataloguePayload,
  type Stars,
} from "@/stars";

const SCALES = {
  colour: 1000,
  absolute: 100,
  longitude: 100,
  latitude: 100,
  logDistance: 1000,
  apparent: 100,
};

/** Pack signed shorts the way both servers do: little endian, then base64. */
function packed(values: number[]): string {
  const ints = Int16Array.from(values);
  const bytes = new Uint8Array(ints.buffer);
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary);
}

function packedBytes(values: number[]): string {
  let binary = "";
  for (const value of values) binary += String.fromCharCode(value);
  return btoa(binary);
}

// Six stars, chosen so every assertion below can be checked by hand.
const PAYLOAD: CataloguePayload = {
  stars: 6,
  scales: SCALES,
  colour: packed([-300, 0, 500, 1000, 1500, 1919]),
  absolute: packed([-400, 0, 300, 600, 900, 1500]),
  longitude: packed([-18000, -9000, 0, 4500, 9000, 18000]),
  latitude: packed([-8000, -400, 0, 100, 400, 8000]),
  logDistance: packed([100, 500, 1000, 2000, 3000, 4000]),
  apparent: packed([400, 600, 800, 1000, 1100, 1150]),
  population: packedBytes([0, 0, 1, 1, 2, 2]),
};

function stars(): Stars {
  return decodeStars(PAYLOAD);
}

function mask(count: number): Uint8Array {
  return new Uint8Array(count);
}

describe("decoding", () => {
  it("unpacks every field back into the units the server used", () => {
    const decoded = stars();

    expect(decoded.count).toBe(6);
    expect(Array.from(decoded.colour)).toEqual([-0.3, 0, 0.5, 1, 1.5, 1.919]);
    expect(Array.from(decoded.longitude)).toEqual([-180, -90, 0, 45, 90, 180]);
    expect(Array.from(decoded.population)).toEqual([0, 0, 1, 1, 2, 2]);
  });

  it("divides in double precision, which is what the server does", () => {
    // At single precision 1919 / 1000 is 1.9190000295639038, and a star on a
    // brush edge then lands inside here and outside on the server.
    const decoded = stars();

    expect(decoded.colour).toBeInstanceOf(Float64Array);
    expect(decoded.colour[5]).toBe(1919 / 1000);
    expect(decoded.colour[5]).toBe(1.919);
  });

  it("reads negative shorts as negative", () => {
    expect(stars().absolute[0]).toBe(-4);
    expect(stars().latitude[0]).toBe(-80);
  });
});

describe("selecting", () => {
  it("takes everything when no panel is brushed", () => {
    const decoded = stars();
    const bits = mask(decoded.count);

    expect(selectInto(decoded, {}, bits)).toBe(6);
    expect(Array.from(bits)).toEqual([1, 1, 1, 1, 1, 1]);
  });

  it("keeps a star sitting exactly on either edge", () => {
    const decoded = stars();
    const bits = mask(decoded.count);
    const brushes: Brushes = { hr: { x0: 0, x1: 1, y0: -99, y1: 99 } };

    expect(selectInto(decoded, brushes, bits)).toBe(3);
    // colour 0, 0.5 and 1. Both ends are inclusive, same as the server.
    expect(Array.from(bits)).toEqual([0, 1, 1, 1, 0, 0]);
  });

  it("applies both axes of a two dimensional brush", () => {
    const decoded = stars();
    const bits = mask(decoded.count);
    const brushes: Brushes = { hr: { x0: 0, x1: 1.6, y0: 2, y1: 10 } };

    // colour in range picks stars 1 to 4; magnitude 2 to 10 drops star 1,
    // whose absolute magnitude is 0.
    expect(selectInto(decoded, brushes, bits)).toBe(3);
    expect(Array.from(bits)).toEqual([0, 0, 1, 1, 1, 0]);
  });

  it("ignores the missing second axis on a histogram brush", () => {
    const decoded = stars();
    const bits = mask(decoded.count);

    expect(selectInto(decoded, { distance: { x0: 0.5, x1: 2 } }, bits)).toBe(3);
    expect(Array.from(bits)).toEqual([0, 1, 1, 1, 0, 0]);
  });

  it("narrows across panels rather than adding them up", () => {
    const decoded = stars();
    const bits = mask(decoded.count);

    const one = selectInto(decoded, { hr: { x0: 0, x1: 1.6, y0: -99, y1: 99 } }, bits);
    const two = selectInto(
      decoded,
      {
        hr: { x0: 0, x1: 1.6, y0: -99, y1: 99 },
        distance: { x0: 0.5, x1: 1.0 },
      },
      bits,
    );

    expect(one).toBe(4);
    // Only stars 2 and 3 satisfy both.
    expect(two).toBe(2);
    expect(Array.from(bits)).toEqual([0, 1, 1, 0, 0, 0]);
  });

  it("can select nothing", () => {
    const decoded = stars();
    const bits = mask(decoded.count);

    expect(selectInto(decoded, { hr: { x0: 9, x1: 9.1, y0: 0, y1: 1 } }, bits)).toBe(0);
    expect(Array.from(bits)).toEqual([0, 0, 0, 0, 0, 0]);
  });

  it("reuses the caller's array instead of allocating one per frame", () => {
    const decoded = stars();
    const bits = mask(decoded.count);

    selectInto(decoded, { hr: { x0: 0, x1: 1, y0: -99, y1: 99 } }, bits);
    const first = bits;
    selectInto(decoded, {}, bits);

    expect(bits).toBe(first);
    expect(Array.from(bits)).toEqual([1, 1, 1, 1, 1, 1]);
  });
});

describe("histograms", () => {
  it("counts every star when given no mask", () => {
    const decoded = stars();
    const bins = makeBins({ min: 0, max: 4 }, 4);

    binInto(decoded.logDistance, decoded.count, bins, null);

    // 0.1 and 0.5 in the first bin, 1.0 in the second, 2.0 third, 3.0 and
    // 4.0 in the last, because the top edge is clamped into it.
    expect(Array.from(bins.counts)).toEqual([2, 1, 1, 2]);
  });

  it("counts only the selected stars when given a mask", () => {
    const decoded = stars();
    const bits = Uint8Array.from([1, 0, 1, 0, 1, 0]);
    const bins = makeBins({ min: 0, max: 4 }, 4);

    binInto(decoded.logDistance, decoded.count, bins, bits);

    expect(Array.from(bins.counts)).toEqual([1, 1, 0, 1]);
  });

  it("clears the previous frame's counts rather than adding to them", () => {
    const decoded = stars();
    const bins = makeBins({ min: 0, max: 4 }, 4);

    binInto(decoded.logDistance, decoded.count, bins, null);
    binInto(decoded.logDistance, decoded.count, bins, null);

    expect(Array.from(bins.counts)).toEqual([2, 1, 1, 2]);
  });

  it("puts a value on the top edge in the last bin rather than past it", () => {
    const bins = makeBins({ min: 0, max: 2 }, 2);
    binInto(Float64Array.from([2, 2.5, -1]), 3, bins, null);

    expect(Array.from(bins.counts)).toEqual([1, 2]);
  });
});

describe("populations", () => {
  it("counts the selected stars in each group", () => {
    const decoded = stars();
    const bits = Uint8Array.from([1, 1, 1, 0, 0, 1]);

    expect(countPopulations(decoded, bits, 3)).toEqual([2, 1, 1]);
  });

  it("returns zeros for a selection of nothing", () => {
    const decoded = stars();

    expect(countPopulations(decoded, mask(decoded.count), 3)).toEqual([0, 0, 0]);
  });
});

describe("rectangles", () => {
  it("orders a box dragged up and to the left", () => {
    expect(orderRect({ x0: 5, x1: 1, y0: 9, y1: 2 })).toEqual({
      x0: 1,
      x1: 5,
      y0: 2,
      y1: 9,
    });
  });

  it("leaves a one dimensional box without y edges", () => {
    expect(orderRect({ x0: 5, x1: 1 })).toEqual({ x0: 1, x1: 5 });
  });

  it("rounds every edge, so both sides compare the same numbers", () => {
    expect(roundRect({ x0: 0.12345678, x1: 1.98765, y0: -3.5, y1: 4.44449 }, 4)).toEqual(
      { x0: 0.1235, x1: 1.9877, y0: -3.5, y1: 4.4445 },
    );
  });
});

describe("the panel map", () => {
  it("covers every panel the app draws", () => {
    expect(Object.keys(PANEL_FIELDS).sort()).toEqual([...PANEL_IDS].sort());
  });

  it("gives the two histograms no second axis", () => {
    expect(PANEL_FIELDS.distance.y).toBeNull();
    expect(PANEL_FIELDS.apparent.y).toBeNull();
    expect(PANEL_FIELDS.hr.y).toBe("absolute");
    expect(PANEL_FIELDS.sky.y).toBe("latitude");
  });
});

describe("labels", () => {
  it("switches to kiloparsecs past a thousand", () => {
    expect(distanceLabel(4.43)).toBe("4.43 pc");
    expect(distanceLabel(84.14)).toBe("84 pc");
    expect(distanceLabel(1196.74)).toBe("1.20 kpc");
  });
});
