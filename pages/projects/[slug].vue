<template>
  <div class="page-wide">
    <h2>{{ project.Name }}</h2>

    <div class="short-fields">
      <div class="short-field" v-if="project.Keywords?.length ?? false">
        <span class="label">Keywords:</span>
        <span class="value">{{ project.Keywords.join(', ') }}</span>
      </div>
      <div class="short-field" v-if="project.Contact">
        <span class="label">Contact:</span>
        <span class="value">{{ project.Contact }}</span>
      </div>
      <div class="short-field" v-if="project.Site">
        <span class="label">Site:</span>
        <span class="value">
          <a href="project.Site">{{ project.Site }}</a>
        </span>
      </div>
    </div>
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
import { mapState } from 'pinia';
import { useInterviewsStore } from '@/store/interviews';
import { useProjectsStore } from '@/store/projects';

export default {
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
}
</script>

<style scoped>
.short-fields {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: 1rem 0;
}

.short-field {
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
}

.label {
  font-weight: bold;
}
</style>
