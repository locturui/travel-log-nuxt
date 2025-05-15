<script lang="ts" setup>
const route = useRoute();
const error = route.query.error;
</script>

<template>
  <div class="card bg-base-300 mx-auto container mt-5 min-h-72 text-center flex flex-col justify-center items-center gap-4">
    <div role="alert" class="alert alert-error min-w-1/2 text-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 shrink-0 stroke-current"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span>Oh no! {{ error || 'An unknown error occured :c' }}</span>
    </div>
    <NuxtLink to="/" class="btn btn-primary dark:btn">
      Homepage
      <Icon name="tabler:arrow-left" size="32" />
    </NuxtLink>
  </div>
</template>

<style>

</style>
