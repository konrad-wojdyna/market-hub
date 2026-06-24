import { useQuery } from "@tanstack/react-query";
import messageService from "../services/messageService";

export const useMessages = (conversationId: number) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["messages", conversationId],
    queryFn: () => messageService.getMessages(conversationId),
  });

  return { isLoading, error, messages: data };
};
