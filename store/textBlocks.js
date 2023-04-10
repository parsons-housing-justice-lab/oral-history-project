import { defineStore } from 'pinia';
import { getTextBlocks } from "@/connectors/airtable";

export const useTextBlocksStore = defineStore('textBlocks', {
  state: () => ({
    textBlocks: [],
  }),

  getters: {
    byType: state => type => state.textBlocks
      .filter(({ Type }) => Type === type)
      .map(({ Content }) => Content.trim()),
  },

  actions: {
    async loadTextBlocks() {
      this.textBlocks = await getTextBlocks();
    },
  },
});
