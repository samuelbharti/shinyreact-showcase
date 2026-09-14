// Drawing the slide, one tile at a time.
//
// There is no image. The server sent eight tissue lobes and a seed, and every
// pixel below is worked out from those, at whatever zoom level the viewer
// asked for. That is the whole claim: a server rendered image has one
// resolution, and this has as many as you like.
//
// Two regimes, because one does not work at both ends:
//
//   Zoomed out, a tile pixel covers hundreds of slide pixels and a nucleus is
//   far smaller than a pixel. Drawing them individually would mean millions
//   of ellipses per tile for a result the eye reads as a smooth wash, so the
//   wash is drawn directly.
//
//   Zoomed in, a nucleus is several pixels across and its shape is the whole
//   point, so each one is drawn.

export type Lobe = {
  x: number;
  y: number;
  rx: number;
  ry: number;
  angle: number;
  density: number;
};

export type Slide = {
  width: number;
  height: number;
  tileSize: number;
  maxLevel: number;
  levels: number;
  micronsPerPixel: number;
  magnification: number;
  seed: number;
  gigapixels: number;
  lobes: Lobe[];
  regions: Region[];
};

export type Region = {
  index: number;
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
};

/** Slide pixels covered by one tile pixel at this level. */
export function downsampleAt(level: number, maxLevel: number): number {
  return 2 ** (maxLevel - level);
}

/** Below this many slide pixels per tile pixel, individual nuclei are drawn. */
const NUCLEUS_CUTOFF = 6;

/** Typical spacing between nuclei, in slide pixels. */
const NUCLEUS_SPACING = 26;

/** A repeatable value in 0 to 1 from two integers and a salt. */
export function hash2(x: number, y: number, salt: number): number {
  const raw = Math.sin(x * 127.1 + y * 311.7 + salt * 74.7) * 43758.5453;
  return raw - Math.floor(raw);
}

/** Smooth value noise, bilinear between lattice points. */
export function noise2(x: number, y: number, salt: number): number {
  const ix = Math.floor(x);
  const iy = Math.floor(y);
  const fx = x - ix;
  const fy = y - iy;
  // Smoothstep, so the lattice does not show as a grid of diamonds.
  const ux = fx * fx * (3 - 2 * fx);
  const uy = fy * fy * (3 - 2 * fy);

  const a = hash2(ix, iy, salt);
  const b = hash2(ix + 1, iy, salt);
  const c = hash2(ix, iy + 1, salt);
  const d = hash2(ix + 1, iy + 1, salt);

  return (
    a * (1 - ux) * (1 - uy) + b * ux * (1 - uy) + c * (1 - ux) * uy + d * ux * uy
  );
}

/**
 * How much tissue sits at a point, 0 for bare glass and 1 for dense tissue.
 *
 * `sx` and `sy` are fractions of the slide, so this is resolution free: the
 * same point gives the same answer at every zoom level, which is what stops
 * the tissue shifting as you zoom.
 */
export function tissueAt(sx: number, sy: number, lobes: Lobe[]): number {
  let cover = 0;
  for (const lobe of lobes) {
    const radians = (lobe.angle * Math.PI) / 180;
    const dx = sx - lobe.x;
    const dy = sy - lobe.y;
    const rx = (dx * Math.cos(radians) + dy * Math.sin(radians)) / lobe.rx;
    const ry = (-dx * Math.sin(radians) + dy * Math.cos(radians)) / lobe.ry;
    const distance = Math.sqrt(rx * rx + ry * ry);
    if (distance < 1.35) {
      // Soft edge, so a lobe fades into glass rather than stopping at a line.
      cover = Math.max(cover, lobe.density * (1 - Math.min(1, distance / 1.35) ** 1.7));
    }
  }
  if (cover <= 0) return 0;

  // Two octaves of noise break the ellipse up into something that reads as
  // tissue. Without them the lobes look like what they are.
  const rough =
    noise2(sx * 90, sy * 90, 1) * 0.6 + noise2(sx * 260, sy * 260, 2) * 0.4;
  return Math.max(0, Math.min(1, cover * (0.55 + rough * 0.9)));
}

/**
 * Paint one tile.
 *
 * `level` and the tile column and row are what OpenSeadragon asks for. What
 * comes back is a canvas it can put on screen.
 */
export function paintTile(
  ctx: CanvasRenderingContext2D,
  slide: Slide,
  level: number,
  column: number,
  row: number,
): void {
  const size = slide.tileSize;
  const scale = downsampleAt(level, slide.maxLevel);
  const originX = column * size * scale;
  const originY = row * size * scale;

  // Bare glass, which is what a scanner records outside the tissue.
  ctx.fillStyle = "#f4eff5";
  ctx.fillRect(0, 0, size, size);

  drawTissueWash(ctx, slide, originX, originY, scale, size);

  if (scale <= NUCLEUS_CUTOFF) {
    drawNuclei(ctx, slide, originX, originY, scale, size);
  }
}

/**
 * The stain, drawn on a coarse grid and scaled up.
 *
 * A 32 by 32 grid stretched over the tile rather than 65,536 per pixel
 * evaluations. The tissue wash has no detail finer than this anyway, and the
 * nuclei that do are drawn separately on top.
 */
function drawTissueWash(
  ctx: CanvasRenderingContext2D,
  slide: Slide,
  originX: number,
  originY: number,
  scale: number,
  size: number,
): void {
  const grid = 32;
  const patch = ctx.createImageData(grid, grid);
  const step = (size * scale) / grid;

  for (let gy = 0; gy < grid; gy += 1) {
    for (let gx = 0; gx < grid; gx += 1) {
      const sx = (originX + gx * step) / slide.width;
      const sy = (originY + gy * step) / slide.height;
      const amount = tissueAt(sx, sy, slide.lobes);
      const at = (gy * grid + gx) * 4;

      if (amount <= 0.02) {
        patch.data[at] = 244;
        patch.data[at + 1] = 239;
        patch.data[at + 2] = 245;
        patch.data[at + 3] = 255;
        continue;
      }

      // Haematoxylin and eosin: blue purple nuclei on pink cytoplasm. The
      // wash is the pink, darkening where the tissue is dense.
      patch.data[at] = Math.round(244 - amount * 40);
      patch.data[at + 1] = Math.round(239 - amount * 105);
      patch.data[at + 2] = Math.round(245 - amount * 70);
      patch.data[at + 3] = 255;
    }
  }

  // Draw through a small offscreen canvas so the browser interpolates it up
  // to tile size. putImageData ignores transforms and would give 32 blocks.
  const small = document.createElement("canvas");
  small.width = grid;
  small.height = grid;
  small.getContext("2d")!.putImageData(patch, 0, 0);

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(small, 0, 0, grid, grid, 0, 0, size, size);
}

/**
 * Individual nuclei, once they are big enough to see.
 *
 * Placed on a lattice of cells rather than at random, so only the cells
 * overlapping this tile have to be considered. The alternative is deciding
 * where every nucleus on a 6 gigapixel slide sits, every time a tile is
 * drawn.
 */
function drawNuclei(
  ctx: CanvasRenderingContext2D,
  slide: Slide,
  originX: number,
  originY: number,
  scale: number,
  size: number,
): void {
  const coveredSlidePx = size * scale;
  const firstCell = Math.floor(originX / NUCLEUS_SPACING) - 1;
  const lastCell = Math.ceil((originX + coveredSlidePx) / NUCLEUS_SPACING) + 1;
  const firstRow = Math.floor(originY / NUCLEUS_SPACING) - 1;
  const lastRow = Math.ceil((originY + coveredSlidePx) / NUCLEUS_SPACING) + 1;

  for (let cy = firstRow; cy <= lastRow; cy += 1) {
    for (let cx = firstCell; cx <= lastCell; cx += 1) {
      const jitterX = hash2(cx, cy, 11);
      const jitterY = hash2(cx, cy, 12);
      const slideX = (cx + jitterX) * NUCLEUS_SPACING;
      const slideY = (cy + jitterY) * NUCLEUS_SPACING;

      const amount = tissueAt(slideX / slide.width, slideY / slide.height, slide.lobes);
      // Denser tissue means more nuclei survive the draw, which is what makes
      // a tumour nest look like one.
      if (hash2(cx, cy, 13) > amount * 1.05) continue;

      const radius = (3.4 + hash2(cx, cy, 14) * 3.6) / scale;
      if (radius < 0.35) continue;

      const elongation = 0.6 + hash2(cx, cy, 15) * 0.7;
      const angle = hash2(cx, cy, 16) * Math.PI;
      const ink = 0.55 + hash2(cx, cy, 17) * 0.45;

      ctx.save();
      ctx.translate((slideX - originX) / scale, (slideY - originY) / scale);
      ctx.rotate(angle);
      ctx.beginPath();
      ctx.ellipse(0, 0, radius, radius * elongation, 0, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(72, 48, 122, ${ink.toFixed(3)})`;
      ctx.fill();
      ctx.restore();
    }
  }
}
