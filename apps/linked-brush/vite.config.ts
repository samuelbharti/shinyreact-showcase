import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const dir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(dir, "..", "..");

// react/jsx-runtime is the one React entry point that cannot be left
// external: rollup needs a global to point an external at, and there is no
// global for it. So whichever copy of React the resolver finds is the copy
// that gets bundled.
//
// That is fine until a library names react as a plain dependency instead of
// a peer, which @visx/text does. npm then installs a second React beside the
// app, the resolver finds that one first, and its element factory reads
// internals off the external React, which is a different version and does
// not have them. The page dies on load with ReactCurrentOwner undefined and
// nothing in either server log.
//
// Resolving from the repo root pins it to the one React the whole repo uses.
const jsxRuntime = createRequire(import.meta.url).resolve("react/jsx-runtime", {
  paths: [repoRoot],
});

// One classic script at www/ui.js, plus www/ui.css, which page_react()
// discovers next to the app. React and ReactDOM are externalized to
// window.shinyreact so this bundle shares the React instance that owns the
// hooks. Two React copies on one page is the failure mode that shows up as
// every hook returning nothing, with no error anywhere.
//
// Do not hand edit this file. Copy it from templates/app/ or from an app that
// already works.
export default defineConfig({
  define: { "process.env.NODE_ENV": JSON.stringify("production") },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(dir, "src"),
      "react/jsx-runtime": jsxRuntime,
    },
  },
  build: {
    outDir: "www",
    emptyOutDir: false,
    cssCodeSplit: false,
    target: "es2020",
    lib: {
      entry: path.resolve(dir, "src/ui.tsx"),
      formats: ["iife"],
      name: "ShinyReactApp",
      fileName: () => "ui.js",
    },
    rollupOptions: {
      external: ["react", "react-dom", "react-dom/client"],
      output: {
        // Vite 5 lib mode emits style.css unless told otherwise.
        assetFileNames: "ui.[ext]",
        globals: {
          react: "window.shinyreact.React",
          "react-dom": "window.shinyreact.ReactDOM",
          "react-dom/client": "window.shinyreact.ReactDOM",
        },
      },
    },
  },
});
