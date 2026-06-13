import { useQuery } from "@tanstack/react-query";
import userProfileService from "../services/userProfileService";

export const useUserProfileById = (id: number) => {
  const { data, refetch, isLoading, error } = useQuery({
    queryKey: ["user-profile", id],
    queryFn: () => userProfileService.getUserProfileById(id),
  });

  return { isLoading, error, data, refetch };
};
