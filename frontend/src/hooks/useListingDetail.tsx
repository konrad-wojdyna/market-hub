import { useState, useEffect } from "react";
import type { Listing } from "../types/listing";
import listingService from "../services/listingService";
import axios from "axios";

export const useListingDetail = (id: number) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<Listing | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isCancelled = false;

    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response = await listingService.getListingById(Number(id));
        if (!isCancelled) setData(response);
      } catch (error) {
        let errorMsg = "Something went wrong. Please try again...";

        if (axios.isAxiosError(error)) {
          errorMsg = error.response?.data?.message || error.message;
        } else if (error instanceof Error) {
          errorMsg = error.message;
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
  }, [id]);

  return { isLoading, error, data };
};
