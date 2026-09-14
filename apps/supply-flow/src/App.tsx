import { useCallback, useEffect, useRef, useState } from "react";

import Diagram, { STAGE_COLOUR, TRANSITION_MS } from "@/Diagram";
import { share, volume, type Catalogue, type Flows } from "@/sankey";

export default function App() {
  const { useShinyInitialized, useShinyInput, useShinyOutputValue, useShinyOutputStatus } =
    window.shinyreact;

  const ready = useShinyInitialized();
  const catalogue = useShinyOutputValue<Catalogue>("catalogue");
  const flows = useShinyOutputValue<Flows>("flows");
  const flowStatus = useShinyOutputStatus("flows");

  // Both are bookmarked. The server writes them into the query string when
  // either changes, so the address bar always describes what is on screen and
  // a link to it opens the same view.
  const [scenario, setScenario] = useShinyInput<string>("scenario", "baseline");
  const [focus, setFocus] = useShinyInput<string | null>("focus", null);

  const roundTrips = useRoundTrips([catalogue, flows]);
  const [transitions, setTransitions] = useState(0);
  const mounts = useRef(0);

  const handleSettled = useCallback(() => setTransitions((seen) => seen + 1), []);
  const handleMounted = useCallback(() => {
    mounts.current += 1;
  }, []);

  if (!ready) return null;

  const chosen = catalogue?.scenarios.find((option) => option.slug === scenario);

  return (
    <main className="app">
      <header>
        <h1>Supply flow</h1>
        <p className="claim">
          Four stages, fourteen places, and one week of volume. Pick a
          disruption and the network reroutes around it. The diagram does not
          blink while that happens: every band keeps its identity and moves to
          where it belongs, so you can watch the volume go somewhere else
          instead of being handed a different picture.
        </p>
      </header>

      <div className="toolbar">
        <Meter value={roundTrips} label="server round trips" tone="server" />
        <Meter value={transitions} label="transitions animated here" />
        <Meter value={mounts.current || 1} label="times the diagram was built" />
        <span className="spacer" />
        <span className="hint inline">
          The address bar follows. Copy it and you share this exact view.
        </span>
      </div>

      {catalogue && flows ? (
        <>
          <div className="scenarios" role="group" aria-label="Scenario">
            {catalogue.scenarios.map((option) => (
              <button
                key={option.slug}
                type="button"
                data-scenario={option.slug}
                className={option.slug === scenario ? "scenario on" : "scenario"}
                aria-pressed={option.slug === scenario}
                onClick={() => setScenario(option.slug)}
              >
                <b>{option.title}</b>
                <span>{option.note}</span>
              </button>
            ))}
          </div>

          <ul className="totals">
            <Total label="Asked for" value={volume(flows.asked)} />
            <Total label="Delivered" value={volume(flows.delivered)} />
            <Total
              label="Short"
              value={volume(flows.shortfall)}
              tone={flows.shortfall > 0 ? "bad" : "good"}
            />
            <Total
              label="Demand served"
              value={share(flows.servedShare)}
              tone={flows.servedShare >= 0.999 ? "good" : "bad"}
            />
          </ul>

          <div className={flowStatus === "recalculating" ? "stage waiting" : "stage"}>
            <Diagram
              flows={flows}
              focus={focus}
              onFocus={setFocus}
              onSettled={handleSettled}
              onMounted={handleMounted}
            />
          </div>

          <p className="legend">
            {(["supplier", "factory", "centre", "market"] as const).map((stage) => (
              <span key={stage} className="key">
                <span className="swatch" style={{ background: STAGE_COLOUR[stage] }} />
                {stage === "centre" ? "distribution" : stage}
              </span>
            ))}
            <span className="spacer" />
            {focus ? (
              <button type="button" className="clear" onClick={() => setFocus(null)}>
                Clear focus on {focus}
              </button>
            ) : (
              <span className="hint inline">Click a block to follow it both ways.</span>
            )}
          </p>

          {flows.shortfall > 0 ? (
            <p className="note">
              {volume(flows.shortfall)} of demand cannot be met.{" "}
              {describeShortfall(flows)} A block with a darker edge is running
              at its ceiling.
            </p>
          ) : (
            <p className="note">
              Every market is served. Rotterdam is running at its ceiling even
              so, which is why closing it costs more than its own share.
            </p>
          )}

          <p className="hint">
            Each change is one round trip, because rerouting a network is a
            real computation and belongs on the server. The{" "}
            {Math.round(TRANSITION_MS)} milliseconds after it are not: that is
            the browser moving what it already has.
            {chosen ? " Showing: " + chosen.title + "." : ""}
          </p>
        </>
      ) : (
        <p className="skeleton">Loading the network...</p>
      )}
    </main>
  );
}

function describeShortfall(flows: Flows): string {
  const { suppliers, factories, centres } = flows.shortAt;
  if (suppliers > 0) return "The suppliers cannot ship it.";
  if (factories > 0) return "The factories cannot build it.";
  if (centres > 0) return "The distribution centres cannot move it.";
  return "";
}

function Total({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone?: "good" | "bad";
}) {
  return (
    <li className={tone ? "total " + tone : "total"}>
      <span className="total-label">{label}</span>
      <span className="total-value">{value}</span>
    </li>
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
