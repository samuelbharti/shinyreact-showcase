"""Churn monitor, the Python half. The React client in www/ owns the whole UI.

Two outputs that fire once, and one image that answers only when the compare
toggle is on. With it off this server does nothing at all while the sliders
move, which is the claim.

Pure computation lives in churn_monitor.py so a test can reach it without
starting Shiny.
"""

from pathlib import Path

from shiny import Inputs, Outputs, Session, render
from shinyreact import ReactApp, reactive_output

# `shiny run` puts this directory on sys.path but does not change the working
# directory, and the gallery imports this module from the repo root. __file__
# is the only anchor that is correct in both cases. Never use a relative path.
APP_DIR = Path(__file__).parent

from churn_monitor import (  # noqa: E402
    load_curve,
    render_panels,
    scores_payload,
    warm_renderer,
)
from churn_monitor import summary as model_summary  # noqa: E402

# Both paid at import, so the first visitor waits for neither. The curve is
# the index every answer is read out of. The renderer warm up is matplotlib
# building its font cache, which costs about a second and a half the first
# time and would otherwise land inside the first comparison render and make
# the server path look slow for a reason unrelated to the comparison.
load_curve()
warm_renderer()

PANEL_WIDTH, PANEL_HEIGHT = 900, 620


def server(input: Inputs, output: Outputs, session: Session) -> None:
    @reactive_output
    def summary():
        """The curves, the area under the ROC and the base rate. Sent once."""
        return model_summary()

    @reactive_output
    def scores():
        """Every score and label, about 200 kB of base64. Sent once.

        Moving a slider does not come near this.
        """
        return scores_payload()

    @render.plot(alt="The four panels, drawn by the server")
    def server_panels():
        """The same four panels, as a picture.

        This is the plain Shiny path. Returning None while the comparison is
        off is what keeps this server idle: without that guard every step of
        every slider would draw four panels nobody asked to see.
        """
        if not input.compare():
            return None
        return render_panels(
            input.threshold(),
            input.miss_cost(),
            input.offer_cost(),
            PANEL_WIDTH,
            PANEL_HEIGHT,
        )


# Standalone only: `shiny run apps/churn-monitor/app.py`.
# The gallery imports `server` and builds its own page around it, so that it
# can add the back link and pin src_dir to an absolute path. Nothing above
# this line depends on it.
app = ReactApp(server)
