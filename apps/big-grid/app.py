"""Big grid, the Python half. The React client in www/ owns the UI.

The client builds the same million rows from the spec below and filters and
sorts them locally. Nothing about that reaches here.

The server path exists so the app can answer the same question the other way
and show what it costs. It runs only while the client is in server mode, so
in browser mode this process is genuinely idle.
"""

from pathlib import Path

from shiny import Inputs, Outputs, Session
from shinyreact import ReactApp, reactive_output

APP_DIR = Path(__file__).parent

# Aliased on the way in. The outputs below take the ids the client reads, and
# a function cannot shadow the one it calls.
from big_grid import load_orders, query_from, run_query  # noqa: E402
from big_grid import spec as build_spec  # noqa: E402
from big_grid import totals as sum_matching  # noqa: E402

ORDERS = load_orders()
SPEC = build_spec()


def server(input: Inputs, output: Outputs, session: Session) -> None:
    @reactive_output
    def spec():
        """How to build the table. About 350 bytes, sent once."""
        return SPEC

    @reactive_output
    def page():
        """One page, filtered and sorted here.

        This is the server backed grid, for comparison. It returns fifty
        rows, because that is what such a grid sends: it has no way to let
        you scroll past what you asked for without asking again.
        """
        raw = input.grid_query()
        if not raw:
            return None
        return run_query(ORDERS, query_from(raw))

    @reactive_output
    def server_totals():
        """Sums over everything that matched, for the same query."""
        raw = input.grid_query()
        if not raw:
            return None
        return sum_matching(ORDERS, query_from(raw))


app = ReactApp(server)
