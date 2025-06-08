import { createContext } from "react";

export const dragAndDropContext = createContext(null);

export function DragProvider({ children }) {
  return <div>{children}</div>;
}
