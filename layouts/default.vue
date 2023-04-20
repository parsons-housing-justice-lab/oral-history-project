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
  </main>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import { useTextBlocksStore } from '@/store/textBlocks';
import { usePagesStore } from '@/store/pages';

export default {
  name: 'IndexPage',

  async mounted() {
    this.loadTextBlocks();
    this.loadPages();
    /*
    const params = this.$route.query;
    this.$store.dispatch('map/loadQueryParams', { params });
    this.$store.dispatch('data/loadLocations', { params });
    */
  },

  computed: {
    ...mapState(useTextBlocksStore, {
      title: store => store.byType('Title')[0],
    }),
  },

  methods: {
    ...mapActions(useTextBlocksStore, ['loadTextBlocks']),
    ...mapActions(usePagesStore, ['loadPages']),
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
  --border-width: 8px;

  background: white;
  border-left: var(--border-width) solid var(--color-dark-gray);
  border-bottom: var(--border-width) solid var(--color-dark-gray);
  padding: 3rem;
  padding-left: 2rem;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1000;
  max-height: 100vh;
  overflow-y: auto;
  min-width: 10%;
}
</style>

<style>
@custom-media --mobile (max-width: 500px);

html {
  box-sizing: border-box;

  --main-font-family: 'Noto Sans', sans-serif;
  --title-font-family: 'PT Sans', sans-serif;

  --color-dark-gray: #231F20;
}

*, *:before, *:after {
  box-sizing: inherit;
}

body {
  font-family: var(--main-font-family);
  margin: 0;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--title-font-family);
  text-transform: uppercase;
}

.content h2 {
  margin: 0;
}

.page-wide {
  width: 60vw;
}

.page-medium {
  width: 40vw;
}

.page-narrow {
  width: 20vw;
}
</style>
