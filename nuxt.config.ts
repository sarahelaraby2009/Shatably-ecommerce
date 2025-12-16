// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01', // ✅ تاريخ صحيح

  devtools: { enabled: true },

  modules: ['@nuxtjs/tailwindcss'],

  plugins: [
    '~/plugins/firebase.client.js',
    '~/plugins/fontawesome.js'
  ],

  css: [
    '@fortawesome/fontawesome-svg-core/styles.css',
    '~/assets/css/main.css'
  ],

  runtimeConfig: {
    openrouterKey: process.env.OPENROUTER_KEY,
    
    public: {
      firebaseApiKey: process.env.NUXT_PUBLIC_FIREBASE_API_KEY,
      firebaseAuthDomain: process.env.NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      firebaseProjectId: process.env.NUXT_PUBLIC_FIREBASE_PROJECT_ID,
      firebaseStorageBucket: process.env.NUXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      firebaseMessagingSenderId: process.env.NUXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      firebaseAppId: process.env.NUXT_PUBLIC_FIREBASE_APP_ID,
      firebaseMeasurementId: process.env.NUXT_PUBLIC_FIREBASE_MEASUREMENT_ID
    }
  },

  // ✅ إضافة هذا للتأكد من عمل Rollup صح
  vite: {
    build: {
      rollupOptions: {
        external: []
      }
    }
  },

  vue: {
    compilerOptions: {
      whitespace: 'preserve'
    }
  }
});