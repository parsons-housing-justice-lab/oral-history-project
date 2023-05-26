import { defineStore } from 'pinia';
import { getInterviews } from "@/connectors/airtable";

export const useInterviewsStore = defineStore('interviews', {
  state: () => ({
    interviews: [],
  }),

  getters: {
    byId: state => id => state.interviews
      .filter(({ Id }) => '' + Id === id),

    bySlug: state => slug => state.interviews
      .filter(({ Slug }) => Slug === slug),

    byProject: state => id => state.interviews
      .filter(({ Projects }) => Projects?.includes(id)) ?? false,
  },

  actions: {
    async loadInterviews() {
      if (this.interviews.length > 0) return;
      this.interviews = await getInterviews();
    },
  },
});
