import path from "node:path";
import { fileURLToPath } from "node:url";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const dir = path.dirname(fileURLToPath(import.meta.url));

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
  resolve: { alias: { "@": path.resolve(dir, "src") } },
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
