import { useQuery } from "@tanstack/react-query";
import type { ListingSearchParams } from "../types/listing";
import listingService from "../services/listingService";

export const useListings = (searchParams?: ListingSearchParams) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["listings", searchParams],
    queryFn: () => listingService.getAllListing(searchParams),
  });

  return { isLoading, error, listings: data };
};
