import { useCallback, useState } from "react";

import Structure, { type ResidueRow } from "@/Structure";

type StructurePayload = {
  pdbId: string;
  title: string;
  text: string;
  chains: string[];
  colorModes: string[];
  residueCount: number;
  atomCount: number;
  hetatmCount: number;
  helices: number;
  sheets: number;
  resolution: number | null;
  sequence: string;
  residues: ResidueRow[];
};

type Fold = {
  residues: number;
  helix: number;
  sheet: number;
  coil: number;
  helixShare: number;
  sheetShare: number;
  coilShare: number;
  minB: number;
  maxB: number;
  meanB: number;
};

type ResidueDetail = ResidueRow & { bPercentile: number };

export default function App() {
  const {
    useShinyInitialized,
    useShinyInput,
    useShinyOutputValue,
    useShinyOutputStatus,
    ShinyOutput,
  } = window.shinyreact;

  const ready = useShinyInitialized();
  const structure = useShinyOutputValue<StructurePayload>("structure");
  const fold = useShinyOutputValue<Fold>("fold");
  const residue = useShinyOutputValue<ResidueDetail>("residue");
  const residueStatus = useShinyOutputStatus("residue");

  // React owns this one. The usual way to build a control here.
  const [colorMode, setColorMode] = useShinyInput<string>("color_mode", "spectrum");

  // A real Shiny selectInput owns this one. The server renders it and the
  // client hosts it, so the value reaches the server as a classic Shiny
  // input and comes back as an output.
  //
  // It has to come back that way. useShinyInputValue only sees ids that a
  // shinyreact producer registered, and a hosted widget is not one, so
  // reading input$style from the client returns undefined however you ask.
  // The round trip is the real difference between a hosted widget and React
  // state, and the round trip counter above shows it.
  const style = useShinyOutputValue<string>("active_style") ?? "cartoon";

  const [picked, setPicked] = useShinyInput<number>("residue_click", -1);
  const [loadMs, setLoadMs] = useState<number | null>(null);

  const handlePick = useCallback(
    (number: number | null) => setPicked(number ?? -1),
    [setPicked],
  );

  if (!ready) return null;

  return (
    <main className="app">
      <header>
        <h1>Protein view</h1>
        <p className="claim">
          {structure ? structure.pdbId : "1UBQ"}
          {structure?.resolution ? ` at ${structure.resolution} A` : ""}, drawn
          with 3Dmol.js. That library has no Shiny binding, and it did not need
          one: it is an npm install, not an htmlwidget package.
        </p>
      </header>

      <div className="toolbar">
        {/* Two controls, built two different ways, doing comparable jobs. */}
        <label className="react-control">
          <span className="who">React state</span>
          Colour by
          <select
            value={colorMode}
            onChange={(event) => setColorMode(event.target.value)}
          >
            {(structure?.colorModes ?? []).map((mode) => (
              <option key={mode} value={mode}>
                {mode}
              </option>
            ))}
          </select>
        </label>

        <div className="shiny-control">
          <span className="who">Shiny widget</span>
          <span className="label">Representation</span>
          {/* A real selectInput, rendered by the server. Shiny's html output
              binding loads its JavaScript and runs the input initialization
              pass, which is what makes input$style behave like a classic
              Shiny input. */}
          <ShinyOutput id="style_widget" className="shiny-html-output" />
        </div>

        <div className="meters">
          <Meter value={structure?.atomCount.toLocaleString("en-US") ?? "--"} label="atoms" />
          <Meter value={structure?.residueCount ?? "--"} label="residues" />
          <Meter
            value={loadMs === null ? "--" : loadMs.toFixed(0) + " ms"}
            label="parse and first draw"
          />
        </div>
      </div>

      <div className="stage">
        {structure ? (
          <Structure
            text={structure.text}
            residues={structure.residues}
            style={style}
            colorMode={colorMode}
            selected={picked >= 0 ? picked : null}
            onPickResidue={handlePick}
            onReady={setLoadMs}
          />
        ) : (
          <p className="skeleton">Loading the structure...</p>
        )}
        <p className="hint">Drag to orbit, scroll to zoom, click an atom.</p>
      </div>

      <div className="below">
        <section className="fold">
          <h2>Fold</h2>
          {fold ? (
            <>
              <div className="bars">
                <Bar label="helix" share={fold.helixShare} n={fold.helix} kind="helix" />
                <Bar label="sheet" share={fold.sheetShare} n={fold.sheet} kind="sheet" />
                <Bar label="coil" share={fold.coilShare} n={fold.coil} kind="coil" />
              </div>
              <dl>
                <dt>Chains</dt>
                <dd>{structure?.chains.join(", ")}</dd>
                <dt>Helices / sheets</dt>
                <dd>
                  {structure?.helices} / {structure?.sheets}
                </dd>
                <dt>Non protein atoms</dt>
                <dd>{structure?.hetatmCount}</dd>
                <dt>Temperature factor</dt>
                <dd>
                  {fold.minB} to {fold.maxB}, mean {fold.meanB}
                </dd>
              </dl>
            </>
          ) : (
            <p className="skeleton">...</p>
          )}

          {structure ? (
            <>
              <h3>Sequence</h3>
              <p className="sequence">{structure.sequence}</p>
            </>
          ) : null}
        </section>

        <aside className={residueStatus === "recalculating" ? "panel recalculating" : "panel"}>
          {residue && picked >= 0 ? (
            <>
              <h2>
                {residue.code} {residue.number}
                <span className="chain">chain {residue.chain}</span>
              </h2>
              <dl>
                <dt>Secondary structure</dt>
                <dd>{residue.structure}</dd>
                <dt>Temperature factor</dt>
                <dd>{residue.meanB}</dd>
                <dt>Rank in structure</dt>
                <dd>{residue.bPercentile}th percentile</dd>
                <dt>Hydrophobicity</dt>
                <dd>{residue.hydrophobicity}</dd>
              </dl>
              <p className="note">
                3Dmol told the client which residue was clicked. Where that
                residue sits against every other one needed the whole
                structure, so the server answered it.
              </p>
            </>
          ) : (
            <p className="hint">
              Click an atom for its residue. Orbiting and zooming are the
              viewer's own work and never reach the server.
            </p>
          )}
        </aside>
      </div>
    </main>
  );
}

function Bar({
  label,
  share,
  n,
  kind,
}: {
  label: string;
  share: number;
  n: number;
  kind: string;
}) {
  return (
    <div className="bar">
      <span className="bar-label">{label}</span>
      <span className="bar-track">
        <span className={"bar-fill " + kind} style={{ width: share * 100 + "%" }} />
      </span>
      <span className="bar-value">
        {n} ({Math.round(share * 100)}%)
      </span>
    </div>
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
