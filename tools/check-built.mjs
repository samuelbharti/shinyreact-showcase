#!/usr/bin/env node
// Rebuild every app and fail when the committed bundle does not match.
//
//   node tools/check-built.mjs
//
// Connect Cloud runs no Node at deploy time, so each app commits its own
// www/ui.js and www/ui.css. That only stays honest if something checks it.
// This is that check, and CI runs it on every pull request.
//
// It rebuilds, then asks git whether anything under www/ changed. A drift
// means the committed bundle was built from different source than what is in
// the tree, which is the bug that ships an app nobody can reproduce.

import { execFileSync } from "node:child_process";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function git(args) {
  return execFileSync("git", args, { cwd: root, encoding: "utf8" });
}

function run(command, args) {
  execFileSync(command, args, { cwd: root, stdio: "inherit", shell: true });
}

// Strings that only exist inside a copy of React itself. React is meant to
// be external in every bundle here, supplied by shinyreact, so finding any
// of these means a second React got compiled in.
//
// That happens when a library declares react as a peer with a range that
// stops before the version this repo uses. npm then installs a second React
// to satisfy the peer, and react/jsx-runtime resolves to that one, because
// jsx-runtime is the one react entry point rollup cannot leave external.
// The page dies on load, and the message names neither the library nor the
// cause. .npmrc is where that is dealt with.
const REACT_INSIDE = [
  "__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED",
  "__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE",
  "ReactCurrentOwner",
  "ReactCurrentDispatcher",
];

const smuggled = [];
for (const entry of await readdir(path.join(root, "apps"), { withFileTypes: true })) {
  if (!entry.isDirectory()) continue;
  const bundle = path.join(root, "apps", entry.name, "www", "ui.js");
  let source;
  try {
    source = await readFile(bundle, "utf8");
  } catch {
    continue;
  }
  const hits = REACT_INSIDE.filter((marker) => source.includes(marker));
  if (hits.length) smuggled.push(`  apps/${entry.name}: ${hits.join(", ")}`);
}

if (smuggled.length) {
  console.error("");
  console.error("These bundles carry a copy of React inside them:");
  console.error(smuggled.join("\n"));
  console.error("");
  console.error("React has to come from window.shinyreact. Two copies on one");
  console.error("page means every hook returns nothing, or the page dies on");
  console.error("load. Check npm ls react --all for a second version, and see");
  console.error("the comment in .npmrc.");
  process.exit(1);
}

const dirty = git(["status", "--porcelain", "--", "*/www/ui.js", "*/www/ui.css"]).trim();
if (dirty) {
  console.error("Working tree already has uncommitted bundle changes:");
  console.error(dirty);
  console.error("");
  console.error("Commit or stash them first, otherwise this check cannot tell");
  console.error("your edits apart from a stale bundle.");
  process.exit(1);
}

console.log("Rebuilding every workspace...");
run("npm", ["run", "build", "--workspaces", "--if-present"]);

const drifted = git(["status", "--porcelain", "--", "*/www/ui.js", "*/www/ui.css"]).trim();

if (!drifted) {
  console.log("");
  console.log("Every committed bundle matches its source.");
  process.exit(0);
}

const apps = [
  ...new Set(
    drifted
      .split("\n")
      .map((line) => line.slice(3).replace(/^"|"$/g, ""))
      .map((file) => file.split("/").slice(0, 2).join("/")),
  ),
];

console.error("");
console.error("These bundles do not match their source:");
for (const app of apps) console.error(`  ${app}`);
console.error("");
console.error("Rebuild and commit the result:");
for (const app of apps) console.error(`  npm run build -w ${app}`);
process.exit(1);
