import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import TaskModel from "./Component/TaskModel.tsx";
import { TaskContextProvider } from "./context/TaskContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TaskContextProvider>
      <App />
      <TaskModel />
    </TaskContextProvider>
  </StrictMode>
);
