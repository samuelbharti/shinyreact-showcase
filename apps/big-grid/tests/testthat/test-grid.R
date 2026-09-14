# Layer one: the table and the queries over it, with no Shiny anywhere.
#
# These mirror tests/test_big_grid.py. All three of JavaScript, Python and R
# build the same million rows from the same hash, so the pinned values below
# are what stops the three drifting apart.

test_that("the spec is small enough to be the whole payload", {
  # This is the point of generating rather than sending. A million rows as a
  # file is about thirteen megabytes. This is the alternative.
  expect_lt(nchar(jsonlite::toJSON(grid_spec(), auto_unbox = TRUE)), 1000)
})

test_that("the hash stays inside zero to one", {
  values <- hash_unit(0:49999, 2)
  expect_gte(min(values), 0)
  expect_lt(max(values), 1)
})

test_that("R agrees with Python and JavaScript on the hash", {
  expect_equal(hash_unit(0, 1), 0.08570585407142062)
  expect_equal(hash_unit(7, 3), 0.6120904732306371)
})

test_that("R agrees on the known rows", {
  first <- grid_row(ORDERS, 0L)

  expect_equal(first$id, 0L)
  expect_equal(first$day, 900L)
  expect_equal(first$region, "North")
  expect_equal(first$category, "Training")
  expect_equal(first$status, "shipped")
  expect_equal(first$quantity, 38L)
  expect_equal(first$amount, 194L)

  expect_equal(grid_row(ORDERS, 999999L)$amount, 407L)
  expect_equal(grid_row(ORDERS, 2L)$status, "pending")
})

test_that("the table is the size it says", {
  expect_equal(ORDERS$n, N_ROWS)
  expect_length(ORDERS$amount, N_ROWS)
})

test_that("every code is in range", {
  expect_lt(max(ORDERS$region), length(REGIONS))
  expect_lt(max(ORDERS$category), length(CATEGORIES))
  expect_lt(max(ORDERS$status), length(STATUSES))
})

test_that("statuses follow the weights", {
  shipped <- mean(ORDERS$status == 0L)
  expect_gt(shipped, 0.70)
  expect_lt(shipped, 0.74)
})

test_that("no filter matches everything", {
  expect_length(matching(ORDERS, query_from(list())), N_ROWS)
})

test_that("filters narrow and combine", {
  one <- matching(ORDERS, query_from(list(regions = list(0))))
  two <- matching(ORDERS, query_from(list(regions = list(0, 1))))
  both <- matching(
    ORDERS,
    query_from(list(regions = list(0), statuses = list(0)))
  )

  expect_lt(length(one), length(two))
  expect_lt(length(both), length(one))
})

test_that("an amount filter keeps only what it should", {
  rows <- matching(ORDERS, query_from(list(minAmount = 50000)))
  expect_gte(min(ORDERS$amount[rows + 1L]), 50000)
})

test_that("R agrees on the top rows by amount", {
  # The same three ids the browser and the Python server produce. Three
  # independent implementations of one hash, agreeing on a million rows.
  page <- run_query(
    ORDERS,
    query_from(list(sortBy = "amount", descending = TRUE, limit = 3))
  )
  ids <- vapply(page$rows, function(r) r$id, integer(1))

  expect_equal(ids, c(287216L, 60385L, 836118L))
  expect_equal(page$rows[[1]]$amount, 116078L)
})

test_that("sorting ascending and descending are mirror images", {
  up <- run_query(ORDERS, query_from(list(sortBy = "amount", limit = 3)))
  down <- run_query(
    ORDERS,
    query_from(list(sortBy = "amount", descending = TRUE, limit = 3))
  )

  expect_lte(up$rows[[1]]$amount, up$rows[[2]]$amount)
  expect_gte(down$rows[[1]]$amount, down$rows[[2]]$amount)
  expect_gt(down$rows[[1]]$amount, up$rows[[1]]$amount)
})

test_that("paging walks the same order", {
  first <- run_query(ORDERS, query_from(list(sortBy = "amount", limit = 10)))
  second <- run_query(
    ORDERS,
    query_from(list(sortBy = "amount", limit = 10, offset = 10))
  )

  expect_equal(first$total, N_ROWS)
  expect_lte(
    first$rows[[10]]$amount,
    second$rows[[1]]$amount
  )
  first_ids <- vapply(first$rows, function(r) r$id, integer(1))
  second_ids <- vapply(second$rows, function(r) r$id, integer(1))
  expect_length(intersect(first_ids, second_ids), 0L)
})

test_that("paging past the end returns nothing rather than failing", {
  page <- run_query(
    ORDERS,
    query_from(list(regions = list(0), offset = 10000000, limit = 10))
  )

  expect_length(page$rows, 0L)
  expect_gt(page$total, 0L)
})

test_that("an unknown sort column is refused", {
  expect_error(
    query_from(list(sortBy = "; drop table orders")),
    "Cannot sort by"
  )
})

test_that("the page size is capped", {
  expect_equal(query_from(list(limit = 10000))$limit, 500L)
  expect_equal(query_from(list(limit = 0))$limit, 1L)
})

test_that("totals cover everything that matched, not the page", {
  query <- query_from(list(regions = list(0), limit = 10))
  page <- run_query(ORDERS, query)
  summary <- totals(ORDERS, query)

  expect_equal(summary$rows, page$total)
  expect_gt(summary$rows, length(page$rows))
})

test_that("R agrees with Python on the totals", {
  summary <- totals(ORDERS, query_from(list()))

  expect_equal(summary$rows, N_ROWS)
  expect_equal(summary$amount, 9942166186)
  expect_equal(summary$quantity, 60831301)
  expect_equal(summary$meanAmount, 9942.17)
})

test_that("the totals survive R integer arithmetic", {
  # These sums pass two billion. As integers they would overflow to NA with
  # only a warning, and the grid would show a blank where the money goes.
  summary <- totals(ORDERS, query_from(list()))

  expect_false(is.na(summary$amount))
  expect_gt(summary$amount, 2^31)
})

test_that("totals of nothing are zero, not an error", {
  summary <- totals(ORDERS, query_from(list(minAmount = 10000000)))

  expect_equal(summary$rows, 0L)
  expect_equal(summary$amount, 0)
})
