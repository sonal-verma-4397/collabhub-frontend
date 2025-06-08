import { createContext, useCallback, useRef, useState } from "react";

export const toasterContext = createContext({
  toasts: [],
  showToast: () => {},
});

let idCounter = 0;
const TIME = 3000;

export function ToasterProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const timeouts = useRef({});

  const showToast = useCallback(
    (message, type = "success", duration = TIME) => {
      const id = idCounter++;
      const newToast = { id, message, type };

      setToasts((prev) => [...prev, newToast]);

      timeouts.current[id] = setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
        delete timeouts.current[id];
      }, duration);
    },
    []
  );

  return (
    <toasterContext.Provider value={{ toasts, showToast }}>
      {children}
    </toasterContext.Provider>
  );
}
