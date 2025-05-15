import type { LngLatBounds } from "maplibre-gl";

import { defineStore } from "pinia";

import type { MapPoint } from "~/lib/types";

export const useMapStore = defineStore("useMapStore", () => {
  const mapPoints = ref<MapPoint[]>([]);

  const selected = ref<MapPoint | null>(null);
  const shouldZoom = ref(true);

  function selectPointNoZoom(p: MapPoint | null) {
    shouldZoom.value = false;
    selected.value = p;
  }

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

    effect(() => {
      if (selected.value) {
        if (shouldZoom.value) {
          map.map?.flyTo({
            center: [selected.value.long, selected.value.lat],
            speed: 0.8,
          });
        }
        shouldZoom.value = true;
      }
      else if (bounds) {
        map.map?.fitBounds(bounds, {
          padding: 70,
          maxZoom: 6,
        });
      }
    });
  }

  return {
    mapPoints,
    init,
    selected,
    selectPointNoZoom,
  };
});
