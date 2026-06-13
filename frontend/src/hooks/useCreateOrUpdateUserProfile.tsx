import { useMutation } from "@tanstack/react-query";
import type { CreateUserProfile } from "../types/userProfile";
import userProfileService from "../services/userProfileService";
import { toast } from "react-toastify";

export const useCreateOrUpdateUserProfile = () => {
  const mutation = useMutation({
    mutationFn: (data: CreateUserProfile) =>
      userProfileService.createOrUpdateUserProfile(data),
    onSuccess: () => {
      toast.success("Profile updated!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return {
    createOrUpdateUserProfile: mutation.mutateAsync,
    isLoading: mutation.isPending,
    error: mutation.error,
  };
};
