import { toast } from "react-toastify";
import listingService from "../services/listingService";
import { useNavigate } from "react-router-dom";
import type { CreateListingData } from "../types/listing";

export const useCreateListing = () => {
  const navigate = useNavigate();

  const createListing = async (data: CreateListingData) => {
    try {
      await listingService.createListing(data);
      toast.success("Listing created!");
      navigate("/listings");
    } catch (error) {
      const errorMsg =
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again!";
      toast.error(errorMsg);
      throw error;
    }
  };

  return { createListing, navigate };
};
