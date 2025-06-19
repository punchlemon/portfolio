// src/app/articles/[slug]/page.tsx
import { notFound } from "next/navigation";
import { ArticleView } from "@/components/article-view";
import { getArticleWithMDX } from "@/lib/articles";

// 動的レンダリングを強制
export const dynamic = 'force-dynamic';

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const result = await getArticleWithMDX(slug);

  if (!result) {
    notFound();
  }

  const { article, mdxContent } = result;

  return <ArticleView article={article} mdxContent={mdxContent} />;
}