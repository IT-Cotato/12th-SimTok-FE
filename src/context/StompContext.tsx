"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

import { Client } from "@stomp/stompjs";

import { refreshAccessToken } from "@/utils/auth";

interface StompContextType {
  client: Client | null;
  isConnected: boolean;
}

const StompContext = createContext<StompContextType | null>(null);

export const StompProvider = ({ children }: { children: React.ReactNode }) => {
  const [client, setClient] = useState<Client | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const getLatestToken = () => localStorage.getItem("accessToken");
    const initialToken = getLatestToken();

    if (!initialToken) {
      console.warn("⚠️ 초기 토큰 없음");
      return;
    }

    const clientInstance = new Client({
      brokerURL: `wss://43.202.184.232.nip.io/ws`,
      connectHeaders: { Authorization: `Bearer ${initialToken}` },
      webSocketFactory: () =>
        new WebSocket(`wss://43.202.184.232.nip.io/ws`, ["v12.stomp"]),
      beforeConnect: () => {
        const currentToken = getLatestToken();
        if (currentToken) {
          clientInstance.connectHeaders = {
            Authorization: `Bearer ${currentToken}`,
          };
        }
      },
      debug: str => console.log("[STOMP Debug]", str),
      reconnectDelay: 5000,
      heartbeatIncoming: 10000,
      heartbeatOutgoing: 10000,
    });

    // 1. 연결 성공 콜백
    clientInstance.onConnect = _frame => {
      console.log("🚀 STOMP Connected");
      setIsConnected(true);
      setClient(clientInstance);

      // 2.2 에러 수신 채널 구독
      // clientInstance.subscribe("/user/queue/errors", (msg) => {
      //   console.error("❌ 서버 에러 수신:", JSON.parse(msg.body));
      // });

      // 2.1 ACK 수신 채널 구독
      // clientInstance.subscribe("/user/queue/chat/events", (msg) => {
      //   console.log("✅:", JSON.parse(msg.body));
      // });

      // 3.1 ACK 요청 전송
      // clientInstance.publish({
      //   destination: "/app/connection/ack",
      //   body: JSON.stringify({ message: "안녕하세요" }),
      //   headers: { "content-type": "application/json" }
      // });
    };

    // 2. 웹소켓 종료 콜백
    clientInstance.onWebSocketClose = () => {
      console.warn("⚠️ WebSocket Closed");
      setIsConnected(false);
      setClient(null);
    };

    // 3. 에러 핸들러
    clientInstance.onStompError = async frame => {
      const msg = frame.headers["message"];
      if (
        msg?.includes("expired") ||
        msg?.includes("token") ||
        msg?.includes("403")
      ) {
        const newToken = await refreshAccessToken();
        if (newToken) {
          clientInstance.connectHeaders = {
            Authorization: `Bearer ${newToken}`,
          };
          clientInstance.activate();
        }
      }
    };

    clientInstance.activate();
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
  if (!context) throw new Error("useStomp 필수");
  return context;
};
