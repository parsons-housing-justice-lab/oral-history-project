<template>
  <div class="page-medium">
    <h2>Oral History Projects</h2>
    <PageSections name="Oral History Projects" />
    <div>
      <ul>
        <li
          v-for="project in projects"
          :key="project.Slug"
        >
          <NuxtLink :to="`/projects/${project.Slug}`">{{ project.Name }}</NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from 'pinia';
import { useProjectsStore } from '@/store/projects';

export default {
  computed: {
    ...mapState(useProjectsStore, ['projects']),
  },
}
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

ul a {
  color: black;
  text-decoration: none;
}

ul a:hover {
  text-decoration: underline;
}
</style>
