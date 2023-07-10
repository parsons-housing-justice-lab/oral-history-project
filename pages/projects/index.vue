<template>
  <div class="page-medium">
    <h1>Oral History Projects</h1>
    <PageSections name="Oral History Projects" />
    <div class="filters">
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
      <input type="search" />
    </div>
    <div>
      <ul>
        <li
          v-for="project in filteredProjects"
          :key="project.Slug"
        >
          <NuxtLink :to="`/projects/${project.Slug}`">{{ project.Name }}</NuxtLink>
          <div v-if="project.Name === 'Cooper Square Community Land Trust'"
            class="search-result">
            <div class="title">
              Tom Angotti
            </div>
            <div class="text">
              "[...] Then went to get my Ph.D. at Rutgers University in New Jersey in
              <strong>urban planning</strong>.[...]" 
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { useProjectsStore } from '@/store/projects';

const selectedTheme = ref('');
const selectedCategory = ref('');

const projectsStore = useProjectsStore();

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

select,
input {
  background: black;
  color: white;
  padding: 0.5rem;
  border: none;
}

.filters {
  display: flex;
  flex-direction: row;
  gap: 2rem;
}

.search-result {
  margin-left: 2rem;
  margin-top: 1rem;
  margin-bottom: 2rem;
  font-size: 0.9em;
}

.search-result .text {
  margin-top: 0.5rem;
  margin-left: 1rem;
  font-size: 0.9em;
}
</style>
