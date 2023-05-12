import { defineStore } from 'pinia';
import { getLocations } from "@/connectors/airtable";
import { toGeoJson } from '@/transformers/locations';

export const useLocationsStore = defineStore('locations', {
  state: () => ({
    locations: [],
  }),

  getters: {
    byId: state => id => state.locations
      .filter(({ Id }) => '' + Id === id),

    locationsGeoJson: (state) => toGeoJson(state.locations),
  },

  actions: {
    async loadLocations() {
      if (this.locations.length > 0) return;
      let locations = await getLocations();
      this.locations = locations;
    },
  },
});
