"""City density, the Python half. The React client in www/ owns the UI.

The server generates half a million trips and sends only their positions.
The client bins them into hexagons on the GPU and rebins on every zoom, which
never reaches here.

Picking a hexagon does reach here, because the answer needs the hour, the
fare and the duration, and those never left the server.
"""

from pathlib import Path

from shiny import Inputs, Outputs, Session
from shinyreact import ReactApp, reactive_output

APP_DIR = Path(__file__).parent

from city_density import (  # noqa: E402
    hexagon_summary,
    load_boundary,
    load_city,
    points_payload,
)

CITY = load_city()
BOUNDARY = load_boundary(APP_DIR / "data")


def server(input: Inputs, output: Outputs, session: Session) -> None:
    @reactive_output
    def trip_points():
        """Positions for every trip, and the outline to draw them on.

        Reads no input, so Shiny sends it once on connect and never again.
        """
        return points_payload(CITY, BOUNDARY)

    @reactive_output
    def hex_summary():
        """What the server knows about the trips under the picked hexagon."""
        picked = input.picked_hex()
        if not picked:
            return None
        return hexagon_summary(
            CITY,
            float(picked["lng"]),
            float(picked["lat"]),
            float(picked["radius"]),
        )


app = ReactApp(server)
