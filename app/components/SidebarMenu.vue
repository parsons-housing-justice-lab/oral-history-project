<template>
  <nav class="sidebar-menu">
    <ol>
      <li>
        <NuxtLink to="/about">About</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/why-oral-history">Why Oral History?</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/projects">Oral History Projects</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/using-this-platform">Using this Platform</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/get-involved">Get Involved</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/people">People</NuxtLink>
      </li>
    </ol>
  </nav>
</template>

<script>
export default {
}
</script>

<style scoped>
.sidebar-menu {
  display: flex;
  flex-direction: column;
}

.sidebar-menu ol {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>

<style>
.sidebar-menu a {
  color: white;
  font-family: var(--title-font-family);
  font-weight: bold;
  text-decoration: none;
  text-transform: uppercase;
}
</style>
