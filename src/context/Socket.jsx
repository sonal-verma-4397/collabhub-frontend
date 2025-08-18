import { createContext, useRef } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export function SocketProvider({ children }) {
  const countRef = useRef(0);

  function initializeSocket() {
    const socket = io("http://localhost:8000/socket", {
      query: {
        // TODO : change this
        userId: "A",
      },
      //TODO : change this
      //   withCredentials: true,
      reconnectionAttempts: 3,
    });

    return socket;
  }

  let socket = null;
  if (countRef.current === 0) {
    socket = initializeSocket();
    countRef.current++;
  }

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
}
