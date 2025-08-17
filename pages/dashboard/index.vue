<script setup lang="ts">
const locationsStore = useLocationStore();
const { locations, locationsStatus } = storeToRefs(locationsStore);
const mapStore = useMapStore();
onMounted(() => {
  locationsStore.refreshLocations();
});
</script>

<template>
  <div class="p-4">
    <h2 class="text-2xl">
      Locations
    </h2>
    <div v-if="locationsStatus === 'pending'">
      <span class="loading loading-spinner loading-xl" />
    </div>
    <div v-else-if="locations && locations.length > 0" class="flex flex-nowrap mt-4 gap-2 overflow-auto">
      <NuxtLink
        v-for="location in locations"
        :key="location.id"
        :to="{ name: 'dashboard-location-slug', params: { slug: location.slug } }"
        class="card card-compact bg-base-300 h-40 mb-2 border-2 w-72 shrink-0 hover:cursor-pointer"
        :class="{
          'border-accent': isPointSelected(location, mapStore.selected),
          'border-transparent': !isPointSelected(location, mapStore.selected),
        }"
        @mouseenter="mapStore.selected = createMapPointFromLocation(location)"
        @mouseleave="mapStore.selected = null"
      >
        <div class="card-body">
          <h3 class="text-xl">
            {{ location.name }}
          </h3>
          <p>{{ location.description }}</p>
        </div>
      </NuxtLink>
    </div>
    <div v-else class="flex flex-col gap-2 mt-4">
      <p>Add a location to get started</p>
      <NuxtLink to="/dashboard/add" class="btn btn-primary w-40">
        Add Location
        <Icon name="tabler:circle-plus-filled" size="24" />
      </NuxtLink>
    </div>
  </div>
</template>
