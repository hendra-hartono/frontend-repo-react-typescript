import { useState, useEffect } from "react";
import socketIOClient, { Socket } from "socket.io-client";
import Appointment from "../models/Appointment";

interface ServerToClientEvents {
  newAppointment: (state: Appointment) => void;
}

export function useSocket({
  endpoint,
  token,
}: {
  endpoint: string;
  token: string;
}) {
  const socket: Socket<ServerToClientEvents> = socketIOClient(endpoint, {
    auth: {
      token: token,
    },
  });
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const onConnect = () => setIsConnected(true);
    const onDisconnect = () => setIsConnected(false);

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, [token]);

  return {
    isConnected,
    socket,
  };
}
