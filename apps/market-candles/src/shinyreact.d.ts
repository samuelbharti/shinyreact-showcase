// Types for the window.shinyreact global.
//
// The hooks come off the global at runtime, because React is externalized to
// the instance shinyreact already owns. The types come from the npm package,
// which is a devDependency purely so this declaration stays correct when the
// package changes. Nothing here is bundled.
import type * as ShinyReact from "@posit-dev/shinyreact";
import type React from "react";
import type * as ReactDOM from "react-dom/client";

declare global {
  interface Window {
    shinyreact: typeof ShinyReact & {
      React: typeof React;
      ReactDOM: typeof ReactDOM;
    };
  }
}
