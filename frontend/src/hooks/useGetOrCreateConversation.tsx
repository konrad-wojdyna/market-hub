import { toast } from "react-toastify";
import conversationService from "../services/conversationService";
import type { CreateConversationData } from "../types/conversation";
import { useMutation } from "@tanstack/react-query";

export const useGetOrCreateConversation = () => {
  const mutation = useMutation({
    mutationFn: (data: CreateConversationData) =>
      conversationService.getOrCreateConversation(data),
    onError: (error) => {
      toast.error(error?.message);
    },
  });

  return {
    getOrCreateConversation: mutation.mutateAsync,
    isLoading: mutation.isPending,
  };
};
