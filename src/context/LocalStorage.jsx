import { createContext, useContext, useEffect, useState } from "react";
import {
  DEFAULT_STATUSES,
  DEFAULT_LABELS,
  LOCAL_STORAGE_ITEMS,
} from "../data/constants";

const { TASKS, STATUSES, LABELS, INIT, WORKSPACES, MODULES, PAGES } =
  LOCAL_STORAGE_ITEMS;

function initializeStorage() {
  localStorage.setItem(PAGES, JSON.stringify([]));
  localStorage.setItem(TASKS, JSON.stringify([]));
  localStorage.setItem(WORKSPACES, JSON.stringify([]));
  localStorage.setItem(MODULES, JSON.stringify([]));

  localStorage.setItem(STATUSES, JSON.stringify(DEFAULT_STATUSES));
  localStorage.setItem(LABELS, JSON.stringify(DEFAULT_LABELS));
  localStorage.setItem(INIT, "true"); // mark as initialized
}

export const LocalStorageContext = createContext({
  // default values
  User: {
    id: "123",
    name: "John Doe",
    email: "KX2cM@example.com",
    avatar:
      "https://images.unsplash.com/photo-1623880840102-7df0a9f3545b?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    role: "admin",
  },
  workspaces: [],
  modules: [],
  teams: [],
  pages: [],
  tasks: [],
  statuses: [],
  labels: [],

  setTasks: () => {},
  setStatuses: () => {},
  setTags: () => {},
  setWorkspaces: () => {},
  setModules: () => {},
  setPages: () => {},
});

export function LocalStorageProvider({ children }) {
  // Initialize only once
  if (!localStorage.getItem(INIT)) {
    initializeStorage();
  }

  // Central states of the app

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

  const [workspaces, setWorkspaces] = useState(() => {
    const localData = localStorage.getItem(WORKSPACES);
    return localData ? JSON.parse(localData) : [];
  });

  const [modules, setModules] = useState(() => {
    const localData = localStorage.getItem(MODULES);
    return localData ? JSON.parse(localData) : [];
  });

  const [pages, setPages] = useState(() => {
    const localData = localStorage.getItem(PAGES);
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    localStorage.setItem(PAGES, JSON.stringify(pages));
    localStorage.setItem(TASKS, JSON.stringify(tasks));
    localStorage.setItem(MODULES, JSON.stringify(modules));
    localStorage.setItem(WORKSPACES, JSON.stringify(workspaces));

    localStorage.setItem(STATUSES, JSON.stringify(statuses));
    localStorage.setItem(LABELS, JSON.stringify(labels));
  }, [tasks, statuses, labels, workspaces, modules, pages]);

  return (
    <LocalStorageContext.Provider
      value={{
        tasks,
        statuses,
        labels,
        workspaces,
        modules,
        pages,

        setTasks,
        setStatuses,
        setLabels,
        setWorkspaces,
        setModules,
        setPages,
      }}
    >
      {children}
    </LocalStorageContext.Provider>
  );
}

export default LocalStorageContext;

export function useLocalStorage(){
  return useContext(LocalStorageContext)
}