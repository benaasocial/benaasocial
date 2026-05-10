"use client";

import { Controller, UseFormReturn, useWatch } from "react-hook-form";
import { Hash, Sparkles, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

import { CreatePostFormValues } from "@/validation/validation";
import { normalizeTag } from "../_lib/create-post.helpers";

type Props = {
  form: UseFormReturn<CreatePostFormValues>;
};

/**
 * Post content section
 */
export default function PostContentSection({ form }: Props) {
  const {
    control,
    getValues,
    setValue,
    trigger,
    setError,
    clearErrors,
  } = form;

  /**
   * Watch hashtags list
   */
  const hashtags = useWatch({
    control,
    name: "hashtags",
    defaultValue: [],
  });

  /**
   * Add hashtag from input draft
   */
  async function addTagFromDraft() {
    const ok = await trigger("hashtagDraft");
    if (!ok) return;

    const draft = getValues("hashtagDraft");
    const tag = normalizeTag(draft);

    // ignore empty tag
    if (!tag) return;

    const current = getValues("hashtags") || [];

    // prevent duplicate hashtags
    if (current.includes(tag)) {
      setError("hashtagDraft", {
        type: "manual",
        message: "This hashtag is already added.",
      });
      return;
    }

    const next = [...current, tag];

    // update hashtags list
    setValue("hashtags", next, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });

    // clear draft input after adding
    setValue("hashtagDraft", "", {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });

    clearErrors("hashtagDraft");
  }

  /**
   * Remove hashtag by index
   */
  function removeTagAt(index: number) {
    const current = getValues("hashtags") || [];
    const next = current.filter((_, i) => i !== index);

    setValue("hashtags", next, {
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
          Compose your post
        </div>

        {/* Caption field */}
        <Controller
          control={control}
          name="caption"
          render={({ field, fieldState }) => (
            <div className="space-y-2">
              <Textarea
                {...field}
                placeholder="What would you like to share today?"
                className="min-h-40 resize-none rounded-2xl border-0 bg-muted/40 px-4 py-3 text-sm shadow-none focus-visible:ring-1"
              />
              {fieldState.error && (
                <p className="text-sm text-red-600">{fieldState.error.message}</p>
              )}
            </div>
          )}
        />

        {/* Hashtags section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Hash className="h-4 w-4 text-muted-foreground" />
            Hashtags
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <Controller
              control={control}
              name="hashtagDraft"
              render={({ field, fieldState }) => (
                <div className="flex-1 space-y-1">
                  <Input
                    {...field}
                    placeholder="Add hashtag"
                    className="h-11 rounded-xl"

                    // add tag on Enter
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addTagFromDraft();
                      }
                    }}
                  />
                  {fieldState.error && (
                    <p className="text-sm text-red-600">{fieldState.error.message}</p>
                  )}
                </div>
              )}
            />

            {/* Add hashtag button */}
            <Button
              type="button"
              variant="secondary"
              className="h-11 rounded-xl px-5"
              onClick={addTagFromDraft}
            >
              Add tag
            </Button>
          </div>

          {/* Added hashtags list */}
          {hashtags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {hashtags.map((tag, index) => (
                <div
                  key={`${tag}-${index}`}
                  className="inline-flex items-center rounded-full border bg-muted px-3 py-1 text-xs font-medium text-foreground"
                >
                  <span>#{tag}</span>

                  {/* Remove single hashtag */}
                  <button
                    type="button"
                    className="ml-2 rounded-full p-0.5 hover:bg-black/10"
                    onClick={() => removeTagAt(index)}
                    aria-label="Remove tag"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}