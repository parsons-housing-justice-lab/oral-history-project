import { defineStore } from 'pinia';
import { getProjectAttachments } from "@/connectors/file";

export const useProjectAttachmentsStore = defineStore('projectAttachments', {
  state: () => ({
    projectAttachments: [],
  }),

  getters: {
    byProject: state => id => state.projectAttachments
      .filter(({ Project }) => Project?.includes(id)) ?? false,
  },

  actions: {
    async loadProjectAttachments() {
      if (this.projectAttachments.length > 0) return;
      this.projectAttachments = await getProjectAttachments();
    },
  },
});
