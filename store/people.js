import { defineStore } from 'pinia';
import { getPeople } from "@/connectors/airtable";

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
      const people = await getPeople();

      this.people = people.sort((a, b) => a.Order - b.Order);
    },
  },
});

