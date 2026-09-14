# Layer one: the supply network and the allocation, with no Shiny.
#
# The numbers pinned here are the same ones apps/supply-flow/tests/
# test_supply_flow.py pins. Two languages solve this network, and a reader
# gets whichever one is serving. If they ever stop agreeing, one of these two
# suites fails.

nodes_by_id <- function(result) {
  stats::setNames(
    result$nodes,
    vapply(result$nodes, function(n) n$id, character(1))
  )
}

test_that("the shares out of every place add up to one", {
  # A routing table that does not sum to one is a silent leak.
  for (table in list(
    MARKET_FROM_CENTRE,
    CENTRE_FROM_FACTORY,
    FACTORY_FROM_SUPPLIER
  )) {
    for (name in names(table)) {
      expect_equal(sum(unlist(table[[name]])), 1, tolerance = 1e-9)
    }
  }
})

test_that("allocate splits by share when nobody is full", {
  step <- allocate(50, list(a = 0.6, b = 0.4), list(a = 100, b = 100))
  expect_equal(step$taken[["a"]], 30)
  expect_equal(step$taken[["b"]], 20)
  expect_equal(step$remaining, 0)
  # And the ceilings it used are gone from what it hands back.
  expect_equal(step$room[["a"]], 70)
})

test_that("allocate pushes the overflow onto whoever is left", {
  step <- allocate(
    50,
    list(small = 0.5, big = 0.5),
    list(small = 10, big = 100)
  )
  expect_equal(step$taken[["small"]], 10)
  expect_equal(step$taken[["big"]], 40)
  expect_equal(step$remaining, 0)
})

test_that("allocate reports what will not fit anywhere", {
  step <- allocate(50, list(a = 0.5, b = 0.5), list(a = 10, b = 10))
  expect_equal(step$taken[["a"]], 10)
  expect_equal(step$taken[["b"]], 10)
  expect_equal(step$remaining, 30)
})

test_that("allocate shares one ceiling between callers", {
  # The bug this function had, as a test. A supplier feeds several factories.
  # Called once per factory against a fresh copy of the ceilings, every call
  # would think it had the whole of that supplier, and the totals would run
  # past capacity with nothing to show for it. R copies on modify, so the
  # room has to be handed back and kept.
  first <- allocate(70, list(only = 1), list(only = 100))
  second <- allocate(70, list(only = 1), first$room)

  expect_equal(first$taken[["only"]], 70)
  expect_equal(second$taken[["only"]], 30)
  expect_equal(second$remaining, 40)
})

test_that("every scenario names itself and is reachable", {
  slugs <- vapply(SCENARIOS, function(s) s$slug, character(1))
  expect_equal(slugs, c("baseline", "port-closed", "demand-spike", "line-down"))
  for (slug in slugs) {
    expect_equal(scenario(slug)$slug, slug)
  }
})

test_that("an unknown scenario says what it knows", {
  expect_error(scenario("nope"), "baseline")
})

test_that("the network is the same shape in every scenario", {
  # Fourteen places, always. A place with nothing flowing through it still
  # belongs on the diagram, because a node that disappears cannot be animated
  # into its replacement.
  for (s in SCENARIOS) {
    result <- solve_flow(s$slug)
    expect_length(result$nodes, 14L)
    stages <- table(vapply(result$nodes, function(n) n$stage, character(1)))
    expect_equal(as.integer(stages[["supplier"]]), 4L)
    expect_equal(as.integer(stages[["factory"]]), 3L)
    expect_equal(as.integer(stages[["centre"]]), 3L)
    expect_equal(as.integer(stages[["market"]]), 4L)
  }
})

test_that("an ordinary week serves everyone", {
  result <- solve_flow("baseline")
  expect_equal(result$asked, 980)
  expect_equal(result$delivered, 980)
  expect_equal(result$shortfall, 0)
  expect_equal(result$servedShare, 1)
  expect_length(result$links, 32L)
})

test_that("rotterdam is already at its ceiling in an ordinary week", {
  # Which is why closing it costs more than its own share of the volume.
  node <- nodes_by_id(solve_flow("baseline"))[["rotterdam"]]
  expect_equal(node$value, 340)
  expect_equal(node$capacity, 340)
  expect_equal(node$spare, 0)
  expect_true(node$atCeiling)
})

test_that("closing the port leaves demand unmet at the suppliers", {
  result <- solve_flow("port-closed")
  expect_equal(result$delivered, 860)
  expect_equal(result$shortfall, 120)
  expect_equal(result$servedShare, 0.8776)
  expect_equal(result$shortAt$suppliers, 120)
  expect_equal(result$shortAt$factories, 0)

  places <- nodes_by_id(result)
  expect_equal(places[["rotterdam"]]$value, 0)
  for (name in c("shenzhen", "veracruz", "durban")) {
    expect_true(places[[name]]$atCeiling)
  }
})

test_that("a demand spike runs out at the factories instead", {
  result <- solve_flow("demand-spike")
  expect_equal(result$asked, 1148)
  expect_equal(result$delivered, 1100)
  expect_equal(result$shortfall, 48)
  expect_equal(result$shortAt$factories, 48)
  expect_equal(result$shortAt$suppliers, 0)
})

test_that("losing a factory line moves the work and loses some of it", {
  result <- solve_flow("line-down")
  expect_equal(result$delivered, 890)
  expect_equal(result$shortfall, 90)
  expect_equal(result$servedShare, 0.9082)

  places <- nodes_by_id(result)
  expect_equal(places[["gdansk"]]$capacity, 210)
  expect_true(places[["leeds"]]$atCeiling)
})

test_that("nothing is ever allocated past a ceiling", {
  for (s in SCENARIOS) {
    for (node in solve_flow(s$slug)$nodes) {
      if (is.null(node$capacity)) {
        next
      }
      expect_lte(node$value, node$capacity + 1e-6)
    }
  }
})

test_that("what arrives at a place is what leaves it", {
  # Conservation, at the two stages that only pass volume along. The model
  # pulls demand backwards, which sizes the downstream arrows from what was
  # wanted and the upstream ones from what could be had. Without the forward
  # pass that follows, a factory that cannot get materials would still be
  # shipping the full amount onward, and the diagram would show volume
  # appearing out of nothing.
  for (s in SCENARIOS) {
    result <- solve_flow(s$slug)
    incoming <- list()
    outgoing <- list()
    for (link in result$links) {
      outgoing[[link$source]] <- (if (is.null(outgoing[[link$source]])) {
        0
      } else {
        outgoing[[link$source]]
      }) +
        link$value
      incoming[[link$target]] <- (if (is.null(incoming[[link$target]])) {
        0
      } else {
        incoming[[link$target]]
      }) +
        link$value
    }

    for (node in result$nodes) {
      if (!(node$stage %in% c("factory", "centre"))) {
        next
      }
      went_in <- if (is.null(incoming[[node$id]])) 0 else incoming[[node$id]]
      came_out <- if (is.null(outgoing[[node$id]])) 0 else outgoing[[node$id]]
      expect_lt(abs(went_in - came_out), 0.3)
    }
  }
})

test_that("every link joins two places that exist", {
  for (s in SCENARIOS) {
    result <- solve_flow(s$slug)
    known <- vapply(result$nodes, function(n) n$id, character(1))
    for (link in result$links) {
      expect_true(link$source %in% known)
      expect_true(link$target %in% known)
      expect_gt(link$value, 0)
    }
  }
})

test_that("a link appears at most once", {
  # The browser keys its ribbons by source and target, so a repeat would be
  # two elements fighting over one key.
  for (s in SCENARIOS) {
    pairs <- vapply(
      solve_flow(s$slug)$links,
      function(l) paste0(l$source, ">", l$target),
      character(1)
    )
    expect_equal(length(pairs), length(unique(pairs)))
  }
})

test_that("the catalogue lists every scenario for the buttons", {
  shown <- catalogue()
  expect_equal(
    vapply(shown$scenarios, function(s) s$slug, character(1)),
    vapply(SCENARIOS, function(s) s$slug, character(1))
  )
  expect_equal(shown$nodeCount, 14L)
  expect_equal(as.character(shown$stages), STAGES)
})
