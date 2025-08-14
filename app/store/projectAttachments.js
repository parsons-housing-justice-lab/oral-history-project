import { defineStore } from 'pinia';

export const useProjectAttachmentsStore = defineStore('projectAttachments', {
  state: () => ({
    projectAttachments: [],
  }),

  getters: {
    byProject: state => id => state.projectAttachments
      .filter(({ Project }) => Project?.includes(id)) ?? false,
  },
});
