<template>
  <div class="page-medium">
    <h1>Oral History Projects</h1>
    <PageSections name="Oral History Projects" />
    <div class="filters">
      <div class="filters-row">
        <select v-model="selectedTheme">
          <option value="">search by theme</option>
          <option
            v-for="theme in themes"
            :key="theme"
          >
            {{ theme }}
          </option>
        </select>
        <select v-model="selectedCategory">
          <option value="">search by category</option>
          <option
            v-for="category in categories"
            :key="category"
          >
            {{ category }}
          </option>
        </select>
      </div>
      <div>
        <input v-model="searchInput" type="search" placeholder="Search within oral histories" />
      </div>
    </div>
    <div>
      <SearchResults :search-active="searchInput.length >= 3" :results="searchResults" />
    </div>
  </div>
</template>

<script setup>
import { useInterviewsStore } from '@/store/interviews';
import { useProjectsStore } from '@/store/projects';

const selectedTheme = ref('');
const selectedCategory = ref('');
const searchInput = ref('');

const interviewsStore = useInterviewsStore();
const projectsStore = useProjectsStore();

const interviews = computed(() => interviewsStore.interviews);
const projects = computed(() => projectsStore.projects);

const filteredProjects = computed(() => {
  return projects.value
    .filter((project) => {
      let match = true;
      if (selectedTheme.value !== '') {
        match = project?.Themes?.includes(selectedTheme.value) ?? false;
      }
      if (selectedCategory.value !== '') {
        match = project?.Keywords?.includes(selectedCategory.value) ?? false;
      }
      return match;
    })
});

const themes = computed(() => {
  const allThemes = projects.value
    .map(({ Themes }) => Themes)
    .flat()
    .filter(theme => !!theme);
  return [...new Set(allThemes)]
    .sort((a, b) => a.localeCompare(b));
});

const categories = computed(() => {
  const allCategories = projects.value
    .map(({ Keywords }) => Keywords)
    .flat()
    .filter(category => !!category);
  return [...new Set(allCategories)]
    .sort((a, b) => a.localeCompare(b));
});

const searchResults = computed(() => {
  if (searchInput.value.length < 3) return getNullSearch(filteredProjects.value,
    interviews.value);

  // TODO if too many results, add message 

  return searchProjects(filteredProjects.value, interviews.value, searchInput.value);
});
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  margin-top: 2rem;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

select {
  background: black;
  color: white;
  padding: 0.5rem;
  border: none;
}

input[type="search"] {
  font-size: 1.1em;
  padding: 0.25em;
  width: 50%;
}

.filters {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.filters-row {
  display: flex;
  flex-direction: row;
  gap: 2rem;
}
</style>
