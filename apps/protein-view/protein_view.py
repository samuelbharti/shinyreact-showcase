"""Pure computation for the protein viewer. No Shiny here.

The structure is a real one: 1UBQ, ubiquitin refined to 1.8 angstroms, from
the Protein Data Bank. Parsing it is a few column slices, because the PDB
format is fixed width and has been since 1976.

The split this app is about:

  The client renders the structure in 3D with 3Dmol.js. That library has no
  Shiny binding, and in a plain Shiny app using it at all would mean writing
  and shipping an htmlwidget package. Here it is an npm install.

  The server parses the file and answers questions about it: which residues
  are in a helix, what the temperature factors look like, what is in the
  structure besides protein. None of that is rendering.
"""

from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path

# The three letter codes, so a residue can be named rather than numbered.
AMINO_ACIDS = {
    "ALA": "A",
    "ARG": "R",
    "ASN": "N",
    "ASP": "D",
    "CYS": "C",
    "GLN": "Q",
    "GLU": "E",
    "GLY": "G",
    "HIS": "H",
    "ILE": "I",
    "LEU": "L",
    "LYS": "K",
    "MET": "M",
    "PHE": "F",
    "PRO": "P",
    "SER": "S",
    "THR": "T",
    "TRP": "W",
    "TYR": "Y",
    "VAL": "V",
}

# What the client can colour by. Every one of these is worked out here and
# sent as a plain list, so the viewer never has to understand chemistry.
COLOR_MODES = [
    "spectrum",
    "secondary structure",
    "temperature factor",
    "hydrophobicity",
]

# Kyte and Doolittle, the scale every textbook uses.
HYDROPHOBICITY = {
    "A": 1.8,
    "R": -4.5,
    "N": -3.5,
    "D": -3.5,
    "C": 2.5,
    "Q": -3.5,
    "E": -3.5,
    "G": -0.4,
    "H": -3.2,
    "I": 4.5,
    "L": 3.8,
    "K": -3.9,
    "M": 1.9,
    "F": 2.8,
    "P": -1.6,
    "S": -0.8,
    "T": -0.7,
    "W": -0.9,
    "Y": -1.3,
    "V": 4.2,
}


@dataclass(frozen=True)
class Residue:
    number: int
    chain: str
    code: str
    letter: str
    structure: str  # helix, sheet or coil
    mean_b: float


@dataclass(frozen=True, eq=False)
class Structure:
    pdb_id: str
    title: str
    text: str
    residues: list[Residue]
    chains: list[str]
    atom_count: int
    hetatm_count: int
    helices: int
    sheets: int
    resolution: float | None


def load_structure(path: Path) -> Structure:
    """Read a PDB file and work out what is in it."""
    text = path.read_text(encoding="utf-8")
    lines = text.splitlines()

    title_parts = [line[10:80].strip() for line in lines if line.startswith("TITLE")]
    pdb_id = ""
    resolution = None
    for line in lines:
        if line.startswith("HEADER"):
            pdb_id = line[62:66].strip()
        elif line.startswith("REMARK   2 RESOLUTION."):
            # Read after the word RESOLUTION, not the first number on the
            # line. The line starts "REMARK   2", so splitting on whitespace
            # and taking the first float gives 2, the remark number, which
            # looks like a plausible resolution and is not one.
            tail = line.split("RESOLUTION.", 1)[1]
            for token in tail.split():
                try:
                    resolution = float(token)
                    break
                except ValueError:
                    continue

    # HELIX and SHEET give the secondary structure directly. Working it out
    # from geometry is a whole algorithm, and the file already says.
    helix_ranges = []
    sheet_ranges = []
    for line in lines:
        if line.startswith("HELIX"):
            helix_ranges.append(
                (line[19].strip() or "A", int(line[21:25]), int(line[33:37]))
            )
        elif line.startswith("SHEET"):
            sheet_ranges.append(
                (line[21].strip() or "A", int(line[22:26]), int(line[33:37]))
            )

    # Temperature factors, averaged per residue. One number per atom is more
    # detail than a residue level colouring can use.
    b_totals: dict[tuple[str, int], list[float]] = {}
    seen: dict[tuple[str, int], str] = {}
    order: list[tuple[str, int]] = []
    atom_count = 0
    hetatm_count = 0

    for line in lines:
        if line.startswith("HETATM"):
            hetatm_count += 1
            continue
        if not line.startswith("ATOM"):
            continue

        atom_count += 1
        chain = line[21].strip() or "A"
        number = int(line[22:26])
        code = line[17:20].strip()
        key = (chain, number)

        if key not in seen:
            seen[key] = code
            order.append(key)
            b_totals[key] = []
        b_totals[key].append(float(line[60:66]))

    residues = []
    for chain, number in order:
        code = seen[(chain, number)]
        values = b_totals[(chain, number)]
        residues.append(
            Residue(
                number=number,
                chain=chain,
                code=code,
                letter=AMINO_ACIDS.get(code, "X"),
                structure=_structure_at(chain, number, helix_ranges, sheet_ranges),
                mean_b=round(sum(values) / len(values), 2),
            )
        )

    return Structure(
        pdb_id=pdb_id or path.stem.upper(),
        title=" ".join(title_parts).strip(),
        text=text,
        residues=residues,
        chains=sorted({residue.chain for residue in residues}),
        atom_count=atom_count,
        hetatm_count=hetatm_count,
        helices=len(helix_ranges),
        sheets=len(sheet_ranges),
        resolution=resolution,
    )


def _structure_at(chain, number, helix_ranges, sheet_ranges) -> str:
    for helix_chain, start, end in helix_ranges:
        if helix_chain == chain and start <= number <= end:
            return "helix"
    for sheet_chain, start, end in sheet_ranges:
        if sheet_chain == chain and start <= number <= end:
            return "sheet"
    return "coil"


def structure_payload(structure: Structure) -> dict:
    """The file itself, plus what the client cannot work out from it.

    3Dmol.js parses the PDB text, so that has to go. The per residue lists
    are the parsing the server already did, and sending them saves the client
    doing it again in a language that is worse at it.
    """
    return {
        "pdbId": structure.pdb_id,
        "title": structure.title,
        "text": structure.text,
        "chains": structure.chains,
        "colorModes": COLOR_MODES,
        "residueCount": len(structure.residues),
        "atomCount": structure.atom_count,
        "hetatmCount": structure.hetatm_count,
        "helices": structure.helices,
        "sheets": structure.sheets,
        "resolution": structure.resolution,
        "sequence": "".join(residue.letter for residue in structure.residues),
        "residues": [
            {
                "number": residue.number,
                "chain": residue.chain,
                "code": residue.code,
                "letter": residue.letter,
                "structure": residue.structure,
                "meanB": residue.mean_b,
                "hydrophobicity": HYDROPHOBICITY.get(residue.letter, 0.0),
            }
            for residue in structure.residues
        ],
    }


def composition(structure: Structure) -> dict:
    """A summary of the fold, for the panel beside the viewer."""
    counts = {"helix": 0, "sheet": 0, "coil": 0}
    for residue in structure.residues:
        counts[residue.structure] += 1

    total = max(1, len(structure.residues))
    b_values = [residue.mean_b for residue in structure.residues]

    return {
        "residues": len(structure.residues),
        "helix": counts["helix"],
        "sheet": counts["sheet"],
        "coil": counts["coil"],
        "helixShare": round(counts["helix"] / total, 3),
        "sheetShare": round(counts["sheet"] / total, 3),
        "coilShare": round(counts["coil"] / total, 3),
        "minB": round(min(b_values), 2) if b_values else 0.0,
        "maxB": round(max(b_values), 2) if b_values else 0.0,
        "meanB": round(sum(b_values) / len(b_values), 2) if b_values else 0.0,
    }


def residue_detail(
    structure: Structure, number: int, chain: str | None = None
) -> dict | None:
    """One residue, and how it sits relative to the rest.

    The viewer knows a residue was clicked, because 3Dmol tells it. What it
    does not know is where that residue sits in the distribution of
    temperature factors, which needs the whole structure.
    """
    for residue in structure.residues:
        if residue.number == number and (chain is None or residue.chain == chain):
            b_values = sorted(r.mean_b for r in structure.residues)
            rank = sum(1 for value in b_values if value < residue.mean_b)
            return {
                "number": residue.number,
                "chain": residue.chain,
                "code": residue.code,
                "letter": residue.letter,
                "structure": residue.structure,
                "meanB": residue.mean_b,
                "hydrophobicity": HYDROPHOBICITY.get(residue.letter, 0.0),
                "bPercentile": round(100 * rank / max(1, len(b_values) - 1), 1),
            }
    return None
