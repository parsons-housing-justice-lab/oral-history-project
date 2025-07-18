<template>
  <div class="rich-text" v-html="$mdRenderer.render(text || '')" />
</template>

<script setup>
const props = defineProps({
  text: String,
})
</script>

<style>
.rich-text p:first-of-type {
  margin-top: 0;
}

.rich-text p:last-of-type {
  margin-bottom: 0;
}
</style>
