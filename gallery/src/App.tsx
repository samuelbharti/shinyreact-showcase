import { useMemo, useState } from "react";

import { type Entry, readCatalog } from "@/catalog";

// Read once at module load. The catalog is inlined in the document and never
// changes while the page is open, so there is nothing to subscribe to.
const CATALOG = readCatalog();

export default function App() {
  const [domain, setDomain] = useState("All");
  const [query, setQuery] = useState("");

  const domains = useMemo(() => {
    const found = new Set(CATALOG.apps.map((entry) => entry.domain));
    return ["All", ...[...found].sort()];
  }, []);

  const shown = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return CATALOG.apps.filter((entry) => {
      if (domain !== "All" && entry.domain !== domain) return false;
      if (!needle) return true;
      return [entry.title, entry.blurb, entry.claim, entry.library, entry.domain]
        .join(" ")
        .toLowerCase()
        .includes(needle);
    });
  }, [domain, query]);

  return (
    <main className="gallery">
      <header>
        <h1>Shiny React showcase</h1>
        <p className="lead">
          Small Shiny apps whose screen is built in React. Each one proves one
          thing Shiny React makes possible and plain Shiny does not.
        </p>
        {CATALOG.language ? (
          <p className="served">
            Served by the <strong>{CATALOG.language}</strong> gallery.
          </p>
        ) : null}
      </header>

      <div className="filters">
        <label>
          Domain
          <select value={domain} onChange={(e) => setDomain(e.target.value)}>
            {domains.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </label>
        <label className="search">
          Search
          <input
            type="search"
            value={query}
            placeholder="claim, library, domain"
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        <span className="count">
          {shown.length} of {CATALOG.apps.length}
        </span>
      </div>

      {CATALOG.apps.length === 0 ? (
        <p className="empty">
          No apps are built yet. Run <code>node tools/new-app.mjs</code> to add
          one.
        </p>
      ) : (
        <ul className="cards">
          {shown.map((entry) => (
            <Card key={entry.slug} entry={entry} />
          ))}
        </ul>
      )}
    </main>
  );
}

function Card({ entry }: { entry: Entry }) {
  return (
    <li className="card">
      {/* A real link, not client side navigation. Each app is its own Shiny
          session with its own bundle, so moving into one is a page load. */}
      <a className="card-link" href={entry.href}>
        <span className="domain">{entry.domain}</span>
        <h2>{entry.title}</h2>
        <p className="blurb">{entry.blurb}</p>
      </a>

      <dl className="claim">
        <dt>Claim</dt>
        <dd>{entry.claim}</dd>
        <dt>Plain Shiny</dt>
        <dd>{entry.plainShiny}</dd>
      </dl>

      <footer>
        <span className="library">{entry.library}</span>
        {entry.compare ? <span className="badge">side by side</span> : null}
        {entry.other ? (
          <a className="other" href={entry.other}>
            also in {CATALOG.language === "Python" ? "R" : "Python"}
          </a>
        ) : null}
      </footer>
    </li>
  );
}
