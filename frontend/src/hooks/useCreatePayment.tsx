import { type PaymentRequest } from "../types/payment";
import { useMutation } from "@tanstack/react-query";
import paymentService from "../services/paymentService";

export const useCreatePayment = () => {
  const mutation = useMutation({
    mutationFn: (data: PaymentRequest) => paymentService.createPayment(data),
  });

  return {
    initPayment: mutation.mutateAsync,
    isLoading: mutation.isPending,
    error: mutation.error,
  };
};
