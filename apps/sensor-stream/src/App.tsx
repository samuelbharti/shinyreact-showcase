import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type uPlot from "uplot";

import { History, type Reading } from "@/history";
import Trace from "@/Trace";

type Channel = { name: string; unit: string; color: string };
type StreamMeta = { channels: Channel[]; minHz: number; maxHz: number };

const WINDOWS = [200, 600, 1500];

export default function App() {
  const {
    useShinyInitialized,
    useShinyInput,
    useShinyOutputValue,
    useShinyMessageHandler,
  } = window.shinyreact;

  const ready = useShinyInitialized();
  const meta = useShinyOutputValue<StreamMeta>("stream_meta");

  const [running, setRunning] = useShinyInput<boolean>("running", true);
  const [rateHz, setRateHz] = useShinyInput<number>("rate_hz", 10);
  const [window_, setWindow] = useState(WINDOWS[1]!);

  // The last value of each channel, for the readout. This is the only part
  // of a reading that goes through React state, and it is throttled below.
  const [latest, setLatest] = useState<number[]>([]);
  // Counts published once a second rather than per reading. They are read
  // off refs that the message handler increments, so they count messages
  // and not repaints.
  const [counts, setCounts] = useState({ received: 0, hz: 0, held: 0 });

  const channelCount = meta?.channels.length ?? 0;

  const history = useMemo(
    () => new History(channelCount, window_),
    // Rebuilt only when the panel itself changes. Resizing is handled below,
    // so that changing the window does not throw away the history.
    [channelCount],
  );

  useEffect(() => history.resize(window_), [history, window_]);

  const plots = useRef<(uPlot | null)[]>([]);
  const pending = useRef(false);
  const sinceLastSecond = useRef(0);
  const totalReceived = useRef(0);

  // Every reading lands here. This is the hot path, so it touches the plots
  // directly and schedules one repaint per animation frame. Calling setState
  // per reading would re-render the tree at the sample rate and still only
  // paint once a frame.
  useShinyMessageHandler("reading", (reading: Reading) => {
    history.push(reading);
    sinceLastSecond.current += 1;
    totalReceived.current += 1;

    // One repaint per animation frame, however many readings arrived in it.
    // The browser cannot show more than that, and pushing each one through
    // React state would re-render the tree at the sample rate to no effect.
    if (pending.current) return;
    pending.current = true;
    requestAnimationFrame(() => {
      pending.current = false;
      for (let i = 0; i < plots.current.length; i += 1) {
        plots.current[i]?.setData(history.dataFor(i));
      }
      setLatest([...reading.values]);
    });
  });

  // Published once a second. The rate is what actually arrived rather than
  // what was asked for, and the message count is messages rather than
  // repaints, which are not the same number when the browser throttles
  // animation frames.
  useEffect(() => {
    const timer = window.setInterval(() => {
      setCounts({
        received: totalReceived.current,
        hz: sinceLastSecond.current,
        held: history.length,
      });
      sinceLastSecond.current = 0;
    }, 1000);
    return () => window.clearInterval(timer);
  }, [history]);

  const registerPlot = useCallback((index: number, plot: uPlot | null) => {
    plots.current[index] = plot;
  }, []);

  const clear = useCallback(() => {
    history.clear();
    for (let i = 0; i < plots.current.length; i += 1) {
      plots.current[i]?.setData(history.dataFor(i));
    }
    setLatest([]);
    setCounts((seen) => ({ ...seen, held: 0 }));
  }, [history]);

  if (!ready) return null;

  return (
    <main className="app">
      <header>
        <h1>Sensor stream</h1>
        <p className="claim">
          The server pushes one reading. The client appends it. Nothing
          re-sends the series, and nothing redraws a plot from scratch.
        </p>
      </header>

      <div className="toolbar">
        <button
          type="button"
          className={running ? "toggle running" : "toggle"}
          onClick={() => setRunning(!running)}
        >
          {running ? "Pause" : "Run"}
        </button>

        <label>
          Rate
          <input
            type="range"
            min={meta?.minHz ?? 1}
            max={meta?.maxHz ?? 30}
            value={rateHz}
            onChange={(event) => setRateHz(Number(event.target.value))}
          />
          <span className="value">{rateHz} Hz</span>
        </label>

        <label>
          Window
          <select
            value={window_}
            onChange={(event) => setWindow(Number(event.target.value))}
          >
            {WINDOWS.map((size) => (
              <option key={size} value={size}>
                {size} points
              </option>
            ))}
          </select>
        </label>

        <button type="button" className="ghost" onClick={clear}>
          Clear
        </button>

        <div className="meters">
          <Meter value={counts.hz} label="readings per second" />
          <Meter value={counts.received.toLocaleString()} label="messages received" />
          <Meter value={counts.held.toLocaleString()} label="points held" />
        </div>
      </div>

      {meta ? (
        <div className="traces">
          {meta.channels.map((channel, index) => (
            <Trace
              key={channel.name}
              label={channel.name}
              unit={channel.unit}
              color={channel.color}
              onReady={(plot) => registerPlot(index, plot)}
              onGone={() => registerPlot(index, null)}
            />
          ))}
        </div>
      ) : (
        <p className="skeleton">Waiting for the channel list...</p>
      )}

      {meta && latest.length === meta.channels.length ? (
        <ul className="readout">
          {meta.channels.map((channel, index) => (
            <li key={channel.name}>
              <span className="swatch" style={{ background: channel.color }} />
              <span className="label">{channel.name}</span>
              <span className="number">
                {latest[index]!.toFixed(2)}
                <span className="unit">{channel.unit}</span>
              </span>
            </li>
          ))}
        </ul>
      ) : null}
    </main>
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
