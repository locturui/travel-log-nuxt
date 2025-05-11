<script lang="ts" setup>
const isSidebarOpen = ref(true);

onMounted(() => {
  isSidebarOpen.value = localStorage.getItem("isSidebarOpen") === "true";
});

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value;
  localStorage.setItem("isSidebarOpen", JSON.stringify(isSidebarOpen.value));
}
</script>

<template>
  <div class="flex-1 flex">
    <div class="bg-base-100 transition-all duration-300" :class="{ 'w-64': isSidebarOpen, 'w-16': !isSidebarOpen }">
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
        <div class="divider" />
        <SidebarButton
          :show-label="isSidebarOpen"
          icon="tabler:logout-2"
          text="Sign Out"
          href="/sign-out"
        />
      </div>
    </div>
    <div class="flex-1">
      <NuxtPage />
    </div>
  </div>
</template>

<style>

</style>
