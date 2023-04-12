<template>
  <div>
    <h2>Oral History Projects</h2>
    <h3>{{ project.Name }}</h3>
    <div>{{ project.Description }}</div>
    <div>
      Interviews:
      <ul>
        <li
          v-for="interview in interviews"
          :key="interview.Id"
        >
          <NuxtLink :to="`/projects/${project.Id}/interviews/${interview.Id}`">
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
      projectById: 'byId',
    }),

    ...mapState(useInterviewsStore, {
      interviewsByProject: 'byProject',
    }),

    interviews() {
      return this.interviewsByProject(this.project.id);
    },

    project() {
      return this.projectById(this.$route.params.id)?.[0] ?? {};
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
