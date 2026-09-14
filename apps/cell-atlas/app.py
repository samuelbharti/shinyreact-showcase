"""Cell atlas, the Python half. The React client in www/ owns the whole UI.

This file holds reactive computation and nothing else. The real work is in
cell_atlas.py so a test can reach it without starting Shiny.
"""

from pathlib import Path

from shiny import Inputs, Outputs, Session
from shinyreact import ReactApp, reactive_output

# `shiny run` puts this directory on sys.path but does not change the working
# directory, and the gallery imports this module from the repo root. __file__
# is the only anchor correct in both cases. Never use a relative path.
APP_DIR = Path(__file__).parent

from cell_atlas import (  # noqa: E402
    decode_selection,
    expression_payload,
    load_atlas,
    points_payload,
    selection_stats,
)

# Read once per process. Every session shares this, and so does the gallery,
# which imports this module at most once.
ATLAS = load_atlas(APP_DIR / "data")


def server(input: Inputs, output: Outputs, session: Session) -> None:
    @reactive_output
    def atlas_points():
        """The whole point cloud, sent once.

        This does not read any input, so Shiny sends it on connect and never
        again. About 1.3 MB of base64 for 200,000 cells.
        """
        return points_payload(ATLAS)

    @reactive_output
    def gene_expression():
        """One gene across every cell, for the color ramp.

        Recomputed only when the gene changes. Panning, zooming and hovering
        never reach this function, which is the whole claim.
        """
        gene = input.gene()
        if gene is None or int(gene) < 0:
            return None
        return expression_payload(ATLAS, int(gene))

    @reactive_output
    def selection_summary():
        """Cluster composition and marker genes for the lasso selection.

        The client already knows which cells it caught. Only the server holds
        the expression matrix, so this is the part the server is for.
        """
        encoded = input.selection()
        if not encoded:
            return {"n": 0, "composition": [], "markers": []}
        return selection_stats(ATLAS, decode_selection(encoded, ATLAS.n_cells))


# Standalone only: `shiny run apps/cell-atlas/app.py`.
# The gallery imports `server` and builds its own page around it, so it can
# add the back link and pin src_dir to an absolute path.
app = ReactApp(server)
