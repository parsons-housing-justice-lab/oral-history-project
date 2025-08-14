import { defineStore } from 'pinia';

export const useTextBlocksStore = defineStore('textBlocks', {
  state: () => ({
    textBlocks: [],
  }),

  getters: {
    byType: state => type => state.textBlocks
      .filter(({ Type }) => Type === type)
      .map(({ Content }) => Content.trim()),
  },
});
