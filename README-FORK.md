# My Custom LMS - Frappe Learning Fork

**カスタマイズされた学習管理システム (Frappe Learning のフォーク版)**

## 概要

これは[Frappe Learning](https://github.com/frappe/lms)のフォーク版で、独自の機能とカスタマイゼーションが追加されています。

## 🚀 フォーク版の特徴

### オリジナル機能に加えた改良点
- **カスタム ブランディング**: 独自のロゴとスタイリング
- **改良されたユーザーエクスペリエンス**: より直感的なインターフェース
- **追加セキュリティ機能**: 強化されたユーザー認証
- **パフォーマンス最適化**: フロントエンド読み込み速度の向上
- **拡張アナリティクス**: 詳細な学習進捗トラッキング

### 開発環境の改善
- **PM2統合**: より安定したプロセス管理
- **npm対応**: yarnなしでの開発が可能
- **自動デプロイメント**: 簡素化されたデプロイプロセス

## 📦 インストール

### 必要要件
- Node.js (v20+)
- npm
- PM2 (プロセス管理)
- Python 3.8+ (バックエンド用)

### クイックスタート

1. **リポジトリのクローン**
   ```bash
   git clone https://github.com/nakamura-mujinki/lms.git
   cd lms
   ```

2. **依存関係のインストール**
   ```bash
   npm install
   cd frontend && npm install && cd ..
   ```

3. **開発サーバーの起動**
   ```bash
   npm run start
   ```

4. **アプリケーションにアクセス**
   - フロントエンド: http://localhost:8080
   - 管理画面: http://localhost:8000 (バックエンドが動作している場合)

## 🛠️ 開発

### フロントエンドの開発
```bash
cd frontend
npm run dev
```

### PM2を使った本番運用
```bash
# 起動
npm run start

# 状態確認
pm2 status

# ログ確認
pm2 logs lms-frontend --nostream

# 停止
npm run stop

# 再起動
npm run restart
```

## 🎨 カスタマイゼーション

### ブランディングの変更
フロントエンドの `src/components/UserDropdown.vue` でアプリ名とロゴを変更できます。

### テーマのカスタマイズ
`frontend/src/index.css` でTailwindCSSを使用したスタイルの変更が可能です。

## 📈 追加機能 (計画中)

- [ ] **ダッシュボード強化**: 学習者向けの詳細な進捗ダッシュボード
- [ ] **通知システム**: リアルタイム通知機能
- [ ] **API拡張**: RESTful API の機能拡張
- [ ] **モバイル最適化**: PWA対応の強化
- [ ] **多言語サポート**: 日本語を含む多言語対応

## 🤝 コントリビューション

このフォーク版への貢献を歓迎します：

1. フォークして独自ブランチを作成
2. 機能を追加・修正
3. テストを実行
4. プルリクエストを作成

## 📄 ライセンス

AGPL-3.0-or-later (オリジナルのライセンスを継承)

## 🙏 謝辞

このプロジェクトは [Frappe Technologies](https://github.com/frappe/lms) の素晴らしいLMSシステムを基盤として構築されています。

## 📞 サポート

- **Issue**: [GitHub Issues](https://github.com/nakamura-mujinki/lms/issues)
- **オリジナル版ドキュメント**: [Frappe Learning Docs](https://docs.frappe.io/learning)

---
**注意**: これはFrappe Learningの非公式フォークです。公式サポートについては[オリジナルリポジトリ](https://github.com/frappe/lms)をご確認ください。