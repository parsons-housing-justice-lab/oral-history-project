<template>
  <div class="collapsible-section">
    <div
      class="content"
      :style="{ height: collapsed ? initialHeight : 'unset' }"
    >
      <slot></slot>
    </div>

    <button @click="collapsed = !collapsed">
      <span v-if="collapsed">Read all</span>
      <span v-else>Minimize</span>
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  initialHeight: String,
});

const collapsed = ref(true);
</script>

<style scoped>
.collapsible-section .content {
  overflow: hidden;
}

button {
  appearance: none;
  background: none;
  border: none;
  cursor: pointer;
  margin: 0;
  margin-top: 1rem;
  padding: 0;
  font-weight: bold;
  text-transform: uppercase;
  text-decoration: underline;
}
</style>
