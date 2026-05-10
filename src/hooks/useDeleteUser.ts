import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { queryKeys } from "@/lib/queryKeys";
import { getErrorMessage } from "@/lib/getErrorMessage";
import usersServices from "../services/usersServices";
import { ApiOk } from "@/types/types";
import { toastFlow } from "@/lib/toast";

/**
 * API response type for delete user
 */
type DeleteUserResponse = ApiOk<{
  id: string;
}>;

/**
 * useDeleteUser
 *
 * Mutation used to delete a user
 */
export default function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation<
    DeleteUserResponse,
    AxiosError<{ error?: { message?: string }; message?: string }>,
    { id: string }
  >({
    /**
     * Send delete request
     */
    mutationFn: ({ id }) => usersServices.delete(id),

    /**
     * Handle success
     */
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users });

      toastFlow.success(data.message ?? "User deleted successfully");
    },

    /**
     * Handle error
     */
    onError: (error) => {
      toastFlow.error(getErrorMessage(error));
    },
  });
}