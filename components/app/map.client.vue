<script lang="ts" setup>
import { INNO } from "~/lib/constants";

const mapStore = useMapStore();
const { mapPoints } = storeToRefs(mapStore);
const colorMode = useColorMode();
const style = computed(() => {
  return colorMode.value === "dark"
    ? "/styles/dark.json"
    : "https://tiles.openfreemap.org/styles/liberty";
});
const zoom = 3;

onMounted(() => {
  mapStore.init();
});
</script>

<template>
  <MglMap
    :map-style="style"
    :center="INNO"
    :zoom="zoom"
  >
    <MglGeolocateControl />
    <MglNavigationControl />
    <MglMarker
      v-for="point in mapPoints"
      :key="point.id"
      :coordinates="[point.long, point.lat]"
    >
      <template #marker>
        <div class="tooltip hover:tooltip-open tooltip-top" :data-tip="point.label">
          <Icon
            name="tabler:map-pin-filled"
            size="30"
            class="text-primary"
          />
        </div>
      </template>
    </MglMarker>
  </MglMap>
</template>
