"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

import PlatformBadges from "../PlatformBadges/PlatformBadges";
import StatusBadge from "../StatusBadge/StatusBadge";
import PlatformResultRow from "./PlatformResult";

import ConfirmActionButton from "../../shared/DeleteModal";

import useTikTokPostStatus from "@/hooks/useTikTokPostStatus";

import {
    canRetryPlatform,
    getPostPlatforms,
    hasAnyRetry,
} from "./helpers";
import { PostTableRowProps, PublishResult } from "@/types/types";

function getPlatformError(result: PublishResult) {
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

function getPlatformDetails(result: PublishResult) {
    const error = getPlatformError(result);

    if (error) return error;

    if (result?.rawStatus) {
        return JSON.stringify(result.rawStatus, null, 2);
    }

    return "Unknown error";
}

export default function PostTableRow({
    post,
    retry,
    busyId,
    deletePostMutation,
    doRetry,
    openDetails,
    handlePlatformRetry,
}: PostTableRowProps) {

    const isDeleting =
        deletePostMutation.isPending &&
        deletePostMutation.variables?.id === post._id;

    const shouldPoll =
        post.publishResults?.tiktok?.status === "processing";

    const { data: tiktokStatusData } =
        useTikTokPostStatus(
            post._id,
            shouldPoll
        );

    const latestPost =
        tiktokStatusData?.data?.post ?? post;


    const tiktokProcessing =
        latestPost.publishResults?.tiktok?.status === "processing";

    const isBusy =
        (retry.isPending && busyId === latestPost._id) ||
        tiktokProcessing;

    return (
        <TableRow key={latestPost._id}>
            <TableCell className="align-top">
                <div className="text-sm font-medium truncate">
                    {latestPost.caption || "—"}
                </div>

                <div className="text-xs text-muted-foreground truncate">
                    {(latestPost.hashtags || [])
                        .map((h: string) =>
                            h.startsWith("#") ? h : `#${h}`
                        )
                        .join(" ")}
                </div>

                {hasAnyRetry(latestPost) && (
                    <div className="pt-2">
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={isBusy}
                            onClick={() => doRetry(latestPost._id)}
                        >
                            {isBusy
                                ? "Retrying..."
                                : "Retry failed platforms"}
                        </Button>
                    </div>
                )}
            </TableCell>

            <TableCell className="align-top">
                <PlatformBadges
                    targets={latestPost.targets}
                />
            </TableCell>

            <TableCell className="align-top">
                <StatusBadge
                    status={latestPost.status}
                />
            </TableCell>

            <TableCell className="align-top space-y-3">
                {getPostPlatforms(latestPost).map(
                    (platform) => {
                        const result =
                            latestPost.publishResults?.[platform];

                        const canRetry =
                            canRetryPlatform(
                                latestPost,
                                platform
                            );

                        return (
                            <PlatformResultRow
                                key={platform}
                                post={latestPost}
                                platform={platform}
                                isBusy={isBusy}
                                canRetry={canRetry}
                                onRetry={() =>
                                    handlePlatformRetry(
                                        latestPost._id,
                                        platform
                                    )
                                }
                                onViewDetails={() =>
                                    openDetails(
                                        latestPost._id,
                                        platform,
                                        getPlatformDetails(result)
                                    )
                                }
                            />
                        );
                    }
                )}
            </TableCell>

            <TableCell className="align-top text-right text-sm text-muted-foreground">
                {latestPost.user?.username || "—"}
            </TableCell>

            <TableCell className="align-top text-right text-sm text-muted-foreground">
                {format(
                    new Date(latestPost.createdAt),
                    "PPpp"
                )}
            </TableCell>

            <TableCell className="align-top text-right">
                <ConfirmActionButton
                    triggerText="Delete"
                    triggerProps={{
                        variant: "destructive",
                        size: "sm",
                    }}
                    title="Delete post"
                    description="Are you sure you want to delete this post? This action cannot be undone."
                    confirmText="Delete"
                    cancelText="Cancel"
                    loading={isDeleting}
                    onConfirm={() =>
                        deletePostMutation.mutateAsync({
                            id: latestPost._id,
                        })
                    }
                />
            </TableCell>
        </TableRow>
    );
}