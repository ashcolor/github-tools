<script setup lang="ts">
interface Props {
  label?: string;
  count?: number;
  rate?: number;
}

const props = withDefaults(defineProps<Props>(), {
  label: "",
  count: 0,
  rate: 0,
});

const test = ref("10%");

const percent = () => {
  return props.rate * 100 + "%";
};
</script>

<template>
  <div class="bg-color flex flex-row place-content-between">
    <span>{{ props.label }}</span>
    <span>{{ props.count }}</span>
  </div>
</template>

<style scoped>
.bg-color {
  background: linear-gradient(
    to right,
    rgba(0, 0, 255, 0.1),
    rgba(255, 255, 255, 0) v-bind("percent()"),
    rgba(255, 255, 255, 0)
  );
}
</style>
