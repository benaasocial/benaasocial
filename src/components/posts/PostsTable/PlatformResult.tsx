import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Platform, Post } from "@/types/types";
import { formatPublishError, prettyPlatform } from "./helpers";

type PlatformResultRowProps = {
  post: Post;
  platform: Platform;
  isBusy: boolean;
  canRetry: boolean;
  onRetry: () => void;
  onViewDetails: () => void;
};

export default function PlatformResultRow({
  post,
  platform,
  isBusy,
  canRetry,
  onRetry,
  onViewDetails,
}: PlatformResultRowProps) {
  // get publish result for this platform
  const result = post?.publishResults?.[platform];

  // readable platform name
  const label = prettyPlatform(platform);

  // shared retry button styles
  const retryButtonClassName = `text-[11px] underline ${
    isBusy
      ? "cursor-not-allowed text-muted-foreground/50"
      : "text-muted-foreground hover:text-black"
  }`;

  // not sent yet
  if (!result || result.status === "idle") {
    return (
      <div className="flex items-center justify-between gap-2">
        <div className="text-xs text-muted-foreground">{label}: Not sent</div>

        {/* show retry only if retry is allowed */}
        {canRetry && (
          <button
            type="button"
            disabled={isBusy}
            onClick={onRetry}
            className={retryButtonClassName.replace("text-[11px]", "text-xs")}
          >
            {isBusy ? "Retrying..." : "Retry"}
          </button>
        )}
      </div>
    );
  }

  // published successfully
  if (result.status === "published") {
    return (
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="text-xs">
            {label}: <span className="font-medium text-green-600">Published</span>
          </div>

          {/* show publish date if available */}
          {result.publishedAt && (
            <div className="text-[11px] text-muted-foreground">
              {format(new Date(result.publishedAt), "PPpp")}
            </div>
          )}
        </div>
      </div>
    );
  }

  // publishing failed
  if (result.status === "failed") {
    return (
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-xs">
            <span>
              {label}: <span className="font-medium text-red-600">Failed</span>
            </span>

            {/* small badge to highlight failed state */}
            <Badge variant="outline" className="text-[10px]">
              Needs attention
            </Badge>
          </div>

          {/* short version of error message */}
          <div className="truncate text-[11px] text-muted-foreground">
            {formatPublishError(result.error)}
          </div>

          <div className="flex gap-2 pt-1">
            <button
              type="button"
              onClick={onViewDetails}
              className="text-[11px] underline text-muted-foreground hover:text-black"
            >
              View details
            </button>

            {/* retry button */}
            {canRetry && (
              <button
                type="button"
                disabled={isBusy}
                onClick={onRetry}
                className={retryButtonClassName}
              >
                {isBusy ? "Retrying..." : "Retry"}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // fallback for unexpected status
  return null;
}