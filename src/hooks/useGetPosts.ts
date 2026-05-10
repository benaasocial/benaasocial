import { queryKeys } from "@/lib/queryKeys";
import postsServices from "@/services/postsService";
import { ApiOk, PostsResponse } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

/**
 * Fetch posts list with pagination
 *
 * @param page current page number
 * @param limit number of posts per page
 */

type Post = ApiOk<PostsResponse>;


export const useGetPosts = (page = 1, limit = 5) => {
  return useQuery<Post, AxiosError>({
    /**
     * Unique query key for caching
     */
    queryKey: [...queryKeys.posts, page, limit],

    /**
     * Fetch posts from API
     */
    queryFn: () => postsServices.getAllWithQuery(page, limit),
  });
};