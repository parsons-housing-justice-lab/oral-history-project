<template>
  <div class="page-wide">
    <h2>Oral History Projects</h2>
    <h3>{{ project.Name }}</h3>
    <div>{{ project.Description }}</div>
    <div>
      Interviews:
      <ul>
        <li
          v-for="interview in interviews"
          :key="interview.Slug"
        >
          <NuxtLink :to="`/projects/${project.Slug}/interviews/${interview.Slug}`">
            {{ interview.Name }}
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import { useInterviewsStore } from '@/store/interviews';
import { useProjectsStore } from '@/store/projects';

export default {
  async mounted() {
    await this.loadProjects();
    await this.loadInterviews();
  },

  computed: {
    ...mapState(useProjectsStore, {
      projectBySlug: 'bySlug',
    }),

    ...mapState(useInterviewsStore, {
      interviewsByProject: 'byProject',
    }),

    interviews() {
      return this.interviewsByProject(this.project.id);
    },

    project() {
      return this.projectBySlug(this.$route.params.slug)?.[0] ?? {};
    },
  },

  methods: {
    ...mapActions(useInterviewsStore, [
      'loadInterviews',
    ]),

    ...mapActions(useProjectsStore, [
      'loadProjects',
    ]),
  },
}
</script>

<style scoped>
</style>
