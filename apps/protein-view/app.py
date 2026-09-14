"""Protein view, the Python half. The React client in www/ owns the UI.

Two ways of putting a control on the page sit side by side in this app, on
purpose.

The colour control is React state, written with useShinyInput. That is the
default and it is how the other apps here work.

The representation control is a real Shiny selectInput, rendered by the
server and hosted in the React tree with ShinyOutput. It writes input.style()
exactly as it would in a classic Shiny app. That is the escape hatch for when
you want the genuine widget rather than owning the state.
"""

from pathlib import Path

from shiny import Inputs, Outputs, Session, render, ui
from shinyreact import ReactApp, reactive_output

APP_DIR = Path(__file__).parent

from protein_view import (  # noqa: E402
    composition,
    load_structure,
    residue_detail,
    structure_payload,
)

STRUCTURE = load_structure(APP_DIR / "data" / "1ubq.pdb")
PAYLOAD = structure_payload(STRUCTURE)
FOLD = composition(STRUCTURE)

REPRESENTATIONS = {
    "cartoon": "Cartoon",
    "stick": "Sticks",
    "sphere": "Spheres",
    "line": "Lines",
}


def server(input: Inputs, output: Outputs, session: Session) -> None:
    @reactive_output
    def structure():
        """The PDB text and the parsed residue table, sent once.

        3Dmol.js parses the text itself. The residue list is the parsing the
        server already did, and sending it saves doing the same work again in
        a language that is worse at it.
        """
        return PAYLOAD

    @reactive_output
    def fold():
        """Secondary structure counts and the temperature factor range."""
        return FOLD

    @reactive_output
    def residue():
        """One residue, and where it sits in the whole structure.

        3Dmol tells the client which residue was clicked. Where that residue
        sits in the distribution of temperature factors needs every other
        residue, so it is answered here.
        """
        number = input.residue_click()
        if number is None or int(number) < 0:
            return None
        return residue_detail(STRUCTURE, int(number))

    @reactive_output
    def active_style():
        """The hosted widget's value, sent back to the client.

        This echo is necessary, not decoration. useShinyInputValue reads
        shinyreact's own input registry, which only holds ids a shinyreact
        producer registered. A hosted Shiny widget is not one of those, so
        the client cannot read input.style() directly no matter how it asks.

        The value does reach the server, exactly as it would in a classic
        Shiny app, so the server publishes it as an output and the client
        reads that. The visible cost is one round trip per change, which is
        the difference between a hosted widget and React state, and worth
        seeing rather than hiding.
        """
        return input.style() or "cartoon"

    @render.ui
    def style_widget():
        """A real Shiny select, hosted inside the React tree.

        Rendered through render.ui rather than sent as data, because Shiny's
        html output binding loads the widget's own JavaScript and runs the
        input initialization pass. That is what makes input.style() arrive
        the way it would in a classic app. ShinyOutput alone only calls
        bindAll, which is not enough for an input.
        """
        # No selectize argument here: Shiny for Python deprecated it and
        # renders a plain select already. R's selectInput does the opposite
        # and turns selectize on by default, so app.R spells it out. The two
        # have to agree, because one client serves both servers.
        return ui.input_select(
            "style",
            None,
            choices=REPRESENTATIONS,
            selected="cartoon",
        )


app = ReactApp(server)
