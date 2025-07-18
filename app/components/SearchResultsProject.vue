<template>
  <div class="search-results-project">
    <span class="title">
      <NuxtLink :to="`/projects/${project.Slug}`">{{ project.Name }}</NuxtLink>
      <div v-if="searchActive" class="results-count">
        {{ interviews.length }} results
      </div>
    </span>
    <div v-if="searchActive && interviewsToShow.length > 0" class="interviews-list">
      <SearchResultsInterview
        v-for="interview in interviewsToShow"
        :key="interview.id"
        :interview-id="interview.id"
        :matches="interview.matches"
        :project-slug="project.Slug"
      />
    </div>
    <template v-if="searchActive">
      <button v-if="couldExpand" class="expand-toggle" @click="expanded = true">show more</button>
      <button v-if="couldCollapse" class="expand-toggle" @click="expanded = false">show less</button>
    </template>
  </div>
</template>

<script setup>
import { useProjectsStore } from '@/store/projects';

const projectsStore = useProjectsStore();

const props = defineProps({
  projectId: Number,
  searchActive: Boolean,
  interviews: Array,
});

const { projectId, searchActive, interviews } = toRefs(props);

const expanded = ref(false);
const collapsedCount = 3;

const project = computed(() => projectsStore.byId(projectId.value)[0]);

const interviewsToShow = computed(() => expanded.value ? interviews.value :
  interviews.value.slice(0, collapsedCount));

const couldExpand = computed(() => !expanded.value && (interviews.value.length >
  collapsedCount));

const couldCollapse = computed(() => expanded.value && (interviews.value.length >
  collapsedCount));
</script>

<style scoped>
.search-results-project {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: stretch;
}

.title {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1.5rem;
}

.title a {
  font-weight: bold;
  font-size: 1.1em;
  text-decoration: underline;
}

.title .results-count {
  font-size: 0.9em;
  color: #9d9d9d;
}

.interviews-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-left: 1rem;
}

.expand-toggle {
  appearance: none;
  border: 0;
  background: 0;
  font-weight: bold;
  cursor: pointer;
}
</style>
