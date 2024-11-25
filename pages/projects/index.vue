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
        <input v-model="searchInput" type="search" placeholder="search oral histories" />
      </div>
    </div>
    <div>
      <ul>
        <li
          v-for="project in filteredProjects"
          :key="project.Slug"
          class="project"
        >
          <span class="title">
            <NuxtLink :to="`/projects/${project.Slug}`">{{ project.Name }}</NuxtLink>
          </span>
          <div class="details" v-if="project.Name === 'Sunset Park is Not for Sale' && searchInput === 'rezoning'">
            <ul>
              <li>
                <span class="interview">
                  <NuxtLink
                    to="/projects/sunset-park-is-not-for-sale-12/interviews/marcela-mitaynes-59">Marcela
                    Mitaynes</NuxtLink>
                </span>
                <div class="preview">
                  <div class="transcription-matches">
                    <ul>
                      <li>
                        "[...] Talking about these big or more recent prices in the community, can you tell us a little bit about <strong>rezonings</strong> in the community? [...]"
                      </li>
                      <li>
                        "[...] And I think that we knew the <strong>rezoning</strong> was coming. [...]"
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { useInterviewsStore } from '@/store/interviews';
import { useProjectsStore } from '@/store/projects';

const selectedTheme = ref('');
const selectedCategory = ref('');
const searchInput = ref('');
const searchResults = ref([]);

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

watch(searchInput, (searchInput) => {
  if (searchInput.length < 3) searchResults.value = [];
  else {
    searchResults.value = searchProjects(projects.value, interviews.value, searchInput);
  }
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

.project .title {
  font-weight: bold;
  font-size: 1.25em;
  text-decoration: underline;
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

.preview {
  margin-bottom: 1em;
}

.details ul {
  margin: 0;
  padding: 0;
  margin-left: 1em;
  margin-top: 0.25em;
}

.details .interview a {
  text-decoration: underline;
}

.transcription-matches {
  margin-left: 1em;
}

.transcription-matches ul {
  list-style: disc;
  padding-left: 0.5em;
}
</style>
