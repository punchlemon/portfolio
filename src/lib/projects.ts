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
    id: "ecommerce-platform",
    title: "E-commerce Platform",
    description: "Next.jsとStripeを使った現代的なECサイト",
    longDescription: "フルスタックのEコマースプラットフォームで、ユーザー認証、商品管理、決済処理、注文管理機能を含んでいます。レスポンシブデザインと高いパフォーマンスを実現しています。",
    technologies: ["Next.js", "TypeScript", "Stripe", "Prisma", "PostgreSQL"],
    features: [
      "ユーザー認証・認可",
      "商品カタログ・検索",
      "ショッピングカート",
      "Stripe決済統合",
      "注文履歴管理",
      "管理者ダッシュボード"
    ],
    challenges: [
      "複雑な在庫管理システムの実装",
      "セキュアな決済フローの構築",
      "パフォーマンス最適化"
    ],
    images: ["/projects/ecommerce-1.jpg", "/projects/ecommerce-2.jpg"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example/ecommerce",
    delay: 0.1,
  },
  {
    id: "task-management",
    title: "Task Management App",
    description: "リアルタイム機能付きのタスク管理アプリ",
    longDescription: "チーム向けのリアルタイムタスク管理アプリケーション。Socket.ioを使用してリアルタイム更新を実現し、直感的なドラッグ&ドロップインターフェースを提供します。",
    technologies: ["React", "Node.js", "Socket.io", "MongoDB", "Express"],
    features: [
      "リアルタイム更新",
      "ドラッグ&ドロップ操作",
      "チームコラボレーション",
      "タスクの優先度設定",
      "期限管理",
      "プロジェクト管理"
    ],
    challenges: [
      "リアルタイム同期の実装",
      "複雑なUI状態管理",
      "スケーラブルなアーキテクチャ設計"
    ],
    images: ["/projects/task-1.jpg", "/projects/task-2.jpg"],
    liveUrl: "https://example.com/tasks",
    githubUrl: "https://github.com/example/task-app",
    delay: 0.2,
  },
  {
    id: "weather-dashboard",
    title: "Weather Dashboard",
    description: "APIを活用した天気予報ダッシュボード",
    longDescription: "複数の天気APIを統合した包括的な天気ダッシュボード。インタラクティブなチャートと地図表示で、詳細な気象情報を視覚化します。",
    technologies: ["React", "Chart.js", "OpenWeatherMap API", "Mapbox"],
    features: [
      "現在の天気情報",
      "7日間の天気予報",
      "インタラクティブな地図",
      "気温・湿度・風速チャート",
      "位置情報ベースの検索",
      "お気に入り地点の保存"
    ],
    challenges: [
      "複数APIの統合",
      "リアルタイムデータの処理",
      "レスポンシブなチャート表示"
    ],
    images: ["/projects/weather-1.jpg", "/projects/weather-2.jpg"],
    liveUrl: "https://example.com/weather",
    githubUrl: "https://github.com/example/weather-dashboard",
    delay: 0.3,
  },
];