import { getErrorMessage } from "@/lib/getErrorMessage";
import { queryKeys } from "@/lib/queryKeys";
import { toastFlow } from "@/lib/toast";
import users from "@/services/usersServices";
import { ApiOk, User } from "@/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

/**
 * API response type for create user
 */
type CreateUserResponse = ApiOk<User>;

/**
 * useCreateUser
 *
 * Mutation used to create a new user
 */
export default function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation<
    CreateUserResponse,
    AxiosError<{ error?: { message?: string }; message?: string }>,
    {
      data: {
        username: string;
        email: string;
        password: string;
        role: string;
      };
    }
  >({
    /**
     * Send create user request
     */
    mutationFn: ({ data }) => users.post(data),

    /**
     * Handle success
     */
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users });

      toastFlow.success(data.message ?? "User created successfully");
    },

    /**
     * Handle error
     */
    onError: (error) => {
      toastFlow.error(getErrorMessage(error));
    },
  });
}