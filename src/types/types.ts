import { CreatePostFormValues } from "@/validation/validation";
import { ReactNode } from "react";
import { UseFormReturn } from "react-hook-form";




export type ApiOk<T> = {
  ok: true;
  status: number;
  requestId?: string;
  message?: string;
  data: T;
};

export type NavListType = {
  items: NavItem[];
  pathname: string;
  expanded: boolean;
  onNavigate?: () => void;
}


export type NavItem = {
  href: string;
  label: string;
  icon: React.ElementType;
  roles: Array<"owner" | "user">;
};


export type LoginForm = {
  email: string;
  password: string;
};


export type User = {
  _id: string;
  username: string;
  email: string;
  role: "owner" | "user";
  createdAt: string;
  updatedAt: string;
};


export type UsersResponse = {
  items: User[];
  meta: {
    page: number;
    limit: number;
    total: number;
  }
};



export type UploadedImage = {
  kind: "image";
  url: string;
  publicId: string;
  width?: number;
  height?: number;
  format?: string;
  bytes?: number;
};

export type UploadedVideo = {
  kind: "video";
  url: string;
  publicId: string;
  duration?: number;
  format?: string;
  bytes?: number;
};

export type Targets = { facebook: boolean; instagram: boolean; tiktok: boolean };

export type ImagesMedia = { kind: "images"; images: UploadedImage[] };
export type VideoMedia = { kind: "video"; video: UploadedVideo };


export type TikTokPrivacy =
  | "PUBLIC_TO_EVERYONE"
  | "MUTUAL_FOLLOW_FRIENDS"
  | "SELF_ONLY";


export type TikTokSettings = {
  privacyStatus: TikTokPrivacy;
  allowComments: boolean;
  allowDuet: boolean;
  allowStitch: boolean;
};

export type YoutubePrivacyStatus = "private" | "public" | "unlisted";
export type YoutubeSettings = {
  title?: string;
  description?: string;
  privacyStatus?: YoutubePrivacyStatus;
};


export type CreatePostPayload =
  | {
    action: "draft" | "publish";
    caption: string;
    hashtags: string[];
    targets: Targets;
    media: ImagesMedia;
  }
  | {
    action: "draft" | "publish";
    caption: string;
    hashtags: string[];
    targets: Targets;
    media: VideoMedia;
    tiktokSettings?: {
      privacyStatus: "PUBLIC_TO_EVERYONE" | "MUTUAL_FOLLOW_FRIENDS" | "SELF_ONLY" | "";
      allowComments: boolean;
      allowDuet: boolean;
      allowStitch: boolean;
    };
  };


export type MediaKind = "images" | "video";

export type ConnectionStatus = {
  metaConnected: boolean;
  tiktokConnected: boolean;
  youtubeConnected: boolean;
};



export const SUPPORTED_PLATFORMS = [
  "facebook",
  "instagram",
  "tiktok",
  "youtube",
] as const;

export type Platform = (typeof SUPPORTED_PLATFORMS)[number];

export type PlatformBadgesProps = {
  targets?: Partial<Record<Platform, boolean>>;
};

export type PlatformState = {
  connected: boolean;
  active: boolean;
  accountName?: string;
  accountExternalId?: string;
};


export type Status = {
  connections: Record<Platform, PlatformState>;
};

export type MetaPage = { id: string; name: string };

export type MetaPagesResponse = ApiOk<{ pages: MetaPage[] }>;
export type MetaSelectPageResponse = ApiOk<{ connected: true }>;

export type ImagesError = { images: { message: string; type: string } };
export type VideoError = { video: { message: string; type: string } };






export type PublishResultStatus =
  | "idle"
  | "processing"
  | "failed"
  | "published"
  | null;

export type TikTokRawStatus = {
  status?: string;
  fail_reason?: string;

  error?: {
    code?: string;
    message?: string;
  };

  message?: string;
  status_message?: string;

  [key: string]: unknown;
};

export type PublishResult = {
  status: PublishResultStatus;
  externalId: string | null;
  error: string | null;
  publishedAt: string | null;
  rawStatus?: TikTokRawStatus;
};

export type Post = {
  action: string;
  caption: string;
  createdAt: string;
  hashtags: string[];
  media: ImagesMedia | VideoMedia;

  publishResults: {
    facebook: PublishResult;
    instagram: PublishResult;
    tiktok: PublishResult;
    youtube: PublishResult;
  };

  status: PostStatus;

  targets: {
    facebook: boolean;
    instagram: boolean;
    tiktok: boolean;
    youtube: boolean;
  };

  updatedAt: string;

  user: {
    _id: string;
    username: string;
  };

  _id: string;
};






export type PostsResponse = {
  items: Post[]
  meta: {
    page: number
    limit: number
    total: number
  }
}


export type CreatePostResponse = {
  meta: {
    failedPlatforms: Platform[];
    publishedPlatforms: Platform[];
    idlePlatforms?: Platform[];
  };
  post: Post;
};

export type RetryPlatform = {
  failedPlatforms: Platform[];
  publishedPlatforms: Platform[];
  idlePlatforms?: Platform[];
};

export type PostTargets = {
  facebook: boolean;
  instagram: boolean;
  tiktok: boolean;
  youtube: boolean;
};

export type PostPublishResults = {
  facebook: PublishResult;
  instagram: PublishResult;
  tiktok: PublishResult;
  youtube: PublishResult;
};

export type RetryPostResponse = {
  meta: RetryPlatform;
  post: Post;
};



export type PlatformResultStatus = "idle" | "failed" | "published";
export type PostStatus =
  | "draft"
  | "queued"
  | "publishing"
  | "published"
  | "partial"
  | "failed";


export type PostTargetsSectionProps = {
  form: UseFormReturn<CreatePostFormValues>;
  conn: ConnectionStatus;
  isSubmitting: boolean;
  onPublish: () => void;
  onSaveDraft: () => void;
};

export type PlatformRowProps = {
  label: string;
  checked: boolean;
  disabled?: boolean;
  connected: boolean;
  connectedLabel?: string;
  disconnectedLabel?: string;
  hint?: string;
  icon?: ReactNode;
  onChange: (value: boolean) => void;
};


export type UsersTableProps = {
  users?: UsersResponse;
};

export type PostTableProps = {
  posts?: PostsResponse;
}


export type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};




export type TikTokCreatorInfo = {
  creator_avatar_url: string;
  creator_nickname: string;
  creator_username: string;

  duet_disabled: boolean;
  stitch_disabled: boolean;
  comment_disabled: boolean;

  max_video_post_duration_sec: number;

  privacy_level_options: (
    | "PUBLIC_TO_EVERYONE"
    | "FOLLOWER_OF_CREATOR"
    | "MUTUAL_FOLLOW_FRIENDS"
    | "SELF_ONLY"
  )[];
};









type RetryMutation = {
  isPending: boolean;

  variables?: {
    id: string;
    platform?: Platform;
    tiktokSettings?: TikTokSettings;
  };

  mutate: (input: {
    id: string;
    platform?: Platform;
    tiktokSettings?: TikTokSettings;
  }) => void;
};

type DeletePostMutation = {
  isPending: boolean;

  variables?: {
    id: string;
  };

  mutateAsync: (input: {
    id: string;
  }) => Promise<string>;
};

export type PostTableRowProps = {
  post: Post;

  retry: RetryMutation;

  busyId?: string;

  deletePostMutation: DeletePostMutation;

  doRetry: (
    id: string,
    platform?: Platform
  ) => void;

  openDetails: (
    postId: string,
    platform: Platform,
    error: string | null
  ) => void;

  handlePlatformRetry: (
    postId: string,
    platform: Platform
  ) => void;
};


export type PlatformResultRowProps = {
  post: Post;

  platform: Platform;

  isBusy: boolean;

  canRetry: boolean;

  onRetry: () => void;

  onViewDetails: () => void;
};