<template>
  <div class="interview-page page-wide">
    <h2>{{ interview.Name }}</h2>

    <div class="fields">
      <div class="row">
        <div v-if="interview.Photo" class="column">
          <!-- TODO get more robustly -->
          <img class="photo" :src="interview.Photo[0].url" />
        </div>
        <div class="column">
          <div class="field">
            <div class="field-label">Collection</div>
            <div class="field-value">{{ project.Name }}</div>
          </div>
          <div class="field">
            <div class="field-label">Interviewer</div>
            <div class="field-value">{{ interview.Interviewer }}</div>
          </div>
          <div class="field">
            <div class="field-label">Date</div>
            <div class="field-value">{{ interview.Date }}</div>
          </div>
          <div class="field">
            <div class="field-label">Language</div>
            <div class="field-value">{{ interview.Language }}</div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="field description-column-left">
          <div>
            <div class="field-label">Biography</div>
            <div class="field-value" v-html="$mdRenderer.render(interview.Biography || '')" />
          </div>
          <div>
            <div class="field-label">Interview Description</div>
            <div class="field-value" v-html="$mdRenderer.render(interview.Description || '')" />
          </div>
        </div>
        <div class="column description-column-right">
          <div class="field">
            <div class="field-label">People</div>
            <div class="field-value" v-html="$mdRenderer.render(interview.People || '')" />
          </div>
          <div class="field">
            <div class="field-label">Topics</div>
            <div class="field-value" v-html="$mdRenderer.render(interview.Topics || '')" />
          </div>
          <div class="field">
            <div class="field-label">Places</div>
            <div class="field-value" v-html="$mdRenderer.render(interview.Places || '')" />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="field">
          <iframe
            width="100%"
            height="100"
            scrolling="no"
            frameborder="no"
            allow="autoplay"
            :src="interview['Audio Link']"
          ></iframe>
        </div>
      </div>
      <div class="row">
        <div class="field">
          <div class="field-label">Index</div>
          <div class="field-value index" v-html="$mdRenderer.render(interview.Index || '')" />
        </div>
      </div>
      <div class="row">
        <div class="field">
          <div class="field-label">Transcription</div>
          <div class="field-value"
            v-html="$mdRenderer.render(interview.Transcription || '')" />
        </div>
      </div>
      <div class="row">
        <div class="field">
          <div class="field-label">Citation</div>
          <div class="field-value"
            v-html="$mdRenderer.render(interview.Citation || '')" />
        </div>
      </div>
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

.field {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.field-label {
  font-family: var(--title-font-family);
  font-weight: bold;
  text-transform: uppercase;
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

.index {
  background: #F1F0F0;
  padding: 1rem;
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
