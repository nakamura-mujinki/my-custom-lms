# Custom LMS - デプロイメントガイド

このドキュメントは、カスタムLMS（Frappe Learningフォーク版）のデプロイメントオプションについて説明します。

## 🚀 デプロイメントオプション

### 1. 開発環境（ローカル）

最も簡単な開発環境での起動：

```bash
# リポジトリクローン
git clone https://github.com/nakamura-mujinki/lms.git
cd lms

# 依存関係インストール
npm install
cd frontend && npm install && cd ..

# 開発サーバー起動（PM2使用）
npm run start

# アクセス
# フロントエンド: http://localhost:8080
```

### 2. Docker使用（推奨）

完全なLMS（バックエンド+フロントエンド）をDockerで起動：

```bash
# プロジェクトクローン
git clone https://github.com/nakamura-mujinki/lms.git
cd lms

# Dockerで起動
cd docker
docker-compose up -d

# アクセス
# フルアプリケーション: http://localhost:8000/lms
# 初期ログイン: Administrator / admin
```

### 3. クラウドデプロイメント

#### Frappe Cloud（推奨）
```bash
# Frappe Cloud アカウント作成後
# プライベートリポジトリからデプロイ可能
# 詳細: https://frappecloud.com
```

#### 自作サーバー（VPS/Dedicated）
```bash
# Ubuntu 20.04+ サーバーでの例

# Frappeの簡単インストールスクリプト使用
wget https://frappe.io/easy-install.py

python3 ./easy-install.py deploy \
    --project=custom_lms_prod \
    --email=your-email@example.com \
    --image=ghcr.io/frappe/lms \
    --version=stable \
    --app=lms \
    --sitename=your-domain.com
```

## 🔧 本番環境設定

### PM2プロセスマネジメント

```bash
# PM2でプロダクション起動
pm2 start ecosystem.config.json

# プロセス監視
pm2 monit

# ログ確認
pm2 logs --lines 200

# 自動起動設定
pm2 startup
pm2 save
```

### Nginx設定例

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:8000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # 静的ファイル配信
    location /assets/ {
        alias /path/to/lms/assets/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

## 🔐 セキュリティ設定

### 1. 環境変数の設定

```bash
# .env ファイル作成
cat > .env << EOF
NODE_ENV=production
DB_HOST=localhost
DB_PORT=5432
DB_NAME=lms_prod
DB_USER=lms_user
DB_PASS=secure_password_here
SESSION_SECRET=your-super-secret-session-key
ENCRYPTION_KEY=your-encryption-key
EOF
```

### 2. ファイアウォール設定

```bash
# UFWの場合
sudo ufw allow ssh
sudo ufw allow 80
sudo ufw allow 443
sudo ufw enable
```

### 3. SSL証明書（Let's Encrypt）

```bash
# Certbot インストール
sudo apt install certbot python3-certbot-nginx

# SSL証明書取得
sudo certbot --nginx -d your-domain.com
```

## 📊 監視・メンテナンス

### ログ監視

```bash
# リアルタイムログ監視
pm2 logs lms-frontend --lines 100

# システムログ
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log
```

### バックアップ

```bash
# データベースバックアップ
pg_dump lms_prod > backup_$(date +%Y%m%d).sql

# ファイルバックアップ
tar -czf files_backup_$(date +%Y%m%d).tar.gz /path/to/lms/files
```

### アップデート

```bash
# コード更新
git pull origin my-lms-fork

# 依存関係更新
npm install
cd frontend && npm install && cd ..

# サービス再起動
pm2 restart ecosystem.config.json
```

## ⚡ パフォーマンス最適化

### 1. フロントエンド最適化

```bash
# ビルド最適化
cd frontend
npm run build

# 結果を本番サーバーにコピー
cp -r dist/* /var/www/lms/frontend/
```

### 2. データベース最適化

```sql
-- インデックス作成例
CREATE INDEX idx_user_email ON tabUser(email);
CREATE INDEX idx_course_status ON tabCourse(status);
```

### 3. キャッシュ設定

```bash
# Redis設定（オプション）
sudo apt install redis-server
sudo systemctl enable redis-server
```

## 🚨 トラブルシューティング

### よくある問題

1. **ポート8080が使用中**
   ```bash
   sudo lsof -i :8080
   pm2 restart lms-frontend
   ```

2. **依存関係エラー**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Permission エラー**
   ```bash
   sudo chown -R www-data:www-data /path/to/lms
   chmod -R 755 /path/to/lms
   ```

## 📞 サポート

- **Issue報告**: [GitHub Issues](https://github.com/nakamura-mujinki/lms/issues)
- **フォーク版ドキュメント**: [README-FORK.md](./README-FORK.md)
- **オリジナル版サポート**: [Frappe Community](https://discuss.frappe.io/c/lms/70)

---
**注意**: このデプロイメントガイドはカスタムフォーク版専用です。オリジナル版とは設定が異なる場合があります。