// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  routeRules: {
    '/api/**': { cors: true, headers: { 'access-control-allow-methods': 'GET, POST, DELETE, PUT' } },
    'https://api.leandrocesar.com/**': { cors: true, headers: { 'access-control-allow-methods': 'GET, POST, DELETE, PUT' } },
  },
  runtimeConfig: {
    apiSecret: '', // can be overridden by NUXT_API_SECRET environment variable
    public: {
      apiBase: '', // can be overridden by NUXT_PUBLIC_API_BASE environment variable
    }
  },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
      link: [
              { rel: 'manifest', href: '/manifest.webmanifest' }
            ],
      meta: [
        // { name: 'theme-color', content: '#8d00ab' },
        // { name: 'theme-color', content: '#8d00ab' },
        { name: "viewport", content: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" }
      ],
      noscript: [
        // <noscript>JavaScript is required</noscript>
        { children: 'JavaScript is required' }
      ]
    },
  },
  css: [
    '~/assets/main.css'
  ],
  modules: [
  '@nuxt/content',
  'nuxt-icon',
    '@vueuse/nuxt',
    '@nuxtjs/color-mode'
  ],
  // plugins: ['~/plugins/chart.js'],
  content: {
    // https://content.nuxtjs.org/api/configuration
  }
})
