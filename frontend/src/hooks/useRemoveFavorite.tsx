import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import favoriteService from "../services/favoriteService";
import { type Favorite } from "../types/favorites";

export const useRemoveFavorite = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (listingId: number) =>
      favoriteService.removeFavorite(listingId),

    onMutate: async (listingId: number) => {
      await queryClient.cancelQueries({ queryKey: ["favorites"] });

      const previousFavorites = queryClient.getQueryData<Favorite[]>([
        "favorites",
      ]);

      if (previousFavorites) {
        queryClient.setQueryData<Favorite[]>(
          ["favorites"],
          previousFavorites.filter((f) => f.listingFavorite.id !== listingId),
        );
      }

      return { previousFavorites };
    },

    onError: (err, listingId, context) => {
      if (context?.previousFavorites) {
        queryClient.setQueryData(["favorites"], context.previousFavorites);
      }
      toast.error("Nie udało się usunąć z ulubionych");
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
      queryClient.invalidateQueries({ queryKey: ["listings"] });
    },
  });

  return {
    removeFavorite: mutation.mutate,
    isLoading: mutation.isPending,
    error: mutation.error,
  };
};
