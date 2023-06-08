<template>
  <div class="transcription-section">
    <RichText v-if="simpleTranscription" :text="parsed" />
    <TimeCodeTranscription v-else :transcription="parsed" />
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  transcription: String,
})

const timeRegex = /^\s*\[(\d*:)+\d*\]\s*$/;

const parseTranscription = text => {
  if (!text) return null;
  const lines = text.split('\n');
  const matches = lines.filter(l => l.match(timeRegex));

  const rows = [];
  let currentTime;
  let currentLines = [];

  for (let line of lines) {
    if (line.match(timeRegex)) {
      if (currentTime && currentLines.length) {
        const lines = currentLines.filter((l, i) => {
          if (l === '') {
            return !(i === 0 || i === currentLines.length - 1);
          }
          return true;
        });
        rows.push({
          time: currentTime,
          text: lines.join('\n'),
        });
      }

      currentTime = line;
      currentLines = [];
    }
    else {
      if (line === ' ') currentLines.push('<br />');
      else currentLines.push(line);
    }
  }

  if (currentTime && currentLines.length) {
    rows.push({
      time: currentTime,
      text: currentLines.join('\n'),
    });
  }

  if (rows.length) return rows;
  return text;
};

const parsed = computed(() => parseTranscription(props.transcription));
const simpleTranscription = computed(() => typeof parsed.value === 'string');
</script>

<style scoped>
</style>
