// PostHog Mock for Standalone Development
// This is a minimal mock of PostHog library for development without analytics

(function() {
  'use strict';

  // PostHog Mock Implementation
  const posthogMock = {
    init: function(projectId, config) {
      console.info('PostHog Mock: init called', { projectId, config });
      if (config && config.loaded) {
        setTimeout(() => config.loaded(posthogMock), 100);
      }
      return this;
    },

    identify: function(distinctId, properties) {
      console.info('PostHog Mock: identify called', { distinctId, properties });
      return this;
    },

    capture: function(eventName, properties) {
      console.info('PostHog Mock: capture called', { eventName, properties });
      return this;
    },

    alias: function(alias, distinctId) {
      console.info('PostHog Mock: alias called', { alias, distinctId });
      return this;
    },

    set: function(properties) {
      console.info('PostHog Mock: set called', { properties });
      return this;
    },

    reset: function() {
      console.info('PostHog Mock: reset called');
      return this;
    },

    // Additional methods that might be called
    startRecording: function() {
      console.info('PostHog Mock: startRecording called');
      return this;
    },

    stopRecording: function() {
      console.info('PostHog Mock: stopRecording called');
      return this;
    },

    isFeatureEnabled: function(feature) {
      console.info('PostHog Mock: isFeatureEnabled called', { feature });
      return false; // デフォルトでは機能を無効
    },

    // Properties
    config: {},
    persistence: {},
    sessionRecording: {}
  };

  // Global window object に PostHog を設定
  if (typeof window !== 'undefined') {
    window.posthog = posthogMock;
    
    // PostHog を配列形式でも提供（初期化待ちの場合）
    if (!window.posthog.length) {
      window.posthog.length = 0;
    }
  }

  // CommonJS/AMD/ES6 module support
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = posthogMock;
  }

  console.info('PostHog Mock loaded for development environment');
})();