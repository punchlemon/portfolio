// src/lib/articles.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
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
  thumbnail?: string; // サムネイル画像のパスを追加
}

// 画像・動画ファイルをpublicディレクトリにコピーする関数
function copyStaticFiles(slug: string) {
  const sourceDir = path.join(process.cwd(), 'content/articles', slug);
  const targetDir = path.join(process.cwd(), 'public/articles', slug);

  // ディレクトリを作成
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  // 再帰的にコピーする関数
  const copyRecursively = (source: string, target: string) => {
    if (!fs.existsSync(source)) return;
    
    if (!fs.existsSync(target)) {
      fs.mkdirSync(target, { recursive: true });
    }

    const items = fs.readdirSync(source);
    items.forEach(item => {
      const sourcePath = path.join(source, item);
      const targetPath = path.join(target, item);
      const stat = fs.statSync(sourcePath);

      if (stat.isDirectory()) {
        // ディレクトリの場合は再帰的にコピー
        copyRecursively(sourcePath, targetPath);
      } else if (stat.isFile()) {
        // ファイルの場合のみコピー
        fs.copyFileSync(sourcePath, targetPath);
      }
    });
  };

  // thumbnail.png をコピー
  const thumbnailSource = path.join(sourceDir, 'thumbnail.png');
  const thumbnailTarget = path.join(targetDir, 'thumbnail.png');
  if (fs.existsSync(thumbnailSource)) {
    fs.copyFileSync(thumbnailSource, thumbnailTarget);
  }

  // images フォルダ全体をコピー（slidesサブディレクトリも含む）
  const imagesSource = path.join(sourceDir, 'images');
  const imagesTarget = path.join(targetDir, 'images');
  copyRecursively(imagesSource, imagesTarget);

  // videos フォルダをコピー
  const videosSource = path.join(sourceDir, 'videos');
  const videosTarget = path.join(targetDir, 'videos');
  copyRecursively(videosSource, videosTarget);
}

// 個別記事を取得
export function getArticle(slug: string): Article | null {
  try {
    // content/articlesディレクトリから読み込み
    const filePath = path.join(process.cwd(), 'content/articles', slug, 'index.mdx');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    
    // サムネイル画像の存在チェック
    const thumbnailPath = path.join(process.cwd(), 'content/articles', slug, 'thumbnail.png');
    const hasThumbnail = fs.existsSync(thumbnailPath);
    
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
      thumbnail: hasThumbnail ? `/articles/${slug}/thumbnail.png` : undefined,
    };
  } catch (error: unknown) {
    console.error(`Error reading article ${slug}:`, error);
    return null;
  }
}

// MDX記事をシリアライズして取得
export async function getArticleWithMDX(slug: string): Promise<{ article: Article; mdxContent: MDXRemoteSerializeResult } | null> {
  try {
    const filePath = path.join(process.cwd(), 'content/articles', slug, 'index.mdx');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    
    // 静的ファイルをpublicディレクトリにコピー
    copyStaticFiles(slug);
    
    // サムネイル画像の存在チェック
    const thumbnailPath = path.join(process.cwd(), 'content/articles', slug, 'thumbnail.png');
    const hasThumbnail = fs.existsSync(thumbnailPath);
    
    // 相対パスを絶対パスに変換（SlideViewerのpatternも追加）
    const processedContent = content
      .replace(/src="\.\/images\//g, `src="/articles/${slug}/images/`)
      .replace(/src="\.\/videos\//g, `src="/articles/${slug}/videos/`)
      .replace(/!\[([^\]]*)\]\(\.\/images\//g, `![$1](/articles/${slug}/images/`)
      // SlideViewerのimages配列内のパスも変換
      .replace(/'\.\/images\//g, `'/articles/${slug}/images/`)
      .replace(/"\.\/images\//g, `"/articles/${slug}/images/`);
    
    const calculatedReadTime = calculateReadingTime(content);
    const readTime = data.readTime || calculatedReadTime;
    
    const article: Article = {
      slug,
      content: processedContent,
      title: data.title || 'Untitled',
      description: data.description || '',
      date: data.date || new Date().toISOString().split('T')[0],
      tags: data.tags || [],
      readTime,
      published: data.published !== false,
      thumbnail: hasThumbnail ? `/articles/${slug}/thumbnail.png` : undefined,
    };

    const mdxContent = await serialize(processedContent);

    return { article, mdxContent };
  } catch (error: unknown) {
    console.error(`Error reading article with MDX ${slug}:`, error);
    return null;
  }
}

// 全記事を取得
export function getArticles(): Article[] {
  try {
    const articlesDirectory = path.join(process.cwd(), 'content/articles');
    
    if (!fs.existsSync(articlesDirectory)) {
      return [];
    }
    
    const folderNames = fs.readdirSync(articlesDirectory);
    const articles = folderNames
      .filter(name => {
        const folderPath = path.join(articlesDirectory, name);
        const indexPath = path.join(folderPath, 'index.mdx');
        return fs.statSync(folderPath).isDirectory() && fs.existsSync(indexPath);
      })
      .map(folderName => getArticle(folderName))
      .filter((article): article is Article => article !== null)
      .filter(article => article.published)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    return articles;
  } catch (error: unknown) {
    console.error('Error reading articles:', error);
    return [];
  }
}