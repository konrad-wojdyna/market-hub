import axios from "axios";
import { useEffect, useState } from "react";
import type { Listing } from "../types/listing";
import listingService from "../services/listingService";

export const useListings = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isCancelled = false;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const listings = await listingService.getAllListing();
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
  }, []);

  return { isLoading, error, listings };
};
