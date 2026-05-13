"use client";

import { Controller, UseFormReturn, useWatch } from "react-hook-form";
import { FaTiktok } from "react-icons/fa";

import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { CreatePostFormValues } from "@/validation/validation";
import useGetTikTokInfo from "@/hooks/useGetTikTokInfo";

type Props = {
  form: UseFormReturn<CreatePostFormValues>;
};

function formatPrivacyLabel(value: string) {
  switch (value) {
    case "PUBLIC_TO_EVERYONE":
      return "Public";
    case "FOLLOWER_OF_CREATOR":
      return "Followers";
    case "MUTUAL_FOLLOW_FRIENDS":
      return "Friends";
    case "SELF_ONLY":
      return "Only me";
    default:
      return value.replaceAll("_", " ");
  }
}

export default function PostTikTokSettingsSection({ form }: Props) {
  const { control } = form;

  const { data, isLoading, isError } = useGetTikTokInfo();

  const tiktokInfo = data?.data;

  const tiktokSelected = useWatch({
    control,
    name: "targets.tiktok",
    defaultValue: false,
  });

  const mediaKind = useWatch({
    control,
    name: "media.kind",
    defaultValue: "images",
  });

  if (!tiktokSelected || mediaKind !== "video") return null;
  
  return (
    <Card className="rounded-3xl border bg-white shadow-sm">
      <CardContent className="space-y-5 p-5 md:p-6">
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <FaTiktok className="h-4 w-4 text-black" />
          TikTok Settings
        </div>

        {isLoading && (
          <div className="rounded-2xl bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
            Loading TikTok creator info...
          </div>
        )}

        {isError && (
          <div className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600">
            Failed to load TikTok creator info. Please reconnect your TikTok
            account.
          </div>
        )}

        {tiktokInfo && (
          <div className="flex items-center gap-3 rounded-2xl border p-4">
            <img
              src={tiktokInfo.creator_avatar_url}
              alt="TikTok avatar"
              className="h-10 w-10 rounded-full object-cover"
            />

            <div className="min-w-0">
              <p className="truncate text-sm font-medium">
                {tiktokInfo.creator_nickname}
              </p>

              <p className="truncate text-xs text-muted-foreground">
                @{tiktokInfo.creator_username}
              </p>
            </div>
          </div>
        )}

        <div className="space-y-2">
          <p className="text-sm font-medium">Privacy status</p>

          <Controller
            control={control}
            name="tiktokSettings.privacyStatus"
            render={({ field, fieldState }) => (
              <div className="space-y-1">
                <Select
                  value={field.value || ""}
                  onValueChange={field.onChange}
                  disabled={
                    isLoading ||
                    isError ||
                    !tiktokInfo?.privacy_level_options?.length
                  }
                >
                  <SelectTrigger className="h-11 rounded-xl">
                    <SelectValue placeholder="Select privacy status" />
                  </SelectTrigger>

                  <SelectContent>
                    {tiktokInfo?.privacy_level_options?.map((option) => (
                      <SelectItem key={option} value={option}>
                        {formatPrivacyLabel(option)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {fieldState.error && (
                  <p className="text-sm text-red-600">
                    {fieldState.error.message}
                  </p>
                )}
              </div>
            )}
          />

          <p className="text-xs text-muted-foreground">
            Please select the privacy status manually before publishing.
          </p>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-medium">Interaction settings</p>

          <Controller
            control={control}
            name="tiktokSettings.allowComments"
            render={({ field }) => (
              <label className="flex items-center gap-3 rounded-2xl border p-4">
                <Checkbox
                  checked={!!field.value}
                  disabled={!!tiktokInfo?.comment_disabled}
                  onCheckedChange={(value) => field.onChange(Boolean(value))}
                />

                <div className="space-y-0.5">
                  <span className="text-sm">Allow comments</span>

                  {tiktokInfo?.comment_disabled && (
                    <p className="text-xs text-muted-foreground">
                      Disabled in your TikTok app settings.
                    </p>
                  )}
                </div>
              </label>
            )}
          />

          <Controller
            control={control}
            name="tiktokSettings.allowDuet"
            render={({ field }) => (
              <label className="flex items-center gap-3 rounded-2xl border p-4">
                <Checkbox
                  checked={!!field.value}
                  disabled={!!tiktokInfo?.duet_disabled}
                  onCheckedChange={(value) => field.onChange(Boolean(value))}
                />

                <div className="space-y-0.5">
                  <span className="text-sm">Allow duet</span>

                  {tiktokInfo?.duet_disabled && (
                    <p className="text-xs text-muted-foreground">
                      Disabled in your TikTok app settings.
                    </p>
                  )}
                </div>
              </label>
            )}
          />

          <Controller
            control={control}
            name="tiktokSettings.allowStitch"
            render={({ field }) => (
              <label className="flex items-center gap-3 rounded-2xl border p-4">
                <Checkbox
                  checked={!!field.value}
                  disabled={!!tiktokInfo?.stitch_disabled}
                  onCheckedChange={(value) => field.onChange(Boolean(value))}
                />

                <div className="space-y-0.5">
                  <span className="text-sm">Allow stitch</span>

                  {tiktokInfo?.stitch_disabled && (
                    <p className="text-xs text-muted-foreground">
                      Disabled in your TikTok app settings.
                    </p>
                  )}
                </div>
              </label>
            )}
          />
        </div>

        {tiktokInfo?.max_video_post_duration_sec && (
          <div className="rounded-2xl bg-muted/40 px-4 py-3 text-xs text-muted-foreground">
            Maximum TikTok video duration for this account is{" "}
            {Math.floor(tiktokInfo.max_video_post_duration_sec / 60)} minutes.
          </div>
        )}

        <div className="rounded-2xl bg-muted/40 px-4 py-3 text-xs text-muted-foreground">
          By posting, you agree to TikTok&apos;s Music Usage Confirmation.
        </div>
      </CardContent>
    </Card>
  );
}