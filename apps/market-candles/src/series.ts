// Decoding a price series, and the numbers the chart shows about it.
//
// Prices arrive as int32 in hundredths. lightweight-charts wants plain
// numbers and unix seconds, so this is where the two meet.

export type SeriesPayload = {
  symbol: string;
  bars: number;
  startTime: number;
  barSeconds: number;
  scale: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
};

export type Candle = {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
};

export type Bars = {
  symbol: string;
  time: Float64Array;
  open: Float64Array;
  high: Float64Array;
  low: Float64Array;
  close: Float64Array;
  volume: Float64Array;
};

export type WindowStats = {
  bars: number;
  first: number;
  last: number;
  open: number;
  close: number;
  high: number;
  low: number;
  change: number;
  changePercent: number;
  volume: number;
  maxDrawdown: number;
};

function bytes(encoded: string): Uint8Array {
  const binary = atob(encoded);
  const out = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) out[i] = binary.charCodeAt(i);
  return out;
}

function scaled(encoded: string, scale: number): Float64Array {
  const raw = bytes(encoded);
  const ints = new Int32Array(raw.buffer, raw.byteOffset, raw.byteLength / 4);
  const out = new Float64Array(ints.length);
  for (let i = 0; i < ints.length; i += 1) out[i] = ints[i]! / scale;
  return out;
}

export function decodeSeries(payload: SeriesPayload): Bars {
  const raw = bytes(payload.volume);
  const volumeInts = new Uint32Array(raw.buffer, raw.byteOffset, raw.byteLength / 4);
  const volume = new Float64Array(volumeInts.length);
  for (let i = 0; i < volumeInts.length; i += 1) volume[i] = volumeInts[i]!;

  const time = new Float64Array(payload.bars);
  for (let i = 0; i < payload.bars; i += 1) {
    time[i] = payload.startTime + i * payload.barSeconds;
  }

  return {
    symbol: payload.symbol,
    time,
    open: scaled(payload.open, payload.scale),
    high: scaled(payload.high, payload.scale),
    low: scaled(payload.low, payload.scale),
    close: scaled(payload.close, payload.scale),
    volume,
  };
}

/**
 * The shape lightweight-charts wants.
 *
 * Built once per series rather than per frame: the chart holds this and
 * draws whatever slice of it the viewport covers, which is the reason
 * panning costs nothing.
 */
export function toCandles(bars: Bars): Candle[] {
  const out: Candle[] = new Array(bars.time.length);
  for (let i = 0; i < bars.time.length; i += 1) {
    out[i] = {
      time: bars.time[i]!,
      open: bars.open[i]!,
      high: bars.high[i]!,
      low: bars.low[i]!,
      close: bars.close[i]!,
    };
  }
  return out;
}

export function toVolume(bars: Bars) {
  const out = new Array(bars.time.length);
  for (let i = 0; i < bars.time.length; i += 1) {
    out[i] = {
      time: bars.time[i]!,
      value: bars.volume[i]!,
      color: bars.close[i]! >= bars.open[i]! ? "#26a69a55" : "#ef535055",
    };
  }
  return out;
}

/**
 * The same numbers the server's window_stats produces.
 *
 * Both paths compute this, in the same way, so the panel beside the chart
 * says the same thing whichever path drew it. That is what makes the
 * comparison a comparison rather than two different screens.
 */
export function windowStats(bars: Bars, first: number, last: number): WindowStats {
  const n = bars.time.length;
  const from = Math.max(0, Math.min(Math.trunc(first), n - 1));
  const to = Math.max(from, Math.min(Math.trunc(last), n - 1));

  let high = -Infinity;
  let low = Infinity;
  let volume = 0;
  let peak = -Infinity;
  let drawdown = 0;

  for (let i = from; i <= to; i += 1) {
    if (bars.high[i]! > high) high = bars.high[i]!;
    if (bars.low[i]! < low) low = bars.low[i]!;
    volume += bars.volume[i]!;
    if (bars.close[i]! > peak) peak = bars.close[i]!;
    const fall = (bars.close[i]! - peak) / peak;
    if (fall < drawdown) drawdown = fall;
  }

  const open = bars.open[from]!;
  const close = bars.close[to]!;

  return {
    bars: to - from + 1,
    first: from,
    last: to,
    open,
    close,
    high,
    low,
    change: round(close - open, 4),
    changePercent: open ? round((close / open - 1) * 100, 3) : 0,
    volume,
    maxDrawdown: round(drawdown * 100, 3),
  };
}

function round(value: number, places: number): number {
  const factor = 10 ** places;
  return Math.round(value * factor) / factor;
}

/** Bar index for a unix second, clamped to the series. */
export function indexAt(bars: Bars, seconds: number): number {
  const first = bars.time[0]!;
  const step = bars.time.length > 1 ? bars.time[1]! - first : 60;
  return Math.max(0, Math.min(bars.time.length - 1, Math.round((seconds - first) / step)));
}

export function money(value: number): string {
  return value.toLocaleString("en-GB", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function compact(value: number): string {
  if (value >= 1e9) return (value / 1e9).toFixed(2) + "B";
  if (value >= 1e6) return (value / 1e6).toFixed(2) + "M";
  if (value >= 1e3) return (value / 1e3).toFixed(1) + "k";
  return String(Math.round(value));
}
