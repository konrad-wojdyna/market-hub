import { Grid2x2 } from "lucide-react";
import { Link } from "react-router-dom";
import NameInitials from "./NameInitials";
import { useMessages } from "../../hooks/useMessages";
import { ErrorComponent, Loading } from "..";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useWebSocket } from "../../hooks/useWebSocket";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import type { Message } from "../../types/message";

type ChatWindowProps = {
  selectedConversationId: number | null;
  conversationName: string;
  listingTitle: string;
};

const ChatWindow = ({
  selectedConversationId,
  conversationName,
  listingTitle,
}: ChatWindowProps) => {
  const conversationId = selectedConversationId || 0;

  const queryClient = useQueryClient();

  const { user } = useAuthContext();

  const { messages, error, isLoading } = useMessages(conversationId);

  const handleNewMessage = useCallback(
    (message: Message) => {
      queryClient.setQueryData(
        ["messages", conversationId],
        (old: Message[] | undefined) => [...(old ?? []), message],
      );
    },
    [conversationId, queryClient],
  );

  const { connected } = useWebSocket(conversationId, handleNewMessage);

  if (conversationId === 0) {
    return <h1>Wybierz konwersację</h1>;
  }
  if (error) {
    return <ErrorComponent message={error?.message} />;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col gap-4 m-4 bg-gray-100">
      <nav className="flex items-center justify-between gap-2 bg-gray-300">
        <div className="flex gap-2 items-center">
          <NameInitials initials={conversationName} />
          <p>{conversationName}</p>
        </div>
        <Link
          to={"/listings"}
          className="flex items-center gap-1 border p-1 rounded-md
          border-gray-400"
        >
          <Grid2x2 size={15} />
          <small>{listingTitle}</small>
        </Link>
      </nav>
      <div className="flex flex-col gap-2">
        <p className="m-auto">Today</p>
        <ul className="flex flex-col gap-4">
          {messages?.map((message) => {
            const isMyMessage = message.senderId === user?.id;
            return (
              <li
                key={message.id}
                className={`flex gap-2 ${isMyMessage ? "flex-row-reverse" : "flex-row"}`}
              >
                <NameInitials
                  initials={message.firstName[0].toUpperCase()}
                  size="sm"
                  showOnlineDot={false}
                />
                <p
                  className={`p-2 rounded-md text-sm ${isMyMessage ? "bg-teal-100" : "bg-gray-200"}`}
                >
                  {message.content}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
export default ChatWindow;
