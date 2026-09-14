"""Linked brush, the Python half. The React client in www/ owns the whole UI.

Three outputs and one input, and that is the whole server. Two of the outputs
fire once, at load. The third fires when a brush is released, never while one
is being dragged.

Pure computation lives in linked_brush.py so a test can reach it without
starting Shiny.
"""

from pathlib import Path

from shiny import Inputs, Outputs, Session
from shinyreact import ReactApp, reactive_output

# `shiny run` puts this directory on sys.path but does not change the working
# directory, and the gallery imports this module from the repo root. __file__
# is the only anchor that is correct in both cases. Never use a relative path.
APP_DIR = Path(__file__).parent

from linked_brush import (  # noqa: E402
    catalogue_payload,
    fit_selection,
    load_catalogue,
)
from linked_brush import summary as catalogue_summary  # noqa: E402

# Built once per process, at import, so the first visitor does not wait for it.
# Every session shares this, and so does the gallery.
load_catalogue()


def server(input: Inputs, output: Outputs, session: Session) -> None:
    @reactive_output
    def summary():
        return catalogue_summary()

    @reactive_output
    def catalogue():
        return catalogue_payload()

    @reactive_output
    def fitted():
        brushes = input.brushes()
        # None until the first brush is released. Return None rather than
        # req(): the silent error req() raises still reaches the client
        # console, and an empty panel is what we want here anyway.
        if brushes is None:
            return None
        return fit_selection(brushes)


# Standalone only: `shiny run apps/linked-brush/app.py`.
# The gallery imports `server` and builds its own page around it, so that it
# can add the back link and pin src_dir to an absolute path. Nothing above
# this line depends on it.
app = ReactApp(server)
