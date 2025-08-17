<script setup lang="ts">
const props = defineProps<{
  error?: string;
  label: string;
  name: string;
  value: number;
  disabled?: boolean;
}>();

const { handleBlur, value: inputValue, handleChange } = useField<number>(props.name, {
  initialValue: props.value,
});

function dateChanged(event: Event) {
  const target = event.target as HTMLInputElement;
  handleChange(new Date(target.value).getTime());
}

function formatDate(value: number | string) {
  const date = new Date(value);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const formatted = `${year}-${month}-${day}`;
  return formatted;
}
</script>

<template>
  <fieldset class="fieldset">
    <legend class="fieldset-legend">
      {{ props.label }}
    </legend>
    <input
      :disabled="props.disabled"
      type="date"
      :name="props.name"
      class="w-full input"
      :class="{
        'input-error': props.error,
      }"
      :value="formatDate(inputValue)"
      @change="dateChanged"
      @blur="handleBlur"
    >
    <p v-if="props.error" class="label text-error">
      {{ props.error }}
    </p>
  </fieldset>
</template>
