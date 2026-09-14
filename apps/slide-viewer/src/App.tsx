import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { downsampleAt, type Region, type Slide } from "@/tissue";
import Viewer from "@/Viewer";

type RegionDetail = {
  index: number;
  label: string;
  confidence: number;
  x: number;
  y: number;
  width: number;
  height: number;
  areaMm2: number;
  nuclei: number;
  nucleiPerMm2: number;
  mitoses: number;
  meanNuclearArea: number;
  stain: string;
};

export default function App() {
  const {
    useShinyInitialized,
    useShinyInput,
    useShinyOutputValue,
    useShinyOutputStatus,
  } = window.shinyreact;

  const ready = useShinyInitialized();
  const slide = useShinyOutputValue<Slide>("slide");
  const detail = useShinyOutputValue<RegionDetail>("region_detail");
  const detailStatus = useShinyOutputStatus("region_detail");

  const [picked, setPicked] = useShinyInput<number>("picked_region", -1);
  const [goTo, setGoTo] = useState<Region | null>(null);
  const [view, setView] = useState({ level: 0, tiles: 0 });

  const roundTrips = useRoundTrips([slide, detail]);

  // Once the slide arrives, start at the deepest level so the readout is not
  // zero before the first animation settles.
  useEffect(() => {
    if (slide) setView({ level: 8, tiles: 0 });
  }, [slide]);

  const handleLevel = useCallback((level: number, tiles: number) => {
    setView((previous) =>
      previous.level === level && previous.tiles === tiles
        ? previous
        : { level, tiles },
    );
  }, []);

  const handlePickRegion = useCallback(
    (index: number) => {
      setPicked(index);
      const region = slide?.regions.find((r) => r.index === index) ?? null;
      setGoTo(region);
    },
    [setPicked, slide],
  );

  // The scale a pathologist reads first: how much of the slide one screen
  // pixel covers right now.
  const scale = useMemo(() => {
    if (!slide) return null;
    const downsample = downsampleAt(view.level, slide.maxLevel);
    return {
      downsample,
      micronsPerPixel: slide.micronsPerPixel * downsample,
      magnification: slide.magnification / downsample,
    };
  }, [slide, view.level]);

  if (!ready) return null;

  return (
    <main className="app">
      <header>
        <h1>Slide viewer</h1>
        <p className="claim">
          {slide ? slide.gigapixels : "6.4"} gigapixels, described by the
          server in about two kilobytes and drawn by the browser one tile at a
          time. Scroll to zoom from the whole slide down to single nuclei.
        </p>
      </header>

      <div className="toolbar">
        <span className="mag">
          {scale ? formatMagnification(scale.magnification) : "--"}
        </span>
        <span className="scale">
          {scale ? formatMicrons(scale.micronsPerPixel) + " per pixel" : ""}
        </span>

        <div className="meters">
          <Meter value={roundTrips} label="server round trips" />
          <Meter value={view.tiles.toLocaleString("en-US")} label="tiles drawn" />
          <Meter value={"L" + view.level} label="pyramid level" />
        </div>
      </div>

      <div className="stage">
        {slide ? (
          <Viewer
            slide={slide}
            goTo={goTo}
            onLevel={handleLevel}
            onPickRegion={handlePickRegion}
          />
        ) : (
          <p className="skeleton">Loading the slide description...</p>
        )}
      </div>

      <div className="below">
        <section className="findings">
          <h2>Flagged regions</h2>
          <ul>
            {(slide?.regions ?? []).map((region) => (
              <li key={region.index}>
                <button
                  type="button"
                  className={picked === region.index ? "chosen" : ""}
                  onClick={() => handlePickRegion(region.index)}
                >
                  <span className="label">{region.label}</span>
                  <span className="at">
                    {region.x.toLocaleString("en-US")},{" "}
                    {region.y.toLocaleString("en-US")}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </section>

        <aside className={detailStatus === "recalculating" ? "panel recalculating" : "panel"}>
          {detail && picked >= 0 ? (
            <>
              <h2>{detail.label}</h2>
              <p className="confidence">
                confidence {(detail.confidence * 100).toFixed(0)}%, {detail.stain}
              </p>
              <dl>
                <dt>Area</dt>
                <dd>{detail.areaMm2.toFixed(3)} mm2</dd>
                <dt>Nuclei</dt>
                <dd>{detail.nuclei.toLocaleString("en-US")}</dd>
                <dt>Density</dt>
                <dd>{detail.nucleiPerMm2.toLocaleString("en-US")} per mm2</dd>
                <dt>Mitoses</dt>
                <dd>{detail.mitoses}</dd>
                <dt>Mean nuclear area</dt>
                <dd>{detail.meanNuclearArea} um2</dd>
              </dl>
              <p className="note">
                The marker and its box came with the slide description. None of
                these measurements did, which is why clicking one is the only
                thing here that reaches the server.
              </p>
            </>
          ) : (
            <p className="hint">
              Pick a flagged region, or click a marker on the slide. Zooming
              and panning draw new tiles in the browser and never ask the
              server for anything.
            </p>
          )}
        </aside>
      </div>
    </main>
  );
}

function formatMagnification(value: number): string {
  if (value >= 1) return value.toFixed(value >= 10 ? 0 : 1) + "x";
  return value.toFixed(2) + "x";
}

function formatMicrons(value: number): string {
  if (value >= 1000) return (value / 1000).toFixed(2) + " mm";
  if (value >= 1) return value.toFixed(1) + " um";
  return value.toFixed(2) + " um";
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
