<template>
  <main>
    <Head>
      <Title>{{ title }}</Title>
    </Head>

    <ClientOnly>
      <Map />
    </ClientOnly>

    <Sidebar />

    <div class="content" v-if="showContent">
      <div
        class="welcome-close"
        v-if="showWelcomeClose"
        @click="welcomeHidden = true"
      >&times;</div>
      <slot />
    </div>
  </main>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import { useLocationsStore } from '@/store/locations';
import { useTextBlocksStore } from '@/store/textBlocks';
import { usePagesStore } from '@/store/pages';
import { useInterviewsStore } from '@/store/interviews';
import { useProjectsStore } from '@/store/projects';

export default {
  name: 'IndexPage',

  data() {
    return {
      welcomeHidden: false,
    };
  },

  async mounted() {
    this.loadLocations();
    this.loadTextBlocks();
    this.loadPages();
    this.loadProjects();
    this.loadInterviews();
    /*
    const params = this.$route.query;
    this.$store.dispatch('map/loadQueryParams', { params });
    */
  },

  computed: {
    ...mapState(useTextBlocksStore, {
      title: store => store.byType('Title')[0],
    }),

    showContent() {
      return !this.welcomeHidden || this.$route.path !== '/';
    },

    showWelcomeClose() {
      return this.$route.path === '/';
    },
  },

  methods: {
    ...mapActions(useTextBlocksStore, ['loadTextBlocks']),
    ...mapActions(usePagesStore, ['loadPages']),
    ...mapActions(useInterviewsStore, ['loadInterviews']),
    ...mapActions(useProjectsStore, ['loadProjects']),
    ...mapActions(useLocationsStore, ['loadLocations']),
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

.welcome-close {
  cursor: pointer;
  display: flex;
  flex-direction: row;
  font-size: 2.5rem;
  line-height: 2rem;
  margin-top: -2.5rem;
  margin-right: -2.5rem;
  justify-content: flex-end;
}
</style>
