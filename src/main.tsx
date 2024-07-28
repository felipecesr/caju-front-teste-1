import { createRoot } from "react-dom/client";
import { RegistrationsProvider } from "./context";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <RegistrationsProvider>
    <App />
  </RegistrationsProvider>
);
