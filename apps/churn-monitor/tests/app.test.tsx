// Layer three, second half: the page.
//
// App.tsx reads everything through the hooks on window.shinyreact, so a stub
// global is the whole harness. What is worth checking here is the wiring a
// screenshot cannot show: that the first paint is gated, that moving a slider
// changes every number without the compare image existing at all, and that
// the server image appears only when it is asked for.
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import App from "../src/App";

function packed(values: number[]): string {
  const bytes = new Uint8Array(Uint16Array.from(values).buffer);
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary);
}

function packedBytes(values: number[]): string {
  let binary = "";
  for (const value of values) binary += String.fromCharCode(value);
  return btoa(binary);
}

const SCALE = 100;

const SCORES = {
  customers: 10,
  scoreScale: SCALE,
  score: packed([10, 20, 30, 40, 50, 60, 70, 80, 90, 100]),
  left: packedBytes([0, 0, 0, 1, 0, 1, 0, 1, 1, 1]),
};

const SUMMARY = {
  customers: 10,
  left: 5,
  stayed: 5,
  baseRate: 0.5,
  scoreScale: SCALE,
  auc: 0.76,
  defaultMissCost: 220,
  defaultOfferCost: 25,
  curves: {
    thresholds: [0, 50, 100],
    recall: [1, 0.8, 0.2],
    falsePositiveRate: [1, 0.4, 0],
    precision: [0.5, 0.667, 1],
  },
};

type Stub = {
  initialized: boolean;
  summary: unknown;
  scores: unknown;
  panels: unknown;
  status: string;
  inputs: Record<string, unknown>;
};

const stub: Stub = {
  initialized: true,
  summary: undefined,
  scores: undefined,
  panels: undefined,
  status: "ready",
  inputs: {},
};

const setInput = vi.fn();

beforeEach(() => {
  // vitest runs with globals off, so testing-library does not clean up on its
  // own. Without this, one test sees the DOM the previous one left.
  cleanup();
  stub.initialized = true;
  stub.summary = undefined;
  stub.scores = undefined;
  stub.panels = undefined;
  stub.status = "ready";
  stub.inputs = {};
  setInput.mockClear();

  // Only the hooks App.tsx actually calls. A narrower stub fails loudly when
  // the component starts reading something new, which is the point.
  (window as unknown as { shinyreact: unknown }).shinyreact = {
    useShinyInitialized: () => stub.initialized,
    useShinyInput: (id: string, fallback: unknown) => [
      id in stub.inputs ? stub.inputs[id] : fallback,
      (value: unknown) => setInput(id, value),
    ],
    useShinyOutputValue: (id: string) =>
      id === "summary" ? stub.summary : id === "scores" ? stub.scores : stub.panels,
    useShinyOutputStatus: () => stub.status,
    ImageOutput: ({ id, className }: { id: string; className?: string }) => (
      <img id={id} className={className} alt="" />
    ),
  };
});

function ready() {
  stub.summary = SUMMARY;
  stub.scores = SCORES;
}

const text = (container: HTMLElement, selector: string) =>
  [...container.querySelectorAll(selector)].map((n) => n.textContent);

describe("App", () => {
  it("paints nothing until Shiny is connected", () => {
    stub.initialized = false;

    const { container } = render(<App />);

    expect(container.innerHTML).toBe("");
  });

  it("waits for the scores before drawing anything", () => {
    const { container } = render(<App />);

    expect(screen.getByText(/loading the scores/i)).toBeTruthy();
    expect(container.querySelectorAll(".panel")).toHaveLength(0);
    expect(container.querySelectorAll(".slider")).toHaveLength(0);
  });

  it("draws all four panels and three sliders once the scores arrive", () => {
    ready();

    const { container } = render(<App />);

    expect(
      [...container.querySelectorAll(".panel")].map((n) => (n as HTMLElement).dataset.panel),
    ).toEqual(["scores", "roc", "rates", "cost"]);
    expect(
      [...container.querySelectorAll(".slider")].map((n) => (n as HTMLElement).dataset.slider),
    ).toEqual(["threshold", "miss", "offer"]);
  });

  it("works out the confusion matrix from the payload, not from the server", () => {
    // The threshold defaults to 3000, which on this ten point scale is above
    // everything, so start it somewhere the numbers can be checked by hand.
    ready();
    stub.inputs = { threshold: 60, miss_cost: 10, offer_cost: 2 };

    const { container } = render(<App />);

    expect(text(container, ".cell")).toEqual([
      "4Flagged and left",
      "1Flagged, would have stayed",
      "1Missed, and left",
      "4Left alone, and stayed",
    ]);
  });

  it("shows the metrics for the threshold it was given", () => {
    ready();
    stub.inputs = { threshold: 60, miss_cost: 10, offer_cost: 2 };

    const { container } = render(<App />);
    const shown = text(container, ".metric");

    expect(shown[0]).toContain("5");
    expect(shown[1]).toContain("80.0%");
    expect(shown[2]).toContain("80.0%");
    expect(shown[4]).toContain("£12");
  });

  it("moves the threshold without going near the server", () => {
    // The whole claim, as one assertion. The slider sets a Shiny input, which
    // is how the compare path can draw the same picture later, but nothing on
    // this page waits for an answer before updating.
    ready();
    stub.inputs = { threshold: 20, miss_cost: 10, offer_cost: 2 };

    const { container } = render(<App />);
    const before = text(container, ".cell");

    const slider = container.querySelector(
      '[data-slider="threshold"] input',
    ) as HTMLInputElement;
    fireEvent.change(slider, { target: { value: "80" } });

    expect(setInput).toHaveBeenCalledWith("threshold", 80);

    // And rendering at the new value gives different numbers, computed here.
    stub.inputs = { threshold: 80, miss_cost: 10, offer_cost: 2 };
    cleanup();
    const again = render(<App />);
    expect(text(again.container, ".cell")).not.toEqual(before);
  });

  it("follows the cheapest threshold when a cost changes", () => {
    ready();
    stub.inputs = { threshold: 60, miss_cost: 10, offer_cost: 2 };
    const cheap = render(<App />);
    const cheapBest = text(cheap.container, ".metric")[5];

    cleanup();
    stub.inputs = { threshold: 60, miss_cost: 10, offer_cost: 40 };
    const dear = render(<App />);

    expect(text(dear.container, ".metric")[5]).not.toEqual(cheapBest);
  });

  it("does not mount the server image until the comparison is asked for", () => {
    ready();
    stub.inputs = { threshold: 60, miss_cost: 10, offer_cost: 2, compare: false };

    const { container } = render(<App />);

    expect(container.querySelector(".shot")).toBeNull();
    expect(screen.getByText(/every slider move since has been arithmetic/i)).toBeTruthy();
  });

  it("mounts the server image once the comparison is on", () => {
    ready();
    stub.inputs = { threshold: 60, miss_cost: 10, offer_cost: 2, compare: true };

    const { container } = render(<App />);

    expect(container.querySelector(".shot")).toBeTruthy();
    expect(container.querySelector(".server-path")).toBeTruthy();
  });

  it("dims the server image while it redraws, without unmounting it", () => {
    ready();
    stub.inputs = { threshold: 60, miss_cost: 10, offer_cost: 2, compare: true };
    stub.status = "recalculating";

    const { container } = render(<App />);

    // The image stays. Swapping in a skeleton would make every slider step
    // flash, which would be a worse comparison than the one being made.
    const shot = container.querySelector(".shot");
    expect(shot).toBeTruthy();
    expect(shot?.className).toContain("recalculating");
  });

  it("counts server answers rather than renders", () => {
    ready();

    const { container } = render(<App />);

    expect(text(container, ".meter-value")[1]).toBe("2");
  });

  it("counts the compare image as an answer, because that is what it is", () => {
    ready();
    stub.panels = { src: "data:image/png;base64,AAAA" };
    stub.inputs = { compare: true };

    const { container } = render(<App />);

    expect(text(container, ".meter-value")[1]).toBe("3");
  });

  it("says the recompute was too fast to time rather than inventing a number", () => {
    // Chrome coarsens performance.now() to a tenth of a millisecond, so this
    // arithmetic measures as zero. Printing a measured looking number would
    // be the wrong kind of confident.
    ready();

    const { container } = render(<App />);

    expect(text(container, ".meter-value")[2]).toBe("under 100 us");
  });
});
