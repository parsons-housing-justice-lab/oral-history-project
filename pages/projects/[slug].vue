<template>
  <div class="page-wide">
    <h2>{{ project.Name }}</h2>

    <FieldColumn>
      <Field label="About">
        <RichText class="field-value" :text="project.About" />
      </Field>
      <Field label="Project Goals and Methods">
        <RichText class="field-value" :text="project.Goals" />
      </Field>
      <Field label="Team and Collaborators">
        <RichText class="field-value" :text="project.Team" />
      </Field>
      <Field label="Oral History Interviews">
        <ul class="plain-list">
          <li
            v-for="interview in interviews"
            :key="interview.Slug"
          >
            <NuxtLink :to="`/projects/${project.Slug}/interviews/${interview.Slug}`">
              {{ interview.Name }}
            </NuxtLink>
          </li>
        </ul>
      </Field>
      <Field label="Overarching Themes">
        <ul class="plain-list">
          <li
            v-for="theme in project.Themes"
            :key="theme"
          >
            {{ theme }}
          </li>
        </ul>
      </Field>
      <Field label="Connect">
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
              <a :href="project.Site">{{ project.Site }}</a>
            </span>
          </div>
        </div>
      </Field>
    </FieldColumn>

    <!-- TODO add other custom sections -->
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

.plain-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
</style>
