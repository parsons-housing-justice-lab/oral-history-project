<template>
  <div class="map-wrapper">
    <div id="map" class="map"></div>
    <map-legend />
  </div>
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
import { useProjectsStore } from '@/store/projects';
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
    ...mapState(useLocationsStore, {
      locationPointsGeoJson: 'pointsGeoJson',
      locationPolygonsGeoJson: 'polygonsGeoJson',
    }),
    ...mapState(useProjectsStore, ['projects']),

    locationPointsLayer() {
      return {
        id: 'locations',
        type: 'symbol',
        source: 'locations-source',
        layout: {
          'icon-allow-overlap': true,
          'icon-image': [
            'match',
            ['get', 'type'],
            'CLT', 'CLT',
            'MHA', 'MHA',
            'Community Organizing', 'Community Organizing',
            'Rezoning', 'Rezoning',
            'Tenants', 'Tenants',
            'Tenants',
          ],
          'icon-size': [
            'interpolate', ['linear'], ['zoom'],
            12, 0.5,
            16, 1.5,
          ],
          'symbol-sort-key': ['get', 'typeOrder'],
        },
      };
    },

    locationPointsSource() {
      return {
        type: 'geojson',
        data: this.locationPointsGeoJson,
      };
    },

    locationPolygonsSource() {
      return {
        type: 'geojson',
        data: this.locationPolygonsGeoJson,
      };
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

    selectedProjectSlug() {
      const { name, params } = this.$route;
      if (name === 'projects-slug') return params.slug;
      if (name === 'projects-project-interviews-slug') return params.project;
      return null;
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
      map.on('click', ['locations'], this.handleClick);
      map.on('mouseenter', ['locations'], this.handleMouseEnter);
      map.on('mouseleave', ['locations'], this.handleMouseLeave);
      map.on('move', this.handleMove);
      map.on('moveend', this.handleMoveEnd);
    },

    addLocationPointsSource() {
      const existingSource = this.map.getSource('locations-source');
      if (existingSource) {
        existingSource.setData(this.locationPointsGeoJson);
      }
      else {
        this.map.addSource('locations-source', this.locationPointsSource);
      }
    },

    addLocationPolygonsSource() {
      const existingSource = this.map.getSource('locations-polygons-source');
      if (existingSource) {
        existingSource.setData(this.locationPolygonsGeoJson);
      }
      else {
        this.map.addSource('location-polygons-source', this.locationPolygonsSource);
      }
    },

    addLocationPolygonsLayer() {
      this.map.addLayer({
        id: 'location-polygons',
        type: 'fill',
        source: 'location-polygons-source',
        paint: {
          'fill-pattern': 'fill', // TODO by feature
        },
        layout: {
          visibility: 'none',
        },
      }, 'road-label-simple');
    },

    addLocationPointsLayer() {
      if (this.map.getLayer(this.locationPointsLayer.id)) return;
      this.map.addLayer(this.locationPointsLayer);
    },

    async mapLoaded(e) {
      this.map = e.target;
      this.map.jumpTo({
        center: this.storeCenter,
        zoom: this.storeZoom
      });

      this.addLocationPointsSource();
      this.addLocationPolygonsSource();

      await this.loadIcons();
      this.addLocationPointsLayer();
      this.addLocationPolygonsLayer();
    },

    async loadIcon(name, path) {
      return new Promise((resolve, reject) => {
        const mapIconsPath = 'map-icons';
        const fullpath = `/${mapIconsPath}/${path}`;
        this.map.loadImage(fullpath, (error, image) => {
          if (error) return reject(error);
          if (!this.map.hasImage(name)) this.map.addImage(name, image);
          return resolve();
        });
      });
    },

    async loadIcons() {
      // TODO add other icons
      const icons = [
        {
          name: 'CLT',
          path: 'CLT.png',
        },
        {
          name: 'MHA',
          path: 'coops.png',
        },
        {
          name: 'Community Organizing',
          path: 'homeless.png',
        },
        {
          name: 'Rezoning',
          path: 'rezoning.png',
        },
        {
          name: 'Tenants',
          path: 'tenants.png',
        },
        {
          name: 'fill',
          path: 'fill.png',
        },
      ];
      return Promise.all(icons.map(({ name, path }) => this.loadIcon(name, path)));
    },

    handleClick(e) {
      const projectId = e.features[0].properties.project;
      if (!projectId) return;

      const project = this.projects.find(({ id }) => id === projectId);
      if (!project) return;

      navigateTo(`/projects/${project.Slug}`);
    },

    handleMouseEnter(e) {
      const feature = e.features[0];
      if (feature) {
        const layer = feature.layer.id;
        const id = feature.id;
        // TODO tooltip

        this.map.setFilter('location-polygons', 
          ['==', ['get', 'project'], feature.properties.project],
        );
        this.map.setLayoutProperty('location-polygons', 'visibility', 'visible');
      }

      this.hovered = true;
    },

    handleMouseLeave() {
      this.map.setFilter('location-polygons', null);
      this.map.setLayoutProperty('location-polygons', 'visibility', 'none');
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
  },

  watch: {
    storeCenter() {
      this.moveToStorePosition();
    },

    storeZoom() {
      this.moveToStorePosition();
    },

    selectedProjectSlug() {
      // TODO add padding to map and zoom
    },
  }
}
</script>

<style>
.map-wrapper {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.map,
.mapboxgl-map {
  flex-grow: 1;
  height: 100%;
  width: 100%;
}

.map.hovered {
  cursor: pointer;
}
</style>
