<template>
  <div class="search-results">
    <SearchResultsProject
      v-for="project in results"
      :key="project.id"
      :project-id="project.id"
      :interviews="project.interviews"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  results: Array,
});

const { results } = toRefs(props);
</script>

<style scoped>
.search-results {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
