// Layer three: the client. App.tsx reads everything through the hooks on
// window.shinyreact, so a stub global is the whole harness. This checks the
// behaviour that is easy to get wrong and invisible in a screenshot: the
// first paint is gated, and a recalculating output keeps the old chart on
// screen instead of flashing a skeleton.
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import App from "../src/App";

type Stub = {
  initialized: boolean;
  histogram: unknown;
  status: string;
};

const stub: Stub = { initialized: true, histogram: undefined, status: "ready" };
const setBins = vi.fn();

beforeEach(() => {
  stub.initialized = true;
  stub.histogram = undefined;
  stub.status = "ready";
  setBins.mockClear();

  // Only the hooks App.tsx actually calls. A narrower stub fails loudly when
  // the component starts reading something new, which is the point.
  (window as unknown as { shinyreact: unknown }).shinyreact = {
    useShinyInitialized: () => stub.initialized,
    useShinyInput: (_id: string, fallback: unknown) => [fallback, setBins],
    useShinyOutputValue: () => stub.histogram,
    useShinyOutputStatus: () => stub.status,
  };
});

describe("App", () => {
  it("paints nothing until Shiny is connected", () => {
    stub.initialized = false;

    const { container } = render(<App />);

    expect(container.innerHTML).toBe("");
  });

  it("shows a waiting message before the first value arrives", () => {
    render(<App />);

    expect(screen.getByText(/waiting for the server/i)).toBeTruthy();
  });

  it("draws one bar per bin once a value arrives", () => {
    stub.histogram = { breaks: [0, 1, 2, 3], counts: [2, 5, 1] };

    const { container } = render(<App />);

    expect(container.querySelectorAll("svg rect")).toHaveLength(3);
  });

  it("keeps the chart mounted and dims it while the server recalculates", () => {
    stub.histogram = { breaks: [0, 1, 2], counts: [1, 4] };
    stub.status = "recalculating";

    const { container } = render(<App />);

    // The chart must still be there. Swapping in a skeleton would tear down
    // the DOM and flash on every input change.
    expect(container.querySelectorAll("svg rect")).toHaveLength(2);
    expect(container.querySelector("svg")?.getAttribute("class")).toContain(
      "recalculating",
    );
  });
});
