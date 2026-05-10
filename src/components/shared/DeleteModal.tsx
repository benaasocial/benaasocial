"use client";

import * as React from "react";
import { Button } from "../ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// reusable confirm dialog button (used for delete, etc.)
type ConfirmActionButtonProps = {
  trigger?: React.ReactNode; // custom trigger element
  triggerText?: string; // fallback text if no custom trigger
  triggerProps?: React.ComponentProps<typeof Button>;

  title: string; // dialog title
  description?: string; // optional description

  confirmText?: string;
  cancelText?: string;

  onConfirm: () => unknown | Promise<void>; // action to run on confirm

  loading?: boolean; // external loading state
  disabled?: boolean;

  closeOnSuccess?: boolean; // close dialog after success
  confirmVariant?: React.ComponentProps<typeof Button>["variant"];
};

export default function ConfirmActionButton({
  trigger,
  triggerText = "Confirm",
  triggerProps,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  loading: loadingProp,
  disabled = false,
  closeOnSuccess = true,
  confirmVariant = "destructive",
}: ConfirmActionButtonProps) {

  // controls dialog open/close
  const [open, setOpen] = React.useState(false);

  // internal loading state (used if no external loading is passed)
  const [internalLoading, setInternalLoading] = React.useState(false);

  // prefer external loading if provided
  const loading = loadingProp ?? internalLoading;

  // handle confirm click
  const handleConfirm = React.useCallback(async () => {
    if (loading) return; // prevent double click

    try {
      // only manage loading internally if not controlled from outside
      if (loadingProp === undefined) {
        setInternalLoading(true);
      }

      await onConfirm();

      // close dialog after success if enabled
      if (closeOnSuccess) {
        setOpen(false);
      }
    } finally {
      // reset internal loading
      if (loadingProp === undefined) {
        setInternalLoading(false);
      }
    }
  }, [loading, loadingProp, onConfirm, closeOnSuccess]);

  return (
    <AlertDialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (disabled) return; // prevent opening if disabled
        setOpen(nextOpen);
      }}
    >
      {/* trigger button */}
      <AlertDialogTrigger asChild>
        {trigger ? (
          trigger
        ) : (
          <Button {...triggerProps} disabled={disabled || loading}>
            {triggerText}
          </Button>
        )}
      </AlertDialogTrigger>

      {/* dialog content */}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>

          {/* optional description */}
          {description ? (
            <AlertDialogDescription>{description}</AlertDialogDescription>
          ) : null}
        </AlertDialogHeader>

        <AlertDialogFooter>
          {/* cancel button */}
          <AlertDialogCancel disabled={loading}>
            {cancelText}
          </AlertDialogCancel>

          {/* confirm button */}
          <AlertDialogAction asChild>
            <Button
              type="button"
              variant={confirmVariant}
              onClick={handleConfirm}
              disabled={disabled || loading}
            >
              {loading ? "Working..." : confirmText}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}