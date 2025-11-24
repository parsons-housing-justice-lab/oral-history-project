import { defineStore } from 'pinia';

export const useThemesStore = defineStore('themes', {
  state: () => ({
    themes: [],
  }),

  getters: {
    byId: state => ids => {
      return state.themes.map(theme => {
        const matchingSubthemes = theme.subthemes
          .filter(({ id }) => ids?.includes(id) ?? false);
        if (matchingSubthemes.length === 0) return null;
        return {
          ...theme,
          subthemes: matchingSubthemes,
        };
      }).filter(v => !!v);
    },
  },
});
