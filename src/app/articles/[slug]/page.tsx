// src/app/articles/[slug]/page.tsx
import { notFound } from "next/navigation";
import { ArticleView } from "@/components/article-view";
import { getArticleWithMDX, getArticles } from "@/lib/articles";

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

// 静的生成用（オプション）
export function generateStaticParams() {
  const articles = getArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}