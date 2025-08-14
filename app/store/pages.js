import { defineStore } from 'pinia';

export const usePagesStore = defineStore('pages', {
  state: () => ({
    pages: [],
  }),

  getters: {
    byName: state => name => state.pages.find(({ Name }) => Name === name),
  },
});
