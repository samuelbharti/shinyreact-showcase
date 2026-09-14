// Turning the server payloads into the typed arrays the GPU wants.
//
// Everything crosses the wire as base64. Positions are int16 and expression
// is one byte per cell, which is half and a quarter of what float32 would
// cost for data the eye cannot tell apart at these sizes.

/** base64 to raw bytes. About 7 ms for the 800 KB position block. */
export function base64ToBytes(encoded: string): Uint8Array {
  const binary = atob(encoded);
  const out = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) out[i] = binary.charCodeAt(i);
  return out;
}

/** Raw bytes to a copy-free Int16Array view. */
export function asInt16(bytes: Uint8Array): Int16Array {
  return new Int16Array(bytes.buffer, bytes.byteOffset, bytes.byteLength / 2);
}

export type Positions = {
  x: Float32Array;
  y: Float32Array;
};

/**
 * Dequantize positions and fit them to the square that regl-scatterplot
 * draws in, which is -1 to 1 on both axes.
 *
 * Both axes are divided by the same half extent rather than stretched to
 * fill the square independently. A UMAP with the aspect ratio changed is a
 * different picture, and the distortion here would be about 3 percent, which
 * is small enough to miss and wrong enough to matter.
 */
export function toUnitSquare(
  qx: Int16Array,
  qy: Int16Array,
  bounds: number[],
): Positions {
  const [xMin, yMin, xMax, yMax] = bounds as [number, number, number, number];
  const n = qx.length;

  const cx = (xMin + xMax) / 2;
  const cy = (yMin + yMax) / 2;
  const half = Math.max(xMax - xMin, yMax - yMin) / 2;

  // The generator mapped each axis onto the full int16 range independently,
  // so undo that first, then apply one shared scale.
  const xSpan = (xMax - xMin) / 65534;
  const ySpan = (yMax - yMin) / 65534;

  const x = new Float32Array(n);
  const y = new Float32Array(n);
  for (let i = 0; i < n; i += 1) {
    x[i] = (xMin + (qx[i]! + 32767) * xSpan - cx) / half;
    y[i] = (yMin + (qy[i]! + 32767) * ySpan - cy) / half;
  }
  return { x, y };
}

/** Cluster indices, as the Float32Array regl-scatterplot wants for `z`. */
export function toCategory(bytes: Uint8Array): Float32Array {
  const out = new Float32Array(bytes.length);
  for (let i = 0; i < bytes.length; i += 1) out[i] = bytes[i]!;
  return out;
}

/** Expression bytes to the 0 to 1 range regl-scatterplot wants for `w`. */
export function toUnitValue(bytes: Uint8Array): Float32Array {
  const out = new Float32Array(bytes.length);
  for (let i = 0; i < bytes.length; i += 1) out[i] = bytes[i]! / 255;
  return out;
}

/**
 * Cell indices to base64, for the trip back to the server.
 *
 * A 20,000 cell selection is about 107 KB this way against about 140 KB as a
 * JSON array of numbers, and the server parses it in one step instead of
 * walking a list.
 */
export function indicesToBase64(indices: number[]): string {
  const packed = new Uint32Array(indices);
  const bytes = new Uint8Array(packed.buffer);
  // String.fromCharCode throws past roughly 100,000 arguments, so feed it in
  // chunks rather than spreading the whole array in one call.
  let binary = "";
  const CHUNK = 0x8000;
  for (let i = 0; i < bytes.length; i += CHUNK) {
    binary += String.fromCharCode(...bytes.subarray(i, i + CHUNK));
  }
  return btoa(binary);
}
