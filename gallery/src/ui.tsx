import "@/index.css";

import App from "@/App";
import { readCatalog } from "@/catalog";

const { ReactDOM } = window.shinyreact;

// A ?app=<slug> link belongs to the R deployment, which routes on the query
// string. Opened against the Python gallery it would land here instead of on
// the app, so send it where it meant to go. Harmless on the R gallery, which
// serves ?app= itself and never renders this page for one.
const wanted = new URLSearchParams(window.location.search).get("app");
if (wanted) {
  const match = readCatalog().apps.find((entry) => entry.slug === wanted);
  if (match && !match.href.startsWith("?")) {
    window.location.replace(match.href);
  }
}

const root = ReactDOM.createRoot(
  document.body.appendChild(document.createElement("div")),
);
root.render(<App />);
