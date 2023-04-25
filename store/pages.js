import { defineStore } from 'pinia';
import { getPages, getPageSections } from "@/connectors/airtable";

export const usePagesStore = defineStore('pages', {
  state: () => ({
    pages: [],
  }),

  getters: {
    byName: state => name => state.pages.find(({ Name }) => Name === name),
  },

  actions: {
    async loadPages() {
      if (this.pages.length > 0) return;
      const pages = await getPages();
      const pageSections = await getPageSections();

      this.pages = pages.map(page => {
        const sections = (
          page['page sections']
            ?.map(pageSection => pageSections.find(p => p.id === pageSection))
            ?? []
        ).sort((a, b) => a.Order - b.Order);
        return { ...page, sections };
      });
    },
  },
});
