<script lang="ts" setup>
const props = defineProps<{
  icon: string;
  text: string;
  href: string;
  showLabel: boolean;
}>();

const route = useRoute();
</script>

<template>
  <div
    :class="{ tooltip: !showLabel }"
    class="hover:tooltip-open tooltip-right"
    :data-tip="showLabel ? undefined : props.text"
  >
    <NuxtLink
      :class="{
        'bg-base-200': route.path === props.href,
        'justify-center': !props.showLabel,
        'justify-start': props.showLabel,
      }"
      class="flex g-2 p-2 hover:bg-base-300 hover:cursor-pointer flex-nowrap"
      :to="props.href"
    >
      <Icon
        :name="props.icon"
        size="24"
        :class="{ 'mr-2': showLabel }"
      />
      <Transition name="grow">
        <span v-if="showLabel">{{ props.text }}</span>
      </Transition>
    </NuxtLink>
  </div>
</template>

<style scoped>
.grow-enter-active {
  animation: grow 0.1s;
}
.grow-leave-active {
  animation: grow 0.1s reverse;
}
@keyframes grow {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
</style>
