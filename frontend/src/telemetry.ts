// スタンドアロン開発環境対応：Frappeのposthogライブラリを条件付きインポート
import { createResource } from 'frappe-ui'

declare global {
  interface Window {
    posthog: any
  }
}

type PosthogSettings = {
  posthog_project_id: string
  posthog_host: string
  enable_telemetry: boolean
  telemetry_site_age: number
}

interface CaptureOptions {
  data: {
    user: string
    [key: string]: string | number | boolean | object
  }
}

// モックPosthogオブジェクト（スタンドアロン開発環境用）
const mockPosthog = {
  init: () => {},
  capture: () => {},
  identify: () => {},
  alias: () => {},
  reset: () => {},
  group: () => {},
  length: 0
}

// Posthogインスタンスの初期化（フォールバック付き）
let posthog: typeof window.posthog = window.posthog || mockPosthog

// スタンドアロン開発環境用のモック設定
const mockPosthogSettings = {
  posthog_project_id: '',
  posthog_host: '',
  enable_telemetry: false, // 開発環境では無効
  telemetry_site_age: 0
}

// Posthog Settings - 開発環境では固定値を使用
let posthogSettings = createResource({
  url: 'lms.lms.telemetry.get_posthog_settings',
  cache: 'posthog_settings',
  onSuccess: (ps: PosthogSettings) => initPosthog(ps),
  onError: () => {
    // バックエンドが利用できない場合はモック設定を使用
    console.info('Telemetry: Using mock settings (backend not available)');
    posthogSettings.data = mockPosthogSettings;
  }
})

let isTelemetryEnabled = () => {
  if (!posthogSettings.data) return false

  return (
    posthogSettings.data.enable_telemetry &&
    posthogSettings.data.posthog_project_id &&
    posthogSettings.data.posthog_host
  )
}

// Posthog Initialization
function initPosthog(ps: PosthogSettings) {
  if (!isTelemetryEnabled()) {
    console.info('Telemetry: Disabled or not configured')
    return
  }

  try {
    // 実際のPosthogが利用可能な場合のみ初期化
    if (posthog && posthog.init && typeof posthog.init === 'function') {
      posthog.init(ps.posthog_project_id, {
        api_host: ps.posthog_host,
        person_profiles: 'identified_only',
        autocapture: false,
        capture_pageview: true,
        capture_pageleave: true,
        enable_heatmaps: false,
        disable_session_recording: false,
        loaded: (ph: typeof posthog) => {
          window.posthog = ph
          ph.identify(window.location.hostname)
        },
      })
    } else {
      console.info('Telemetry: Using mock posthog (standalone development)')
    }
  } catch (error) {
    console.warn('Telemetry initialization error:', error)
  }
}

// Posthog Functions
function capture(
  event: string,
  options: CaptureOptions = { data: { user: '' } },
) {
  if (!isTelemetryEnabled()) return
  
  try {
    if (window.posthog && window.posthog.capture) {
      window.posthog.capture(`lms_${event}`, options)
    }
  } catch (error) {
    console.debug('Telemetry capture failed (expected in development):', error)
  }
}

function startRecording() {
}

function stopRecording() {
}

// Posthog Plugin
function posthogPlugin(app: any) {
    app.config.globalProperties.posthog = posthog
    
    // スタンドアロン開発環境では設定の取得をスキップすることがある
    try {
      // バックエンドが利用可能な場合のみ設定を取得
      if (window.frappe || window.location.pathname.includes('/lms')) {
        if (!window.posthog?.length) posthogSettings.fetch()
      } else {
        console.info('Telemetry: Standalone mode - using mock settings')
        posthogSettings.data = mockPosthogSettings
      }
    } catch (error) {
      console.info('Telemetry: Settings fetch failed, using mock settings')
      posthogSettings.data = mockPosthogSettings
    }
}

export {
  posthog,
  posthogSettings,
  posthogPlugin,
  capture,
  startRecording,
  stopRecording,
}
