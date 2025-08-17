<script setup lang="ts">
import { INNO } from "~/lib/constants";
import { InsertLocation } from "~/lib/db/schema";

const props = defineProps<{
  initialValues?: InsertLocation;
  onSubmit: (location: InsertLocation) => Promise<any>;
  onSubmitComplete: () => void;
  submitLabel: string;
  submitIcon: string;
  zoom?: number;
}>();
</script>

<template>
  <LocationBaseForm
    v-slot="{ errors, loading }"
    :schema="InsertLocation"
    :initial-values="props.initialValues || {
      name: '',
      description: '',
      long: (INNO as [number, number])[0],
      lat: (INNO as [number, number])[1],
    }"
    :on-submit
    :on-submit-complete
    :submit-label
    :submit-icon
    :zoom="props.zoom || 6"
  >
    <AppFormField
      name="name"
      label="Name"
      type="text"
      :error="errors.name"
      :disabled="loading"
    />

    <AppFormField
      name="description"
      label="Description"
      type="textarea"
      :error="errors.description"
      :disabled="loading"
    />
  </LocationBaseForm>
</template>
