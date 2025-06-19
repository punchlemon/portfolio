// src/components/mdx-content.tsx
"use client";

import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { SlideViewer } from './slide-viewer';
import { ComponentProps } from 'react';

const components = {
  SlideViewer,
  // 基本的なコンポーネントのみ定義
  video: (props: ComponentProps<'video'>) => (
    <video
      {...props}
      className="w-full rounded-lg my-4"
      controls
    />
  ),
};

interface MDXContentProps {
  source: MDXRemoteSerializeResult;
}

export function MDXContent({ source }: MDXContentProps) {
  return (
    <div className="markdown-content">
      <MDXRemote {...source} components={components} />
    </div>
  );
}