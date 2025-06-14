// src/app/articles/[slug]/page.tsx
import { notFound } from "next/navigation";
import { ArticleView } from "@/components/article-view";
import { getArticle, getArticles } from "@/lib/articles";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticle(slug); // await削除

  if (!article || !article.published) {
    notFound();
  }

  return <ArticleView article={article} />;
}

// 静的生成用（オプション）
export function generateStaticParams() { // async削除
  const articles = getArticles(); // await削除
  return articles.map((article) => ({
    slug: article.slug,
  }));
}