import "@/index.css";

import App from "@/App";

const { ReactDOM } = window.shinyreact;

// The page has no mount container of its own, so the app makes one. Component
// definitions live in App.tsx, which keeps this file to mounting alone.
const root = ReactDOM.createRoot(
  document.body.appendChild(document.createElement("div")),
);
root.render(<App />);
