"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Article } from "@/lib/articles";
import { Calendar, Clock } from "lucide-react";
import { LikeButton } from "./like-button";

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Card className="h-full overflow-hidden group hover:shadow-lg transition-all duration-300">
      <Link href={`/articles/${article.slug}`}>
        <div className="relative aspect-video overflow-hidden">
          {article.thumbnail ? (
            <Image
              src={article.thumbnail}
              alt={article.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
              <span className="text-muted-foreground">No Image</span>
            </div>
          )}
        </div>
      </Link>

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-lg leading-tight line-clamp-2 group-hover:text-primary transition-colors">
            <Link href={`/articles/${article.slug}`}>
              {article.title}
            </Link>
          </h3>
          
          {/* いいねボタン - クリック可能領域を分離 */}
          <div onClick={(e) => e.stopPropagation()}>
            <LikeButton articleSlug={article.slug} compact />
          </div>
        </div>
        
        <p className="text-muted-foreground text-sm line-clamp-2 mt-2">
          {article.description}
        </p>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
          <div className="flex items-center">
            <Calendar className="w-3 h-3 mr-1" />
            {new Date(article.date).toLocaleDateString('ja-JP')}
          </div>
          {article.readTime && (
            <div className="flex items-center">
              <Clock className="w-3 h-3 mr-1" />
              {article.readTime}
            </div>
          )}
        </div>
        
        <div className="flex flex-wrap gap-1">
          {article.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs border-foreground text-foreground">
              {tag}
            </Badge>
          ))}
          {article.tags.length > 3 && (
            <Badge variant="outline" className="text-xs border-foreground text-foreground">
              +{article.tags.length - 3}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}