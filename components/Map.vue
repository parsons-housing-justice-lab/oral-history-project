<template>
  <div id="map" class="map"></div>
</template>

<script>
import mapboxgl from 'mapbox-gl';
import '../node_modules/mapbox-gl/dist/mapbox-gl.css';
import { mapActions, mapState, mapStores } from 'pinia';
import {
  INITIAL_CENTER,
  INITIAL_ZOOM,
  MAPBOX_ACCESS_TOKEN,
  MAPBOX_STYLE,
  MAXIMUM_EXTENT,
} from "@/constants";
import { useLocationsStore } from '@/store/locations';
import { useMapStore } from '@/store/map';

export default {
  data() {
    return {
      accessToken: MAPBOX_ACCESS_TOKEN,
      flyToInProgress: false,
      style: MAPBOX_STYLE,
      hovered: false,

      center: INITIAL_CENTER,
      zoom: INITIAL_ZOOM,
    };
  },

  mounted() {
    mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;
    this.$nextTick(() => this.initializeMap());
  },

  computed: {
    ...mapStores(useMapStore),
    ...mapState(useLocationsStore, ['locationsGeoJson']),

    locationsLayer() {
      return {
        id: 'locations',
        type: 'symbol',
        source: 'locations-source',
        layout: {
          'icon-allow-overlap': true,
          'icon-image': 'CLT-Coop-MHA',
          'icon-size': [
            'interpolate', ['linear'], ['zoom'],
            12, 0.5,
            16, 1.5,
          ]
        },
      };
    },

    locationsSource() {
      return {
        type: 'geojson',
        data: this.locationsGeoJson,
      };
    },

    highlightedFeatures() {
      // TODO pinia
      return [];
      // return this.$store.getters['map/highlightedFeatures'];
    },

    storeCenter() {
      return INITIAL_CENTER;
      // TODO pinia
      // return this.$store.state.map.center;
    },

    storeZoom() {
      // TODO pinia
      // return this.$store.state.map.zoom;
      return INITIAL_ZOOM;
    },

    unselectedLayers() {
      // return this.$store.getters['layerPicker/unselectedLayers'];
      // TODO pinia
      return [];
    },

    selectedLayers() {
      // return this.$store.getters['layerPicker/selectedLayers'];
      // TODO pinia
      return [];
    },
  },

  methods: {
    ...mapActions(useMapStore, [
      'setPosition',
    ]),

    initializeMap() {
      const map = new mapboxgl.Map({
        container: 'map',
        style: this.style,
        maxBounds: MAXIMUM_EXTENT,
        center: this.center,
        zoom: this.zoom,
        projection: 'naturalEarth',
      });

      map.on('load', this.mapLoaded);
      map.on('click', this.handleClick);
      map.on('move', this.handleMove);
      map.on('moveend', this.handleMoveEnd);
    },

    addLocationsSource() {
      // TODO detect existing and overwrite
      this.map.addSource('locations-source', this.locationsSource);
    },

    addLocationsLayer() {
      // TODO detect existing and overwrite
      this.map.addLayer(this.locationsLayer);
    },

    async mapLoaded(e) {
      this.map = e.target;
      this.map.jumpTo({
        center: this.storeCenter,
        zoom: this.storeZoom
      });


      this.addLocationsSource();

      await this.loadIcons();
      this.addLocationsLayer();
    },

    loadIcons() {
      // TODO better way to reference subdir
      // TODO async / return promise
      // TODO add other icons
      this.map.loadImage('/oral-history-project/map-icons/CLT.png', (error, image) => {
        if (error) throw error;
        if (!this.map.hasImage('CLT')) this.map.addImage('CLT', image);
      });

      this.map.loadImage('/oral-history-project/map-icons/CLT-Coop-MHA.png', (error, image) => {
        if (error) throw error;
        if (!this.map.hasImage('CLT')) this.map.addImage('CLT-Coop-MHA', image);
      });
    },

    handleClick(e) {
      // TODO pinia
      /*
      const selectedFeatures = this.map.queryRenderedFeatures(
        e.mapboxEvent.point, { layers: [this.locationsLayer.id] }
      );
      this.$store.dispatch("popup/setSelectedFeatures", { selectedFeatures });
       */
    },

    handleMouseMove(e) {
      const feature = e.mapboxEvent.features[0];
      if (feature) {
        const layer = feature.layer.id;
        const id = feature.id;
        // TODO pinia
        // this.$store.dispatch("map/setHoveredFeature", { layer, id });
      } else {
        // TODO pinia
        // this.$store.dispatch("map/setHoveredFeature", {});
      }

      this.hovered = true;
    },

    handleMouseLeave() {
      // TODO pinia
      // this.$store.dispatch("map/setHoveredFeature", {});
      this.hovered = false;
    },

    handleMove() {
      if (this.flyToInProgress) return;
      const center = this.map.getCenter();
      const zoom = this.map.getZoom();
      this.setPosition(center, zoom);
    },

    handleMoveEnd() {
      this.flyToInProgress = false;
    },

    moveToStorePosition() {
      if (!this.map || this.flyToInProgress) return;
      if (
        this.map.getCenter().lat === this.storeCenter.lat &&
        this.map.getCenter().lng === this.storeCenter.lng &&
        this.map.getZoom() === this.storeZoom
      ) return;
      this.flyToInProgress = true;
      this.map.flyTo({
        center: this.storeCenter,
        zoom: this.storeZoom,
      });
    },

    changeLayersVisibility(layerIds, visibility) {
      layerIds.forEach(layerId => {
        this.map.setLayoutProperty(layerId, 'visibility', visibility);
      });
    },

    hideUnselectedLayers() {
      this.unselectedLayers.forEach(layer => {
        this.changeLayersVisibility(layer.layerIds, 'none');
      });
    },

    showSelectedLayers() {
      this.selectedLayers.forEach(layer => {
        this.changeLayersVisibility(layer.layerIds, 'visible');
      });
    },
  },

  watch: {
    unselectedLayers() {
      this.hideUnselectedLayers();
    },

    selectedLayers() {
      this.showSelectedLayers();
    },

    highlightedFeatures(currentValue, previousValue) {
      let layer = currentValue?.[0]?.layer;
      let ids = currentValue.map(({ id }) => id);
      let iconImageExpression;
      let symbolSortKeyExpression;

      if (layer && ids) {
        iconImageExpression = [
          "case",
          ["in", ['get', 'ID'], ["literal", ids]],
          ['concat', 'marker_', ['get', 'sectorSlug'], '_highlight'],
          ['concat', 'marker_', ['get', 'sectorSlug']],
        ];
        symbolSortKeyExpression = [
          "case",
          ["in", ['get', 'ID'], ["literal", ids]],
          1,
          0,
        ];
      } else {
        ({ layer } = previousValue?.[0] ?? {});
        iconImageExpression = ['concat', 'marker_', ['get', 'sectorSlug']];
        symbolSortKeyExpression = 0;
      }

      if (layer) {
        this.map.setLayoutProperty(layer, 'icon-image', iconImageExpression);
        this.map.setLayoutProperty(layer, 'symbol-sort-key',
          symbolSortKeyExpression);
      }
    },

    storeCenter() {
      this.moveToStorePosition();
    },

    storeZoom() {
      this.moveToStorePosition();
    },
  }
}
</script>

<style>
.map,
.mapboxgl-map {
  height: 100%;
  width: 100%;
}

.map.hovered {
  cursor: pointer;
}
</style>
