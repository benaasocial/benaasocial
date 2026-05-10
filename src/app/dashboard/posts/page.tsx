"use client";

import Pagination from "@/components/pagination/Pagination";
import PostsTable from "@/components/posts/PostsTable/PostsTable";
import { Button } from "@/components/ui/button";
import { useGetPosts } from "@/hooks/useGetPosts";
import { Loader2, Plus } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

/**
 * Posts page
 */
export default function PostsPage() {
  // current page state
  const [page, setPage] = useState(1);

  // number of posts per page
  const limit = 5;

  // fetch posts with pagination
  const { data, isLoading, isError, isFetching } = useGetPosts(page, limit);

  // pagination metadata
  const meta = data?.data.meta;

  // posts list
  const items = data?.data?.items ?? [];

  /**
   * calculate total pages
   */
  const totalPages = useMemo(() => {
    if (!meta?.total || !meta?.limit) return 1;
    return Math.max(1, Math.ceil(meta.total / meta.limit));
  }, [meta]);

  return (
    <div className="space-y-6 p-6">

      {/* Page header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">

            {/* Page title */}
            <h1 className="text-2xl font-semibold">Posts</h1>

            {/* Small spinner while refetching */}
            {isFetching && (
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
            )}
          </div>

          <p className="text-sm text-muted-foreground">
            Manage system posts and permissions
          </p>
        </div>

        {/* Add post button */}
        <Button asChild>
          <Link href="/dashboard/posts/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Post
          </Link>
        </Button>
      </div>

      {/* Loading state */}
      {isLoading ? (
        <div className="py-10 text-center text-sm text-muted-foreground">
          Loading posts...
        </div>

      ) : isError ? (
        /* Error state */
        <div className="py-10 text-center text-sm text-red-600">
          Failed to load posts
        </div>

      ) : items.length === 0 ? (
        /* Empty state */
        <div className="rounded-2xl border border-dashed py-12 text-center">
          <p className="text-sm text-muted-foreground">No posts found</p>
        </div>

      ) : (
        <>
          {/* Posts table */}
          <PostsTable posts={data?.data} />

          {/* Pagination */}
          <Pagination
            currentPage={meta?.page ?? page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  );
}