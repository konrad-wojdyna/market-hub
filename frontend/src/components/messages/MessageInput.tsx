import { useRef } from "react";
import { useSendMessage } from "../../hooks/useSendMessage";
import type { CreateMessageData } from "../../types/message";
import { useQueryClient } from "@tanstack/react-query";

type MessageInputProps = {
  conversationId: number | null;
};

const MessageInput = ({ conversationId }: MessageInputProps) => {
  const queryClient = useQueryClient();

  const inputRef = useRef<HTMLInputElement>(null);
  const { sendMessage, isLoading } = useSendMessage();

  const handleSave = async (e: React.SubmitEvent) => {
    e.preventDefault();

    const messageData: CreateMessageData = {
      content: inputRef?.current?.value || "",
      conversationId: conversationId || 0,
    };

    await sendMessage(messageData);

    queryClient.invalidateQueries({ queryKey: ["messages", conversationId] });
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <form
      onSubmit={handleSave}
      className="flex items-center justify-between m-2 py-2 px-4 border rounded-md"
    >
      <input
        type="text"
        placeholder="Type here..."
        className="border-none outline-none"
        ref={inputRef}
      />
      <button type="submit" className="bg-blue-400 p-2 rounded-md text-white">
        Send
      </button>
    </form>
  );
};
export default MessageInput;
