import type { MapPoint } from "~/lib/types";

export const useLocationStore = defineStore("useLocationStore", () => {
  const { data, status, refresh } = useFetch("/api/locations", {
    lazy: true,
  });

  const sidebarStore = useSidebarStore();
  const mapStore = useMapStore();

  effect(() => {
    if (data.value) {
      const mapPoints: MapPoint[] = [];
      const SidebarItems: SidebarItem[] = [];

      data.value.forEach((loc) => {
        const mapPoint = createMapPointFromLocation(loc);
        mapPoints.push(mapPoint);

        SidebarItems.push({
          id: `loc-${loc.id}`,
          label: loc.name,
          icon: "tabler:map-pin-filled",
          to: { name: "dashboard-location-slug", params: { slug: loc.slug } },
          mapPoint,
        });
      });

      sidebarStore.sidebarItems = SidebarItems;
      mapStore.mapPoints = mapPoints;
    }

    sidebarStore.loading = status.value === "pending";
  });

  return {
    locations: data,
    status,
    refresh,
  };
});
