import type { LngLatBounds } from "maplibre-gl";

import { defineStore } from "pinia";

import type { MapPoint } from "~/lib/types";

export const useMapStore = defineStore("useMapStore", () => {
  const mapPoints = ref<MapPoint[]>([]);

  const selected = ref<MapPoint | null>(null);

  const addedPoint = ref<MapPoint | null>(null);

  async function init() {
    const { useMap } = await import("@indoorequal/vue-maplibre-gl");
    const { LngLatBounds } = await import("maplibre-gl");

    let bounds: LngLatBounds | null = null;

    const map = useMap();

    effect(() => {
      const first = mapPoints.value[0];
      if (!first) {
        return;
      }

      bounds = mapPoints.value.reduce((bounds, point) => {
        return bounds.extend([point.long, point.lat]);
      }, new LngLatBounds(
        [first.long, first.lat],
        [first.long, first.lat],
      ));

      map.map?.fitBounds(bounds, {
        padding: 70,
        maxZoom: 6,
      });
    });

    watch(addedPoint, (newValue, oldValue) => {
      if (newValue && !oldValue) {
        map.map?.flyTo({
          center: [newValue.long, newValue.lat],
          speed: 0.8,
          zoom: 6,
        });
      }
    }, { immediate: true });
  }

  return {
    mapPoints,
    init,
    selected,
    addedPoint,
  };
});
