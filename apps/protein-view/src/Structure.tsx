import * as $3Dmol from "3dmol";
import { useEffect, useRef } from "react";

import { buildStyle } from "@/styles";

export type ResidueRow = {
  number: number;
  chain: string;
  code: string;
  letter: string;
  structure: string;
  meanB: number;
  hydrophobicity: number;
};

type StructureProps = {
  /** The PDB file, exactly as the server read it. 3Dmol parses it itself. */
  text: string;
  residues: ResidueRow[];
  /** cartoon, stick, sphere or line. Comes from a real Shiny select. */
  style: string;
  /** How to colour it. Comes from React state. */
  colorMode: string;
  selected: number | null;
  onPickResidue: (number: number | null) => void;
  onReady: (ms: number) => void;
};

/**
 * 3Dmol.js, which has no Shiny binding and does not need one.
 *
 * In a plain Shiny app, using this library at all means writing an
 * htmlwidget: an R package with a JavaScript bundle, a binding, and a
 * release cycle. Here it is an npm install and a ref.
 */
export default function Structure({
  text,
  residues,
  style,
  colorMode,
  selected,
  onPickResidue,
  onReady,
}: StructureProps) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const viewerRef = useRef<ReturnType<typeof $3Dmol.createViewer> | null>(null);
  const live = useRef({ onPickResidue, onReady, residues });
  live.current = { onPickResidue, onReady, residues };

  // Build the viewer once and load the structure. Rebuilding it on a style
  // change would reset the camera, which is the thing the reader is holding.
  useEffect(() => {
    const host = hostRef.current;
    if (!host || !text) return;

    const started = performance.now();
    const viewer = $3Dmol.createViewer(host, { backgroundColor: "#0f1116" });
    viewerRef.current = viewer;

    viewer.addModel(text, "pdb");

    viewer.setClickable({}, true, (atom: { resi?: number }) => {
      live.current.onPickResidue(atom?.resi ?? null);
    });

    viewer.zoomTo();
    viewer.render();
    live.current.onReady(performance.now() - started);

    return () => {
      viewer.clear();
      viewerRef.current = null;
      host.replaceChildren();
    };
  }, [text]);

  // Style and colour are settings, so they repaint without reloading the
  // model or moving the camera.
  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer) return;

    viewer.setStyle({}, buildStyle(style, colorMode, residues));

    // The clicked residue keeps its own style on top, so it stays visible
    // whatever the rest is set to.
    if (selected !== null) {
      viewer.addStyle(
        { resi: selected },
        { stick: { radius: 0.28, color: "#4ad3ff" } },
      );
    }

    viewer.render();
  }, [style, colorMode, residues, selected]);

  // The active settings are mirrored onto the element, so what the viewer
  // was last told is readable without going through WebGL. Reading the
  // canvas back does work, but it only says the picture changed, not which
  // setting changed it, and that distinction is what separates "the viewer
  // ignored us" from "React never got the value" when something is wrong.
  return (
    <div
      className="structure"
      ref={hostRef}
      data-style={style}
      data-color-mode={colorMode}
      data-selected={selected ?? ""}
    />
  );
}
