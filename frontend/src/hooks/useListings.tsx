import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import type { Listing, ListingSearchParams } from "../types/listing";
import type { Page } from "../types/page";
import listingService from "../services/listingService";

export const useListings = (searchParams?: ListingSearchParams) => {
  const [listings, setListings] = useState<Page<Listing> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const memoizedParams: Partial<ListingSearchParams> = useMemo(
    () => ({
      title: searchParams?.title,
      categoryId: searchParams?.categoryId,
      location: searchParams?.location,
      maxPrice: searchParams?.maxPrice,
      minPrice: searchParams?.minPrice,
      page: searchParams?.page,
      size: searchParams?.size,
      sort: searchParams?.sort,
    }),
    [
      searchParams?.title,
      searchParams?.categoryId,
      searchParams?.location,
      searchParams?.maxPrice,
      searchParams?.minPrice,
      searchParams?.page,
      searchParams?.size,
      searchParams?.sort,
    ],
  );

  useEffect(() => {
    let isCancelled = false;

    setError(null);

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const listings = await listingService.getAllListing(memoizedParams);
        if (!isCancelled) setListings(listings);
      } catch (err) {
        let errorMsg = "Something went wrong. Please try again...";

        if (axios.isAxiosError(err)) {
          errorMsg = err.response?.data?.message || err.message;
        } else if (err instanceof Error) {
          errorMsg = err.message;
        }

        if (!isCancelled) {
          setError(errorMsg);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      isCancelled = true;
    };
  }, [memoizedParams]);

  return { isLoading, error, listings };
};
