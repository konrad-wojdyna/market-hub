import NameInitials from "./NameInitials";
import type { Message } from "../../types/message";

type ChatMessageProps = {
  messages: Message[];
};

const ChatMessage = ({ messages = [] }: ChatMessageProps) => {
  return (
    <li className="flex gap-3">
      <NameInitials initials="MK" size="sm" showOnlineDot={false} />
      <div className="flex flex-col gap-2">
        {messages.map((message) => {
          return (
            <p className="bg-gray-200 rounded-md p-2 text-sm">{message}</p>
          );
        })}
      </div>
    </li>
  );
};
export default ChatMessage;
