# Pure computation for the slide viewer. No Shiny here.
#
# The R twin of slide_viewer.py. There is no image file: the slide is 6.4
# gigapixels, so the server describes it in a couple of kilobytes and the
# browser draws every tile from that description.

WIDTH <- 98304L
HEIGHT <- 65536L
TILE_SIZE <- 256L
MICRONS_PER_PIXEL <- 0.25
MAGNIFICATION <- 40L

SEED <- 20260913L

# Tissue sits in lobes rather than covering the slide. The client draws the
# fine texture; these decide where there is anything to draw at all.
# x, y, radius x, radius y, rotation in degrees, density
LOBES <- list(
  c(0.30, 0.42, 0.20, 0.26, 18, 0.95),
  c(0.45, 0.30, 0.16, 0.13, -25, 0.88),
  c(0.62, 0.52, 0.19, 0.22, 40, 0.92),
  c(0.52, 0.68, 0.13, 0.11, 5, 0.80),
  c(0.22, 0.66, 0.11, 0.14, -12, 0.74),
  c(0.74, 0.32, 0.10, 0.12, 55, 0.70),
  c(0.38, 0.54, 0.09, 0.08, 0, 0.85),
  c(0.68, 0.70, 0.08, 0.07, 30, 0.66)
)

# What a reader flagged. The list that reaches the client carries the box and
# the label. The measurements stay here until somebody clicks.
FINDINGS <- list(
  list("Tumour nest, high grade", 0.312, 0.404, 0.93),
  list("Tumour nest, high grade", 0.335, 0.437, 0.89),
  list("Mitotic figure cluster", 0.451, 0.298, 0.81),
  list("Lymphocytic infiltrate", 0.614, 0.512, 0.77),
  list("Lymphocytic infiltrate", 0.642, 0.536, 0.72),
  list("Necrosis", 0.523, 0.681, 0.86),
  list("Stroma, desmoplastic", 0.228, 0.658, 0.64),
  list("Tumour nest, low grade", 0.735, 0.324, 0.70),
  list("Vascular invasion", 0.381, 0.540, 0.88),
  list("Mitotic figure cluster", 0.678, 0.702, 0.75),
  list("Benign gland", 0.268, 0.470, 0.58),
  list("Benign gland", 0.592, 0.560, 0.55)
)

# The deepest zoom level, the way OpenSeadragon counts them. Level 0 is one
# pixel and the deepest level is the slide at full size, so the count is
# however many times you can halve the longest side.
max_level <- function(width = WIDTH, height = HEIGHT) {
  as.integer(ceiling(log2(max(width, height))))
}

level_count <- function(width = WIDTH, height = HEIGHT) {
  max_level(width, height) + 1L
}

# The flagged regions, in slide pixel coordinates. index is zero based, to
# match the client and the Python server.
slide_regions <- function() {
  lapply(seq_along(FINDINGS), function(i) {
    finding <- FINDINGS[[i]]
    label <- finding[[1]]
    # Box size follows the finding: an infiltrate covers more ground than a
    # mitotic figure.
    span <- if (startsWith(label, "Lymphocytic")) 2400L else 1400L

    list(
      index = i - 1L,
      label = label,
      confidence = finding[[4]],
      x = as.integer(finding[[2]] * WIDTH) - span %/% 2L,
      y = as.integer(finding[[3]] * HEIGHT) - span %/% 2L,
      width = span,
      height = span
    )
  })
}

# Everything the client needs to draw the slide. A few kilobytes.
#
# This is the whole point: the description of a 6.4 gigapixel image fits in
# one small message, and the browser turns it into as many pixels as the
# viewer asks for.
slide_payload <- function() {
  lobes <- lapply(LOBES, function(lobe) {
    list(
      x = lobe[[1]],
      y = lobe[[2]],
      rx = lobe[[3]],
      ry = lobe[[4]],
      angle = lobe[[5]],
      density = lobe[[6]]
    )
  })

  regions <- lapply(slide_regions(), function(region) {
    list(
      index = region$index,
      label = region$label,
      x = region$x,
      y = region$y,
      width = region$width,
      height = region$height
    )
  })

  list(
    width = WIDTH,
    height = HEIGHT,
    tileSize = TILE_SIZE,
    maxLevel = max_level(),
    levels = level_count(),
    micronsPerPixel = MICRONS_PER_PIXEL,
    magnification = MAGNIFICATION,
    seed = SEED,
    # as.numeric first. Both dimensions are integers and their product is
    # 6.4 billion, which overflows R's 32 bit integer and comes out NA with
    # only a warning. Python has no such limit and returned the right number,
    # so this is the kind of gap that ships.
    gigapixels = round(as.numeric(WIDTH) * as.numeric(HEIGHT) / 1e9, 2),
    lobes = I(lobes),
    regions = I(regions)
  )
}

# The measurements behind one flagged region.
#
# The client has the box and the label, because it draws the marker. It does
# not have any of this, which is why clicking a marker is the one thing in
# this app that needs the server.
region_detail <- function(index) {
  regions <- slide_regions()
  found <- Filter(function(r) identical(r$index, as.integer(index)), regions)
  if (length(found) == 0L) {
    return(NULL)
  }
  region <- found[[1]]

  area_mm2 <- (region$width *
    MICRONS_PER_PIXEL *
    region$height *
    MICRONS_PER_PIXEL) /
    1e6

  # Derived from the region rather than stored, so the numbers stay
  # consistent with the box the client is drawing.
  density_per_mm2 <- 3200L + (region$index * 137L) %% 2600L
  nuclei <- as.integer(area_mm2 * density_per_mm2)
  mitoses <- max(0L, as.integer(nuclei / 1800) + (region$index %% 5L) - 2L)

  list(
    index = region$index,
    label = region$label,
    confidence = region$confidence,
    x = region$x,
    y = region$y,
    width = region$width,
    height = region$height,
    areaMm2 = round(area_mm2, 4),
    nuclei = nuclei,
    nucleiPerMm2 = density_per_mm2,
    mitoses = mitoses,
    meanNuclearArea = round(28 + (region$index * 7L) %% 22L, 1),
    stain = "H&E"
  )
}

# How many microns one screen pixel covers at a zoom level.
#
# A viewer without a scale is a picture. With one it is a measurement, and
# this is the number a pathologist reads first.
scale_bar <- function(zoom_level) {
  downsample <- 2^(max_level() - zoom_level)
  list(
    level = as.integer(zoom_level),
    downsample = downsample,
    micronsPerPixel = round(MICRONS_PER_PIXEL * downsample, 4),
    magnification = round(MAGNIFICATION / downsample, 3)
  )
}
