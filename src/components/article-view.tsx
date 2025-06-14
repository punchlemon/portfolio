// src/components/article-view.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'
import { Article } from "@/lib/articles";

interface ArticleViewProps {
  article: Article;
}

export function ArticleView({ article }: ArticleViewProps) {
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

        {/* Article Header */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">{article.title}</h1>
          
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="w-4 h-4 mr-1" />
              {new Date(article.date).toLocaleDateString('ja-JP')}
            </div>
            {article.readTime && (
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="w-4 h-4 mr-1" />
                {article.readTime}
              </div>
            )}
          </div>
        </header>

        {/* Article Content */}
        <article className="markdown-content max-w-none mb-12">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              // 外部リンクを新しいタブで開く
              a: ({ href, children, ...props }) => {
                const isExternal = href?.startsWith('http');
                if (isExternal) {
                  return (
                    <a 
                      href={href} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      {...props}
                    >
                      {children}
                    </a>
                  );
                }
                return <a href={href} {...props}>{children}</a>;
              },
            }}
          >
            {article.content}
          </ReactMarkdown>
        </article>

        {/* Tags Section - 下部に配置 */}
        {article.tags.length > 0 && (
          <footer className="border-t border-border pt-8">
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <Badge 
                  key={tag} 
                  variant="secondary" 
                  className="hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
                  asChild
                >
                  <Link href={`/articles?tag=${encodeURIComponent(tag)}`}>
                    {tag}
                  </Link>
                </Badge>
              ))}
            </div>
          </footer>
        )}
        
      </div>
    </div>
  );
}