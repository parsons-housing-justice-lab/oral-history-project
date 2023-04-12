import { defineStore } from 'pinia';
import { getProjects } from "@/connectors/airtable";

export const useProjectsStore = defineStore('projects', {
  state: () => ({
    projects: [],
  }),

  getters: {
    byId: state => id => state.projects
      .filter(({ Id }) => '' + Id === id),
  },

  actions: {
    async loadProjects() {
      if (this.projects.length > 0) return;
      this.projects = await getProjects();
    },
  },
});
