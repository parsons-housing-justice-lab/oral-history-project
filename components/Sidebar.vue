<template>
  <div class="sidebar">
    <SidebarSection class="top-section">
      <NuxtLink v-on:click.native="showWelcome" to="/" class="home-link">
        <OhpLogo />
      </NuxtLink>
      <div class="top-section-content">
        <SidebarMenu />
      </div>
    </SidebarSection>
  </div>
</template>

<script>
import { mapActions } from 'pinia';
import OhpLogo from '@/assets/img/ohp-logo.svg';
import { useWelcomeStore } from '@/store/welcome';

export default {
  components: { OhpLogo },

  methods: {
    ...mapActions(useWelcomeStore, { showWelcome: 'toggleShow' }),
  },
}
</script>

<style scoped>
.sidebar {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1000;
}

.home-link {
  display: inline-block;
  width: 100%;
}

.top-section-content > * {
  margin: 1em 0;
}

.top-section {
  align-items: flex-start;
  background: var(--color-dark-gray);
  display: flex;
  flex-direction: column;
}

@media (--mobile) {
}
</style>

<style>
.sidebar .top-section svg path {
  fill: white;
}

@media (--mobile) {
  .sidebar .sector-picker {
    display: none;
  }

  .top-section-content {
    width: 100%;
  }
}
</style>
