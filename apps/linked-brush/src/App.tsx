import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import Panel, { POPULATION_COLOURS, type FitLine } from "@/Panel";
import {
  count as commas,
  countPopulations,
  decodeStars,
  distanceLabel,
  parsecs,
  roundRect,
  selectInto,
  type Brushes,
  type CataloguePayload,
  type PanelId,
  type Rect,
  type ServerSummary,
  type Stars,
  type Summary,
} from "@/stars";

// Brush edges are rounded before anything reads them, so the selection drawn
// here and the one the server fits come from exactly the same numbers. Round
// only on the way out and a star sitting on the boundary lands in one
// selection and not the other, and the two counts differ by one for reasons
// nobody can see.
const EDGE_PLACES = 4;

// Short names for the chips under the server's answer.
const PANEL_LABELS: Record<PanelId, string> = {
  hr: "colour and brightness",
  sky: "the sky",
  distance: "distance",
  apparent: "apparent brightness",
};

export default function App() {
  const { useShinyInitialized, useShinyInput, useShinyOutputValue, useShinyOutputStatus } =
    window.shinyreact;

  const ready = useShinyInitialized();
  const summary = useShinyOutputValue<Summary>("summary");
  const payload = useShinyOutputValue<CataloguePayload>("catalogue");
  const fitted = useShinyOutputValue<ServerSummary>("fitted");
  const fitStatus = useShinyOutputStatus("fitted");

  const [, setCommitted] = useShinyInput<Brushes | null>("brushes", null);

  const [brushes, setBrushes] = useState<Brushes>({});
  const brushesRef = useRef<Brushes>({});
  const maskRef = useRef<Uint8Array>(new Uint8Array(0));
  const workRef = useRef({ frames: 0, revision: 0, worstMs: 0 });

  const [decodeMs, setDecodeMs] = useState(0);
  const roundTrips = useRoundTrips([summary, payload, fitted]);

  const stars = useMemo<Stars | null>(() => {
    if (!payload) return null;
    const started = performance.now();
    const decoded = decodeStars(payload);
    setDecodeMs(performance.now() - started);
    return decoded;
  }, [payload]);

  // Every brush move lands here, and nowhere else. Forty thousand stars
  // against up to four rectangles, then two histograms rebinned, per frame.
  const selection = useMemo(() => {
    const work = workRef.current;
    if (!stars) return { count: 0, revision: 0, ms: 0, populations: [0, 0, 0] };

    if (maskRef.current.length !== stars.count) {
      maskRef.current = new Uint8Array(stars.count);
    }

    const started = performance.now();
    const found = selectInto(stars, brushes, maskRef.current);
    const ms = performance.now() - started;

    work.revision += 1;
    work.frames += 1;
    if (ms > work.worstMs) work.worstMs = ms;

    return {
      count: found,
      revision: work.revision,
      ms,
      populations: countPopulations(stars, maskRef.current, 3),
    };
  }, [stars, brushes]);

  const handleBrush = useCallback((id: PanelId, rect: Rect | null) => {
    const next: Brushes = { ...brushesRef.current };
    if (rect) next[id] = roundRect(rect, EDGE_PLACES);
    else delete next[id];
    brushesRef.current = next;
    setBrushes(next);
  }, []);

  // The only thing a drag sends. Everything above happened while the pointer
  // was down; this happens once, when it comes up.
  const handleCommit = useCallback(() => {
    const next = brushesRef.current;
    setCommitted(Object.keys(next).length > 0 ? next : null);
  }, [setCommitted]);

  const clearAll = useCallback(() => {
    brushesRef.current = {};
    setBrushes({});
    setCommitted(null);
  }, [setCommitted]);

  const fitLine = useMemo<FitLine | null>(() => {
    if (!fitted?.fit || !fitted.colourRange) return null;
    return {
      slope: fitted.fit.slope,
      intercept: fitted.fit.intercept,
      x0: fitted.colourRange[0],
      x1: fitted.colourRange[1],
    };
  }, [fitted]);

  const brushCount = Object.keys(brushes).length;
  const work = workRef.current;

  if (!ready) return null;

  return (
    <main className="app">
      <header>
        <h1>Linked brush</h1>
        <p className="claim">
          {summary ? commas(summary.stars) : "40,000"} stars, sent once. Drag a
          box on any panel and the other three follow the pointer. Let go and
          the server fits a line through what you chose, which is the only
          thing the whole drag costs.
        </p>
      </header>

      <div className="toolbar">
        <Meter value={commas(work.frames)} label="selections computed here" />
        <Meter value={roundTrips} label="server round trips" tone="server" />
        <Meter value={work.worstMs.toFixed(1) + " ms"} label="slowest one" />
        <Meter value={decodeMs.toFixed(0) + " ms"} label="decoded the catalogue" />
        <button type="button" onClick={clearAll} disabled={brushCount === 0}>
          Clear {brushCount > 0 ? brushCount : "all"}
        </button>
      </div>

      {stars && summary ? (
        <>
          <div className="grid">
            <Panel
              id="hr"
              title="Colour and brightness"
              note="the main sequence, the giant branch, the white dwarfs"
              stars={stars}
              mask={maskRef.current}
              revision={selection.revision}
              brush={brushes.hr ?? null}
              ranges={summary.ranges}
              onBrush={handleBrush}
              onCommit={handleCommit}
              fitLine={fitLine}
              xLabel="B minus V"
              yLabel="absolute magnitude"
              invertY
            />
            <Panel
              id="sky"
              title="Where they are"
              note="galactic coordinates, centre of the galaxy at zero"
              stars={stars}
              mask={maskRef.current}
              revision={selection.revision}
              brush={brushes.sky ?? null}
              ranges={summary.ranges}
              onBrush={handleBrush}
              onCommit={handleCommit}
              xLabel="longitude"
              yLabel="latitude"
            />
            <Panel
              id="distance"
              title="How far"
              note="log10 parsecs"
              stars={stars}
              mask={maskRef.current}
              revision={selection.revision}
              brush={brushes.distance ?? null}
              ranges={summary.ranges}
              onBrush={handleBrush}
              onCommit={handleCommit}
              xLabel="log10 distance in parsecs"
              yLabel="stars"
            />
            <Panel
              id="apparent"
              title="How bright they look"
              note={"the survey stops near " + summary.apparentLimit}
              stars={stars}
              mask={maskRef.current}
              revision={selection.revision}
              brush={brushes.apparent ?? null}
              ranges={summary.ranges}
              onBrush={handleBrush}
              onCommit={handleCommit}
              xLabel="apparent magnitude"
              yLabel="stars"
            />
          </div>

          <section className="readout">
            <div className="side">
              <h2>
                Counted here
                <span className="badge local">no server</span>
              </h2>
              <p className="headline">{commas(selection.count)} stars</p>
              <ul className="mix">
                {summary.populations.map((name, group) => (
                  <li key={name}>
                    <span className="swatch" style={{ background: POPULATION_COLOURS[group] }} />
                    {name}
                    <b>{commas(selection.populations[group] ?? 0)}</b>
                  </li>
                ))}
              </ul>
              <p className="hint">
                Recomputed {commas(work.frames)} times so far, the slowest
                taking {work.worstMs.toFixed(1)} ms. None of that reached the
                server.
              </p>
            </div>

            <div className={fitStatus === "recalculating" ? "side waiting" : "side"}>
              <h2>
                Fitted on the server
                <span className="badge remote">{roundTrips} round trips</span>
              </h2>
              {fitted ? (
                <>
                  <p className="headline">
                    {commas(fitted.stars)} stars
                    {fitted.stars === selection.count ? (
                      <span className="agree">same selection</span>
                    ) : (
                      <span className="stale">brush moved since</span>
                    )}
                  </p>
                  {fitted.fit ? (
                    <ul className="numbers">
                      <li>
                        <span>Slope</span>
                        <b>{fitted.fit.slope.toFixed(3)} mag per B minus V</b>
                      </li>
                      <li>
                        <span>Intercept</span>
                        <b>{fitted.fit.intercept.toFixed(3)}</b>
                      </li>
                      <li>
                        <span>Residual scatter</span>
                        <b>{fitted.fit.scatter.toFixed(3)} mag</b>
                      </li>
                      <li>
                        <span>Correlation</span>
                        <b>{fitted.fit.correlation.toFixed(3)}</b>
                      </li>
                      <li>
                        <span>Median distance</span>
                        <b>
                          {fitted.medianParsecs
                            ? distanceLabel(fitted.medianParsecs)
                            : "--"}
                        </b>
                      </li>
                    </ul>
                  ) : (
                    <p className="hint">
                      Too few stars, or too little spread in colour, for a line
                      to mean anything.
                    </p>
                  )}
                  <AskedAbout />
                  <p className="hint">
                    The dashed line on the first panel is this fit. It is the
                    one mark on the page that cost a round trip.
                  </p>
                </>
              ) : (
                <p className="hint">
                  Nothing asked for yet. Drag a box and let go.
                </p>
              )}
            </div>
          </section>

          <p className="note">
            Try the white dwarfs, bottom left of the first panel, and then the
            blue end of the main sequence. Both are a few thousand stars, and
            the distance panel puts one inside{" "}
            {distanceLabel(parsecs(1))} and the other a kiloparsec out. A survey
            sees a bright star much further away than a faint one, which is why
            the two brushes disagree so completely.
          </p>
        </>
      ) : (
        <p className="skeleton">Loading the catalogue...</p>
      )}
    </main>
  );
}

/**
 * Which panels the server was last asked about.
 *
 * This reads the input without owning it. App is the producer for "brushes";
 * this component only observes, which is what useShinyInputValue is for.
 * Reading it here rather than threading the value down is the honest version:
 * the label belongs to the answer, so it should come from what was sent, not
 * from whatever the pointer is doing now.
 */
function AskedAbout() {
  const { useShinyInputValue } = window.shinyreact;
  const asked = useShinyInputValue<Brushes | null>("brushes");

  const panels = asked ? (Object.keys(asked) as PanelId[]) : [];
  if (panels.length === 0) return null;

  return (
    <p className="asked">
      <span>Asked about</span>
      {panels.map((id) => (
        <span key={id} className="chip">
          {PANEL_LABELS[id]}
        </span>
      ))}
    </p>
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
