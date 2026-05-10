import { CreatePostFormValues } from "@/validation/validation";

/**
 * Normalize hashtag input (remove # if exists)
 */
export function normalizeTag(value: string) {
  const trimmed = value.trim();

  // return empty if no value
  if (!trimmed) return "";

  // remove leading # if present
  return trimmed.startsWith("#") ? trimmed.slice(1) : trimmed;
}



/**
 * Check if at least one platform is selected
 */
export function hasAnySelectedTarget(values: CreatePostFormValues) {
  return (
    !!values.targets.facebook ||
    !!values.targets.instagram ||
    !!values.targets.tiktok ||
    !!values.targets.youtube
  );
}