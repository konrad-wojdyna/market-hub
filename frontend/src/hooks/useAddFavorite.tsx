import { useMutation, useQueryClient } from "@tanstack/react-query";
import favoriteService from "../services/favoriteService";
import { toast } from "react-toastify";

export const useAddFavorite = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (listingId: number) => favoriteService.addFavorite(listingId),

    onError: () => {
      toast.error("Nie udało się dodać do ulubionych");
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
      queryClient.invalidateQueries({ queryKey: ["listings"] });
    },
  });

  return {
    addFavorite: mutation.mutate,
    isLoading: mutation.isPending,
    error: mutation.error,
  };
};
