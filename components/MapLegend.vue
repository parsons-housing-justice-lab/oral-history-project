<template>
  <div class="map-legend">
    <div class="title">LEGEND</div>
    <div class="items">
      <div class="item" v-for="item in items" :key="item.icon">
        <!-- TODO fix -->
        <img :src="`/map-icons/${item.icon}`" />
        <span>{{ item.label }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
const items = [
  {
    icon: 'CLT.png',
    label: 'Community Land Trusts',
  },
  {
    icon: 'coops.png',
    label: 'Limited Equity Housing Cooperatives and Mutual Housing Associations',
  },
  {
    icon: 'tenants.png',
    label: 'Tenant Organizing, Tenant Unions, and Rent Strikes',
  },
  {
    icon: 'homeless.png',
    label: 'Community Organizing, Coalitions, and Policy Platforms',
  },
  {
    icon: 'rezoning.png',
    label: 'Rezoning and Environmental Impact',
  },
];
</script>

<style scoped>
.map-legend {
  background: var(--color-dark-gray);
  color: white;
  display: flex;
  flex-direction: row;
  gap: 2rem;
  padding: 1rem;
}

.title {
  font-weight: 500;
}

.items {
  display: flex;
  flex-direction: row;
  gap: 1rem;
}

.item {
  text-transform: uppercase;
  font-size: 0.7em;
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  align-items: center;
  width: 20%;
}
</style>
