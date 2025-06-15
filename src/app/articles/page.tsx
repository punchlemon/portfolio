// src/app/articles/page.tsx
import { getArticles } from "@/lib/articles";
import { ArticleCard } from "@/components/article-card";

export default function ArticlesPage() {
  const articles = getArticles();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
        <div className="mb-8 pt-20">
          <h1 className="text-4xl font-bold mb-4">Articles</h1>
          <p className="text-xl text-muted-foreground">
            技術的な学びや体験を記事にして共有しています
          </p>
        </div>

        {articles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">記事がありません</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, index) => (
              <div
                key={article.slug}
                className="animate-in fade-in-0 slide-in-from-bottom-4"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animationDuration: '600ms',
                  animationFillMode: 'both'
                }}
              >
                <ArticleCard article={article} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}