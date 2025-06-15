// next.config.ts
import type { NextConfig } from "next";
import createMDX from '@next/mdx';
import remarkGfm from 'remark-gfm';

const nextConfig: NextConfig = {
  output: 'standalone',
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  experimental: {
    mdxRs: false,
  },
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
  async rewrites() {
    return [
      // content内の画像・動画を /content/ パスでアクセス可能にする
      {
        source: '/content/:path*',
        destination: '/api/content/:path*',
      },
    ];
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);
