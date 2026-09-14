import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import {
  asInt16,
  base64ToBytes,
  indicesToBase64,
  toCategory,
  toUnitSquare,
  toUnitValue,
} from "@/decode";
import Scatter from "@/Scatter";
import SelectionPanel, { type Summary } from "@/SelectionPanel";

type Cluster = { name: string; color: string; count: number; profile: number[] };

type AtlasPoints = {
  n_cells: number;
  bounds: number[];
  genes: string[];
  clusters: Cluster[];
  x: string;
  y: string;
  cluster: string;
};

type GeneExpression = { gene: string; max: number; values: string };

// Viridis, sampled at nine stops. regl-scatterplot interpolates between them
// for a continuous encoding, so nine is plenty.
const RAMP = [
  "#440154", "#472d7b", "#3b528b", "#2c728e", "#21918c",
  "#28ae80", "#5ec962", "#addc30", "#fde725",
];

export default function App() {
  // Read the hooks off the global here rather than at module scope, so this
  // file can be imported before shinyreact has installed it. That is what
  // makes the component testable.
  const {
    useShinyInitialized,
    useShinyInput,
    useSetShinyInput,
    useShinyOutputValue,
    useShinyOutputStatus,
    useShinyOutputError,
  } = window.shinyreact;

  const ready = useShinyInitialized();

  // -1 means color by cluster. Anything else is an index into `genes`.
  const [gene, setGene] = useShinyInput<number>("gene", -1);
  const setSelection = useSetShinyInput<string>("selection", "");

  const atlas = useShinyOutputValue<AtlasPoints>("atlas_points");
  const expression = useShinyOutputValue<GeneExpression>("gene_expression");
  const summary = useShinyOutputValue<Summary>("selection_summary");
  const summaryStatus = useShinyOutputStatus("selection_summary");
  const summaryError = useShinyOutputError("selection_summary");

  const [pointSize, setPointSize] = useState(2);

  // Decoded once when the payload lands, not on every render. Roughly 25 ms
  // for 200,000 cells, and it would otherwise run on every pointer move.
  const positions = useMemo(() => {
    if (!atlas) return null;
    return toUnitSquare(
      asInt16(base64ToBytes(atlas.x)),
      asInt16(base64ToBytes(atlas.y)),
      atlas.bounds,
    );
  }, [atlas]);

  const category = useMemo(
    () => (atlas ? toCategory(base64ToBytes(atlas.cluster)) : null),
    [atlas],
  );

  const values = useMemo(
    () => (expression ? toUnitValue(base64ToBytes(expression.values)) : null),
    [expression],
  );

  const palette = useMemo(
    () => (gene < 0 ? (atlas?.clusters ?? []).map((c) => c.color) : RAMP),
    [gene, atlas],
  );

  // Two numbers that make the claim checkable instead of a sentence.
  const { fps, onFrame } = useFrameRate();
  const roundTrips = useRoundTrips([expression, summary]);

  const handleSelect = useCallback(
    (indices: number[]) => setSelection(indicesToBase64(indices)),
    [setSelection],
  );
  const handleDeselect = useCallback(() => setSelection(""), [setSelection]);

  // Gate the first paint so the controls do not flash their defaults while
  // the websocket is still connecting.
  if (!ready) return null;

  return (
    <main className="app">
      <header>
        <h1>Cell atlas</h1>
        <p className="claim">
          {atlas ? atlas.n_cells.toLocaleString() : "200,000"} cells in one
          WebGL scatter. Pan, zoom and lasso without waiting on the server.
        </p>
      </header>

      <div className="toolbar">
        <label>
          Color by
          <select
            value={gene}
            onChange={(event) => setGene(Number(event.target.value))}
          >
            <option value={-1}>Cluster</option>
            {(atlas?.genes ?? []).map((name, index) => (
              <option key={name} value={index}>
                {name}
              </option>
            ))}
          </select>
        </label>

        <label>
          Point size
          <input
            type="range"
            min={1}
            max={6}
            value={pointSize}
            onChange={(event) => setPointSize(Number(event.target.value))}
          />
        </label>

        <div className="meters">
          <span className="meter">
            <span className="meter-value">{fps === null ? "--" : fps}</span>
            <span className="meter-label">frames per second</span>
          </span>
          <span className="meter">
            <span className="meter-value">{roundTrips}</span>
            <span className="meter-label">server round trips</span>
          </span>
        </div>
      </div>

      <div className="stage">
        {positions ? (
          <Scatter
            positions={positions}
            category={category}
            value={values}
            palette={palette}
            colorBy={gene < 0 ? "z" : "w"}
            pointSize={pointSize}
            onSelect={handleSelect}
            onDeselect={handleDeselect}
            onFrame={onFrame}
          />
        ) : (
          <div className="scatter loading">
            <p>Loading 200,000 cells...</p>
          </div>
        )}

        <SelectionPanel
          summary={summary}
          recalculating={summaryStatus === "recalculating"}
          error={summaryError ? summaryError.message : null}
        />
      </div>

      {gene >= 0 && expression ? (
        <p className="legend">
          <span className="legend-label">{expression.gene}</span>
          <span className="ramp" />
          <span className="legend-max">{expression.max.toFixed(1)}</span>
        </p>
      ) : null}
    </main>
  );
}

/**
 * Frames per second, counted from the frames the scatter actually renders.
 *
 * regl-scatterplot only draws when something changed, so this reads zero when
 * the plot is idle. The number that matters is the one while you are dragging.
 */
function useFrameRate() {
  const frames = useRef(0);
  const [fps, setFps] = useState<number | null>(null);

  const onFrame = useCallback(() => {
    frames.current += 1;
  }, []);

  useEffect(() => {
    const WINDOW_MS = 500;
    const timer = window.setInterval(() => {
      const drawn = frames.current;
      frames.current = 0;
      setFps(drawn === 0 ? 0 : Math.round((drawn * 1000) / WINDOW_MS));
    }, WINDOW_MS);
    return () => window.clearInterval(timer);
  }, []);

  return { fps, onFrame };
}

/**
 * How many answers have come back from the server.
 *
 * This is the honest version of the claim. Pan and zoom all you like and it
 * does not move. It goes up by one for a gene change and one for a lasso.
 *
 * Counts a value that changed identity, not a render. The hooks hand back the
 * same object until the server sends a new one, so comparing against the
 * previous render is enough, and an output that has never arrived is not a
 * round trip.
 */
function useRoundTrips(outputs: unknown[]) {
  const [count, setCount] = useState(0);
  const previous = useRef<unknown[]>([]);

  // No dependency list on purpose: the comparison below is the guard. It
  // settles after one extra render because the second pass finds nothing
  // changed and never calls setCount.
  useEffect(() => {
    let answers = 0;
    for (let i = 0; i < outputs.length; i += 1) {
      if (outputs[i] !== undefined && outputs[i] !== previous.current[i]) {
        answers += 1;
      }
    }
    previous.current = outputs.slice();
    if (answers > 0) setCount((seen) => seen + answers);
  });

  return count;
}
