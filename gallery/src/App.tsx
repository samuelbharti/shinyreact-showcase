import { useMemo, useState, type CSSProperties } from "react";

import { byGroup, readCatalog, type Entry, type Group } from "@/catalog";

// Read once at module load. The catalog is inlined in the document and never
// changes while the page is open, so there is nothing to subscribe to.
const CATALOG = readCatalog();

export default function App() {
  const [query, setQuery] = useState("");

  const shown = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return CATALOG.apps;
    return CATALOG.apps.filter((entry) =>
      [entry.title, entry.blurb, entry.claim, entry.library, entry.domain]
        .join(" ")
        .toLowerCase()
        .includes(needle),
    );
  }, [query]);

  const sections = useMemo(() => byGroup(shown, CATALOG.groups), [shown]);
  const compared = CATALOG.apps.filter((entry) => entry.compare).length;

  return (
    <div className="page">
      <main className="gallery">
        <header>
          <p className="kicker">The ui.tsx pattern</p>
          <h1>{CATALOG.site.title}</h1>
          <p className="lead">
            React draws the screen. Shiny does the data work.
          </p>
          <p className="sub">
            Every app here picks one thing plain Shiny handles badly, and puts
            the measurement next to it: round trips not made, points drawn,
            milliseconds spent. {compared > 0 ? spellOut(compared) : "Some"} of
            them run the plain Shiny version on the same page, so you can watch
            both and read the counter.
          </p>
          <p className="sub">
            The same TSX bundle runs on a Python server and an R one. Nothing in
            the client knows which it is talking to.
          </p>
        </header>

        <div className="filters">
          <label className="search">
            <span>Search</span>
            <input
              type="search"
              value={query}
              placeholder="claim, library, domain"
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>
          <span className="count">
            {shown.length} of {CATALOG.apps.length} apps
          </span>
          {CATALOG.language ? (
            <span className="served">
              served by <strong>{CATALOG.language}</strong>
            </span>
          ) : null}
        </div>

        {CATALOG.apps.length === 0 ? (
          <p className="empty">
            No apps are built yet. Run <code>node tools/new-app.mjs</code> to add
            one.
          </p>
        ) : sections.length === 0 ? (
          <p className="empty">Nothing matches {JSON.stringify(query)}.</p>
        ) : (
          sections.map((section) => (
            <Section key={section.group.id} group={section.group} apps={section.apps} />
          ))
        )}
      </main>

      <Footer />
    </div>
  );
}

function Section({ group, apps }: { group: Group; apps: Entry[] }) {
  // The accent travels as a custom property, so every card underneath picks
  // it up without the colour being repeated per card.
  const accent = { "--accent": group.colour } as CSSProperties;

  return (
    <section className="group" data-group={group.id} style={accent}>
      <div className="group-head">
        <h2>{group.title}</h2>
        {group.note ? <p>{group.note}</p> : null}
        <span className="group-count">{apps.length}</span>
      </div>

      <ul className="cards">
        {apps.map((entry) => (
          <Card key={entry.slug} entry={entry} />
        ))}
      </ul>
    </section>
  );
}

function Card({ entry }: { entry: Entry }) {
  return (
    <li className="card" data-slug={entry.slug}>
      {/* A real link, not client side navigation. Each app is its own Shiny
          session with its own bundle, so moving into one is a page load. */}
      <a className="card-link" href={entry.href}>
        <span className="domain">{entry.domain}</span>
        <h3>
          {entry.title}
          <span className="go" aria-hidden="true">
            &rarr;
          </span>
        </h3>
        <p className="blurb">{entry.blurb}</p>
      </a>

      <dl className="claim">
        <dt>Does</dt>
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

function Footer() {
  const { author, authorUrl, repoUrl, license } = CATALOG.site;
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-about">
          <h2>About this gallery</h2>
          <p>
            Each app is a Shiny server that sends data and a React client that
            draws it. The server holds the reactive computation and returns
            JSON; the browser owns everything you touch. That split is the
            whole idea, and each card says what it buys.
          </p>
          <p>
            Nothing here downloads anything at run time and nothing needs a key.
            Every app builds its own data from a hash of the row number, so the
            Python server, the R server and the browser all agree on it down to
            the last digit.
          </p>
        </div>

        <div className="footer-links">
          <h2>Links</h2>
          <ul>
            {repoUrl ? (
              <li>
                <a href={repoUrl}>Source on GitHub</a>
              </li>
            ) : null}
            <li>
              <a href="https://posit-dev.github.io/shiny-react/">
                Shiny React documentation
              </a>
            </li>
            <li>
              <a href="https://shiny.posit.co/py/">Shiny for Python</a>
            </li>
            <li>
              <a href="https://shiny.posit.co/r/">Shiny for R</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-base">
        <span>
          Built by{" "}
          {authorUrl ? <a href={authorUrl}>{author}</a> : <strong>{author}</strong>}
          {license ? ` · ${license} licensed` : ""} · {year}
        </span>
        <span className="footer-note">
          Shiny React is a Posit project. This gallery is not affiliated with
          Posit.
        </span>
      </div>
    </footer>
  );
}

/** Small numbers read better as words in a sentence. */
function spellOut(value: number): string {
  const words = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven"];
  return words[value] ?? String(value);
}
