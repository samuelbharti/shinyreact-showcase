# A synthetic star catalogue, and the one thing the server computes about it.
#
# The R twin of linked_brush.py. Both build the same 40,000 stars from the
# same hash, so the two servers send the same bytes and fit the same line.

STAR_COUNT <- 40000L

# How faint the survey can see. Everything else follows from this: a star is
# in the catalogue only as far away as this limit allows.
APPARENT_LIMIT <- 11.5

# Vertical thickness of the disc, in parsecs. Distant stars are confined to
# it, which is why the sky panel has a bright band across the middle.
DISC_SCALE_HEIGHT <- 350

MAIN_SEQUENCE <- 0L
GIANT <- 1L
WHITE_DWARF <- 2L

POPULATIONS <- c("Main sequence", "Giants", "White dwarfs")

# Main sequence colour to absolute magnitude, a cubic fitted to the standard
# spectral type table (B0V through M5V). Written out by Horner rather than
# with powers, so Python, R and JavaScript do the same multiplies in the same
# order and land on the same bits.
MS_C3 <- 1.7429
MS_C2 <- -5.0307
MS_C1 <- 9.7440
MS_C0 <- 0.2686

# The units each packed field is stored in. The client divides by these, and
# so does everything below, so the two sides read the same numbers.
SCALES <- list(
  colour = 1000L,
  absolute = 100L,
  longitude = 100L,
  latitude = 100L,
  logDistance = 1000L,
  apparent = 100L
)

# Which packed field each panel's axes read. The client holds the same map,
# and both sides have to agree or the server would fit a different selection
# from the one on screen.
PANEL_FIELDS <- list(
  hr = c("colour", "absolute"),
  sky = c("longitude", "latitude"),
  distance = c("logDistance", NA_character_),
  apparent = c("apparent", NA_character_)
)

# A repeatable value in 0 to 1, from a star number and a salt.
hash_unit <- function(index, salt) {
  raw <- sin(index * 0.0137 + salt * 7.919) * 43758.5453
  raw - floor(raw)
}

# Box-Muller from two hashed uniforms, clamped at three sigma.
#
# A flat draw gives every band a hard edge, which reads as a drawn line rather
# than as measurements. Stars scatter about a relation; they do not fill a
# rectangle around it.
hash_normal <- function(index, salt_a, salt_b) {
  u1 <- pmin(pmax(hash_unit(index, salt_a), 1e-9), 1)
  u2 <- hash_unit(index, salt_b)
  z <- sqrt(-2 * log(u1)) * cos(2 * pi * u2)
  pmin(pmax(z, -3), 3)
}

# Absolute visual magnitude of a main sequence star of this colour.
main_sequence_magnitude <- function(colour) {
  ((MS_C3 * colour + MS_C2) * colour + MS_C1) * colour + MS_C0
}

# Built once and kept. Every session shares one copy.
.catalogue_cache <- new.env(parent = emptyenv())

# The star table, held at the precision the client is sent.
#
# Every field is an integer in fixed units. That is deliberate rather than a
# storage trick: the client is sent these integers, so if the server kept full
# precision doubles the two would disagree about stars sitting exactly on a
# brush edge. Rounding once, here, makes the two selections identical by
# construction.
load_catalogue <- function(count = STAR_COUNT) {
  key <- as.character(count)
  hit <- .catalogue_cache[[key]]
  if (!is.null(hit)) {
    return(hit)
  }

  index <- seq_len(count) - 1

  which_pop <- hash_unit(index, 21)
  is_giant <- which_pop >= 0.780 & which_pop < 0.945
  is_dwarf <- which_pop >= 0.945

  shade <- hash_unit(index, 22)

  # Two independent draws, so a band has width in both directions. Using one
  # for both would only tilt it.
  jitter <- hash_normal(index, 31, 32)
  tint <- hash_normal(index, 33, 34)

  # Main sequence. The exponent skews the draw towards the red end, because
  # faint red stars vastly outnumber bright blue ones.
  #
  # The magnitude comes off the relation at the unscattered colour and is
  # scattered separately. Scattering the colour first and then reading the
  # relation would move every star along the band instead of across it, and
  # the band would stay a line.
  base_colour <- -0.33 + 2.23 * shade^0.62
  colour <- base_colour + tint * 0.035
  absolute <- main_sequence_magnitude(base_colour) + jitter * 0.75

  # Giants. The branch climbs to the upper right: redder and brighter.
  giant_colour <- 0.80 + 0.95 * shade + tint * 0.045
  giant_absolute <- 2.60 - 5.0 * (0.95 * shade) + jitter * 0.85

  # The red clump, where helium burning stars pile up. It is the densest spot
  # on a real colour magnitude diagram and the reason the giant branch is
  # worth brushing at all.
  in_clump <- is_giant & hash_unit(index, 24) < 0.42
  giant_colour <- ifelse(in_clump, 1.02 + tint * 0.055, giant_colour)
  giant_absolute <- ifelse(in_clump, 0.70 + jitter * 0.40, giant_absolute)

  # White dwarfs: a narrow sequence far below the main one.
  dwarf_colour <- -0.10 + 1.00 * shade + tint * 0.03
  dwarf_absolute <- 10.40 + 4.60 * (dwarf_colour + 0.10) + jitter * 0.45

  colour <- ifelse(
    is_giant,
    giant_colour,
    ifelse(is_dwarf, dwarf_colour, colour)
  )
  absolute <- ifelse(
    is_giant,
    giant_absolute,
    ifelse(is_dwarf, dwarf_absolute, absolute)
  )

  population <- ifelse(
    is_giant,
    GIANT,
    ifelse(is_dwarf, WHITE_DWARF, MAIN_SEQUENCE)
  )

  # How far the survey can see a star of this brightness, and then a uniform
  # draw through that volume. The cube root is what makes it uniform in volume
  # rather than in radius.
  reach <- pmin(pmax(10^((APPARENT_LIMIT - absolute + 5) / 5), 2), 12000)
  distance <- pmax(reach * hash_unit(index, 25)^(1 / 3), 1.5)

  apparent <- absolute + 5 * log10(distance) - 5

  # Latitude. A distant star has to lie within the disc to be seen at all, so
  # its possible latitudes narrow with distance. A nearby one can sit
  # anywhere. Squaring the draw pulls stars towards the plane inside that.
  limit <- pmin(pmax(atan(DISC_SCALE_HEIGHT / distance) * 180 / pi, 1.5), 89)
  offset <- 2 * hash_unit(index, 26) - 1
  latitude <- limit * offset * abs(offset)

  # Centred on the galactic centre, the way an all sky plot is drawn, and it
  # keeps the packed field inside a signed short like the rest.
  longitude <- 360 * hash_unit(index, 27) - 180

  catalogue <- list(
    colour = as.integer(round(colour * 1000)),
    absolute = as.integer(round(absolute * 100)),
    longitude = as.integer(round(longitude * 100)),
    latitude = as.integer(round(latitude * 100)),
    logDistance = as.integer(round(log10(distance) * 1000)),
    apparent = as.integer(round(apparent * 100)),
    population = as.integer(population)
  )
  .catalogue_cache[[key]] <- catalogue
  catalogue
}

# jsonlite::base64_enc() wraps at 72 characters, which inflates the payload
# and makes the R server send different bytes than the Python one.
b64 <- function(raw_bytes) {
  gsub("\n", "", jsonlite::base64_enc(raw_bytes), fixed = TRUE)
}

pack_i16 <- function(values) {
  b64(writeBin(as.integer(values), raw(), size = 2L, endian = "little"))
}

# The extent of every field, so the client can build its scales.
field_ranges <- function(catalogue) {
  names_wanted <- names(SCALES)
  ranges <- lapply(names_wanted, function(name) {
    scale <- SCALES[[name]]
    list(
      min = min(catalogue[[name]]) / scale,
      max = max(catalogue[[name]]) / scale
    )
  })
  stats::setNames(ranges, names_wanted)
}

# What the page needs before the catalogue arrives. Sent once.
summary_payload <- function() {
  catalogue <- load_catalogue()
  list(
    stars = length(catalogue$colour),
    populations = I(POPULATIONS),
    populationCounts = I(tabulate(catalogue$population + 1L, nbins = 3L)),
    apparentLimit = APPARENT_LIMIT,
    ranges = field_ranges(catalogue),
    scales = SCALES
  )
}

# The whole table, packed, sent once.
#
# Thirteen bytes a star. Sending doubles would be five times the size for
# precision no panel four hundred pixels wide can draw.
catalogue_payload <- function() {
  catalogue <- load_catalogue()
  list(
    stars = length(catalogue$colour),
    scales = SCALES,
    colour = pack_i16(catalogue$colour),
    absolute = pack_i16(catalogue$absolute),
    longitude = pack_i16(catalogue$longitude),
    latitude = pack_i16(catalogue$latitude),
    logDistance = pack_i16(catalogue$logDistance),
    apparent = pack_i16(catalogue$apparent),
    population = b64(writeBin(
      as.integer(catalogue$population),
      raw(),
      size = 1L,
      endian = "little"
    ))
  )
}

field_values <- function(catalogue, field) {
  catalogue[[field]] / SCALES[[field]]
}

# Stars inside every active brush at once.
#
# Four panels, each holding its own rectangle, and a star has to satisfy all
# of them. That is cross filtering, and it is the reason the brushes are worth
# linking rather than just mirroring.
select_stars <- function(catalogue, brushes) {
  keep <- rep(TRUE, length(catalogue$colour))
  if (is.null(brushes) || length(brushes) == 0L) {
    return(keep)
  }

  for (panel in names(brushes)) {
    rect <- brushes[[panel]]
    if (is.null(rect) || is.null(PANEL_FIELDS[[panel]])) {
      next
    }
    fields <- PANEL_FIELDS[[panel]]

    x <- field_values(catalogue, fields[[1]])
    keep <- keep & x >= rect$x0 & x <= rect$x1

    if (!is.na(fields[[2]]) && !is.null(rect$y0)) {
      y <- field_values(catalogue, fields[[2]])
      keep <- keep & y >= rect$y0 & y <= rect$y1
    }
  }

  keep
}

# Least squares through the selected stars, plus what they are.
#
# This is the server's whole job, and it runs once per released brush rather
# than once per pointer move. Everything the panels draw while the pointer is
# down was worked out in the browser.
fit_selection <- function(brushes) {
  catalogue <- load_catalogue()
  keep <- select_stars(catalogue, brushes)
  count <- sum(keep)

  result <- list(
    stars = count,
    populations = I(POPULATIONS),
    populationCounts = I(tabulate(catalogue$population[keep] + 1L, nbins = 3L))
  )

  # Keys are left out rather than set to NULL when there is nothing to
  # report. R drops a NULL out of a list, and jsonlite writes an empty object
  # for one that survives, so a key that is sometimes null is a key the two
  # servers disagree about. Absent means absent in both.
  if (count == 0L) {
    return(result)
  }

  log_distance <- field_values(catalogue, "logDistance")[keep]
  result$medianParsecs <- round(10^stats::median(log_distance), 2)

  colour <- field_values(catalogue, "colour")[keep]
  absolute <- field_values(catalogue, "absolute")[keep]
  result$colourRange <- I(c(round(min(colour), 3), round(max(colour), 3)))

  # Three points is the least that gives a residual worth reporting, and a
  # selection with no spread in colour has no slope at all.
  dx <- colour - mean(colour)
  dy <- absolute - mean(absolute)
  sxx <- sum(dx * dx)
  syy <- sum(dy * dy)

  if (count < 3L || sxx <= 0) {
    return(result)
  }

  # Written as sums about the mean rather than handed to lm(), so this file
  # and its Python twin do the same arithmetic in the same order. A solver
  # would agree to about twelve digits, which is fine until a test pins a
  # number and the two rounds land either side of it.
  sxy <- sum(dx * dy)
  slope <- sxy / sxx
  intercept <- mean(absolute) - slope * mean(colour)
  residual <- absolute - (slope * colour + intercept)

  result$fit <- list(
    slope = round(slope, 4),
    intercept = round(intercept, 4),
    scatter = round(stats::sd(residual), 4),
    correlation = if (syy > 0) round(sxy / sqrt(sxx * syy), 4) else 0
  )

  result
}
