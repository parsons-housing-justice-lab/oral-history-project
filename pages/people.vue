<template>
  <div class="people-page page-wide">
    <h1>People</h1>
    <section>
      <h2>Team</h2>
      <ol class="team-list">
        <li class="team-item" v-for="person in store.team" :key="person.Name">
          <span class="name">{{ person.Name }}</span>
          <RichText class="description" :text="person.Description" />
        </li>
      </ol>
    </section>
    <section>
      <h2>Collaborators</h2>
      <ol class="collaborators-list">
        <li
          v-for="person in store.collaborators"
          :key="person.Name"
          class="collaborator-item"
        >
          <span class="name">{{ person.Name }}.</span>
          <span class="description">{{ person.Description }}</span>
        </li>
      </ol>
    </section>
  </div>
</template>

<script setup>
import { usePeopleStore } from '@/store/people';

const store = usePeopleStore();
</script>

<style scoped>
h2 {
  margin-bottom: 2rem;
}

ol {
  list-style: none;
  margin: 0;
  padding: 0;
}

.team-list {
  display: grid;
  grid-template-columns: auto auto;
  column-gap: 2rem;
  row-gap: 2rem;
}

.team-item .name {
  font-weight: bold;
  margin-right: 0.75rem;
}

.team-item .description {
  display: inline;
}

.collaborator-item .name {
  margin-right: 0.5rem;
}

section {
  margin-bottom: 3rem;
}
</style>

<style>
.people-page .team-item .description p:first-of-type {
  display: inline;
}
</style>
