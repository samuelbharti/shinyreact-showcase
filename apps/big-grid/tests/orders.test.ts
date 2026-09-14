// Layer three: the table the browser builds, and the work it does on it.
//
// The rows here have to match the ones both servers build. Three
// implementations of one hash is three chances to drift, and a drift would
// not look like a bug: the grid would work perfectly and show a different
// million rows than the server would page out, which makes the comparison in
// this app meaningless rather than broken.
import { describe, expect, it } from "vitest";

import {
  buildOrders,
  dateFor,
  filterRows,
  hashUnit,
  money,
  rint,
  sortRows,
  totalsFor,
  type Spec,
} from "../src/orders";

const SPEC: Spec = {
  rows: 1_000,
  epoch: "2023-01-01",
  daySpan: 1_095,
  regions: ["North", "South", "East", "West", "Central", "Coastal"],
  categories: ["Hardware", "Software", "Services", "Support", "Training"],
  statuses: ["shipped", "pending", "returned", "cancelled"],
  statusWeights: [0.72, 0.18, 0.07, 0.03],
  columns: ["id", "date", "region", "category", "status", "quantity", "amount"],
};

const ORDERS = buildOrders(SPEC);
const NO_FILTER = { regions: [], statuses: [], minAmount: 0, maxAmount: 0 };

describe("hashUnit", () => {
  it("agrees with Python and R", () => {
    // Pinned in all three languages. If this moves, they build different
    // tables and nothing else in this app means what it says.
    expect(hashUnit(0, 1)).toBeCloseTo(0.08570585407142062, 15);
    expect(hashUnit(7, 3)).toBeCloseTo(0.6120904732306371, 15);
  });

  it("stays inside zero to one", () => {
    for (let i = 0; i < 5_000; i += 1) {
      const value = hashUnit(i, 4);
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThan(1);
    }
  });
});

describe("rint", () => {
  it("rounds half to even, the way numpy and R do", () => {
    // Math.round would give 1 and 3 here. One row in a million landing on a
    // half would then differ from both servers.
    expect(rint(0.5)).toBe(0);
    expect(rint(1.5)).toBe(2);
    expect(rint(2.5)).toBe(2);
    expect(rint(3.5)).toBe(4);
  });

  it("rounds everything else the ordinary way", () => {
    expect(rint(0.4)).toBe(0);
    expect(rint(0.6)).toBe(1);
    expect(rint(-1.2)).toBe(-1);
  });
});

describe("buildOrders", () => {
  it("agrees with both servers on the first row", () => {
    expect(ORDERS.region[0]).toBe(0);
    expect(ORDERS.category[0]).toBe(4);
    expect(ORDERS.status[0]).toBe(0);
    expect(ORDERS.day[0]).toBe(900);
    expect(ORDERS.quantity[0]).toBe(38);
    expect(ORDERS.amount[0]).toBe(194);
  });

  it("agrees on a row further in", () => {
    expect(ORDERS.region[2]).toBe(4);
    expect(ORDERS.category[2]).toBe(1);
    expect(ORDERS.status[2]).toBe(1);
  });

  it("builds every row", () => {
    expect(ORDERS.n).toBe(1_000);
    expect(ORDERS.amount).toHaveLength(1_000);
  });

  it("keeps every code inside its range", () => {
    for (let i = 0; i < ORDERS.n; i += 1) {
      expect(ORDERS.region[i]!).toBeLessThan(SPEC.regions.length);
      expect(ORDERS.category[i]!).toBeLessThan(SPEC.categories.length);
      expect(ORDERS.status[i]!).toBeLessThan(SPEC.statuses.length);
      expect(ORDERS.day[i]!).toBeLessThanOrEqual(SPEC.daySpan);
    }
  });
});

describe("filterRows", () => {
  it("matches everything when nothing is set", () => {
    expect(filterRows(ORDERS, NO_FILTER)).toHaveLength(ORDERS.n);
  });

  it("narrows on a region", () => {
    const rows = filterRows(ORDERS, { ...NO_FILTER, regions: [0] });

    expect(rows.length).toBeLessThan(ORDERS.n);
    for (const row of rows) expect(ORDERS.region[row]).toBe(0);
  });

  it("combines filters rather than replacing them", () => {
    const region = filterRows(ORDERS, { ...NO_FILTER, regions: [0] });
    const both = filterRows(ORDERS, { ...NO_FILTER, regions: [0], statuses: [0] });

    expect(both.length).toBeLessThanOrEqual(region.length);
    for (const row of both) {
      expect(ORDERS.region[row]).toBe(0);
      expect(ORDERS.status[row]).toBe(0);
    }
  });

  it("applies an amount floor", () => {
    const rows = filterRows(ORDERS, { ...NO_FILTER, minAmount: 5_000 });
    for (const row of rows) expect(ORDERS.amount[row]!).toBeGreaterThanOrEqual(5_000);
  });

  it("can match nothing without failing", () => {
    expect(filterRows(ORDERS, { ...NO_FILTER, minAmount: 99_999_999 })).toHaveLength(0);
  });
});

describe("sortRows", () => {
  const all = filterRows(ORDERS, NO_FILTER);

  it("orders by a numeric column", () => {
    const sorted = sortRows(ORDERS, all, "amount", false);

    for (let i = 1; i < sorted.length; i += 1) {
      expect(ORDERS.amount[sorted[i]!]!).toBeGreaterThanOrEqual(
        ORDERS.amount[sorted[i - 1]!]!,
      );
    }
  });

  it("reverses for descending", () => {
    const up = sortRows(ORDERS, all, "amount", false);
    const down = sortRows(ORDERS, all, "amount", true);

    expect(down[0]).toBe(up[up.length - 1]);
  });

  it("keeps every row, losing none and inventing none", () => {
    const sorted = sortRows(ORDERS, all, "region", false);

    expect(sorted).toHaveLength(all.length);
    expect(new Set(sorted).size).toBe(all.length);
  });

  it("is stable on the counting sort path", () => {
    // Region goes through a counting sort. Stability is what stops rows
    // jumping around when you sort by a column with six distinct values.
    const sorted = sortRows(ORDERS, all, "region", false);

    let previousRegion = -1;
    let previousId = -1;
    for (const row of sorted) {
      const region = ORDERS.region[row]!;
      if (region === previousRegion) expect(row).toBeGreaterThan(previousId);
      previousRegion = region;
      previousId = row;
    }
  });

  it("leaves id order alone", () => {
    const sorted = sortRows(ORDERS, all, "id", false);
    expect(sorted[0]).toBe(0);
    expect(sorted[sorted.length - 1]).toBe(ORDERS.n - 1);
  });

  it("does not disturb the rows it was given", () => {
    // The filtered array is reused across renders. Sorting in place would
    // quietly reorder it and the next sort would start from the wrong place.
    const rows = filterRows(ORDERS, { ...NO_FILTER, regions: [1] });
    const before = rows.slice();
    sortRows(ORDERS, rows, "amount", true);

    expect([...rows]).toEqual([...before]);
  });
});

describe("totalsFor", () => {
  it("adds up everything it is given", () => {
    const rows = filterRows(ORDERS, NO_FILTER);
    const summary = totalsFor(ORDERS, rows);

    let amount = 0;
    for (let i = 0; i < ORDERS.n; i += 1) amount += ORDERS.amount[i]!;

    expect(summary.rows).toBe(ORDERS.n);
    expect(summary.amount).toBe(amount);
  });

  it("is zero for nothing, rather than a division by zero", () => {
    expect(totalsFor(ORDERS, new Uint32Array(0))).toEqual({
      rows: 0,
      amount: 0,
      quantity: 0,
      meanAmount: 0,
    });
  });
});

describe("formatting", () => {
  it("turns a day offset into a date", () => {
    expect(dateFor(SPEC, 0)).toBe("2023-01-01");
    expect(dateFor(SPEC, 365)).toBe("2024-01-01");
  });

  it("shows pence as pounds", () => {
    expect(money(194)).toBe("£2");
    expect(money(116_078)).toBe("£1,161");
  });
});
