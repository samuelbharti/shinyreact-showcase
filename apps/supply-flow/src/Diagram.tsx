import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

import { animate } from "motion";

import {
  blend,
  computeLayout,
  linkId,
  ribbonPath,
  touching,
  volume,
  type Flows,
  type Layout,
  type Stage,
} from "@/sankey";

const MARGIN = { top: 18, right: 130, bottom: 10, left: 110 };
const HEIGHT = 420;

/** How long a scenario takes to become the next one. */
export const TRANSITION_MS = 750;

export const STAGE_COLOUR: Record<Stage, string> = {
  supplier: "#2f6fed",
  factory: "#7c3aed",
  centre: "#0f7a4a",
  market: "#b45309",
};

function useWidth(): [React.RefObject<HTMLDivElement | null>, number] {
  const ref = useRef<HTMLDivElement | null>(null);
  // Never zero. A diagram that measures zero draws nothing and looks broken
  // rather than empty, and in a headless browser it never recovers.
  const [width, setWidth] = useState(880);

  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) return;

    const measure = () => setWidth(Math.max(420, Math.round(node.clientWidth)));
    measure();

    if (typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return [ref, width];
}

type DiagramProps = {
  flows: Flows;
  focus: string | null;
  onFocus: (id: string | null) => void;
  /** Bumped by the parent once per completed transition, for the meter. */
  onSettled?: () => void;
  /** Called once, on mount. The meter it feeds should never move again. */
  onMounted?: () => void;
};

export default function Diagram({
  flows,
  focus,
  onFocus,
  onSettled,
  onMounted,
}: DiagramProps) {
  const [box, width] = useWidth();
  const innerWidth = Math.max(320, width - MARGIN.left - MARGIN.right);
  const innerHeight = HEIGHT - MARGIN.top - MARGIN.bottom;

  const target = useMemo(
    () => computeLayout(flows, innerWidth, innerHeight),
    [flows, innerWidth, innerHeight],
  );

  // Where the diagram was when this change arrived. Held in a ref rather than
  // state because it is the starting point of an animation, not something the
  // render reads on its own.
  const previous = useRef<Layout | null>(null);
  const [progress, setProgress] = useState(1);

  // Reported once. If this ever counts past one, the diagram is being rebuilt
  // rather than moved, and the claim on the card is no longer true.
  useEffect(() => {
    onMounted?.();
    // Mount only. onMounted is deliberately not a dependency.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Which scenario the layout on screen belongs to.
  //
  // Keyed on the name rather than on the object, because a new object with
  // the same name is not a change worth watching. Both servers answer twice
  // at startup, once before the client has said which scenario it wants and
  // once after, and a resize produces a new layout for the same table as
  // well. A reader should see the diagram slide when they pick a scenario,
  // and at no other time.
  const shownScenario = useRef<string | null>(null);

  useEffect(() => {
    const sameData = shownScenario.current === flows.scenario;
    shownScenario.current = flows.scenario;

    // First paint has nothing to come from, so there is nothing to animate.
    if (!previous.current || sameData) {
      previous.current = target;
      setProgress(1);
      return;
    }

    setProgress(0);
    const playing = animate(0, 1, {
      duration: TRANSITION_MS / 1000,
      ease: [0.32, 0.72, 0, 1],
      onUpdate: (value: number) => setProgress(value),
      onComplete: () => {
        previous.current = target;
        setProgress(1);
        onSettled?.();
      },
    });

    return () => {
      // Interrupted by a newer scenario. Freeze where it got to, so the next
      // transition starts from what is on screen rather than snapping back.
      playing.stop();
    };
    // onSettled is deliberately not a dependency: it only reports.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  const shown = useMemo(
    () => blend(previous.current, target, progress),
    [target, progress],
  );

  const lit = useMemo(() => touching(flows, focus), [flows, focus]);
  const byId = useMemo(
    () => new Map(flows.nodes.map((node) => [node.id, node])),
    [flows],
  );

  return (
    <div className="diagram" ref={box} data-progress={progress >= 1 ? "settled" : "moving"}>
      <svg width={width} height={HEIGHT} role="img" aria-label="Supply network">
        <g transform={`translate(${MARGIN.left},${MARGIN.top})`}>
          {/* Ribbons first, so a node sits on top of what it touches. Every
              one is keyed by where it goes from and to, so React keeps the
              same path element across a scenario change and only its
              geometry moves. */}
          {[...shown.ribbons].map(([id, ribbon]) => {
            const [source, dest] = id.split(">");
            const dim = focus !== null && !(lit.has(source!) && lit.has(dest!));
            return (
              <path
                key={id}
                data-link={id}
                className={dim ? "ribbon dim" : "ribbon"}
                d={ribbonPath(ribbon)}
                fill={STAGE_COLOUR[byId.get(source!)?.stage ?? "supplier"]}
              />
            );
          })}

          {[...shown.nodes].map(([id, node]) => {
            const info = byId.get(id);
            if (!info) return null;
            const dim = focus !== null && !lit.has(id);
            const onLeft = info.stage === "supplier";
            const height = Math.max(0, node.y1 - node.y0);

            return (
              <g
                key={id}
                data-node={id}
                data-stage={info.stage}
                className={dim ? "node dim" : "node"}
                onClick={() => onFocus(focus === id ? null : id)}
              >
                <rect
                  x={node.x0}
                  y={node.y0}
                  width={Math.max(0, node.x1 - node.x0)}
                  height={height}
                  fill={STAGE_COLOUR[info.stage]}
                  className={info.atCeiling ? "block full" : "block"}
                />
                <text
                  className="label"
                  x={onLeft ? node.x0 - 8 : node.x1 + 8}
                  y={node.y0 + height / 2}
                  textAnchor={onLeft ? "end" : "start"}
                  dominantBaseline="middle"
                >
                  {info.label}
                  <tspan className="amount" dx="6">
                    {volume(info.value)}
                  </tspan>
                </text>
                {info.atCeiling ? (
                  <title>
                    {info.label} is at its ceiling of {volume(info.capacity ?? 0)}
                  </title>
                ) : null}
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}

export { linkId };
