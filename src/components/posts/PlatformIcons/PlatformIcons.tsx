import { Platform } from "@/types/types";
import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";

export default function PlatformIcon({ platform }: { platform: Platform }) {
  // shared size for all icons
  const cls = "h-5 w-5";

  // return the correct icon based on platform
  switch (platform) {
    case "facebook":
      return <FaFacebook className={`${cls} text-[#1877F2]`} />;

    case "instagram":
      return <FaInstagram className={`${cls} text-[#E4405F]`} />;

    case "tiktok":
      return <FaTiktok className={`${cls} text-black`} />;

    case "youtube":
      return <FaYoutube className={`${cls} text-[#FF0000]`} />;
  }
}