export interface Preview {
  type: 'website' | 'video';
  title: string;
  url?: string;
  embedId?: string;  // YouTube用
  playlistUrl?: string;
  playlistText?: string;
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
  delay: number;
  
  // 統合されたプレビュー情報
  preview?: Preview;
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
    images: ["/projects/picklet-1.jpg", "/projects/picklet-2.jpg"],
    githubUrl: "https://github.com/picklet-team/picklet",
    delay: 0.05,
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
    images: ["/projects/bevy-game-1.jpg", "/projects/bevy-game-2.jpg"],
    githubUrl: "https://github.com/picklet-team/bevy-game",
    liveUrl: "https://www.youtube.com/watch?v=KUKAEwzjxfY&list=PL2PifUeuI0TDeg8msv-R85gxSZbkj7sVo",
    delay: 0.075,
    preview: {
      type: 'video',
      title: 'Bevy Game Development',
      embedId: 'KUKAEwzjxfY',
      url: 'https://www.youtube.com/watch?v=KUKAEwzjxfY',
      playlistUrl: 'https://www.youtube.com/playlist?list=PL2PifUeuI0TDeg8msv-R85gxSZbkj7sVo',
      playlistText: 'Bevy Game Development Playlist'
    }
  },
  {
    id: "pension-website",
    title: "ペンションWebサイトリニューアル",
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
      "高齢者にも分かりやすいナビゲーション設計",
      "実際のビジネス要件との兼ね合い"
    ],
    images: ["/projects/pension-1.jpg", "/projects/pension-2.jpg"],
    liveUrl: "https://visionary-lebkuchen-725bb0.netlify.app/",
    delay: 0.1,
    preview: {
      type: 'website',
      title: 'サイトプレビュー',
      url: 'https://visionary-lebkuchen-725bb0.netlify.app/'
    }
  },
];