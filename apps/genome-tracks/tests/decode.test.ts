// Layer three: the view arithmetic the client does on every frame.
//
// This is where the claim lives. Panning and zooming are these functions and
// nothing else, so a bug here is a browser that loses genes off the edge, or
// one that lets you scroll past the end of a chromosome, and neither looks
// wrong in a screenshot.
import { describe, expect, it } from "vitest";

import {
  type Chromosome,
  clampView,
  formatLocus,
  formatWidth,
  geneName,
  genesInView,
  lowerBound,
  zoomView,
} from "../src/decode";

/** A tiny chromosome with genes at known places. */
function fixture(): Chromosome {
  return {
    name: "chrT",
    span: 10_000,
    biotypes: ["protein coding", "lncRNA", "pseudogene", "miRNA"],
    //          0     1      2      3      4
    start: new Uint32Array([100, 1_000, 2_000, 5_000, 9_000]),
    length: new Uint32Array([50, 2_500, 100, 200, 500]),
    strand: new Uint8Array([1, 0, 1, 0, 1]),
    biotype: new Uint8Array([0, 1, 2, 3, 0]),
    coverage: new Uint16Array([10, 20, 30, 40]),
  };
}

const LONGEST = 2_500;

describe("lowerBound", () => {
  const values = new Uint32Array([10, 20, 20, 30]);

  it("finds the first index at or above the target", () => {
    expect(lowerBound(values, 20)).toBe(1);
    expect(lowerBound(values, 21)).toBe(3);
  });

  it("returns zero below the range and the length above it", () => {
    expect(lowerBound(values, 0)).toBe(0);
    expect(lowerBound(values, 999)).toBe(4);
  });
});

describe("genesInView", () => {
  const chromosome = fixture();

  it("finds a gene that starts inside the view", () => {
    expect(genesInView(chromosome, { start: 1_900, end: 2_200 }, LONGEST)).toEqual([1, 2]);
  });

  it("finds a long gene that started well before the view", () => {
    // Gene 1 runs from 1,000 to 3,500. A search that only looked forward
    // from the view start would miss it, and a wide gene would vanish
    // whenever you scrolled into its middle.
    expect(genesInView(chromosome, { start: 3_000, end: 3_200 }, LONGEST)).toEqual([1]);
  });

  it("excludes a gene that ends just before the view", () => {
    expect(genesInView(chromosome, { start: 200, end: 900 }, LONGEST)).toEqual([]);
  });

  it("includes a gene touching the edge of the view", () => {
    expect(genesInView(chromosome, { start: 150, end: 160 }, LONGEST)).toEqual([0]);
  });

  it("finds everything when the view is the whole chromosome", () => {
    expect(genesInView(chromosome, { start: 0, end: 10_000 }, LONGEST)).toEqual([
      0, 1, 2, 3, 4,
    ]);
  });
});

describe("clampView", () => {
  it("keeps a view inside the chromosome", () => {
    expect(clampView({ start: -500, end: 1_500 }, 10_000)).toEqual({
      start: 0,
      end: 2_000,
    });
    expect(clampView({ start: 9_500, end: 11_500 }, 10_000)).toEqual({
      start: 8_000,
      end: 10_000,
    });
  });

  it("refuses to zoom below the minimum width", () => {
    const view = clampView({ start: 500, end: 510 }, 10_000, 400);
    expect(view.end - view.start).toBe(400);
  });

  it("never shows more than the whole chromosome", () => {
    const view = clampView({ start: -5_000, end: 50_000 }, 10_000);
    expect(view).toEqual({ start: 0, end: 10_000 });
  });

  it("falls back to the whole chromosome on a nonsense width", () => {
    const view = clampView({ start: 0, end: Number.NaN }, 10_000);
    expect(view).toEqual({ start: 0, end: 10_000 });
  });
});

describe("zoomView", () => {
  it("keeps the anchor point where it was", () => {
    // Zooming under the pointer is the behaviour people expect. If the
    // anchor drifts, the view crawls sideways as you scroll.
    const view = { start: 0, end: 1_000 };
    const zoomed = zoomView(view, 0.5, 0.5, 10_000);

    expect((zoomed.start + zoomed.end) / 2).toBeCloseTo(500, 0);
    expect(zoomed.end - zoomed.start).toBe(500);
  });

  it("anchors on the left edge when that is where the pointer is", () => {
    const zoomed = zoomView({ start: 1_000, end: 2_000 }, 0.5, 0, 10_000);
    expect(zoomed.start).toBe(1_000);
  });

  it("stops at the whole chromosome when zooming out", () => {
    const zoomed = zoomView({ start: 0, end: 9_000 }, 4, 0.5, 10_000);
    expect(zoomed).toEqual({ start: 0, end: 10_000 });
  });
});

describe("geneName", () => {
  it("matches what the server builds", () => {
    expect(geneName(0, 0)).toBe("PCG00000");
    expect(geneName(1, 42)).toBe("LNC00042");
    expect(geneName(3, 7_999)).toBe("MIR07999");
  });

  it("still names a gene with an unknown biotype", () => {
    expect(geneName(99, 1)).toBe("GEN00001");
  });
});

describe("formatting", () => {
  it("writes a locus the way a genome browser does", () => {
    expect(formatLocus("chr1", { start: 1_234_567, end: 1_240_000 })).toBe(
      "chr1:1,234,567-1,240,000",
    );
  });

  it("picks a unit that suits the width", () => {
    expect(formatWidth(950)).toBe("950 b");
    expect(formatWidth(4_300)).toBe("4.3 kb");
    expect(formatWidth(2_500_000)).toBe("2.50 Mb");
  });
});
