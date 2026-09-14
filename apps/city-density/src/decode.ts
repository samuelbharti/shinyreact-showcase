// Decoding the trip positions into what deck.gl wants.
//
// Positions arrive quantized to int16 against the city bounds, which is about
// a metre at this scale. deck.gl wants one flat Float32Array of longitude and
// latitude pairs, which it can hand straight to the GPU without walking an
// array of half a million small objects.

export type PointsPayload = {
  n: number;
  bounds: number[];
  center: number[];
  districts: string[];
  metrics: string[];
  lng: string;
  lat: string;
  /** The city outline and river, shipped with the positions. */
  boundary: unknown;
};

function bytes(encoded: string): Uint8Array {
  const binary = atob(encoded);
  const out = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) out[i] = binary.charCodeAt(i);
  return out;
}

function asInt16(raw: Uint8Array): Int16Array {
  return new Int16Array(raw.buffer, raw.byteOffset, raw.byteLength / 2);
}

/**
 * Interleaved longitude, latitude and a zero altitude, ready for deck.gl.
 *
 * One flat array rather than half a million `[lng, lat]` arrays: the object
 * form costs about 40 MB of heap and a garbage collection pause every time
 * the layer rebuilds.
 *
 * Three components, not two. deck.gl reads positions as 3D and strides the
 * buffer accordingly, so a two component array is read as interleaved
 * nonsense and the layer silently produces nothing.
 */
export function decodePositions(payload: PointsPayload): Float32Array {
  const qlng = asInt16(bytes(payload.lng));
  const qlat = asInt16(bytes(payload.lat));
  const n = Math.min(qlng.length, qlat.length);

  const [west, south, east, north] = payload.bounds as [number, number, number, number];
  const lngSpan = (east - west) / 65534;
  const latSpan = (north - south) / 65534;

  const out = new Float32Array(n * 3);
  for (let i = 0; i < n; i += 1) {
    out[i * 3] = west + (qlng[i]! + 32767) * lngSpan;
    out[i * 3 + 1] = south + (qlat[i]! + 32767) * latSpan;
    // out[i * 3 + 2] stays 0: these are ground level pickups.
  }
  return out;
}

/**
 * Hexagon radius in metres for a zoom level.
 *
 * Bins that stay the same size in metres turn into a solid sheet when you
 * zoom out and into confetti when you zoom in. Scaling with zoom keeps a
 * hexagon roughly the same size on screen, which is what makes rebinning
 * worth doing at all.
 */
export function radiusForZoom(zoom: number, pixels: number): number {
  // Metres per pixel at the equator, halving with every zoom level.
  const metersPerPixel = 156543.03392 / 2 ** zoom;
  return Math.max(20, Math.round(metersPerPixel * pixels));
}

/** "4,690 trips" and friends, with the thousands separators. */
export function count(value: number): string {
  return value.toLocaleString("en-US");
}
