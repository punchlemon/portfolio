// src/app/articles/page.tsx
import { ArticleCard } from "@/components/article-card";
import { getArticles } from "@/lib/articles";

export default function ArticlesPage() {
  const articles = getArticles();

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Articles</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            技術的な学びや体験を記事にして共有しています
          </p>
        </div>

        {articles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">記事がありません</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}