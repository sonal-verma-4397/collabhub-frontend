import { createContext, useState } from "react";

export const TaskPreviewContext = createContext({
  taskPreview: null,
  setTaskPreview: () => {},
});

export function TaskPreviewProvider({ children }) {
  const [taskPreview, setTaskPreview] = useState(null);
  return (
    <TaskPreviewContext.Provider value={{ taskPreview, setTaskPreview }}>
      {children}
    </TaskPreviewContext.Provider>
  );
}
