<template>
  <div class="page-wide">
    <h1>{{ name }}</h1>

    <PageSections :name="name" />
  </div>
</template>

<script setup>
const props = defineProps({
  name: String,
});
</script>
