<script lang="ts" setup>
import { INNO } from "~/lib/constants";

const colorMode = useColorMode();
const style = computed(() => {
  return colorMode.value === "dark"
    ? "/styles/dark.json"
    : "https://tiles.openfreemap.org/styles/liberty";
});
const zoom = 3;
</script>

<template>
  <MglMap
    :map-style="style"
    :center="INNO"
    :zoom="zoom"
  >
    <MglGeolocateControl />
    <MglNavigationControl />
  </MglMap>
</template>
