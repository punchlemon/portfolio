// src/lib/reading-time.ts
export function calculateReadingTime(content: string): string {
  // 日本語の場合の読み速度（一般的な値）
  const JAPANESE_READING_SPEED = 400; // 文字/分
  const ENGLISH_READING_SPEED = 200;  // 単語/分

  // Markdownの記号を除去
  const cleanContent = content
    .replace(/^---[\s\S]*?---/m, '') // frontmatter除去
    .replace(/!\[.*?\]\(.*?\)/g, '') // 画像除去
    .replace(/\[.*?\]\(.*?\)/g, '$1') // リンクのテキスト部分のみ残す
    .replace(/`{1,3}.*?`{1,3}/g, '') // コード除去
    .replace(/#{1,6}\s/g, '') // 見出し記号除去
    .replace(/\*{1,2}(.*?)\*{1,2}/g, '$1') // 強調記号除去
    .replace(/\n+/g, ' ') // 改行を空白に
    .trim();

  // 日本語文字数をカウント
  const japaneseChars = (cleanContent.match(/[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/g) || []).length;
  
  // 英単語数をカウント
  const englishWords = cleanContent
    .replace(/[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/g, ' ') // 日本語を空白に置換
    .split(/\s+/)
    .filter(word => word.length > 0).length;

  // 読了時間を計算
  const japaneseTime = japaneseChars / JAPANESE_READING_SPEED;
  const englishTime = englishWords / ENGLISH_READING_SPEED;
  const totalMinutes = japaneseTime + englishTime;

  // 結果をフォーマット
  if (totalMinutes < 1) {
    return "1分未満";
  } else if (totalMinutes < 60) {
    return `${Math.ceil(totalMinutes)}分`;
  } else {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = Math.ceil(totalMinutes % 60);
    return minutes > 0 ? `${hours}時間${minutes}分` : `${hours}時間`;
  }
}

// 文字数も取得したい場合
export function getContentStats(content: string) {
  const cleanContent = content
    .replace(/^---[\s\S]*?---/m, '')
    .replace(/!\[.*?\]\(.*?\)/g, '')
    .replace(/\[.*?\]\(.*?\)/g, '$1')
    .replace(/`{1,3}.*?`{1,3}/g, '')
    .replace(/#{1,6}\s/g, '')
    .replace(/\*{1,2}(.*?)\*{1,2}/g, '$1')
    .replace(/\n+/g, ' ')
    .trim();

  const japaneseChars = (cleanContent.match(/[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/g) || []).length;
  const englishWords = cleanContent
    .replace(/[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 0).length;
  
  const totalChars = cleanContent.length;
  const readingTime = calculateReadingTime(content);

  return {
    totalChars,
    japaneseChars,
    englishWords,
    readingTime
  };
}