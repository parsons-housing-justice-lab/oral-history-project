import svgLoader from 'vite-svg-loader';

export default defineNuxtConfig({
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

  css: ['~/assets/css/main.css'],

  googleFonts: {
    families: {
      'Noto+Sans': [400, 700],
      'PT+Sans': [400, 700],
    },
  },

  compatibilityDate: '2024-12-18',
})