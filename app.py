"""Deployment entry point for the Python gallery.

This sits at the repo root, not in gallery/, because the repo root is what
gets deployed. The gallery reads catalog.yml and the app directories at run
time, so a bundle holding only gallery/ would start and then fail on the
first request. Connect Cloud also wants requirements.txt next to the primary
file, and that file is the union of every app's own.

Run it locally with:

    shiny run app.py
"""

import sys
from pathlib import Path

HERE = Path(__file__).parent
sys.path.insert(0, str(HERE / "gallery"))

from pygallery.router import build_gallery_app  # noqa: E402

app = build_gallery_app(HERE)
