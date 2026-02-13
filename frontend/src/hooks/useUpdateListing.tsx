import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import listingService from "../services/listingService";
import type { UseFormReset } from "react-hook-form";
import type {
  CreateListingData,
  Listing,
  UpdateListingData,
} from "../types/listing";
import { useNavigate } from "react-router-dom";

export const useUpdateListing = (id: number) => {
  const navigate = useNavigate();
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
      }
    };

    if (id) fetchData();
  }, [id]);

  const updateListing = async (data: UpdateListingData) => {
    try {
      await listingService.updateListing(id, data);
      toast.success("Listing updated!");
      navigate(`/listings/${id}`);
    } catch (error) {
      const errorMsg =
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again!";
      toast.error(errorMsg);
    }
  };

  return { updateListing, navigate, initialData };
};
