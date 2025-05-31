// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://img.youtube.com https://visionary-lebkuchen-725bb0.netlify.app; font-src 'self'; frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com https://visionary-lebkuchen-725bb0.netlify.app; connect-src 'self' https://visionary-lebkuchen-725bb0.netlify.app;"
          },
        ],
      },
    ];
  },
};

export default nextConfig;