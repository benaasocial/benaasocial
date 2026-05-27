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
    action: z.enum(["draft", "publish"]),

    caption: z.string().trim().min(1, "Caption is required."),

    hashtags: z.array(z.string().trim().min(1, "Hashtag cannot be empty")),

    hashtagDraft: z
      .string()
      .transform(normalizeTag)
      .refine((v) => v === "" || /^[\p{L}\p{N}_]+$/u.test(v), {
        message: "Hashtag can only contain letters, numbers, or underscores.",
      }),

    targets: z.object({
      facebook: z.boolean(),
      instagram: z.boolean(),
      tiktok: z.boolean(),
      youtube: z.boolean(),
    }),

    /**
     * TikTok Direct Post settings.
     * Required only when publishing to TikTok.
     */
    tiktokSettings: z.object({
      privacyStatus: z
        .enum([
          "PUBLIC_TO_EVERYONE",
          "FOLLOWER_OF_CREATOR",
          "MUTUAL_FOLLOW_FRIENDS",
          "SELF_ONLY",
        ])
        .or(z.literal("")),

      allowComments: z.boolean(),

      allowDuet: z.boolean(),

      allowStitch: z.boolean(),
    }),

    media: MediaInputSchema,
  })
  .superRefine((val, ctx) => {
    const hasTarget =
      val.targets.facebook ||
      val.targets.instagram ||
      val.targets.tiktok ||
      val.targets.youtube;

    if (val.action === "publish" && !hasTarget) {
      ctx.addIssue({
        code: "custom",
        path: ["targets"],
        message: "Select at least one platform",
      });
    }

    if (val.media.kind === "images" && val.media.images.length === 0) {
      ctx.addIssue({
        code: "custom",
        path: ["media", "images"],
        message: "You must upload at least one image.",
      });
    }

    if (val.media.kind === "images" && val.targets.tiktok) {
      ctx.addIssue({
        code: "custom",
        path: ["targets", "tiktok"],
        message: "TikTok requires a video. It cannot be used with images",
      });
    }

    if (val.media.kind === "images" && val.targets.youtube) {
      ctx.addIssue({
        code: "custom",
        path: ["targets", "youtube"],
        message: "YouTube requires a video. It cannot be used with images",
      });
    }

    if (val.media.kind === "video" && !val.media.video) {
      ctx.addIssue({
        code: "custom",
        path: ["media", "video"],
        message: "Please select a video",
      });
    }

    /**
     * TikTok requires manual privacy selection before publishing.
     */
    if (
      val.action === "publish" &&
      val.targets.tiktok &&
      !val.tiktokSettings.privacyStatus
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["tiktok", "privacyStatus"],
        message: "Please select TikTok privacy status.",
      });
    }
  });

/**
 * Input type:
 * - Uses the input shape BEFORE transforms
 * - Useful for form libraries like React Hook Form
 */
export type CreatePostFormValues = z.input<typeof CreatePostFormSchema>;