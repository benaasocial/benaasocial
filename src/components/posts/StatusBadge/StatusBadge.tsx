"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { PostStatus } from "@/types/types";

/**
 * StatusBadge
 *
 * Displays post status with custom styles
 */
export default function StatusBadge({ status }: { status: PostStatus }) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "capitalize border",
        status === "draft" && "bg-gray-100 text-gray-700 border-gray-200",
        status === "queued" && "bg-yellow-50 text-yellow-700 border-yellow-200",
        status === "publishing" && "bg-blue-50 text-blue-700 border-blue-200",
        status === "published" && "bg-green-50 text-green-700 border-green-200",
        status === "partial" && "bg-orange-50 text-orange-700 border-orange-200",
        status === "failed" && "bg-red-50 text-red-700 border-red-200"
      )}
    >
      {status}
    </Badge>
  );
}