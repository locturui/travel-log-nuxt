export const useLocationStore = defineStore("useLocationStore", () => {
  const { data, status, refresh } = useFetch("/api/locations", {
    lazy: true,
  });

  const sidebarStore = useSidebarStore();
  const mapStore = useMapStore();

  effect(() => {
    if (data.value) {
      sidebarStore.sidebarItems = data.value.map(loc => ({
        id: `loc-${loc.id}`,
        label: loc.name,
        icon: "tabler:map-pin-filled",
        href: "#",
      }));

      mapStore.mapPoints = data.value.map(loc => ({
        id: loc.id,
        label: loc.name,
        lat: loc.lat,
        long: loc.lng,
      }));
    }

    sidebarStore.loading = status.value === "pending";
  });

  return {
    locations: data,
    status,
    refresh,
  };
});
