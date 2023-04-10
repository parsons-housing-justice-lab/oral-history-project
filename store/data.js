import { defineStore } from 'pinia';
import { toGeoJson } from '@/transformers/locations';

export const useDataStore = defineStore('data', {
  state: () => ({
    locations: [],
  }),

  getters: {
    locationsGeoJson: (state) => toGeoJson(state.locations),
  },

  actions: {
    setCenter(value) {
      this.center = value;
    },

    setZoom(value) {
      this.zoom = value;
    },

    setPosition(center, zoom) {
      this.center = center;
      this.zoom = zoom;
      // TODO handle stateful URL
      // pushToURL: getPositionParams(center, zoom)
    },

    setHoveredFeature(feature) {
      this.hoveredFeature = JSON.parse(JSON.stringify(feature));
    },
  },
});
