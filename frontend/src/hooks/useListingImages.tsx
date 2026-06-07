import { toast } from "react-toastify";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import listingImageService from "../services/listingImageService";

const useListingImagesQuery = (listingId: number) => {
  return useQuery({
    queryKey: ["listingImages", listingId],
    queryFn: () => listingImageService.getImages(listingId),
  });
};

const useUploadListingImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ listingId, file }: { listingId: number; file: File }) =>
      listingImageService.uploadImage(listingId, file),
    onSuccess: (_, variables) => {
      toast.success("Image added successfully");
      queryClient.invalidateQueries({
        queryKey: ["listingImages", variables.listingId],
      });
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });
};

const useDeleteListingImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      listingId,
      imageId,
    }: {
      listingId: number;
      imageId: number;
    }) => listingImageService.deleteImage(listingId, imageId),
    onSuccess: (_, variables) => {
      toast.success("Deleted successfully");
      queryClient.invalidateQueries({
        queryKey: ["listingImages", variables.listingId],
      });
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });
};

export const useListingImages = (listingId: number) => {
  const {
    data: listingImages,
    isLoading,
    error,
  } = useListingImagesQuery(listingId);
  const { mutate: uploadImageListing, isPending: isUploading } =
    useUploadListingImage();
  const { mutate: deleteImageListing, isPending: isDeleting } =
    useDeleteListingImage();

  return {
    listingImages,
    isLoading,
    error,
    uploadImageListing,
    deleteImageListing,
    isUploading,
    isDeleting,
  };
};
