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
import { mapActions, mapState } from 'pinia';
import { useProjectsStore } from '@/store/projects';

export default {
  name: 'ProjectsPage',

  mounted() {
    this.loadProjects();
  },

  computed: {
    ...mapState(useProjectsStore, ['projects']),
  },

  methods: {
    ...mapActions(useProjectsStore, [
      'loadProjects',
    ]),
  },
}
</script>

<style scoped>
</style>
