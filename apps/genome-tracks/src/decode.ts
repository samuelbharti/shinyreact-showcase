// Decoding a chromosome, and the arithmetic that turns a view into pixels.
//
// Everything here runs on the client, every frame, which is the point of the
// app: the server sent the chromosome once and has nothing more to do.

export type ChromosomePayload = {
  name: string;
  span: number;
  genes: number;
  bins: number;
  biotypes: string[];
  start: string;
  length100: string;
  strand: string;
  biotype: string;
  coverage: string;
};

export type Chromosome = {
  name: string;
  span: number;
  biotypes: string[];
  start: Uint32Array;
  length: Uint32Array;
  strand: Uint8Array;
  biotype: Uint8Array;
  coverage: Uint16Array;
};

export type View = { start: number; end: number };

const BIOTYPE_PREFIX = ["PCG", "LNC", "PSG", "MIR"];

function bytes(encoded: string): Uint8Array {
  const binary = atob(encoded);
  const out = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) out[i] = binary.charCodeAt(i);
  return out;
}

export function decodeChromosome(payload: ChromosomePayload): Chromosome {
  const startBytes = bytes(payload.start);
  const lengthBytes = bytes(payload.length100);
  const coverageBytes = bytes(payload.coverage);

  const length100 = new Uint16Array(
    lengthBytes.buffer,
    lengthBytes.byteOffset,
    lengthBytes.byteLength / 2,
  );
  // Lengths are stored in hundreds of bases, which halves the block and
  // costs nothing: a gene boundary is never rendered to that precision.
  const length = new Uint32Array(length100.length);
  for (let i = 0; i < length100.length; i += 1) length[i] = length100[i]! * 100;

  return {
    name: payload.name,
    span: payload.span,
    biotypes: payload.biotypes,
    start: new Uint32Array(
      startBytes.buffer,
      startBytes.byteOffset,
      startBytes.byteLength / 4,
    ),
    length,
    strand: bytes(payload.strand),
    biotype: bytes(payload.biotype),
    coverage: new Uint16Array(
      coverageBytes.buffer,
      coverageBytes.byteOffset,
      coverageBytes.byteLength / 2,
    ),
  };
}

/** The same name the server builds, from the same two numbers. */
export function geneName(biotype: number, index: number): string {
  const prefix = BIOTYPE_PREFIX[biotype] ?? "GEN";
  return `${prefix}${String(index).padStart(5, "0")}`;
}

/**
 * The genes overlapping a view.
 *
 * Starts are sorted, so the first candidate is a binary search. Genes are
 * scanned back from there by the widest gene on the chromosome, because a
 * long gene can start well before the view and still reach into it.
 */
export function genesInView(
  chromosome: Chromosome,
  view: View,
  maxLength: number,
): number[] {
  const first = lowerBound(chromosome.start, Math.max(0, view.start - maxLength));
  const out: number[] = [];
  for (let i = first; i < chromosome.start.length; i += 1) {
    const start = chromosome.start[i]!;
    if (start > view.end) break;
    if (start + chromosome.length[i]! >= view.start) out.push(i);
  }
  return out;
}

/** The first index whose value is at or above `target`. */
export function lowerBound(values: Uint32Array, target: number): number {
  let low = 0;
  let high = values.length;
  while (low < high) {
    const mid = (low + high) >> 1;
    if (values[mid]! < target) low = mid + 1;
    else high = mid;
  }
  return low;
}

/** Keep a view inside the chromosome, and no narrower than `minBases`. */
export function clampView(view: View, span: number, minBases = 400): View {
  let width = Math.min(Math.max(view.end - view.start, minBases), span);
  if (!Number.isFinite(width) || width <= 0) width = span;

  let start = view.start;
  if (start < 0) start = 0;
  if (start + width > span) start = span - width;
  return { start: Math.round(start), end: Math.round(start + width) };
}

/** Zoom about a point, given as a fraction across the view. */
export function zoomView(
  view: View,
  factor: number,
  anchorFraction: number,
  span: number,
): View {
  const width = view.end - view.start;
  const anchor = view.start + width * anchorFraction;
  const nextWidth = width * factor;
  return clampView(
    { start: anchor - nextWidth * anchorFraction, end: anchor + nextWidth * (1 - anchorFraction) },
    span,
  );
}

/** "chr1:1,234,567-1,240,000" */
export function formatLocus(name: string, view: View): string {
  const n = (value: number) => Math.round(value).toLocaleString("en-US");
  return `${name}:${n(view.start)}-${n(view.end)}`;
}

/** A readable width, for the zoom readout. */
export function formatWidth(bases: number): string {
  if (bases >= 1e6) return `${(bases / 1e6).toFixed(2)} Mb`;
  if (bases >= 1e3) return `${(bases / 1e3).toFixed(1)} kb`;
  return `${Math.round(bases)} b`;
}
