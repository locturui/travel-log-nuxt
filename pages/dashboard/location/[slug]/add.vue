<script setup lang="ts">
import type { InsertLocationLog } from "~/lib/db/schema";

import { INNO } from "~/lib/constants";

const { $csrfFetch } = useNuxtApp();
const route = useRoute();

const { currentLocation } = storeToRefs(useLocationStore());

async function onSubmit(values: InsertLocationLog) {
  await $csrfFetch(`/api/locations/${route.params.slug}/add`, {
    method: "POST",
    body: values,
  });
}
function onSubmitComplete() {
  navigateTo({
    name: "dashboard-location-slug",
    params: { slug: route.params.slug },
  });
}
</script>

<template>
  <LocationLogForm
    submit-label="Add Location Log"
    submit-icon="tabler:map-pin-plus"
    :on-submit="onSubmit"
    :on-submit-complete="onSubmitComplete"
    :initial-values="{
      name: '',
      description: '',
      startedAt: Date.now() - 24 * 60 * 60 * 1000,
      endedAt: Date.now(),
      long: currentLocation?.long || (INNO as [number, number])[0],
      lat: currentLocation?.lat || (INNO as [number, number])[1],
    }"
  />
</template>
