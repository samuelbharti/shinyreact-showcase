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

  // One run of numbers down the whole page rather than restarting per group.
  // It is an index, and an index counts from one to the end.
  let counter = 0;

  return (
    <div className="page">
      <main className="gallery">
        <header>
          <h1>{CATALOG.site.title}</h1>
          <p className="lead">React draws the screen. Shiny does the data work.</p>
          <p className="sub">
            Every app here takes one thing plain Shiny handles badly and puts
            the measurement beside it: round trips not made, points drawn,
            milliseconds spent. The same TSX bundle runs against a Python server
            and an R one, and nothing in the browser knows which it is talking
            to.
          </p>
        </header>

        <div className="bar">
          <span className="bar-fact">
            <b>{CATALOG.apps.length}</b> apps
          </span>
          <span className="bar-fact">
            <b>{CATALOG.apps.filter((entry) => entry.compare).length}</b> run both
            paths side by side
          </span>
          {CATALOG.language ? (
            <span className="bar-fact">
              served by <b>{CATALOG.language}</b>
            </span>
          ) : null}
          <label className="find">
            <span className="sr-only">Search</span>
            <input
              type="search"
              value={query}
              placeholder="Filter by claim, library or domain"
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>
        </div>

        {CATALOG.apps.length === 0 ? (
          <p className="empty">
            No apps are built yet. Run <code>node tools/new-app.mjs</code> to add
            one.
          </p>
        ) : sections.length === 0 ? (
          <p className="empty">
            Nothing matches <b>{query.trim()}</b>.
          </p>
        ) : (
          sections.map((section) => {
            const from = counter;
            counter += section.apps.length;
            return (
              <Section
                key={section.group.id}
                group={section.group}
                apps={section.apps}
                startAt={from}
              />
            );
          })
        )}
      </main>

      <Footer />
    </div>
  );
}

function Section({
  group,
  apps,
  startAt,
}: {
  group: Group;
  apps: Entry[];
  startAt: number;
}) {
  // The accent travels as a custom property, so nothing underneath repeats the
  // colour and a group can be recoloured in catalog.yml alone.
  const accent = { "--accent": group.colour } as CSSProperties;

  return (
    <section className="group" data-group={group.id} style={accent}>
      <div className="group-head">
        <h2>{group.title}</h2>
        <span className="group-rule" aria-hidden="true" />
        <span className="group-count">{apps.length}</span>
      </div>
      {group.note ? <p className="group-note">{group.note}</p> : null}

      <ol className="entries">
        {apps.map((entry, at) => (
          <Row key={entry.slug} entry={entry} number={startAt + at + 1} />
        ))}
      </ol>
    </section>
  );
}

function Row({ entry, number }: { entry: Entry; number: number }) {
  return (
    <li className="entry" data-slug={entry.slug}>
      <span className="num" aria-hidden="true">
        {String(number).padStart(2, "0")}
      </span>

      <div className="entry-body">
        <h3>
          {/* Stretched: the anchor is small, but its ::after covers the whole
              row, so the row is one click target without the other links
              sitting inside an anchor, which would not be valid. */}
          <a className="entry-link" href={entry.href}>
            {entry.title}
          </a>
        </h3>
        <p className="blurb">{entry.blurb}</p>

        <p className="line does">
          <span className="tag">Does</span>
          {entry.claim}
        </p>
        <p className="line instead">
          <span className="tag">Plain Shiny</span>
          {entry.plainShiny}
        </p>
      </div>

      <div className="entry-meta">
        <span className="domain">{entry.domain}</span>
        <span className="library">{entry.library}</span>
        {entry.compare ? <span className="both">side by side</span> : null}
        {entry.other ? (
          <a className="other" href={entry.other}>
            also in {CATALOG.language === "Python" ? "R" : "Python"}
          </a>
        ) : null}
      </div>
    </li>
  );
}

function Footer() {
  const { author, authorUrl, license, links } = CATALOG.site;
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-about">
          <h2>What this is</h2>
          <p>
            Each app is a Shiny server that sends data and a React client that
            draws it. The server holds the reactive computation and returns
            JSON. The browser owns everything you touch. That split is the whole
            idea, and every entry above says what it buys.
          </p>
          <p>
            Nothing downloads anything at run time and nothing needs a key.
            Every app builds its own data from a hash of the row number, so the
            Python server, the R server and the browser agree on it to the last
            digit.
          </p>
        </div>

        <div className="footer-links">
          <h2>Links</h2>
          <ul>
            {links.map((link) => (
              <li key={link.url}>
                <a href={link.url}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="footer-base">
        Built by{" "}
        {authorUrl ? <a href={authorUrl}>{author}</a> : <strong>{author}</strong>}
        {license ? ` · ${license}` : ""} · {year}
      </div>
    </footer>
  );
}
