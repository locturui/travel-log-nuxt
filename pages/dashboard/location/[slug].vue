<script lang="ts" setup>
const route = useRoute();
const mapStore = useMapStore();
const { slug } = route.params;
const { data: location, status, error } = await useFetch(`/api/locations/${slug}`, { lazy: true });

effect(() => {
  if (location.value) {
    mapStore.mapPoints = [location.value];
  }
});
</script>

<template>
  <div class="p-4 min-h-62">
    <div v-if="status === 'pending'">
      <span class="loading loading-lg" />
    </div>
    <div v-else-if="error" class="alert alert-error">
      <h2 class="text-lg">
        {{ error.statusMessage }}
      </h2>
    </div>
    <div v-else>
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
        <button class="btn btn-primary mt-2">
          Add Log
          <Icon name="tabler:map-pin-plus" size="24" />
        </button>
      </div>
    </div>
  </div>
</template>
