import HttpServices from "./HttpServices";

/**
 * Create a service instance for posts.
 *
 * This will use the endpoint:
 * /posts
 *
 * Example requests:
 * GET /posts
 * POST /posts
 */
const postsServices = new HttpServices("posts");

/**
 * Export the posts service
 * so it can be used anywhere in the app.
 *
 * Example:
 * import postsServices from "@/services/postsServices";
 */
export default postsServices;