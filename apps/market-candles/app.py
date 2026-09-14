"""Market candles, the Python half. The React client in www/ owns the UI.

The client gets one symbol's bars and then owns the chart. Panning, zooming
and the crosshair are lightweight-charts doing its own work, and none of it
reaches here.

The compare toggle turns on the other path: the server draws the same window
as a PNG, the way a plain Shiny app does, and every pan and zoom then costs a
render and a round trip.
"""

from pathlib import Path

from shiny import Inputs, Outputs, Session, render
from shinyreact import ReactApp, reactive_output

APP_DIR = Path(__file__).parent

# Aliased on the way in: the output below takes the id the client reads.
from market_candles import catalog as symbol_catalog  # noqa: E402
from market_candles import (  # noqa: E402
    load_series,
    render_window,
    series_payload,
    warm_renderer,
    window_stats,
)

CATALOG = symbol_catalog()

# Paid once, at load, rather than inside the first render the reader asks
# for. See warm_renderer for why.
warm_renderer()


def server(input: Inputs, output: Outputs, session: Session) -> None:
    @reactive_output
    def catalog():
        """The symbol list. Sent once, about 140 bytes."""
        return CATALOG

    @reactive_output
    def series():
        """One symbol's whole history, about 1 MB of base64.

        Sent when the symbol changes and at no other time. Panning and
        zooming do not come near this.
        """
        symbol = input.symbol()
        if not symbol:
            return None
        return series_payload(load_series(symbol))

    @reactive_output
    def window():
        """Numbers for the visible window, on the server path only.

        The client works these out itself when it owns the chart. This runs
        only while the comparison is on, so both paths are answering the
        same question the same way.
        """
        visible = input.visible()
        symbol = input.symbol()
        if not visible or not symbol or not input.compare():
            return None
        return window_stats(
            load_series(symbol), visible.get("first", 0), visible.get("last", 0)
        )

    @render.plot(alt="The visible window, drawn by the server")
    def server_chart():
        """The same window, as a picture.

        This is the plain Shiny path. ImageOutput on the client measures
        itself and asks for this at the size it is drawn, and every change
        of window asks again.
        """
        visible = input.visible()
        symbol = input.symbol()
        if not visible or not symbol or not input.compare():
            return None
        return render_window(
            load_series(symbol),
            visible.get("first", 0),
            visible.get("last", 0),
            900,
            360,
        )


app = ReactApp(server)
