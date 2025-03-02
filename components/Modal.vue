<template>
  <Teleport to="body">
    <div class="modal" @click.self="emit('close')">
      <div class="modal-content">
        <button class="close-button" @click="emit('close')">&times;</button>
        <slot />
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { useMagicKeys, whenever } from '@vueuse/core';

const emit = defineEmits(['close']);
const { Escape } = useMagicKeys();

whenever(Escape, () => emit('close'));
</script>

<style scoped>
.modal {
  background-color: rgba(0, 0, 0, 0.75);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background-color: white;
  overflow-y: auto;
  width: min(900px, 80vw);
  height: 80vh;
  max-height: 80vh;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
}

.close-button {
  align-self: flex-end;
  appearance: none;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 1.5em;
}
</style>
