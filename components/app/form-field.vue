<script setup lang="ts">
const props = defineProps<{
  error?: string;
  label: string;
  name: string;
  type: "text" | "textarea" | "number";
  disabled?: boolean;
}>();
</script>

<template>
  <fieldset class="fieldset">
    <legend class="fieldset-legend">
      {{ props.label }}
    </legend>
    <Field
      :disabled="props.disabled"
      :as="type === 'textarea' ? type : 'input'"
      :type="type"
      :name="props.name"
      class="w-full"
      :class="{
        'input-error': props.error,
        'input': type === 'text' || type === 'number',
        'textarea': type === 'textarea',
      }"
    />
    <p v-if="props.error" class="label text-error">
      {{ props.error }}
    </p>
  </fieldset>
</template>
