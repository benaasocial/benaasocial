import { Platform, Post, SUPPORTED_PLATFORMS } from "@/types/types";

// Convert platform key to readable label
export function prettyPlatform(platform: Platform): string {
  switch (platform) {
    case "facebook":
      return "Facebook";
    case "instagram":
      return "Instagram";
    case "tiktok":
      return "TikTok";
    case "youtube":
      return "YouTube";
    default:
      return platform; // fallback just in case
  }
}

// Check if a platform can be retried for publishing
export function canRetryPlatform(post: Post, platform: Platform): boolean {
  // if platform is not selected in targets → no retry
  if (!post?.targets?.[platform]) return false;

  const status = post?.publishResults?.[platform]?.status;

  // already published → no need to retry
  if (status === "published") return false;

  // allow retry if failed, idle, or no status yet
  return status === "failed" || status === "idle" || !status;
}

// Check if there's at least one platform that can be retried
export function hasAnyRetry(post: Post): boolean {
  return getPostPlatforms(post).some((platform) =>
    canRetryPlatform(post, platform)
  );
}

// Get only platforms that are enabled in this post
export function getPostPlatforms(post: Post): Platform[] {
  return SUPPORTED_PLATFORMS.filter((platform) => post?.targets?.[platform]);
}

// Clean and shorten error message coming from backend
export function formatPublishError(raw?: string | null, maxLength = 100): string {
  if (!raw) return "";

  let message = raw;

  // try to extract JSON part if exists in the string
  const jsonStartIndex = raw.indexOf("{");

  if (jsonStartIndex !== -1) {
    try {
      const parsed = JSON.parse(raw.slice(jsonStartIndex));
      message = parsed?.error?.message ?? raw;
    } catch {
      // fallback to raw if parsing fails
      message = raw;
    }
  }

  // trim long messages
  return message.length > maxLength
    ? `${message.slice(0, maxLength)}…`
    : message;
}