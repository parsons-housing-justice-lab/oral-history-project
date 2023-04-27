<template>
  <div class="time-code-transcription">
    <template v-for="row in transcription">
      <div>{{ formatTime(row.time) }}</div>
      <RichText :text="row.text" />
    </template>
  </div>
</template>

<script setup>
const props = defineProps({
  transcription: Object,
})

const formatTime = time => time.replaceAll('[', '').replaceAll(']', '');
</script>

<style scoped>
.time-code-transcription {
  display: grid;
  grid-template-columns: 75px auto;
  row-gap: 1rem;
}
</style>
