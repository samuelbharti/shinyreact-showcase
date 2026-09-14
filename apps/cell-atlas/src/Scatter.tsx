import { useEffect, useRef } from "react";
import createScatterplot from "regl-scatterplot";

import type { Positions } from "@/decode";

type ScatterProps = {
  positions: Positions | null;
  /** Cluster index per cell, for categorical coloring. */
  category: Float32Array | null;
  /** Expression in 0 to 1 per cell, for continuous coloring. */
  value: Float32Array | null;
  /** Cluster palette, or the ramp used for a gene. */
  palette: string[];
  colorBy: "z" | "w";
  pointSize: number;
  onSelect: (indices: number[]) => void;
  onDeselect: () => void;
  /** Called on every rendered frame, for the frame rate readout. */
  onFrame: () => void;
};

/**
 * regl-scatterplot, wrapped so React owns when it is told things rather than
 * how it draws.
 *
 * The instance is imperative and expensive, so it is created once and kept in
 * a ref. Everything React knows about it goes in through the effects below.
 * Re-creating it on a prop change would rebuild the WebGL context and lose
 * the camera, which is the thing the user is holding on to.
 */
export default function Scatter({
  positions,
  category,
  value,
  palette,
  colorBy,
  pointSize,
  onSelect,
  onDeselect,
  onFrame,
}: ScatterProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const plotRef = useRef<ReturnType<typeof createScatterplot> | null>(null);

  // Handlers live in a ref so the setup effect below can stay on an empty
  // dependency list. Without this, a new inline handler on every render would
  // tear the plot down and rebuild it.
  const handlers = useRef({ onSelect, onDeselect, onFrame });
  handlers.current = { onSelect, onDeselect, onFrame };

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const plot = createScatterplot({
      canvas,
      width: wrap.clientWidth,
      height: wrap.clientHeight,
      pointSize: 2,
      opacity: 0.75,
      backgroundColor: "#ffffff",
      // Shift and drag draws a lasso, and so does the handle that appears on
      // a long press. Without an initiator a touch user has no way in.
      lassoInitiator: true,
      lassoOnLongPress: true,
      deselectOnDblClick: true,
    });
    plotRef.current = plot;

    if (!plot.isSupported) {
      console.error("cell-atlas: this browser cannot run the scatter (no WebGL)");
    }

    plot.subscribe("select", ({ points }) => handlers.current.onSelect(points));
    plot.subscribe("deselect", () => handlers.current.onDeselect());
    plot.subscribe("draw", () => handlers.current.onFrame());

    const observer = new ResizeObserver(() => {
      plot.set({ width: wrap.clientWidth, height: wrap.clientHeight });
    });
    observer.observe(wrap);

    return () => {
      observer.disconnect();
      plot.destroy();
      plotRef.current = null;
    };
  }, []);

  // Upload the points. This runs when the positions first arrive, and again
  // whenever the gene changes, because `w` is part of the point record.
  useEffect(() => {
    const plot = plotRef.current;
    if (!plot || !positions) return;

    // Built key by key because tsconfig sets exactOptionalPropertyTypes, so
    // an explicit undefined is not the same as leaving the key out, and
    // regl-scatterplot wants it left out.
    const points: Parameters<typeof plot.draw>[0] = {
      x: positions.x,
      y: positions.y,
      ...(category ? { z: category } : {}),
      ...(value ? { w: value } : {}),
    };

    // zDataType and wDataType belong to draw(), not set(). They describe the
    // arrays being uploaded, so they travel with them.
    // draw() is async. Swallowing the promise hides a rejection completely,
    // and a scatter that silently never draws is the hardest thing here to
    // diagnose from a screenshot.
    plot
      .draw(points, { zDataType: "categorical", wDataType: "continuous" })
      .catch((error: unknown) => {
        console.error("cell-atlas: scatter draw failed", error);
      });
  }, [positions, category, value]);

  // Color and size are settings, not data, so they never re-upload 200,000
  // points. Switching between cluster and gene coloring is this effect alone.
  useEffect(() => {
    const plot = plotRef.current;
    if (!plot) return;

    plot.set({ colorBy, pointColor: palette, pointSize }).catch((error: unknown) => {
      console.error("cell-atlas: scatter set failed", error);
    });
  }, [colorBy, palette, pointSize]);

  return (
    <div className="scatter" ref={wrapRef}>
      <canvas ref={canvasRef} />
    </div>
  );
}
