#!/usr/bin/env node
// Turn catalog.yml into the tables in README.md.
//
//   node tools/render-catalog.mjs           # rewrite README.md
//   node tools/render-catalog.mjs --check   # fail if it is out of date (CI)
//
// catalog.yml is the only list of apps. The README tables are generated from
// it, so they cannot drift. Do not edit anything between the markers by hand.

import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import yaml from "js-yaml";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const check = process.argv.includes("--check");

const START = "<!-- catalog:start -->";
const END = "<!-- catalog:end -->";

// Every hook and component shinyreact exposes. The matrix lists all of them,
// including the ones nothing covers yet, so a gap is visible rather than
// assumed. Keep in step with the package exports.
const ALL_FEATURES = [
  "useShinyInput",
  "useShinyInputValue",
  "useSetShinyInput",
  "useShinyOutputValue",
  "useShinyOutputStatus",
  "useShinyOutputError",
  "useShinyMessageHandler",
  "useShinyInitialized",
  "useShinyBusy",
  "ShinyOutput",
  "ImageOutput",
  "ShinyModuleProvider",
  "typed inputs",
  "bookmarking",
  "send_message",
];

const STATUS_MARK = { done: "done", building: "building", planned: "planned" };

function escapePipes(text) {
  return String(text ?? "").replaceAll("|", "\\|");
}

function appTable(apps) {
  const rows = apps.map((app, i) => {
    const name = app.status === "done" ? `[${app.title}](apps/${app.slug})` : app.title;
    return [
      i + 1,
      name,
      escapePipes(app.domain),
      escapePipes(app.claim),
      escapePipes(app.library),
      STATUS_MARK[app.status] ?? app.status,
    ].join(" | ");
  });

  return [
    "| # | App | Domain | The claim | Library | Status |",
    "| --- | --- | --- | --- | --- | --- |",
    ...rows.map((r) => `| ${r} |`),
  ].join("\n");
}

function featureMatrix(apps) {
  const rows = ALL_FEATURES.map((feature) => {
    const covering = apps.filter((a) => (a.features ?? []).includes(feature));
    const where = covering.length
      ? covering.map((a) => a.slug).join(", ")
      : "**nothing yet**";
    return `| \`${feature}\` | ${covering.length} | ${where} |`;
  });

  return [
    "| Feature | Apps | Where |",
    "| --- | --- | --- |",
    ...rows,
  ].join("\n");
}

function render(catalog) {
  const apps = catalog.apps ?? [];
  const done = apps.filter((a) => a.status === "done").length;
  const compare = apps.filter((a) => a.compare);

  return [
    START,
    "",
    `${apps.length} apps, ${done} built so far.`,
    "",
    appTable(apps),
    "",
    "### Where the claim is measured, not asserted",
    "",
    "These apps render the plain Shiny version beside the React one, with a",
    "counter, so you can see the difference rather than take it on trust.",
    "",
    ...compare.map((a) => `- **${a.title}** ${escapePipes(a.claim)}`),
    "",
    "### Feature coverage",
    "",
    "Which app exercises which part of shinyreact. A row reading",
    "**nothing yet** is a real gap.",
    "",
    featureMatrix(apps),
    "",
    END,
  ].join("\n");
}

const catalog = yaml.load(await readFile(path.join(root, "catalog.yml"), "utf8"));
const readmePath = path.join(root, "README.md");
const readme = await readFile(readmePath, "utf8");

const start = readme.indexOf(START);
const end = readme.indexOf(END);
if (start === -1 || end === -1) {
  console.error(`README.md is missing the ${START} / ${END} markers.`);
  process.exit(1);
}

const next = readme.slice(0, start) + render(catalog) + readme.slice(end + END.length);

if (next === readme) {
  console.log("README.md catalog tables are up to date.");
  process.exit(0);
}

if (check) {
  console.error("README.md catalog tables are out of date.");
  console.error("Run: npm run catalog");
  process.exit(1);
}

await writeFile(readmePath, next);
console.log("Rewrote the catalog tables in README.md.");
