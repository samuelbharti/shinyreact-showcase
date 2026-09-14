// Layer three: turning a colour mode into a 3Dmol style.
//
// All the chemistry came from the server, worked out once when it parsed the
// file. The client only maps a number onto a colour, and these are the
// functions that do it.
import { describe, expect, it } from "vitest";

import type { ResidueRow } from "../src/Structure";
import { buildStyle, rampBlueRed } from "../src/styles";

const RESIDUES: ResidueRow[] = [
  { number: 1, chain: "A", code: "MET", letter: "M", structure: "coil", meanB: 10, hydrophobicity: 1.9 },
  { number: 2, chain: "A", code: "ILE", letter: "I", structure: "helix", meanB: 20, hydrophobicity: 4.5 },
  { number: 3, chain: "A", code: "ASP", letter: "D", structure: "sheet", meanB: 30, hydrophobicity: -3.5 },
];

describe("buildStyle", () => {
  it("picks the representation 3Dmol was asked for", () => {
    expect(Object.keys(buildStyle("cartoon", "spectrum", RESIDUES))).toEqual(["cartoon"]);
    expect(Object.keys(buildStyle("stick", "spectrum", RESIDUES))).toEqual(["stick"]);
    expect(Object.keys(buildStyle("sphere", "spectrum", RESIDUES))).toEqual(["sphere"]);
  });

  it("falls back to lines for anything it does not know", () => {
    // The representation comes from a Shiny widget, and a widget can send
    // whatever it likes. Drawing nothing would look like a broken viewer.
    expect(Object.keys(buildStyle("nonsense", "spectrum", RESIDUES))).toEqual(["line"]);
  });

  it("uses 3Dmol's own spectrum rather than a colour function", () => {
    const style = buildStyle("cartoon", "spectrum", RESIDUES) as {
      cartoon: { color?: string; colorfunc?: unknown };
    };

    expect(style.cartoon.color).toBe("spectrum");
    expect(style.cartoon.colorfunc).toBeUndefined();
  });

  it("colours secondary structure from the table the server sent", () => {
    const style = buildStyle("cartoon", "secondary structure", RESIDUES) as {
      cartoon: { colorfunc: (atom: { resi: number }) => string };
    };

    expect(style.cartoon.colorfunc({ resi: 2 })).toBe("#d9534f");
    expect(style.cartoon.colorfunc({ resi: 3 })).toBe("#f0ad4e");
    expect(style.cartoon.colorfunc({ resi: 1 })).toBe("#9aa3ae");
  });

  it("gives an atom with no residue in the table a colour anyway", () => {
    // Waters and ligands are in the file but not in the residue table. A
    // colour function that returns undefined makes 3Dmol draw them black.
    const style = buildStyle("cartoon", "secondary structure", RESIDUES) as {
      cartoon: { colorfunc: (atom: { resi: number }) => string };
    };

    expect(style.cartoon.colorfunc({ resi: 9999 })).toBe("#9aa3ae");
  });

  it("spreads temperature factors across the ramp", () => {
    const style = buildStyle("cartoon", "temperature factor", RESIDUES) as {
      cartoon: { colorfunc: (atom: { resi: number }) => string };
    };

    const coldest = style.cartoon.colorfunc({ resi: 1 });
    const hottest = style.cartoon.colorfunc({ resi: 3 });

    expect(coldest).not.toBe(hottest);
    expect(coldest).toMatch(/^rgb\(/);
  });

  it("maps hydrophobicity across the Kyte and Doolittle range", () => {
    const style = buildStyle("cartoon", "hydrophobicity", RESIDUES) as {
      cartoon: { colorfunc: (atom: { resi: number }) => string };
    };

    // Isoleucine is the most hydrophobic residue there is, aspartate is
    // among the least. They must not come out the same colour.
    expect(style.cartoon.colorfunc({ resi: 2 })).not.toBe(
      style.cartoon.colorfunc({ resi: 3 }),
    );
  });
});

describe("rampBlueRed", () => {
  it("runs from blue to red", () => {
    expect(rampBlueRed(0)).toBe("rgb(48,90,248)");
    expect(rampBlueRed(1)).toBe("rgb(248,90,48)");
  });

  it("clamps anything outside zero to one", () => {
    // The scale comes from the data, and one outlier should not produce a
    // colour channel above 255.
    expect(rampBlueRed(-5)).toBe(rampBlueRed(0));
    expect(rampBlueRed(9)).toBe(rampBlueRed(1));
  });

  it("never produces a channel outside the byte range", () => {
    for (let i = -20; i <= 120; i += 1) {
      const channels = rampBlueRed(i / 100)
        .replace(/[^\d,]/g, "")
        .split(",")
        .map(Number);
      for (const channel of channels) {
        expect(channel).toBeGreaterThanOrEqual(0);
        expect(channel).toBeLessThanOrEqual(255);
      }
    }
  });
});
