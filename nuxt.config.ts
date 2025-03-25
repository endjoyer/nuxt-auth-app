// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  typescript: {
    strict: true,
    typeCheck: true,
  },

  css: ['~/assets/scss/main.scss'],

  modules: ['@pinia/nuxt'],

  app: {
    head: {
      title: 'Auth App',
      meta: [{ name: 'description', content: 'Auth Application with Nuxt 3' }],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
  },

  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_BASE_URL || '/api',
    },
  },

  compatibilityDate: '2025-03-25',
});
