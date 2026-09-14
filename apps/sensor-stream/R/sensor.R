# Pure computation for the sensor stream. No Shiny here.
#
# This is the R twin of sensor_stream.py. Both generate the readings rather
# than read them, because a stream has no data file to bundle, and both use
# the same arithmetic so the two servers produce the same trace.
#
# Nothing here uses a random number generator. jitter() is the shader trick of
# taking the fractional part of a large sine, which gives the same answer in
# both languages in a way that set.seed() and np.random never would.

# name, unit, base, drift amplitude, drift period, ripple amplitude,
# ripple period, noise amplitude, color
CHANNELS <- list(
  list("Coolant temp", "degC", 21.5, 2.6, 37.0, 0.45, 4.3, 0.22, "#4c78a8"),
  list("Line pressure", "kPa", 101.3, 1.8, 53.0, 0.30, 2.9, 0.14, "#f58518"),
  list("Vibration", "mm/s", 1.9, 0.9, 23.0, 0.55, 1.7, 0.30, "#e45756"),
  list("Flow rate", "L/min", 48.0, 5.5, 71.0, 1.20, 6.1, 0.60, "#54a24b")
)

MIN_HZ <- 1L
MAX_HZ <- 30L

# What the client needs to label and color the traces.
channels <- function() {
  I(lapply(CHANNELS, function(ch) {
    list(name = ch[[1]], unit = ch[[2]], color = ch[[9]])
  }))
}

# A repeatable value in -1 to 1, standing in for sensor noise.
#
# channel is zero based here, matching the Python side, so the two agree.
jitter_value <- function(tick, channel) {
  raw <- sin(tick * 12.9898 + channel * 78.233) * 43758.5453
  (raw - floor(raw)) * 2 - 1
}

# One reading per channel at this tick.
reading <- function(tick) {
  values <- vapply(
    seq_along(CHANNELS),
    function(i) {
      ch <- CHANNELS[[i]]
      base <- ch[[3]]
      drift <- ch[[4]]
      drift_p <- ch[[5]]
      ripple <- ch[[6]]
      ripple_p <- ch[[7]]
      noise <- ch[[8]]

      round(
        base +
          drift * sin(tick / drift_p) +
          ripple * sin(tick / ripple_p) +
          noise * jitter_value(tick, i - 1L),
        4
      )
    },
    numeric(1)
  )
  I(values)
}

# Keep the requested rate inside what the server will actually serve.
#
# The client sends this, and a client can send anything. A rate of zero would
# busy loop the reactive timer and a very large one would flood the websocket.
clamp_rate <- function(rate) {
  if (is.null(rate) || is.na(rate)) {
    return(10L)
  }
  max(MIN_HZ, min(MAX_HZ, as.integer(rate)))
}

# Milliseconds between ticks, for invalidateLater().
interval_ms <- function(rate_hz) {
  1000 / clamp_rate(rate_hz)
}
