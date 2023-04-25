<template>
  <div class="field">
    <div v-if="label" class="field-label">{{ label }}</div>
    <div class="field-value">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  label: String,
})
</script>

<style scoped>
.field {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
}

.field-label {
  font-family: var(--title-font-family);
  font-weight: bold;
  text-transform: uppercase;
}
</style>
