# Layer one: pure functions, no Shiny. These are the cheapest tests and they
# are where the real logic is checked.

test_that("histogram splits a known range into equal buckets", {
  result <- histogram(c(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10), bins = 5)

  expect_length(result$counts, 5)
  expect_length(result$breaks, 6)
  expect_equal(sum(result$counts), 11)
  expect_equal(result$breaks[[1]], 0)
  expect_equal(result$breaks[[6]], 10)
})

test_that("the maximum value lands in the last bucket, not past the end", {
  result <- histogram(c(0, 10), bins = 2)

  expect_equal(sum(result$counts), 2)
  expect_equal(result$counts[[2]], 1)
})

test_that("one distinct value gives one bucket rather than an error", {
  result <- histogram(c(4, 4, 4), bins = 8)

  expect_equal(as.numeric(result$counts), 3)
})

test_that("no values gives empty vectors rather than an error", {
  result <- histogram(numeric(0), bins = 4)

  expect_length(result$counts, 0)
})

test_that("bins below one is rejected", {
  expect_error(histogram(c(1, 2, 3), bins = 0), "at least 1")
})
