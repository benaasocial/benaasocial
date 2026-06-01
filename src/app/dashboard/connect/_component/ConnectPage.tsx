"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  useStatus,
  useSetPlatformActive,
  useMetaStartUrl,
  useTikTokStartUrl,
  useGetPages,
  useSelectMetaPage,
  useYouTubeStartUrl,
  useYouTubeChannel,
} from "@/hooks/usePlatforms";
import { Platform, PlatformState } from "@/types/types";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import PlatformIcon from "@/components/posts/PlatformIcons/PlatformIcons";

/**
 * Platform row used for:
 * - Facebook
 * - Instagram
 * - TikTok
 * - YouTube
 *
 * The full row is clickable, but the checkbox still handles
 * the actual toggle action.
 */
function Row({
  platform,
  state,
  onToggle,
  disabled,
}: {
  platform: Platform;
  state: PlatformState;
  onToggle: (next: boolean) => void;
  disabled?: boolean;
}) {
  const title =
    platform === "facebook"
      ? "Facebook"
      : platform === "instagram"
        ? "Instagram"
        : platform === "tiktok"
          ? "TikTok"
          : platform === "youtube"
            ? "YouTube"
            : "X";

  /**
   * Used to trigger checkbox click when the user clicks the row.
   */
  const checkboxRef =
    React.useRef<HTMLButtonElement | null>(null);

  return (
    <div
      role="button"
      tabIndex={0}
      aria-disabled={disabled}
      onClick={() => {
        if (disabled) return;
        checkboxRef.current?.click();
      }}
      onKeyDown={(e) => {
        if (disabled) return;

        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          checkboxRef.current?.click();
        }
      }}
      className="
        w-full cursor-pointer rounded-lg border p-4 text-left transition
        hover:bg-muted/50
        disabled:opacity-50
      "
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-start gap-3 sm:items-center sm:gap-4">
          <div
            onClick={(e) => e.stopPropagation()}
            className="shrink-0 pt-0.5 sm:pt-0"
          >
            <Checkbox
              ref={checkboxRef}
              checked={state.active}
              disabled={disabled}
              onCheckedChange={(v) =>
                onToggle(v === true)
              }
            />
          </div>

          <div className="shrink-0">
            <PlatformIcon platform={platform} />
          </div>

          <div className="min-w-0">
            <div className="truncate font-medium">
              {title}
            </div>

            <div className="break-words text-xs text-muted-foreground">
              {state.connected ? (
                <>
                  Connected:{" "}
                  <span className="break-all font-medium text-foreground">
                    {state.accountName ?? ""}
                  </span>
                </>
              ) : (
                "Not connected"
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:justify-end">
          {!state.connected && (
            <Badge
              variant="outline"
              onClick={(e) => {
                e.stopPropagation();
                onToggle(true);
              }}
              className="cursor-pointer"
            >
              Connect
            </Badge>
          )}

          <Badge
            variant={
              state.connected ? "default" : "secondary"
            }
            className="whitespace-nowrap"
          >
            {state.connected
              ? "Connected"
              : "Not connected"}
          </Badge>
        </div>
      </div>
    </div>
  );
}

/**
 * Fallback platform state used while status data is loading
 * or if backend does not return a connection for a platform.
 */
const EMPTY_STATE: PlatformState = {
  connected: false,
  active: false,
  accountName: "",
};

/**
 * Main connect page.
 *
 * Responsibilities:
 * - Display all supported platforms
 * - Start OAuth connect flow
 * - Activate/deactivate connected platforms
 * - Handle Meta page selection after OAuth callback
 * - Handle YouTube channel connection after OAuth callback
 */
export default function ConnectPage({
  state,
  platform,
}: {
  state?: string;
  platform?: string;
}) {
  /**
   * Current connection status for all platforms.
   */
  const { data: status, isLoading } = useStatus();

  /**
   * Platform mutations / OAuth starters.
   */
  const setActive = useSetPlatformActive();
  const startMeta = useMetaStartUrl();
  const startTiktok = useTikTokStartUrl();
  const startYouTube = useYouTubeStartUrl();
  const getYouTubeChannel = useYouTubeChannel();

  /**
   * Prevent handling the same OAuth callback twice.
   *
   * React Strict Mode may run effects twice in development,
   * so this protects against duplicate requests.
   */
  const handledOAuthRef =
    React.useRef<string | null>(null);

  /**
   * Shared loading state for row interactions.
   */
  const [busy, setBusy] = React.useState(false);

  /**
   * Controls Meta page picker dialog.
   */
  const [open, setOpen] = React.useState(false);

  const router = useRouter();

  /**
   * Load Meta pages only after Meta OAuth callback.
   *
   * The backend redirects with:
   * /dashboard/connect?state=xxx&platform=meta
   */
  const pagesQuery = useGetPages(
    platform === "meta" ? state : undefined
  );

  /**
   * Select Facebook page and save Facebook/Instagram connection.
   */
  const selectPage = useSelectMetaPage();

  /**
   * Open Meta page picker after successful Meta OAuth callback.
   *
   * If user cancelled OAuth, backend redirects to /dashboard/connect
   * without state/platform, so this will not open.
   */
  React.useEffect(() => {
    setOpen(platform === "meta" && !!state);
  }, [platform, state]);

  /**
   * Safe connection object used by the UI.
   */
  const connections = status?.connections ?? {
    facebook: EMPTY_STATE,
    instagram: EMPTY_STATE,
    tiktok: EMPTY_STATE,
    youtube: EMPTY_STATE,
  };

  /**
   * Handles clicking a platform row.
   *
   * If platform is not connected:
   * - Starts OAuth flow
   *
   * If platform is already connected:
   * - Activates or deactivates it
   */
  const handleToggle = async (
    platform: Platform,
    next: boolean
  ) => {
    setBusy(true);

    try {
      const current = connections[platform];

      /**
       * User wants to enable/connect the platform.
       */
      if (next) {
        /**
         * If not connected yet, start OAuth flow.
         */
        if (!current.connected) {
          if (
            platform === "facebook" ||
            platform === "instagram"
          ) {
            const { url } =
              await startMeta.mutateAsync({
                platform,
              });

            window.location.href = url;
            return;
          }

          if (platform === "tiktok") {
            const { url } =
              await startTiktok.mutateAsync();

            window.location.href = url;
            return;
          }

          if (platform === "youtube") {
            const { url } =
              await startYouTube.mutateAsync();

            window.location.href = url;
            return;
          }

          return;
        }

        /**
         * Platform is already connected,
         * so just mark it active.
         */
        await setActive.mutateAsync({
          platform,
          active: true,
        });

        return;
      }

      /**
       * User wants to disable platform publishing,
       * but keep the account connected.
       */
      if (current.connected) {
        await setActive.mutateAsync({
          platform,
          active: false,
        });
      }
    } catch {
      /**
       * Toast is handled inside hooks.
       */
    } finally {
      setBusy(false);
    }
  };

  /**
   * Handle YouTube OAuth callback.
   *
   * Backend redirects with:
   * /dashboard/connect?state=xxx&platform=youtube
   *
   * Then frontend calls backend to fetch the YouTube channel
   * and save the connected account.
   */
  React.useEffect(() => {
    const run = async () => {
      if (platform !== "youtube" || !state) return;

      const key = `youtube:${state}`;

      /**
       * Avoid duplicate execution in React Strict Mode.
       */
      if (handledOAuthRef.current === key) return;

      handledOAuthRef.current = key;

      try {
        await getYouTubeChannel.mutateAsync({
          state,
        });
      } catch {
        /**
         * Toast is handled inside hook.
         */
      } finally {
        router.replace("/dashboard/connect");
      }
    };

    run();
  }, [
    getYouTubeChannel,
    platform,
    router,
    state,
  ]);

  /**
   * Initial loading state.
   */
  if (isLoading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="mx-auto max-w-3xl space-y-4 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">
          Connect Platforms
        </h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            Choose platforms to connect
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-3">
          <Row
            platform="facebook"
            state={connections.facebook}
            disabled={
              busy ||
              setActive.isPending ||
              startMeta.isPending
            }
            onToggle={(next) =>
              handleToggle("facebook", next)
            }
          />

          <Row
            platform="instagram"
            state={connections.instagram}
            disabled={
              busy ||
              setActive.isPending ||
              startMeta.isPending
            }
            onToggle={(next) =>
              handleToggle("instagram", next)
            }
          />

          <Row
            platform="tiktok"
            state={connections.tiktok}
            disabled={
              busy ||
              setActive.isPending ||
              startTiktok.isPending
            }
            onToggle={(next) =>
              handleToggle("tiktok", next)
            }
          />

          <Row
            platform="youtube"
            state={connections.youtube}
            disabled={
              busy ||
              setActive.isPending ||
              startYouTube.isPending
            }
            onToggle={(next) =>
              handleToggle("youtube", next)
            }
          />
        </CardContent>
      </Card>

      {/* Meta page selection dialog */}
      <Dialog
        open={open}
        onOpenChange={(v) => {
          setOpen(v);

          /**
           * If user closes the dialog, clean the OAuth query params.
           */
          if (!v) {
            router.replace("/dashboard/connect");
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Select Facebook Page
            </DialogTitle>

            <DialogDescription>
              Choose the page you want to connect. This
              will also detect Instagram business account
              if linked.
            </DialogDescription>
          </DialogHeader>

          {pagesQuery.isLoading ? (
            <div className="text-sm text-muted-foreground">
              Loading pages...
            </div>
          ) : pagesQuery.isError ? (
            <div className="text-sm text-red-600">
              Failed to load pages
            </div>
          ) : pagesQuery.data &&
            pagesQuery.data.length === 0 ? (
            <div className="space-y-3 text-sm text-muted-foreground">
              <div>
                No Facebook pages found for this account.
              </div>

              <Button
                variant="outline"
                onClick={() => {
                  setOpen(false);
                  router.replace("/dashboard/connect");
                }}
              >
                Go Back
              </Button>
            </div>
          ) : (
            <div className="max-h-80 space-y-2 overflow-auto">
              {pagesQuery.data?.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div>
                    <div className="font-medium">
                      {p.name}
                    </div>

                    <div className="text-xs text-muted-foreground">
                      {p.id}
                    </div>
                  </div>

                  <Button
                    disabled={selectPage.isPending}
                    onClick={async () => {
                      if (!state) return;

                      try {
                        await selectPage.mutateAsync({
                          state,
                          pageId: p.id,
                        });

                        setOpen(false);

                        router.replace(
                          "/dashboard/connect"
                        );
                      } catch {
                        /**
                         * Toast is handled inside hook.
                         */
                      }
                    }}
                  >
                    Select
                  </Button>
                </div>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}