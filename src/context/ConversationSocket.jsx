import { createContext, useContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext({ socket: null });

export function ConversationSocketProvider({ children }) {
  const socketRef = useRef(null);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!socketRef.current) {
      const newSocket = io("http://localhost:8000/socket/conversation", {
        query: { userId: "A" },
        reconnectionAttempts: 3,
      });

      socketRef.current = newSocket;
      setSocket(newSocket); // this triggers a re-render with socket
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
}

export const useConversationSocket = () => useContext(SocketContext);
