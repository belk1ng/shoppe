import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn-bucket.hb.ru-msk.vkcs.cloud" },
    ],
  },
};

export default nextConfig;
