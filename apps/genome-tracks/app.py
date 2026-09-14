"""Genome tracks, the Python half. The React client in www/ owns the UI.

The split this app is about: the server sends one chromosome and then stops.
Panning and zooming are a client transform over data the browser already
holds. Clicking a gene is a question about data, so that does come here.
"""

from pathlib import Path

from shiny import Inputs, Outputs, Session
from shinyreact import ReactApp, reactive_output

APP_DIR = Path(__file__).parent

from genome_tracks import (  # noqa: E402
    chromosome_payload,
    gene_details,
    load_genome,
)

GENOME = load_genome(APP_DIR / "data")


def server(input: Inputs, output: Outputs, session: Session) -> None:
    @reactive_output
    def genome_meta():
        """The chromosome list, so the client can offer a choice."""
        return {
            "chromosomes": GENOME.chromosomes,
            "biotypes": GENOME.biotypes,
        }

    @reactive_output
    def chromosome_data():
        """One whole chromosome, sent when the chromosome changes.

        Nothing here depends on the view, so panning and zooming never
        recompute it. That is the claim.
        """
        name = input.chromosome()
        if not name:
            return None
        return chromosome_payload(GENOME, name)

    @reactive_output
    def gene_info():
        """Details for the clicked gene.

        The client knows where every gene is drawn. It does not know the read
        depth over that gene or how crowded the neighbourhood is, because
        those need the whole chromosome and the server holds it.
        """
        index = input.gene_click()
        name = input.chromosome()
        if index is None or int(index) < 0 or not name:
            return None
        return gene_details(GENOME, name, int(index))


app = ReactApp(server)
