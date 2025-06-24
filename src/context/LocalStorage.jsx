import { createContext, useEffect, useState } from "react";
import {
  DEFAULT_STATUSES,
  DEFAULT_LABELS,
  LOCAL_STORAGE_ITEMS,
} from "../data/constants";

const { TASKS, STATUSES, LABELS, INIT } = LOCAL_STORAGE_ITEMS;

function initializeStorage() {
  localStorage.setItem(TASKS, JSON.stringify([]));
  localStorage.setItem(STATUSES, JSON.stringify(DEFAULT_STATUSES));
  localStorage.setItem(LABELS, JSON.stringify(DEFAULT_LABELS));
  localStorage.setItem(INIT, "true"); // mark as initialized
}

export const LocalStorageContext = createContext({
  tasks: [],
  statuses: [],
  labels: [],
  setTasks: () => {},
  setStatuses: () => {},
  setTags: () => {},
});

export function LocalStorageProvider({ children }) {
  // Initialize only once
  if (!localStorage.getItem(INIT)) {
    initializeStorage();
  }

  const [tasks, setTasks] = useState(() => {
    const localData = localStorage.getItem(TASKS);
    return localData ? JSON.parse(localData) : [];
  });

  const [statuses, setStatuses] = useState(() => {
    const localData = localStorage.getItem(STATUSES);
    return localData ? JSON.parse(localData) : [];
  });

  const [labels, setLabels] = useState(() => {
    const localData = localStorage.getItem(LABELS);
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    localStorage.setItem(TASKS, JSON.stringify(tasks));
    localStorage.setItem(STATUSES, JSON.stringify(statuses));
    localStorage.setItem(LABELS, JSON.stringify(labels));
  }, [tasks, statuses, labels]);

  return (
    <LocalStorageContext.Provider
      value={{ tasks, statuses, labels, setTasks, setStatuses, setLabels }}
    >
      {children}
    </LocalStorageContext.Provider>
  );
}

export default LocalStorageContext;
