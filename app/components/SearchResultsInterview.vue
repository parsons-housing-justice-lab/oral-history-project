<template>
  <div class="search-results-interview">
    <NuxtLink :to="`/projects/${projectSlug}/interviews/${interview.Slug}`">
      {{ interview.Name }}
    </NuxtLink>

    <div class="preview">
      <div v-for="match in textMatches" :key="match.field">
        <div v-html="markdownConverter.render(match.highlighted)" />
      </div>
    </div>
  </div>
</template>

<script setup>
import md from "markdown-it";
import { useInterviewsStore } from '@/store/interviews';

const interviewsStore = useInterviewsStore();

const props = defineProps({
  interviewId: Number,
  matches: Array,
  projectSlug: String,
});

const { interviewId, matches, projectSlug } = toRefs(props);

const interview = computed(() => interviewsStore.byId(interviewId.value)[0]);

const textMatches = computed(() => matches.value
  .filter(({ field }) => !['Name'].includes(field)));

const markdownConverter = md({
  breaks: true,
  html: true,
});
</script>

<style scoped>
.search-results-interview {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  border: 1px solid #c7c7c7;
  padding: 0.5rem;
}

.preview {
  font-size: 0.9em;
}
</style>
