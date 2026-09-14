# Pure computation for the density map. No Shiny here.
#
# The R twin of city_density.py. Both generate the trips from a hash of the
# trip number rather than reading a file, so the two servers show the same
# city without shipping two megabytes.
#
# One caveat, written down because it is easy to trip over. The hash takes
# the fractional part of a large sine. For a big trip number the argument to
# sin() is in the millions, where R and numpy can disagree in the last bit,
# and a fractional part turns a last bit difference into a visible one for
# the occasional point. The tests compare summary numbers with a tolerance
# and pin only low trip numbers exactly, where the argument is small enough
# that both agree.

N_TRIPS <- 500000L

CENTER_LNG <- -0.1276
CENTER_LAT <- 51.5072

# name, lng offset, lat offset, spread, share, mean fare, mean minutes, peak hour
DISTRICTS <- list(
  list("Central", 0.000, 0.004, 0.016, 0.25, 14.5, 18, 18),
  list("Docklands", 0.085, -0.004, 0.014, 0.11, 22.0, 27, 18),
  list("North", -0.010, 0.055, 0.020, 0.13, 17.5, 24, 8),
  list("West End", -0.045, 0.012, 0.013, 0.16, 12.0, 15, 22),
  list("South Bank", 0.005, -0.028, 0.018, 0.12, 13.5, 17, 19),
  list("Airport corridor", -0.190, 0.020, 0.030, 0.07, 46.0, 52, 6),
  list("East", 0.060, 0.030, 0.024, 0.08, 19.0, 26, 9),
  list("Riverside", -0.085, -0.035, 0.022, 0.05, 21.0, 25, 17),
  list("Outer south", 0.020, -0.075, 0.028, 0.03, 26.0, 33, 7)
)

BOUNDS <- c(
  CENTER_LNG - 0.28,
  CENTER_LAT - 0.13,
  CENTER_LNG + 0.18,
  CENTER_LAT + 0.12
)

METRICS <- c("fare", "duration")

district_field <- function(position) {
  vapply(DISTRICTS, function(d) as.numeric(d[[position]]), numeric(1))
}

district_names <- function() {
  vapply(DISTRICTS, function(d) d[[1]], character(1))
}

# A repeatable value in 0 to 1, from a trip number and a salt.
hash_unit <- function(index, salt) {
  raw <- sin(index * 12.9898 + salt * 78.233) * 43758.5453
  raw - floor(raw)
}

# Standard normal from two hashed uniforms, by Box-Muller. u1 is clipped away
# from zero because log(0) is not a number anyone wants on a map.
hash_normal <- function(index, salt_a, salt_b, use_cos = TRUE) {
  u1 <- pmax(hash_unit(index, salt_a), 1e-9)
  u2 <- hash_unit(index, salt_b)
  radius <- sqrt(-2 * log(u1))
  if (use_cos) radius * cos(2 * pi * u2) else radius * sin(2 * pi * u2)
}

# Every trip. Positions are built now; the rest when first asked for, and
# cached in the city's own environment so a second question is free.
load_city <- function(n = N_TRIPS) {
  index <- seq_len(n) - 1
  cache <- new.env(parent = emptyenv())

  shares <- district_field(5)
  edges <- cumsum(shares / sum(shares))
  # findInterval matches numpy.searchsorted here: both give the count of
  # edges at or below the value, which is the district index.
  district <- findInterval(hash_unit(index, 0), edges)

  u1 <- pmax(hash_unit(index, 1), 1e-9)
  u2 <- hash_unit(index, 2)
  radius <- sqrt(-2 * log(u1))
  # Clamped at 2.8 sigma. An unclamped normal has tails that reach halfway
  # across the county, which puts a stray trip in every hexagon and turns the
  # map into an even smear with no city in it.
  z1 <- pmin(pmax(radius * cos(2 * pi * u2), -2.8), 2.8)
  z2 <- pmin(pmax(radius * sin(2 * pi * u2), -2.8), 2.8)

  offsets_lng <- district_field(2)
  offsets_lat <- district_field(3)
  spreads <- district_field(4)
  pick <- district + 1L

  # Latitude degrees are longer than longitude degrees at this latitude, so a
  # circular blob in degrees would look like an ellipse on screen.
  squash <- cos(CENTER_LAT * pi / 180)
  lng <- CENTER_LNG + offsets_lng[pick] + z1 * spreads[pick] / squash
  lat <- CENTER_LAT + offsets_lat[pick] + z2 * spreads[pick]

  list(
    n = n,
    index = index,
    district = district,
    lng = pmin(pmax(lng, BOUNDS[[1]]), BOUNDS[[3]]),
    lat = pmin(pmax(lat, BOUNDS[[2]]), BOUNDS[[4]]),
    cache = cache
  )
}

# Hour of day, clustered around each district's peak.
city_hour <- function(city) {
  if (!is.null(city$cache$hour)) {
    return(city$cache$hour)
  }
  peaks <- district_field(8)
  z <- hash_normal(city$index, 3, 4)
  hour <- round(peaks[city$district + 1L] + z * 3.4) %% 24
  city$cache$hour <- hour
  hour
}

# Log normal, because a fare distribution has a long right tail and a
# symmetric one looks wrong to anyone who has seen a real receipt.
city_fare <- function(city) {
  if (!is.null(city$cache$fare)) {
    return(city$cache$fare)
  }
  means <- district_field(6)
  z <- hash_normal(city$index, 5, 6)
  fare <- round(means[city$district + 1L] * exp(z * 0.35), 2)
  city$cache$fare <- fare
  fare
}

city_duration <- function(city) {
  if (!is.null(city$cache$duration)) {
    return(city$cache$duration)
  }
  means <- district_field(7)
  z <- hash_normal(city$index, 7, 8)
  duration <- round(means[city$district + 1L] * exp(z * 0.30), 1)
  city$cache$duration <- duration
  duration
}

city_metric <- function(city, name) {
  if (identical(name, "fare")) {
    return(city_fare(city))
  }
  if (identical(name, "duration")) {
    return(city_duration(city))
  }
  stop(
    "Unknown metric ",
    sQuote(name),
    ". Known: ",
    paste(METRICS, collapse = ", ")
  )
}

# jsonlite::base64_enc() wraps at 72 characters, which inflates the payload
# and makes the R server send different bytes than the Python one.
b64 <- function(raw_bytes) {
  gsub("\n", "", jsonlite::base64_enc(raw_bytes), fixed = TRUE)
}

quantize <- function(values, low, high) {
  scaled <- (values - low) / (high - low)
  as.integer(round(scaled * 65534 - 32767))
}

# The city outline and river, for context under the hexagons.
#
# Under 3 KB, so the server ships it with the positions rather than making the
# client fetch it. No basemap tiles are involved: this app downloads nothing
# at run time, which is what lets the gallery deploy as one process.
load_boundary <- function(data_dir) {
  jsonlite::fromJSON(
    file.path(data_dir, "boundary.json"),
    simplifyVector = FALSE
  )
}

# Positions for every trip, sent once. Quantized to int16 against the city
# bounds, which is about a metre at this scale and half the bytes of float32.
points_payload <- function(city, boundary = NULL) {
  qlng <- quantize(city$lng, BOUNDS[[1]], BOUNDS[[3]])
  qlat <- quantize(city$lat, BOUNDS[[2]], BOUNDS[[4]])

  list(
    n = city$n,
    bounds = I(BOUNDS),
    center = I(c(CENTER_LNG, CENTER_LAT)),
    districts = I(district_names()),
    metrics = I(METRICS),
    lng = b64(writeBin(qlng, raw(), size = 2L, endian = "little")),
    lat = b64(writeBin(qlat, raw(), size = 2L, endian = "little")),
    boundary = boundary
  )
}

# What the server knows about the trips under one hexagon.
#
# The client has the positions, so it could count them. It does not have the
# hour, the fare or the duration, and it never will: the point is that the
# server keeps the columns it is not asked for.
hexagon_summary <- function(city, lng, lat, radius_m) {
  lat_degrees <- radius_m / 111320
  lng_degrees <- lat_degrees / cos(CENTER_LAT * pi / 180)

  inside <- abs(city$lng - lng) <= lng_degrees &
    abs(city$lat - lat) <= lat_degrees
  count <- sum(inside)

  if (count == 0L) {
    return(list(
      count = 0L,
      hours = I(integer(0)),
      districts = I(list()),
      fare = NULL,
      duration = NULL
    ))
  }

  hours <- tabulate(city_hour(city)[inside] + 1L, nbins = 24L)
  district_counts <- tabulate(
    city$district[inside] + 1L,
    nbins = length(DISTRICTS)
  )
  order_by_size <- order(district_counts, decreasing = TRUE)
  order_by_size <- order_by_size[district_counts[order_by_size] > 0L]
  names_all <- district_names()
  districts <- lapply(utils::head(order_by_size, 4L), function(i) {
    list(name = names_all[[i]], n = district_counts[[i]])
  })

  fares <- city_fare(city)[inside]
  durations <- city_duration(city)[inside]

  list(
    count = count,
    hours = I(hours),
    districts = I(districts),
    fare = list(
      mean = round(mean(fares), 2),
      median = round(stats::median(fares), 2),
      p90 = round(unname(stats::quantile(fares, 0.9, type = 7)), 2)
    ),
    duration = list(
      mean = round(mean(durations), 1),
      median = round(stats::median(durations), 1)
    )
  )
}
