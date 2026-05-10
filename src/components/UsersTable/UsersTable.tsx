"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import ConfirmActionButton from "@/components/shared/DeleteModal";
import { Role } from "@/constant/constant";
import { UsersTableProps } from "@/types/types";
import useDeleteUser from "@/hooks/useDeleteUser";
import useMe from "@/hooks/useMe";

/**
 * UsersTable
 *
 * Displays users in a clean table layout
 * with delete action and basic protection rules.
 */
export default function UsersTable({ users }: UsersTableProps) {
  /**
   * Delete user mutation
   */
  const deleteUserMutation = useDeleteUser();

  /**
   * Get current logged-in user
   */
  const { data: meResponse } = useMe();

  /**
   * Current user object
   */
  const currentUser = meResponse?.data?.user;


  /**
   * Users list fallback
   */
  const usersList = users?.items ?? [];

  return (
    <div className="rounded-xl border bg-white overflow-hidden shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {usersList.length > 0 ? (
            usersList.map((user) => {
              /**
               * Show loading state only for the user currently being deleted
               */
              const isDeletingCurrentRow =
                deleteUserMutation.isPending &&
                deleteUserMutation.variables?.id === user._id;

              /**
               * Prevent deleting the currently logged-in owner
               */
              const isCurrentOwner =
                user.role === Role.OWNER && currentUser?.id === user._id;

              return (
                <TableRow key={user._id} className="hover:bg-muted/40 transition-colors">
                  <TableCell className="font-medium">{user.username}</TableCell>

                  <TableCell className="text-muted-foreground">
                    {user.email}
                  </TableCell>

                  <TableCell>
                    <Badge
                      variant={user.role === Role.OWNER ? "default" : "secondary"}
                      className="capitalize"
                    >
                      {user.role}
                    </Badge>
                  </TableCell>

                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </TableCell>

                  <TableCell className="text-right">
                    <ConfirmActionButton
                      title="Delete user?"
                      description={`This will permanently delete ${user.username}. This action cannot be undone.`}
                      confirmText="Delete"
                      confirmVariant="destructive"
                      onConfirm={() =>
                        deleteUserMutation.mutateAsync({ id: user._id })
                      }
                      loading={isDeletingCurrentRow}
                      disabled={isCurrentOwner}
                      trigger={
                        <Button
                          variant="ghost"
                          size="icon"
                          disabled={isCurrentOwner || isDeletingCurrentRow}
                          title={
                            isCurrentOwner
                              ? "You cannot delete your own owner account"
                              : "Delete user"
                          }
                          className={cn(
                            "text-red-600 hover:text-red-700 hover:bg-red-50",
                            (isCurrentOwner || isDeletingCurrentRow) &&
                              "opacity-60 cursor-not-allowed"
                          )}
                        >
                          {isDeletingCurrentRow ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                        </Button>
                      }
                    />
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            /**
             * Empty state when there are no users to show
             */
            <TableRow>
              <TableCell
                colSpan={5}
                className="h-28 text-center text-sm text-muted-foreground"
              >
                No users found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}