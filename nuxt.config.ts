export default defineNuxtConfig({
  app: {
    baseURL: '/oral-history-project/',
  },

  generate: {
    fallback: true,
  },

  buildModules: [
    '@nuxtjs/google-fonts',
  ],

  modules: [
    '@pinia/nuxt',
  ],

  postcss: {
    plugins: {
      autoprefixer: {},
      'postcss-custom-media': {},
    },
  },

  googleFonts: {
    families: {
      'Noto+Sans': [400, 700],
      'Open+Sans': [400, 500, 700],
    },
  },
})