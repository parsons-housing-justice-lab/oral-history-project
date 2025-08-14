import { defineStore } from 'pinia';

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
});
