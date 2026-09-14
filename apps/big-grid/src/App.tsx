import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import Grid from "@/Grid";
import {
  buildOrders,
  dateFor,
  filterRows,
  money,
  sortRows,
  totalsFor,
  type Filters,
  type Orders,
  type SortKey,
  type Spec,
} from "@/orders";

type ServerRow = {
  id: number;
  day: number;
  region: string;
  category: string;
  status: string;
  quantity: number;
  amount: number;
};

type ServerPage = { total: number; offset: number; rows: ServerRow[] };
type Totals = { rows: number; amount: number; quantity: number; meanAmount: number };

const EMPTY_FILTERS: Filters = {
  regions: [],
  statuses: [],
  minAmount: 0,
  maxAmount: 0,
};

export default function App() {
  const {
    useShinyInitialized,
    useSetShinyInput,
    useShinyOutputValue,
    useShinyOutputStatus,
  } = window.shinyreact;

  const ready = useShinyInitialized();
  const spec = useShinyOutputValue<Spec>("spec");

  const [filters, setFilters] = useState<Filters>(EMPTY_FILTERS);
  const [sortBy, setSortBy] = useState<SortKey>("id");
  const [descending, setDescending] = useState(false);

  // "browser" does the work locally. "server" sends the same question over
  // the wire and waits, which is what a server backed grid does on every
  // interaction.
  const [mode, setMode] = useState<"browser" | "server">("browser");

  const [orders, setOrders] = useState<Orders | null>(null);
  const [buildMs, setBuildMs] = useState(0);
  const [localMs, setLocalMs] = useState(0);
  const [serverMs, setServerMs] = useState(0);

  // The query the server path sends. Only set in server mode, so the server
  // is genuinely idle while the browser is doing the work.
  // Write only: the client never reads this back, the server answers it
  // through `page` instead.
  const setQuery = useSetShinyInput<Record<string, unknown> | null>(
    "grid_query",
    null,
  );
  const page = useShinyOutputValue<ServerPage>("page");
  const serverTotals = useShinyOutputValue<Totals>("server_totals");
  const pageStatus = useShinyOutputStatus("page");
  const sentAt = useRef(0);

  // Build the million rows once, when the spec arrives.
  useEffect(() => {
    if (!spec) return;
    const started = performance.now();
    const built = buildOrders(spec);
    setBuildMs(performance.now() - started);
    setOrders(built);
  }, [spec]);

  // Filter and sort locally. This is the whole browser path, and it reruns
  // on every change of any control.
  const local = useMemo(() => {
    if (!orders) return null;
    const started = performance.now();
    const matched = filterRows(orders, filters);
    const sorted = sortRows(orders, matched, sortBy, descending);
    const summary = totalsFor(orders, sorted);
    return { rows: sorted, totals: summary, ms: performance.now() - started };
  }, [orders, filters, sortBy, descending]);

  useEffect(() => {
    if (local) setLocalMs(local.ms);
  }, [local]);

  // In server mode the same question goes over the wire. The timer starts
  // when the input is written and stops when the output comes back, so what
  // it measures is the round trip a server backed grid pays.
  useEffect(() => {
    if (mode !== "server") {
      setQuery(null);
      return;
    }
    sentAt.current = performance.now();
    setQuery({
      regions: filters.regions,
      statuses: filters.statuses,
      minAmount: filters.minAmount,
      maxAmount: filters.maxAmount,
      sortBy,
      descending,
      offset: 0,
      limit: 50,
    });
  }, [mode, filters, sortBy, descending, setQuery]);

  useEffect(() => {
    if (mode === "server" && page && sentAt.current > 0) {
      setServerMs(performance.now() - sentAt.current);
      sentAt.current = 0;
    }
  }, [page, mode]);

  const handleSort = useCallback(
    (key: SortKey) => {
      if (key === sortBy) setDescending((previous) => !previous);
      else {
        setSortBy(key);
        setDescending(false);
      }
    },
    [sortBy],
  );

  const toggle = useCallback((list: number[], value: number) => {
    return list.includes(value)
      ? list.filter((item) => item !== value)
      : [...list, value];
  }, []);

  if (!ready) return null;

  const totals = mode === "browser" ? local?.totals : serverTotals;

  return (
    <main className="app">
      <header>
        <h1>Big grid</h1>
        <p className="claim">
          A million order rows, all of them scrollable, with about twenty
          in the page. Flip to the server path to ask the same question the
          way a server backed grid does, and see what comes back.
        </p>
      </header>

      <div className="toolbar">
        <div className="modes" role="group" aria-label="Where the work happens">
          <button
            type="button"
            className={mode === "browser" ? "mode on" : "mode"}
            onClick={() => setMode("browser")}
          >
            In the browser
          </button>
          <button
            type="button"
            className={mode === "server" ? "mode on" : "mode"}
            onClick={() => setMode("server")}
          >
            On the server
          </button>
        </div>

        <div className="meters">
          <Meter
            value={mode === "browser" ? localMs.toFixed(1) + " ms" : "--"}
            label="browser filter and sort"
            highlight={mode === "browser"}
          />
          <Meter
            value={mode === "server" ? serverMs.toFixed(0) + " ms" : "--"}
            label="server round trip"
            highlight={mode === "server"}
          />
          <Meter value={buildMs.toFixed(0) + " ms"} label="built a million rows" />
        </div>
      </div>

      <div className="filters">
        <fieldset>
          <legend>Region</legend>
          {(spec?.regions ?? []).map((name, index) => (
            <label key={name}>
              <input
                type="checkbox"
                checked={filters.regions.includes(index)}
                onChange={() =>
                  setFilters((f) => ({ ...f, regions: toggle(f.regions, index) }))
                }
              />
              {name}
            </label>
          ))}
        </fieldset>

        <fieldset>
          <legend>Status</legend>
          {(spec?.statuses ?? []).map((name, index) => (
            <label key={name}>
              <input
                type="checkbox"
                checked={filters.statuses.includes(index)}
                onChange={() =>
                  setFilters((f) => ({ ...f, statuses: toggle(f.statuses, index) }))
                }
              />
              {name}
            </label>
          ))}
        </fieldset>

        <fieldset className="amount">
          <legend>Minimum amount</legend>
          <input
            type="range"
            min={0}
            max={100_000}
            step={2_000}
            value={filters.minAmount}
            onChange={(event) =>
              setFilters((f) => ({ ...f, minAmount: Number(event.target.value) }))
            }
          />
          <span className="value">
            {filters.minAmount === 0 ? "any" : money(filters.minAmount)}
          </span>
        </fieldset>

        <button
          type="button"
          className="ghost"
          onClick={() => setFilters(EMPTY_FILTERS)}
        >
          Clear filters
        </button>
      </div>

      {totals ? (
        <ul className="totals">
          <li>
            <span className="label">Rows</span>
            <span className="value">{totals.rows.toLocaleString("en-US")}</span>
          </li>
          <li>
            <span className="label">Total value</span>
            <span className="value">{money(totals.amount)}</span>
          </li>
          <li>
            <span className="label">Units</span>
            <span className="value">{totals.quantity.toLocaleString("en-US")}</span>
          </li>
          <li>
            <span className="label">Mean order</span>
            <span className="value">{money(totals.meanAmount)}</span>
          </li>
        </ul>
      ) : null}

      {mode === "browser" ? (
        spec && orders && local ? (
          <Grid
            spec={spec}
            orders={orders}
            rows={local.rows}
            sortBy={sortBy}
            descending={descending}
            onSort={handleSort}
          />
        ) : (
          <p className="skeleton">Building a million rows...</p>
        )
      ) : (
        <ServerGrid
          spec={spec}
          page={page}
          recalculating={pageStatus === "recalculating"}
        />
      )}

      <p className="note">
        {mode === "browser"
          ? "Every control above reruns a pass over a million rows in the browser. The server is idle."
          : "Every control above sends the query and waits. This path shows one page, because that is all a server backed grid sends."}
      </p>
    </main>
  );
}

/**
 * The server path's result: one page of rows, as they arrived.
 *
 * Deliberately plain. A server backed grid has one page in hand and nothing
 * else, so it cannot scroll past what it asked for without asking again.
 */
function ServerGrid({
  spec,
  page,
  recalculating,
}: {
  spec: Spec | undefined;
  page: ServerPage | undefined;
  recalculating: boolean;
}) {
  if (!page) return <p className="skeleton">Waiting for the server...</p>;

  return (
    <div className={recalculating ? "grid server recalculating" : "grid server"}>
      <div className="grid-head">
        <span className="th">Order</span>
        <span className="th">Day</span>
        <span className="th">Region</span>
        <span className="th">Category</span>
        <span className="th">Status</span>
        <span className="th right">Qty</span>
        <span className="th right">Amount</span>
      </div>
      <div className="grid-body static">
        {page.rows.map((row) => (
          <div className="tr" key={row.id}>
            <span className="td mono">{row.id.toLocaleString("en-US")}</span>
            <span className="td mono">{spec ? dateFor(spec, row.day) : row.day}</span>
            <span className="td">{row.region}</span>
            <span className="td">{row.category}</span>
            <span className="td">
              <span className={"pill " + row.status}>{row.status}</span>
            </span>
            <span className="td right mono">{row.quantity}</span>
            <span className="td right mono">{money(row.amount)}</span>
          </div>
        ))}
      </div>
      <p className="grid-foot">
        {page.total.toLocaleString("en-US")} rows match. {page.rows.length} sent.
      </p>
    </div>
  );
}

function Meter({
  value,
  label,
  highlight,
}: {
  value: string;
  label: string;
  highlight?: boolean;
}) {
  return (
    <span className={highlight ? "meter on" : "meter"}>
      <span className="meter-value">{value}</span>
      <span className="meter-label">{label}</span>
    </span>
  );
}
