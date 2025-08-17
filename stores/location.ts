import type { SelectLocationWithLogs } from "~/lib/db/schema";
import type { MapPoint } from "~/lib/types";

const listLocationsInSidebar = new Set(["dashboard", "dashboard-add"]);
const listCuurentLocationInSidebar = new Set([
  "dashboard-location-slug",
  "dashboard-location-slug-add",
  "dashboard-location-slug-edit",
]);

export const useLocationStore = defineStore("useLocationStore", () => {
  const route = useRoute();

  const { data: locations, status: locationsStatus, refresh: refreshLocations } = useFetch("/api/locations", {
    lazy: true,
  });

  const {
    data: currentLocation,
    status: currentStatus,
    error: currentError,
    refresh: refreshCurrentLocation,
  } = useFetch<SelectLocationWithLogs>(() => `/api/locations/${route.params.slug}`, {
    lazy: true,
    immediate: false,
    watch: false,
    key: "currentLocation",
    default: () => null,
  });

  const sidebarStore = useSidebarStore();
  const mapStore = useMapStore();

  effect(() => {
    if (locations.value && listLocationsInSidebar.has(route.name?.toString() || "")) {
      const mapPoints: MapPoint[] = [];
      const SidebarItems: SidebarItem[] = [];

      locations.value.forEach((loc) => {
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
    else if (currentLocation.value && listCuurentLocationInSidebar.has(route.name?.toString() || "")) {
      sidebarStore.sidebarItems = [];
      mapStore.mapPoints = [currentLocation.value];
    }
    sidebarStore.loading = locationsStatus.value === "pending";
  });

  return {
    locations,
    locationsStatus,
    refreshLocations,
    currentLocation,
    currentStatus,
    currentError,
    refreshCurrentLocation,
  };
});
