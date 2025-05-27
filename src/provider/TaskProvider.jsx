import React, { useState, useEffect } from "react";
import { taskContext } from "../context/Task";

export default function TaskProvider({ children }) {
  const [tasks, setTasks] = useState(() => {
    const localData = localStorage.getItem("tasks");
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <taskContext.Provider value={{ tasks, setTasks }}>
      {children}
    </taskContext.Provider>
  );
}
