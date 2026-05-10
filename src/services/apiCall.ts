import jsCookie from "js-cookie";
import axios from "axios";

/**
 * Create a pre-configured Axios instance for all API requests.
 *
 * Using a single instance allows us to:
 * - Define the base URL once
 * - Attach auth headers automatically
 * - Keep API logic in one place
 */
const apiCall = axios.create({
  /**
   * Base URL for backend requests
   */
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

/**
 * Add token to every request if it exists
 */
apiCall.interceptors.request.use((config) => {
  /**
   * Read token from cookies
   */
  const token = jsCookie.get("token");

  /**
   * Attach token in Authorization header
   */
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default apiCall;