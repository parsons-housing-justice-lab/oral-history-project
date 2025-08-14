import { defineStore } from 'pinia';
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
});
