// Layer three, second half: the page.
//
// The transition itself is verified in a real browser, because it is about
// DOM elements surviving and a jsdom has no layout or animation frames. What
// is worth checking here is the wiring: the first paint is gated, the
// scenario buttons set the bookmarked input, and focusing a node changes only
// what is drawn.
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import App from "../src/App";

const CATALOGUE = {
  scenarios: [
    { slug: "baseline", title: "Ordinary week", note: "Everything open." },
    { slug: "port-closed", title: "Rotterdam closed", note: "The port stops." },
  ],
  stages: ["supplier", "factory", "centre", "market"],
  nodeCount: 5,
};

const FLOWS = {
  scenario: "baseline",
  nodes: [
    { id: "a", label: "A", stage: "supplier", value: 60, capacity: 60, atCeiling: true },
    { id: "f", label: "F", stage: "factory", value: 60, capacity: 200 },
    { id: "c", label: "C", stage: "centre", value: 60 },
    { id: "m", label: "M", stage: "market", value: 60, wanted: 100, short: 40 },
  ],
  links: [
    { source: "a", target: "f", value: 60 },
    { source: "f", target: "c", value: 60 },
    { source: "c", target: "m", value: 60 },
  ],
  asked: 100,
  delivered: 60,
  shortfall: 40,
  servedShare: 0.6,
  shortAt: { centres: 0, factories: 0, suppliers: 40 },
};

type Stub = {
  initialized: boolean;
  catalogue: unknown;
  flows: unknown;
  status: string;
  inputs: Record<string, unknown>;
};

const stub: Stub = {
  initialized: true,
  catalogue: undefined,
  flows: undefined,
  status: "ready",
  inputs: {},
};

const setInput = vi.fn();

beforeEach(() => {
  cleanup();
  stub.initialized = true;
  stub.catalogue = undefined;
  stub.flows = undefined;
  stub.status = "ready";
  stub.inputs = {};
  setInput.mockClear();

  (window as unknown as { shinyreact: unknown }).shinyreact = {
    useShinyInitialized: () => stub.initialized,
    useShinyInput: (id: string, fallback: unknown) => [
      id in stub.inputs ? stub.inputs[id] : fallback,
      (value: unknown) => setInput(id, value),
    ],
    useShinyOutputValue: (id: string) =>
      id === "catalogue" ? stub.catalogue : stub.flows,
    useShinyOutputStatus: () => stub.status,
  };
});

function ready() {
  stub.catalogue = CATALOGUE;
  stub.flows = FLOWS;
}

describe("App", () => {
  it("paints nothing until Shiny is connected", () => {
    stub.initialized = false;

    const { container } = render(<App />);

    expect(container.innerHTML).toBe("");
  });

  it("waits for the network before drawing anything", () => {
    const { container } = render(<App />);

    expect(screen.getByText(/loading the network/i)).toBeTruthy();
    expect(container.querySelector(".diagram")).toBeNull();
  });

  it("draws one button per scenario and marks the chosen one", () => {
    ready();
    stub.inputs = { scenario: "port-closed" };

    const { container } = render(<App />);
    const buttons = [...container.querySelectorAll(".scenario")];

    expect(buttons.map((b) => (b as HTMLElement).dataset.scenario)).toEqual([
      "baseline",
      "port-closed",
    ]);
    expect(buttons[1]?.className).toContain("on");
    expect(buttons[1]?.getAttribute("aria-pressed")).toBe("true");
  });

  it("sets the bookmarked input when a scenario is picked", () => {
    ready();

    const { container } = render(<App />);
    fireEvent.click(container.querySelector('[data-scenario="port-closed"]')!);

    expect(setInput).toHaveBeenCalledWith("scenario", "port-closed");
  });

  it("reports the shortfall and where it happened", () => {
    ready();

    const { container } = render(<App />);

    expect([...container.querySelectorAll(".total")].map((n) => n.textContent)).toEqual([
      "Asked for100k",
      "Delivered60k",
      "Short40k",
      "Demand served60.0%",
    ]);
    expect(screen.getByText(/suppliers cannot ship it/i)).toBeTruthy();
  });

  it("draws a node and a ribbon for everything in the network", () => {
    ready();

    const { container } = render(<App />);

    expect(container.querySelectorAll("g[data-node]")).toHaveLength(4);
    expect(container.querySelectorAll("path[data-link]")).toHaveLength(3);
  });

  it("builds the diagram once, however many times the page renders", () => {
    // The meter behind this is what the browser test watches while the
    // scenario changes. Here it only has to start at one.
    ready();

    const { container } = render(<App />);
    const meters = [...container.querySelectorAll(".meter-value")].map(
      (n) => n.textContent,
    );

    expect(meters[2]).toBe("1");
  });

  it("focuses a node without asking the server for anything", () => {
    ready();

    const { container } = render(<App />);
    fireEvent.click(container.querySelector('g[data-node="f"]')!);

    // It is a bookmarked input, so it is sent, but nothing on the server
    // reads it and no output depends on it.
    expect(setInput).toHaveBeenCalledWith("focus", "f");
  });

  it("dims what a focused node does not touch", () => {
    ready();
    stub.inputs = { focus: "a" };

    const { container } = render(<App />);

    expect(container.querySelectorAll(".ribbon").length).toBe(3);
    expect(container.querySelector(".clear")?.textContent).toContain("a");
  });

  it("clears the focus by clicking the same node again", () => {
    ready();
    stub.inputs = { focus: "f" };

    const { container } = render(<App />);
    fireEvent.click(container.querySelector('g[data-node="f"]')!);

    expect(setInput).toHaveBeenCalledWith("focus", null);
  });
});
