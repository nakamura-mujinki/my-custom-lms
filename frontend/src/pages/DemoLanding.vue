<template>
  <div class="demo-landing">
    <!-- ヘッダー -->
    <div class="hero-section">
      <div class="hero-content">
        <div class="logo-container">
          <svg 
            width="120" 
            height="120" 
            viewBox="0 0 80 79" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            class="hero-logo"
          >
            <defs>
              <linearGradient id="hero-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#4F46E5;stop-opacity:1" />
                <stop offset="50%" style="stop-color:#7C3AED;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#EC4899;stop-opacity:1" />
              </linearGradient>
            </defs>
            <rect width="80" height="79" rx="16" fill="url(#hero-gradient)" />
            <rect x="25" y="22" width="30" height="35" rx="2" fill="white" />
            <line x1="30" y1="30" x2="50" y2="30" stroke="#4F46E5" stroke-width="1.5"/>
            <line x1="30" y1="35" x2="50" y2="35" stroke="#4F46E5" stroke-width="1.5"/>
            <line x1="30" y1="40" x2="45" y2="40" stroke="#4F46E5" stroke-width="1.5"/>
            <path d="M40 45 L42 49 L46 49 L43 52 L44 56 L40 54 L36 56 L37 52 L34 49 L38 49 Z" fill="#F59E0B" />
          </svg>
        </div>
        
        <h1 class="hero-title">Custom LMS へようこそ</h1>
        <p class="hero-subtitle">
          Frappe Learning のカスタムフォーク版<br>
          現在はスタンドアロン開発モードで動作中
        </p>
        
        <div class="status-cards">
          <div class="status-card success">
            <div class="status-icon">✅</div>
            <div class="status-content">
              <h3>Vue.js フロントエンド</h3>
              <p>正常に動作中</p>
            </div>
          </div>
          
          <div class="status-card warning">
            <div class="status-icon">⚠️</div>
            <div class="status-content">
              <h3>バックエンドAPI</h3>
              <p>開発モード（モック）</p>
            </div>
          </div>
          
          <div class="status-card info">
            <div class="status-icon">🎨</div>
            <div class="status-content">
              <h3>カスタムブランディング</h3>
              <p>適用済み</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 機能紹介セクション -->
    <div class="features-section">
      <h2 class="section-title">実装済み機能</h2>
      <div class="features-grid">
        <div class="feature-card">
          <div class="feature-icon">🎯</div>
          <h3>カスタムロゴ</h3>
          <p>独自のグラデーションデザインとアイコン</p>
        </div>
        
        <div class="feature-card">
          <div class="feature-icon">⚡</div>
          <h3>Vue.js 3 + Vite</h3>
          <p>モダンなフロントエンド環境</p>
        </div>
        
        <div class="feature-card">
          <div class="feature-icon">🐳</div>
          <h3>Docker 対応</h3>
          <p>コンテナベースデプロイメント</p>
        </div>
        
        <div class="feature-card">
          <div class="feature-icon">📱</div>
          <h3>レスポンシブデザイン</h3>
          <p>モバイル・デスクトップ対応</p>
        </div>
      </div>
    </div>

    <!-- リンクセクション -->
    <div class="links-section">
      <h2 class="section-title">関連リンク</h2>
      <div class="links-grid">
        <a 
          href="https://3001-iep68tmdyefszgtzou5d1-6532622b.e2b.dev" 
          target="_blank" 
          class="link-card"
        >
          <div class="link-icon">🎨</div>
          <div class="link-content">
            <h3>デモサイト</h3>
            <p>静的デモページ</p>
          </div>
        </a>
        
        <a 
          href="https://github.com/nakamura-mujinki/my-custom-lms" 
          target="_blank" 
          class="link-card"
        >
          <div class="link-icon">📦</div>
          <div class="link-content">
            <h3>GitHub</h3>
            <p>ソースコード</p>
          </div>
        </a>
        
        <a 
          href="#" 
          @click="navigateToCourses" 
          class="link-card"
        >
          <div class="link-icon">📚</div>
          <div class="link-content">
            <h3>コース一覧</h3>
            <p>学習コンテンツ</p>
          </div>
        </a>
      </div>
    </div>

    <!-- 開発者情報 -->
    <div class="dev-info">
      <h2 class="section-title">開発情報</h2>
      <div class="dev-details">
        <div class="dev-item">
          <strong>環境:</strong> スタンドアロン開発モード
        </div>
        <div class="dev-item">
          <strong>フロントエンド:</strong> Vue 3 + Vite + TailwindCSS
        </div>
        <div class="dev-item">
          <strong>状態管理:</strong> Pinia
        </div>
        <div class="dev-item">
          <strong>ルーティング:</strong> Vue Router
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const navigateToCourses = () => {
  router.push('/courses')
}
</script>

<style scoped>
.demo-landing {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.hero-section {
  text-align: center;
  padding: 3rem 0;
  background: linear-gradient(135deg, #4F46E5 0%, #7C3AED 50%, #EC4899 100%);
  border-radius: 20px;
  margin-bottom: 3rem;
  color: white;
}

.hero-content {
  padding: 2rem;
}

.logo-container {
  margin-bottom: 2rem;
}

.hero-logo {
  filter: drop-shadow(0 10px 20px rgba(0,0,0,0.2));
}

.hero-title {
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.hero-subtitle {
  font-size: 1.2rem;
  opacity: 0.9;
  margin-bottom: 2rem;
}

.status-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-top: 2rem;
}

.status-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.status-icon {
  font-size: 2rem;
}

.status-content h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
}

.status-content p {
  margin: 0;
  opacity: 0.8;
}

.features-section,
.links-section,
.dev-info {
  margin-bottom: 3rem;
}

.section-title {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #1F2937;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.feature-card {
  background: white;
  border-radius: 10px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.feature-card:hover {
  transform: translateY(-2px);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.links-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.link-card {
  background: white;
  border-radius: 10px;
  padding: 1.5rem;
  text-decoration: none;
  color: inherit;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.link-card:hover {
  transform: translateY(-2px);
}

.link-icon {
  font-size: 2rem;
}

.link-content h3 {
  margin: 0 0 0.5rem 0;
  color: #4F46E5;
}

.link-content p {
  margin: 0;
  color: #6B7280;
}

.dev-info {
  background: #F9FAFB;
  border-radius: 10px;
  padding: 2rem;
}

.dev-details {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.dev-item {
  padding: 1rem;
  background: white;
  border-radius: 8px;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .status-cards {
    grid-template-columns: 1fr;
  }
  
  .features-grid,
  .links-grid {
    grid-template-columns: 1fr;
  }
  
  .dev-details {
    grid-template-columns: 1fr;
  }
}
</style>