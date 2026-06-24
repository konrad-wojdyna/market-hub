import { useQuery } from "@tanstack/react-query";
import conversationService from "../services/conversationService";

export const useConversations = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["conversations"],
    queryFn: () => conversationService.getConversations(),
  });

  return { conversations: data, isLoading, error };
};
