# STAGE 1: Builder - アプリケーションをビルドするステージ
FROM node:20-bookworm AS builder
WORKDIR /app

# 依存関係のインストールを効率化
COPY package*.json ./
RUN npm ci

# ソースコードをコピー
COPY . .

# アプリケーションをビルド
# ※このビルドを成功させるには、事前に next.config.js の修正と、コードのエラー修正が必要です
RUN npm run build


# STAGE 2: Runner - ビルドしたアプリを実行するステージ
FROM node:20-slim AS runner
WORKDIR /app
ENV NODE_ENV production

# next.config.jsに output: 'standalone' を設定すると、この構成が機能します

# 必要なファイルだけをbuilderステージからコピー
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

# server.js を実行してアプリを起動
CMD ["node", "server.js"]
