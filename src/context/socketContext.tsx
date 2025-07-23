import { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const SocketContext = createContext<Socket | null>(null);

export function useStudentSocket() {
  return useContext(SocketContext);
}

export const StudentSocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    const url = import.meta.env.VITE_BACKEND_URL;

    const socketIO = io(url, {
      query: { userId: user._id },
      transports: ["websocket"],
    });

    setSocket(socketIO);

    socketIO.emit("registerOnline", { userId: user._id });
    console.log('Student Socket Connected', user.last_name)
    return () => {
      socketIO.disconnect();
    };
  }, []);

  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};
