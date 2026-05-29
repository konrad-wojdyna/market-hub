import { toast } from "react-toastify";
import listingService from "../services/listingService";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

export const useDeleteListing = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (id: number) => listingService.deleteListing(id),
    onSuccess: () => {
      toast.success("Deleted successfully");
      navigate("/listings");
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });

  return {
    handleDelete: mutation.mutateAsync,
    isLoading: mutation.isPending,
    error: mutation.error,
  };
};
