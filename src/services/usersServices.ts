import HttpServices from "./HttpServices";

/**
 * Create a service instance for users.
 *
 * This will use the endpoint:
 * /users
 *
 * Example requests:
 * GET /users
 * POST /users
 */
const usersServices = new HttpServices("users");

/**
 * Export the users service
 * so it can be used in different parts of the app.
 *
 * Example:
 * import usersServices from "@/services/usersServices";
 */
export default usersServices;