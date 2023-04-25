<template>
  <div class="field-column">
    <slot></slot>
  </div>
</template>

<script setup>
</script>

<style scoped>
.field-column {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}
</style>
