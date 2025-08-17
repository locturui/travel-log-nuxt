<script lang="ts" setup>
const route = useRoute();
const locationsStore = useLocationStore();
const {
  currentLocation: location,
  currentError: error,
  currentStatus: status,
} = storeToRefs(locationsStore);

onMounted(() => {
  locationsStore.refreshCurrentLocation();
});

onBeforeRouteUpdate((to) => {
  if (to.name === "dashboard-location-slug") {
    locationsStore.refreshCurrentLocation();
  }
});
</script>

<template>
  <div class="p-4 min-h-62">
    <div v-if="status === 'pending'">
      <div class="loading" />
    </div>
    <div v-if="error && status !== 'pending'" class="alert alert-error">
      <h2 class="text-lg">
        {{ error.statusMessage }}
      </h2>
    </div>
    <div v-if="route.name === 'dashboard-location-slug' && location && status !== 'pending'">
      <h2 class="text-xl">
        {{ location?.name }}
      </h2>
      <p class="text-sm">
        {{ location?.description }}
      </p>
      <div v-if="!location?.locationLogs.length" class="mt-4 text-sm italic">
        <p>
          No logs for this location yet. Add one!
        </p>
      </div>
      <button class="btn btn-primary mt-2">
        Add Location Log
        <Icon name="tabler:map-pin-plus" size="24" />
      </button>
    </div>
    <div v-if="route.name !== 'dashboard-location-slug'">
      <NuxtPage />
    </div>
  </div>
</template>
