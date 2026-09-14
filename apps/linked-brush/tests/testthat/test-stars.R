# Layer one: the star catalogue and the fit, with no Shiny.
#
# The numbers pinned here are the same ones apps/linked-brush/tests/
# test_linked_brush.py pins. That is the point of the file: two languages
# build the catalogue, and a browser is given whichever one is serving. If
# they ever stop agreeing, one of these two suites fails.

DWARF_BRUSH <- list(
  hr = list(x0 = -0.1507, x1 = 0.846, y0 = 9.4116, y1 = 16.0644)
)
DWARF_AND_NEAR <- c(DWARF_BRUSH, list(distance = list(x0 = 0.254, x1 = 1.541)))

test_that("the hash stays inside the unit interval", {
  values <- hash_unit(seq_len(STAR_COUNT) - 1, 21)
  expect_gte(min(values), 0)
  expect_lt(max(values), 1)
})

test_that("the hash argument stays small enough to agree across languages", {
  # sin() past about fifteen thousand radians is where R, Python and
  # JavaScript stop agreeing in the last bit.
  largest <- (STAR_COUNT - 1) * 0.0137 + 34 * 7.919
  expect_lt(largest, 15000)
})

test_that("the main sequence relation matches the spectral type table", {
  for (pair in list(c(0.00, 0.60), c(0.65, 4.83), c(1.40, 8.80))) {
    expect_lt(abs(main_sequence_magnitude(pair[[1]]) - pair[[2]]), 0.5)
  }
})

test_that("the catalogue is the size it claims", {
  tab <- load_catalogue()
  for (field in names(SCALES)) {
    expect_length(tab[[field]], STAR_COUNT)
  }
  expect_length(tab$population, STAR_COUNT)
})

test_that("every field is packed small enough to survive a signed short", {
  # writeBin(size = 2) silently takes the low two bytes, so a field that
  # outgrew a short would reach the browser as nonsense from this server
  # only, and the Python one would look fine.
  tab <- load_catalogue()
  for (field in names(SCALES)) {
    expect_gt(min(tab[[field]]), -32768)
    expect_lt(max(tab[[field]]), 32767)
  }
})

test_that("the populations are the shares they were drawn at", {
  tab <- load_catalogue()
  counts <- tabulate(tab$population + 1L, nbins = 3L)
  expect_equal(counts, c(31180L, 6561L, 2259L))
  expect_equal(sum(counts), STAR_COUNT)
})

test_that("the first, middle and last stars are the ones Python builds", {
  tab <- load_catalogue()
  row <- function(i) {
    c(
      tab$colour[i],
      tab$absolute[i],
      tab$longitude[i],
      tab$latitude[i],
      tab$logDistance[i],
      tab$apparent[i],
      tab$population[i]
    )
  }
  expect_equal(row(1L), c(1919L, 1116L, -6851L, -31L, 853L, 1042L, 0L))
  expect_equal(row(10000L), c(1588L, 1015L, 9006L, 703L, 1208L, 1119L, 0L))
  expect_equal(row(40000L), c(560L, 1348L, 8200L, -5350L, 590L, 1143L, 2L))
})

test_that("white dwarfs sit below the main sequence", {
  tab <- load_catalogue()
  dwarfs <- tab$absolute[tab$population == WHITE_DWARF] / 100
  main <- tab$absolute[tab$population == MAIN_SEQUENCE] / 100
  expect_gt(min(dwarfs), 9)
  expect_gt(stats::median(dwarfs), stats::median(main))
})

test_that("nothing is further away than the survey could see", {
  # A bright star is visible much further off than a faint one, which is the
  # fact the whole app is built to show. The floor on distance lets a few
  # very faint nearby stars sit just past the limit.
  tab <- load_catalogue()
  expect_lt(max(tab$apparent / 100), APPARENT_LIMIT + 1)
})

test_that("the furthest stars lie in the disc", {
  tab <- load_catalogue()
  far <- tab$logDistance > 3000
  near <- tab$logDistance < 1500
  expect_gt(sum(far), 100)
  expect_gt(sum(near), 100)
  expect_lt(mean(abs(tab$latitude[far] / 100)), 10)
  expect_gt(mean(abs(tab$latitude[near] / 100)), 20)
})

test_that("the ranges are the ones the client scales with", {
  ranges <- summary_payload()$ranges
  expect_equal(names(ranges), names(SCALES))
  expect_equal(ranges$colour, list(min = -0.388, max = 1.985))
  expect_equal(ranges$logDistance, list(min = 0.176, max = 4.076))
})

test_that("base64 comes back unwrapped, so both servers send the same bytes", {
  # jsonlite::base64_enc() breaks its output every 72 characters. Left in,
  # the R payload is larger than the Python one and no longer decodes in the
  # browser the same way.
  payload <- catalogue_payload()
  expect_false(grepl("\n", payload$colour, fixed = TRUE))
  expect_equal(nchar(payload$colour), 106668L)
  encoded <- sum(nchar(unlist(payload[vapply(payload, is.character, TRUE)])))
  expect_equal(encoded, 693344L)
})

test_that("the packed bytes decode back to the table", {
  tab <- load_catalogue()
  payload <- catalogue_payload()
  raw_bytes <- jsonlite::base64_dec(payload$colour)
  decoded <- readBin(
    raw_bytes,
    "integer",
    n = STAR_COUNT,
    size = 2L,
    signed = TRUE,
    endian = "little"
  )
  expect_equal(decoded, tab$colour)
})

test_that("no brush selects everything", {
  tab <- load_catalogue()
  expect_equal(sum(select_stars(tab, NULL)), STAR_COUNT)
  expect_equal(sum(select_stars(tab, list())), STAR_COUNT)
})

test_that("a brush edge includes the star sitting on it", {
  # The client is sent these integers and divides them the same way, so a
  # star exactly on an edge has to land on the same side in both.
  tab <- load_catalogue()
  colour <- tab$colour / SCALES$colour
  edge <- colour[[1]]
  keep <- select_stars(
    tab,
    list(hr = list(x0 = edge, x1 = edge, y0 = -99, y1 = 99))
  )
  expect_true(keep[[1]])
  expect_equal(sum(keep), sum(colour == edge))
})

test_that("brushes narrow each other rather than adding up", {
  tab <- load_catalogue()
  expect_lt(
    sum(select_stars(tab, DWARF_AND_NEAR)),
    sum(select_stars(tab, DWARF_BRUSH))
  )
  expect_equal(sum(select_stars(tab, DWARF_AND_NEAR)), 1901L)
})

test_that("the white dwarf brush answers what the browser saw", {
  result <- fit_selection(DWARF_BRUSH)
  expect_equal(result$stars, 2110L)
  expect_equal(as.integer(result$populationCounts), c(0L, 0L, 2110L))
  expect_equal(result$medianParsecs, 4.43)
  expect_equal(result$fit$slope, 4.5996)
  expect_equal(result$fit$intercept, 10.8441)
  expect_equal(result$fit$scatter, 0.4433)
  expect_equal(result$fit$correlation, 0.9428)
})

test_that("the fit recovers the slope the dwarfs were drawn with", {
  # The sequence is built at 4.60 magnitudes per unit of colour, so a least
  # squares line through the scattered result should find it again.
  expect_lt(abs(fit_selection(DWARF_BRUSH)$fit$slope - 4.60), 0.05)
})

test_that("adding the distance brush changes the answer", {
  result <- fit_selection(DWARF_AND_NEAR)
  expect_equal(result$stars, 1901L)
  expect_equal(result$medianParsecs, 4.94)
  expect_equal(result$fit$slope, 4.4915)
  expect_equal(result$fit$correlation, 0.9376)
})

test_that("the giant branch slopes the other way", {
  result <- fit_selection(list(
    hr = list(x0 = 0.8, x1 = 1.8, y0 = -3, y1 = 2.5)
  ))
  expect_equal(result$stars, 6149L)
  expect_equal(as.integer(result$populationCounts), c(0L, 6149L, 0L))
  expect_lt(result$fit$slope, 0)
  expect_gt(result$medianParsecs, 1000)
})

test_that("the main sequence brush finds mostly main sequence stars", {
  result <- fit_selection(list(hr = list(x0 = 0.4, x1 = 1.3, y0 = 3, y1 = 9)))
  expect_equal(result$stars, 13339L)
  expect_equal(as.integer(result$populationCounts), c(13202L, 137L, 0L))
  expect_equal(result$medianParsecs, 84.14)
})

test_that("the dwarfs and the main sequence disagree about distance", {
  # The claim on the card, as an assertion. Both selections are a few
  # thousand stars, and one sits fifteen times closer than the other.
  dwarfs <- fit_selection(DWARF_BRUSH)
  main <- fit_selection(list(hr = list(x0 = 0.4, x1 = 1.3, y0 = 3, y1 = 9)))
  expect_lt(dwarfs$medianParsecs * 15, main$medianParsecs)
})

test_that("an empty selection leaves the fit out rather than nulling it", {
  # R drops a NULL out of a list, and jsonlite writes an empty object for one
  # that survives, so a key that is sometimes null is a key the two servers
  # disagree about. The client checks for the key, so it has to be missing.
  result <- fit_selection(list(hr = list(x0 = 9, x1 = 9.1, y0 = 0, y1 = 1)))
  expect_equal(result$stars, 0L)
  expect_equal(as.integer(result$populationCounts), c(0L, 0L, 0L))
  expect_false("fit" %in% names(result))
  expect_false("medianParsecs" %in% names(result))
  expect_false("colourRange" %in% names(result))

  encoded <- jsonlite::toJSON(result, auto_unbox = TRUE)
  expect_false(grepl("{}", encoded, fixed = TRUE))
})

test_that("a selection with no spread in colour gets counted but not fitted", {
  tab <- load_catalogue()
  edge <- tab$colour[[1]] / SCALES$colour
  result <- fit_selection(
    list(hr = list(x0 = edge, x1 = edge, y0 = -99, y1 = 99))
  )
  expect_gte(result$stars, 1L)
  expect_false("fit" %in% names(result))
})

test_that("the population names are the ones the panel colours", {
  expect_equal(POPULATIONS, c("Main sequence", "Giants", "White dwarfs"))
  expect_equal(as.character(summary_payload()$populations), POPULATIONS)
})
