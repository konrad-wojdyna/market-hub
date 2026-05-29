import { toast } from "react-toastify";
import listingService from "../services/listingService";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import type { ListingFormData } from "../schemas/listingSchema";

export const useCreateListing = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (data: ListingFormData) => listingService.createListing(data),
    onSuccess: () => {
      toast.success("Listing created!");
      navigate("/listings");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return {
    createListing: mutation.mutateAsync,
    isLoading: mutation.isPending,
    error: mutation.error,
  };
};
