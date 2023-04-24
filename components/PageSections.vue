<template>
  <PageSection
    v-for="section in page?.sections ?? []"
    :key="section.Id"
    :section="section"
  />
</template>

<script setup>
import { usePagesStore } from '@/store/pages';

const props = defineProps({
  name: String,
})

const store = usePagesStore();
const page = computed(() => store.byName(props.name) || {});
</script>
