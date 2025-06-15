// src/components/article-view.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { Article } from "@/lib/articles";
import { MDXContent } from "./mdx-content";
import { LikeButton } from "./like-button";
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import Image from 'next/image';

interface ArticleViewProps {
  article: Article;
  mdxContent?: MDXRemoteSerializeResult;
}

export function ArticleView({ article, mdxContent }: ArticleViewProps) {
  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Back Button */}
        <div className="mb-8">
          <Button variant="ghost" asChild>
            <Link href="/articles">
              <ArrowLeft className="mr-2 h-4 w-4" />
              記事一覧に戻る
            </Link>
          </Button>
        </div>

        {/* サムネイル画像 */}
        {article.thumbnail && (
          <div className="relative aspect-video mb-8 rounded-lg overflow-hidden">
            <Image
              src={article.thumbnail}
              alt={article.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* Article Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
          <p className="text-xl text-muted-foreground mb-6">{article.description}</p>
          
          {/* いいねボタンと日付情報を横並びに配置 */}
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            {/* 左端にいいねボタン */}
            <LikeButton articleSlug={article.slug} compact />
            
            {/* 投稿日 */}
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              {new Date(article.date).toLocaleDateString('ja-JP')}
            </div>
            
            {/* 読み時間 */}
            {article.readTime && (
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                {article.readTime}
              </div>
            )}
          </div>
        </header>

        {/* Article Content */}
        <article className="prose prose-lg max-w-none dark:prose-invert mb-12">
          {mdxContent ? (
            <MDXContent source={mdxContent} />
          ) : (
            <div dangerouslySetInnerHTML={{ __html: article.content }} />
          )}
        </article>

        {/* Tags and Like Button at the bottom */}
        <footer className="mt-12 pt-8 border-t border-border">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {article.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="border-foreground text-foreground">
                {tag}
              </Badge>
            ))}
          </div>
          
          {/* Like Button below tags */}
          <LikeButton articleSlug={article.slug} />
        </footer>
      </div>
    </div>
  );
}