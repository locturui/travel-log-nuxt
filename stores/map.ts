import { defineStore } from "pinia";

import type { MapPoint } from "~/lib/types";

export const useMapStore = defineStore("useMapStore", () => {
  const mapPoints = ref<MapPoint[]>([]);

  async function init() {
    const { useMap } = await import("@indoorequal/vue-maplibre-gl");
    const { LngLatBounds } = await import("maplibre-gl");

    const map = useMap();

    effect(() => {
      const first = mapPoints.value[0];
      if (!first) {
        return;
      }

      const bounds = mapPoints.value.reduce((bounds, point) => {
        return bounds.extend([point.long, point.lat]);
      }, new LngLatBounds(
        [first.long, first.lat],
        [first.long, first.lat],
      ));

      map.map?.fitBounds(bounds, {
        padding: 70,
      });
    });
  }

  return {
    mapPoints,
    init,
  };
});
