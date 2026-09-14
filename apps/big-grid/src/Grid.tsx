import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef } from "react";

import { dateFor, money, type Orders, type SortKey, type Spec } from "@/orders";

const ROW_HEIGHT = 30;

const HEADINGS: { key: SortKey; label: string; align?: "right" }[] = [
  { key: "id", label: "Order" },
  { key: "date", label: "Date" },
  { key: "region", label: "Region" },
  { key: "category", label: "Category" },
  { key: "status", label: "Status" },
  { key: "quantity", label: "Qty", align: "right" },
  { key: "amount", label: "Amount", align: "right" },
];

type GridProps = {
  spec: Spec;
  orders: Orders;
  /** Row numbers, already filtered and sorted. */
  rows: Uint32Array;
  sortBy: SortKey;
  descending: boolean;
  onSort: (key: SortKey) => void;
};

/**
 * A million rows, of which about twenty are in the DOM.
 *
 * The virtualizer keeps only the visible window mounted. Everything else is
 * a number in a typed array, which is why the scrollbar can represent a
 * million rows without the browser having to build a million elements.
 */
export default function Grid({
  spec,
  orders,
  rows,
  sortBy,
  descending,
  onSort,
}: GridProps) {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => ROW_HEIGHT,
    overscan: 12,
  });

  const items = virtualizer.getVirtualItems();

  return (
    <div className="grid">
      <div className="grid-head" role="row">
        {HEADINGS.map((heading) => (
          <button
            key={heading.key}
            type="button"
            className={
              "th" +
              (heading.align === "right" ? " right" : "") +
              (sortBy === heading.key ? " sorted" : "")
            }
            onClick={() => onSort(heading.key)}
            aria-sort={
              sortBy === heading.key
                ? descending
                  ? "descending"
                  : "ascending"
                : "none"
            }
          >
            {heading.label}
            {sortBy === heading.key ? (
              <span className="arrow">{descending ? "\u25BE" : "\u25B4"}</span>
            ) : null}
          </button>
        ))}
      </div>

      <div className="grid-body" ref={scrollRef}>
        <div style={{ height: virtualizer.getTotalSize() + "px", position: "relative" }}>
          {items.map((item) => {
            const index = rows[item.index]!;
            return (
              <div
                className="tr"
                key={item.key}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: ROW_HEIGHT + "px",
                  transform: `translateY(${item.start}px)`,
                }}
              >
                <span className="td mono">{index.toLocaleString("en-US")}</span>
                <span className="td mono">{dateFor(spec, orders.day[index]!)}</span>
                <span className="td">{spec.regions[orders.region[index]!]}</span>
                <span className="td">{spec.categories[orders.category[index]!]}</span>
                <span className="td">
                  <span className={"pill " + spec.statuses[orders.status[index]!]}>
                    {spec.statuses[orders.status[index]!]}
                  </span>
                </span>
                <span className="td right mono">{orders.quantity[index]}</span>
                <span className="td right mono">{money(orders.amount[index]!)}</span>
              </div>
            );
          })}
        </div>
      </div>

      <p className="grid-foot">
        {rows.length.toLocaleString("en-US")} rows match.{" "}
        {items.length} in the DOM.
      </p>
    </div>
  );
}
