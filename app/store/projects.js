import { defineStore } from 'pinia';

export const useProjectsStore = defineStore('projects', {
  state: () => ({
    projects: [],
  }),

  getters: {
    byId: state => id => {
      let searchId = id;
      if (typeof searchId === 'number') searchId += '';
      return state.projects.filter(({ Id }) => '' + Id === searchId);
    },

    bySlug: state => slug => state.projects
      .filter(({ Slug }) => Slug === slug),
  },
});
