import { useQuery } from "@tanstack/react-query";
import paymentService from "../services/paymentService";

export const useFeaturedDurations = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["featuredOptions"],
    queryFn: () => paymentService.getFeaturedDurations(),
  });

  return { featuredOptions: data ?? [], isLoading, error };
};
