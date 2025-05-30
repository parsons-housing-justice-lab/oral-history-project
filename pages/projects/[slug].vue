<template>
  <div class="page-wide">
    <div class="navigation-back">
      <NuxtLink to="/projects">&lt; Oral History Projects</NuxtLink>
    </div>

    <h1>{{ project.Name }}</h1>

    <FieldColumn>
      <Field v-if="project.Photo">
        <img class="photo" :src="project.Photo" />
      </Field>
      <Field v-if="project.About">
        <h2>About</h2>
        <RichText class="field-value" :text="project.About" />
      </Field>
      <Field v-if="interviews">
        <h2>Oral Histories</h2>
        <ul :class="{
          'plain-list': true,
          'interview-list': true,
          'long-list': interviews.length > 10,
        }">
          <li
            v-for="interview in interviews"
            :key="interview.Slug"
            class="interview-item"
          >
            <NuxtLink :to="`/projects/${project.Slug}/interviews/${interview.Slug}`">
              <img :src="interview.Photo.thumbnail" />
              {{ interview.Name }}
            </NuxtLink>
          </li>
        </ul>
      </Field>
      <Field v-if="project.Goals">
        <h2>Values, Purpose, and Methods</h2>
        <RichText class="field-value" :text="project.Goals" />
      </Field>
      <Field v-if="project.Team">
        <h2>Team and Collaborators</h2>
        <RichText class="field-value" :text="project.Team" />
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
      <Field v-if="showArchive" class="archive-section">
        <h2>Archive</h2>
        <RichText
          v-if="project['Archive Text']"
          class="field-value"
          :text="project['Archive Text']"
        />
        <Field v-if="project['Popular Education Text'] || popularEducationAttachments.length > 0">
          <h3>Popular Education</h3>
          <RichText
            v-if="project['Popular Education Text']"
            class="field-value"
            :text="project['Popular Education Text']"
          />
          <ul class="plain-list attachment-list">
            <li
              v-for="attachment in popularEducationAttachments"
              :key="attachment.id"
            >
              <a :href="attachment.File.full" target="_blank">
                <img :src="attachment.File.thumbnail" />
              </a>
            </li>
          </ul>
        </Field>
        <Field v-if="archiveAttachments.length > 0">
          <h3>Reports</h3>
          <RichText
            v-if="project['Reports Text']"
            class="field-value"
            :text="project['Reports Text']"
          />
          <ul class="plain-list attachment-list">
            <li
              v-for="attachment in archiveAttachments"
              :key="attachment.id"
            >
              <a :href="attachment.File.full" target="_blank">
                <img :src="attachment.File.thumbnail" />
              </a>
            </li>
          </ul>
        </Field>
      </Field>
      <Field>
        <h2>Connect</h2>
        <div class="short-fields">
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
  </div>
</template>

<script setup>
import { useInterviewsStore } from '@/store/interviews';
import { useProjectsStore } from '@/store/projects';
import { useProjectAttachmentsStore } from '@/store/projectAttachments';

const projectsStore = useProjectsStore();
const interviewsStore = useInterviewsStore();
const projectsAttachmentsStore  = useProjectAttachmentsStore();

const route = useRoute();

const project = computed(() => {
  return projectsStore.bySlug(route.params.slug)?.[0] ?? {};
});

const attachments = computed(() => {
  return projectsAttachmentsStore.byProject(project.value.RecordId);
});

const archiveAttachments = computed(() => {
  return attachments.value.filter(({ Section }) => Section === 'Archive');
});

const popularEducationAttachments = computed(() => {
  return attachments.value.filter(({ Section }) => Section === 'Popular Education');
});

const showArchive = computed(() => {
  return (
    popularEducationAttachments.value?.length > 0 ||
    archiveAttachments.value?.length > 0
  );
});

const interviews = computed(() => {
  return interviewsStore.byProject(project.value.RecordId);
});
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

.interview-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1rem;
}

.interview-item {
  margin: 0.5rem 0;
  width: 8rem;
}

.interview-item img {
  aspect-ratio: 1;
  filter: grayscale(1);
  object-fit: cover;
  transition: filter 0.25s;
}

.interview-item img:hover {
  filter: grayscale(0);
}

.interview-item a {
  display: flex;
  flex-direction: column;
  font-size: 0.9em;
  gap: 0.1rem;
  text-decoration: underline;
}

.attachment-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.attachment-list li {
  max-width: 12rem;
}

.navigation-back {
  font-size: 0.9em;
  margin-bottom: 2rem;
}

img {
  max-width: 100%;
  max-height: 25rem;
}

.archive-section h3 {
  margin-bottom: 0;
}

.archive-section .field {
  padding-top: 1rem;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid black;
}

.archive-section .field:last-of-type {
  border-bottom: none;
}


.archive-section img {
  aspect-ratio: 0.65;
  object-fit: cover;
}
</style>
