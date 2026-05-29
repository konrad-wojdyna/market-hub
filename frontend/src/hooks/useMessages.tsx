import messageService from "../services/messageService";
import { useAsync } from "./useAsync";

export const useMessages = (conversationId: number) => {
  const { data, isLoading, error } = useAsync({
    service: () => messageService.getMessages(conversationId),
    dependencies: [conversationId],
  });

  return { messages: data ?? [], isLoading, error };
};
