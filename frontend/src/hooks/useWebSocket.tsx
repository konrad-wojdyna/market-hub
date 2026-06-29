import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useEffect, useState } from "react";
import type { Message } from "../types/message";

export const useWebSocket = (
  conversationId: number | null,
  onMessage: (message: Message) => void,
) => {
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (!conversationId) return;

    const client = new Client({
      webSocketFactory: () => new SockJS("http://localhost:8080/ws"),
    });

    client.onConnect = () => {
      setConnected(true);

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
