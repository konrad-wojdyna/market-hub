import { toast } from "react-toastify";
import listingService from "../services/listingService";
import { useMutation } from "@tanstack/react-query";
import type { ListingFormData } from "../schemas/listingSchema";

export const useUpdateListing = () => {
  const mutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: ListingFormData }) =>
      listingService.updateListing(id, data),
    onSuccess: () => toast.success("Listing updated!"),
    onError: (error) => {
      const errorMsg =
        error instanceof Error
          ? error.message
          : "Something went wrong. Pleasy try again!";
      toast.error(errorMsg);
    },
  });

  return {
    updateListing: mutation.mutateAsync,
    isLoading: mutation.isPending,
    error: mutation.error,
  };
};
