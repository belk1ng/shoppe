import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn-bucket.hb.ru-msk.vkcs.cloud" },
    ],
  },
};

export default nextConfig;
