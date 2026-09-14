"""Layer one: the PDB parser, with no Shiny anywhere.

What this app does, in plain English:

  The server reads a real PDB file, 1UBQ, and works out which residues are in
  a helix, which are in a sheet, and what their temperature factors are. It
  sends the file text and that table to the browser.

  The browser renders the structure in 3D with 3Dmol.js, a library that has
  no Shiny binding and did not need one. Orbiting, zooming and changing the
  representation are the viewer's own work.

  Clicking an atom asks the server where that residue sits against every
  other one, which needs the whole structure.
"""

import json
import sys
from pathlib import Path

import pytest

APP_DIR = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(APP_DIR))

# The app directory goes on sys.path just above.
from protein_view import (  # noqa: E402
    COLOR_MODES,
    composition,
    load_structure,
    residue_detail,
    structure_payload,
)

PDB = APP_DIR / "data" / "1ubq.pdb"


@pytest.fixture(scope="module")
def structure():
    return load_structure(PDB)


def test_the_header_is_read(structure):
    assert structure.pdb_id == "1UBQ"
    assert "UBIQUITIN" in structure.title


def test_the_resolution_is_the_one_in_the_file_not_the_remark_number(structure):
    # The line reads "REMARK   2 RESOLUTION.    1.80 ANGSTROMS." Taking the
    # first number on it gives 2, the remark number, which is a plausible
    # looking resolution and the wrong one.
    assert structure.resolution == 1.8


def test_ubiquitin_is_the_length_it_should_be(structure):
    # Ubiquitin is 76 residues. This is the check that the parser is reading
    # residues rather than atoms.
    assert len(structure.residues) == 76
    assert structure.atom_count == 602


def test_the_sequence_is_ubiquitin(structure):
    # The real sequence, which is the strongest single check that the file
    # was parsed correctly rather than plausibly.
    payload = structure_payload(structure)
    start = "MQIFVKTLTGKTITLEVEPSDTIENVKAKIQDKEGIPPDQQRLIFAGK"
    assert payload["sequence"].startswith(start)
    assert payload["sequence"].endswith("LRLRGG")
    assert len(payload["sequence"]) == 76


def test_secondary_structure_comes_from_the_file(structure):
    # 1UBQ declares two helices and five sheet strands.
    assert structure.helices == 2
    assert structure.sheets == 5

    kinds = {residue.structure for residue in structure.residues}
    assert kinds == {"helix", "sheet", "coil"}


def test_the_helix_covers_the_residues_the_file_names(structure):
    # HELIX 1 runs from ILE 23 to GLU 34.
    by_number = {residue.number: residue for residue in structure.residues}

    assert by_number[23].structure == "helix"
    assert by_number[34].structure == "helix"
    assert by_number[22].structure != "helix"
    assert by_number[35].structure != "helix"


def test_hetatm_records_are_counted_but_not_residues(structure):
    # 1UBQ has 58 waters. They are in the file, they are not the protein.
    assert structure.hetatm_count == 58
    assert all(residue.code != "HOH" for residue in structure.residues)


def test_the_composition_adds_up(structure):
    fold = composition(structure)

    assert fold["helix"] + fold["sheet"] + fold["coil"] == fold["residues"]
    assert abs(fold["helixShare"] + fold["sheetShare"] + fold["coilShare"] - 1) < 0.002


def test_the_known_composition_has_not_moved(structure):
    # Pinned so a change to the parser is deliberate. The R tests assert the
    # same numbers.
    fold = composition(structure)

    assert fold["helix"] == 16
    assert fold["sheet"] == 33
    assert fold["coil"] == 27
    assert fold["minB"] == 3.8
    assert fold["maxB"] == 38.64
    assert fold["meanB"] == 13.27


def test_the_payload_carries_the_file_itself(structure):
    # 3Dmol parses the PDB text. Sending a summary instead would mean
    # reimplementing a PDB parser in the browser.
    payload = structure_payload(structure)

    assert payload["text"].startswith("HEADER")
    assert len(payload["residues"]) == 76
    assert payload["colorModes"] == COLOR_MODES


def test_residue_detail_answers_what_needs_the_whole_structure(structure):
    detail = residue_detail(structure, 23)

    assert detail is not None
    assert detail["code"] == "ILE"
    assert detail["structure"] == "helix"
    # The percentile is the part the client could not work out from one
    # residue, which is why the click goes to the server.
    assert 0 <= detail["bPercentile"] <= 100


def test_the_known_residue_has_not_moved(structure):
    detail = residue_detail(structure, 23)

    assert detail["meanB"] == 10.29
    assert detail["bPercentile"] == 42.7
    assert detail["hydrophobicity"] == 4.5


def test_an_unknown_residue_gives_nothing_rather_than_an_error(structure):
    assert residue_detail(structure, 999) is None
    assert residue_detail(structure, 23, chain="Z") is None


def test_a_file_with_no_helix_records_still_parses(tmp_path):
    # A structure with no declared secondary structure is coil throughout,
    # not an error.
    lines = [
        line
        for line in PDB.read_text(encoding="utf-8").splitlines()
        if not line.startswith(("HELIX", "SHEET"))
    ]
    stripped = tmp_path / "coil.pdb"
    stripped.write_text("\n".join(lines), encoding="utf-8")

    structure = load_structure(stripped)

    assert len(structure.residues) == 76
    assert all(residue.structure == "coil" for residue in structure.residues)


def test_the_payload_is_json_serializable(structure):
    json.dumps(structure_payload(structure))
    json.dumps(composition(structure))
    json.dumps(residue_detail(structure, 1))
