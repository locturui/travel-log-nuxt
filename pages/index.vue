<script setup lang="ts">
const authStore = useAuthStore();
</script>

<template>
  <div class="hero bg-base-300 container mx-auto mt-5">
    <div class="hero-content text-center min-h-96">
      <div class="max-w-md">
        <h1 class="text-5xl font-bold">
          LogIt
        </h1>
        <p class="py-6">
          Keep track of your travels and adventures. Add locations, photos, and notes to create a personal travel log.
        </p>
        <AuthButton v-if="!authStore.user" />
        <NuxtLink
          v-else
          to="/dashboard"
          class="btn btn-primary"
        >
          To Dashboard
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
