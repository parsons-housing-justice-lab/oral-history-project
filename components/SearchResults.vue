<template>
  <div class="search-results">
    <SearchResultsProject
      v-for="project in results"
      :key="project.id"
      :project-id="project.id"
      :interviews="project.interviews"
      :search-active="searchActive"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  searchActive: Boolean,
  results: Array,
});

const { results, searchActive } = toRefs(props);
</script>

<style scoped>
.search-results {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
