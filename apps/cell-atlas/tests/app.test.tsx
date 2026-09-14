// Layer three, part two: the behavior that is easy to get wrong and hard to
// see in a screenshot.
//
// regl-scatterplot needs a real WebGL context, so it is stubbed here. What is
// under test is the wiring: what the component paints before Shiny connects,
// what it does while the server is recomputing, and whether a lasso reaches
// the server as the bytes the server expects.
import { cleanup, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { base64ToBytes } from "../src/decode";

const scatterProps: Record<string, unknown>[] = [];

vi.mock("../src/Scatter", () => ({
  default: (props: Record<string, unknown>) => {
    scatterProps.push(props);
    return <div data-testid="scatter" />;
  },
}));

const { default: App } = await import("../src/App");

type Stub = {
  initialized: boolean;
  atlas: unknown;
  expression: unknown;
  summary: unknown;
  status: string;
  error: { message: string } | null;
};

const stub: Stub = {
  initialized: true,
  atlas: undefined,
  expression: undefined,
  summary: undefined,
  status: "ready",
  error: null,
};

const setSelection = vi.fn();

// Two cells, so the payload is small enough to read in the test.
const atlasPayload = {
  n_cells: 2,
  bounds: [0, 0, 1, 1],
  genes: ["CD3D", "NKG7"],
  clusters: [
    { name: "A", color: "#111111", count: 1, profile: [1, 0] },
    { name: "B", color: "#222222", count: 1, profile: [0, 1] },
  ],
  x: Buffer.from(new Int16Array([-32767, 32767]).buffer).toString("base64"),
  y: Buffer.from(new Int16Array([-32767, 32767]).buffer).toString("base64"),
  cluster: Buffer.from(new Uint8Array([0, 1])).toString("base64"),
};

beforeEach(() => {
  // vitest runs with globals off, so testing-library does not clean up on
  // its own. Without this, one test sees the DOM the previous one left.
  cleanup();
  scatterProps.length = 0;
  setSelection.mockClear();
  Object.assign(stub, {
    initialized: true,
    atlas: undefined,
    expression: undefined,
    summary: undefined,
    status: "ready",
    error: null,
  });

  const outputs: Record<string, () => unknown> = {
    atlas_points: () => stub.atlas,
    gene_expression: () => stub.expression,
    selection_summary: () => stub.summary,
  };

  (window as unknown as { shinyreact: unknown }).shinyreact = {
    useShinyInitialized: () => stub.initialized,
    useShinyInput: (_id: string, fallback: unknown) => [fallback, vi.fn()],
    useSetShinyInput: () => setSelection,
    useShinyOutputValue: (id: string) => outputs[id]?.(),
    useShinyOutputStatus: () => stub.status,
    useShinyOutputError: () => stub.error,
  };
});

describe("App", () => {
  it("paints nothing until Shiny has connected", () => {
    stub.initialized = false;

    const { container } = render(<App />);

    expect(container.innerHTML).toBe("");
  });

  it("shows a loading state until the point cloud arrives", () => {
    render(<App />);

    expect(screen.getByText(/loading 200,000 cells/i)).toBeTruthy();
    expect(screen.queryByTestId("scatter")).toBeNull();
  });

  it("decodes the point cloud and hands it to the scatter", () => {
    stub.atlas = atlasPayload;

    render(<App />);

    const props = scatterProps.at(-1)!;
    const positions = props.positions as { x: Float32Array; y: Float32Array };
    expect(positions.x).toHaveLength(2);
    // The two cells sit at opposite corners of a square range.
    expect(positions.x[0]).toBeCloseTo(-1, 4);
    expect(positions.x[1]).toBeCloseTo(1, 4);
    expect(props.colorBy).toBe("z");
    expect(props.palette).toEqual(["#111111", "#222222"]);
  });

  it("builds the gene menu from what the server sent, not a hard coded list", () => {
    stub.atlas = atlasPayload;

    const { container } = render(<App />);

    const options = [...container.querySelectorAll(".toolbar select option")].map(
      (node) => node.textContent,
    );
    expect(options).toEqual(["Cluster", "CD3D", "NKG7"]);
  });

  it("sends a lasso to the server as little endian uint32 bytes", () => {
    stub.atlas = atlasPayload;
    render(<App />);

    const onSelect = scatterProps.at(-1)!.onSelect as (i: number[]) => void;
    onSelect([1, 258]);

    expect(setSelection).toHaveBeenCalledTimes(1);
    const encoded = setSelection.mock.calls[0]![0] as string;
    expect([...base64ToBytes(encoded)]).toEqual([1, 0, 0, 0, 2, 1, 0, 0]);
  });

  it("clears the selection on the server when the lasso is cleared", () => {
    stub.atlas = atlasPayload;
    render(<App />);

    const onDeselect = scatterProps.at(-1)!.onDeselect as () => void;
    onDeselect();

    expect(setSelection).toHaveBeenCalledWith("");
  });

  it("keeps the last summary on screen while the server recomputes", () => {
    // Unmounting the panel on every recalculation would make it flash on
    // each lasso. Dim it instead, and keep the numbers readable.
    stub.atlas = atlasPayload;
    stub.summary = { n: 12, composition: [], markers: [] };
    stub.status = "recalculating";

    const { container } = render(<App />);

    expect(screen.getByText("12")).toBeTruthy();
    expect(container.querySelector(".panel")?.className).toContain("recalculating");
  });

  it("shows the message from the server when a selection fails", () => {
    stub.atlas = atlasPayload;
    stub.error = { message: "selection is 3 bytes" };

    render(<App />);

    expect(screen.getByText(/selection is 3 bytes/)).toBeTruthy();
  });
});
