import z from "zod";

/**
 * =========================
 * Auth / Login Validation
 * =========================
 * These schemas validate user input on the client/server side
 * before sending data to the API.
 */


export const loginSchema = z.object({
  /**
   * User email address.
   * Note: In Zod, the common pattern is `z.string().email()`
   * (instead of `z.email()`), depending on your Zod version.
   */
  email: z.email("Invalid email address"),

  /**
   * Password string validated against the project's password policy.
   */
  password: z.string().min(6, "Password must be at least 6 characters long")
});

export type LoginType = z.infer<typeof loginSchema>;

/**
 * =========================
 * User Creation Validation
 * =========================
 * Used when creating/updating a user.
 */
export const userSchema = z.object({
  /**
   * Username constraints:
   * - Minimum 3 characters
   * - Maximum 20 characters
   */
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be at most 20 characters"),

  /**
   * User email address.
   */
  email: z.email("Invalid email address"),

  /**
   * Role-based access control values supported by the app.
   */
  role: z.enum(["owner", "user"]),

  /**
   * Password validated with the same policy used in login.
   */
  password: z.string().min(6, "Password must be at least 6 characters long")
});

export type User = z.infer<typeof userSchema>;

/**
 * =========================
 * Post Creation Validation
 * =========================
 * The post form supports either:
 * - Multiple images (min 1)
 * - A single video
 *
 * We use a discriminated union so Zod can narrow the type
 * based on the `kind` field.
 */
const MediaInputSchema = z.discriminatedUnion("kind", [
  z.object({
    /**
     * "images" mode: user must provide at least one image file.
     */
    kind: z.literal("images"),
    images: z.array(z.instanceof(File)).min(1, "At least one image is required."),
  }),
  z.object({
    /**
     * "video" mode: user can provide a video file.
     * We allow `null`/optional here because the UI might set it later,
     * and we enforce the real requirement in `superRefine`.
     */
    kind: z.literal("video"),
    video: z.union([z.instanceof(File), z.null()]).optional(),
  }),
]);

/**
 * Normalizes a tag coming from input:
 * - trims whitespace
 * - removes leading "#" if present
 * - returns "" for empty input
 *
 * Examples:
 * "  #Test " -> "Test"
 * "hello" -> "hello"
 * "   " -> ""
 */
const normalizeTag = (s: string) => {
  const t = s.trim();
  if (!t) return "";
  return t.startsWith("#") ? t.slice(1) : t;
};

export const CreatePostFormSchema = z
  .object({
    /**
     * Form action:
     * - draft: save without publishing
     * - publish: publish immediately
     */
    action: z.enum(["draft", "publish"]),

    /**
     * Caption is mandatory and trimmed.
     * If you want drafts without caption later, this can be relaxed.
     */
    caption: z.string().trim().min(1, "Caption is required."),

    /**
     * Final hashtags list used by the form.
     * Each tag is trimmed and must not be empty.
     */
    hashtags: z.array(z.string().trim().min(1, "Hashtag cannot be empty")),

    /**
     * Draft input field for hashtag typing (before adding to `hashtags` array).
     * - transform: normalize by trimming and removing leading "#"
     * - refine: allow empty string OR valid hashtag characters
     *
     * Regex explanation:
     * - \p{L} letters in any language
     * - \p{N} numbers in any language
     * - "_" underscore
     */
    hashtagDraft: z
      .string()
      .transform(normalizeTag)
      .refine((v) => v === "" || /^[\p{L}\p{N}_]+$/u.test(v), {
        message: "Hashtag can only contain letters, numbers, or underscores.",
      }),

    /**
     * Publishing targets (social platforms).
     */
    targets: z.object({
      facebook: z.boolean(),
      instagram: z.boolean(),
      tiktok: z.boolean(),
      youtube: z.boolean(),
    }),

    /**
     * Media input: either images or video.
     */
    media: MediaInputSchema,
  })
  .superRefine((val, ctx) => {
    /**
     * Cross-field validations live here because they depend on multiple fields.
     */

    const hasTarget =
      val.targets.facebook ||
      val.targets.instagram ||
      val.targets.tiktok ||
      val.targets.youtube;

    /**
     * Only require at least one platform when the user is publishing.
     * Drafts can be saved without selecting any platform.
     */
    if (val.action === "publish" && !hasTarget) {
      ctx.addIssue({
        code: "custom",
        path: ["targets"],
        message: "Select at least one platform",
      });
    }

    /**
     * Defensive check: images mode should always have at least 1 file.
     */
    if (val.media.kind === "images" && val.media.images.length === 0) {
      ctx.addIssue({
        code: "custom",
        path: ["media", "images"],
        message: "You must upload at least one image.",
      });
    }

    /**
     * TikTok requires video content.
     * If user selects TikTok but provides images, block submission.
     */
    if (val.media.kind === "images" && val.targets.tiktok) {
      ctx.addIssue({
        code: "custom",
        path: ["targets", "tiktok"],
        message: "TikTok requires a video. It cannot be used with images",
      });
    }

    /**
     * YouTube requires video content.
     * If user selects YouTube but provides images, block submission.
     */
    if (val.media.kind === "images" && val.targets.youtube) {
      ctx.addIssue({
        code: "custom",
        path: ["targets", "youtube"],
        message: "YouTube requires a video. It cannot be used with images",
      });
    }

    /**
     * If media is video, ensure a video file was actually selected.
     * (We allowed null/optional earlier to accommodate UI state.)
     */
    if (val.media.kind === "video" && !val.media.video) {
      ctx.addIssue({
        code: "custom",
        path: ["media", "video"],
        message: "Please select a video",
      });
    }
  });

/**
 * Input type:
 * - Uses the input shape BEFORE transforms
 * - Useful for form libraries like React Hook Form
 */
export type CreatePostFormValues = z.input<typeof CreatePostFormSchema>;