// Layer three: the layout, and moving one layout into another.
//
// The blend is the claim. A server rendered diagram has to replace one
// picture with another because a path is a string and you cannot halfway a
// string. These tests are about the numbers that make a halfway possible.
import { describe, expect, it } from "vitest";

import {
  blend,
  computeLayout,
  linkId,
  ribbonPath,
  touching,
  volume,
  type Flows,
  type Layout,
} from "@/sankey";

const FLOWS: Flows = {
  scenario: "baseline",
  nodes: [
    { id: "a", label: "A", stage: "supplier", value: 60, capacity: 60, atCeiling: true },
    { id: "b", label: "B", stage: "supplier", value: 40, capacity: 100 },
    { id: "f", label: "F", stage: "factory", value: 100, capacity: 200 },
    { id: "c", label: "C", stage: "centre", value: 100 },
    { id: "m", label: "M", stage: "market", value: 100 },
  ],
  links: [
    { source: "a", target: "f", value: 60 },
    { source: "b", target: "f", value: 40 },
    { source: "f", target: "c", value: 100 },
    { source: "c", target: "m", value: 100 },
  ],
  asked: 100,
  delivered: 100,
  shortfall: 0,
  servedShare: 1,
  shortAt: { centres: 0, factories: 0, suppliers: 0 },
};

/** The same network with one supplier shut, the way a scenario change looks. */
const CLOSED: Flows = {
  ...FLOWS,
  scenario: "closed",
  nodes: FLOWS.nodes.map((node) =>
    node.id === "a" ? { ...node, value: 0 } : { ...node, value: node.value },
  ),
  links: [
    { source: "b", target: "f", value: 40 },
    { source: "f", target: "c", value: 40 },
    { source: "c", target: "m", value: 40 },
  ],
};

const layoutOf = (flows: Flows): Layout => computeLayout(flows, 600, 300);

describe("the layout", () => {
  it("places every node and every link", () => {
    const layout = layoutOf(FLOWS);

    expect([...layout.nodes.keys()].sort()).toEqual(["a", "b", "c", "f", "m"]);
    expect([...layout.ribbons.keys()].sort()).toEqual(["a>f", "b>f", "c>m", "f>c"]);
  });

  it("puts the stages in order from left to right", () => {
    const layout = layoutOf(FLOWS);
    const at = (id: string) => layout.nodes.get(id)!.x0;

    expect(at("a")).toBeLessThan(at("f"));
    expect(at("f")).toBeLessThan(at("c"));
    expect(at("c")).toBeLessThan(at("m"));
  });

  it("makes a bigger flow a taller block", () => {
    const layout = layoutOf(FLOWS);
    const height = (id: string) => {
      const box = layout.nodes.get(id)!;
      return box.y1 - box.y0;
    };

    expect(height("a")).toBeGreaterThan(height("b"));
  });

  it("does not write back into the data it was given", () => {
    // d3-sankey mutates what it is handed, and what it is handed here is
    // React's props. A layout that rewrote them would be a bug three
    // components away from this file.
    const before = JSON.stringify(FLOWS);
    layoutOf(FLOWS);

    expect(JSON.stringify(FLOWS)).toBe(before);
  });
});

describe("blending two layouts", () => {
  it("is the old one at nought and the new one at one", () => {
    const from = layoutOf(FLOWS);
    const to = layoutOf(CLOSED);

    expect(blend(from, to, 0).nodes.get("a")).toEqual(from.nodes.get("a"));
    expect(blend(from, to, 1)).toBe(to);
  });

  it("is somewhere in between at a half", () => {
    const from = layoutOf(FLOWS);
    const to = layoutOf(CLOSED);

    const startHeight = heightOf(from, "a");
    const endHeight = heightOf(to, "a");
    const midHeight = heightOf(blend(from, to, 0.5), "a");

    expect(startHeight).toBeGreaterThan(endHeight);
    expect(midHeight).toBeLessThan(startHeight);
    expect(midHeight).toBeGreaterThan(endHeight);
    expect(midHeight).toBeCloseTo((startHeight + endHeight) / 2, 6);
  });

  it("keeps a route that is closing, so it narrows instead of vanishing", () => {
    // This is what makes the transition readable. A ribbon that disappeared
    // the moment the data changed would be a cut, not a move.
    const from = layoutOf(FLOWS);
    const to = layoutOf(CLOSED);

    expect(from.ribbons.has("a>f")).toBe(true);
    expect(to.ribbons.has("a>f")).toBe(false);

    const halfway = blend(from, to, 0.5);
    expect(halfway.ribbons.has("a>f")).toBe(true);
    expect(halfway.ribbons.get("a>f")!.width).toBeCloseTo(
      from.ribbons.get("a>f")!.width / 2,
      6,
    );
  });

  it("grows a route that is opening out of nothing", () => {
    const from = layoutOf(CLOSED);
    const to = layoutOf(FLOWS);

    const halfway = blend(from, to, 0.5);
    expect(halfway.ribbons.get("a>f")!.width).toBeCloseTo(
      to.ribbons.get("a>f")!.width / 2,
      6,
    );
  });

  it("has nothing to blend from on the first paint", () => {
    const to = layoutOf(FLOWS);
    expect(blend(null, to, 0.5)).toBe(to);
  });
});

describe("the ribbon path", () => {
  it("closes, so it can be filled rather than stroked", () => {
    // A stroke width cannot be part of the same interpolation as the
    // positions, which is why this is a shape and not a line.
    const path = ribbonPath({ sx: 0, sy: 50, tx: 100, ty: 80, width: 20 });

    expect(path.startsWith("M")).toBe(true);
    expect(path.endsWith("Z")).toBe(true);
    expect(path).toContain("C");
  });

  it("puts the two edges half a width either side of the middle", () => {
    const path = ribbonPath({ sx: 0, sy: 50, tx: 100, ty: 50, width: 20 });

    expect(path).toContain("M0,40");
    expect(path).toContain("L100,60");
  });

  it("is a flat line when the width is nothing", () => {
    const path = ribbonPath({ sx: 0, sy: 50, tx: 100, ty: 50, width: 0 });

    expect(path).toContain("M0,50");
    expect(path).toContain("L100,50");
  });
});

describe("following a node both ways", () => {
  it("lights everything upstream and downstream of it", () => {
    expect([...touching(FLOWS, "f")].sort()).toEqual(["a", "b", "c", "f", "m"]);
  });

  it("leaves out a sibling that only shares a target", () => {
    const lit = touching(FLOWS, "a");
    expect(lit.has("a")).toBe(true);
    expect(lit.has("f")).toBe(true);
    expect(lit.has("m")).toBe(true);
    expect(lit.has("b")).toBe(false);
  });

  it("lights nothing when nothing is focused", () => {
    expect(touching(FLOWS, null).size).toBe(0);
  });
});

describe("ids and labels", () => {
  it("keys a ribbon by where it goes from and to", () => {
    // React uses this as the key, which is what makes the same path element
    // survive a scenario change instead of being replaced.
    expect(linkId({ source: "a", target: "f", value: 1 })).toBe("a>f");
  });

  it("writes a volume the way the panel does", () => {
    expect(volume(980)).toBe("980k");
    expect(volume(138.5)).toBe("139k");
  });
});

function heightOf(layout: Layout, id: string): number {
  const box = layout.nodes.get(id)!;
  return box.y1 - box.y0;
}
