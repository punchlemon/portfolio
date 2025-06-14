// src/lib/articles.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { calculateReadingTime } from './reading-time';

export interface Article {
  slug: string;
  content: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  readTime: string;
  published: boolean;
}

// 個別記事を取得
export function getArticle(slug: string): Article | null {
  try {
    const filePath = path.join(process.cwd(), 'public/articles', `${slug}.md`);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    
    // 読了時間を自動計算（frontmatterの値を優先、なければ計算）
    const calculatedReadTime = calculateReadingTime(content);
    const readTime = data.readTime || calculatedReadTime;
    
    return {
      slug,
      content,
      title: data.title || 'Untitled',
      description: data.description || '',
      date: data.date || new Date().toISOString().split('T')[0],
      tags: data.tags || [],
      readTime,
      published: data.published !== false,
    };
  } catch (error: unknown) {
    console.error(`Error reading article ${slug}:`, error);
    return null;
  }
}

// 全記事を取得
export function getArticles(): Article[] {
  try {
    const articlesDirectory = path.join(process.cwd(), 'public/articles');
    
    if (!fs.existsSync(articlesDirectory)) {
      return [];
    }
    
    const filenames = fs.readdirSync(articlesDirectory);
    const articles = filenames
      .filter(name => name.endsWith('.md'))
      .map(name => {
        const slug = name.replace(/\.md$/, '');
        return getArticle(slug);
      })
      .filter((article): article is Article => article !== null)
      .filter(article => article.published)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    return articles;
  } catch (error: unknown) {
    console.error('Error reading articles:', error);
    return [];
  }
}