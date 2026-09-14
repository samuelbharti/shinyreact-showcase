# A supply network, and what it does when something goes wrong.
#
# The R twin of supply_flow.py. Same tables, same allocation, same order of
# operations, so the two servers hand the browser the same diagram.

# Weekly volume, in thousands of units.
#
# id, label, and what each one can handle in a week. Suppliers are limited by
# what they can ship, factories by what they can build, and markets are not
# limited at all: their number is what they want.
SUPPLIERS <- list(
  list("rotterdam", "Rotterdam", 340),
  list("shenzhen", "Shenzhen", 420),
  list("veracruz", "Veracruz", 260),
  list("durban", "Durban", 180)
)

FACTORIES <- list(
  list("leeds", "Leeds", 380),
  list("gdansk", "Gdansk", 420),
  list("porto", "Porto", 300)
)

CENTRES <- list(
  list("midlands", "Midlands", 1e9),
  list("lyon", "Lyon", 1e9),
  list("milan", "Milan", 1e9)
)

MARKETS <- list(
  list("uk", "UK", 300),
  list("france", "France", 240),
  list("germany", "Germany", 280),
  list("iberia", "Iberia", 160)
)

# Who normally serves whom, as shares of the stage above. These are the
# routing preferences, not the outcome: a capped supplier or factory will push
# volume onto its neighbours, and that is what the scenarios are for.
MARKET_FROM_CENTRE <- list(
  uk = list(midlands = 0.90, lyon = 0.10, milan = 0.00),
  france = list(midlands = 0.10, lyon = 0.75, milan = 0.15),
  germany = list(midlands = 0.10, lyon = 0.40, milan = 0.50),
  iberia = list(midlands = 0.10, lyon = 0.55, milan = 0.35)
)

CENTRE_FROM_FACTORY <- list(
  midlands = list(leeds = 0.70, gdansk = 0.20, porto = 0.10),
  lyon = list(leeds = 0.20, gdansk = 0.45, porto = 0.35),
  milan = list(leeds = 0.10, gdansk = 0.55, porto = 0.35)
)

FACTORY_FROM_SUPPLIER <- list(
  leeds = list(
    rotterdam = 0.45,
    shenzhen = 0.35,
    veracruz = 0.15,
    durban = 0.05
  ),
  gdansk = list(
    rotterdam = 0.40,
    shenzhen = 0.45,
    veracruz = 0.10,
    durban = 0.05
  ),
  porto = list(
    rotterdam = 0.25,
    shenzhen = 0.30,
    veracruz = 0.30,
    durban = 0.15
  )
)

STAGES <- c("supplier", "factory", "centre", "market")

# One thing going wrong, as multipliers on the written down network.
SCENARIOS <- list(
  list(
    slug = "baseline",
    title = "Ordinary week",
    note = "Everything open, everyone building.",
    demand = list(),
    capacity = list(),
    supply = list()
  ),
  list(
    slug = "port-closed",
    title = "Rotterdam closed",
    note = "The largest European port stops. Volume has to come from further out.",
    demand = list(),
    capacity = list(),
    supply = list(rotterdam = 0)
  ),
  list(
    slug = "demand-spike",
    title = "German demand up 60%",
    note = "One market wants far more, and the network has to find it somewhere.",
    demand = list(germany = 1.6),
    capacity = list(),
    supply = list()
  ),
  list(
    slug = "line-down",
    title = "Gdansk at half capacity",
    note = "The biggest factory loses a line. Its work moves, and some does not.",
    demand = list(),
    capacity = list(gdansk = 0.5),
    supply = list()
  )
)

scenario <- function(slug) {
  for (option in SCENARIOS) {
    if (identical(option$slug, slug)) {
      return(option)
    }
  }
  stop(
    "No scenario called ",
    sQuote(slug),
    ". Known: ",
    paste(vapply(SCENARIOS, function(s) s$slug, character(1)), collapse = ", ")
  )
}

# A multiplier for one name, defaulting to leaving it alone.
multiplier <- function(table, name) {
  hit <- table[[name]]
  if (is.null(hit)) 1 else hit
}

# Split `total` by preference, then push the overflow onto whoever is left.
#
# Water filling. Everyone takes their share of what is left; anyone who hits
# their ceiling takes only what fits and the rest goes back in the pot for the
# next pass. That terminates, because each pass either empties the pot or
# takes at least one name out of it.
#
# `room` is how much headroom each name has left. R copies on modify, so it is
# handed back rather than changed in place, and the caller has to keep what
# comes back: a supplier serves several factories, and a ceiling that is not
# shared between those calls is not a ceiling at all.
allocate <- function(total, shares, room) {
  names_all <- names(shares)
  taken <- stats::setNames(rep(0, length(names_all)), names_all)
  active <- names_all[
    vapply(names_all, function(n) shares[[n]] > 0 && room[[n]] > 1e-9, TRUE)
  ]
  remaining <- total

  while (remaining > 1e-9 && length(active) > 0) {
    weight <- sum(vapply(active, function(n) shares[[n]], numeric(1)))
    if (weight <= 0) {
      break
    }

    spilled <- 0
    for (name in active) {
      want <- remaining * shares[[name]] / weight
      spare <- room[[name]]
      if (want >= spare) {
        taken[[name]] <- taken[[name]] + spare
        room[[name]] <- 0
        spilled <- spilled + want - spare
      } else {
        taken[[name]] <- taken[[name]] + want
        room[[name]] <- room[[name]] - want
      }
    }

    remaining <- spilled
    active <- active[vapply(active, function(n) room[[n]] > 1e-9, TRUE)]
  }

  list(taken = taken, remaining = remaining, room = room)
}

ceiling_table <- function(table, adjust) {
  names_all <- vapply(table, function(row) row[[1]], character(1))
  values <- vapply(
    table,
    function(row) row[[3]] * multiplier(adjust, row[[1]]),
    numeric(1)
  )
  as.list(stats::setNames(values, names_all))
}

# Pull demand back through the network and report every arrow.
#
# Backwards, because demand is what is known and supply is what has to be
# found. Each stage allocates what the stage below it asked for, subject to
# ceilings shared across the whole stage, and anything that will not fit is
# reported rather than quietly dropped.
#
# Markets are served in the order they are listed, so the first has first
# claim when a stage is tight. That is a policy rather than a fact, and saying
# so is better than pretending the model has not got one.
solve_flow <- function(slug) {
  plan <- scenario(slug)

  supply_room <- ceiling_table(SUPPLIERS, plan$supply)
  factory_room <- ceiling_table(FACTORIES, plan$capacity)
  centre_room <- ceiling_table(CENTRES, list())
  wanted <- ceiling_table(MARKETS, plan$demand)

  supply_left <- supply_room
  factory_left <- factory_room
  centre_left <- centre_room

  links <- list()
  add_link <- function(source, target, value) {
    links[[length(links) + 1L]] <<- list(
      source = source,
      target = target,
      value = value
    )
  }

  centre_load <- stats::setNames(
    rep(0, length(centre_room)),
    names(centre_room)
  )
  unserved <- 0
  for (row in MARKETS) {
    market <- row[[1]]
    step <- allocate(
      wanted[[market]],
      MARKET_FROM_CENTRE[[market]],
      centre_left
    )
    centre_left <- step$room
    unserved <- unserved + step$remaining
    for (centre in names(step$taken)) {
      value <- step$taken[[centre]]
      if (value <= 1e-9) {
        next
      }
      centre_load[[centre]] <- centre_load[[centre]] + value
      add_link(centre, market, value)
    }
  }

  factory_load <- stats::setNames(
    rep(0, length(factory_room)),
    names(factory_room)
  )
  unbuilt <- 0
  for (row in CENTRES) {
    centre <- row[[1]]
    step <- allocate(
      centre_load[[centre]],
      CENTRE_FROM_FACTORY[[centre]],
      factory_left
    )
    factory_left <- step$room
    unbuilt <- unbuilt + step$remaining
    for (factory in names(step$taken)) {
      value <- step$taken[[factory]]
      if (value <= 1e-9) {
        next
      }
      factory_load[[factory]] <- factory_load[[factory]] + value
      add_link(factory, centre, value)
    }
  }

  supplier_load <- stats::setNames(
    rep(0, length(supply_room)),
    names(supply_room)
  )
  unshipped <- 0
  for (row in FACTORIES) {
    factory <- row[[1]]
    step <- allocate(
      factory_load[[factory]],
      FACTORY_FROM_SUPPLIER[[factory]],
      supply_left
    )
    supply_left <- step$room
    unshipped <- unshipped + step$remaining
    for (supplier in names(step$taken)) {
      value <- step$taken[[supplier]]
      if (value <= 1e-9) {
        next
      }
      supplier_load[[supplier]] <- supplier_load[[supplier]] + value
      add_link(supplier, factory, value)
    }
  }

  # Backwards found the plan. Forwards finds what actually moves.
  #
  # The pull above sized the downstream arrows from demand and the upstream
  # ones from what could be had, so a factory that cannot get materials was
  # still shipping the full amount onward. On a diagram that is volume
  # appearing out of nothing. Each stage is now scaled down to what reached
  # it, and the shortfall travels all the way to the market that goes short.
  total_by <- function(rows, field) {
    totals <- list()
    for (link in rows) {
      key <- link[[field]]
      totals[[key]] <- (if (is.null(totals[[key]])) 0 else totals[[key]]) +
        link$value
    }
    totals
  }
  pick <- function(totals, key) {
    hit <- totals[[key]]
    if (is.null(hit)) 0 else hit
  }

  factory_names <- names(factory_room)
  centre_names <- names(centre_room)
  market_names <- names(wanted)

  to_centres <- which(vapply(
    links,
    function(l) l$source %in% factory_names,
    TRUE
  ))
  to_markets <- which(vapply(
    links,
    function(l) l$source %in% centre_names,
    TRUE
  ))
  to_factories <- which(vapply(
    links,
    function(l) l$target %in% factory_names,
    TRUE
  ))

  arrived_at_factory <- total_by(links[to_factories], "target")

  leaving_factory <- total_by(links[to_centres], "source")
  for (i in to_centres) {
    planned <- pick(leaving_factory, links[[i]]$source)
    got <- pick(arrived_at_factory, links[[i]]$source)
    links[[i]]$value <- if (planned > 0) {
      links[[i]]$value * (got / planned)
    } else {
      0
    }
  }

  arrived_at_centre <- total_by(links[to_centres], "target")

  leaving_centre <- total_by(links[to_markets], "source")
  for (i in to_markets) {
    planned <- pick(leaving_centre, links[[i]]$source)
    got <- pick(arrived_at_centre, links[[i]]$source)
    links[[i]]$value <- if (planned > 0) {
      links[[i]]$value * (got / planned)
    } else {
      0
    }
  }

  arrived_at_market <- total_by(links[to_markets], "target")

  # A node is worth what passes through it, which upstream is what it sends
  # and everywhere else is what it receives. After the scaling above those
  # are the same number.
  loads <- c(
    as.list(supplier_load),
    arrived_at_factory,
    arrived_at_centre,
    arrived_at_market
  )
  rooms <- c(supply_room, factory_room, centre_room)
  load_of <- function(name) {
    hit <- loads[[name]]
    if (is.null(hit)) 0 else hit
  }

  nodes <- list()
  stage_tables <- list(
    list("supplier", SUPPLIERS),
    list("factory", FACTORIES),
    list("centre", CENTRES),
    list("market", MARKETS)
  )
  for (pair in stage_tables) {
    stage <- pair[[1]]
    for (row in pair[[2]]) {
      name <- row[[1]]
      node <- list(
        id = name,
        label = row[[2]],
        stage = stage,
        value = round(load_of(name), 1)
      )
      if (stage == "market") {
        node$wanted <- round(wanted[[name]], 1)
        node$short <- round(max(0, wanted[[name]] - load_of(name)), 1)
      }
      if (stage %in% c("supplier", "factory")) {
        ceiling <- rooms[[name]]
        node$capacity <- round(ceiling, 1)
        node$spare <- round(max(0, ceiling - load_of(name)), 1)
        node$atCeiling <- (ceiling - load_of(name) < 1e-6) && ceiling > 0
      }
      nodes[[length(nodes) + 1L]] <- node
    }
  }

  asked <- sum(unlist(wanted))
  delivered <- sum(unlist(arrived_at_market))
  kept <- Filter(function(link) link$value > 1e-9, links)

  list(
    scenario = slug,
    nodes = nodes,
    links = lapply(kept, function(link) {
      list(
        source = link$source,
        target = link$target,
        value = round(link$value, 1)
      )
    }),
    asked = round(asked, 1),
    delivered = round(delivered, 1),
    shortfall = round(max(0, asked - delivered), 1),
    servedShare = if (asked > 0) round(delivered / asked, 4) else 0,
    shortAt = list(
      centres = round(unserved, 1),
      factories = round(unbuilt, 1),
      suppliers = round(unshipped, 1)
    )
  )
}

# The scenario list and the shape of the network. Sent once.
catalogue <- function() {
  list(
    scenarios = lapply(SCENARIOS, function(s) {
      list(slug = s$slug, title = s$title, note = s$note)
    }),
    stages = I(STAGES),
    nodeCount = length(SUPPLIERS) +
      length(FACTORIES) +
      length(CENTRES) +
      length(MARKETS)
  )
}
