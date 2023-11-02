<template>
  <main>
    <Head>
      <Title>{{ title }} {{ route.path }}</Title>
    </Head>

    <ClientOnly>
      <Map />
    </ClientOnly>

    <Sidebar />

    <div class="content" v-show="welcomeShown || route.path !== '/'">
      <div
        class="welcome-close"
        v-if="route.path === '/'"
        @click="welcomeShown = false"
      >&times;</div>
      <slot />
    </div>
  </main>
</template>

<script setup>
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useLocationsStore } from '@/store/locations';
import { useTextBlocksStore } from '@/store/textBlocks';
import { useWelcomeStore } from '@/store/welcome';
import { usePagesStore } from '@/store/pages';
import { usePeopleStore } from '@/store/people';
import { useProjectAttachmentsStore } from '@/store/projectAttachments';
import { useInterviewsStore } from '@/store/interviews';
import { useProjectsStore } from '@/store/projects';

const interviewsStore = useInterviewsStore();
const locationsStore = useLocationsStore();
const pagesStore = usePagesStore();
const peopleStore = usePeopleStore();
const projectAttachmentsStore = useProjectAttachmentsStore();
const projectsStore = useProjectsStore();
const textBlocksStore = useTextBlocksStore();
const welcomeStore = useWelcomeStore();

const route = useRoute();

onMounted(() => {
  locationsStore.loadLocations();
  textBlocksStore.loadTextBlocks();
  pagesStore.loadPages();
  peopleStore.loadPeople();
  projectsStore.loadProjects();
  projectAttachmentsStore.loadProjectAttachments();
  interviewsStore.loadInterviews();
});

const title = computed(() => textBlocksStore.byType('Title')[0]);
const { show: welcomeShown } = storeToRefs(welcomeStore);
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
  font-size: 0.9em;
  padding: 2rem;
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
  margin-top: -1.5rem;
  margin-right: -1.5rem;
  justify-content: flex-end;
}
</style>
