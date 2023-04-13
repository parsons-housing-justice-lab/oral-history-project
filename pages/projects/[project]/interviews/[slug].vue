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

  /*
<iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src=""></iframe>
  */

  computed: {
    ...mapState(useProjectsStore, {
      projectBySlug: 'bySlug',
    }),

    ...mapState(useInterviewsStore, {
      interviewBySlug: 'bySlug',
    }),

    interview() {
      return this.interviewBySlug(this.$route.params.slug)?.[0] ?? {};
    },

    project() {
      return this.projectBySlug(this.$route.params.project)?.[0] ?? {};
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
