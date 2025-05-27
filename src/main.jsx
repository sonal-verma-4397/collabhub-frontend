import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import ToasterProvider from "./provider/ToasterProvider.jsx";
import TaskProvider from "./provider/TaskProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TaskProvider>
      <ToasterProvider>
        <App />
      </ToasterProvider>
    </TaskProvider>
  </StrictMode>
);
