<template>
  <div class="page-wide">
    <div class="navigation-back">
      <NuxtLink to="/projects">&lt; Oral History Projects</NuxtLink>
    </div>

    <h1>{{ project.Name }}</h1>

    <FieldColumn>
      <Field v-if="project.Photo">
        <img class="photo" :src="project.Photo[0].url" />
      </Field>
      <Field v-if="project.About">
        <h2>About</h2>
        <RichText class="field-value" :text="project.About" />
      </Field>
      <Field v-if="project.Goals">
        <h2>Values, Purpose, and Methods</h2>
        <RichText class="field-value" :text="project.Goals" />
      </Field>
      <Field v-if="project.Team">
        <h2>Team and Collaborators</h2>
        <RichText class="field-value" :text="project.Team" />
      </Field>
      <Field v-if="interviews">
        <h2>Oral Histories</h2>
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
      <Field v-if="project.Themes">
        <h2>Overarching Themes</h2>
        <ul class="plain-list">
          <li
            v-for="theme in project.Themes"
            :key="theme"
          >
            {{ theme }}
          </li>
        </ul>
      </Field>
      <Field>
        <h2>Connect</h2>
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
h1 {
  margin-bottom: 2rem;
}

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

.navigation-back {
  font-size: 0.9em;
  margin-bottom: 2rem;
}

img {
  max-width: 100%;
  max-height: 25rem;
}
</style>
