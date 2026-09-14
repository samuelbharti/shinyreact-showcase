// Layer three, second half: the page.
//
// App.tsx reads everything through the hooks on window.shinyreact, so a stub
// global is the whole harness. What is worth checking here is the wiring the
// screenshots cannot show: that the first paint is gated, that the round trip
// meter counts answers from the server rather than renders, and that the page
// says plainly when the server's numbers belong to an older brush than the
// one on screen.
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import App from "../src/App";

function packed(values: number[]): string {
  const bytes = new Uint8Array(Int16Array.from(values).buffer);
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary);
}

function packedBytes(values: number[]): string {
  let binary = "";
  for (const value of values) binary += String.fromCharCode(value);
  return btoa(binary);
}

const SCALES = {
  colour: 1000,
  absolute: 100,
  longitude: 100,
  latitude: 100,
  logDistance: 1000,
  apparent: 100,
};

const CATALOGUE = {
  stars: 6,
  scales: SCALES,
  colour: packed([-300, 0, 500, 1000, 1500, 1900]),
  absolute: packed([-400, 0, 300, 600, 900, 1500]),
  longitude: packed([-18000, -9000, 0, 4500, 9000, 18000]),
  latitude: packed([-8000, -400, 0, 100, 400, 8000]),
  logDistance: packed([100, 500, 1000, 2000, 3000, 4000]),
  apparent: packed([400, 600, 800, 1000, 1100, 1150]),
  population: packedBytes([0, 0, 1, 1, 2, 2]),
};

const SUMMARY = {
  stars: 6,
  populations: ["Main sequence", "Giants", "White dwarfs"],
  populationCounts: [2, 2, 2],
  apparentLimit: 11.5,
  scales: SCALES,
  ranges: {
    colour: { min: -0.3, max: 1.9 },
    absolute: { min: -4, max: 15 },
    longitude: { min: -180, max: 180 },
    latitude: { min: -80, max: 80 },
    logDistance: { min: 0.1, max: 4 },
    apparent: { min: 4, max: 11.5 },
  },
};

type Stub = {
  initialized: boolean;
  asked: unknown;
  summary: unknown;
  catalogue: unknown;
  fitted: unknown;
  status: string;
};

const stub: Stub = {
  initialized: true,
  asked: undefined,
  summary: undefined,
  catalogue: undefined,
  fitted: undefined,
  status: "ready",
};

const setBrushes = vi.fn();

beforeEach(() => {
  // vitest runs with globals off, so testing-library does not clean up on its
  // own. Without this, one test sees the DOM the previous one left.
  cleanup();
  stub.initialized = true;
  stub.asked = undefined;
  stub.summary = undefined;
  stub.catalogue = undefined;
  stub.fitted = undefined;
  stub.status = "ready";
  setBrushes.mockClear();

  // Only the hooks App.tsx actually calls. A narrower stub fails loudly when
  // the component starts reading something new, which is the point.
  (window as unknown as { shinyreact: unknown }).shinyreact = {
    useShinyInitialized: () => stub.initialized,
    useShinyInput: (_id: string, fallback: unknown) => [fallback, setBrushes],
    useShinyInputValue: () => stub.asked,
    useSetShinyInput: () => setBrushes,
    useShinyOutputValue: (id: string) =>
      id === "summary" ? stub.summary : id === "catalogue" ? stub.catalogue : stub.fitted,
    useShinyOutputStatus: () => stub.status,
  };
});

function ready() {
  stub.summary = SUMMARY;
  stub.catalogue = CATALOGUE;
}

describe("App", () => {
  it("paints nothing until Shiny is connected", () => {
    stub.initialized = false;

    const { container } = render(<App />);

    expect(container.innerHTML).toBe("");
  });

  it("waits for the catalogue before drawing any panel", () => {
    const { container } = render(<App />);

    expect(screen.getByText(/loading the catalogue/i)).toBeTruthy();
    expect(container.querySelectorAll(".panel")).toHaveLength(0);
  });

  it("draws all four panels once the catalogue arrives", () => {
    ready();

    const { container } = render(<App />);

    const panels = [...container.querySelectorAll(".panel")].map(
      (node) => (node as HTMLElement).dataset.panel,
    );
    expect(panels).toEqual(["hr", "sky", "distance", "apparent"]);
  });

  it("counts every star before anything is brushed", () => {
    ready();

    const { container } = render(<App />);

    expect(container.querySelector(".side .headline")?.textContent).toBe("6 stars");
    const mix = [...container.querySelectorAll(".mix li")].map((n) => n.textContent);
    expect(mix).toEqual(["Main sequence2", "Giants2", "White dwarfs2"]);
  });

  it("counts server answers rather than renders", () => {
    // The summary and the catalogue, and nothing else yet.
    ready();

    const { container } = render(<App />);
    const trips = () =>
      [...container.querySelectorAll(".meter-value")].map((n) => n.textContent)[1];

    expect(trips()).toBe("2");
  });

  it("counts an empty fit as an answer, because the server did answer", () => {
    // With no brush the server returns nothing, and returning nothing is
    // still a message. The browser shows three round trips at load for this
    // reason, and a meter that hid one would be lying about the cost.
    ready();
    stub.fitted = null;

    const { container } = render(<App />);
    const meters = [...container.querySelectorAll(".meter-value")].map(
      (n) => n.textContent,
    );

    expect(meters[1]).toBe("3");
  });

  it("says nothing has been asked for until a brush is released", () => {
    ready();

    render(<App />);

    expect(screen.getByText(/nothing asked for yet/i)).toBeTruthy();
  });

  it("marks the server numbers as matching when the counts agree", () => {
    ready();
    stub.fitted = {
      stars: 6,
      populations: SUMMARY.populations,
      populationCounts: [2, 2, 2],
      medianParsecs: 100,
      colourRange: [-0.3, 1.9],
      fit: { slope: 4.6, intercept: 10.84, scatter: 0.44, correlation: 0.94 },
    };

    const { container } = render(<App />);

    expect(container.querySelector(".agree")?.textContent).toBe("same selection");
    const numbers = [...container.querySelectorAll(".numbers li")].map(
      (n) => n.textContent,
    );
    expect(numbers[0]).toContain("4.600");
    expect(numbers[4]).toContain("100 pc");
  });

  it("names the panels the server was actually asked about", () => {
    // AskedAbout reads the "brushes" input without owning it, so the label
    // belongs to the answer rather than to whatever the pointer is doing now.
    ready();
    stub.asked = { hr: { x0: 0, x1: 1, y0: 2, y1: 3 }, distance: { x0: 0, x1: 1 } };
    stub.fitted = {
      stars: 6,
      populations: SUMMARY.populations,
      populationCounts: [2, 2, 2],
      medianParsecs: 100,
      colourRange: [-0.3, 1.9],
      fit: { slope: 4.6, intercept: 10.84, scatter: 0.44, correlation: 0.94 },
    };

    const { container } = render(<App />);

    const chips = [...container.querySelectorAll(".chip")].map((n) => n.textContent);
    expect(chips).toEqual(["colour and brightness", "distance"]);
  });

  it("says nothing about panels when the server has not been asked yet", () => {
    ready();
    stub.asked = null;
    stub.fitted = {
      stars: 6,
      populations: SUMMARY.populations,
      populationCounts: [2, 2, 2],
      medianParsecs: 100,
      colourRange: [-0.3, 1.9],
      fit: { slope: 4.6, intercept: 10.84, scatter: 0.44, correlation: 0.94 },
    };

    const { container } = render(<App />);

    expect(container.querySelectorAll(".chip")).toHaveLength(0);
  });

  it("says so when the server answered about a different brush", () => {
    ready();
    stub.fitted = {
      stars: 2,
      populations: SUMMARY.populations,
      populationCounts: [2, 0, 0],
    };

    const { container } = render(<App />);

    expect(container.querySelector(".stale")?.textContent).toBe("brush moved since");
  });

  it("reports a selection the server could not fit without pretending it did", () => {
    ready();
    stub.fitted = {
      stars: 2,
      populations: SUMMARY.populations,
      populationCounts: [2, 0, 0],
    };

    const { container } = render(<App />);

    expect(container.querySelectorAll(".numbers li")).toHaveLength(0);
    expect(screen.getByText(/too few stars/i)).toBeTruthy();
  });

  it("dims the server panel while it recalculates, without unmounting it", () => {
    ready();
    stub.fitted = {
      stars: 6,
      populations: SUMMARY.populations,
      populationCounts: [2, 2, 2],
      medianParsecs: 100,
      colourRange: [-0.3, 1.9],
      fit: { slope: 4.6, intercept: 10.84, scatter: 0.44, correlation: 0.94 },
    };
    stub.status = "recalculating";

    const { container } = render(<App />);

    // The numbers stay on screen. Swapping in a skeleton would make every
    // released brush flash.
    expect(container.querySelectorAll(".numbers li")).toHaveLength(5);
    expect(container.querySelector(".side.waiting")).toBeTruthy();
  });

  it("leaves the clear button dead until something is brushed", () => {
    ready();

    const { container } = render(<App />);
    const button = container.querySelector(".toolbar button") as HTMLButtonElement;

    expect(button.disabled).toBe(true);
    expect(button.textContent).toBe("Clear all");
  });

  it("sends null to the server when the brushes are cleared", () => {
    ready();

    const { container } = render(<App />);
    const target = container.querySelector(
      '.panel[data-panel="distance"] .brush-target',
    ) as SVGRectElement;

    fireEvent.pointerDown(target, { clientX: 10, clientY: 5, pointerId: 1 });
    fireEvent.pointerMove(target, { clientX: 90, clientY: 5, pointerId: 1 });
    fireEvent.pointerUp(target, { clientX: 90, clientY: 5, pointerId: 1 });

    const button = container.querySelector(".toolbar button") as HTMLButtonElement;
    expect(button.disabled).toBe(false);

    fireEvent.click(button);
    expect(setBrushes).toHaveBeenLastCalledWith(null);
  });

  it("does not touch the server while the pointer is down", () => {
    // The whole claim, as one assertion. Moving the pointer changes the page
    // and sends nothing; only letting go does.
    ready();

    const { container } = render(<App />);
    const target = container.querySelector(
      '.panel[data-panel="hr"] .brush-target',
    ) as SVGRectElement;

    fireEvent.pointerDown(target, { clientX: 10, clientY: 10, pointerId: 1 });
    for (let x = 20; x <= 120; x += 10) {
      fireEvent.pointerMove(target, { clientX: x, clientY: 60, pointerId: 1 });
    }

    expect(setBrushes).not.toHaveBeenCalled();

    fireEvent.pointerUp(target, { clientX: 120, clientY: 60, pointerId: 1 });

    expect(setBrushes).toHaveBeenCalledTimes(1);
  });
});
