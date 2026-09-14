// Everything you can ask of a scored model at a threshold.
//
// This is the whole point of the app, so it is worth being precise about how
// little there is here. Fifty thousand customers are turned into a cumulative
// count once, at load. After that a confusion matrix is two array reads, the
// six metrics are arithmetic on four integers, and the cost sweep is a
// hundred and one multiplications.
//
// Every function below mirrors one in churn_monitor.py and R/churn.R, on
// purpose. The compare toggle puts the two paths side by side, and they have
// to produce the same numbers or the comparison is not one.
//
// Scores are integers in ten thousandths and the threshold is an integer too,
// so there is no float edge anywhere for the two sides to disagree about.

export type ScoresPayload = {
  customers: number;
  scoreScale: number;
  score: string;
  left: string;
};

export type Scored = {
  count: number;
  scoreScale: number;
  score: Uint16Array;
  left: Uint8Array;
};

export type Curve = {
  /** How many churners scored at or above each point on the grid. */
  aboveLeft: Int32Array;
  aboveStay: Int32Array;
  totalLeft: number;
  totalStay: number;
  scoreScale: number;
};

export type Confusion = {
  threshold: number;
  truePositive: number;
  falsePositive: number;
  falseNegative: number;
  trueNegative: number;
};

export type Metrics = Confusion & {
  flagged: number;
  precision: number;
  recall: number;
  f1: number;
  accuracy: number;
  falsePositiveRate: number;
  cost: number;
};

export type Curves = {
  thresholds: number[];
  recall: number[];
  falsePositiveRate: number[];
  precision: number[];
};

export type Histogram = {
  bins: number;
  edges: number[];
  left: number[];
  stayed: number[];
};

export type Sweep = {
  thresholds: Int32Array;
  cost: Float64Array;
  bestThreshold: number;
  bestCost: number;
};

export type Summary = {
  customers: number;
  left: number;
  stayed: number;
  baseRate: number;
  scoreScale: number;
  auc: number;
  defaultMissCost: number;
  defaultOfferCost: number;
  curves: Curves;
};

function bytes(encoded: string): Uint8Array {
  const binary = atob(encoded);
  const out = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) out[i] = binary.charCodeAt(i);
  return out;
}

export function decodeScores(payload: ScoresPayload): Scored {
  const raw = bytes(payload.score);
  return {
    count: payload.customers,
    scoreScale: payload.scoreScale,
    score: new Uint16Array(raw.buffer, raw.byteOffset, raw.byteLength / 2),
    left: bytes(payload.left),
  };
}

/**
 * Turn the scores into cumulative counts, once.
 *
 * One pass to tally and one to accumulate, over ten thousand and one slots.
 * This is the only expensive thing the browser does, it happens once when the
 * payload arrives, and it is what makes every later question a lookup.
 */
export function buildCurve(scored: Scored): Curve {
  const slots = scored.scoreScale + 1;
  const leftHist = new Int32Array(slots);
  const stayHist = new Int32Array(slots);

  for (let i = 0; i < scored.count; i += 1) {
    const at = scored.score[i]!;
    if (scored.left[i] === 1) leftHist[at] = leftHist[at]! + 1;
    else stayHist[at] = stayHist[at]! + 1;
  }

  const aboveLeft = new Int32Array(slots);
  const aboveStay = new Int32Array(slots);
  let runningLeft = 0;
  let runningStay = 0;
  for (let at = slots - 1; at >= 0; at -= 1) {
    runningLeft += leftHist[at]!;
    runningStay += stayHist[at]!;
    aboveLeft[at] = runningLeft;
    aboveStay[at] = runningStay;
  }

  return {
    aboveLeft,
    aboveStay,
    totalLeft: runningLeft,
    totalStay: runningStay,
    scoreScale: scored.scoreScale,
  };
}

function clampThreshold(curve: Curve, threshold: number): number {
  return Math.max(0, Math.min(Math.trunc(threshold), curve.scoreScale));
}

/** The four counts at a threshold. Flagged means score at or above it. */
export function confusionAt(curve: Curve, threshold: number): Confusion {
  const at = clampThreshold(curve, threshold);
  const truePositive = curve.aboveLeft[at]!;
  const falsePositive = curve.aboveStay[at]!;
  return {
    threshold: at,
    truePositive,
    falsePositive,
    falseNegative: curve.totalLeft - truePositive,
    trueNegative: curve.totalStay - falsePositive,
  };
}

/** Everything the panel shows, at one threshold. */
export function metricsAt(
  curve: Curve,
  threshold: number,
  missCost: number,
  offerCost: number,
): Metrics {
  const counts = confusionAt(curve, threshold);
  const { truePositive: tp, falsePositive: fp, falseNegative: fn, trueNegative: tn } = counts;

  const flagged = tp + fp;
  const total = tp + fp + fn + tn;

  const precision = flagged > 0 ? tp / flagged : 0;
  const recall = tp + fn > 0 ? tp / (tp + fn) : 0;
  const f1 = precision + recall > 0 ? (2 * precision * recall) / (precision + recall) : 0;

  return {
    ...counts,
    flagged,
    precision: round(precision, 6),
    recall: round(recall, 6),
    f1: round(f1, 6),
    accuracy: total > 0 ? round((tp + tn) / total, 6) : 0,
    falsePositiveRate: fp + tn > 0 ? round(fp / (fp + tn), 6) : 0,
    cost: round(fn * missCost + fp * offerCost, 2),
  };
}

/**
 * Expected cost at every threshold on the sampled grid, and the cheapest one.
 *
 * The only thing here that moves when a cost changes rather than when the
 * threshold does. It is a hundred and one multiplications, which is why the
 * best threshold can follow a cost slider while it is being dragged instead
 * of arriving a moment after it stops.
 */
export function sweepCost(
  curve: Curve,
  missCost: number,
  offerCost: number,
  step = 100,
): Sweep {
  const points = Math.floor(curve.scoreScale / step) + 1;
  const thresholds = new Int32Array(points);
  const cost = new Float64Array(points);

  let best = 0;
  for (let i = 0; i < points; i += 1) {
    const at = i * step;
    thresholds[i] = at;
    const falseNegative = curve.totalLeft - curve.aboveLeft[at]!;
    const falsePositive = curve.aboveStay[at]!;
    cost[i] = falseNegative * missCost + falsePositive * offerCost;
    if (cost[i]! < cost[best]!) best = i;
  }

  return {
    thresholds,
    cost,
    bestThreshold: thresholds[best]!,
    bestCost: round(cost[best]!, 2),
  };
}

/**
 * Score distribution, split by what actually happened.
 *
 * Static: the bars do not move when the threshold does, only the line across
 * them, so this runs once. The bin is worked out by arithmetic rather than by
 * a library, because both servers have to land every customer in the same bar
 * and no two histogram functions agree about which side of an edge is closed.
 */
export function histogram(scored: Scored, bins = 60): Histogram {
  const left = new Array<number>(bins).fill(0);
  const stayed = new Array<number>(bins).fill(0);

  for (let i = 0; i < scored.count; i += 1) {
    const slot = Math.min(
      Math.floor((scored.score[i]! * bins) / scored.scoreScale),
      bins - 1,
    );
    if (scored.left[i] === 1) left[slot] = left[slot]! + 1;
    else stayed[slot] = stayed[slot]! + 1;
  }

  const edges: number[] = [];
  for (let i = 0; i <= bins; i += 1) edges.push(Math.round((i * scored.scoreScale) / bins));

  return { bins, edges, left, stayed };
}

/**
 * Area under the ROC, by the trapezium rule over every score.
 *
 * The server sends this in the summary, because it never changes. This exists
 * so a test can check the browser would have got the same answer, which is
 * the cheapest way to know the three implementations still agree.
 */
export function areaUnderCurve(curve: Curve): number {
  let total = 0;
  for (let at = 0; at < curve.scoreScale; at += 1) {
    const widthAt = (curve.aboveStay[at]! - curve.aboveStay[at + 1]!) / curve.totalStay;
    const height =
      (curve.aboveLeft[at]! + curve.aboveLeft[at + 1]!) / (2 * curve.totalLeft);
    total += widthAt * height;
  }
  return round(total, 6);
}

function round(value: number, places: number): number {
  const factor = 10 ** places;
  return Math.round(value * factor) / factor;
}

export function probability(score: number, scale: number): number {
  return score / scale;
}

export function commas(value: number): string {
  return Math.round(value).toLocaleString("en-US");
}

export function money(value: number): string {
  if (value >= 1e6) return "£" + (value / 1e6).toFixed(2) + "m";
  if (value >= 1e3) return "£" + Math.round(value / 1e3).toLocaleString("en-US") + "k";
  return "£" + Math.round(value).toLocaleString("en-US");
}

export function percent(value: number, places = 1): string {
  return (value * 100).toFixed(places) + "%";
}
