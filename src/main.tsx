import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { ProjectAssetsProvider } from "./contexts/ProjectAssetsContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ProjectAssetsProvider>
      <App />
    </ProjectAssetsProvider>
  </React.StrictMode>
);
