import { createContext } from "react";

export const toasterContext = createContext({
  toasts: [],
  showToast: () => {},
});
