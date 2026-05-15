import { toastFlow } from "@/lib/toast";
import { queryKeys } from "@/lib/queryKeys";
import HttpServices from "@/services/HttpServices";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { ApiOk, Post, TikTokRawStatus } from "@/types/types";

type TikTokPostStatusResponse = ApiOk<{
  post: Post;
  tiktokStatus: TikTokRawStatus;
}>;

function getTikTokError(post: Post) {
  const result = post?.publishResults?.tiktok;

  return (
    result?.error ||
    result?.rawStatus?.fail_reason ||
    result?.rawStatus?.error?.message ||
    result?.rawStatus?.error?.code ||
    result?.rawStatus?.status_message ||
    result?.rawStatus?.message ||
    "TikTok publishing failed"
  );
}

/**
 * Poll TikTok publish status while processing
 */
const useTikTokPostStatus = (
  postId: string,
  enabled: boolean
) => {
  const queryClient = useQueryClient();

  const previousStatusRef = useRef<string | null>(null);
  const hasShownFinalToastRef = useRef(false);

  const query = useQuery<TikTokPostStatusResponse>({
    queryKey: ["tiktok-post-status", postId],

    queryFn: () =>
      new HttpServices("").getTikTokPostStatus(postId),

    enabled: enabled && !!postId,

    refetchInterval: (query) => {
      const status =
        query.state.data?.data?.post?.publishResults?.tiktok?.status;

      return status === "processing" ? 10000 : false;
    },

    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    const post = query.data?.data?.post;

    const status =
      post?.publishResults?.tiktok?.status;

    if (!status) return;

    const previousStatus = previousStatusRef.current;

    if (
      !hasShownFinalToastRef.current &&
      previousStatus === "processing" &&
      status === "published"
    ) {
      hasShownFinalToastRef.current = true;

      toastFlow.success(
        "TikTok video published successfully."
      );

      queryClient.invalidateQueries({
        queryKey: queryKeys.posts,
      });
    }

    if (
      !hasShownFinalToastRef.current &&
      previousStatus === "processing" &&
      status === "failed"
    ) {
      hasShownFinalToastRef.current = true;

      toastFlow.error(getTikTokError(post));

      queryClient.invalidateQueries({
        queryKey: queryKeys.posts,
      });
    }

    previousStatusRef.current = status;
  }, [query.data, queryClient]);

  return query;
};

export default useTikTokPostStatus;