import { useMutation } from "@tanstack/react-query";
import userProfileService from "../services/userProfileService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const useDeleteUserProfile = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: () => userProfileService.deleteUserProfile(),
    onSuccess: () => {
      navigate("/");
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });

  return {
    handleDeleteAccount: mutation.mutateAsync,
    isLoading: mutation.isPending,
  };
};
