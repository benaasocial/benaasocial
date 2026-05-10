import { getErrorMessage } from "@/lib/getErrorMessage";
import { queryKeys } from "@/lib/queryKeys";
import { toastFlow } from "@/lib/toast";
import postsServices from "@/services/postsService";
import { ApiOk } from "@/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

/**
 * API response type for delete post
 */
type DeletePostResponse = ApiOk<{
  id: string;
}>;

/**
 * useDeletePost
 *
 * Mutation used to delete a post
 */
const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation<
    DeletePostResponse,
    AxiosError<{ error?: { message?: string }; message?: string }>,
    { id: string }
  >({
    /**
     * Send delete request
     */
    mutationFn: ({ id }) => postsServices.delete(id),

    /**
     * Handle success
     */
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.posts });

      toastFlow.success(data.message ?? "Post deleted successfully");
    },

    /**
     * Handle error
     */
    onError: (error) => {
      toastFlow.error(getErrorMessage(error));
    },
  });
};

export default useDeletePost;