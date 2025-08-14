import { defineStore } from 'pinia';

export const usePeopleStore = defineStore('people', {
  state: () => ({
    people: [],
  }),

  getters: {
    team: state => state.people.filter(({ Type }) => Type === 'Team'),
    collaborators: state => state.people.filter(({ Type }) => Type === 'Collaborator'),
  },
});
