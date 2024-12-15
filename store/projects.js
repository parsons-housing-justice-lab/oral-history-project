import { defineStore } from 'pinia';
import { getProjects } from "@/connectors/airtable";

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

  actions: {
    async loadProjects() {
      if (this.projects.length > 0) return;
      let projects = await getProjects();

      projects = projects.map(p => ({
        ...p,
        Site: p.Site.startsWith('http') ? p.Site : `https://${p.Site}`,
      }));

      this.projects = projects;
    },
  },
});
