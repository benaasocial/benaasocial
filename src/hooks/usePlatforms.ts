import { getErrorMessage } from "@/lib/getErrorMessage";
import { queryKeys } from "@/lib/queryKeys";
import { toastFlow } from "@/lib/toast";
import apiCall from "@/services/apiCall";
import {
  MetaPage,
  MetaPagesResponse,
  MetaSelectPageResponse,
  Platform,
  Status,
} from "@/types/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

/**
 * Fetch connected accounts status
 */
export function useStatus() {
  return useQuery<Status>({
    queryKey: queryKeys.status,

    /**
     * Call API to get integration status
     */
    queryFn: async () => {
      const { data } = await apiCall.get(`/integrations/connected-accounts/status`);
      return data.data;
    },
  });
}

/**
 * Toggle platform active / inactive
 */
export function useSetPlatformActive() {
  const qc = useQueryClient();

  return useMutation<
    string,
    AxiosError,
    { platform: Platform; active: boolean }
  >({
    /**
     * Update platform active state
     */
    mutationFn: async ({ platform, active }) => {
      const { data } = await apiCall.patch(
        `/integrations/connected-accounts/${platform}/active`,
        { active }
      );
      return data.message;
    },

    /**
     * On success → show toast + refresh status
     */
    onSuccess: (data) => {
      toastFlow.success(data);
      qc.invalidateQueries({ queryKey: queryKeys.status });
    },

    /**
     * On error → show readable message
     */
    onError: (data) => {
      toastFlow.error(getErrorMessage(data));
    },
  });
}

/**
 * Get Meta OAuth start URL
 */
export function useMetaStartUrl() {
  return useMutation<{ url: string }, AxiosError, { platform: "facebook" | "instagram" }>({
    /**
     * Request Meta auth URL
     */
    mutationFn: async ({ platform }) => {
      const { data } = await apiCall.get(`/integrations/meta/start?platform=${platform}`);
      return data.data;
    },

    onError: (data) => {
      toastFlow.error(getErrorMessage(data));
    },
  });
}

/**
 * Fetch all Meta pages after auth
 */
export function useGetPages(state: string | undefined) {
  return useQuery<MetaPage[]>({
    queryKey: [...queryKeys.metaPages, state],

    /**
     * Get pages list from API
     */
    queryFn: async () => {
      const { data } = await apiCall.get<MetaPagesResponse>(
        `/integrations/meta/pages`,
        { params: { state } }
      );
      return data.data.pages;
    },

    /**
     * Only run when state exists
     */
    enabled: !!state,
  });
}

/**
 * Select one Meta page to connect
 */
export function useSelectMetaPage() {
  const qc = useQueryClient();

  return useMutation<
    string,
    AxiosError<{ error?: { message?: string }; message?: string }>,
    { state: string; pageId: string }
  >({
    /**
     * Send selected page to backend
     */
    mutationFn: async ({ state, pageId }) => {
      const res = await apiCall.post<MetaSelectPageResponse>(
        `/integrations/meta/select-page`,
        { state, pageId }
      );

      return res.data.message ?? "Connected";
    },

    /**
     * Refresh status after success
     */
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.status });
    },

    onError: (data) => {
      toastFlow.error(getErrorMessage(data));
    },
  });
}

/**
 * Get TikTok OAuth start URL
 */
export function useTikTokStartUrl() {
  return useMutation<{ url: string }>({
    /**
     * Request TikTok auth URL
     */
    mutationFn: async () => {
      const { data } = await apiCall.get(`/integrations/tiktok/start`);
      return data.data;
    },

    onError: (data) => {
      toastFlow.error(getErrorMessage(data));
    },
  });
}

/**
 * Get YouTube OAuth start URL
 */
export function useYouTubeStartUrl() {
  return useMutation<{ url: string }>({
    /**
     * Request YouTube auth URL
     */
    mutationFn: async () => {
      const { data } = await apiCall.get(`/integrations/youtube/start`);
      return data.data;
    },

    onError: (data) => {
      toastFlow.error(getErrorMessage(data));
    },
  });
}

/**
 * Get YouTube channel info after auth
 */
export function useYouTubeChannel() {
  return useMutation<
    { connected: boolean; youtube: { channelId: string; title: string } },
    unknown,
    { state: string }
  >({
    /**
     * Fetch channel data using state
     */
    mutationFn: async ({ state }) => {
      const { data } = await apiCall.get(
        `/integrations/youtube/channel?state=${state}`
      );

      return data.data;
    },

    onError: (data) => {
      toastFlow.error(getErrorMessage(data));
    },

    /**
     * Show success message after connect
     */
    onSuccess: () => {
      toastFlow.success("YouTube connected successfully");
    },
  });
}