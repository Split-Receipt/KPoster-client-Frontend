<template>
  <label v-for="item in region" :key="item.name">
    <input v-model="selectedRegion" :value="item.name" type="checkbox" />
    <span>{{ item.name }}</span>
  </label>
</template>

<script setup lang="ts">
type Props = {
  region: Array;
};
</script>

<style scoped lang="scss">
</style>
