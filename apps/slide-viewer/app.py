"""Slide viewer, the Python half. The React client in www/ owns the UI.

There is no image file. The server describes a 6.4 gigapixel slide in about
two kilobytes, and the browser draws every tile from that description at
whatever zoom level the reader is looking at.
"""

from pathlib import Path

from shiny import Inputs, Outputs, Session
from shinyreact import ReactApp, reactive_output

APP_DIR = Path(__file__).parent

# Aliased on the way in. The output below has to be called `region_detail`,
# because that is the id the client reads, and a function cannot shadow the
# one it calls.
from slide_viewer import region_detail as region_measurements  # noqa: E402
from slide_viewer import slide_payload  # noqa: E402

SLIDE = slide_payload()


def server(input: Inputs, output: Outputs, session: Session) -> None:
    @reactive_output
    def slide():
        """The whole slide description, sent once.

        Reads no input, so zooming and panning never come near it. This is
        the entire cost of a 6.4 gigapixel image on the wire.
        """
        return SLIDE

    @reactive_output
    def region_detail():
        """Measurements for the flagged region the reader picked.

        The client drew the marker, so it has the box and the label. It does
        not have the nuclear counts, and this is the one thing in the app
        that needs the server.
        """
        index = input.picked_region()
        if index is None or int(index) < 0:
            return None
        return region_measurements(int(index))


app = ReactApp(server)
