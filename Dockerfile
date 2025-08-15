# Cloud Run用のカスタムLMS Dockerfile
FROM node:18-alpine

# 作業ディレクトリを設定
WORKDIR /app

# システム依存関係をインストール
RUN apk add --no-cache git

# package.jsonをコピーしてルート依存関係をインストール
COPY package*.json ./
RUN npm ci --only=production

# フロントエンドの依存関係をインストール
COPY frontend/package*.json ./frontend/
RUN cd frontend && npm ci --only=production

# アプリケーションファイルをコピー
COPY . .

# frappe-uiサブモジュールを初期化（必要な場合）
RUN git submodule update --init --recursive || echo "No submodules to initialize"

# フロントエンドをビルド
RUN cd frontend && npm run build

# 本番用サーバー設定
ENV NODE_ENV=production
ENV PORT=8080

# ポート8080を公開
EXPOSE 8080

# PM2をグローバルインストール
RUN npm install -g pm2

# ヘルスチェック
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8080/ || exit 1

# アプリケーション起動
CMD ["pm2-runtime", "start", "ecosystem.cloudrun.json"]