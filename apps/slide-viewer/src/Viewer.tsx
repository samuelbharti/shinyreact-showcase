import OpenSeadragon from "openseadragon";
import { useCallback, useEffect, useRef } from "react";

import { paintTile, type Region, type Slide } from "@/tissue";

type ViewerProps = {
  slide: Slide;
  /** Jump here when it changes, or null to leave the view alone. */
  goTo: Region | null;
  onLevel: (level: number, tilesDrawn: number) => void;
  onPickRegion: (index: number) => void;
};

/**
 * OpenSeadragon, fed by a tile source that makes its tiles up.
 *
 * The viewer does not know the difference. It asks for level 14, column 9,
 * row 6, and gets a canvas back, exactly as it would from a server holding a
 * real pyramid.
 */
export default function Viewer({ slide, goTo, onLevel, onPickRegion }: ViewerProps) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const viewerRef = useRef<OpenSeadragon.Viewer | null>(null);
  const tilesDrawn = useRef(0);
  const live = useRef({ onLevel, onPickRegion, slide });
  live.current = { onLevel, onPickRegion, slide };

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const source = {
      width: slide.width,
      height: slide.height,
      tileSize: slide.tileSize,
      tileOverlap: 0,
      minLevel: 8,
      maxLevel: slide.maxLevel,

      // Required by the interface. Nothing fetches it: downloadTileStart
      // below answers before any request is made, so this is only ever a
      // key in the viewer's tile cache.
      getTileUrl(level: number, x: number, y: number) {
        return `procedural://${level}/${x}/${y}`;
      },

      // Where the tiles come from. OpenSeadragon accepts a 2D context as a
      // finished tile, so a canvas drawn here goes straight on screen with
      // no image decode in between.
      downloadTileStart(job: {
        src: string;
        finish: (data: unknown, request: unknown, type: string) => void;
      }) {
        const [, , levelText, columnText, rowText] = job.src.split("/");
        const canvas = document.createElement("canvas");
        canvas.width = slide.tileSize;
        canvas.height = slide.tileSize;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          job.finish(null, null, "error");
          return;
        }

        paintTile(
          ctx,
          live.current.slide,
          Number(levelText),
          Number(columnText),
          Number(rowText),
        );
        tilesDrawn.current += 1;
        job.finish(ctx, null, "context2d");
      },

      downloadTileAbort() {
        // Nothing to cancel: a tile is painted synchronously.
      },
    };

    const viewer = OpenSeadragon({
      element: host,
      tileSources: source as never,
      prefixUrl: "",
      showNavigator: true,
      navigatorPosition: "TOP_RIGHT",
      navigatorHeight: 90,
      navigatorWidth: 130,
      showNavigationControl: false,
      animationTime: 0.6,
      blendTime: 0.1,
      minZoomImageRatio: 0.6,
      maxZoomPixelRatio: 2.5,
      visibilityRatio: 0.7,
      constrainDuringPan: true,
      // The background outside the slide, and the colour a tile shows before
      // it is painted. Matching the glass keeps the edges quiet.
      immediateRender: false,
    });
    viewerRef.current = viewer;

    const report = () => {
      // OpenSeadragon counts levels from the top of its own pyramid, which
      // is the same numbering the server used for maxLevel.
      const zoom = viewer.viewport.getZoom(true);
      const containerWidth = viewer.viewport.getContainerSize().x;
      const pixelsPerSlidePixel = (zoom * containerWidth) / live.current.slide.width;
      const level = Math.round(
        live.current.slide.maxLevel + Math.log2(Math.max(1e-9, pixelsPerSlidePixel)),
      );
      live.current.onLevel(
        Math.max(0, Math.min(live.current.slide.maxLevel, level)),
        tilesDrawn.current,
      );
    };

    viewer.addHandler("animation-finish", report);
    viewer.addHandler("open", report);

    return () => {
      viewer.destroy();
      viewerRef.current = null;
    };
    // Rebuilt only if the slide itself changes, which it does not. Rebuilding
    // on any prop change would throw away the viewer and the reader's place
    // in it.
  }, [slide]);

  // Draw the flagged regions as overlays once the image is open.
  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer) return;

    const addOverlays = () => {
      viewer.clearOverlays();
      for (const region of slide.regions) {
        const marker = document.createElement("button");
        marker.type = "button";
        marker.className = "roi";
        marker.title = region.label;
        marker.setAttribute("aria-label", region.label);
        marker.addEventListener("click", (event) => {
          event.stopPropagation();
          live.current.onPickRegion(region.index);
        });

        viewer.addOverlay({
          element: marker,
          location: viewer.viewport.imageToViewportRectangle(
            new OpenSeadragon.Rect(region.x, region.y, region.width, region.height),
          ),
        });
      }
    };

    if (viewer.world.getItemCount() > 0) addOverlays();
    else viewer.addOnceHandler("open", addOverlays);
  }, [slide]);

  // Fly to a region when one is chosen from the list.
  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer || !goTo || viewer.world.getItemCount() === 0) return;

    // A little margin, so the region is not pressed against the edge.
    const margin = Math.max(goTo.width, goTo.height) * 1.4;
    viewer.viewport.fitBounds(
      viewer.viewport.imageToViewportRectangle(
        new OpenSeadragon.Rect(
          goTo.x - margin / 2,
          goTo.y - margin / 2,
          goTo.width + margin,
          goTo.height + margin,
        ),
      ),
    );
  }, [goTo]);

  const handleKey = useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
    const viewer = viewerRef.current;
    if (!viewer) return;
    // OpenSeadragon handles the mouse. The keyboard is ours, so the viewer
    // can be driven without a pointing device.
    if (event.key === "+" || event.key === "=") viewer.viewport.zoomBy(1.4);
    else if (event.key === "-") viewer.viewport.zoomBy(1 / 1.4);
    else if (event.key === "0") viewer.viewport.goHome();
    else return;
    viewer.viewport.applyConstraints();
    event.preventDefault();
  }, []);

  return (
    <div
      className="viewer"
      ref={hostRef}
      tabIndex={0}
      onKeyDown={handleKey}
      role="application"
      aria-label="Whole slide viewer. Plus and minus zoom, zero resets."
    />
  );
}
