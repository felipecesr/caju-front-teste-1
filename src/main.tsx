import { createRoot } from "react-dom/client";
import { AppProviders } from "./context/app-providers";
import App from "./App";
import "./index.css";

const rootElement = document.getElementById("root")!;

createRoot(rootElement).render(
  <AppProviders>
    <App />
  </AppProviders>
);
