<script lang="ts" setup>
const isSidebarOpen = ref(true);
const route = useRoute();
const locationsStore = useLocationStore();
const sidebarStore = useSidebarStore();
const mapStore = useMapStore();

onMounted(() => {
  isSidebarOpen.value = localStorage.getItem("isSidebarOpen") === "true";
  if (route.path !== "/dashboard") {
    locationsStore.refresh();
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
          :show-label="isSidebarOpen"
          icon="tabler:map"
          text="Locations"
          href="/dashboard"
        />
        <SidebarButton
          :show-label="isSidebarOpen"
          icon="tabler:circle-plus-filled"
          text="Add Location"
          href="/dashboard/add"
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
            :text="item.label"
            :href="item.href"
            :icon-color="mapStore.selected === item.location ? 'text-accent' : undefined"
            @mouseenter="mapStore.selected = item.location"
            @mouseleave="mapStore.selected = null"
          />
        </div>

        <div class="divider" />
        <SidebarButton
          :show-label="isSidebarOpen"
          icon="tabler:logout-2"
          text="Sign Out"
          href="/sign-out"
        />
      </div>
    </div>
    <div class="flex-1 overflow-auto">
      <div class="flex flex-col size-full">
        <NuxtPage />
        <AppMap class="flex-1" />
      </div>
    </div>
  </div>
</template>

<style>

</style>
