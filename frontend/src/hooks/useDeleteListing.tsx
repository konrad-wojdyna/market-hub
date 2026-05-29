import { toast } from "react-toastify";
import listingService from "../services/listingService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteListing = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: number) => listingService.deleteListing(id),
    onSuccess: () => {
      toast.success("Deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["listings"] });
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });

  return {
    handleDelete: mutation.mutateAsync,
    isLoading: mutation.isPending,
  };
};
