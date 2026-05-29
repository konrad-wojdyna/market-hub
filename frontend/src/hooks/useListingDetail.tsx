import listingService from "../services/listingService";
import { useQuery } from "@tanstack/react-query";

export const useListingDetail = (id: number) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["listings", id],
    queryFn: () => listingService.getListingById(id),
  });

  return { isLoading, error, data };
};
