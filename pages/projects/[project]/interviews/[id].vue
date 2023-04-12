<template>
  <div>
    <h2>Oral History Projects</h2>
    <h3>{{ project.Name }}</h3>
    <h4>{{ interview.Name }}</h4>
    <div class="interview-content">
      <div class="index" v-html="$mdRenderer.render(interview.Index || '')" />
      {{ interview.Description }}
      <!-- TODO embed -->
      <div>{{ interview }}</div>
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
      interviewById: 'byId',
    }),

    interview() {
      return this.interviewById(this.$route.params.id)?.[0] ?? {};
    },

    project() {
      return this.projectById(this.$route.params.project)?.[0] ?? {};
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
.interview-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
