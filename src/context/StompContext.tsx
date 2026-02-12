"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

import { Client, IFrame, IMessage } from "@stomp/stompjs";

interface StompContextType {
  client: Client | null;
  isConnected: boolean;
}

const StompContext = createContext<StompContextType | null>(null);

export const StompProvider = ({ children }: { children: React.ReactNode }) => {
  const [client, setClient] = useState<Client | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const SOCKET_URL = `wss://43.202.184.232.nip.io/ws?token=${token}`;

    const clientInstance = new Client({
      webSocketFactory: () => new WebSocket(SOCKET_URL, ["v12.stomp"]),
      connectHeaders: {},

      onConnect: (frame: IFrame) => {
        setIsConnected(true);
        console.log("🚀 STOMP Connected");

        // [가이드 STEP 1] 개인 이벤트 채널 구독 (방 생성 알림 등 수신)
        clientInstance.subscribe("/user/queue/chat/events", (msg: IMessage) => {
          const event = JSON.parse(msg.body);
          console.log("📩 [EVENT RECEIVED]", event);

          // 방 생성 이벤트(ROOM_CREATED) 발생 시 커스텀 이벤트로 알림 (Chatting 컴포넌트 수신용)
          if (event.type === "ROOM_CREATED") {
            window.dispatchEvent(
              new CustomEvent("ROOM_CREATED", { detail: event }),
            );
          }
        });
      },
      onDisconnect: () => setIsConnected(false),
      debug: str => console.log("[STOMP Debug]", str),
      reconnectDelay: 5000,
    });

    clientInstance.activate();
    //setClient(clientInstance);

    // return () => { clientInstance.deactivate(); };
  }, []);

  return (
    <StompContext.Provider value={{ client, isConnected }}>
      {children}
    </StompContext.Provider>
  );
};

export const useStomp = () => {
  const context = useContext(StompContext);
  if (!context) throw new Error("useStomp 필수");
  return context;
};
