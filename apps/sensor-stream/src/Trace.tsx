import { useEffect, useRef } from "react";
import uPlot from "uplot";

type TraceProps = {
  label: string;
  unit: string;
  color: string;
  /** Called with the plot so the parent can push data into it directly. */
  onReady: (plot: uPlot) => void;
  onGone: () => void;
};

/**
 * One channel, drawn by uPlot.
 *
 * React mounts it and then stays out of the way. New readings arrive many
 * times a second, and routing each one through React state would re-render
 * the tree at the sample rate for no benefit: the canvas is what changes,
 * and uPlot updates that itself.
 */
export default function Trace({ label, unit, color, onReady, onGone }: TraceProps) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const callbacks = useRef({ onReady, onGone });
  callbacks.current = { onReady, onGone };

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const plot = new uPlot(
      {
        width: host.clientWidth,
        height: 108,
        legend: { show: false },
        cursor: { show: true, y: false },
        scales: { x: { time: false } },
        axes: [
          { show: false },
          {
            size: 52,
            stroke: "#5c6370",
            grid: { stroke: "#eceef1", width: 1 },
            ticks: { show: false },
          },
        ],
        series: [
          {},
          { stroke: color, width: 1.5, points: { show: false } },
        ],
      },
      [[], []],
      host,
    );

    callbacks.current.onReady(plot);

    const observer = new ResizeObserver(() => {
      plot.setSize({ width: host.clientWidth, height: 108 });
    });
    observer.observe(host);

    return () => {
      observer.disconnect();
      callbacks.current.onGone();
      plot.destroy();
    };
  }, [color]);

  return (
    <section className="trace">
      <header>
        <span className="trace-label">{label}</span>
        <span className="trace-unit">{unit}</span>
      </header>
      <div className="trace-plot" ref={hostRef} />
    </section>
  );
}
