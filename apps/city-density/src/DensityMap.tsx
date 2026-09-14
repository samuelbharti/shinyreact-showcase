import { HexagonLayer } from "@deck.gl/aggregation-layers";
import { MapView, type PickingInfo } from "@deck.gl/core";
import { GeoJsonLayer } from "@deck.gl/layers";
import DeckGL from "@deck.gl/react";
import { useCallback, useMemo, useRef } from "react";

import { radiusForZoom } from "@/decode";

export type ViewState = {
  longitude: number;
  latitude: number;
  zoom: number;
  pitch: number;
  bearing: number;
};

export type HexPick = { lng: number; lat: number; radius: number; count: number };

type DensityMapProps = {
  positions: Float32Array;
  count: number;
  boundary: unknown;
  viewState: ViewState;
  /** Hexagon width in screen pixels. The radius in metres follows the zoom. */
  binPixels: number;
  extruded: boolean;
  onViewState: (next: ViewState) => void;
  onPick: (pick: HexPick | null) => void;
  /** Milliseconds from rebuilding the layer to the frame that showed it. */
  onRebin: (ms: number) => void;
};

// Blue through yellow. Six stops is enough for a count ramp, and more only
// makes neighbouring bins harder to tell apart.
const COLOR_RANGE: [number, number, number][] = [
  [37, 60, 120],
  [42, 102, 168],
  [58, 150, 180],
  [110, 190, 150],
  [190, 214, 102],
  [253, 231, 76],
];

/**
 * Half a million trips, binned into hexagons.
 *
 * The binning is the point of this app. It reruns whenever the radius
 * changes, which is every zoom step, and none of it involves the server.
 */
export default function DensityMap({
  positions,
  count,
  boundary,
  viewState,
  binPixels,
  extruded,
  onViewState,
  onPick,
  onRebin,
}: DensityMapProps) {
  // When the current layer set was built, and whether its cost has been
  // reported yet. Refs, because timing a render must not cause one.
  const builtAt = useRef(0);
  const reported = useRef(true);
  const live = useRef({ onRebin, onPick });
  live.current = { onRebin, onPick };

  const radius = radiusForZoom(viewState.zoom, binPixels);

  const handlePick = useCallback((info: PickingInfo) => {
    const object = info.object as { position?: number[]; count?: number } | null;
    if (!object?.position) {
      live.current.onPick(null);
      return;
    }
    live.current.onPick({
      lng: object.position[0]!,
      lat: object.position[1]!,
      radius: (info.layer?.props as { radius?: number })?.radius ?? 0,
      count: object.count ?? 0,
    });
  }, []);

  // Rebuilt only when something the binning depends on changes. Panning
  // alone does not rebuild it, which is why panning is free.
  const layers = useMemo(() => {
    builtAt.current = performance.now();
    reported.current = false;

    return [
      new GeoJsonLayer({
        id: "boundary",
        data: boundary as never,
        stroked: true,
        filled: false,
        getLineColor: (feature: { properties?: { kind?: string } }) =>
          feature.properties?.kind === "river"
            ? [90, 140, 200, 190]
            : [130, 136, 148, 150],
        getLineWidth: (feature: { properties?: { kind?: string } }) =>
          feature.properties?.kind === "river" ? 60 : 30,
        lineWidthMinPixels: 1,
      }),
      new HexagonLayer({
        id: "trips",
        // Binary attributes rather than half a million objects. deck.gl
        // hands this straight to the GPU; the object form would cost about
        // 40 MB of heap and a collection pause on every rebin.
        data: {
          length: count,
          attributes: { getPosition: { value: positions, size: 3 } },
        } as never,
        radius,
        coverage: 0.92,
        // The trip distributions have long tails, so a handful of trips lands
        // almost everywhere and every bin is occupied. A linear ramp then
        // paints the whole map the same dark blue and the city disappears.
        // Ranking the bins instead shows the shape, and dropping the very
        // sparsest stops a single stray trip from drawing a hexagon.
        colorScaleType: "quantile",
        lowerPercentile: 12,
        elevationScale: extruded ? 18 : 0,
        extruded,
        pickable: true,
        colorRange: COLOR_RANGE,
        opacity: 0.82,
      }),
    ];
  }, [positions, count, boundary, radius, extruded]);

  const handleAfterRender = useCallback(() => {
    // The first frame after a rebuild is the one that paid for the rebin.
    if (reported.current) return;
    reported.current = true;
    live.current.onRebin(performance.now() - builtAt.current);
  }, []);

  return (
    <DeckGL
      views={new MapView({ repeat: false })}
      viewState={viewState}
      controller={{ dragRotate: extruded }}
      layers={layers}
      onViewStateChange={({ viewState: next }) => onViewState(next as ViewState)}
      onClick={handlePick}
      onAfterRender={handleAfterRender}
      getTooltip={({ object }) => {
        const hex = object as { count?: number } | null;
        return hex?.count
          ? { text: `${hex.count.toLocaleString("en-US")} trips in this hexagon` }
          : null;
      }}
      // deck.gl types this as CSSStyleDeclaration, where every value is a
      // string, rather than React CSSProperties.
      style={{ position: "absolute", inset: "0" }}
    />
  );
}
