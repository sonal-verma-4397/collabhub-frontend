import { createContext, useEffect, useState } from "react";
import { DEFAULT_LABELS, DEFAULT_TAGS } from "../data/constants";

function initializeStorage() {
  localStorage.setItem("tasks", JSON.stringify([]));
  localStorage.setItem("labels", JSON.stringify(DEFAULT_LABELS));
  localStorage.setItem("tags", JSON.stringify(DEFAULT_TAGS));
  localStorage.setItem("initialized", "true"); // mark as initialized
}

export const LocalStorageContext = createContext({
  tasks: [],
  labels: [],
  tags: [],
  setTasks: () => {},
  setLabels: () => {},
  setTags: () => {},
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

  const [tags, setTags] = useState(() => {
    const localData = localStorage.getItem("tags");
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("labels", JSON.stringify(labels));
    localStorage.setItem("tags", JSON.stringify(tags));
  }, [tasks, labels, tags]);

  return (
    <LocalStorageContext.Provider
      value={{ tasks, labels, tags, setTasks, setLabels, setTags }}
    >
      {children}
    </LocalStorageContext.Provider>
  );
}

export default LocalStorageContext;
