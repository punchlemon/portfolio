import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const LIKES_FILE = path.join(process.cwd(), 'data', 'likes.json');

// データファイルが存在しない場合は作成
function ensureLikesFile() {
  const dir = path.dirname(LIKES_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(LIKES_FILE)) {
    fs.writeFileSync(LIKES_FILE, JSON.stringify({ likes: {}, users: {} }));
  }
}

// IP + User-Agent からクライアントIDを生成
function generateClientId(request: NextRequest): string {
  // NextRequestからIPアドレスを取得する正しい方法
  const forwardedFor = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const ip = forwardedFor?.split(',')[0]?.trim() || realIp || 'unknown';
  
  const userAgent = request.headers.get('user-agent') || 'unknown';
  
  // IP + User-Agent のハッシュでクライアントを識別
  const identifier = `${ip}-${userAgent}`;
  return crypto.createHash('md5').update(identifier).digest('hex');
}

// GET: いいね数と、このクライアントがいいね済みかを取得
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    ensureLikesFile();
    const data = JSON.parse(fs.readFileSync(LIKES_FILE, 'utf8'));
    
    const clientId = generateClientId(request);
    const articleSlug = params.slug;
    const userKey = `${clientId}-${articleSlug}`;
    
    return NextResponse.json({ 
      count: data.likes[articleSlug] || 0,
      hasLiked: !!data.users[userKey]
    });
  } catch (error) {
    console.error('Error in GET /api/likes:', error);
    return NextResponse.json({ count: 0, hasLiked: false });
  }
}

// POST: いいねを追加
export async function POST(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    ensureLikesFile();
    const data = JSON.parse(fs.readFileSync(LIKES_FILE, 'utf8'));
    
    const clientId = generateClientId(request);
    const articleSlug = params.slug;
    const userKey = `${clientId}-${articleSlug}`;
    
    // 既にいいねしているかチェック
    if (data.users[userKey]) {
      return NextResponse.json({ 
        error: 'Already liked',
        count: data.likes[articleSlug] || 0,
        hasLiked: true
      }, { status: 400 });
    }
    
    // いいねを記録
    data.likes[articleSlug] = (data.likes[articleSlug] || 0) + 1;
    data.users[userKey] = {
      timestamp: Date.now(),
      ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown'
    };
    
    fs.writeFileSync(LIKES_FILE, JSON.stringify(data, null, 2));
    
    return NextResponse.json({ 
      count: data.likes[articleSlug],
      hasLiked: true
    });
  } catch (error) {
    console.error('Error in POST /api/likes:', error);
    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 });
  }
}

// DELETE: いいねを削除
export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    ensureLikesFile();
    const data = JSON.parse(fs.readFileSync(LIKES_FILE, 'utf8'));
    
    const clientId = generateClientId(request);
    const articleSlug = params.slug;
    const userKey = `${clientId}-${articleSlug}`;
    
    // いいねしていない場合
    if (!data.users[userKey]) {
      return NextResponse.json({ 
        error: 'Not liked yet',
        count: data.likes[articleSlug] || 0,
        hasLiked: false
      }, { status: 400 });
    }
    
    // いいねを削除
    data.likes[articleSlug] = Math.max(0, (data.likes[articleSlug] || 0) - 1);
    delete data.users[userKey];
    
    fs.writeFileSync(LIKES_FILE, JSON.stringify(data, null, 2));
    
    return NextResponse.json({ 
      count: data.likes[articleSlug],
      hasLiked: false
    });
  } catch (error) {
    console.error('Error in DELETE /api/likes:', error);
    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 });
  }
}