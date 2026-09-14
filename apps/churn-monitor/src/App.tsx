import { useEffect, useMemo, useRef, useState } from "react";

import { CostPanel, LEAVE_COLOUR, RatesPanel, RocPanel, ScorePanel, STAY_COLOUR } from "@/Charts";
import {
  buildCurve,
  commas,
  decodeScores,
  histogram,
  metricsAt,
  money,
  percent,
  sweepCost,
  type ScoresPayload,
  type Summary,
} from "@/scores";

// The slider moves in hundredths of a probability, which on the score grid is
// a hundred. Both sides then compare the same integers and there is no such
// thing as a customer who is above the threshold in one place and below it in
// the other.
const STEP = 100;

export default function App() {
  const { useShinyInitialized, useShinyInput, useShinyOutputValue, useShinyOutputStatus, ImageOutput } =
    window.shinyreact;

  const ready = useShinyInitialized();
  const summary = useShinyOutputValue<Summary>("summary");
  const payload = useShinyOutputValue<ScoresPayload>("scores");
  const panelStatus = useShinyOutputStatus("server_panels");
  // Counted alongside the other two rather than by watching the status flicker
  // between states. This is the picture itself, so one new value is one plot
  // the server actually drew.
  const panels = useShinyOutputValue<unknown>("server_panels");

  // Held on the server so the compare path can draw the same picture. While
  // compare is off the server does nothing with them, which is the point.
  const [threshold, setThreshold] = useShinyInput<number>("threshold", 3000);
  const [missCost, setMissCost] = useShinyInput<number>("miss_cost", 220);
  const [offerCost, setOfferCost] = useShinyInput<number>("offer_cost", 25);
  const [compare, setCompare] = useShinyInput<boolean>("compare", false);

  const [decodeMs, setDecodeMs] = useState(0);
  const work = useRef({ frames: 0, worstUs: 0 });
  const roundTrips = useRoundTrips([summary, payload, panels]);

  const scored = useMemo(() => {
    if (!payload) return null;
    const started = performance.now();
    const decoded = decodeScores(payload);
    const curve = buildCurve(decoded);
    const bars = histogram(decoded);
    setDecodeMs(performance.now() - started);
    return { decoded, curve, bars };
  }, [payload]);

  // Every number on this page, recomputed. This is the whole cost of moving
  // any of the three sliders.
  const view = useMemo(() => {
    if (!scored) return null;
    const started = performance.now();
    const shown = metricsAt(scored.curve, threshold, missCost, offerCost);
    const sweep = sweepCost(scored.curve, missCost, offerCost);
    const micros = (performance.now() - started) * 1000;

    work.current.frames += 1;
    if (micros > work.current.worstUs) work.current.worstUs = micros;

    return { shown, sweep };
  }, [scored, threshold, missCost, offerCost]);

  if (!ready) return null;

  const total = summary?.customers ?? 0;

  return (
    <main className="app">
      <header>
        <h1>Churn monitor</h1>
        <p className="claim">
          {summary ? commas(summary.customers) : "50,000"} scored customers,
          sent once. Move the threshold and every number here is recomputed
          from a cumulative count, in a few microseconds. Turn on the server
          drawing to see what the same move costs the other way.
        </p>
      </header>

      <div className="toolbar">
        <Meter value={commas(work.current.frames)} label="recomputed here" />
        <Meter value={roundTrips} label="server round trips" tone="server" />
        {/* Chrome coarsens performance.now() to a tenth of a millisecond, so
            anything faster than that reads as exactly 100 us. Saying "under"
            is honest; printing 100 as though it were measured is not. */}
        <Meter
          value={
            work.current.worstUs <= 100
              ? "under 100 us"
              : work.current.worstUs < 1000
                ? Math.round(work.current.worstUs) + " us"
                : (work.current.worstUs / 1000).toFixed(1) + " ms"
          }
          label="slowest recompute"
        />
        <Meter value={decodeMs.toFixed(0) + " ms"} label="decoded and indexed" />
        <label className="check">
          <input
            type="checkbox"
            checked={compare}
            onChange={(event) => setCompare(event.target.checked)}
          />
          Also draw it on the server
        </label>
      </div>

      {scored && summary && view ? (
        <>
          <div className="sliders">
            <Slider
              id="threshold"
              label="Flag a customer at"
              value={threshold}
              min={0}
              max={summary.scoreScale}
              step={STEP}
              onChange={setThreshold}
              format={(v) => percent(v / summary.scoreScale, 0) + " risk"}
            />
            <Slider
              id="miss"
              label="A customer lost costs"
              value={missCost}
              min={20}
              max={800}
              step={10}
              onChange={setMissCost}
              format={(v) => money(v)}
            />
            <Slider
              id="offer"
              label="A retention offer costs"
              value={offerCost}
              min={5}
              max={200}
              step={5}
              onChange={setOfferCost}
              format={(v) => money(v)}
            />
          </div>

          <ul className="metrics">
            <Metric label="Flagged" value={commas(view.shown.flagged)} note={percent(view.shown.flagged / total)} />
            <Metric label="Precision" value={percent(view.shown.precision)} note="of those flagged, really left" />
            <Metric label="Recall" value={percent(view.shown.recall)} note="of those who left, flagged" />
            <Metric label="F1" value={view.shown.f1.toFixed(3)} note="the usual balance of the two" />
            <Metric label="Expected cost" value={money(view.shown.cost)} note="misses plus offers" tone="cost" />
            <Metric
              label="Cheapest threshold"
              value={percent(view.sweep.bestThreshold / summary.scoreScale, 0)}
              note={money(view.sweep.bestCost)}
              tone="best"
            />
          </ul>

          <div className="matrix">
            <Cell label="Flagged and left" value={view.shown.truePositive} tone="good" />
            <Cell label="Flagged, would have stayed" value={view.shown.falsePositive} tone="offer" />
            <Cell label="Missed, and left" value={view.shown.falseNegative} tone="bad" />
            <Cell label="Left alone, and stayed" value={view.shown.trueNegative} tone="good" />
          </div>

          <div className="grid">
            <ScorePanel bars={scored.bars} threshold={threshold} scoreScale={summary.scoreScale} />
            <RocPanel curves={summary.curves} shown={view.shown} auc={summary.auc} />
            <RatesPanel curves={summary.curves} threshold={threshold} scoreScale={summary.scoreScale} />
            <CostPanel sweep={view.sweep} threshold={threshold} scoreScale={summary.scoreScale} />
          </div>

          <p className="legend">
            <span className="swatch" style={{ background: LEAVE_COLOUR }} /> left
            <span className="swatch" style={{ background: STAY_COLOUR }} /> stayed
            <span className="spacer" />
            Base rate {percent(summary.baseRate)}, {commas(summary.left)} of{" "}
            {commas(summary.customers)}.
          </p>

          {compare ? (
            <section className="server-path">
              <h2>The same four panels, drawn by the server</h2>
              <p className="hint">
                This is what a plain Shiny app shows. Move any slider above and
                watch the round trip counter, and this image, follow along
                behind.
              </p>
              {/* ImageOutput renders as the image rather than around one, and
                  it has to be given a size: with none it measures zero and the
                  server is never asked for anything. */}
              <ImageOutput
                id="server_panels"
                className={panelStatus === "recalculating" ? "shot recalculating" : "shot"}
              />
            </section>
          ) : (
            <p className="note">
              The server has sent two things since this page loaded: the
              summary and the scores. Every slider move since has been
              arithmetic in this tab.
            </p>
          )}
        </>
      ) : (
        <p className="skeleton">Loading the scores...</p>
      )}
    </main>
  );
}

function Slider({
  id,
  label,
  value,
  min,
  max,
  step,
  onChange,
  format,
}: {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  format: (value: number) => string;
}) {
  return (
    <label className="slider" data-slider={id}>
      <span className="slider-label">
        {label}
        <b>{format(value)}</b>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </label>
  );
}

function Metric({
  label,
  value,
  note,
  tone,
}: {
  label: string;
  value: string;
  note: string;
  tone?: "cost" | "best";
}) {
  return (
    <li className={tone ? "metric " + tone : "metric"}>
      <span className="metric-label">{label}</span>
      <span className="metric-value">{value}</span>
      <span className="metric-note">{note}</span>
    </li>
  );
}

function Cell({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: "good" | "bad" | "offer";
}) {
  return (
    <div className={"cell " + tone}>
      <span className="cell-value">{commas(value)}</span>
      <span className="cell-label">{label}</span>
    </div>
  );
}

function Meter({
  value,
  label,
  tone,
}: {
  value: number | string;
  label: string;
  tone?: "server";
}) {
  return (
    <span className={tone ? "meter " + tone : "meter"}>
      <span className="meter-value">{value}</span>
      <span className="meter-label">{label}</span>
    </span>
  );
}

/** Counts answers from the server, not renders. */
function useRoundTrips(outputs: unknown[]) {
  const [seen, setSeen] = useState(0);
  const previous = useRef<unknown[]>([]);

  useEffect(() => {
    let answers = 0;
    for (let i = 0; i < outputs.length; i += 1) {
      if (outputs[i] !== undefined && outputs[i] !== previous.current[i]) answers += 1;
    }
    previous.current = outputs.slice();
    if (answers > 0) setSeen((total) => total + answers);
  });

  return seen;
}
