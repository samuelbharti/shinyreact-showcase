// Decoding the star catalogue, and the work every brush move does.
//
// Everything here is a plain function over typed arrays. No React, no Shiny.
// That is what makes the claim testable: the selection and the histograms are
// the whole cost of a pointer move, and a test can measure them.

export type Scales = {
  colour: number;
  absolute: number;
  longitude: number;
  latitude: number;
  logDistance: number;
  apparent: number;
};

export type FieldName = keyof Scales;

export type CataloguePayload = {
  stars: number;
  scales: Scales;
  colour: string;
  absolute: string;
  longitude: string;
  latitude: string;
  logDistance: string;
  apparent: string;
  population: string;
};

export type Stars = {
  count: number;
  colour: Float64Array;
  absolute: Float64Array;
  longitude: Float64Array;
  latitude: Float64Array;
  logDistance: Float64Array;
  apparent: Float64Array;
  population: Uint8Array;
};

export type Rect = { x0: number; x1: number; y0?: number; y1?: number };

export type PanelId = "hr" | "sky" | "distance" | "apparent";

export type Brushes = Partial<Record<PanelId, Rect>>;

export type Range = { min: number; max: number };

export type Summary = {
  stars: number;
  populations: string[];
  populationCounts: number[];
  apparentLimit: number;
  ranges: Record<FieldName, Range>;
  scales: Scales;
};

export type Fit = {
  slope: number;
  intercept: number;
  scatter: number;
  correlation: number;
};

export type ServerSummary = {
  stars: number;
  populations: string[];
  populationCounts: number[];
  medianParsecs?: number;
  colourRange?: [number, number];
  fit?: Fit;
};

/**
 * Which packed field each panel's axes read.
 *
 * The server holds the same map. Both sides have to agree, or the line the
 * server fits would belong to a different selection from the one on screen.
 */
export const PANEL_FIELDS: Record<
  PanelId,
  { x: FieldName; y: FieldName | null }
> = {
  hr: { x: "colour", y: "absolute" },
  sky: { x: "longitude", y: "latitude" },
  distance: { x: "logDistance", y: null },
  apparent: { x: "apparent", y: null },
};

export const PANEL_IDS: PanelId[] = ["hr", "sky", "distance", "apparent"];

function bytes(encoded: string): Uint8Array {
  const binary = atob(encoded);
  const out = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) out[i] = binary.charCodeAt(i);
  return out;
}

/**
 * One packed int16 field, divided back into the units the server used.
 *
 * Float64, not Float32, and the extra megabyte is the price of the claim.
 * The server divides these same integers in double precision, so a star
 * whose colour is exactly on a brush edge has to land on the same side in
 * both. At single precision 1919 / 1000 is 1.9190000295639038, the two
 * comparisons disagree, and the panel and the server report counts one
 * apart for a reason nobody can see.
 */
function unpack(encoded: string, scale: number): Float64Array {
  const raw = bytes(encoded);
  const ints = new Int16Array(raw.buffer, raw.byteOffset, raw.byteLength / 2);
  const out = new Float64Array(ints.length);
  for (let i = 0; i < ints.length; i += 1) out[i] = ints[i]! / scale;
  return out;
}

export function decodeStars(payload: CataloguePayload): Stars {
  const { scales } = payload;
  return {
    count: payload.stars,
    colour: unpack(payload.colour, scales.colour),
    absolute: unpack(payload.absolute, scales.absolute),
    longitude: unpack(payload.longitude, scales.longitude),
    latitude: unpack(payload.latitude, scales.latitude),
    logDistance: unpack(payload.logDistance, scales.logDistance),
    apparent: unpack(payload.apparent, scales.apparent),
    population: bytes(payload.population),
  };
}

export function fieldOf(stars: Stars, name: FieldName): Float64Array {
  return stars[name];
}

/**
 * Mark every star that satisfies all four brushes at once.
 *
 * Writes into a mask the caller owns rather than allocating one, because
 * this runs on every pointer move and a fresh 40,000 byte array per frame is
 * the kind of garbage that turns a smooth drag into a stuttering one.
 *
 * Returns how many stars survived.
 */
export function selectInto(
  stars: Stars,
  brushes: Brushes,
  mask: Uint8Array,
): number {
  const active = PANEL_IDS.filter((id) => brushes[id]);

  if (active.length === 0) {
    mask.fill(1);
    return stars.count;
  }

  mask.fill(1);
  for (const id of active) {
    const rect = brushes[id]!;
    const fields = PANEL_FIELDS[id];

    const x = fieldOf(stars, fields.x);
    for (let i = 0; i < stars.count; i += 1) {
      if (mask[i] === 0) continue;
      const value = x[i]!;
      if (value < rect.x0 || value > rect.x1) mask[i] = 0;
    }

    if (fields.y !== null && rect.y0 !== undefined && rect.y1 !== undefined) {
      const y = fieldOf(stars, fields.y);
      for (let i = 0; i < stars.count; i += 1) {
        if (mask[i] === 0) continue;
        const value = y[i]!;
        if (value < rect.y0 || value > rect.y1) mask[i] = 0;
      }
    }
  }

  let count = 0;
  for (let i = 0; i < stars.count; i += 1) count += mask[i]!;
  return count;
}

export type Bins = {
  counts: Float64Array;
  min: number;
  max: number;
  width: number;
};

export function makeBins(range: Range, binCount: number): Bins {
  return {
    counts: new Float64Array(binCount),
    min: range.min,
    max: range.max,
    width: (range.max - range.min) / binCount,
  };
}

/**
 * Count one field into bins, optionally only where the mask is set.
 *
 * Pass no mask for the grey background histogram, which is computed once.
 * Pass one for the selected overlay, which is computed on every pointer move
 * and is most of what a frame costs.
 */
export function binInto(
  values: Float64Array,
  count: number,
  bins: Bins,
  mask: Uint8Array | null,
): void {
  const { counts, min, width } = bins;
  const last = counts.length - 1;
  counts.fill(0);
  if (width <= 0) return;

  for (let i = 0; i < count; i += 1) {
    if (mask !== null && mask[i] === 0) continue;
    let slot = Math.floor((values[i]! - min) / width);
    if (slot < 0) slot = 0;
    else if (slot > last) slot = last;
    counts[slot] = counts[slot]! + 1;
  }
}

/** Count how many selected stars fall in each population. */
export function countPopulations(
  stars: Stars,
  mask: Uint8Array,
  groups: number,
): number[] {
  const out: number[] = new Array(groups).fill(0);
  for (let i = 0; i < stars.count; i += 1) {
    if (mask[i] === 0) continue;
    const group = stars.population[i]!;
    if (group < groups) out[group] = out[group]! + 1;
  }
  return out;
}

/** A rectangle normalised so x0 <= x1 and y0 <= y1, whichever way it was drawn. */
export function orderRect(rect: Rect): Rect {
  const out: Rect = {
    x0: Math.min(rect.x0, rect.x1),
    x1: Math.max(rect.x0, rect.x1),
  };
  if (rect.y0 !== undefined && rect.y1 !== undefined) {
    out.y0 = Math.min(rect.y0, rect.y1);
    out.y1 = Math.max(rect.y0, rect.y1);
  }
  return out;
}

/** Round every edge, so the value sent to the server reads like a number. */
export function roundRect(rect: Rect, places: number): Rect {
  const factor = 10 ** places;
  const at = (value: number) => Math.round(value * factor) / factor;
  const out: Rect = { x0: at(rect.x0), x1: at(rect.x1) };
  if (rect.y0 !== undefined && rect.y1 !== undefined) {
    out.y0 = at(rect.y0);
    out.y1 = at(rect.y1);
  }
  return out;
}

export function parsecs(logDistance: number): number {
  return 10 ** logDistance;
}

export function distanceLabel(pc: number): string {
  if (pc >= 1000) return (pc / 1000).toFixed(2) + " kpc";
  return pc.toFixed(pc < 10 ? 2 : 0) + " pc";
}

export function count(value: number): string {
  return value.toLocaleString("en-US");
}
