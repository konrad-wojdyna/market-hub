import { toast } from "react-toastify";
import conversationService from "../services/conversationService";
import type { CreateConversationData } from "../types/conversation";

export const useGetOrCreateConversation = () => {
  const getOrCreateConversation = async (data: CreateConversationData) => {
    try {
      const response = await conversationService.getOrCreateConversation(data);
      return response;
    } catch (err) {
      const errorMsg =
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again!";
      toast.error(errorMsg);
      throw err;
    }
  };

  return { getOrCreateConversation };
};
