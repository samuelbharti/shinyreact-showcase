# Pure computation for the candle chart. No Shiny here.
#
# The R twin of market_candles.py. Both build the same series from the same
# hash, so the two servers draw the same chart and answer the same numbers.

# name, opening price, annual drift, annual volatility
SYMBOLS <- list(
  list("ACME", 142.50, 0.11, 0.28),
  list("BRDG", 68.20, -0.04, 0.35),
  list("CYGN", 311.75, 0.22, 0.44),
  list("DELT", 25.40, 0.06, 0.22),
  list("ELMR", 89.15, 0.15, 0.31),
  list("FTHM", 7.85, -0.12, 0.62)
)

BARS_PER_SESSION <- 390L
SESSIONS <- 100L
BAR_COUNT <- BARS_PER_SESSION * SESSIONS

START_TIME <- 1700000000
BAR_SECONDS <- 60L

TRADING_MINUTES_PER_YEAR <- BARS_PER_SESSION * 252

# A repeatable value in 0 to 1, from a bar number and a salt.
hash_unit <- function(index, salt) {
  raw <- sin(index * 0.0137 + salt * 7.919) * 43758.5453
  raw - floor(raw)
}

# Box-Muller from two hashed uniforms, clamped at three sigma. Unclamped, a
# long minute series eventually produces a move that dwarfs everything else
# and flattens the rest of the chart.
hash_normal <- function(index, salt_a, salt_b) {
  u1 <- pmax(hash_unit(index, salt_a), 1e-9)
  u2 <- hash_unit(index, salt_b)
  z <- sqrt(-2 * log(u1)) * cos(2 * pi * u2)
  pmin(pmax(z, -3), 3)
}

symbol_names <- function() {
  vapply(SYMBOLS, function(s) s[[1]], character(1))
}

# Build one symbol's whole history. Cached in the environment below, because
# readers come back to a symbol they have already looked at.
.series_cache <- new.env(parent = emptyenv())

load_series <- function(symbol) {
  hit <- .series_cache[[symbol]]
  if (!is.null(hit)) {
    return(hit)
  }

  found <- Filter(function(s) identical(s[[1]], symbol), SYMBOLS)
  if (length(found) == 0L) {
    stop(
      "No symbol called ",
      sQuote(symbol),
      ". Known: ",
      paste(symbol_names(), collapse = ", ")
    )
  }
  start_price <- found[[1]][[2]]
  drift <- found[[1]][[3]]
  volatility <- found[[1]][[4]]

  index <- seq_len(BAR_COUNT) - 1

  # Geometric random walk, per minute.
  per_bar_drift <- drift / TRADING_MINUTES_PER_YEAR
  per_bar_vol <- volatility / sqrt(TRADING_MINUTES_PER_YEAR)
  steps <- per_bar_drift + per_bar_vol * hash_normal(index, 11, 12)

  close <- start_price * exp(cumsum(steps))
  open <- c(start_price, close[-length(close)])

  # Wicks, as a fraction of the bar's own move plus a floor, so a quiet bar
  # still has a little range rather than being a flat line.
  spread <- abs(close - open) + close * per_bar_vol * 0.6
  high <- pmax(open, close) + spread * hash_unit(index, 13)
  low <- pmin(open, close) - spread * hash_unit(index, 14)

  # Volume peaks at the open and the close, the way it really does.
  minute <- index %% BARS_PER_SESSION
  shape <- 0.35 + 0.65 * abs(minute / BARS_PER_SESSION - 0.5) * 2
  volume <- round((2000 + hash_unit(index, 15) * 18000) * shape)

  series <- list(
    symbol = symbol,
    time = START_TIME + index * BAR_SECONDS,
    open = round(open, 4),
    high = round(high, 4),
    low = round(low, 4),
    close = round(close, 4),
    volume = volume
  )
  .series_cache[[symbol]] <- series
  series
}

# The symbol list, sent once.
catalog <- function() {
  list(
    symbols = I(symbol_names()),
    bars = BAR_COUNT,
    barSeconds = BAR_SECONDS,
    startTime = START_TIME,
    barsPerSession = BARS_PER_SESSION
  )
}

# jsonlite::base64_enc() wraps at 72 characters, which inflates the payload
# and makes the R server send different bytes than the Python one.
b64 <- function(raw_bytes) {
  gsub("\n", "", jsonlite::base64_enc(raw_bytes), fixed = TRUE)
}

cents <- function(values) {
  as.integer(round(values * 100))
}

# One symbol's whole history, sent when the symbol changes.
#
# Prices go as int32 in hundredths. Four bytes a field rather than eight, and
# a hundredth of a currency unit is finer than any chart draws.
series_payload <- function(series) {
  as_i32 <- function(values) {
    b64(writeBin(cents(values), raw(), size = 4L, endian = "little"))
  }

  list(
    symbol = series$symbol,
    bars = length(series$time),
    startTime = series$time[[1]],
    barSeconds = BAR_SECONDS,
    scale = 100L,
    open = as_i32(series$open),
    high = as_i32(series$high),
    low = as_i32(series$low),
    close = as_i32(series$close),
    volume = b64(writeBin(
      as.integer(series$volume),
      raw(),
      size = 4L,
      endian = "little"
    ))
  )
}

# What the visible window looks like, in numbers. first and last are zero
# based, matching the client and the Python server.
window_stats <- function(series, first, last) {
  n <- length(series$time)
  first <- max(0L, min(as.integer(first), n - 1L))
  last <- max(first, min(as.integer(last), n - 1L))

  at <- (first + 1L):(last + 1L)
  close <- series$close[at]
  peak <- cummax(close)
  drawdown <- min((close - peak) / peak)

  list(
    bars = length(at),
    first = first,
    last = last,
    open = series$open[[first + 1L]],
    close = close[[length(close)]],
    high = max(series$high[at]),
    low = min(series$low[at]),
    change = round(close[[length(close)]] - series$open[[first + 1L]], 4),
    changePercent = round(
      (close[[length(close)]] / series$open[[first + 1L]] - 1) * 100,
      3
    ),
    # as.numeric first: a wide window sums past two billion and would
    # overflow R's 32 bit integer to NA with only a warning.
    volume = sum(as.numeric(series$volume[at])),
    maxDrawdown = round(drawdown * 100, 3)
  )
}

# Draw the same window as a picture, the way a plain Shiny app would.
#
# This is the other half of the comparison. It exists to be slow in the way
# that a server rendered chart is slow: the work happens here, the result is
# a PNG, and every pan and zoom pays for another one.
render_window <- function(series, first, last) {
  n <- length(series$time)
  first <- max(0L, min(as.integer(first), n - 1L))
  last <- max(first, min(as.integer(last), n - 1L))

  # Candles are drawn per bar, so a wide window is genuinely expensive.
  # Thinning it is what a real app does, and it also keeps the cost this app
  # is here to show from becoming silly.
  step <- max(1L, (last - first + 1L) %/% 1200L)
  at <- seq(first + 1L, last + 1L, by = step)

  up <- series$close[at] >= series$open[at]
  colors <- ifelse(up, "#26a69a", "#ef5350")

  old <- graphics::par(mar = c(2.5, 4, 2, 1), cex = 0.75)
  on.exit(graphics::par(old), add = TRUE)

  plot(
    range(at),
    range(c(series$low[at], series$high[at])),
    type = "n",
    xlab = "",
    ylab = "price",
    main = paste0(series$symbol, "  bars ", first, " to ", last)
  )
  graphics::grid(col = "#e6e8ea")
  graphics::segments(
    at,
    series$low[at],
    at,
    series$high[at],
    col = colors,
    lwd = 0.7
  )
  graphics::segments(
    at,
    series$open[at],
    at,
    series$close[at],
    col = colors,
    lwd = 2.4
  )
  invisible(NULL)
}
