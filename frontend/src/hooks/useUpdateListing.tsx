import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import listingService from "../services/listingService";
import type { Listing, UpdateListingData } from "../types/listing";

export const useUpdateListing = (id: number) => {
  const [initialData, setInitialData] = useState<Listing | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await listingService.getListingById(id);
        setInitialData(data);
      } catch (error) {
        const errorMsg =
          error instanceof Error
            ? error.message
            : "Something went wrong. Pleasy try again!";
        toast.error(errorMsg);
        throw error;
      }
    };

    if (id) fetchData();
  }, [id]);

  const updateListing = async (data: UpdateListingData) => {
    try {
      await listingService.updateListing(id, data);
      toast.success("Listing updated!");
    } catch (error) {
      const errorMsg =
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again!";
      toast.error(errorMsg);
    }
  };

  return { updateListing, initialData };
};
