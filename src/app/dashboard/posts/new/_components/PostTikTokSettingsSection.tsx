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

type Props = {
    form: UseFormReturn<CreatePostFormValues>;
};

export default function PostTikTokSettingsSection({ form }: Props) {
    const { control } = form;

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

                <div className="space-y-2">
                    <p className="text-sm font-medium">Privacy status</p>

                    <Controller
                        control={control}
                        name="tiktokSettings.privacyStatus"
                        render={({ field, fieldState }) => (
                            <div className="space-y-1">
                                <Select value={field.value || ""} onValueChange={field.onChange}>
                                    <SelectTrigger className="h-11 rounded-xl">
                                        <SelectValue placeholder="Select privacy status" />
                                    </SelectTrigger>

                                    <SelectContent>
                                        <SelectItem value="PUBLIC_TO_EVERYONE">Public</SelectItem>
                                        <SelectItem value="MUTUAL_FOLLOW_FRIENDS">Friends</SelectItem>
                                        <SelectItem value="SELF_ONLY">Only me</SelectItem>
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
                                    onCheckedChange={(value) => field.onChange(Boolean(value))}
                                />
                                <span className="text-sm">Allow comments</span>
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
                                    onCheckedChange={(value) => field.onChange(Boolean(value))}
                                />
                                <span className="text-sm">Allow duet</span>
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
                                    onCheckedChange={(value) => field.onChange(Boolean(value))}
                                />
                                <span className="text-sm">Allow stitch</span>
                            </label>
                        )}
                    />
                </div>

                <div className="rounded-2xl bg-muted/40 px-4 py-3 text-xs text-muted-foreground">
                    By posting, you agree to TikTok&apos;s Music Usage Confirmation.
                </div>
            </CardContent>
        </Card>
    );
}