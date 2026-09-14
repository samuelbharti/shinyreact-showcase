"""Supply flow, the Python half. The React client in www/ owns the whole UI.

Two outputs and two inputs. One output is sent once; the other is recomputed
when the scenario changes, which is one round trip for a real computation.
What happens in the browser afterwards, moving the diagram from one shape to
the other, costs nothing and is the point of the app.

Both inputs are bookmarked, so the address bar always describes what is on
screen. Pure computation lives in supply_flow.py so a test can reach it
without starting Shiny.
"""

from pathlib import Path

from shiny import Inputs, Outputs, Session, reactive
from shinyreact import ReactApp, reactive_output

# `shiny run` puts this directory on sys.path but does not change the working
# directory, and the gallery imports this module from the repo root. __file__
# is the only anchor that is correct in both cases. Never use a relative path.
APP_DIR = Path(__file__).parent

from supply_flow import SCENARIOS, solve  # noqa: E402
from supply_flow import catalogue as network_catalogue  # noqa: E402

KNOWN = {option.slug for option in SCENARIOS}
DEFAULT = SCENARIOS[0].slug


def server(input: Inputs, output: Outputs, session: Session) -> None:
    @reactive_output
    def catalogue():
        """The scenario list. Sent once, a few hundred bytes."""
        return network_catalogue()

    @reactive_output
    def flows():
        """Every arrow in the network, for the chosen scenario.

        One round trip per scenario, which is the right price: rerouting a
        capped network is a real computation. The animation that follows is
        not on this side of the wire.
        """
        chosen = input.scenario()
        # An unknown slug can only come from a hand edited bookmark, and
        # falling back is friendlier than a stack trace in the client console.
        if chosen not in KNOWN:
            chosen = DEFAULT
        return solve(chosen)

    # Bookmarking. Shiny does not write the query string on its own: something
    # has to ask, and then say where to put the answer. Doing it on every
    # change is what makes the address bar a description of the page rather
    # than a button someone has to remember to press.
    @reactive.effect
    @reactive.event(input.scenario, input.focus, ignore_init=True)
    async def _write_bookmark():
        await session.bookmark()

    @session.bookmark.on_bookmarked
    async def _put_it_in_the_url(url: str):
        await session.bookmark.update_query_string(url)


# Standalone only: `shiny run apps/supply-flow/app.py`.
# bookmark_store lives here rather than in the server function because it is a
# property of the app. The gallery builds its own ReactApp and turns it on
# there for any app whose catalog entry asks for it.
app = ReactApp(server, bookmark_store="url")
