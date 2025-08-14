<script lang="ts" setup>
import type { FetchError } from "ofetch";

import { toTypedSchema } from "@vee-validate/zod";

import { INNO } from "~/lib/constants";
import { InsertLocation } from "~/lib/db/schema";

const router = useRouter();
const { $csrfFetch } = useNuxtApp();

const submitError = ref<string | null>(null);

const loading = ref(false);

const submitted = ref(false);

const mapStore = useMapStore();

const { handleSubmit, errors, meta, setErrors, setFieldValue, controlledValues } = useForm({
  validationSchema: toTypedSchema(InsertLocation),
  initialValues: {
    name: "",
    description: "",
    lat: (INNO as [number, number])[1],
    long: (INNO as [number, number])[0],
  },
});

const onSubmit = handleSubmit(async (values) => {
  try {
    loading.value = true;
    submitError.value = null;
    await $csrfFetch("/api/locations", {
      method: "POST",
      body: values,
    });
    submitted.value = true;
    navigateTo("/dashboard");
  }
  catch (error) {
    const err = error as FetchError;
    if (err.data?.data) {
      setErrors(err.data?.data);
    }
    submitError.value = err.data?.statusMessage || err.statusMessage || "An error occurred";
  }
  loading.value = false;
});

onBeforeRouteLeave(() => {
  if (!submitted.value && meta.value.dirty) {
    // eslint-disable-next-line no-alert
    const confirmLeave = window.confirm(
      "You have unsaved changes. Are you sure you want to leave?",
    );
    if (!confirmLeave) {
      return false;
    }
  }
  mapStore.addedPoint = null;
  return true;
});

onMounted(() => {
  mapStore.addedPoint = {
    lat: (INNO as [number, number])[1],
    long: (INNO as [number, number])[0],
    name: "Added point",
    description: "",
    id: 1,
  };
});

effect(() => {
  if (mapStore.addedPoint) {
    setFieldValue("lat", mapStore.addedPoint.lat);
    setFieldValue("long", mapStore.addedPoint.long);
  }
});
</script>

<template>
  <div class="container max-w-md mx-auto mt-5 p-4">
    <div class="my-5">
      <h1 class="text-lg">
        Add Location
      </h1>
      <p class="text-sm">
        A location is a place you have traveled or will travel to.
        It can be a city, country or point of interest.
        You can add specific times you visited this location after adding it.
      </p>
    </div>
    <form class="flex flex-col gap-2" @submit.prevent="onSubmit">
      <div
        v-if="submitError"
        role="alert"
        class="alert alert-error"
      >
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
        <span>{{ submitError }}</span>
      </div>
      <AppFormField
        :disabled="loading"
        type="text"
        name="name"
        label="Name"
        :error="errors.name"
      />
      <AppFormField
        :disabled="loading"
        type="textarea"
        name="description"
        label="Description"
        :error="errors.description"
      />
      <p>Drag the <Icon name="tabler:map-pin-filled" class="text-warning" /> marker to your desired location. </p>
      <p>You can also double-click on the map.</p>
      <p class="text-xs text-gray-400">
        {{ controlledValues.lat?.toFixed(4) }}, {{ controlledValues.long?.toFixed(4) }}
      </p>
      <div class="flex justify-end gap-2">
        <button
          :disabled="loading"
          class="btn btn-outline"
          type="button"
          @click="router.back()"
        >
          <Icon name="tabler:arrow-left" size="16" />
          Cancel
        </button>
        <button
          :disabled="loading"
          class="btn btn-primary"
          type="submit"
        >
          Add
          <span v-if="loading" class="loading loading-dots loading-sm" />
          <Icon
            v-else
            name="tabler:circle-plus-filled"
            size="16"
          />
        </button>
      </div>
    </form>
  </div>
</template>

<style>

</style>
