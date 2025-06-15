import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// いいね状態の取得
export function useLikeStatus(articleSlug: string) {
  return useQuery({
    queryKey: ['likes', articleSlug],
    queryFn: async () => {
      const response = await fetch(`/api/likes/${articleSlug}`);
      if (!response.ok) throw new Error('Failed to fetch like status');
      return response.json() as Promise<{ count: number; hasLiked: boolean }>;
    },
    staleTime: 1000 * 60 * 5, // 5分間はキャッシュを利用
  });
}

// いいね操作
export function useLikeMutation(articleSlug: string) {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (hasLiked: boolean) => {
      const method = hasLiked ? 'DELETE' : 'POST';
      const response = await fetch(`/api/likes/${articleSlug}`, { method });
      if (!response.ok) throw new Error('Failed to toggle like');
      return response.json() as Promise<{ count: number; hasLiked: boolean }>;
    },
    onSuccess: (data) => {
      // このクエリを即座に更新
      queryClient.setQueryData(['likes', articleSlug], data);
      // 記事一覧など、他の関連クエリも更新
      queryClient.invalidateQueries({ queryKey: ['articles'] });
    },
    onError: (error) => {
      console.error('Like operation failed:', error);
    },
  });
}