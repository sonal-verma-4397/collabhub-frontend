import { createContext } from "react";

export const taskContext = createContext({ tasks: [], setTasks: () => {} });
