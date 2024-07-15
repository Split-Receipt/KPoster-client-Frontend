<template>
  <div>
    <p>Main page</p>
    <cp-date-card :size="cardSize.mini" />
  </div>
</template>

<script setup lang="ts">
import { CpDateCard, cardSize } from '@shared/gui/CpDatecard';
</script>
