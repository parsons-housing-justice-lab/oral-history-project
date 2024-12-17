import { defineStore } from 'pinia';
import { getInterviews } from "@/connectors/airtable";

export const useInterviewsStore = defineStore('interviews', {
  state: () => ({
    interviews: [],
  }),

  getters: {
    byId: state => id => {
      let searchId = id;
      if (typeof searchId === 'number') searchId += '';
      return state.interviews.filter(({ Id }) => '' + Id === searchId);
    },

    bySlug: state => slug => state.interviews
      .filter(({ Slug }) => Slug === slug),

    byProject: state => id => state.interviews
      .filter(({ Projects }) => Projects?.includes(id)) ?? false,
  },

  actions: {
    async loadInterviews() {
      if (this.interviews.length > 0) return;
      this.interviews = (await getInterviews()).map((interview) => ({
        ...interview,
        Transcription: [
          interview.Transcription,
          interview['Transcription 2'],
        ].filter(v => !!v).join('\n')
      }));
    },
  },
});
