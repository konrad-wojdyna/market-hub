import categoryService from "../services/categoryService";
import { useQuery } from "@tanstack/react-query";

export const useCategories = (onlyActive: boolean) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["categories"],
    queryFn: () =>
      onlyActive
        ? categoryService.getActiveCategories()
        : categoryService.getAllCategories(),
  });

  return {
    categories: data ?? [],
    isLoading,
    error,
  };
};
