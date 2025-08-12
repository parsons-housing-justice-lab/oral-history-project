import svgLoader from 'vite-svg-loader';
import interviews from './public/content/interviews.json'
import projects from './public/content/projects.json'

export default defineNuxtConfig({
  vite: {
    plugins: [
      svgLoader(),
    ],
  },

  nitro: {
    prerender: {
      routes: [
        ...projects.map(p => `/projects/${p.Slug}`),
        ...interviews
          .map(i => {
            // TODO bad slug in cities for people
            const project = projects.find(p => p.RecordId === i.Projects[0]);
            if (project.Slug.includes(',')) return null;
            return `/projects/${project.Slug}/interviews/${i.Slug}`;
          })
          .filter(v => !!v),
      ]
    },
  },

  modules: ['@pinia/nuxt', '@nuxtjs/google-fonts', '@nuxtjs/sitemap'],

  site: {
    url: 'https://housingjusticeoralhistory.org',
    name: 'Housing Justice Oral History Project',
  },

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
