import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

import { AxisBottom, AxisLeft } from "@visx/axis";
import { Group } from "@visx/group";
import { scaleLinear } from "@visx/scale";
import { Bar, Line } from "@visx/shape";

import {
  binInto,
  fieldOf,
  makeBins,
  orderRect,
  PANEL_FIELDS,
  type Bins,
  type FieldName,
  type PanelId,
  type Range,
  type Rect,
  type Stars,
} from "@/stars";

// An svg clips at its own height, so the bottom margin has to hold the tick
// labels and the axis label or the label is simply cut in half. Room for a
// five character tick label on the left, because a histogram counts into the
// thousands and "1,500" is wider than "15".
const MARGIN = { top: 10, right: 14, bottom: 58, left: 66 };
const PLOT_HEIGHT = 262;
const BIN_COUNT = 44;

// One colour per population, so a selection that spans two of them says so
// without a legend lookup.
export const POPULATION_COLOURS = ["#2f6fd0", "#d97706", "#9333ea"];

const UNSELECTED = "#cfd6de";

export type FitLine = { slope: number; intercept: number; x0: number; x1: number };

type PanelProps = {
  id: PanelId;
  title: string;
  note: string;
  stars: Stars;
  mask: Uint8Array;
  /** Bumped by the parent whenever the mask contents changed. */
  revision: number;
  brush: Rect | null;
  ranges: Record<FieldName, Range>;
  onBrush: (id: PanelId, rect: Rect | null) => void;
  onCommit: () => void;
  fitLine?: FitLine | null;
  xLabel: string;
  yLabel?: string;
  /** HR magnitudes run brighter upward, which is smaller upward. */
  invertY?: boolean;
};

/** Width of the panel's plot area, tracked so the canvas stays sharp. */
function useWidth(): [React.RefObject<HTMLDivElement | null>, number] {
  const ref = useRef<HTMLDivElement | null>(null);
  // Never zero. A panel that measures zero draws nothing and looks broken
  // rather than empty, and in a headless browser it never recovers.
  const [width, setWidth] = useState(420);

  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) return;

    const measure = () => setWidth(Math.max(240, Math.round(node.clientWidth)));
    measure();

    if (typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return [ref, width];
}

export default function Panel({
  id,
  title,
  note,
  stars,
  mask,
  revision,
  brush,
  ranges,
  onBrush,
  onCommit,
  fitLine,
  xLabel,
  yLabel,
  invertY,
}: PanelProps) {
  const [box, width] = useWidth();
  const fields = PANEL_FIELDS[id];
  const isScatter = fields.y !== null;

  const innerWidth = Math.max(60, width - MARGIN.left - MARGIN.right);
  const innerHeight = PLOT_HEIGHT - MARGIN.top - MARGIN.bottom;

  const xScale = useMemo(
    () =>
      scaleLinear<number>({
        domain: [ranges[fields.x].min, ranges[fields.x].max],
        range: [0, innerWidth],
      }),
    [ranges, fields.x, innerWidth],
  );

  // The background histogram: every star, counted once. Only the selected
  // overlay is recomputed while the pointer moves.
  const bins = useMemo<Bins | null>(() => {
    if (isScatter) return null;
    const made = makeBins(
      { min: xScale.domain()[0]!, max: xScale.domain()[1]! },
      BIN_COUNT,
    );
    binInto(fieldOf(stars, fields.x), stars.count, made, null);
    return made;
  }, [isScatter, stars, fields.x, xScale]);

  const selectedBins = useMemo<Bins | null>(() => {
    if (!bins) return null;
    const made = makeBins({ min: bins.min, max: bins.max }, BIN_COUNT);
    binInto(fieldOf(stars, fields.x), stars.count, made, mask);
    return made;
    // revision is the dependency that matters: mask is one array mutated in
    // place, so React would never see it change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bins, stars, fields.x, revision]);

  const yScale = useMemo(() => {
    if (isScatter) {
      const field = fields.y!;
      const domain = [ranges[field].min, ranges[field].max];
      return scaleLinear<number>({
        domain,
        // A magnitude axis runs the other way: the brightest star is the
        // smallest number and belongs at the top.
        range: invertY ? [0, innerHeight] : [innerHeight, 0],
      });
    }
    const tallest = bins ? Math.max(1, ...Array.from(bins.counts)) : 1;
    return scaleLinear<number>({
      domain: [0, tallest],
      range: [innerHeight, 0],
      nice: true,
    });
  }, [isScatter, fields.y, ranges, innerHeight, invertY, bins]);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const backgroundRef = useRef<HTMLCanvasElement | null>(null);

  const ratio = typeof window === "undefined" ? 1 : window.devicePixelRatio || 1;

  // Every star, in grey, drawn once per change of geometry rather than once
  // per frame. A drag then costs only the selected points, which is the
  // difference between a smooth brush and a stuttering one.
  useEffect(() => {
    if (!isScatter) return;
    let layer = backgroundRef.current;
    if (!layer) {
      layer = document.createElement("canvas");
      backgroundRef.current = layer;
    }
    layer.width = Math.round(innerWidth * ratio);
    layer.height = Math.round(innerHeight * ratio);

    const context = layer.getContext("2d");
    if (!context) return;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    context.clearRect(0, 0, innerWidth, innerHeight);
    context.fillStyle = UNSELECTED;

    const xs = fieldOf(stars, fields.x);
    const ys = fieldOf(stars, fields.y!);
    for (let i = 0; i < stars.count; i += 1) {
      context.fillRect(xScale(xs[i]!) - 0.75, yScale(ys[i]!) - 0.75, 1.5, 1.5);
    }
  }, [isScatter, stars, fields.x, fields.y, xScale, yScale, innerWidth, innerHeight, ratio]);

  // The selected stars, on top, redrawn on every pointer move.
  useEffect(() => {
    if (!isScatter) return;
    const canvas = canvasRef.current;
    const layer = backgroundRef.current;
    if (!canvas || !layer) return;

    canvas.width = Math.round(innerWidth * ratio);
    canvas.height = Math.round(innerHeight * ratio);
    const context = canvas.getContext("2d");
    if (!context) return;

    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(layer, 0, 0);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);

    const xs = fieldOf(stars, fields.x);
    const ys = fieldOf(stars, fields.y!);

    // One pass per population rather than one fillStyle change per star.
    // Setting the fill colour is the expensive part; walking the array is not.
    for (let group = 0; group < POPULATION_COLOURS.length; group += 1) {
      context.fillStyle = POPULATION_COLOURS[group]!;
      for (let i = 0; i < stars.count; i += 1) {
        if (mask[i] === 0 || stars.population[i] !== group) continue;
        context.fillRect(xScale(xs[i]!) - 1, yScale(ys[i]!) - 1, 2, 2);
      }
    }
    // revision, not mask: the mask is mutated in place on purpose.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isScatter, stars, fields.x, fields.y, xScale, yScale, innerWidth, innerHeight, ratio, revision]);

  // Dragging. The rectangle lives in pixels while the pointer is down and is
  // handed upward in data units, because the server and the other panels both
  // speak data units and neither knows how wide this panel is.
  const dragRef = useRef<{ x: number; y: number } | null>(null);

  const toData = useCallback(
    (px: number, py: number): { x: number; y: number } => ({
      x: xScale.invert(px),
      y: yScale.invert(py),
    }),
    [xScale, yScale],
  );

  const rectFrom = useCallback(
    (from: { x: number; y: number }, px: number, py: number): Rect => {
      const start = toData(from.x, from.y);
      const now = toData(px, py);
      const rect: Rect = { x0: start.x, x1: now.x };
      if (isScatter) {
        rect.y0 = start.y;
        rect.y1 = now.y;
      }
      return orderRect(rect);
    },
    [toData, isScatter],
  );

  const local = (event: React.PointerEvent<SVGRectElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    return {
      x: Math.min(innerWidth, Math.max(0, event.clientX - bounds.left)),
      y: Math.min(innerHeight, Math.max(0, event.clientY - bounds.top)),
    };
  };

  const handleDown = (event: React.PointerEvent<SVGRectElement>) => {
    const at = local(event);
    dragRef.current = at;
    // Capture keeps the drag alive past the edge of the panel. It throws if
    // the pointer is not one the browser is tracking, which is every
    // synthetic event a test dispatches, and the drag works without it.
    try {
      event.currentTarget.setPointerCapture(event.pointerId);
    } catch {
      // Nothing to do. The handlers below are on this element either way.
    }
    onBrush(id, rectFrom(at, at.x, at.y));
  };

  const handleMove = (event: React.PointerEvent<SVGRectElement>) => {
    const from = dragRef.current;
    if (!from) return;
    const at = local(event);
    onBrush(id, rectFrom(from, at.x, at.y));
  };

  const handleUp = (event: React.PointerEvent<SVGRectElement>) => {
    const from = dragRef.current;
    dragRef.current = null;
    if (!from) return;
    const at = local(event);

    // A click rather than a drag clears this panel. Three pixels is small
    // enough that nobody means it as a selection and large enough to survive
    // a shaky hand.
    const moved = Math.abs(at.x - from.x) + (isScatter ? Math.abs(at.y - from.y) : 0);
    onBrush(id, moved < 3 ? null : rectFrom(from, at.x, at.y));
    onCommit();
  };

  // The brush rectangle, back in pixels for drawing.
  const brushBox = useMemo(() => {
    if (!brush) return null;
    const left = xScale(brush.x0);
    const right = xScale(brush.x1);
    let top = 0;
    let bottom = innerHeight;
    if (isScatter && brush.y0 !== undefined && brush.y1 !== undefined) {
      const a = yScale(brush.y0);
      const b = yScale(brush.y1);
      top = Math.min(a, b);
      bottom = Math.max(a, b);
    }
    return {
      x: Math.min(left, right),
      y: top,
      width: Math.abs(right - left),
      height: Math.max(0, bottom - top),
    };
  }, [brush, xScale, yScale, innerHeight, isScatter]);

  const barWidth = bins ? Math.max(1, innerWidth / BIN_COUNT - 1) : 0;

  return (
    <section className="panel" data-panel={id} data-brushed={brush ? "yes" : "no"}>
      <h3>
        {title}
        <span className="panel-note">{note}</span>
      </h3>

      <div className="plot" ref={box} style={{ height: PLOT_HEIGHT }}>
        {isScatter ? (
          <canvas
            className="points"
            ref={canvasRef}
            style={{
              left: MARGIN.left,
              top: MARGIN.top,
              width: innerWidth,
              height: innerHeight,
            }}
          />
        ) : null}

        <svg width={width} height={PLOT_HEIGHT}>
          <Group left={MARGIN.left} top={MARGIN.top}>
            {bins && selectedBins
              ? Array.from(bins.counts).map((total, slot) => {
                  const chosen = selectedBins.counts[slot]!;
                  const left = (slot * innerWidth) / BIN_COUNT;
                  return (
                    <g key={slot}>
                      <Bar
                        x={left}
                        y={yScale(total)}
                        width={barWidth}
                        height={Math.max(0, innerHeight - yScale(total))}
                        fill={UNSELECTED}
                      />
                      {chosen > 0 ? (
                        <Bar
                          x={left}
                          y={yScale(chosen)}
                          width={barWidth}
                          height={Math.max(0, innerHeight - yScale(chosen))}
                          fill={POPULATION_COLOURS[0]}
                        />
                      ) : null}
                    </g>
                  );
                })
              : null}

            {/* The server's answer, drawn only after a brush is released.
                It is the one mark on this page that cost a round trip. */}
            {fitLine ? (
              <Line
                className="fit"
                from={{
                  x: xScale(fitLine.x0),
                  y: yScale(fitLine.slope * fitLine.x0 + fitLine.intercept),
                }}
                to={{
                  x: xScale(fitLine.x1),
                  y: yScale(fitLine.slope * fitLine.x1 + fitLine.intercept),
                }}
                stroke="#111827"
                strokeWidth={2}
                strokeDasharray="6 4"
              />
            ) : null}

            <AxisLeft
              scale={yScale}
              numTicks={5}
              label={yLabel ?? ""}
              labelOffset={50}
              labelProps={{ fontSize: 11, fill: "#4b5563", textAnchor: "middle" }}
              stroke="#9ca3af"
              tickStroke="#9ca3af"
              tickLabelProps={{ fontSize: 10, fill: "#6b7280" }}
            />
            <AxisBottom
              scale={xScale}
              top={innerHeight}
              numTicks={6}
              label={xLabel}
              labelOffset={16}
              labelProps={{ fontSize: 11, fill: "#4b5563", textAnchor: "middle" }}
              stroke="#9ca3af"
              tickStroke="#9ca3af"
              tickLabelProps={{ fontSize: 10, fill: "#6b7280" }}
            />

            {brushBox ? (
              <rect
                className="brush-box"
                x={brushBox.x}
                y={brushBox.y}
                width={brushBox.width}
                height={brushBox.height}
              />
            ) : null}

            <rect
              className="brush-target"
              width={innerWidth}
              height={innerHeight}
              onPointerDown={handleDown}
              onPointerMove={handleMove}
              onPointerUp={handleUp}
            />
          </Group>
        </svg>
      </div>
    </section>
  );
}
