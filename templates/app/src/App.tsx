type Histogram = { breaks: number[]; counts: number[] };

export default function App() {
  // Read the hooks off the global here, inside the component, rather than at
  // module scope. Two reasons: the module then imports cleanly before
  // shinyreact has installed the global, which is what makes this component
  // testable, and the data flow stays visible at the call site.
  const {
    useShinyInitialized,
    useShinyInput,
    useShinyOutputValue,
    useShinyOutputStatus,
  } = window.shinyreact;

  // Gate the first paint so the UI does not flash empty defaults while the
  // websocket is still connecting.
  const ready = useShinyInitialized();
  const [bins, setBins] = useShinyInput<number>("bins", 24);
  const hist = useShinyOutputValue<Histogram>("histogram");
  const status = useShinyOutputStatus("histogram");

  if (!ready) return null;

  return (
    <main className="app">
      <header>
        <h1>APP_TITLE</h1>
        <p className="claim">Replace this with the claim from catalog.yml.</p>
      </header>

      <label className="control">
        Bins: <strong>{bins}</strong>
        <input
          type="range"
          min={4}
          max={60}
          value={bins}
          onChange={(e) => setBins(Number(e.target.value))}
        />
      </label>

      {/* "pending" is the only state with no data yet. On "recalculating" the
          previous result is still valid, so keep the chart mounted and dim it
          rather than swapping in a skeleton and tearing down the DOM. */}
      {hist === undefined ? (
        <p className="skeleton">Waiting for the server...</p>
      ) : (
        <Bars
          hist={hist}
          dimmed={status === "recalculating"}
        />
      )}
    </main>
  );
}

function Bars({ hist, dimmed }: { hist: Histogram; dimmed: boolean }) {
  const width = 640;
  const height = 240;
  const max = Math.max(1, ...hist.counts);
  const barWidth = width / Math.max(1, hist.counts.length);

  return (
    <svg
      className={dimmed ? "chart recalculating" : "chart"}
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-label={`Histogram with ${hist.counts.length} bins`}
    >
      {hist.counts.map((count, i) => {
        const barHeight = (count / max) * (height - 8);
        return (
          <rect
            key={i}
            x={i * barWidth + 1}
            y={height - barHeight}
            width={Math.max(1, barWidth - 2)}
            height={barHeight}
          />
        );
      })}
    </svg>
  );
}
