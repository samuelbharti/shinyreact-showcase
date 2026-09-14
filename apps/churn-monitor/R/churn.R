# A scored churn model, and everything you can ask of it at a threshold.
#
# The R twin of churn_monitor.py. Both score the same 50,000 customers from
# the same hash, so the two servers send the same bytes and draw the same
# picture, and the browser cannot tell which one it is talking to.

CUSTOMER_COUNT <- 50000L

# Scores live on a 0 to 10,000 grid. That is finer than any slider step and
# finer than any pixel, and it makes the comparison an integer one.
SCORE_SCALE <- 10000L

# What the model was fitted on. Churners score higher, with plenty of
# overlap, which is what makes a threshold a decision rather than a formality.
#
# The two centres are set for an area under the ROC near 0.82. Pull them
# apart and the curve hugs the corner, every threshold looks fine, and there
# is nothing to decide. A real churn model does not separate that cleanly.
BASE_RATE <- 0.18
STAY_CENTRE <- -2.20
STAY_SPREAD <- 1.30
LEAVE_CENTRE <- -0.45
LEAVE_SPREAD <- 1.40

# Pounds. A customer who leaves without an offer costs their remaining value.
# An offer to someone who was staying costs the offer.
DEFAULT_MISS_COST <- 220
DEFAULT_OFFER_COST <- 25

# A repeatable value in 0 to 1, from a customer number and a salt.
hash_unit <- function(index, salt) {
  raw <- sin(index * 0.0137 + salt * 7.919) * 43758.5453
  raw - floor(raw)
}

# Box-Muller from two hashed uniforms, clamped at four sigma.
hash_normal <- function(index, salt_a, salt_b) {
  u1 <- pmin(pmax(hash_unit(index, salt_a), 1e-9), 1)
  u2 <- hash_unit(index, salt_b)
  z <- sqrt(-2 * log(u1)) * cos(2 * pi * u2)
  pmin(pmax(z, -4), 4)
}

.cache <- new.env(parent = emptyenv())

# Score every customer. Cached: every session shares one copy.
#
# `score` is an integer in ten thousandths and `left` is 0 or 1. The browser
# gets exactly these, so a threshold comparison is the same comparison on both
# sides, with no rounding anywhere to disagree about.
load_scores <- function(count = CUSTOMER_COUNT) {
  key <- paste0("scores-", count)
  hit <- .cache[[key]]
  if (!is.null(hit)) {
    return(hit)
  }

  index <- seq_len(count) - 1
  left <- as.integer(hash_unit(index, 41) < BASE_RATE)

  # A logit for each customer, drawn from whichever population they belong
  # to, then squashed. Two overlapping bumps rather than two clean ones,
  # which is what a real scored population looks like.
  spread <- ifelse(left == 1L, LEAVE_SPREAD, STAY_SPREAD)
  centre <- ifelse(left == 1L, LEAVE_CENTRE, STAY_CENTRE)
  logit <- centre + spread * hash_normal(index, 42, 43)
  probability <- 1 / (1 + exp(-logit))

  scored <- list(
    score = pmin(
      pmax(as.integer(round(probability * SCORE_SCALE)), 0L),
      SCORE_SCALE
    ),
    left = left
  )
  .cache[[key]] <- scored
  scored
}

# Cumulative counts, one entry per score on the grid.
#
# above_left[t] is how many churners scored t or higher, and above_stay[t] the
# same for the ones who stayed. Every question this app asks at a threshold is
# two reads out of these, which is the whole reason the browser can answer it
# between two frames.
load_curve <- function(count = CUSTOMER_COUNT) {
  key <- paste0("curve-", count)
  hit <- .cache[[key]]
  if (!is.null(hit)) {
    return(hit)
  }

  scored <- load_scores(count)
  slots <- SCORE_SCALE + 1L

  # tabulate() counts 1 to nbins, so shift the score by one and shift back
  # when reading. A score of zero is a real score and has to be counted.
  left_hist <- tabulate(scored$score[scored$left == 1L] + 1L, nbins = slots)
  stay_hist <- tabulate(scored$score[scored$left == 0L] + 1L, nbins = slots)

  curve <- list(
    aboveLeft = rev(cumsum(rev(left_hist))),
    aboveStay = rev(cumsum(rev(stay_hist))),
    totalLeft = sum(left_hist),
    totalStay = sum(stay_hist)
  )
  .cache[[key]] <- curve
  curve
}

# The four counts at a threshold. Flagged means score >= threshold.
confusion <- function(threshold, count = CUSTOMER_COUNT) {
  curve <- load_curve(count)
  at <- min(max(as.integer(threshold), 0L), SCORE_SCALE)

  true_positive <- curve$aboveLeft[[at + 1L]]
  false_positive <- curve$aboveStay[[at + 1L]]
  list(
    threshold = at,
    truePositive = true_positive,
    falsePositive = false_positive,
    falseNegative = curve$totalLeft - true_positive,
    trueNegative = curve$totalStay - false_positive
  )
}

# Everything the panel shows, at one threshold.
metrics <- function(threshold, miss_cost, offer_cost, count = CUSTOMER_COUNT) {
  counts <- confusion(threshold, count)
  tp <- counts$truePositive
  fp <- counts$falsePositive
  fn <- counts$falseNegative
  tn <- counts$trueNegative

  flagged <- tp + fp
  total <- tp + fp + fn + tn

  precision <- if (flagged > 0L) tp / flagged else 0
  recall <- if (tp + fn > 0L) tp / (tp + fn) else 0
  f1 <- if (precision + recall > 0) {
    2 * precision * recall / (precision + recall)
  } else {
    0
  }

  c(
    counts,
    list(
      flagged = flagged,
      precision = round(precision, 6),
      recall = round(recall, 6),
      f1 = round(f1, 6),
      accuracy = if (total > 0L) round((tp + tn) / total, 6) else 0,
      falsePositiveRate = if (fp + tn > 0L) round(fp / (fp + tn), 6) else 0,
      # as.numeric first. The counts are integers, and R multiplies two
      # integers as an integer, so a bigger population or a dearer mistake
      # would silently become NA with only a warning. It does not overflow at
      # these prices, which is exactly why it is worth doing before it can.
      cost = round(as.numeric(fn) * miss_cost + as.numeric(fp) * offer_cost, 2)
    )
  )
}

# The ROC and precision recall curves, sent once.
#
# Both are properties of the scores alone, so neither moves when the threshold
# does. Only the marker on them moves, and that is a lookup.
roc_points <- function(step = 100L, count = CUSTOMER_COUNT) {
  curve <- load_curve(count)
  at <- seq(0L, SCORE_SCALE, by = step)

  true_positive <- as.numeric(curve$aboveLeft[at + 1L])
  false_positive <- as.numeric(curve$aboveStay[at + 1L])
  flagged <- true_positive + false_positive

  list(
    thresholds = I(as.integer(at)),
    recall = I(round(true_positive / curve$totalLeft, 5)),
    falsePositiveRate = I(round(false_positive / curve$totalStay, 5)),
    precision = I(round(ifelse(flagged > 0, true_positive / flagged, 1), 5))
  )
}

# Area under the ROC, by the trapezium rule over every score.
#
# Written out rather than handed to a helper so this file and its Python twin
# do the same multiplies in the same order and print the same six decimals.
auc <- function(count = CUSTOMER_COUNT) {
  curve <- load_curve(count)
  recall <- as.numeric(curve$aboveLeft) / curve$totalLeft
  rate <- as.numeric(curve$aboveStay) / curve$totalStay

  n <- length(recall)
  width <- rate[-n] - rate[-1]
  height <- (recall[-n] + recall[-1]) / 2
  round(sum(width * height), 6)
}

# What the page needs before anything else. Sent once.
summary_payload <- function(count = CUSTOMER_COUNT) {
  curve <- load_curve(count)
  total <- curve$totalLeft + curve$totalStay
  list(
    customers = total,
    left = curve$totalLeft,
    stayed = curve$totalStay,
    baseRate = round(curve$totalLeft / total, 6),
    scoreScale = SCORE_SCALE,
    auc = auc(count),
    defaultMissCost = DEFAULT_MISS_COST,
    defaultOfferCost = DEFAULT_OFFER_COST,
    curves = roc_points(count = count)
  )
}

# jsonlite::base64_enc() wraps at 72 characters, which inflates the payload
# and makes the R server send different bytes than the Python one.
b64 <- function(raw_bytes) {
  gsub("\n", "", jsonlite::base64_enc(raw_bytes), fixed = TRUE)
}

# Every score and label, packed, sent once.
#
# Three bytes a customer. The browser needs the raw scores for the
# distribution panel, and having them is also what lets it answer at a
# threshold without asking.
scores_payload <- function(count = CUSTOMER_COUNT) {
  scored <- load_scores(count)
  list(
    customers = length(scored$score),
    scoreScale = SCORE_SCALE,
    score = b64(writeBin(scored$score, raw(), size = 2L, endian = "little")),
    left = b64(writeBin(scored$left, raw(), size = 1L, endian = "little"))
  )
}

# Score distribution, split by what actually happened.
#
# The bin is worked out by arithmetic rather than by hist(), because Python
# has to land every customer in the same bar and the two libraries do not
# agree about which side of an edge is closed.
histogram <- function(bins = 60L, count = CUSTOMER_COUNT) {
  scored <- load_scores(count)
  slot <- pmin((as.numeric(scored$score) * bins) %/% SCORE_SCALE, bins - 1)

  list(
    bins = bins,
    edges = I(as.integer(round(seq(0L, bins) * SCORE_SCALE / bins))),
    left = I(tabulate(slot[scored$left == 1L] + 1L, nbins = bins)),
    stayed = I(tabulate(slot[scored$left == 0L] + 1L, nbins = bins))
  )
}

# Expected cost at every threshold, and the cheapest one.
#
# This is the only thing on the page that moves when a cost changes rather
# than when the threshold does, and it is still a hundred and one
# multiplications. The browser does it while the slider is moving.
cost_sweep <- function(
  miss_cost,
  offer_cost,
  step = 100L,
  count = CUSTOMER_COUNT
) {
  curve <- load_curve(count)
  at <- seq(0L, SCORE_SCALE, by = step)

  false_negative <- curve$totalLeft - as.numeric(curve$aboveLeft[at + 1L])
  false_positive <- as.numeric(curve$aboveStay[at + 1L])
  cost <- false_negative * miss_cost + false_positive * offer_cost

  best <- which.min(cost)
  list(
    thresholds = I(as.integer(at)),
    cost = I(round(cost, 2)),
    bestThreshold = as.integer(at[[best]]),
    bestCost = round(cost[[best]], 2)
  )
}

# The same four panels, drawn as a picture, the way plain Shiny does.
#
# This is the other half of the comparison. It exists to be slow in the way a
# server rendered dashboard is slow: the work happens here, the result is a
# PNG, and every step of the slider pays for another one.
render_panels <- function(threshold, miss_cost, offer_cost) {
  at <- min(max(as.integer(threshold), 0L), SCORE_SCALE)
  shown <- metrics(at, miss_cost, offer_cost)
  curves <- roc_points()
  bars <- histogram()
  sweep <- cost_sweep(miss_cost, offer_cost)

  old <- graphics::par(
    mfrow = c(2, 2),
    mar = c(3, 3.4, 2, 1),
    mgp = c(2, 0.6, 0),
    cex = 0.7
  )
  on.exit(graphics::par(old), add = TRUE)

  edges <- as.numeric(bars$edges)
  centres <- edges[-length(edges)] + diff(edges) / 2

  plot(
    centres,
    bars$stayed,
    type = "h",
    lwd = 4,
    col = "#94a3b8",
    xlab = "",
    ylab = "customers",
    main = "scores"
  )
  graphics::lines(centres, bars$left, type = "h", lwd = 4, col = "#dc2626")
  graphics::abline(v = at, col = "#111827", lwd = 2)

  plot(
    curves$falsePositiveRate,
    curves$recall,
    type = "l",
    col = "#2f6fed",
    xlab = "false positive rate",
    ylab = "recall",
    main = paste0("ROC, auc ", format(round(auc(), 3), nsmall = 3))
  )
  graphics::abline(0, 1, col = "#cbd5e1", lty = 2)
  graphics::points(
    shown$falsePositiveRate,
    shown$recall,
    pch = 19,
    col = "#111827"
  )

  plot(
    curves$thresholds,
    curves$precision,
    type = "l",
    col = "#0f7a4a",
    ylim = c(0, 1),
    xlab = "",
    ylab = "",
    main = "precision and recall"
  )
  graphics::lines(curves$thresholds, curves$recall, col = "#b45309")
  graphics::abline(v = at, col = "#111827", lwd = 2)

  plot(
    sweep$thresholds,
    sweep$cost,
    type = "l",
    col = "#7c3aed",
    xlab = "",
    ylab = "cost",
    main = "cost"
  )
  graphics::abline(v = sweep$bestThreshold, col = "#0f7a4a", lty = 2)
  graphics::abline(v = at, col = "#111827", lwd = 2)

  invisible(NULL)
}
