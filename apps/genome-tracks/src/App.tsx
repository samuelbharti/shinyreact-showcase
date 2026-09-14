import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import Browser from "@/Browser";
import {
  type ChromosomePayload,
  type View,
  clampView,
  decodeChromosome,
  formatLocus,
  formatWidth,
} from "@/decode";

type ChromosomeMeta = { name: string; span: number; genes: number; bins: number };
type GenomeMeta = { chromosomes: ChromosomeMeta[]; biotypes: string[] };

type GeneInfo = {
  index: number;
  name: string;
  chromosome: string;
  start: number;
  end: number;
  length: number;
  strand: string;
  biotype: string;
  meanDepth: number;
  neighboursWithinMb: number;
};

const BIOTYPE_COLORS = ["#4c78a8", "#54a24b", "#9c9c9c", "#b279a2"];

export default function App() {
  const {
    useShinyInitialized,
    useShinyInput,
    useShinyOutputValue,
    useShinyOutputStatus,
  } = window.shinyreact;

  const ready = useShinyInitialized();
  const meta = useShinyOutputValue<GenomeMeta>("genome_meta");

  const [chromosomeName, setChromosomeName] = useShinyInput<string>("chromosome", "chr1");
  const [, setGeneClick] = useShinyInput<number>("gene_click", -1);

  const payload = useShinyOutputValue<ChromosomePayload>("chromosome_data");
  const payloadStatus = useShinyOutputStatus("chromosome_data");
  const geneInfo = useShinyOutputValue<GeneInfo>("gene_info");

  const [view, setView] = useState<View | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [drawStats, setDrawStats] = useState({ visible: 0, ms: 0 });

  // Decoded once when a chromosome arrives, not on every pan.
  const chromosome = useMemo(
    () => (payload ? decodeChromosome(payload) : null),
    [payload],
  );

  // The longest gene, so the search for what is in view knows how far back to
  // look. Computed once per chromosome rather than per frame.
  const maxGeneLength = useMemo(() => {
    if (!chromosome) return 0;
    let longest = 0;
    for (let i = 0; i < chromosome.length.length; i += 1) {
      if (chromosome.length[i]! > longest) longest = chromosome.length[i]!;
    }
    return longest;
  }, [chromosome]);

  // A new chromosome starts at a readable width rather than the whole thing,
  // where every gene is under a pixel.
  useEffect(() => {
    if (!chromosome) return;
    setSelected(null);
    setView(clampView({ start: 0, end: Math.min(4_000_000, chromosome.span) }, chromosome.span));
  }, [chromosome]);

  // Round trips, which is the number that makes the claim checkable. It
  // counts answers from the server, so panning and zooming never move it.
  const roundTrips = useRoundTrips([payload, geneInfo, meta]);

  const handlePick = useCallback(
    (index: number | null) => {
      setSelected(index);
      setGeneClick(index === null ? -1 : index);
    },
    [setGeneClick],
  );

  const handleDraw = useCallback((visible: number, ms: number) => {
    setDrawStats((previous) =>
      // Only publish a real change, or every frame re-renders the tree.
      previous.visible === visible && Math.abs(previous.ms - ms) < 0.35
        ? previous
        : { visible, ms },
    );
  }, []);

  if (!ready) return null;

  return (
    <main className="app">
      <header>
        <h1>Genome tracks</h1>
        <p className="claim">
          Drag to pan, scroll to zoom. The server sent this chromosome once
          and hears nothing until you pick a gene.
        </p>
      </header>

      <div className="toolbar">
        <label>
          Chromosome
          <select
            value={chromosomeName}
            onChange={(event) => setChromosomeName(event.target.value)}
          >
            {(meta?.chromosomes ?? []).map((chrom) => (
              <option key={chrom.name} value={chrom.name}>
                {chrom.name} ({chrom.genes.toLocaleString()} genes)
              </option>
            ))}
          </select>
        </label>

        <code className="locus">
          {chromosome && view ? formatLocus(chromosome.name, view) : "loading"}
        </code>
        <span className="width">{view ? formatWidth(view.end - view.start) : ""}</span>

        <div className="meters">
          <Meter value={roundTrips} label="server round trips" />
          <Meter value={drawStats.visible.toLocaleString()} label="genes in view" />
          <Meter value={drawStats.ms.toFixed(1) + " ms"} label="last frame" />
        </div>
      </div>

      {chromosome && view ? (
        <div className={payloadStatus === "recalculating" ? "stage recalculating" : "stage"}>
          <Browser
            chromosome={chromosome}
            view={view}
            maxGeneLength={maxGeneLength}
            selected={selected}
            onView={setView}
            onPick={handlePick}
            onDraw={handleDraw}
          />
        </div>
      ) : (
        <p className="skeleton">Loading the chromosome...</p>
      )}

      <div className="below">
        <ul className="legend">
          {(meta?.biotypes ?? []).map((name, index) => (
            <li key={name}>
              <span className="swatch" style={{ background: BIOTYPE_COLORS[index] }} />
              {name}
            </li>
          ))}
        </ul>

        <aside className="details">
          {geneInfo && selected !== null ? (
            <>
              <h2>{geneInfo.name}</h2>
              <dl>
                <dt>Position</dt>
                <dd>
                  {geneInfo.chromosome}:{geneInfo.start.toLocaleString()}-
                  {geneInfo.end.toLocaleString()} ({geneInfo.strand})
                </dd>
                <dt>Length</dt>
                <dd>{formatWidth(geneInfo.length)}</dd>
                <dt>Biotype</dt>
                <dd>{geneInfo.biotype}</dd>
                <dt>Mean read depth</dt>
                <dd>{geneInfo.meanDepth}</dd>
                <dt>Genes within 1 Mb</dt>
                <dd>{geneInfo.neighboursWithinMb}</dd>
              </dl>
              <p className="note">
                Read depth and the neighbour count need the whole chromosome,
                so they came from the server. That click is the only thing
                here that did.
              </p>
            </>
          ) : (
            <p className="hint">
              Click a gene for details. Panning and zooming stay in the
              browser, so the round trip counter does not move.
            </p>
          )}
        </aside>
      </div>
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

/**
 * How many answers have come back from the server.
 *
 * Counts a value that changed identity, not a render. The hooks hand back
 * the same object until the server sends a new one, and an output that has
 * never arrived is not a round trip.
 */
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
