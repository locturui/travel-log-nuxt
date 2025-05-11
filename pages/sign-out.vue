<script lang="ts" setup>
onMounted(() => {
  const authStore = useAuthStore();
  authStore.signOut();
});
</script>

<template>
  <div class="card bg-base-300 mx-auto container mt-5 min-h-72 text-center flex flex-col justify-center items-center gap-4">
    <span class="loading loading-dots loading-xl" />
  </div>
</template>

<style>

</style>
