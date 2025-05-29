export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  features: string[];
  challenges: string[];
  liveUrl?: string;
  githubUrl?: string;
  images: string[];
  delay?: number;
}

export const projects: Project[] = [
  {
    id: "picklet",
    title: "Picklet",
    description: "洋服の着用履歴を管理する衣類コーディネートアプリ",
    longDescription: "Pickletは、普段着る洋服の管理と着用履歴を記録できるアプリです。どの服をいつ着たかを追跡し、着用回数や最後に着た日付を可視化することで、効率的なワードローブ管理をサポートします。直感的なUIでコーディネートの記録と分析を簡単に行えます。",
    technologies: ["TypeScript", "React", "Local Storage", "CSS Modules"],
    features: [
      "洋服の着用履歴記録",
      "着用回数の自動カウント",
      "最終着用日の追跡",
      "着用頻度の可視化",
      // "コーディネート履歴の確認"
    ],
    challenges: [
      "ローカルストレージでの効率的なデータ管理",
      "直感的なUI/UXデザインの実装",
      // "将来のサーバー連携を考慮した設計"
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
  },
];