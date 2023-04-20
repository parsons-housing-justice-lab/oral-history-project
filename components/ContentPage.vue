<template>
  <div class="page-wide">
    <h2>{{ name }}</h2>

    <template v-if="page.sections">
      <PageSection
        v-for="section in page.sections"
        :key="section.Id"
        :section="section"
      />
    </template>
  </div>
</template>

<script setup>
import { usePagesStore } from '@/store/pages';

const props = defineProps({
  name: String,
});

const store = usePagesStore();
const page = computed(() => store.byName(props.name) || {});
</script>
