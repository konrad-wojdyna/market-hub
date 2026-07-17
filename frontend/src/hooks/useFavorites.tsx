import { useQuery } from "@tanstack/react-query";
import favoriteService from "../services/favoriteService";

export const useFavorites = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["favorites"],
    queryFn: () => favoriteService.getFavorites(),
  });

  return { favorites: data, isLoading, error };
};
