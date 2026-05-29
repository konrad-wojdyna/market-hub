import conversationService from "../services/conversationService";
import { useAsync } from "./useAsync";

export const useConversations = () => {
  const { data, isLoading, error } = useAsync({
    service: conversationService.getConversations,
  });

  return { conversations: data ?? [], isLoading, error };
};
