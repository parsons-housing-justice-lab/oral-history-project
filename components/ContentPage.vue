<template>
  <div class="page-wide">
    <h2>{{ name }}</h2>

    <PageSections :name="name" />
  </div>
</template>

<script setup>
const props = defineProps({
  name: String,
});
</script>
