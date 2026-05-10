"use client";

import { Badge } from "@/components/ui/badge";
import { PlatformBadgesProps } from "@/types/types";

export default function PlatformBadges({ targets }: PlatformBadgesProps) {
  return (
    <div className="flex gap-2 flex-col">
      
      {/* Show badge only if the platform is enabled */}
      {targets?.facebook && <Badge variant="outline">Facebook</Badge>}
      {targets?.instagram && <Badge variant="outline">Instagram</Badge>}
      {targets?.tiktok && <Badge variant="outline">TikTok</Badge>}
      {targets?.youtube && <Badge variant="outline">Youtube</Badge>}
      
    </div>
  );
}