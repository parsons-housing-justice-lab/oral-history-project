<template>
  <section>
    <h2 v-if="section.Header">{{ section.Header }}</h2>
    <img v-if="section.Image" :src="section.Image[0].url" />
    <div
      v-if="section.Content"
      v-html="$mdRenderer.render(section.Content)"
    />
  </section>
</template>

<script setup>
const props = defineProps({
  section: Object,
})
</script>

<style scoped>
section {
  margin: 3rem 0;
}

img {
  max-width: 100%;
}
</style>
