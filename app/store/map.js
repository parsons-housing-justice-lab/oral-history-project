import { defineStore } from 'pinia';
import {
  INITIAL_CENTER,
  INITIAL_ZOOM,
} from '@/constants';

export const useMapStore = defineStore('map', {
  state: () => ({
    initialCenter: { ...INITIAL_CENTER },
    initialZoom: INITIAL_ZOOM,
    center: { ...INITIAL_CENTER },
    zoom: INITIAL_ZOOM,
    hoveredFeature: {},
  }),

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
})
