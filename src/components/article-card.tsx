"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Calendar, Clock } from "lucide-react";
import { Article } from "@/lib/articles";

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <Link href={`/articles/${article.slug}`}>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg line-clamp-2 hover:text-primary transition-colors">
            {article.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground line-clamp-3">
            {article.description}
          </p>
          
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
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
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {article.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{article.tags.length - 3}
              </Badge>
            )}
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}