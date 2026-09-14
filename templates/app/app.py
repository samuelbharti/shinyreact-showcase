"""APP_TITLE, the Python half. The React client in www/ owns the whole UI.

This file holds reactive computation and nothing else. Pure logic lives in
APP_MODULE.py so a test can reach it without starting Shiny.
"""

from pathlib import Path

from shiny import Inputs, Outputs, Session
from shinyreact import ReactApp, reactive_output

# `shiny run` puts this directory on sys.path but does not change the working
# directory, and the gallery imports this module from the repo root. __file__
# is the only anchor that is correct in both cases. Never use a relative path.
APP_DIR = Path(__file__).parent

from APP_MODULE import histogram, load_values  # noqa: E402

# Read once per process. Every session shares this, and so does the gallery,
# which imports this module at most once.
VALUES = load_values(APP_DIR / "data" / "values.csv")


def server(input: Inputs, output: Outputs, session: Session) -> None:
    @reactive_output
    def histogram_data():
        bins = input.bins()
        # Inputs arrive after mount, so the first flush sees None. Return None
        # rather than req(): a silent error still reaches the client console.
        if bins is None:
            return None
        return histogram(VALUES, int(bins))


# Standalone only: `shiny run apps/APP_NAME/app.py`.
# The gallery imports `server` and builds its own page around it, so that it
# can add the back link and pin src_dir to an absolute path. Nothing above
# this line depends on it.
app = ReactApp(server)
