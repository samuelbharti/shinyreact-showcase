# Pure computation for the grid. No Shiny here.
#
# The R twin of big_grid.py. A million order rows, generated from a hash of
# the row number rather than stored, so all three of JavaScript, Python and R
# build the same table and the repo ships none of it.

N_ROWS <- 1000000L

REGIONS <- c("North", "South", "East", "West", "Central", "Coastal")
CATEGORIES <- c("Hardware", "Software", "Services", "Support", "Training")
STATUSES <- c("shipped", "pending", "returned", "cancelled")
# Roughly what an order book looks like: most ship, a few do not.
STATUS_WEIGHTS <- c(0.72, 0.18, 0.07, 0.03)

DAY_SPAN <- 1095L
EPOCH <- "2023-01-01"

COLUMNS <- c(
  "id",
  "date",
  "region",
  "category",
  "status",
  "quantity",
  "amount"
)

# A repeatable value in 0 to 1, from a row number and a salt.
#
# The multiplier on index is deliberately small. With a large one the
# argument to sin reaches into the hundreds of millions for a million rows,
# where JavaScript, numpy and R can disagree in the last bit, and a fractional
# part turns that into a visibly different row. At this scale the argument
# stays under fifteen thousand and all three agree.
hash_unit <- function(index, salt) {
  raw <- sin(index * 0.0137 + salt * 7.919) * 43758.5453
  raw - floor(raw)
}

# A million rows, built once. Columns are plain vectors, which is what R is
# fast at and what order() and the comparisons below want.
load_orders <- function(n = N_ROWS) {
  index <- seq_len(n) - 1

  region <- as.integer(hash_unit(index, 1) * length(REGIONS))
  category <- as.integer(hash_unit(index, 2) * length(CATEGORIES))
  status <- findInterval(hash_unit(index, 3), cumsum(STATUS_WEIGHTS))

  # Days since EPOCH, weighted towards recent orders.
  #
  # The skews here and below are whole number powers on purpose. A fractional
  # exponent costs R about 190 ms per column on a million rows, which is most
  # of a second for three of them, and it buys a distribution shape that a
  # square or a cube gives just as well.
  u4 <- hash_unit(index, 4)
  day <- as.integer(round((2 * u4 - u4 * u4) * DAY_SPAN))

  # Small orders are common, large ones are not.
  u5 <- hash_unit(index, 5)
  quantity <- as.integer(round(1 + u5 * u5 * u5 * 240))

  # Order value in whole pence, so it stays an integer on the wire.
  u6 <- hash_unit(index, 6)
  unit <- 400 + u6 * u6 * 48000
  amount <- as.integer(round(unit * quantity / 100))

  list(
    n = n,
    region = region,
    category = category,
    status = status,
    day = day,
    quantity = quantity,
    amount = amount
  )
}

# Everything the client needs to build the same million rows itself.
#
# The rows are not sent. This is the spec they are built from, and it is under
# a kilobyte.
grid_spec <- function() {
  list(
    rows = N_ROWS,
    epoch = EPOCH,
    daySpan = DAY_SPAN,
    regions = I(REGIONS),
    categories = I(CATEGORIES),
    statuses = I(STATUSES),
    statusWeights = I(STATUS_WEIGHTS),
    columns = I(COLUMNS)
  )
}

# Read a query off the wire, refusing anything that is not one.
#
# The client sends this, and a client can send anything. An unknown sort
# column would silently sort by nothing and look like a broken grid.
query_from <- function(raw) {
  if (is.null(raw)) {
    raw <- list()
  }
  sort_by <- raw$sortBy %||% "id"
  if (!(sort_by %in% COLUMNS)) {
    stop(
      "Cannot sort by ",
      sQuote(sort_by),
      ". Known columns: ",
      paste(sort(COLUMNS), collapse = ", ")
    )
  }

  limit <- as.integer(raw$limit %||% 50L)

  list(
    regions = as.integer(unlist(raw$regions %||% list())),
    statuses = as.integer(unlist(raw$statuses %||% list())),
    min_amount = as.integer(raw$minAmount %||% 0L),
    max_amount = as.integer(raw$maxAmount %||% 0L),
    sort_by = sort_by,
    descending = isTRUE(raw$descending),
    offset = max(0L, as.integer(raw$offset %||% 0L)),
    limit = max(1L, min(500L, limit))
  )
}

# Row numbers that pass the filters, in row order. Zero based, matching the
# client and the Python server.
matching <- function(orders, query) {
  keep <- rep(TRUE, orders$n)

  if (length(query$regions)) {
    keep <- keep & orders$region %in% query$regions
  }
  if (length(query$statuses)) {
    keep <- keep & orders$status %in% query$statuses
  }
  if (query$min_amount > 0L) {
    keep <- keep & orders$amount >= query$min_amount
  }
  if (query$max_amount > 0L) {
    keep <- keep & orders$amount <= query$max_amount
  }

  which(keep) - 1L
}

# Filter, sort and page, the way a server backed grid does it.
#
# This exists so the app can answer the same question both ways and show what
# each costs. Nothing else in the app calls it.
run_query <- function(orders, query) {
  rows <- matching(orders, query)

  column <- sort_column(orders, query$sort_by)
  order_of <- if (is.null(column)) {
    rows
  } else {
    # Stable, so rows with equal keys keep their id order and paging does not
    # shuffle them between requests.
    rows[order(column[rows + 1L], method = "radix")]
  }
  if (query$descending) {
    order_of <- rev(order_of)
  }

  from <- query$offset + 1L
  to <- min(length(order_of), query$offset + query$limit)
  page <- if (from > length(order_of)) integer(0) else order_of[from:to]

  list(
    total = length(rows),
    offset = query$offset,
    rows = I(lapply(page, function(index) grid_row(orders, index)))
  )
}

# One row, expanded into the labels a person reads. index is zero based.
grid_row <- function(orders, index) {
  at <- index + 1L
  list(
    id = index,
    day = orders$day[[at]],
    region = REGIONS[[orders$region[[at]] + 1L]],
    category = CATEGORIES[[orders$category[[at]] + 1L]],
    status = STATUSES[[orders$status[[at]] + 1L]],
    quantity = orders$quantity[[at]],
    amount = orders$amount[[at]]
  )
}

# Sums over everything that matches, not just the visible page.
#
# A grid can only add up what it has. This is the question that needs the
# whole table, and it is the same either way, so it is a fair thing for both
# paths to ask.
totals <- function(orders, query) {
  rows <- matching(orders, query)
  if (length(rows) == 0L) {
    return(list(rows = 0L, amount = 0, quantity = 0, meanAmount = 0))
  }

  at <- rows + 1L
  # as.numeric first: these sums pass two billion and would overflow R's
  # 32 bit integer to NA with only a warning.
  amount <- sum(as.numeric(orders$amount[at]))
  quantity <- sum(as.numeric(orders$quantity[at]))

  list(
    rows = length(rows),
    amount = amount,
    quantity = quantity,
    meanAmount = round(amount / length(rows), 2)
  )
}

sort_column <- function(orders, name) {
  if (identical(name, "id")) {
    return(NULL)
  }
  if (identical(name, "date")) {
    return(orders$day)
  }
  orders[[name]]
}

`%||%` <- function(a, b) if (is.null(a)) b else a
