/**
 * queryKeys
 *
 * A central place to store all React Query keys used in the app.
 * This helps avoid repeating strings and keeps query keys consistent.
 *
 * Example usage:
 * useQuery({ queryKey: queryKeys.users, queryFn: fetchUsers })
 */
export const queryKeys = {

  /**
   * Key for users list queries
   */
  users: ["users"] as const,

  /**
   * Key for posts queries
   */
  posts: ["posts"] as const,

  /**
   * Key for current logged-in user
   */
  me: ["me"] as const,

  /**
   * Key for platform connection status
   */
  status: ["platforms", "status"] as const,

  /**
   * Key for Meta (Facebook) pages list
   */
  metaPages: ["meta-pages"] as const
};