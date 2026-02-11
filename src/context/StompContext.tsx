"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { Client } from "@stomp/stompjs";

interface StompContextType {
  client: Client | null;
  isConnected: boolean;
}

const StompContext = createContext<StompContextType | null>(null);

export const StompProvider = ({ children }: { children: React.ReactNode }) => {
  const [client, setClient] = useState<Client | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("accessToken")
        : null;

    const clientInstance = new Client({
      brokerURL: "ws://43.202.184.232.nip.io/ws",
      connectHeaders: { Authorization: `Bearer ${token}` },
      onConnect: () => setIsConnected(true),
      onDisconnect: () => setIsConnected(false),
    });

    clientInstance.activate();

    setTimeout(() => {
      setClient(clientInstance);
    }, 0);

    return () => {
      clientInstance.deactivate();
    };
  }, []);

  return (
    <StompContext.Provider value={{ client, isConnected }}>
      {children}
    </StompContext.Provider>
  );
};

export const useStomp = () => {
  const context = useContext(StompContext);
  if (!context)
    throw new Error("useStomp는 StompProvider 내부에서 사용해야 합니다.");
  return context;
};
