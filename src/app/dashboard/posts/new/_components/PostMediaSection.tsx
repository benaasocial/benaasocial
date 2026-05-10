"use client";

import * as React from "react";
import { Controller, UseFormReturn, useWatch } from "react-hook-form";
import {
  Trash2,
  Upload,
  X,
  Image as ImageIcon,
  Video,
  Sparkles,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

import { CreatePostFormValues } from "@/validation/validation";
import { ImagesError, MediaKind, VideoError } from "@/types/types";

/**
 * Create preview URLs for image files
 */
function useObjectUrls(files: File[]) {
  const [urls, setUrls] = React.useState<string[]>([]);

  React.useEffect(() => {
    const next = files.map((file) => URL.createObjectURL(file));
    setUrls(next);

    // cleanup old object URLs
    return () => next.forEach((url) => URL.revokeObjectURL(url));
  }, [files]);

  return urls;
}

/**
 * Create preview URL for one video file
 */
function useObjectUrl(file: File | null) {
  const [url, setUrl] = React.useState("");

  React.useEffect(() => {
    if (!file) {
      setUrl("");
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setUrl(objectUrl);

    // cleanup object URL on change / unmount
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  return url;
}

type Props = {
  form: UseFormReturn<CreatePostFormValues>;
};

/**
 * Media upload section
 */
export default function PostMediaSection({ form }: Props) {
  const {
    control,
    setValue,
    formState: { errors },
  } = form;

  /**
   * Watch selected images
   */
  const images = useWatch({
    control,
    name: "media.images",
    defaultValue: [],
  });

  /**
   * Watch selected video
   */
  const video = useWatch({
    control,
    name: "media.video",
    defaultValue: null,
  }) ?? null;

  // preview URLs
  const imagePreviews = useObjectUrls(images);
  const videoPreview = useObjectUrl(video);

  // media validation errors
  const imagesError = (errors.media as ImagesError)?.images?.message;
  const videoError = (errors.media as VideoError)?.video?.message;

  /**
   * Add picked images to form state
   */
  function onPickImages(files: FileList | null) {
    if (!files) return;

    const picked = Array.from(files);
    setValue("media.images", [...images, ...picked], {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  }

  /**
   * Remove one image by index
   */
  function removeImageAt(index: number) {
    const next = images.filter((_, i) => i !== index);
    setValue("media.images", next, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  }

  /**
   * Remove all selected images
   */
  function clearImages() {
    setValue("media.images", [], {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  }

  /**
   * Set selected video
   */
  function onPickVideo(file: File | null) {
    setValue("media.video", file, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  }

  /**
   * Remove selected video
   */
  function clearVideo() {
    setValue("media.video", null, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  }

  return (
    <Card className="rounded-3xl border bg-white shadow-sm">
      <CardContent className="space-y-5 p-5 md:p-6">

        {/* Section title */}
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <Sparkles className="h-4 w-4" />
          Add your media
        </div>

        <Controller
          control={control}
          name="media.kind"
          render={({ field }) => (
            <Tabs
              value={field.value}
              onValueChange={(value) => field.onChange(value as MediaKind)}
              className="space-y-4"
            >
              {/* Media type tabs */}
              <TabsList className="grid h-12 w-full grid-cols-2 rounded-2xl bg-muted p-1">
                <TabsTrigger
                  value="images"
                  className="flex items-center gap-2 rounded-xl text-sm"
                >
                  <ImageIcon className="h-4 w-4" />
                  Images
                </TabsTrigger>

                <TabsTrigger
                  value="video"
                  className="flex items-center gap-2 rounded-xl text-sm"
                >
                  <Video className="h-4 w-4" />
                  Video
                </TabsTrigger>
              </TabsList>

              {/* Images tab */}
              <TabsContent value="images" className="space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium">Images</p>
                    <p className="text-xs text-muted-foreground">
                      Upload one or more images for your post.
                    </p>
                  </div>

                  <Button
                    type="button"
                    variant="ghost"
                    className="rounded-xl"
                    onClick={clearImages}
                    disabled={images.length === 0}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Clear
                  </Button>
                </div>

                {/* Images upload area */}
                <label className="block cursor-pointer rounded-2xl border border-dashed bg-muted/30 p-6 transition hover:bg-muted/50">
                  <div className="flex flex-col items-center justify-center gap-3 text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm">
                      <Upload className="h-5 w-5" />
                    </div>

                    <div className="space-y-1">
                      <p className="text-sm font-medium">Upload images</p>
                      <p className="text-xs text-muted-foreground">
                        Click here to choose images from your device
                      </p>
                    </div>
                  </div>

                  <input
                    className="hidden"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => onPickImages(e.target.files)}
                  />
                </label>

                {/* Images validation error */}
                {imagesError && (
                  <p className="text-sm text-red-600">{imagesError}</p>
                )}

                {/* Images preview grid */}
                {imagePreviews.length > 0 && (
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                    {imagePreviews.map((url, index) => (
                      <div
                        key={`${url}-${index}`}
                        className="group relative overflow-hidden rounded-2xl border bg-muted"
                      >
                        <img
                          src={url}
                          alt="preview"
                          className="h-28 w-full object-cover"
                        />

                        {/* Remove one image */}
                        <button
                          type="button"
                          className="absolute right-2 top-2 rounded-full bg-white/95 p-1.5 shadow-sm transition hover:bg-white"
                          onClick={() => removeImageAt(index)}
                          aria-label="Remove image"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Small helper note */}
                <div className="rounded-2xl bg-muted/40 px-4 py-3 text-xs text-muted-foreground">
                  TikTok and YouTube require video media, so they will be disabled
                  when images are selected.
                </div>
              </TabsContent>

              {/* Video tab */}
              <TabsContent value="video" className="space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium">Video</p>
                    <p className="text-xs text-muted-foreground">
                      Upload a single video for TikTok, YouTube, or other
                      supported platforms.
                    </p>
                  </div>

                  <Button
                    type="button"
                    variant="ghost"
                    className="rounded-xl"
                    onClick={clearVideo}
                    disabled={!video}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Clear
                  </Button>
                </div>

                {/* Video upload area */}
                <label className="block cursor-pointer rounded-2xl border border-dashed bg-muted/30 p-6 transition hover:bg-muted/50">
                  <div className="flex flex-col items-center justify-center gap-3 text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm">
                      <Upload className="h-5 w-5" />
                    </div>

                    <div className="space-y-1">
                      <p className="text-sm font-medium">Upload video</p>
                      <p className="text-xs text-muted-foreground">
                        Click here to choose a video from your device
                      </p>
                    </div>
                  </div>

                  <input
                    className="hidden"
                    type="file"
                    accept="video/*"
                    onChange={(e) => onPickVideo(e.target.files?.[0] ?? null)}
                  />
                </label>

                {/* Video validation error */}
                {videoError && (
                  <p className="text-sm text-red-600">{videoError}</p>
                )}

                {/* Video preview */}
                {videoPreview && (
                  <div className="overflow-hidden rounded-2xl border bg-black">
                    <video controls className="max-h-105 w-full object-contain">
                      <source src={videoPreview} />
                    </video>
                  </div>
                )}

                {/* Small helper note */}
                <div className="rounded-2xl bg-muted/40 px-4 py-3 text-xs text-muted-foreground">
                  Video uploads unlock TikTok and YouTube settings automatically.
                </div>
              </TabsContent>
            </Tabs>
          )}
        />
      </CardContent>
    </Card>
  );
}