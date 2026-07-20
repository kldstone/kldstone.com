import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import "./i18n"
import App from "./App.tsx"
import { initGA } from "./lib/analytics";
initGA();

const rootEl = document.getElementById("root")
if (rootEl) {
  try {
    createRoot(rootEl).render(
      <StrictMode>
        <App />
      </StrictMode>
    )
  } catch (e) {
    rootEl.innerHTML = "Page loading... please refresh"
    console.error("React error:", e)
  }
}
