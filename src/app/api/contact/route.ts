import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    // 入力値検証
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: '必須項目が入力されていません' },
        { status: 400 }
      );
    }

    // Slack Webhookに送信
    const webhookUrl = process.env.SLACK_WEBHOOK_URL;
    
    if (!webhookUrl) {
      return NextResponse.json(
        { error: 'Webhook設定がありません' },
        { status: 500 }
      );
    }

    const slackMessage = {
      text: `新しいお問い合わせがありました`,
      blocks: [
        {
          type: "header",
          text: {
            type: "plain_text",
            text: "📩 新しいお問い合わせ"
          }
        },
        {
          type: "section",
          fields: [
            {
              type: "mrkdwn",
              text: `*名前:*\n${name}`
            },
            {
              type: "mrkdwn",
              text: `*メール:*\n${email}`
            }
          ]
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*メッセージ:*\n${message}`
          }
        },
        {
          type: "context",
          elements: [
            {
              type: "mrkdwn",
              text: `送信日時: ${new Date().toLocaleString('ja-JP')}`
            }
          ]
        }
      ]
    };

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(slackMessage),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Slack送信に失敗しました' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('API Route Error:', error); // error変数を使用
    return NextResponse.json(
      { error: 'サーバーエラーが発生しました' },
      { status: 500 }
    );
  }
}