# Custom LMS - GitHub Pages デモサイト

このディレクトリには、GitHub Pagesで公開されるCustom LMS（Frappe Learning フォーク版）のデモサイトが含まれています。

## 🌐 アクセスURL

**デモサイト**: [https://nakamura-mujinki.github.io/my-custom-lms/](https://nakamura-mujinki.github.io/my-custom-lms/)

## 📁 ファイル構成

```
docs/
├── index.html          # メインデモページ
└── README.md          # このファイル
```

## 🚀 GitHub Pages設定

このデモサイトは以下の設定で公開されています：

1. **リポジトリ設定**
   - Settings → Pages
   - Source: Deploy from a branch
   - Branch: `my-lms-fork`
   - Folder: `/docs`

2. **カスタムドメイン**（オプション）
   - 独自ドメインを設定する場合は `CNAME` ファイルを追加

## 🎨 特徴

- **レスポンシブデザイン**: モバイル・デスクトップ対応
- **カスタムブランディング**: 独自ロゴとグラデーション
- **アニメーション効果**: スムーズなフェードイン
- **動的コンテンツ**: GitHub API連携でスター数表示

## 🔧 ローカルテスト

```bash
# シンプルなローカルサーバーで確認
cd docs
python3 -m http.server 8080
# または
npx serve .
```

## 📱 PWA対応（将来）

- マニフェストファイル追加で PWA 対応可能
- オフライン対応
- アプリアイコン設定

## 🔗 関連リンク

- **メインリポジトリ**: [my-custom-lms](https://github.com/nakamura-mujinki/my-custom-lms)
- **フォーク元**: [Frappe Learning](https://github.com/frappe/lms)
- **開発版**: [Development Server](https://8080-iep68tmdyefszgtzou5d1-6532622b.e2b.dev)

---

このデモサイトは、Custom LMS の機能と特徴を紹介するためのスタティックページです。完全なアプリケーションの動作には、バックエンドサーバーとデータベース設定が必要です。