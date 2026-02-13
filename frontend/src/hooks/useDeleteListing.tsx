import { toast } from "react-toastify";
import listingService from "../services/listingService";
import { useNavigate } from "react-router-dom";

export const useDeleteListing = (id: number) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await listingService.deleteListing(id);
      toast.success("Deleted successfully");
      navigate("/listings");
    } catch (error) {
      const errorMsg =
        error instanceof Error ? error.message : "Failed to delete";
      toast.error(errorMsg);
    }
  };

  return { handleDelete };
};
