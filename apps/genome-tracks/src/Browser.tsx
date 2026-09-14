import { useCallback, useEffect, useRef } from "react";

import {
  type Chromosome,
  type View,
  clampView,
  geneName,
  genesInView,
  zoomView,
} from "@/decode";

const BIOTYPE_COLORS = ["#4c78a8", "#54a24b", "#9c9c9c", "#b279a2"];

const GENE_TOP = 12;
const GENE_ROW = 13;
const GENE_ROWS = 7;
const COVERAGE_HEIGHT = 86;
const TRACK_GAP = 18;

type GeneBox = { index: number; x: number; y: number; w: number };

type BrowserProps = {
  chromosome: Chromosome;
  view: View;
  maxGeneLength: number;
  selected: number | null;
  onView: (view: View) => void;
  onPick: (index: number | null) => void;
  onDraw: (visible: number, ms: number) => void;
};

/**
 * The browser itself: a gene track and a coverage track on one canvas.
 *
 * Everything here is client side. Dragging changes a pair of numbers and
 * repaints, which is the whole claim. No pan, zoom or hover reaches the
 * server.
 */
export default function Browser({
  chromosome,
  view,
  maxGeneLength,
  selected,
  onView,
  onPick,
  onDraw,
}: BrowserProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const hostRef = useRef<HTMLDivElement | null>(null);

  // Where each gene was drawn, and which one is under the pointer. Both live
  // in refs because a hover must not re-render the tree.
  const layout = useRef<GeneBox[]>([]);
  const hover = useRef<number | null>(null);
  const drag = useRef<{ x: number; start: number; moved: boolean } | null>(null);

  // The current props, readable from callbacks that never change identity.
  const live = useRef({ chromosome, view, maxGeneLength, selected, onView, onPick, onDraw });
  live.current = { chromosome, view, maxGeneLength, selected, onView, onPick, onDraw };

  const paint = useCallback(() => {
    const canvas = canvasRef.current;
    const host = hostRef.current;
    if (!canvas || !host) return;

    const { chromosome: chrom, view: current, maxGeneLength: longest } = live.current;
    const started = performance.now();

    const ratio = window.devicePixelRatio || 1;
    const width = host.clientWidth;
    const height = GENE_TOP + GENE_ROWS * GENE_ROW + TRACK_GAP + COVERAGE_HEIGHT;
    if (canvas.width !== Math.round(width * ratio)) {
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    ctx.clearRect(0, 0, width, height);

    const span = current.end - current.start;
    const toX = (base: number) => ((base - current.start) / span) * width;

    const coverageTop = GENE_TOP + GENE_ROWS * GENE_ROW + TRACK_GAP;
    drawCoverage(ctx, chrom, current, width, coverageTop, COVERAGE_HEIGHT);

    // Genes, packed into rows so overlapping ones stay readable.
    const visible = genesInView(chrom, current, longest);
    const rowEnds = new Array<number>(GENE_ROWS).fill(-Infinity);
    const boxes: GeneBox[] = [];

    for (const index of visible) {
      const start = chrom.start[index]!;
      const end = start + chrom.length[index]!;
      const x = toX(start);
      const w = Math.max(1.5, toX(end) - x);

      let row = rowEnds.findIndex((edge) => x > edge + 4);
      if (row === -1) row = GENE_ROWS - 1;
      rowEnds[row] = x + w;

      const y = GENE_TOP + row * GENE_ROW;
      const isSelected = live.current.selected === index;
      const isHovered = hover.current === index;

      ctx.fillStyle = BIOTYPE_COLORS[chrom.biotype[index]!] ?? "#888888";
      ctx.globalAlpha = isSelected || isHovered ? 1 : 0.85;
      ctx.fillRect(x, y, w, 8);
      ctx.globalAlpha = 1;

      if (isSelected) {
        ctx.strokeStyle = "#16181d";
        ctx.lineWidth = 1.5;
        ctx.strokeRect(x - 1, y - 1, w + 2, 10);
      }

      // Strand arrows, but only where there is room for them to mean
      // anything. Below that they are noise on top of a 2 pixel block.
      if (w > 22) {
        ctx.fillStyle = "rgba(255,255,255,0.9)";
        const forward = chrom.strand[index] === 1;
        for (let ax = x + 6; ax < x + w - 4; ax += 14) {
          ctx.beginPath();
          ctx.moveTo(forward ? ax : ax + 4, y + 2);
          ctx.lineTo(forward ? ax + 4 : ax, y + 4);
          ctx.lineTo(forward ? ax : ax + 4, y + 6);
          ctx.fill();
        }
      }

      // Labels only when zoomed in far enough to read one.
      if (w > 46) {
        ctx.fillStyle = "#16181d";
        ctx.font = "10px system-ui, sans-serif";
        ctx.fillText(geneName(chrom.biotype[index]!, index), x + 2, y - 2);
      }

      boxes.push({ index, x, y, w });
    }

    layout.current = boxes;
    live.current.onDraw(visible.length, performance.now() - started);
  }, []);

  // Repaint when the view, the chromosome or the selection changes. React
  // decides when; the canvas does the drawing.
  useEffect(() => {
    const frame = requestAnimationFrame(paint);
    return () => cancelAnimationFrame(frame);
  }, [paint, chromosome, view, selected]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const observer = new ResizeObserver(() => paint());
    observer.observe(host);
    return () => observer.disconnect();
  }, [paint]);

  const handleWheel = useCallback((event: React.WheelEvent<HTMLCanvasElement>) => {
    event.preventDefault();
    const rect = event.currentTarget.getBoundingClientRect();
    const fraction = (event.clientX - rect.left) / rect.width;
    const factor = event.deltaY > 0 ? 1.25 : 0.8;
    const { view: current, chromosome: chrom, onView } = live.current;
    onView(zoomView(current, factor, fraction, chrom.span));
  }, []);

  const handlePointerDown = useCallback((event: React.PointerEvent<HTMLCanvasElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    drag.current = { x: event.clientX, start: live.current.view.start, moved: false };
  }, []);

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLCanvasElement>) => {
      const canvas = event.currentTarget;
      const rect = canvas.getBoundingClientRect();

      if (drag.current) {
        const { view: current, chromosome: chrom, onView } = live.current;
        const width = current.end - current.start;
        const moved = event.clientX - drag.current.x;
        if (Math.abs(moved) > 2) drag.current.moved = true;
        const shifted = drag.current.start - (moved / rect.width) * width;
        onView(clampView({ start: shifted, end: shifted + width }, chrom.span));
        return;
      }

      // Hover, tracked in a ref and repainted directly. Through React state
      // this would re-render the tree on every pointer move.
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const hit = layout.current.find(
        (box) => x >= box.x - 2 && x <= box.x + box.w + 2 && y >= box.y - 2 && y <= box.y + 10,
      );
      const next = hit ? hit.index : null;
      if (next !== hover.current) {
        hover.current = next;
        canvas.style.cursor = next === null ? "grab" : "pointer";
        paint();
      }
    },
    [paint],
  );

  const handlePointerUp = useCallback((event: React.PointerEvent<HTMLCanvasElement>) => {
    const wasDragging = drag.current?.moved ?? false;
    drag.current = null;
    event.currentTarget.releasePointerCapture(event.pointerId);

    // A drag is not a click. Without this, letting go after a pan selects
    // whatever gene happens to be under the pointer.
    if (wasDragging) return;
    live.current.onPick(hover.current);
  }, []);

  const handlePointerLeave = useCallback(() => {
    if (hover.current !== null) {
      hover.current = null;
      paint();
    }
  }, [paint]);

  return (
    <div className="browser" ref={hostRef}>
      <canvas
        ref={canvasRef}
        onWheel={handleWheel}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerLeave}
      />
    </div>
  );
}

function drawCoverage(
  ctx: CanvasRenderingContext2D,
  chromosome: Chromosome,
  view: View,
  width: number,
  top: number,
  height: number,
) {
  const perBin = chromosome.span / chromosome.coverage.length;
  const firstBin = Math.max(0, Math.floor(view.start / perBin));
  const lastBin = Math.min(chromosome.coverage.length - 1, Math.ceil(view.end / perBin));

  ctx.fillStyle = "#f7f8fa";
  ctx.fillRect(0, top, width, height);
  if (lastBin < firstBin) return;

  // Scaled to the peak in view rather than the peak on the chromosome, so
  // zooming into a quiet region still shows its shape.
  let peak = 1;
  for (let i = firstBin; i <= lastBin; i += 1) {
    if (chromosome.coverage[i]! > peak) peak = chromosome.coverage[i]!;
  }

  const span = view.end - view.start;
  ctx.beginPath();
  ctx.moveTo(0, top + height);
  for (let i = firstBin; i <= lastBin; i += 1) {
    const x = ((i * perBin - view.start) / span) * width;
    const y = top + height - (chromosome.coverage[i]! / peak) * (height - 16);
    ctx.lineTo(x, y);
  }
  ctx.lineTo(width, top + height);
  ctx.closePath();
  ctx.fillStyle = "rgba(47,111,237,0.35)";
  ctx.fill();

  ctx.fillStyle = "#5c6370";
  ctx.font = "10px system-ui, sans-serif";
  ctx.fillText("read depth, peak " + peak + " in view", 6, top + 12);
}
