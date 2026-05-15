"use client";

import { Button } from "@/components/ui/button";
import { prettyPlatform } from "./helpers";
import { PlatformResultRowProps, PublishResult } from "@/types/types";

function getPlatformError(
  result?: PublishResult | null
): string | null {
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

function getStatusLabel(status?: string) {
  if (status === "published") return "Published";
  if (status === "processing") return "Processing";
  if (status === "failed") return "Failed";
  return "Idle";
}

function getStatusClass(status?: string) {
  if (status === "published") {
    return "bg-green-100 text-green-700";
  }

  if (status === "processing") {
    return "bg-yellow-100 text-yellow-700";
  }

  if (status === "failed") {
    return "bg-red-100 text-red-700";
  }

  return "bg-muted text-muted-foreground";
}

export default function PlatformResultRow({
  post,
  platform,
  isBusy,
  canRetry,
  onRetry,
  onViewDetails,
}: PlatformResultRowProps) {
  const result = post.publishResults?.[platform];

  const status = result?.status || "idle";
  const errorText = getPlatformError(result);

  return (
    <div className="rounded-lg border p-3">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">
              {prettyPlatform(platform)}
            </span>

            <span
              className={`rounded-full px-2 py-0.5 text-xs font-medium ${getStatusClass(
                status
              )}`}
            >
              {getStatusLabel(status)}
            </span>
          </div>

          {status === "processing" && (
            <div className="mt-1 text-xs text-muted-foreground">
              TikTok is still processing this video.
            </div>
          )}

          {status === "failed" && errorText && (
            <div className="mt-1 line-clamp-2 text-xs text-red-600">
              {errorText}
            </div>
          )}

          {status === "published" && result?.publishedAt && (
            <div className="mt-1 text-xs text-muted-foreground">
              Published at{" "}
              {new Date(result.publishedAt).toLocaleString()}
            </div>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-2">
          {status === "failed" && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onViewDetails}
            >
              View reason
            </Button>
          )}

          {canRetry && (
            <Button
              variant="outline"
              size="sm"
              disabled={isBusy}
              onClick={onRetry}
            >
              {isBusy ? "Retrying..." : "Retry"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}