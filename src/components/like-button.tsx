"use client";

import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLikeStatus, useLikeMutation } from '@/hooks/use-likes';

interface LikeButtonProps {
  articleSlug: string;
  compact?: boolean; // カード表示用のコンパクトモード
}

export function LikeButton({ articleSlug, compact = false }: LikeButtonProps) {
  // TanStack Queryでいいね状態を取得
  const { data, isLoading: isInitializing, error } = useLikeStatus(articleSlug);
  const likeMutation = useLikeMutation(articleSlug);

  const likeCount = data?.count || 0;
  const hasLiked = data?.hasLiked || false;
  const isLoading = likeMutation.isPending;

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isLoading) return;
    likeMutation.mutate(hasLiked);
  };

  // 初期化中のローディング表示
  if (isInitializing) {
    return (
      <div className={`flex items-center gap-2 ${compact ? '' : 'mt-8'}`}>
        <div className="h-8 w-8 bg-muted rounded-full animate-pulse"></div>
        <div className="h-4 w-8 bg-muted rounded animate-pulse"></div>
      </div>
    );
  }

  // エラー時の表示
  if (error) {
    return (
      <div className={`flex items-center gap-2 ${compact ? '' : 'mt-8'}`}>
        <Heart className="w-5 h-5 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">--</span>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2 ${compact ? '' : 'mt-8'}`}>
      <Button
        variant="ghost"
        size={compact ? "sm" : "default"}
        onClick={handleLike}
        disabled={isLoading}
        className={`transition-all duration-300 p-2 ${
          hasLiked 
            ? 'text-red-500 hover:text-red-600 scale-110' 
            : 'text-muted-foreground hover:text-red-500 hover:scale-110'
        } ${isLoading ? 'opacity-50' : ''}`}
      >
        <Heart 
          className={`transition-all duration-300 ${
            compact ? 'w-4 h-4' : 'w-5 h-5'
          } ${hasLiked ? 'fill-current' : ''}`} 
        />
      </Button>
      
      <span className={`font-medium transition-colors duration-300 ${
        compact ? 'text-sm' : 'text-base'
      } ${hasLiked ? 'text-red-500' : 'text-muted-foreground'}`}>
        {likeCount}
      </span>
    </div>
  );
}