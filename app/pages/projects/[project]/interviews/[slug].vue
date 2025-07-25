<template>
  <div class="interview-page page-wide">
    <div class="navigation-back">
      <NuxtLink :to="`/projects/${project.Slug}`">&lt; {{ project.Name }}</NuxtLink>
    </div>

    <h1>{{ interview.Name }}</h1>

    <div class="fields">
      <div class="row">
        <div v-if="interview.Photo" class="column">
          <img class="photo" :src="interview.Photo.full" />
        </div>
        <FieldColumn class="tight-column">
          <Field label="Collection">
            {{ project.Name }}
          </Field>
          <Field label="Interviewer">
            {{ interview.Interviewer }}
          </Field>
          <Field label="Date">
            {{ interview.Date }}
          </Field>
          <Field label="Language">
            {{ interview.Language }}
          </Field>
        </FieldColumn>
      </div>
      <div class="row">
        <FieldColumn class="description-column-left">
          <Field label="Interview Description">
            <RichText :text="interview.Description" />
          </Field>
        </FieldColumn>
        <FieldColumn class="description-column-right">
          <!-- TODO subcategories? -->
          <Field v-if="interview.Themes" label="Themes">
            <RichText :text="interview.Themes" />
          </Field>
          <Field v-if="interview.People" label="People">
            <RichText :text="interview.People" />
          </Field>
          <Field v-if="interview.Keywords" label="Keywords">
            <RichText :text="interview.Keywords" />
          </Field>
          <Field v-if="interview.Places" label="Places">
            <RichText :text="interview.Places" />
          </Field>
          <Field v-if="interview.Campaigns" label="Campaigns">
            <RichText :text="interview.Campaigns" />
          </Field>
        </FieldColumn>
      </div>
      <FieldColumn>
        <Field label="Audio">
          <iframe
            width="100%"
            height="20"
            scrolling="no"
            frameborder="no"
            allow="autoplay"
            :src="interview['Audio Embed URL']"
          ></iframe>
        </Field>
        <Field class="index" label="Index">
          <RichText :text="interview.Index" />
        </Field>
        <Field label="Transcription">
          <CollapsibleSection initial-height="10.5em">
            <TranscriptionSection :transcription="interview.Transcription" />
          </CollapsibleSection>
        </Field>
        <Field label="Citation">
          <RichText :text="interview.Citation" />
        </Field>
      </FieldColumn>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import { useInterviewsStore } from '@/store/interviews';
import { useProjectsStore } from '@/store/projects';

export default {
  async mounted() {
  },

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
}
</script>

<style scoped>
.interview-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.fields {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.row {
  display: flex;
  flex-direction: row;
  gap: 1rem;
}

.column {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.photo {
  max-width: 300px;
}

.description-column-left {
  width: 67%
}

.description-column-right {
  width: 33%
}

.tight-column {
  gap: 1.5rem;
}

.tight-column .field {
  gap: 0.25rem;
}

.index {
  background: #F1F0F0;
  padding: 1rem;
}

.navigation-back {
  font-size: 0.9em;
  margin-bottom: 2rem;
}
</style>

<style>
.interview-page .index th {
  display: none;
}

.interview-page .index td {
  vertical-align: top;
  padding: 0.5rem;
}
</style>
