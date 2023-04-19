import svgLoader from 'vite-svg-loader';

export default defineNuxtConfig({
  app: {
    baseURL: '/oral-history-project/',
  },

  vite: {
    plugins: [
      svgLoader(),
    ],
  },

  generate: {
    fallback: true,
  },

  modules: [
    '@pinia/nuxt',
    '@nuxtjs/google-fonts',
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
      'PT+Sans': [400, 700],
    },
  },
})
