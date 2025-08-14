<script lang="ts" setup>
import type { MglEvent } from "@indoorequal/vue-maplibre-gl";
import type { LngLat } from "maplibre-gl";

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

function updatePoint(coordinates: LngLat) {
  if (mapStore.addedPoint) {
    mapStore.addedPoint.lat = coordinates.lat;
    mapStore.addedPoint.long = coordinates.lng;
  }
}

function onDoubleClick(mglEvent: MglEvent<"dblclick">) {
  if (mapStore.addedPoint) {
    mapStore.addedPoint.lat = mglEvent.event.lngLat.lat;
    mapStore.addedPoint.long = mglEvent.event.lngLat.lng;
  }
}
</script>

<template>
  <MglMap
    :map-style="style"
    :center="INNO"
    :zoom="zoom"
    @map:dblclick="onDoubleClick"
  >
    <MglGeolocateControl />
    <MglNavigationControl />

    <MglMarker
      v-if="mapStore.addedPoint"
      :coordinates="[mapStore.addedPoint.long, mapStore.addedPoint.lat]"
      draggable
      @update:coordinates="updatePoint"
    >
      <template #marker>
        <div
          class="tooltip tooltip-open tooltip-top hover:cursor-pointer"
          data-tip="Drag to set the coordinates"
        >
          <Icon
            name="tabler:map-pin-filled"
            size="35"
            class="text-warning"
          />
        </div>
      </template>
    </MglMarker>

    <MglMarker
      v-for="point in mapPoints"
      :key="point.id"
      :coordinates="[point.long, point.lat]"
    >
      <template #marker>
        <div
          class="tooltip hover:tooltip-open tooltip-top hover:cursor-pointer"
          :class="{
            'tooltip-open': mapStore.selected === point,
          }"
          :data-tip="point.name"
          @mouseenter="mapStore.selected = point"
          @mouseleave="mapStore.selected = null"
        >
          <Icon
            name="tabler:map-pin-filled"
            size="30"
            :class="mapStore.selected === point ? 'text-accent' : 'text-primary'"
          />
        </div>
      </template>
      <MglPopup>
        <h3 class="text-xl">
          {{ point.name }}
        </h3>
        <p>{{ point.description }}</p>
      </MglPopup>
    </MglMarker>
  </MglMap>
</template>
