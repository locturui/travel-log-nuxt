<script lang="ts" setup>
import { CURRENT_LOCATION_PAGES, EDIT_PAGES, LOCATION_PAGES } from "~/lib/constants";

const isSidebarOpen = ref(true);
const route = useRoute();
const locationsStore = useLocationStore();
const sidebarStore = useSidebarStore();
const mapStore = useMapStore();
const { currentLocation, currentStatus } = storeToRefs(locationsStore);

if (LOCATION_PAGES.has(route.name?.toString() || "")) {
  await locationsStore.refreshLocations();
}

if (CURRENT_LOCATION_PAGES.has(route.name?.toString() || "")) {
  await locationsStore.refreshCurrentLocation();
}
onMounted(() => {
  isSidebarOpen.value = localStorage.getItem("isSidebarOpen") === "true";
});

effect(() => {
  if (LOCATION_PAGES.has(route.name?.toString() || "")) {
    sidebarStore.sidebarTopItems = [
      {
        id: "link-dashboard",
        label: "Locations",
        icon: "tabler:map",
        href: "/dashboard",
      },
      {
        id: "link-location-add",
        label: "Add Location",
        icon: "tabler:circle-plus-filled",
        href: "/dashboard/add",
      },
    ];
  }
  else if (CURRENT_LOCATION_PAGES.has(route.name?.toString() || "")) {
    sidebarStore.sidebarTopItems = [
      {
        id: "link-dashboard",
        label: "Back To Locations",
        icon: "tabler:arrow-left",
        href: "/dashboard",
      },
      {
        id: "link-dashboard",
        label: currentStatus.value === "pending" || !currentLocation.value ? "Loading..." : currentLocation.value.name,
        icon: "tabler:map",
        to: {
          name: "dashboard-location-slug",
          params: { slug: route.params.slug },
        },
      },
      {
        id: "link-location-edit",
        label: "Edit Location",
        icon: "tabler:map-pin-cog",
        to: {
          name: "dashboard-location-slug-edit",
          params: { slug: route.params.slug },
        },
      },
      {
        id: "link-location-add",
        label: "Add Location Log",
        icon: "tabler:circle-plus-filled",
        to: {
          name: "dashboard-location-slug-add",
          params: { slug: route.params.slug },
        },
      },
    ];
  }
});

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value;
  localStorage.setItem("isSidebarOpen", JSON.stringify(isSidebarOpen.value));
}
</script>

<template>
  <div class="flex-1 flex">
    <div class="bg-base-100 transition-all duration-300 shrink-0" :class="{ 'w-64': isSidebarOpen, 'w-16': !isSidebarOpen }">
      <div
        :class="{ 'justify-center': !isSidebarOpen, 'justify-end': isSidebarOpen }"
        class="flex hover:cursor-pointer hover:bg-base-200 p-2"
        @click="toggleSidebar"
      >
        <Icon
          v-if="isSidebarOpen"
          name="tabler:chevron-left"
          size="32"
        />
        <Icon
          v-else
          name="tabler:chevron-right"
          size="32"
        />
      </div>
      <div class="flex flex-col">
        <SidebarButton
          v-for="sidebarItem in sidebarStore.sidebarTopItems"
          :key="sidebarItem.id"
          :show-label="isSidebarOpen"
          :label="sidebarItem.label"
          :icon="sidebarItem.icon"
          :href="sidebarItem.href"
          :to="sidebarItem.to"
        />
        <div v-if="sidebarStore.loading || sidebarStore.sidebarItems.length > 0" class="divider" />

        <div v-if="sidebarStore.loading" class="px-4">
          <div class="skeleton h-5 w-full" />
        </div>

        <div v-if="!sidebarStore.loading && sidebarStore.sidebarItems.length > 0" class="flex flex-col">
          <SidebarButton
            v-for="item in sidebarStore.sidebarItems"
            :key="item.id"
            :show-label="isSidebarOpen"
            :icon="item.icon"
            :label="item.label"
            :to="item.to"
            :icon-color=" isPointSelected(item.mapPoint, mapStore.selected) ? 'text-accent' : undefined"
            @mouseenter="mapStore.selected = item.mapPoint ?? null"
            @mouseleave="mapStore.selected = null"
          />
        </div>

        <div class="divider" />
        <SidebarButton
          :show-label="isSidebarOpen"
          icon="tabler:logout-2"
          label="Sign Out"
          href="/sign-out"
        />
      </div>
    </div>
    <div class="flex-1 bg-base-200 overflow-auto">
      <div
        class="flex size-full"
        :class="{
          'flex-col': !EDIT_PAGES.has(route.name?.toString() || ''),
        }"
      >
        <NuxtPage
          :class="{
            'shrink-0': EDIT_PAGES.has(route.name?.toString() || ''),
            'w-96': EDIT_PAGES.has(route.name?.toString() || ''),
          }"
        />
        <AppMap class="flex-1" />
      </div>
    </div>
  </div>
</template>

<style>

</style>
