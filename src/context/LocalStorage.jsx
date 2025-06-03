import { createContext, useEffect, useState } from "react";
import { NEW_LABELS } from "../data/constants";

function initializeStorage() {
  localStorage.setItem("tasks", JSON.stringify([]));
  localStorage.setItem("labels", JSON.stringify(NEW_LABELS));
  localStorage.setItem("initialized", "true"); // mark as initialized
}

export const LocalStorageContext = createContext({
  tasks: [],
  labels: [],
  setTasks: () => {},
  setLabels: () => {},
});

export function LocalStorageProvider({ children }) {
  // Initialize only once
  if (!localStorage.getItem("initialized")) {
    initializeStorage();
  }

  const [tasks, setTasks] = useState(() => {
    const localData = localStorage.getItem("tasks");
    return localData ? JSON.parse(localData) : [];
  });

  const [labels, setLabels] = useState(() => {
    const localData = localStorage.getItem("labels");
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("labels", JSON.stringify(labels));
  }, [tasks, labels]);

  return (
    <LocalStorageContext.Provider
      value={{ tasks, labels, setTasks, setLabels }}
    >
      {children}
    </LocalStorageContext.Provider>
  );
}

export default LocalStorageContext;
