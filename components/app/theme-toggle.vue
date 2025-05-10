<script lang="ts" setup>
const colorMode = useColorMode();

const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set(val) {
    colorMode.preference = val ? "dark" : "light";
  },
});
</script>

<template>
  <label class="swap swap-rotate mx-4">
    <input v-model="isDark" type="checkbox">
    <Icon
      name="tabler:sun"
      class="swap-on"
      size="24"
    />
    <Icon
      name="tabler:moon-filled"
      class="swap-off"
      size="24"
    />
  </label>
</template>

<style>

</style>
