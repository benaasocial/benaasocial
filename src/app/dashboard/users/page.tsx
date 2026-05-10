"use client";

import { Loader2, Plus } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import UsersTable from "@/components/UsersTable/UsersTable";
import useGetUsers from "@/hooks/useGetUsers";
import Pagination from "../../../components/pagination/Pagination";
import { Button } from "@/components/ui/button";

/**
 * Users page
 */
export default function Users() {
  // current page state
  const [page, setPage] = useState(1);

  // number of users per page
  const limit = 5;

  // fetch users with pagination
  const { data, isLoading, isError, isFetching } = useGetUsers(page, limit);

  // pagination metadata
  const meta = data?.data.meta;

  // users list
  const users = data?.data.items;

  /**
   * calculate total pages
   */
  const totalPages = useMemo(() => {
    if (!meta?.total || !meta?.limit) return 1;
    return Math.max(1, Math.ceil(meta.total / meta.limit));
  }, [meta]);

  // loading state
  if (isLoading) {
    return (
      <div className="text-sm text-muted-foreground text-center py-10">
        Loading users...
      </div>
    );
  }

  // error state
  if (isError) {
    return (
      <div className="text-sm text-red-600 text-center py-10">
        Failed to load users
      </div>
    );
  }

  // empty state
  if ((users?.length ?? 0) === 0) {
    return (
      <div className="text-sm text-muted-foreground text-center py-10">
        No users found
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div>

        {/* header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2">

              {/* page title */}
              <h1 className="text-2xl font-semibold">Users</h1>

              {/* small loading spinner while refetching */}
              {isFetching && (
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
              )}
            </div>

            <p className="text-sm text-muted-foreground">
              Manage system users and permissions
            </p>
          </div>

          {/* add user button */}
          <Button asChild>
            <Link href="/dashboard/users/new">
              <Plus className="h-4 w-4 mr-2" />
              Add User
            </Link>
          </Button>
        </div>

        {/* users table */}
        <UsersTable users={data?.data} />

        {/* pagination */}
        <Pagination
          currentPage={meta?.page ?? page}
          totalPages={totalPages}
          onPageChange={(p) => setPage(p)}
        />
      </div>
    </div>
  );
}