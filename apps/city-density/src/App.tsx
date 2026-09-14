import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { count as fmt, decodePositions, type PointsPayload, radiusForZoom } from "@/decode";
import DensityMap, { type HexPick, type ViewState } from "@/DensityMap";

type HexSummary = {
  count: number;
  hours: number[];
  districts: { name: string; n: number }[];
  fare: { mean: number; median: number; p90: number } | null;
  duration: { mean: number; median: number } | null;
};

const BIN_SIZES = [
  { label: "fine", pixels: 8 },
  { label: "medium", pixels: 14 },
  { label: "coarse", pixels: 24 },
];

export default function App() {
  const {
    useShinyInitialized,
    useSetShinyInput,
    useShinyOutputValue,
    useShinyOutputStatus,
  } = window.shinyreact;

  const ready = useShinyInitialized();
  const payload = useShinyOutputValue<PointsPayload>("trip_points");
  const summary = useShinyOutputValue<HexSummary>("hex_summary");
  const summaryStatus = useShinyOutputStatus("hex_summary");
  const setPickedHex = useSetShinyInput<HexPick | null>("picked_hex", null);

  const [binPixels, setBinPixels] = useState(BIN_SIZES[1]!.pixels);
  const [extruded, setExtruded] = useState(false);
  const [picked, setPicked] = useState<HexPick | null>(null);
  const [rebins, setRebins] = useState({ count: 0, ms: 0 });

  const [viewState, setViewState] = useState<ViewState>({
    longitude: -0.1276,
    latitude: 51.5072,
    zoom: 10.2,
    pitch: 0,
    bearing: 0,
  });

  // Decoded once when the payload lands. Half a million positions, so doing
  // it per render would stall every interaction.
  const positions = useMemo(
    () => (payload ? decodePositions(payload) : null),
    [payload],
  );

  const roundTrips = useRoundTrips([payload, summary]);

  const handleRebin = useCallback((ms: number) => {
    setRebins((previous) => ({ count: previous.count + 1, ms }));
  }, []);

  const handlePick = useCallback(
    (hex: HexPick | null) => {
      setPicked(hex);
      setPickedHex(hex);
    },
    [setPickedHex],
  );

  // Pitch follows the extrusion toggle: a flat map tilted is just harder to
  // read, and extruded columns seen from directly above are invisible.
  useEffect(() => {
    setViewState((previous) => ({ ...previous, pitch: extruded ? 45 : 0 }));
  }, [extruded]);

  if (!ready) return null;

  const radius = radiusForZoom(viewState.zoom, binPixels);

  return (
    <main className="app">
      <header>
        <h1>City density</h1>
        <p className="claim">
          {payload ? fmt(payload.n) : "500,000"} trips, binned into hexagons in
          the browser. Zoom and the bins are rebuilt. The server is not asked.
        </p>
      </header>

      <div className="toolbar">
        <label>
          Bin size
          <select
            value={binPixels}
            onChange={(event) => setBinPixels(Number(event.target.value))}
          >
            {BIN_SIZES.map((size) => (
              <option key={size.pixels} value={size.pixels}>
                {size.label}
              </option>
            ))}
          </select>
        </label>

        <label className="check">
          <input
            type="checkbox"
            checked={extruded}
            onChange={(event) => setExtruded(event.target.checked)}
          />
          Extrude
        </label>

        <span className="radius">
          hex radius {fmt(radius)} m at zoom {viewState.zoom.toFixed(1)}
        </span>

        <div className="meters">
          <Meter value={roundTrips} label="server round trips" />
          <Meter value={rebins.count} label="rebins" />
          <Meter value={rebins.ms.toFixed(0) + " ms"} label="last rebin" />
        </div>
      </div>

      <div className="stage">
        {positions && payload ? (
          <DensityMap
            positions={positions}
            count={payload.n}
            boundary={payload.boundary}
            viewState={viewState}
            binPixels={binPixels}
            extruded={extruded}
            onViewState={setViewState}
            onPick={handlePick}
            onRebin={handleRebin}
          />
        ) : (
          <p className="skeleton">Loading half a million trips...</p>
        )}
      </div>

      <aside className={summaryStatus === "recalculating" ? "panel recalculating" : "panel"}>
        {picked && summary && summary.count > 0 ? (
          <>
            <h2>{fmt(summary.count)} trips under this hexagon</h2>
            <div className="stats">
              {summary.fare ? (
                <Stat
                  label="Fare"
                  main={"£" + summary.fare.median.toFixed(2)}
                  note={"median, 90th £" + summary.fare.p90.toFixed(2)}
                />
              ) : null}
              {summary.duration ? (
                <Stat
                  label="Duration"
                  main={summary.duration.median.toFixed(0) + " min"}
                  note={"median, mean " + summary.duration.mean.toFixed(0)}
                />
              ) : null}
            </div>

            <h3>By hour</h3>
            <HourBars hours={summary.hours} />

            <h3>Districts</h3>
            <ul className="districts">
              {summary.districts.map((district) => (
                <li key={district.name}>
                  <span className="label">{district.name}</span>
                  <span className="value">{fmt(district.n)}</span>
                </li>
              ))}
            </ul>

            <p className="note">
              None of this was on the client. Positions were sent, the hour,
              the fare and the duration were not, so this panel is the one
              thing here that needed the server.
            </p>
          </>
        ) : (
          <p className="hint">
            Click a hexagon. Panning, zooming and changing the bin size stay
            in the browser, so the round trip counter does not move.
          </p>
        )}
      </aside>
    </main>
  );
}

function Stat({ label, main, note }: { label: string; main: string; note: string }) {
  return (
    <div className="stat">
      <span className="stat-label">{label}</span>
      <span className="stat-main">{main}</span>
      <span className="stat-note">{note}</span>
    </div>
  );
}

function HourBars({ hours }: { hours: number[] }) {
  const peak = Math.max(1, ...hours);
  return (
    <ol className="hours" aria-label="Trips by hour of day">
      {hours.map((value, hour) => (
        <li key={hour} title={hour + ":00, " + fmt(value) + " trips"}>
          <span style={{ height: Math.round((value / peak) * 100) + "%" }} />
          {hour % 6 === 0 ? <em>{hour}</em> : null}
        </li>
      ))}
    </ol>
  );
}

function Meter({ value, label }: { value: number | string; label: string }) {
  return (
    <span className="meter">
      <span className="meter-value">{value}</span>
      <span className="meter-label">{label}</span>
    </span>
  );
}

/** Counts answers from the server, not renders. */
function useRoundTrips(outputs: unknown[]) {
  const [count, setCount] = useState(0);
  const previous = useRef<unknown[]>([]);

  useEffect(() => {
    let answers = 0;
    for (let i = 0; i < outputs.length; i += 1) {
      if (outputs[i] !== undefined && outputs[i] !== previous.current[i]) answers += 1;
    }
    previous.current = outputs.slice();
    if (answers > 0) setCount((seen) => seen + answers);
  });

  return count;
}
