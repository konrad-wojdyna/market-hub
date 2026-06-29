import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useEffect, useState } from "react";
import type { Message } from "../types/message";
import { AUTH_TOKEN } from "../constants/auth";

export const useWebSocket = (
  conversationId: number | null,
  onMessage: (message: Message) => void,
) => {
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (!conversationId) return;

    const token = localStorage.getItem(AUTH_TOKEN);

    const client = new Client({
      webSocketFactory: () => new SockJS("http://localhost:8080/ws"),
      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    client.onConnect = () => {
      setConnected(true);

      console.log("Połączono ze STOMP!");

      client.subscribe(
        `/topic/conversation.${conversationId}`,
        (stompMessage) => {
          const message: Message = JSON.parse(stompMessage.body);
          onMessage(message);
        },
      );
    };

    client.onStompError = (frame) => {
      console.error("Błąd STOMP: " + frame.headers["conversation"]);
      console.error("Szczegóły: " + frame.body);
    };

    client.onDisconnect = () => {
      setConnected(false);
    };

    client.activate();

    return () => {
      client.deactivate();
      setConnected(false);
    };
  }, [conversationId, onMessage]);

  return {
    connected,
  };
};
