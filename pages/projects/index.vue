<template>
  <div class="page-medium">
    <h2>Oral History Projects</h2>
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
</style>
