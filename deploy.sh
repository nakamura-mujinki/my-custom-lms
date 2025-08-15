#!/bin/bash

# Custom LMS Cloud Run デプロイスクリプト

set -e

# 色付きログ出力用
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Custom LMS Cloud Run デプロイメント開始${NC}"

# Google Cloud プロジェクトIDを設定（環境変数または引数から）
if [ -z "$1" ] && [ -z "$GOOGLE_CLOUD_PROJECT" ]; then
    echo -e "${RED}エラー: Google Cloud プロジェクトIDを指定してください${NC}"
    echo "使用方法: ./deploy.sh PROJECT_ID"
    echo "または環境変数 GOOGLE_CLOUD_PROJECT を設定してください"
    exit 1
fi

PROJECT_ID=${1:-$GOOGLE_CLOUD_PROJECT}
REGION="us-central1"
SERVICE_NAME="my-custom-lms"

echo -e "${YELLOW}プロジェクトID: $PROJECT_ID${NC}"
echo -e "${YELLOW}リージョン: $REGION${NC}"
echo -e "${YELLOW}サービス名: $SERVICE_NAME${NC}"

# Google Cloud認証確認
echo -e "${BLUE}📋 Google Cloud認証状態を確認中...${NC}"
if ! gcloud auth list --filter=status:ACTIVE --format="value(account)" | grep -q .; then
    echo -e "${RED}エラー: Google Cloudにログインしてください${NC}"
    echo "実行: gcloud auth login"
    exit 1
fi

# プロジェクト設定
echo -e "${BLUE}🔧 プロジェクト設定中...${NC}"
gcloud config set project $PROJECT_ID

# 必要なAPIを有効化
echo -e "${BLUE}🛠️  必要なAPIを有効化中...${NC}"
gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com
gcloud services enable containerregistry.googleapis.com

# Cloud Buildでビルド・デプロイ実行
echo -e "${BLUE}🏗️  Docker イメージをビルド中...${NC}"
gcloud builds submit --config=cloudbuild.yaml

# デプロイ結果確認
echo -e "${BLUE}📊 デプロイメント状態を確認中...${NC}"
SERVICE_URL=$(gcloud run services describe $SERVICE_NAME --region=$REGION --format="value(status.url)")

if [ ! -z "$SERVICE_URL" ]; then
    echo -e "${GREEN}✅ デプロイメント成功！${NC}"
    echo -e "${GREEN}🌐 アプリケーションURL: $SERVICE_URL${NC}"
    echo ""
    echo -e "${BLUE}📝 追加情報:${NC}"
    echo "   - サービス名: $SERVICE_NAME"
    echo "   - リージョン: $REGION"
    echo "   - プロジェクト: $PROJECT_ID"
    echo ""
    echo -e "${YELLOW}💡 管理コマンド:${NC}"
    echo "   - ログ確認: gcloud run logs tail $SERVICE_NAME --region=$REGION"
    echo "   - サービス削除: gcloud run services delete $SERVICE_NAME --region=$REGION"
else
    echo -e "${RED}❌ デプロイメントに失敗しました${NC}"
    exit 1
fi