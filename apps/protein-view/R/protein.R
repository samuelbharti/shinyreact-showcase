# Pure computation for the protein viewer. No Shiny here.
#
# The R twin of protein_view.py. Both read the same PDB file, so the two
# servers report the same fold and the same numbers.
#
# The PDB format is fixed width and has been since 1976, so parsing it is a
# few substr() calls rather than a dependency.

AMINO_ACIDS <- c(
  ALA = "A",
  ARG = "R",
  ASN = "N",
  ASP = "D",
  CYS = "C",
  GLN = "Q",
  GLU = "E",
  GLY = "G",
  HIS = "H",
  ILE = "I",
  LEU = "L",
  LYS = "K",
  MET = "M",
  PHE = "F",
  PRO = "P",
  SER = "S",
  THR = "T",
  TRP = "W",
  TYR = "Y",
  VAL = "V"
)

# What the client can colour by. Worked out here and sent as a plain list, so
# the viewer never has to understand chemistry.
COLOR_MODES <- c(
  "spectrum",
  "secondary structure",
  "temperature factor",
  "hydrophobicity"
)

# Kyte and Doolittle, the scale every textbook uses.
HYDROPHOBICITY <- c(
  A = 1.8,
  R = -4.5,
  N = -3.5,
  D = -3.5,
  C = 2.5,
  Q = -3.5,
  E = -3.5,
  G = -0.4,
  H = -3.2,
  I = 4.5,
  L = 3.8,
  K = -3.9,
  M = 1.9,
  F = 2.8,
  P = -1.6,
  S = -0.8,
  T = -0.7,
  W = -0.9,
  Y = -1.3,
  V = 4.2
)

# Read a PDB file and work out what is in it.
load_structure <- function(path) {
  lines <- readLines(path, warn = FALSE)
  text <- paste(lines, collapse = "\n")

  title <- trimws(paste(
    trimws(substr(lines[startsWith(lines, "TITLE")], 11, 80)),
    collapse = " "
  ))

  header <- lines[startsWith(lines, "HEADER")]
  pdb_id <- if (length(header)) trimws(substr(header[[1]], 63, 66)) else ""

  resolution <- NULL
  res_lines <- lines[startsWith(lines, "REMARK   2 RESOLUTION.")]
  if (length(res_lines)) {
    # Read after the word RESOLUTION, not the first number on the line. The
    # line starts "REMARK   2", so taking the first number gives 2, the
    # remark number, which looks like a plausible resolution and is not one.
    tail <- strsplit(res_lines[[1]], "RESOLUTION.", fixed = TRUE)[[1]][[2]]
    found <- suppressWarnings(as.numeric(strsplit(trimws(tail), "\\s+")[[1]]))
    found <- found[!is.na(found)]
    if (length(found)) resolution <- found[[1]]
  }

  # HELIX and SHEET give the secondary structure directly. Working it out
  # from geometry is a whole algorithm, and the file already says.
  helix_lines <- lines[startsWith(lines, "HELIX")]
  helices <- lapply(helix_lines, function(line) {
    list(
      chain = default_chain(substr(line, 20, 20)),
      start = as.integer(substr(line, 22, 25)),
      end = as.integer(substr(line, 34, 37))
    )
  })

  sheet_lines <- lines[startsWith(lines, "SHEET")]
  sheets <- lapply(sheet_lines, function(line) {
    list(
      chain = default_chain(substr(line, 22, 22)),
      start = as.integer(substr(line, 23, 26)),
      end = as.integer(substr(line, 34, 37))
    )
  })

  atom_lines <- lines[startsWith(lines, "ATOM")]
  hetatm_count <- sum(startsWith(lines, "HETATM"))

  chains <- vapply(atom_lines, function(l) default_chain(substr(l, 22, 22)), "")
  numbers <- as.integer(substr(atom_lines, 23, 26))
  codes <- trimws(substr(atom_lines, 18, 20))
  b_factors <- as.numeric(substr(atom_lines, 61, 66))

  # Temperature factors, averaged per residue. One number per atom is more
  # detail than a residue level colouring can use.
  keys <- paste(chains, numbers, sep = ":")
  first_at <- !duplicated(keys)
  mean_b <- round(tapply(b_factors, keys, mean), 2)

  residue_keys <- keys[first_at]
  residues <- lapply(seq_along(residue_keys), function(i) {
    key <- residue_keys[[i]]
    chain <- chains[first_at][[i]]
    number <- numbers[first_at][[i]]
    code <- codes[first_at][[i]]
    letter <- if (code %in% names(AMINO_ACIDS)) AMINO_ACIDS[[code]] else "X"

    list(
      number = number,
      chain = chain,
      code = code,
      letter = letter,
      structure = structure_at(chain, number, helices, sheets),
      mean_b = unname(mean_b[[key]])
    )
  })

  list(
    pdb_id = if (nzchar(pdb_id)) {
      pdb_id
    } else {
      toupper(tools::file_path_sans_ext(basename(path)))
    },
    title = title,
    text = text,
    residues = residues,
    chains = sort(unique(chains)),
    atom_count = length(atom_lines),
    hetatm_count = hetatm_count,
    helices = length(helices),
    sheets = length(sheets),
    resolution = resolution
  )
}

default_chain <- function(value) {
  value <- trimws(value)
  if (nzchar(value)) value else "A"
}

structure_at <- function(chain, number, helices, sheets) {
  for (helix in helices) {
    if (
      identical(helix$chain, chain) &&
        number >= helix$start &&
        number <= helix$end
    ) {
      return("helix")
    }
  }
  for (sheet in sheets) {
    if (
      identical(sheet$chain, chain) &&
        number >= sheet$start &&
        number <= sheet$end
    ) {
      return("sheet")
    }
  }
  "coil"
}

# The file itself, plus what the client cannot work out from it.
#
# 3Dmol.js parses the PDB text, so that has to go. The per residue lists are
# the parsing the server already did.
structure_payload <- function(structure) {
  residues <- lapply(structure$residues, function(residue) {
    list(
      number = residue$number,
      chain = residue$chain,
      code = residue$code,
      letter = residue$letter,
      structure = residue$structure,
      meanB = residue$mean_b,
      hydrophobicity = hydrophobicity_of(residue$letter)
    )
  })

  list(
    pdbId = structure$pdb_id,
    title = structure$title,
    text = structure$text,
    chains = I(structure$chains),
    colorModes = I(COLOR_MODES),
    residueCount = length(structure$residues),
    atomCount = structure$atom_count,
    hetatmCount = structure$hetatm_count,
    helices = structure$helices,
    sheets = structure$sheets,
    resolution = structure$resolution,
    sequence = paste(
      vapply(structure$residues, function(r) r$letter, ""),
      collapse = ""
    ),
    residues = I(residues)
  )
}

hydrophobicity_of <- function(letter) {
  if (letter %in% names(HYDROPHOBICITY)) HYDROPHOBICITY[[letter]] else 0
}

# A summary of the fold, for the panel beside the viewer.
composition <- function(structure) {
  kinds <- vapply(structure$residues, function(r) r$structure, "")
  b_values <- vapply(structure$residues, function(r) r$mean_b, numeric(1))
  total <- max(1L, length(kinds))

  list(
    residues = length(structure$residues),
    helix = sum(kinds == "helix"),
    sheet = sum(kinds == "sheet"),
    coil = sum(kinds == "coil"),
    helixShare = round(sum(kinds == "helix") / total, 3),
    sheetShare = round(sum(kinds == "sheet") / total, 3),
    coilShare = round(sum(kinds == "coil") / total, 3),
    minB = round(min(b_values), 2),
    maxB = round(max(b_values), 2),
    meanB = round(mean(b_values), 2)
  )
}

# One residue, and how it sits relative to the rest.
#
# The viewer knows a residue was clicked, because 3Dmol tells it. What it does
# not know is where that residue sits in the distribution of temperature
# factors, which needs the whole structure.
residue_detail <- function(structure, number, chain = NULL) {
  for (residue in structure$residues) {
    matches <- residue$number == number &&
      (is.null(chain) || identical(residue$chain, chain))
    if (!matches) {
      next
    }

    b_values <- sort(vapply(
      structure$residues,
      function(r) r$mean_b,
      numeric(1)
    ))
    rank <- sum(b_values < residue$mean_b)

    return(list(
      number = residue$number,
      chain = residue$chain,
      code = residue$code,
      letter = residue$letter,
      structure = residue$structure,
      meanB = residue$mean_b,
      hydrophobicity = hydrophobicity_of(residue$letter),
      bPercentile = round(100 * rank / max(1L, length(b_values) - 1L), 1)
    ))
  }
  NULL
}
