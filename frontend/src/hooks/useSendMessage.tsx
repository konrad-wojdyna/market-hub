import { toast } from "react-toastify";
import messageService from "../services/messageService";
import type { CreateMessageData } from "../types/message";

export const useSendMessage = () => {
  const sendMessage = async (data: CreateMessageData) => {
    try {
      await messageService.sendMessage(data);
    } catch (err) {
      const errorMsg =
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again!";
      toast.error(errorMsg);
      throw err;
    }
  };

  return { sendMessage };
};
