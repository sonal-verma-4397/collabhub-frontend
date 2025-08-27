import { createContext, useContext, useState } from "react";

const GlobalContext = createContext({
  user: null,
  setUser: () => {},
  clearUser: () => {},   // 👈 add this in default
});

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);

  // 👇 define clearUser function
  const clearUser = () => {
    setUser(null);
  };

  return (
    <GlobalContext.Provider value={{ user, setUser, clearUser }}>
      {children}
    </GlobalContext.Provider>
  );
}

export function useAppStore() {
  return useContext(GlobalContext);
}
