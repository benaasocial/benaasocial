"use client";

import * as React from "react";
import { Button } from "../ui/button";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type ConfirmActionButtonProps = {
  trigger?: React.ReactNode;
  triggerText?: string;
  triggerProps?: React.ComponentProps<typeof Button>;

  title: string;
  description?: string;

  confirmText?: string;
  cancelText?: string;

  onConfirm: () => unknown | Promise<unknown>;

  loading?: boolean;
  disabled?: boolean;

  closeOnSuccess?: boolean;
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
  const [open, setOpen] = React.useState(false);
  const [internalLoading, setInternalLoading] = React.useState(false);

  const loading = loadingProp ?? internalLoading;

  const handleConfirm = React.useCallback(async () => {
    if (loading) return;

    try {
      if (loadingProp === undefined) {
        setInternalLoading(true);
      }

      await onConfirm();

      if (closeOnSuccess) {
        setOpen(false);
      }
    } finally {
      if (loadingProp === undefined) {
        setInternalLoading(false);
      }
    }
  }, [loading, loadingProp, onConfirm, closeOnSuccess]);

  return (
    <AlertDialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (disabled || loading) return;
        setOpen(nextOpen);
      }}
    >
      <AlertDialogTrigger asChild>
        {trigger ? (
          trigger
        ) : (
          <Button
            {...triggerProps}
            disabled={disabled || loading}
          >
            {triggerText}
          </Button>
        )}
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>

          {description ? (
            <AlertDialogDescription>
              {description}
            </AlertDialogDescription>
          ) : null}
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>
            {cancelText}
          </AlertDialogCancel>

          <Button
            type="button"
            variant={confirmVariant}
            onClick={handleConfirm}
            disabled={disabled || loading}
          >
            {loading ? "Working..." : confirmText}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}