// src/components/mdx-content.tsx
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { SlideViewer } from './slide-viewer';
import Image from 'next/image';
import { ComponentProps } from 'react';

const components = {
  SlideViewer,
  img: (props: ComponentProps<'img'>) => {
    const src = typeof props.src === 'string' ? props.src : '';
    
    return (
      <Image
        src={src}
        width={800}
        height={600}
        className="rounded-lg my-4"
        alt={props.alt || ''}
      />
    );
  },
  video: (props: ComponentProps<'video'>) => (
    <video
      {...props}
      className="w-full rounded-lg my-4"
      controls
    />
  ),
  // Markdown要素の明示的なスタイリング
  strong: (props: ComponentProps<'strong'>) => (
    <strong className="font-bold" {...props} />
  ),
  em: (props: ComponentProps<'em'>) => (
    <em className="italic" {...props} />
  ),
  h1: (props: ComponentProps<'h1'>) => (
    <h1 className="text-3xl font-bold mb-6 mt-8" {...props} />
  ),
  h2: (props: ComponentProps<'h2'>) => (
    <h2 className="text-2xl font-bold mb-4 mt-6" {...props} />
  ),
  h3: (props: ComponentProps<'h3'>) => (
    <h3 className="text-xl font-semibold mb-3 mt-4" {...props} />
  ),
  p: (props: ComponentProps<'p'>) => (
    <p className="mb-4 leading-relaxed" {...props} />
  ),
  ul: (props: ComponentProps<'ul'>) => (
    <ul className="list-disc list-inside mb-4 space-y-2" {...props} />
  ),
  ol: (props: ComponentProps<'ol'>) => (
    <ol className="list-decimal list-inside mb-4 space-y-2" {...props} />
  ),
  li: (props: ComponentProps<'li'>) => (
    <li className="leading-relaxed" {...props} />
  ),
  code: (props: ComponentProps<'code'>) => (
    <code className="bg-muted px-1 py-0.5 rounded text-sm font-mono" {...props} />
  ),
  blockquote: (props: ComponentProps<'blockquote'>) => (
    <blockquote className="border-l-4 border-primary pl-4 italic my-4" {...props} />
  ),
};

interface MDXContentProps {
  source: MDXRemoteSerializeResult;
}

export function MDXContent({ source }: MDXContentProps) {
  return <MDXRemote {...source} components={components} />;
}