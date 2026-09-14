import type { ResidueRow } from "@/Structure";

const STRUCTURE_COLORS: Record<string, string> = {
  helix: "#d9534f",
  sheet: "#f0ad4e",
  coil: "#9aa3ae",
};

/**
 * Turn a style name and a colour mode into a 3Dmol style object.
 *
 * The colour data all came from the server, worked out once when it parsed
 * the file. The client only has to map a number onto a colour.
 */
export function buildStyle(style: string, colorMode: string, residues: ResidueRow[]) {
  const spec: Record<string, unknown> = {};

  if (colorMode === "spectrum") {
    spec.color = "spectrum";
  } else if (colorMode === "secondary structure") {
    const byResidue = new Map(residues.map((r) => [r.number, r.structure]));
    spec.colorfunc = (atom: { resi?: number }) =>
      STRUCTURE_COLORS[byResidue.get(atom.resi ?? -1) ?? "coil"] ?? "#9aa3ae";
  } else if (colorMode === "temperature factor") {
    const values = residues.map((r) => r.meanB);
    const low = Math.min(...values);
    const high = Math.max(...values);
    const byResidue = new Map(residues.map((r) => [r.number, r.meanB]));
    spec.colorfunc = (atom: { resi?: number }) =>
      rampBlueRed((byResidue.get(atom.resi ?? -1) ?? low - low) / (high - low || 1));
  } else {
    // Hydrophobicity, on the Kyte and Doolittle scale the server sent.
    const byResidue = new Map(residues.map((r) => [r.number, r.hydrophobicity]));
    spec.colorfunc = (atom: { resi?: number }) =>
      rampBlueRed(((byResidue.get(atom.resi ?? -1) ?? 0) + 4.5) / 9);
  }

  // Cartoon needs a thickness to look like anything; the atom styles need a
  // radius. Everything else is shared.
  if (style === "cartoon") return { cartoon: { ...spec, thickness: 0.3 } };
  if (style === "stick") return { stick: { ...spec, radius: 0.16 } };
  if (style === "sphere") return { sphere: { ...spec, scale: 0.32 } };
  return { line: { ...spec, linewidth: 1.6 } };
}

/** Blue through white to red, for a value already scaled to 0 to 1. */
export function rampBlueRed(t: number): string {
  const clamped = Math.max(0, Math.min(1, t));
  const red = Math.round(48 + clamped * 200);
  const green = Math.round(90 + (1 - Math.abs(clamped - 0.5) * 2) * 90);
  const blue = Math.round(248 - clamped * 200);
  return `rgb(${red},${green},${blue})`;
}
