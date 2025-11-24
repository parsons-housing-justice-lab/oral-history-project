<template>
  <div class="page-medium">
    <h1>Oral History Projects</h1>
    <PageSections name="Oral History Projects" />
    <div class="filters">
      <div class="filters-row">
        <input v-model="searchInput" type="search" placeholder="Search within oral histories" />
      </div>
      <div class="filters-row">
        <select v-model="selectedTheme" class="themes-input">
          <option value="">search by theme</option>
          <optgroup
            v-for="theme in themes"
            :key="theme.id"
            :label="theme.name"
          >
            <option
              v-for="subtheme in theme.subthemes"
              :key="subtheme.id"
              :value="subtheme.id"
            >
              {{ subtheme.name }}
            </option>
          </optgroup>
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
    </div>
    <div class="too-generic-message" v-if="searchInput.length >= 3 && mostInterviewsInSearchResults">
      This query matched most of the interviews, try something more specific.
    </div>
    <div>
      <SearchResults :search-active="searchInput.length >= 3 && !mostInterviewsInSearchResults" :results="preparedSearchResults" />
    </div>
  </div>
</template>

<script setup>
import { useInterviewsStore } from '@/store/interviews';
import { useProjectsStore } from '@/store/projects';
import { useThemesStore } from '@/store/themes';

const selectedTheme = ref('');
const selectedCategory = ref('');
const searchInput = ref('');

const interviewsStore = useInterviewsStore();
const projectsStore = useProjectsStore();
const themesStore = useThemesStore();

const interviews = computed(() => interviewsStore.interviews);
const projects = computed(() => projectsStore.projects);
const { themes } = storeToRefs(themesStore);

const filteredProjects = computed(() => {
  return projects.value
    .filter((project) => {
      let match = true;
      if (selectedTheme.value !== '') {
        match = project?.['Themes (new)']?.includes(selectedTheme.value) ?? false;
      }
      if (selectedCategory.value !== '') {
        match = project?.Keywords?.includes(selectedCategory.value) ?? false;
      }
      return match;
    })
});

const categories = computed(() => {
  const allCategories = projects.value
    .map(({ Keywords }) => Keywords)
    .flat()
    .filter(category => !!category);
  return [...new Set(allCategories)]
    .sort((a, b) => a.localeCompare(b));
});

const nullSearch = computed(() => {
  return getNullSearch(filteredProjects.value, interviews.value);
});

const searchResults = computed(() => {
  if (searchInput.value.length < 3) return nullSearch.value;
  return searchProjects(filteredProjects.value, interviews.value, searchInput.value);
});

const mostInterviewsInSearchResults = computed(() => {
  const searchResultsInterviewCount = searchResults.value
    .map(({ interviews }) => interviews).flat().length;
  return searchResultsInterviewCount >= (interviews.value.length * .97);
});

const preparedSearchResults = computed(() => {
  return mostInterviewsInSearchResults.value ? nullSearch.value : searchResults.value;
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
  margin-bottom: 2rem;
}

.filters-row {
  display: flex;
  flex-direction: row;
  gap: 2rem;
}

.too-generic-message {
  font-size: 0.9em;
  margin-bottom: 1rem;
  font-style: italic;
}

.themes-input {
  text-transform: capitalize;
}
</style>
