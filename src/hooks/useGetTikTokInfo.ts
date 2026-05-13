import { queryKeys } from "@/lib/queryKeys";
import HttpServices from "@/services/HttpServices";
import { ApiOk, TikTokCreatorInfo } from "@/types/types";
import { useQuery } from "@tanstack/react-query";

/**
 * Fetch TikTok creator/account info.
 *
 * Used for:
 * - Loading TikTok creator settings
 * - Privacy level options
 * - Interaction permissions
 * - Audit-compliant TikTok publishing UX
 */
const useGetTikTokInfo = () => {
    return useQuery<ApiOk<TikTokCreatorInfo>>({
        /**
         * React Query cache key
         */
        queryKey: queryKeys.status,

        /**
         * API request to fetch TikTok creator info
         */
        queryFn: () => new HttpServices("tiktok").getAllTikTokInfo(),
    });
};

export default useGetTikTokInfo;