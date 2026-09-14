# Layer one: the PDB parser, with no Shiny anywhere.
#
# These mirror tests/test_protein_view.py. Both servers read the same file, so
# the pinned numbers are where the two stop being assumed to agree.

test_that("the header is read", {
  expect_equal(STRUCTURE$pdb_id, "1UBQ")
  expect_match(STRUCTURE$title, "UBIQUITIN")
})

test_that("the resolution is the one in the file, not the remark number", {
  # The line reads "REMARK   2 RESOLUTION.    1.80 ANGSTROMS." Taking the
  # first number on it gives 2, the remark number, which is a plausible
  # looking resolution and the wrong one.
  expect_equal(STRUCTURE$resolution, 1.8)
})

test_that("ubiquitin is the length it should be", {
  expect_length(STRUCTURE$residues, 76L)
  expect_equal(STRUCTURE$atom_count, 602L)
})

test_that("the sequence is ubiquitin", {
  # The real sequence, which is the strongest single check that the file was
  # parsed correctly rather than plausibly.
  sequence <- PAYLOAD$sequence
  expect_true(startsWith(
    sequence,
    "MQIFVKTLTGKTITLEVEPSDTIENVKAKIQDKEGIPPDQQRLIFAGK"
  ))
  expect_true(endsWith(sequence, "LRLRGG"))
  expect_equal(nchar(sequence), 76L)
})

test_that("secondary structure comes from the file", {
  expect_equal(STRUCTURE$helices, 2L)
  expect_equal(STRUCTURE$sheets, 5L)

  kinds <- unique(vapply(STRUCTURE$residues, function(r) r$structure, ""))
  expect_setequal(kinds, c("helix", "sheet", "coil"))
})

test_that("the helix covers the residues the file names", {
  # HELIX 1 runs from ILE 23 to GLU 34.
  numbers <- vapply(STRUCTURE$residues, function(r) r$number, integer(1))
  kinds <- vapply(STRUCTURE$residues, function(r) r$structure, "")

  expect_equal(kinds[numbers == 23L], "helix")
  expect_equal(kinds[numbers == 34L], "helix")
  expect_false(kinds[numbers == 22L] == "helix")
  expect_false(kinds[numbers == 35L] == "helix")
})

test_that("hetatm records are counted but not residues", {
  # 1UBQ has 58 waters. They are in the file, they are not the protein.
  expect_equal(STRUCTURE$hetatm_count, 58L)
  codes <- vapply(STRUCTURE$residues, function(r) r$code, "")
  expect_false(any(codes == "HOH"))
})

test_that("the composition adds up", {
  fold <- composition(STRUCTURE)

  expect_equal(fold$helix + fold$sheet + fold$coil, fold$residues)
  expect_lt(abs(fold$helixShare + fold$sheetShare + fold$coilShare - 1), 0.002)
})

test_that("R agrees with Python on the composition", {
  # The numbers on the right came from running tests/test_protein_view.py.
  fold <- composition(STRUCTURE)

  expect_equal(fold$helix, 16L)
  expect_equal(fold$sheet, 33L)
  expect_equal(fold$coil, 27L)
  expect_equal(fold$minB, 3.8)
  expect_equal(fold$maxB, 38.64)
  expect_equal(fold$meanB, 13.27)
})

test_that("the payload carries the file itself", {
  # 3Dmol parses the PDB text. Sending a summary instead would mean
  # reimplementing a PDB parser in the browser.
  expect_true(startsWith(PAYLOAD$text, "HEADER"))
  expect_length(PAYLOAD$residues, 76L)
  expect_equal(as.character(PAYLOAD$colorModes), COLOR_MODES)
})

test_that("R agrees with Python on the known residue", {
  detail <- residue_detail(STRUCTURE, 23L)

  expect_equal(detail$code, "ILE")
  expect_equal(detail$structure, "helix")
  expect_equal(detail$meanB, 10.29)
  expect_equal(detail$bPercentile, 42.7)
  expect_equal(detail$hydrophobicity, 4.5)
})

test_that("an unknown residue gives nothing rather than an error", {
  expect_null(residue_detail(STRUCTURE, 999L))
  expect_null(residue_detail(STRUCTURE, 23L, chain = "Z"))
})

test_that("a file with no helix records still parses", {
  # A structure with no declared secondary structure is coil throughout, not
  # an error.
  tmp <- withr::local_tempdir()
  lines <- readLines(file.path(APP_DIR, "data", "1ubq.pdb"), warn = FALSE)
  keep <- !startsWith(lines, "HELIX") & !startsWith(lines, "SHEET")
  writeLines(lines[keep], file.path(tmp, "coil.pdb"))

  stripped <- load_structure(file.path(tmp, "coil.pdb"))

  expect_length(stripped$residues, 76L)
  kinds <- vapply(stripped$residues, function(r) r$structure, "")
  expect_true(all(kinds == "coil"))
})
