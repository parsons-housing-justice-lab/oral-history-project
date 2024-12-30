<template>
  <modal>
    <div class="pdf-modal">
      <object
        width="100%"
        height="100%"
        type="application/pdf" 
        :data="url"
        :title="title"
      >
        <p>PDF cannot be displayed.</p>
      </object>
    </div>
  </modal>
</template>

<script setup>
const props = defineProps({
  title: String,
  url: String,
});

const { title, url } = toRefs(props);
</script>

<style scoped>
.pdf-modal {
  flex-grow: 1;
}
</style>
