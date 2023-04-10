<template>
  <div class="sidebar">
    <SidebarSection class="top-section">
      <h1>{{title}}</h1>
      <div class="top-section-content">
        <!--
        <SectorPicker /> 
        <Search />
        -->
      </div>
    </SidebarSection>

    <SidebarSection v-if="selectedFeatures.length" class="popup-wrapper">
    <!--
      <Popup :feature="selectedFeatures[0]" />
    -->
    </SidebarSection>
  </div>
</template>

<script>
import { mapState } from 'pinia';
import { useTextBlocksStore } from '@/store/textBlocks';

export default {
  computed: {
    ...mapState(useTextBlocksStore, {
      title: store => store.byType('Title')[0],
    }),

    selectedFeatures() {
      // TODO pinia
      return [];
      // return this.$store.state.popup.selectedFeatures;
    },
  },
}
</script>

<style scoped>
/* TODO make this less repetitive */
@custom-media --mobile (max-width: 500px);

.sidebar {
  border-radius: 20px;
  position: absolute;
  top: 1rem;
  left: 1rem;
  z-index: 1000;
  width: 25%;
}

h1 {
  font-family: var(--title-font-family);
  margin: 0;
  margin-bottom: 1em;
}

.top-section-content > * {
  margin-bottom: 1em;
}

.top-section-content > *:last-of-type {
  margin-bottom: 0;
}

.popup-wrapper {
  margin-top: 0.5em;
}

@media (--mobile) {
  .sidebar {
    left: 0.5rem;
    right: 0.5rem;
    top: 0.5rem;
    width: unset;
  }

  h1 {
    margin-bottom: 0;
  }
}
</style>

<style>
@media (--mobile) {
  .sidebar .sector-picker {
    display: none;
  }

  .top-section-content {
    width: 100%;
  }
}

.top-section {
  align-items: center;
  display: flex;
  flex-direction: column;
}
</style>
