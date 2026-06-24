import { toast } from "react-toastify";
import messageService from "../services/messageService";
import type { CreateMessageData } from "../types/message";
import { useMutation } from "@tanstack/react-query";

export const useSendMessage = () => {
  const mutation = useMutation({
    mutationFn: (data: CreateMessageData) => messageService.sendMessage(data),
    onError: (error) => {
      toast.error(error?.message);
    },
  });

  return {
    sendMessage: mutation.mutateAsync,
    isLoading: mutation.isPending,
  };
};
