import { createContext, useContext, useState } from "react";

const GlobalContext = createContext({
  user: null,
  setUser: () => {}, 
});

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);

  return (
    <GlobalContext.Provider value={{ user, setUser }}>
      {children}
    </GlobalContext.Provider>
  );
}

export function useAppStore() {
  return useContext(GlobalContext);
}
