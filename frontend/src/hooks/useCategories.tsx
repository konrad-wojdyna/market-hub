import categoryService from "../services/categoryService";
import { useAsync } from "./useAsync";

export const useCategories = (onlyActive: boolean) => {
  const { data, isLoading, error } = useAsync({
    service: () =>
      onlyActive
        ? categoryService.getActiveCategories()
        : categoryService.getAllCategories(),
    dependencies: [onlyActive],
  });

  return { categories: data ?? [], isLoading, error };
};
