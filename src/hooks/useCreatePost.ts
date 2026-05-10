import { getErrorMessage } from "@/lib/getErrorMessage";
import { queryKeys } from "@/lib/queryKeys";
import { toastFlow } from "@/lib/toast";
import postsServices from "@/services/postsService";
import { ApiOk, CreatePostPayload, CreatePostResponse } from "@/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

/**
 * API response type for create post
 */
type CreatePostResponseType = ApiOk<CreatePostResponse>;

/**
 * useCreatePost
 *
 * Mutation used to create a new post
 */
export default function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation<
    CreatePostResponseType,
    AxiosError<{ error?: { message?: string }; message?: string }>,
    { data: CreatePostPayload }
  >({
    /**
     * Send create post request
     */
    mutationFn: ({ data }) => postsServices.post(data),

    /**
     * Handle successful response
     */
    onSuccess: (res) => {
      /**
       * Refresh posts list after creating a post
       */
      queryClient.invalidateQueries({ queryKey: queryKeys.posts });

      const meta = res?.data?.meta;
      const post = res?.data?.post;

      /**
       * Safety check in case post is missing
       */
      if (!post) {
        toastFlow.error("Failed to create the post.");
        return;
      }

      const published = meta?.publishedPlatforms || [];
      const failed = meta?.failedPlatforms || [];

      /**
       * Case 1: Published on all selected platforms
       */
      if (published.length && !failed.length) {
        toastFlow.success(
          `Post created and successfully published on: ${published.join(", ")}`
        );
        return;
      }

      /**
       * Case 2: Published on some platforms and failed on others
       */
      if (published.length && failed.length) {
        const errors = failed
          .map((p: "facebook" | "instagram" | "tiktok" | "youtube") => {
            const err = post.publishResults?.[p]?.error;
            return `${p}${err ? ` (${err})` : ""}`;
          })
          .join(", ");

        toastFlow.warning(
          `Post created and published on ${published.join(
            ", "
          )}, but failed on ${errors}`
        );
        return;
      }

      /**
       * Case 3: Failed on all platforms
       */
      if (!published.length && failed.length) {
        const errors = failed
          .map((p: "facebook" | "instagram" | "tiktok" | "youtube") => {
            const err = post.publishResults?.[p]?.error;
            return `${p}${err ? ` (${err})` : ""}`;
          })
          .join(", ");

        toastFlow.error(`Post created but failed to publish on: ${errors}`);
        return;
      }

      /**
       * Fallback success message
       */
      toastFlow.success("Post created successfully.");
    },

    /**
     * Handle API error
     */
    onError: (err) => {
      toastFlow.error(getErrorMessage(err));
    },
  });
}