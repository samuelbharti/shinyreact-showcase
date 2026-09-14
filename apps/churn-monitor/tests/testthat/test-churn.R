# Layer one: the scored model and the threshold arithmetic, with no Shiny.
#
# The numbers pinned here are the same ones apps/churn-monitor/tests/
# test_churn_monitor.py pins. That is the point of the file: two languages
# score the same customers, and a reader gets whichever one is serving. If
# they ever stop agreeing, one of these two suites fails.

test_that("the hash stays inside the unit interval", {
  values <- hash_unit(seq_len(CUSTOMER_COUNT) - 1, 41)
  expect_gte(min(values), 0)
  expect_lt(max(values), 1)
})

test_that("the hash argument stays small enough to agree across languages", {
  # sin() past about fifteen thousand radians is where R, Python and
  # JavaScript stop agreeing in the last bit.
  expect_lt((CUSTOMER_COUNT - 1) * 0.0137 + 43 * 7.919, 15000)
})

test_that("every customer is scored and labelled", {
  scored <- load_scores()
  expect_length(scored$score, CUSTOMER_COUNT)
  expect_length(scored$left, CUSTOMER_COUNT)
  expect_setequal(unique(scored$left), c(0L, 1L))
})

test_that("scores are integers on the grid the browser is told about", {
  # No float anywhere for the two sides to disagree about. The threshold
  # travels as an integer too, so a customer is above it in the browser
  # exactly when they are above it here.
  scored <- load_scores()
  expect_true(is.integer(scored$score))
  expect_gte(min(scored$score), 0L)
  expect_lte(max(scored$score), SCORE_SCALE)
})

test_that("the first customers are scored the way Python scores them", {
  scored <- load_scores()
  expect_equal(
    head(scored$score, 6),
    c(1559L, 373L, 8749L, 1994L, 5835L, 2470L)
  )
  expect_equal(head(scored$left, 6), c(0L, 0L, 1L, 0L, 1L, 0L))
})

test_that("the base rate is what the model was built at", {
  curve <- load_curve()
  expect_equal(curve$totalLeft, 8934L)
  expect_equal(curve$totalStay, 41066L)
  expect_equal(curve$totalLeft + curve$totalStay, CUSTOMER_COUNT)
  expect_equal(summary_payload()$baseRate, 0.17868)
})

test_that("churners score higher than the rest", {
  scored <- load_scores()
  expect_gt(
    stats::median(scored$score[scored$left == 1L]),
    stats::median(scored$score[scored$left == 0L])
  )
})

test_that("the model separates but not cleanly", {
  # An area under the ROC near 0.82, which is what a real churn model does.
  # Push the two populations apart and the curve hugs the corner, every
  # threshold looks fine, and there is nothing left to decide.
  expect_equal(auc(), 0.81424)
  expect_gt(auc(), 0.78)
  expect_lt(auc(), 0.87)
})

test_that("the cumulative counts run the right way", {
  curve <- load_curve()
  expect_equal(curve$aboveLeft[[1]], curve$totalLeft)
  expect_equal(curve$aboveStay[[1]], curve$totalStay)
  expect_true(all(diff(curve$aboveLeft) <= 0))
  expect_true(all(diff(curve$aboveStay) <= 0))
})

test_that("the confusion matrix always adds up to everyone", {
  for (threshold in c(0L, 1200L, 3000L, 5000L, 9900L, SCORE_SCALE)) {
    counts <- confusion(threshold)
    total <- counts$truePositive +
      counts$falsePositive +
      counts$falseNegative +
      counts$trueNegative
    expect_equal(total, CUSTOMER_COUNT)
  }
})

test_that("the default threshold answers what the browser saw", {
  shown <- metrics(3000L, 220, 25)
  expect_equal(shown$truePositive, 5403L)
  expect_equal(shown$falsePositive, 6175L)
  expect_equal(shown$falseNegative, 3531L)
  expect_equal(shown$trueNegative, 34891L)
  expect_equal(shown$flagged, 11578L)
  expect_equal(shown$precision, 0.466661)
  expect_equal(shown$recall, 0.604768)
  expect_equal(shown$f1, 0.526814)
  expect_equal(shown$accuracy, 0.80588)
  expect_equal(shown$falsePositiveRate, 0.150368)
  expect_equal(shown$cost, 931195)
})

test_that("the far corner of the sliders answers what the browser saw", {
  shown <- metrics(3500L, 800, 200)
  expect_equal(shown$flagged, 9455L)
  expect_equal(shown$precision, 0.509572)
  expect_equal(shown$recall, 0.539288)
  expect_equal(shown$cost, 4220200)
})

test_that("the dearest corner of both sliders answers the same as Python", {
  # The counts are summed as doubles rather than integers. Fifty thousand
  # customers at these prices does not actually reach R's 32 bit ceiling, but
  # the counts are integers and multiplying two of them is where that ceiling
  # bites, so it is worth having a case at the far corner that a reader can
  # reach with one drag.
  shown <- metrics(0L, 800, 200)
  expect_false(is.na(shown$cost))
  expect_equal(shown$cost, 8213200)
})

test_that("raising the threshold trades recall for precision", {
  low <- metrics(1500L, 220, 25)
  high <- metrics(6000L, 220, 25)
  expect_gt(high$precision, low$precision)
  expect_lt(high$recall, low$recall)
  expect_lt(high$flagged, low$flagged)
})

test_that("a dearer miss pushes the cheapest threshold down", {
  cheap <- cost_sweep(220, 25)
  dear <- cost_sweep(600, 25)
  expect_equal(cheap$bestThreshold, 1200L)
  expect_equal(cheap$bestCost, 726970)
  expect_equal(dear$bestThreshold, 400L)
  expect_lt(dear$bestThreshold, cheap$bestThreshold)
})

test_that("a dearer offer pushes the cheapest threshold up", {
  dear <- cost_sweep(220, 120)
  expect_equal(dear$bestThreshold, 4200L)
  expect_equal(dear$bestCost, 1437300)
  expect_gt(dear$bestThreshold, cost_sweep(220, 25)$bestThreshold)
})

test_that("the cheapest threshold really is the cheapest", {
  sweep <- cost_sweep(220, 25)
  best <- sweep$cost[[match(sweep$bestThreshold, sweep$thresholds)]]
  expect_equal(best, min(sweep$cost))
  expect_equal(metrics(sweep$bestThreshold, 220, 25)$cost, best)
})

test_that("the curves are sent once and never move", {
  curves <- roc_points()
  expect_length(curves$thresholds, 101L)
  expect_equal(curves$recall[[1]], 1)
  expect_equal(curves$falsePositiveRate[[1]], 1)
  expect_equal(curves$precision[[1]], 0.17868)
  expect_equal(curves$thresholds[[31]], 3000L)
  expect_equal(curves$recall[[31]], 0.60477)
  expect_equal(curves$falsePositiveRate[[31]], 0.15037)
})

test_that("base64 comes back unwrapped, so both servers send the same bytes", {
  # jsonlite::base64_enc() breaks its output every 72 characters. Left in,
  # the R payload is larger than the Python one and no longer decodes in the
  # browser the same way.
  payload <- scores_payload()
  expect_false(grepl("\n", payload$score, fixed = TRUE))
  expect_equal(nchar(payload$score) + nchar(payload$left), 200004L)
})

test_that("the packed bytes decode back to the scores", {
  scored <- load_scores()
  payload <- scores_payload()
  decoded <- readBin(
    jsonlite::base64_dec(payload$score),
    "integer",
    n = CUSTOMER_COUNT,
    size = 2L,
    signed = FALSE,
    endian = "little"
  )
  expect_equal(decoded, scored$score)
})

test_that("the histogram accounts for every customer", {
  bars <- histogram()
  expect_equal(bars$bins, 60L)
  expect_length(bars$edges, 61L)
  expect_equal(bars$edges[[1]], 0L)
  expect_equal(bars$edges[[61]], SCORE_SCALE)
  expect_equal(sum(bars$left), 8934L)
  expect_equal(sum(bars$stayed), 41066L)
})

test_that("the first histogram bars are the ones Python builds", {
  # Both servers bin by arithmetic rather than by a library, because hist()
  # and np.histogram disagree about which side of a bin edge is closed.
  # as.integer strips the AsIs class that I() puts on, which is there so
  # jsonlite writes a one element count as an array rather than a bare number.
  bars <- histogram()
  expect_equal(
    as.integer(bars$left[1:8]),
    c(57L, 137L, 194L, 212L, 194L, 172L, 245L, 230L)
  )
  expect_equal(
    as.integer(bars$stayed[1:8]),
    c(3021L, 4413L, 4033L, 3431L, 2952L, 2574L, 2233L, 1907L)
  )
})

test_that("the summary carries what the page needs before anything else", {
  shown <- summary_payload()
  expect_equal(shown$customers, CUSTOMER_COUNT)
  expect_equal(shown$scoreScale, SCORE_SCALE)
  expect_equal(shown$auc, 0.81424)
  expect_equal(shown$defaultMissCost, 220)
  expect_equal(shown$defaultOfferCost, 25)
  expect_length(shown$curves$thresholds, 101L)
})
