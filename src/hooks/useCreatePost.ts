import { getErrorMessage } from "@/lib/getErrorMessage";
import { queryKeys } from "@/lib/queryKeys";
import { toastFlow } from "@/lib/toast";
import postsServices from "@/services/postsService";
import {
  ApiOk,
  CreatePostPayload,
  CreatePostResponse,
  Post,
} from "@/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

/**
 * API response type for create post
 */
type CreatePostResponseType = ApiOk<CreatePostResponse>;

type PlatformName = "facebook" | "instagram" | "tiktok" | "youtube";

function getPlatformError(post: Post, platform: PlatformName) {
  const result = post?.publishResults?.[platform];

  return (
    result?.error ||
    result?.rawStatus?.fail_reason ||
    result?.rawStatus?.error?.message ||
    result?.rawStatus?.error?.code ||
    result?.rawStatus?.status_message ||
    result?.rawStatus?.message ||
    null
  );
}

function hasProcessingTikTok(post: Post) {
  return post?.publishResults?.tiktok?.status === "processing";
}

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
      queryClient.invalidateQueries({
        queryKey: queryKeys.posts,
      });

      const meta = res?.data?.meta;
      const post = res?.data?.post;

      if (!post) {
        toastFlow.error("Failed to create the post.");
        return;
      }

      const published = meta?.publishedPlatforms || [];
      const failed = meta?.failedPlatforms || [];
      const isTikTokProcessing = hasProcessingTikTok(post);

      /**
       * Important:
       * TikTok success here means upload job started,
       * not final publish success.
       */
      if (isTikTokProcessing) {
        const otherPublished = published.filter(
          (p: PlatformName) => p !== "tiktok"
        );

        const otherFailed = failed.filter(
          (p: PlatformName) => p !== "tiktok"
        );

        if (otherPublished.length && otherFailed.length) {
          const errors = otherFailed
            .map((p: PlatformName) => {
              const err = getPlatformError(post, p);
              return `${p}${err ? ` (${err})` : ""}`;
            })
            .join(", ");

          toastFlow.warning(
            `Post created. TikTok upload started and is still processing. Published on ${otherPublished.join(
              ", "
            )}, but failed on ${errors}`
          );
          return;
        }

        if (otherPublished.length) {
          toastFlow.success(
            `Post created. Published on ${otherPublished.join(
              ", "
            )}. TikTok upload started and is still processing.`
          );
          return;
        }

        if (otherFailed.length) {
          const errors = otherFailed
            .map((p: PlatformName) => {
              const err = getPlatformError(post, p);
              return `${p}${err ? ` (${err})` : ""}`;
            })
            .join(", ");

          toastFlow.warning(
            `Post created. TikTok upload started and is still processing, but failed on ${errors}`
          );
          return;
        }

        toastFlow.success(
          "Post created. TikTok upload started and is still processing."
        );
        return;
      }

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
          .map((p: PlatformName) => {
            const err = getPlatformError(post, p);
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
          .map((p: PlatformName) => {
            const err = getPlatformError(post, p);
            return `${p}${err ? ` (${err})` : ""}`;
          })
          .join(", ");

        toastFlow.error(
          `Post created but failed to publish on: ${errors}`
        );
        return;
      }

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