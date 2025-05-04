import { defineStore } from 'pinia';
import { getLocations } from "@/connectors/file";
import { toGeoJson, toPolygonGeoJson } from '@/transformers/locations';

export const useLocationsStore = defineStore('locations', {
  state: () => ({
    locations: [],
  }),

  getters: {
    byId: state => id => state.locations
      .filter(({ Id }) => '' + Id === id),

    pointsGeoJson: (state) => toGeoJson(state.locations),

    polygonsGeoJson: (state) => toPolygonGeoJson(state.locations),
  },

  actions: {
    async loadLocations() {
      if (this.locations.length > 0) return;
      let locations = await getLocations();
      this.locations = locations;
    },
  },
});
