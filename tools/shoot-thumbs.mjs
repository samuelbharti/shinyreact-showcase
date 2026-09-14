#!/usr/bin/env node
// Take the gallery's thumbnails again, from apps that are actually running.
//
//   node tools/shoot-thumbs.mjs                 # every finished app
//   node tools/shoot-thumbs.mjs cell-atlas      # just these
//   node tools/shoot-thumbs.mjs --check         # fail if any is missing (CI)
//
// Every card on the landing page is led by a screenshot of the app behind it.
// That is the honest kind of thumbnail, and it is also the kind that goes
// quietly out of date: an app gets a new panel, nobody retakes the picture,
// and the gallery advertises a version that no longer exists. This is how you
// retake them, and --check is how CI notices a new app arriving without one.
//
// It starts the Python gallery itself rather than asking you to, because a
// thumbnail taken against a stale server is the failure this is meant to
// prevent. Use --url to point at something already running.
//
// The work is split three ways because the tools are. chromote is an R
// package, so tools/shoot-thumbs.R drives the browser. Pillow is a Python
// one, so tools/shoot-thumbs.py crops and encodes. This file starts the
// server, walks the catalog and cleans up after itself.

import { spawn, spawnSync } from "node:child_process";
import { mkdir, readFile, readdir, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import yaml from "js-yaml";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const RAW_DIR = path.join(root, "docs", "local", "thumb-raw");
const OUT_DIR = path.join(root, "gallery", "www", "thumbs");

const argv = process.argv.slice(2);
const check = argv.includes("--check");
const flagged = (name, fallback) => {
  const at = argv.indexOf(`--${name}`);
  return at >= 0 && at < argv.length - 1 ? argv[at + 1] : fallback;
};
const port = Number(flagged("port", "8791"));
const base = flagged("url", "");
const only = argv.filter((arg) => !arg.startsWith("--") && !/^\d+$/.test(arg));

const catalog = yaml.load(await readFile(path.join(root, "catalog.yml"), "utf8"));

// The apps the gallery actually serves. A planned app has no screenshot to
// take, and an app that never goes in the gallery has no card to put one on.
const wanted = (catalog.apps ?? []).filter(
  (app) => app.deploy === "gallery" && app.status === "done",
);

const slugs = only.length > 0 ? only : wanted.map((app) => app.slug);

const unknown = slugs.filter((slug) => !wanted.some((app) => app.slug === slug));
if (unknown.length > 0) {
  console.error(`Not a finished gallery app: ${unknown.join(", ")}`);
  console.error(`Known: ${wanted.map((app) => app.slug).join(", ")}`);
  process.exit(1);
}

if (check) {
  process.exit(await reportMissing(wanted));
}

await rm(RAW_DIR, { recursive: true, force: true });
await mkdir(RAW_DIR, { recursive: true });

let server = null;
let origin = base;

if (!origin) {
  origin = `http://127.0.0.1:${port}`;
  server = await startGallery(port, origin);
}

try {
  console.log(`Shooting ${slugs.length} app${slugs.length === 1 ? "" : "s"}...`);
  for (const slug of slugs) {
    const url = `${origin}/app/${slug}/`;
    const out = path.join(RAW_DIR, `${slug}.png`);
    const shot = spawnSync(
      "Rscript",
      [path.join(root, "tools", "shoot-thumbs.R"), "--url", url, "--out", out],
      { cwd: root, stdio: "inherit" },
    );
    if (shot.status !== 0) {
      throw new Error(`Screenshot failed for ${slug}`);
    }
  }

  console.log("\nEncoding...");
  const encoded = spawnSync(
    "uv",
    ["run", "python", path.join("tools", "shoot-thumbs.py"), RAW_DIR, OUT_DIR, ...slugs],
    { cwd: root, stdio: "inherit" },
  );
  if (encoded.status !== 0) {
    throw new Error("Encoding failed");
  }
} finally {
  if (server) stopTree(server.pid);
}

console.log(`\nWrote ${slugs.length} into gallery/www/thumbs/.`);
console.log("They are committed like the bundles are, so commit them too.");

/** Start `shiny run app.py` and wait until it answers. */
async function startGallery(onPort, origin) {
  console.log(`Starting the gallery on ${origin} ...`);
  const child = spawn(
    "uv",
    ["run", "shiny", "run", "app.py", "--port", String(onPort), "--host", "127.0.0.1"],
    // No shell. Both Rscript and uv resolve as real executables, and passing
    // args through a shell earns a deprecation warning on every run for the
    // privilege of concatenating strings we already have.
    { cwd: root, stdio: "ignore" },
  );

  for (let tries = 0; tries < 60; tries += 1) {
    await new Promise((done) => setTimeout(done, 1000));
    try {
      const answer = await fetch(origin, { signal: AbortSignal.timeout(2000) });
      if (answer.ok) return child;
    } catch {
      // Not up yet. The loop is the wait.
    }
  }

  stopTree(child.pid);
  throw new Error(`The gallery never answered on ${origin}`);
}

/**
 * Kill the server and whatever it started.
 *
 * `uv run` spawns the real Python process as a child, so killing what we
 * spawned leaves the server holding the port and the next run cannot bind.
 * Windows needs taskkill for the tree; elsewhere the process group does it.
 */
function stopTree(pid) {
  if (!pid) return;
  if (process.platform === "win32") {
    spawnSync("taskkill", ["/pid", String(pid), "/T", "/F"], { stdio: "ignore" });
  } else {
    try {
      process.kill(-pid, "SIGTERM");
    } catch {
      try {
        process.kill(pid, "SIGTERM");
      } catch {
        // Already gone.
      }
    }
  }
}

/** For CI: every finished app has a thumbnail, and no thumbnail is orphaned. */
async function reportMissing(apps) {
  let present = [];
  try {
    present = (await readdir(OUT_DIR))
      .filter((name) => name.endsWith(".jpg"))
      .map((name) => name.replace(/\.jpg$/, ""));
  } catch {
    // No directory yet, which the missing list below will say plainly.
  }

  const missing = apps.filter((app) => !present.includes(app.slug));
  const orphans = present.filter((slug) => !apps.some((app) => app.slug === slug));

  if (missing.length === 0 && orphans.length === 0) {
    console.log(`All ${apps.length} finished apps have a thumbnail.`);
    return 0;
  }

  if (missing.length > 0) {
    console.error("These apps are on the landing page with no screenshot:");
    for (const app of missing) console.error(`  ${app.slug}`);
    console.error("");
    console.error("Take them: node tools/shoot-thumbs.mjs");
  }

  if (orphans.length > 0) {
    console.error("These thumbnails belong to no app in catalog.yml:");
    for (const slug of orphans) console.error(`  ${slug}.jpg`);
    console.error("");
    console.error(`Delete them from ${path.relative(root, OUT_DIR)}.`);
  }

  return 1;
}
