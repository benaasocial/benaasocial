import { AxiosError } from "axios";

/**
 * Extract a readable error message from different error types.
 */
export function getErrorMessage(
  error: unknown,
  fallback = "Something went wrong"
) {
  if (!error) return fallback;

  const axiosErr = error as AxiosError<{
    message?: string;
    error?: string | { message?: string };
  }>;

  const apiError = axiosErr?.response?.data?.error;

  const msg =
    axiosErr?.response?.data?.message ||
    (typeof apiError === "object" ? apiError?.message : undefined) ||
    (typeof apiError === "string" ? apiError : undefined) ||
    axiosErr?.message;

  if (typeof msg === "string" && msg.trim()) return msg;

  if (error instanceof Error && error.message) return error.message;

  return fallback;
}