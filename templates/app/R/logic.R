# Pure computation for APP_TITLE. No Shiny here, so testthat can call these
# directly and shiny::testServer() can check the JSON the client receives.

load_values <- function(path) {
  utils::read.csv(path)$value
}

#' Bin values into equal width buckets.
#'
#' I() keeps a length-one result an array on the wire rather than collapsing
#' it to a scalar, which is what the client expects to draw.
histogram <- function(values, bins) {
  if (bins < 1) {
    stop("bins must be at least 1")
  }
  if (length(values) == 0) {
    return(list(breaks = I(numeric(0)), counts = I(numeric(0))))
  }

  low <- min(values)
  high <- max(values)
  if (low == high) {
    # One distinct value. An equal width split has no meaning, so report a
    # single bucket holding everything.
    return(list(breaks = I(c(low, high)), counts = I(length(values))))
  }

  width <- (high - low) / bins
  breaks <- low + (0:bins) * width
  index <- pmin(as.integer((values - low) / width), bins - 1L)
  counts <- tabulate(index + 1L, nbins = bins)

  list(breaks = I(breaks), counts = I(as.numeric(counts)))
}
