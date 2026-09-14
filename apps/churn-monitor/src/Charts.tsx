import { useLayoutEffect, useMemo, useRef, useState } from "react";

import { AxisBottom, AxisLeft } from "@visx/axis";
import { Group } from "@visx/group";
import { scaleLinear } from "@visx/scale";
import { Bar, Circle, Line, LinePath } from "@visx/shape";

import type { Curves, Histogram, Metrics, Sweep } from "@/scores";

/** One point on a line. visx cannot infer this through the data prop. */
type Point = { x: number; y: number };

// An svg clips at its own height, so the bottom margin has to hold the tick
// labels and the axis label, or the label is simply cut in half.
const MARGIN = { top: 8, right: 14, bottom: 54, left: 58 };
const PLOT_HEIGHT = 222;

export const STAY_COLOUR = "#94a3b8";
export const LEAVE_COLOUR = "#dc2626";
const PRECISION_COLOUR = "#0f7a4a";
const RECALL_COLOUR = "#b45309";
const COST_COLOUR = "#7c3aed";
const MARK = "#111827";

/** Width of a panel's plot area, tracked so the axes stay honest. */
function useWidth(): [React.RefObject<HTMLDivElement | null>, number] {
  const ref = useRef<HTMLDivElement | null>(null);
  // Never zero. A panel that measures zero draws nothing and looks broken
  // rather than empty, and in a headless browser it never recovers.
  const [width, setWidth] = useState(420);

  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) return;

    const measure = () => setWidth(Math.max(220, Math.round(node.clientWidth)));
    measure();

    if (typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return [ref, width];
}

type FrameProps = {
  id: string;
  title: string;
  note?: string;
  children: (inner: { width: number; height: number }) => React.ReactNode;
};

function Frame({ id, title, note, children }: FrameProps) {
  const [box, width] = useWidth();
  const innerWidth = Math.max(60, width - MARGIN.left - MARGIN.right);
  const innerHeight = PLOT_HEIGHT - MARGIN.top - MARGIN.bottom;

  return (
    <section className="panel" data-panel={id}>
      <h3>
        {title}
        {note ? <span className="panel-note">{note}</span> : null}
      </h3>
      <div className="plot" ref={box} style={{ height: PLOT_HEIGHT }}>
        <svg width={width} height={PLOT_HEIGHT}>
          <Group left={MARGIN.left} top={MARGIN.top}>
            {children({ width: innerWidth, height: innerHeight })}
          </Group>
        </svg>
      </div>
    </section>
  );
}

const axisProps = {
  stroke: "#9ca3af",
  tickStroke: "#9ca3af",
  tickLabelProps: { fontSize: 10, fill: "#6b7280" } as const,
  labelProps: { fontSize: 11, fill: "#4b5563", textAnchor: "middle" } as const,
};

/** 0 to 1 on the score grid, shown as a probability. */
function scoreTicks(scale: number) {
  return (value: number) => (value / scale).toFixed(1);
}

export function ScorePanel({
  bars,
  threshold,
  scoreScale,
}: {
  bars: Histogram;
  threshold: number;
  scoreScale: number;
}) {
  return (
    <Frame
      id="scores"
      title="Predicted risk"
      note="what the model said, against what happened"
    >
      {({ width, height }) => {
        const x = scaleLinear<number>({ domain: [0, scoreScale], range: [0, width] });
        const tallest = Math.max(...bars.stayed, ...bars.left, 1);
        const y = scaleLinear<number>({ domain: [0, tallest], range: [height, 0], nice: true });
        const barWidth = Math.max(1, width / bars.bins - 1);

        return (
          <>
            {bars.stayed.map((count, slot) => (
              <g key={slot}>
                <Bar
                  x={x(bars.edges[slot]!)}
                  y={y(count)}
                  width={barWidth}
                  height={Math.max(0, height - y(count))}
                  fill={STAY_COLOUR}
                />
                <Bar
                  x={x(bars.edges[slot]!)}
                  y={y(bars.left[slot]!)}
                  width={barWidth}
                  height={Math.max(0, height - y(bars.left[slot]!))}
                  fill={LEAVE_COLOUR}
                  opacity={0.85}
                />
              </g>
            ))}
            {/* The only thing on this panel that moves. */}
            <Line
              className="threshold"
              from={{ x: x(threshold), y: 0 }}
              to={{ x: x(threshold), y: height }}
              stroke={MARK}
              strokeWidth={2}
            />
            <AxisLeft scale={y} numTicks={4} label="customers" labelOffset={40} {...axisProps} />
            <AxisBottom
              scale={x}
              top={height}
              numTicks={5}
              tickFormat={scoreTicks(scoreScale) as never}
              label="predicted risk"
              labelOffset={12}
              {...axisProps}
            />
          </>
        );
      }}
    </Frame>
  );
}

export function RocPanel({
  curves,
  shown,
  auc,
}: {
  curves: Curves;
  shown: Metrics;
  auc: number;
}) {
  const points = useMemo(
    () =>
      curves.thresholds.map((_, i) => ({
        x: curves.falsePositiveRate[i]!,
        y: curves.recall[i]!,
      })),
    [curves],
  );

  return (
    <Frame id="roc" title="ROC" note={"area under the curve " + auc.toFixed(3)}>
      {({ width, height }) => {
        const x = scaleLinear<number>({ domain: [0, 1], range: [0, width] });
        const y = scaleLinear<number>({ domain: [0, 1], range: [height, 0] });

        return (
          <>
            <Line
              from={{ x: 0, y: height }}
              to={{ x: width, y: 0 }}
              stroke="#cbd5e1"
              strokeDasharray="4 4"
            />
            <LinePath
              data={points}
              x={(d: Point) => x(d.x)}
              y={(d: Point) => y(d.y)}
              stroke="#2f6fed"
              strokeWidth={2}
            />
            {/* The operating point. The curve is a property of the scores and
                never moves; only this does. */}
            <Circle
              className="operating"
              cx={x(shown.falsePositiveRate)}
              cy={y(shown.recall)}
              r={5}
              fill={MARK}
            />
            <AxisLeft scale={y} numTicks={4} label="recall" labelOffset={34} {...axisProps} />
            <AxisBottom
              scale={x}
              top={height}
              numTicks={5}
              label="false positive rate"
              labelOffset={12}
              {...axisProps}
            />
          </>
        );
      }}
    </Frame>
  );
}

export function RatesPanel({
  curves,
  threshold,
  scoreScale,
}: {
  curves: Curves;
  threshold: number;
  scoreScale: number;
}) {
  return (
    <Frame id="rates" title="Precision and recall" note="across every threshold">
      {({ width, height }) => {
        const x = scaleLinear<number>({ domain: [0, scoreScale], range: [0, width] });
        const y = scaleLinear<number>({ domain: [0, 1], range: [height, 0] });
        const at = (values: number[]) =>
          curves.thresholds.map((t, i) => ({ x: t, y: values[i]! }));

        return (
          <>
            <LinePath
              data={at(curves.precision)}
              x={(d: Point) => x(d.x)}
              y={(d: Point) => y(d.y)}
              stroke={PRECISION_COLOUR}
              strokeWidth={2}
            />
            <LinePath
              data={at(curves.recall)}
              x={(d: Point) => x(d.x)}
              y={(d: Point) => y(d.y)}
              stroke={RECALL_COLOUR}
              strokeWidth={2}
            />
            <Line
              className="threshold"
              from={{ x: x(threshold), y: 0 }}
              to={{ x: x(threshold), y: height }}
              stroke={MARK}
              strokeWidth={2}
            />
            <AxisLeft scale={y} numTicks={4} labelOffset={34} {...axisProps} />
            <AxisBottom
              scale={x}
              top={height}
              numTicks={5}
              tickFormat={scoreTicks(scoreScale) as never}
              label="threshold"
              labelOffset={12}
              {...axisProps}
            />
          </>
        );
      }}
    </Frame>
  );
}

export function CostPanel({
  sweep,
  threshold,
  scoreScale,
}: {
  sweep: Sweep;
  threshold: number;
  scoreScale: number;
}) {
  const points = useMemo(
    () =>
      Array.from(sweep.thresholds, (t, i) => ({ x: t, y: sweep.cost[i]! })),
    [sweep],
  );

  return (
    <Frame
      id="cost"
      title="What it costs"
      note={"cheapest at " + (sweep.bestThreshold / scoreScale).toFixed(2)}
    >
      {({ width, height }) => {
        const highest = Math.max(...points.map((p) => p.y), 1);
        const x = scaleLinear<number>({ domain: [0, scoreScale], range: [0, width] });
        const y = scaleLinear<number>({ domain: [0, highest], range: [height, 0], nice: true });

        return (
          <>
            <LinePath
              data={points}
              x={(d: Point) => x(d.x)}
              y={(d: Point) => y(d.y)}
              stroke={COST_COLOUR}
              strokeWidth={2}
            />
            {/* Both of these move: the best threshold when a cost changes,
                the marker when the threshold does. */}
            <Line
              className="best"
              from={{ x: x(sweep.bestThreshold), y: 0 }}
              to={{ x: x(sweep.bestThreshold), y: height }}
              stroke={PRECISION_COLOUR}
              strokeWidth={2}
              strokeDasharray="5 4"
            />
            <Line
              className="threshold"
              from={{ x: x(threshold), y: 0 }}
              to={{ x: x(threshold), y: height }}
              stroke={MARK}
              strokeWidth={2}
            />
            <AxisLeft
              scale={y}
              numTicks={4}
              tickFormat={((v: number) => "£" + Math.round(v / 1000) + "k") as never}
              labelOffset={44}
              {...axisProps}
            />
            <AxisBottom
              scale={x}
              top={height}
              numTicks={5}
              tickFormat={scoreTicks(scoreScale) as never}
              label="threshold"
              labelOffset={12}
              {...axisProps}
            />
          </>
        );
      }}
    </Frame>
  );
}
