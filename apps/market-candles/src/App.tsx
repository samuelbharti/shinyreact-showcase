import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import Chart from "@/Chart";
import {
  compact,
  decodeSeries,
  money,
  windowStats,
  type SeriesPayload,
  type WindowStats,
} from "@/series";

type Catalog = {
  symbols: string[];
  bars: number;
  barSeconds: number;
  startTime: number;
  barsPerSession: number;
};

export default function App() {
  const {
    useShinyInitialized,
    useShinyInput,
    useSetShinyInput,
    useShinyOutputValue,
    useShinyOutputStatus,
    ImageOutput,
  } = window.shinyreact;

  const ready = useShinyInitialized();
  const catalog = useShinyOutputValue<Catalog>("catalog");
  const payload = useShinyOutputValue<SeriesPayload>("series");
  const seriesStatus = useShinyOutputStatus("series");

  const [symbol, setSymbol] = useShinyInput<string>("symbol", "ACME");
  const [compare, setCompare] = useShinyInput<boolean>("compare", false);
  const setVisible = useSetShinyInput<{ first: number; last: number } | null>(
    "visible",
    null,
  );

  const serverWindow = useShinyOutputValue<WindowStats>("window");
  const chartStatus = useShinyOutputStatus("server_chart");

  const [range, setRange] = useState({ first: 0, last: 0 });
  const [hover, setHover] = useState<number | null>(null);
  const [decodeMs, setDecodeMs] = useState(0);

  const roundTrips = useRoundTrips([catalog, payload, serverWindow]);

  // Decoded once per symbol. Panning does not come near this.
  const bars = useMemo(() => {
    if (!payload) return null;
    const started = performance.now();
    const decoded = decodeSeries(payload);
    setDecodeMs(performance.now() - started);
    return decoded;
  }, [payload]);

  // The chart tells us what it is showing. In compare mode that goes to the
  // server, which draws the same window; otherwise it stays here.
  const handleRange = useCallback(
    (first: number, last: number) => {
      setRange({ first, last });
      if (compare) setVisible({ first, last });
    },
    [compare, setVisible],
  );

  useEffect(() => {
    if (!compare) setVisible(null);
    else setVisible({ first: range.first, last: range.last });
    // range is deliberately not a dependency: this is for the moment the
    // toggle flips, and handleRange covers the rest.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [compare, setVisible]);

  // The client's own numbers for the visible window. In compare mode the
  // server sends the same thing, computed the same way, so the panel reads
  // identically either way and the difference is only in what it cost.
  const stats = useMemo(() => {
    if (!bars) return null;
    return windowStats(bars, range.first, range.last);
  }, [bars, range]);

  const shown = compare ? (serverWindow ?? stats) : stats;

  if (!ready) return null;

  return (
    <main className="app">
      <header>
        <h1>Market candles</h1>
        <p className="claim">
          {catalog ? catalog.bars.toLocaleString("en-US") : "39,000"} one minute
          bars, sent once. Pan, zoom and the crosshair are the chart's own work.
          Turn on the server drawing to see what the same window costs the other
          way.
        </p>
      </header>

      <div className="toolbar">
        <label>
          Symbol
          <select value={symbol} onChange={(event) => setSymbol(event.target.value)}>
            {(catalog?.symbols ?? []).map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </label>

        <label className="check">
          <input
            type="checkbox"
            checked={compare}
            onChange={(event) => setCompare(event.target.checked)}
          />
          Also draw it on the server
        </label>

        <div className="meters">
          <Meter value={roundTrips} label="server round trips" />
          <Meter
            value={hover === null ? "--" : hover.toLocaleString("en-US")}
            label="bar under the crosshair"
          />
          <Meter value={decodeMs.toFixed(0) + " ms"} label="decoded the series" />
        </div>
      </div>

      <div className={seriesStatus === "recalculating" ? "stage recalculating" : "stage"}>
        {bars ? (
          <Chart bars={bars} onRange={handleRange} onHover={setHover} />
        ) : (
          <p className="skeleton">Loading the series...</p>
        )}
      </div>

      {shown ? (
        <ul className="stats">
          <Stat label="Bars in view" value={shown.bars.toLocaleString("en-US")} />
          <Stat label="Open" value={money(shown.open)} />
          <Stat label="Close" value={money(shown.close)} />
          <Stat
            label="Change"
            value={
              (shown.change >= 0 ? "+" : "") +
              money(shown.change) +
              " (" +
              shown.changePercent.toFixed(2) +
              "%)"
            }
            tone={shown.change >= 0 ? "up" : "down"}
          />
          <Stat label="High / low" value={money(shown.high) + " / " + money(shown.low)} />
          <Stat label="Volume" value={compact(shown.volume)} />
          <Stat label="Max drawdown" value={shown.maxDrawdown.toFixed(2) + "%"} tone="down" />
        </ul>
      ) : null}

      {compare ? (
        <section className="server-path">
          <h2>The same window, drawn by the server</h2>
          <p className="hint">
            This is what a plain Shiny app shows: a picture, redrawn on every
            pan and zoom. Move the chart above and watch the round trip counter,
            and this image, follow along behind.
          </p>
          {/* ImageOutput measures itself and asks the server for a plot at
              that size, then again on every resize and every new window. */}
          <ImageOutput
            id="server_chart"
            className={chartStatus === "recalculating" ? "shot recalculating" : "shot"}
          />
        </section>
      ) : (
        <p className="note">
          The server has sent one thing since this page loaded: the series.
          Everything since has been the chart's own work.
        </p>
      )}
    </main>
  );
}

function Stat({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone?: "up" | "down";
}) {
  return (
    <li className="stat">
      <span className="stat-label">{label}</span>
      <span className={tone ? "stat-value " + tone : "stat-value"}>{value}</span>
    </li>
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
