// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
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
    // ✅ Server-side only (خاص - لا يظهر للعميل)
    openrouterKey: process.env.OPENROUTER_KEY,
    
    // ✅ Public (عام - يظهر للعميل)
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

  vue: {
    compilerOptions: {
      whitespace: 'preserve'
    }
  }
});