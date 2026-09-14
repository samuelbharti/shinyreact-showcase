// The same million rows the servers have, built in the browser.
//
// Nothing is sent. The server describes the table in about 350 bytes and all
// three of JavaScript, Python and R build it from the same hash, so the rows
// on screen are the rows the server would page out, and the comparison in
// this app is between two ways of answering one question rather than between
// two different tables.
//
// Columns are typed arrays, one per field, because that is what makes a
// filter a pass over contiguous memory and a sort a permutation of an index.

export type Spec = {
  rows: number;
  epoch: string;
  daySpan: number;
  regions: string[];
  categories: string[];
  statuses: string[];
  statusWeights: number[];
  columns: string[];
};

export type Orders = {
  n: number;
  region: Uint8Array;
  category: Uint8Array;
  status: Uint8Array;
  day: Uint16Array;
  quantity: Uint16Array;
  amount: Uint32Array;
};

export type Filters = {
  regions: number[];
  statuses: number[];
  minAmount: number;
  maxAmount: number;
};

export type SortKey =
  | "id"
  | "date"
  | "region"
  | "category"
  | "status"
  | "quantity"
  | "amount";

/**
 * A repeatable value in 0 to 1, from a row number and a salt.
 *
 * The multiplier on the row number is deliberately small. With a large one
 * the argument to sin reaches into the hundreds of millions for a million
 * rows, where JavaScript, numpy and R can disagree in the last bit, and a
 * fractional part turns that into a visibly different row.
 */
export function hashUnit(index: number, salt: number): number {
  const raw = Math.sin(index * 0.0137 + salt * 7.919) * 43758.5453;
  return raw - Math.floor(raw);
}

/**
 * Round half to even, the way numpy's rint and R's round do.
 *
 * Math.round rounds a half up, so a value landing exactly on .5 would give a
 * different row here than on either server. It is rare and it is the kind of
 * difference that shows up as one wrong row in a million.
 */
export function rint(value: number): number {
  const floor = Math.floor(value);
  const diff = value - floor;
  if (diff > 0.5) return floor + 1;
  if (diff < 0.5) return floor;
  return floor % 2 === 0 ? floor : floor + 1;
}

/** Build the whole table. About 40 ms for a million rows. */
export function buildOrders(spec: Spec): Orders {
  const n = spec.rows;
  const region = new Uint8Array(n);
  const category = new Uint8Array(n);
  const status = new Uint8Array(n);
  const day = new Uint16Array(n);
  const quantity = new Uint16Array(n);
  const amount = new Uint32Array(n);

  const regionCount = spec.regions.length;
  const categoryCount = spec.categories.length;

  // Cumulative weights, so a status is a couple of comparisons rather than a
  // search. Matches numpy.searchsorted and R's findInterval.
  const edges: number[] = [];
  let running = 0;
  for (const weight of spec.statusWeights) {
    running += weight;
    edges.push(running);
  }

  for (let i = 0; i < n; i += 1) {
    region[i] = Math.floor(hashUnit(i, 1) * regionCount);
    category[i] = Math.floor(hashUnit(i, 2) * categoryCount);

    const u3 = hashUnit(i, 3);
    let bucket = 0;
    while (bucket < edges.length && edges[bucket]! < u3) bucket += 1;
    status[i] = bucket;

    const u4 = hashUnit(i, 4);
    day[i] = rint((2 * u4 - u4 * u4) * spec.daySpan);

    const u5 = hashUnit(i, 5);
    const qty = rint(1 + u5 * u5 * u5 * 240);
    quantity[i] = qty;

    const u6 = hashUnit(i, 6);
    amount[i] = rint(((400 + u6 * u6 * 48_000) * qty) / 100);
  }

  return { n, region, category, status, day, quantity, amount };
}

/**
 * Row numbers that pass the filters.
 *
 * One pass over typed arrays. On a million rows this is a few milliseconds,
 * which is why the filter can run on every keystroke.
 */
export function filterRows(orders: Orders, filters: Filters): Uint32Array {
  const { regions, statuses, minAmount, maxAmount } = filters;
  // Membership as a lookup rather than indexOf per row: with six regions the
  // difference is small, but it is the same shape as a real dictionary
  // encoded column and it costs nothing.
  const regionAllowed = toMask(regions, 256);
  const statusAllowed = toMask(statuses, 256);

  const out = new Uint32Array(orders.n);
  let kept = 0;

  for (let i = 0; i < orders.n; i += 1) {
    if (regionAllowed && !regionAllowed[orders.region[i]!]) continue;
    if (statusAllowed && !statusAllowed[orders.status[i]!]) continue;
    const value = orders.amount[i]!;
    if (minAmount > 0 && value < minAmount) continue;
    if (maxAmount > 0 && value > maxAmount) continue;
    out[kept] = i;
    kept += 1;
  }

  return out.subarray(0, kept);
}

/**
 * Sort row numbers by a column.
 *
 * The low cardinality columns get a counting sort, which is one pass and
 * stable. Everything else goes through a comparator. That split is why
 * sorting by region is instant and sorting by amount is merely fast.
 */
export function sortRows(
  orders: Orders,
  rows: Uint32Array,
  key: SortKey,
  descending: boolean,
): Uint32Array {
  let sorted: Uint32Array;

  if (key === "id") {
    sorted = rows.slice();
  } else if (key === "region" || key === "category" || key === "status") {
    sorted = countingSort(rows, orders[key], 256);
  } else {
    const column = key === "date" ? orders.day : orders[key];
    // A typed array sort with a comparator is still the fastest thing here
    // short of a radix sort, and a radix sort on 32 bit values needs four
    // passes and two buffers for a gain that does not show at this size.
    sorted = rows.slice();
    sorted.sort((a, b) => column[a]! - column[b]!);
  }

  if (descending) sorted.reverse();
  return sorted;
}

/** Stable counting sort for a column with few distinct values. */
function countingSort(
  rows: Uint32Array,
  column: Uint8Array,
  buckets: number,
): Uint32Array {
  const counts = new Uint32Array(buckets);
  for (let i = 0; i < rows.length; i += 1) {
    const bucket = column[rows[i]!]!;
    counts[bucket] = counts[bucket]! + 1;
  }

  const starts = new Uint32Array(buckets);
  let running = 0;
  for (let b = 0; b < buckets; b += 1) {
    starts[b] = running;
    running += counts[b]!;
  }

  const out = new Uint32Array(rows.length);
  for (let i = 0; i < rows.length; i += 1) {
    const row = rows[i]!;
    const bucket = column[row]!;
    const at = starts[bucket]!;
    out[at] = row;
    starts[bucket] = at + 1;
  }
  return out;
}

function toMask(values: number[], size: number): Uint8Array | null {
  if (values.length === 0) return null;
  const mask = new Uint8Array(size);
  for (const value of values) mask[value] = 1;
  return mask;
}

/** Sums over everything that matched, not just what is on screen. */
export function totalsFor(orders: Orders, rows: Uint32Array) {
  let amount = 0;
  let quantity = 0;
  for (let i = 0; i < rows.length; i += 1) {
    amount += orders.amount[rows[i]!]!;
    quantity += orders.quantity[rows[i]!]!;
  }
  return {
    rows: rows.length,
    amount,
    quantity,
    meanAmount: rows.length ? Math.round((amount / rows.length) * 100) / 100 : 0,
  };
}

/** Days since the epoch, as a date a person reads. */
export function dateFor(spec: Spec, day: number): string {
  const start = new Date(spec.epoch + "T00:00:00Z");
  const at = new Date(start.getTime() + day * 86_400_000);
  return at.toISOString().slice(0, 10);
}

/** Pence to pounds, with the separators. */
export function money(pence: number): string {
  return (pence / 100).toLocaleString("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  });
}
