// Turning a flow table into a diagram, and moving one diagram into another.
//
// The layout comes from d3-sankey. Everything after that is here because the
// claim of this app is about the transition rather than the picture: two
// layouts are blended by number, so every node and every ribbon has a
// position at every moment in between, and nothing is ever torn down.
//
// Blending geometry rather than path strings is the whole trick. A path is a
// string and you cannot halfway a string, which is why a server rendered plot
// has no choice but to blink.

import { sankey, type SankeyLink, type SankeyNode } from "d3-sankey";

export type Stage = "supplier" | "factory" | "centre" | "market";

export type FlowNode = {
  id: string;
  label: string;
  stage: Stage;
  value: number;
  capacity?: number;
  spare?: number;
  atCeiling?: boolean;
};

export type FlowLink = { source: string; target: string; value: number };

export type Flows = {
  scenario: string;
  nodes: FlowNode[];
  links: FlowLink[];
  asked: number;
  delivered: number;
  shortfall: number;
  servedShare: number;
  shortAt: { centres: number; factories: number; suppliers: number };
};

export type Catalogue = {
  scenarios: { slug: string; title: string; note: string }[];
  stages: Stage[];
  nodeCount: number;
};

export type NodeBox = { x0: number; x1: number; y0: number; y1: number };

/** A ribbon, as five numbers rather than a path string. */
export type Ribbon = {
  sx: number;
  sy: number;
  tx: number;
  ty: number;
  width: number;
};

export type Layout = {
  nodes: Map<string, NodeBox>;
  ribbons: Map<string, Ribbon>;
};

export const linkId = (link: FlowLink): string => link.source + ">" + link.target;

/** What d3-sankey is given. It adds the geometry itself. */
type LaidNode = { id: string };
type LaidLink = { key: string };

type Placed = SankeyNode<LaidNode, LaidLink>;
type Drawn = SankeyLink<LaidNode, LaidLink>;

/**
 * Run d3-sankey and keep only the numbers.
 *
 * d3-sankey mutates the objects it is given, so it gets copies. Handing it
 * the props would leave React's data quietly rewritten, which is the kind of
 * bug that shows up three components away.
 */
export function computeLayout(
  flows: Flows,
  width: number,
  height: number,
  nodeWidth = 16,
  nodePadding = 14,
): Layout {
  const nodes = flows.nodes.map((node) => ({ id: node.id })) as Placed[];
  const links = flows.links.map((link) => ({
    source: link.source,
    target: link.target,
    value: link.value,
    key: linkId(link),
  })) as unknown as Drawn[];

  const graph = sankey<LaidNode, LaidLink>()
    .nodeId((node) => node.id)
    .nodeWidth(nodeWidth)
    .nodePadding(nodePadding)
    .extent([
      [0, 2],
      [Math.max(nodeWidth * 2, width), Math.max(10, height - 2)],
    ])({ nodes, links });

  const boxes = new Map<string, NodeBox>();
  for (const node of graph.nodes) {
    boxes.set(node.id, {
      x0: node.x0 ?? 0,
      x1: node.x1 ?? 0,
      y0: node.y0 ?? 0,
      y1: node.y1 ?? 0,
    });
  }

  const ribbons = new Map<string, Ribbon>();
  for (const link of graph.links) {
    // After layout these are the node objects, not the ids they came in as.
    const from = link.source as Placed;
    const to = link.target as Placed;
    ribbons.set(link.key, {
      sx: from.x1 ?? 0,
      sy: link.y0 ?? 0,
      tx: to.x0 ?? 0,
      ty: link.y1 ?? 0,
      width: link.width ?? 0,
    });
  }

  return { nodes: boxes, ribbons };
}

const mix = (from: number, to: number, t: number) => from + (to - from) * t;

/** A box with no height, at the middle of where it was. Used for arriving and leaving. */
function collapsed(box: NodeBox): NodeBox {
  const middle = (box.y0 + box.y1) / 2;
  return { x0: box.x0, x1: box.x1, y0: middle, y1: middle };
}

function thinned(ribbon: Ribbon): Ribbon {
  return { ...ribbon, width: 0 };
}

/**
 * One layout part of the way to another.
 *
 * Anything in both is interpolated. Anything only in the new one grows out of
 * nothing at the place it is going; anything only in the old one shrinks into
 * nothing where it was. A route that closes does not vanish, it narrows, and
 * that is the difference between watching volume move and being shown two
 * unrelated pictures.
 */
export function blend(from: Layout | null, to: Layout, t: number): Layout {
  if (!from || t >= 1) return to;

  const nodes = new Map<string, NodeBox>();
  for (const id of union(from.nodes, to.nodes)) {
    const before = from.nodes.get(id);
    const after = to.nodes.get(id);
    const start = before ?? collapsed(after!);
    const end = after ?? collapsed(before!);
    nodes.set(id, {
      x0: mix(start.x0, end.x0, t),
      x1: mix(start.x1, end.x1, t),
      y0: mix(start.y0, end.y0, t),
      y1: mix(start.y1, end.y1, t),
    });
  }

  const ribbons = new Map<string, Ribbon>();
  for (const id of union(from.ribbons, to.ribbons)) {
    const before = from.ribbons.get(id);
    const after = to.ribbons.get(id);
    const start = before ?? thinned(after!);
    const end = after ?? thinned(before!);
    ribbons.set(id, {
      sx: mix(start.sx, end.sx, t),
      sy: mix(start.sy, end.sy, t),
      tx: mix(start.tx, end.tx, t),
      ty: mix(start.ty, end.ty, t),
      width: mix(start.width, end.width, t),
    });
  }

  return { nodes, ribbons };
}

function union<T>(a: Map<string, T>, b: Map<string, T>): string[] {
  const seen = new Set<string>(a.keys());
  for (const key of b.keys()) seen.add(key);
  return [...seen];
}

/**
 * The path for a ribbon.
 *
 * Written out rather than taken from sankeyLinkHorizontal, because that draws
 * a stroked line whose thickness is a stroke width, and a stroke width cannot
 * be part of the same interpolation as the positions. This is a closed shape
 * built from the same five numbers everything else here interpolates.
 */
export function ribbonPath(ribbon: Ribbon): string {
  const half = ribbon.width / 2;
  const middle = (ribbon.sx + ribbon.tx) / 2;
  const topStart = ribbon.sy - half;
  const topEnd = ribbon.ty - half;
  const bottomStart = ribbon.sy + half;
  const bottomEnd = ribbon.ty + half;

  return (
    `M${round(ribbon.sx)},${round(topStart)}` +
    `C${round(middle)},${round(topStart)} ${round(middle)},${round(topEnd)} ${round(ribbon.tx)},${round(topEnd)}` +
    `L${round(ribbon.tx)},${round(bottomEnd)}` +
    `C${round(middle)},${round(bottomEnd)} ${round(middle)},${round(bottomStart)} ${round(ribbon.sx)},${round(bottomStart)}` +
    "Z"
  );
}

function round(value: number): number {
  return Math.round(value * 100) / 100;
}

/** Which ids a focused node touches, upstream and downstream. */
export function touching(flows: Flows, focus: string | null): Set<string> {
  const lit = new Set<string>();
  if (!focus) return lit;

  lit.add(focus);
  let frontier = [focus];
  while (frontier.length) {
    const next: string[] = [];
    for (const link of flows.links) {
      if (frontier.includes(link.source) && !lit.has(link.target)) {
        lit.add(link.target);
        next.push(link.target);
      }
    }
    frontier = next;
  }

  frontier = [focus];
  while (frontier.length) {
    const next: string[] = [];
    for (const link of flows.links) {
      if (frontier.includes(link.target) && !lit.has(link.source)) {
        lit.add(link.source);
        next.push(link.source);
      }
    }
    frontier = next;
  }

  return lit;
}

export function volume(value: number): string {
  return value.toLocaleString("en-GB", { maximumFractionDigits: 0 }) + "k";
}

export function share(value: number): string {
  return (value * 100).toFixed(1) + "%";
}
