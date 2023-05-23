import { defineStore } from 'pinia';

export const useWelcomeStore = defineStore('welcome', {
  state: () => ({
    show: true,
  }),

  actions: {
    toggleShow() {
      this.show = true;
    },

    toggleHide() {
      this.show = false;
    },
  },
});
