import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../lib/queryKeys";
import usersServices from "@/services/usersServices";
import { ApiOk, UsersResponse } from "@/types/types";
import { AxiosError } from "axios";

/**
 * Fetch users list with pagination
 *
 * @param page current page number
 * @param limit number of users per page
 */


type User = ApiOk<UsersResponse>


const useGetUsers = (page = 1, limit = 5) => {
  return useQuery<User, AxiosError>({
    /**
     * Unique query key for caching
     */
    queryKey: [...queryKeys.users, page, limit],

    /**
     * Fetch users from API
     */
    queryFn: () => usersServices.getAllWithQuery(page, limit),
  });
};

export default useGetUsers;