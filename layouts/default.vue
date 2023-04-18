<template>
  <main>
    <Head>
      <Title>{{ title }}</Title>
    </Head>

    <ClientOnly>
      <Map />
    </ClientOnly>

    <Sidebar />

    <div class="content">
      <slot />
    </div>

      <!--
    <InfoButton />
    <LogoButton />
    <LayerPickerButton />
    <InfoWindow v-if="infoVisible" />
    <ImageModal v-if="imageModalOpen" />
    <LayerPicker v-if="layerPickerVisible" />
      -->
  </main>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import { useTextBlocksStore } from '@/store/textBlocks';

export default {
  name: 'IndexPage',

  async mounted() {
    this.loadTextBlocks();
    /*
    const params = this.$route.query;
    this.$store.dispatch('map/loadQueryParams', { params });
    this.$store.dispatch('data/loadLocations', { params });
    this.$store.dispatch('content/loadSectors');
    */
  },

  computed: {
    ...mapState(useTextBlocksStore, {
      title: store => store.byType('Title')[0],
    }),

    /*
    imageModalOpen() {
      return this.$store.state.imageModal.open;
    },

    infoVisible() {
      return this.$store.state.info.visible;
    },

    layerPickerVisible() {
      return this.$store.state.layerPicker.visible;
    },
    */
  },

  methods: {
    ...mapActions(useTextBlocksStore, [
      'loadTextBlocks',
    ]),
  },
}
</script>

<style scoped>
main {
  display: flex;
  height: 100vh;
  width: 100vw;
}

.content {
  background: white;
  padding: 1rem;
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 1000;
  max-height: calc(100vh - 2rem);
  overflow-y: auto;
  width: 50%;
}
</style>

<style>
@custom-media --mobile (max-width: 500px);

html {
  box-sizing: border-box;

  --main-font-family: 'Noto Sans', sans-serif;
  --title-font-family: 'Open Sans', sans-serif;

  --color-dark-gray: #231F20;
}

*, *:before, *:after {
  box-sizing: inherit;
}

body {
  font-family: var(--main-font-family);
  margin: 0;
}

.content h2 {
  margin: 0;
}
</style>
