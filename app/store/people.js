import { defineStore } from 'pinia';
import { getPeople } from "@/connectors/file";

export const usePeopleStore = defineStore('people', {
  state: () => ({
    people: [],
  }),

  getters: {
    team: state => state.people.filter(({ Type }) => Type === 'Team'),
    collaborators: state => state.people.filter(({ Type }) => Type === 'Collaborator'),
  },

  actions: {
    async loadPeople() {
      if (this.people.length > 0) return;
      this.people = await getPeople();
    },
  },
});
