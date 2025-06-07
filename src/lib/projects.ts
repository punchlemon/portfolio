export interface Preview {
  type: 'video' | 'website';
  title: string;
  url?: string;
  embedId?: string;
  playlistUrl?: string;
  playlistText?: string;
  imageUrl?: string; // 追加
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  features: string[];
  challenges: string[];
  images: string[];
  githubUrl?: string;
  liveUrl?: string;
  preview?: Preview;
  delay?: number;
  date?: string;
  subProjects?: SubProject[]; // 追加: サブプロジェクト配列
}

// 新しいインターフェース定義
export interface SubProject {
  id: string;
  title: string;
  description: string;
  thumbnail?: string;
  liveUrl?: string;
  githubUrl?: string;
  technologies?: string[];
  longDescription?: string;
  features?: string[];
  challenges?: string[];
  preview?: Preview; // この行を追加
}

export const projects: Project[] = [
  {
    id: "picklet",
    title: "Picklet",
    description: "洋服の着用履歴を管理する衣類コーディネートアプリ",
    longDescription: "Pickletは、普段着る洋服の管理と着用履歴を記録できるiOSアプリです。どの服をいつ着たかを追跡し、着用回数や最後に着た日付を可視化することで、効率的なワードローブ管理をサポートします。SwiftUIの宣言的UIで直感的なコーディネート記録と分析を実現しています。",
    technologies: ["Swift", "SwiftUI", "SQLite", "iOS SDK"],
    features: [
      "洋服の着用履歴記録",
      "着用回数の自動カウント",
      "最終着用日の追跡",
      "着用頻度の可視化",
      "SwiftUIによる宣言的UI",
      "SQLiteによるローカルデータ管理"
    ],
    challenges: [
      "SQLiteでの効率的なデータベース設計",
      "SwiftUIの宣言的UIパラダイムの活用",
      "将来のPostgreSQL移行を考慮した設計"
    ],
    images: [
      "/projects/picklet-1.png",
    ],
    githubUrl: "https://github.com/picklet-team/picklet",
    delay: 0.05,
    subProjects: [
      {
        id: "picklet-support",
        title: "Picklet Support",
        description: "ユーザーサポートポータル。お問い合わせ情報をSlackに通知するシステム。",
        thumbnail: "/projects/picklet-support-thumbnail.png",
        liveUrl: "https://support.picklet.app",
        githubUrl: "https://github.com/picklet-team/picklet-support",
        technologies: ["Qwik", "Cloudflare", "daisyUI", "Tailwind CSS"],
        longDescription: "Pickletユーザー向けのサポートポータルサイト。ユーザーからの問い合わせを効率的に管理するためのシステムです。Qwikフレームワークを使用して高速なユーザー体験を提供し、Cloudflareでホスティングすることで高い可用性を実現しています。フォームから送信された問い合わせは自動的にSlackに通知され、サポートチームが迅速に対応できるようになっています。",
        features: [
          "ユーザーフレンドリーなお問い合わせフォーム",
          "Slackへのリアルタイム通知連携",
          "Cloudflareを活用した高速なページロード",
          "Qwikによるインタラクティブなユーザー体験",
          "daisyUIを使用したモダンなUIデザイン"
        ],
        challenges: [
          "Qwikの新しいプログレッシブ拡張フレームワークを効率的に活用するための学習曲線への対応",
          "Cloudflareワーカーとの連携によるサーバーレスアーキテクチャの構築",
          "Slackへの通知システムのセキュアな実装"
        ]
      },
      {
        id: "picklet-privacy",
        title: "Picklet Privacy",
        description: "プライバシーポリシー管理サイト。Markdownでコンテンツを管理し、Rspackでビルド。",
        thumbnail: "/projects/picklet-privacy-thumbnail.png",
        liveUrl: "https://privacy.picklet.app",
        githubUrl: "https://github.com/picklet-team/picklet-privacy-policy",
        technologies: ["React", "Rspack", "Markdown", "GitHub Pages"],
        longDescription: "Pickletのプライバシーポリシーを管理・公開するための専用サイト。Markdownでコンテンツを記述し、Rspackの最小構成でビルドすることで、シンプルながら効率的なコンテンツ管理を実現しています。現在はGitHub Pagesでデプロイしており、今後はCI/CDパイプラインの整備とデプロイなしでのコンテンツ更新機能の実装を予定しています。",
        features: [
          "Markdownによるコンテンツ管理",
          "Rspackを使用した最小構成ビルド",
          "GitHub Pagesでの自動デプロイ",
          "レスポンシブデザインによるマルチデバイス対応",
          "シンプルで読みやすいレイアウト"
        ],
        challenges: [
          "Rspackの最小構成でのMarkdown読み込み実装",
          "GitHub Pagesとの連携設定",
          "将来のCI/CDパイプライン導入への設計配慮",
          "デプロイなしでのコンテンツ更新システムの構想・設計"
        ]
      }
    ]
  },
  {
    id: "bevy-game",
    title: "Bevy Game",
    description: "Rustで作られた高性能ゲームエンジンを使用したゲーム開発",
    longDescription: "Bevyゲームエンジンを使用したゲーム開発プロジェクト。Rustの安全性とパフォーマンスを活かし、モダンなゲーム開発手法を実践しています。ECSアーキテクチャを採用し、効率的なゲームループとコンポーネントシステムを構築。開発過程をYouTube動画で記録・共有しています。",
    technologies: ["Rust", "Bevy Engine", "ECS Architecture", "Game Development"],
    features: [
      "ECSベースのゲームアーキテクチャ",
      "高性能な描画システム",
      "物理演算エンジン統合",
      "モジュラーコンポーネント設計",
      "クロスプラットフォーム対応",
      "開発過程の動画記録"
    ],
    challenges: [
      "Rustの所有権システムとの格闘",
      "ゲームループの最適化",
      "ECSパターンの効果的な実装",
      "開発過程の効果的な記録・共有"
    ],
    images: [
      "/projects/bevy-game-1.png",
    ],
    githubUrl: "https://github.com/picklet-team/bevy-game",
    liveUrl: "https://www.youtube.com/watch?v=KUKAEwzjxfY&list=PL2PifUeuI0TDeg8msv-R85gxSZbkj7sVo",
    delay: 0.075,
    preview: {
      type: 'video',
      title: 'Bevy Game Development',
      embedId: 'KUKAEwzjxfY',
      url: 'https://www.youtube.com/KUKAEwzjxfY',
      playlistUrl: 'https://www.youtube.com/playlist?list=PL2PifUeuI0TDeg8msv-R85gxSZbkj7sVo',
      playlistText: 'Bevy Game Development Playlist'
    }
  },
  {
    id: "sanso-milk-website",
    title: "Sanso Milk",
    description: "祖父母が運営するペンションの公式サイトをモダンなデザインで刷新",
    longDescription: "家族が運営するペンションの古いWebサイトを、モダンなデザインとユーザビリティを重視したサイトにリニューアル。React + TypeScriptを使用して、レスポンシブデザインとSPA体験を実現。実際のビジネスニーズに応えるWeb制作の実践例です。",
    technologies: ["React", "TypeScript", "Vite", "Redux Toolkit", "React Router"],
    features: [
      "SPA（Single Page Application）",
      "レスポンシブデザイン対応",
      "Redux Toolkitによる状態管理",
      "React Routerによるページ遷移",
      "宿泊プラン詳細表示",
      "お問い合わせフォーム",
      "アクセス情報の改善"
    ],
    challenges: [
      "既存顧客の使いやすさを保ちつつモダン化",
      "ペンションの魅力を効果的に伝えるデザイン",
      "実際のビジネス要件との兼ね合い"
    ],
    images: [
      "/projects/sanso-milk-website-1.svg",
    ],
    liveUrl: "https://visionary-lebkuchen-725bb0.netlify.app/",
    delay: 0.1,
    preview: {
      type: 'website',
      title: 'Sanso Milk Website preview',
      url: 'https://visionary-lebkuchen-725bb0.netlify.app/',
      imageUrl: '/projects/sanso-milk-website-screenshot.png',
      playlistText: 'Sanso Milk Website'
    }
  },
  {
    id: "portfolio-website",
    title: "Portfolio Website",
    description: "Next.js 15とTailwind CSSで構築した個人ポートフォリオサイト",
    longDescription: "このポートフォリオサイト自体もプロジェクトの一つです。Next.js 15の最新機能を活用し、Tailwind CSSとshadcn/uiでモダンなデザインを実現。TypeScriptによる型安全性、レスポンシブデザイン、そしてプロジェクト詳細ページでのサブプロジェクト表示機能など、実用的な機能を盛り込んだWebサイトです。GitHub Copilotとの対話を通じて段階的に機能を追加し、開発プロセス自体も学習の一部として活用しています。",
    technologies: ["Next.js 15", "React", "TypeScript", "Tailwind CSS", "shadcn/ui"],
    features: [
      "Next.js 15のApp Routerを使用したモダンな構成",
      "shadcn/uiコンポーネントによる統一されたデザイン",
      "レスポンシブデザインによるマルチデバイス対応",
      "TypeScriptによる型安全な開発",
      "GitHub Copilotを活用した開発プロセス"
    ],
    challenges: [
      "Next.js 15の新機能とApp Routerの効果的な活用",
      "shadcn/uiとTailwind CSSの組み合わせによるコンポーネント設計",
      "プロジェクト詳細ページでの柔軟なレイアウト設計",
      "GitHub Copilotとの対話を通じた段階的な機能開発"
    ],
    images: [
      "/projects/portfolio-website-1.svg",
    ],
    githubUrl: "https://github.com/punchlemon/portfolio",
    delay: 0.125,
    preview: {
      type: 'website',
      title: 'Portfolio Website Preview',
      imageUrl: '/projects/portfolio-website-screenshot.png',
    },
    subProjects: [
      {
        id: "portfolio-server-infrastructure",
        title: "マイコンサーバーインフラ構築",
        description: "自宅のマイコンでサーバーを構築し、Cloudflareを通じて安全に公開するインフラプロジェクト。",
        thumbnail: "/projects/portfolio-server-thumbnail.png",
        technologies: ["Raspberry Pi", "Docker", "Cloudflare Tunnel", "Ubuntu Server", "Nginx"],
        longDescription: "ポートフォリオサイトを自宅のマイコン（Raspberry Pi）でホスティングし、Cloudflare Tunnelを使用してセキュアに外部公開するインフラストラクチャプロジェクト。従来のクラウドホスティングではなく、物理サーバーでの運用を通じて、ネットワーク・サーバー管理・セキュリティについての実践的な学習を行っています。Cloudflareのエッジネットワークを活用することで、高いパフォーマンスとセキュリティを実現しています。",
        features: [
          "Raspberry Piを使用した自宅サーバー構築",
          "Cloudflare Tunnelによるセキュアな外部公開",
          "Dockerを使用したコンテナ化されたデプロイメント",
          "Nginx リバースプロキシによる負荷分散",
          "SSL/TLS証明書の自動管理",
          "24時間稼働の安定したホスティング環境",
        ],
        challenges: [
          "自宅ネットワーク環境でのサーバー運用における安定性の確保",
          "Cloudflare Tunnelの設定とネットワークルーティングの最適化",
          "限られたリソース（CPU・メモリ）での効率的なパフォーマンス調整",
          "セキュリティを保ちながらの外部アクセス許可の実装",
        ],
        preview: {
          type: 'video',
          title: 'Portfolio Infrastructure Setup',
          embedId: 'jDzx3B2EskA',
          url: 'https://youtu.be/jDzx3B2EskA',
          playlistUrl: 'https://www.youtube.com/playlist?list=PL2PifUeuI0TCoL-snyu92bdwvgoWH_DMg',
          playlistText: 'Self-Hosted Infrastructure Series'
        }
      }
    ]
  }
];