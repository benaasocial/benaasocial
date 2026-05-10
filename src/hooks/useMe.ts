import { queryKeys } from "@/lib/queryKeys";
import HttpServices from "@/services/HttpServices";
import { useQuery } from "@tanstack/react-query";

/**
 * Fetch current logged-in user
 */
const useMe = () => {
  return useQuery({
    queryKey: queryKeys.me,

    /**
     * Call auth endpoint to get current user
     */
    queryFn: () => new HttpServices("auth").getMe(),
  });
};

export default useMe;