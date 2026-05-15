"use client";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useMemo, useState } from "react";
import useRetry from "@/hooks/useRetry";
import { Platform, PostTableProps } from "@/types/types";
import { prettyPlatform } from "./helpers";
import useDeletePost from "@/hooks/useDeletePost";
import PostTableRow from "./PostTableRow";

export default function PostsTable({ posts }: PostTableProps) {
  // mutation for retrying publish
  const retry = useRetry();

  // mutation for deleting post
  const deletePostMutation = useDeletePost();

  // fallback to empty array if no posts
  const items = useMemo(() => posts?.items ?? [], [posts]);

  // currently busy post id while retry is running
  const busyId = retry.variables?.id;

  // details dialog state for showing full error
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [details, setDetails] = useState<{
    postId: string;
    platform: Platform;
    error: string;
  } | null>(null);

  // retry one or all platforms
  const doRetry = (id: string, platform?: Platform) => {
    retry.mutate({
      id,
      platform,
    });
  };

  // open dialog with full error details
  const openDetails = (
    postId: string,
    platform: Platform,
    error: string | null
  ) => {
    setDetails({
      postId,
      platform,
      error: String(error || ""),
    });

    setDetailsOpen(true);
  };

  // retry selected platform
  const handlePlatformRetry = (
    postId: string,
    platform: Platform
  ) => {
    doRetry(postId, platform);
  };

  return (
    <div className="overflow-hidden rounded-2xl border bg-white">
      <Table className="w-full table-fixed">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[320px]">Content</TableHead>
            <TableHead className="w-40">Platforms</TableHead>
            <TableHead className="w-30">Status</TableHead>
            <TableHead className="w-105">Results</TableHead>
            <TableHead className="w-55 text-right">Created By</TableHead>
            <TableHead className="w-55 text-right">Created</TableHead>
            <TableHead className="w-32 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {items.map((post) => (
            <PostTableRow
              key={post._id}
              post={post}
              retry={retry}
              busyId={busyId}
              deletePostMutation={deletePostMutation}
              doRetry={doRetry}
              openDetails={openDetails}
              handlePlatformRetry={handlePlatformRetry}
            />
          ))}
        </TableBody>
      </Table>

      {/* dialog for showing full publish error */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {details
                ? `${prettyPlatform(details.platform)} publish error`
                : "Publish error"}
            </DialogTitle>
          </DialogHeader>

          {details && (
            <div className="space-y-2">
              <pre className="max-h-90 overflow-auto whitespace-pre-wrap rounded-lg bg-muted p-3 text-xs">
                {details.error}
              </pre>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}