<template>
  <div class="date-card-carousel">
    <carousel v-bind="settings" :breakpoints="breakpoints">
      <slide v-for="(card, index) in dateData" :key="index">
        <date-card
          :date="card"
          :active="!!(index === activeItem)"
          @click="activeItem = index"
          @dateClick="testHandler"
        />
      </slide>

      <template #addons>
        <navigation />
      </template>
    </carousel>
  </div>
</template>

<script setup lang="ts">
import DateCard from '../gui/DateCard.vue';
import { ref, onMounted } from 'vue';

withDefaults(defineProps<Props>(), {
  dateData: () => [
    {
      day: '1',
      day_week: 'vi',
    },
  ],
});

interface Props {
  dateData?: Array<Date>;
}

interface Date {
  day: string;
  day_week: string;
}

const testHandler = (data: object) => {
  console.log(data);
};

const activeItem: null | number = ref(null);

const settings = {
  itemsToShow: 1,
  itemsToScroll: 5,
  snapAlign: 'start',
  mouseDrag: true,
};

const breakpoints = ref({
  0: {
    itemsToShow: 3,
    // snapAlign: 'center',
  },
  360: {
    itemsToShow: 5.5,
    // snapAlign: 'center',
  },
  768: {
    itemsToShow: 11,
    // snapAlign: 'start',
  },
  1280: {
    itemsToShow: 16,
    // snapAlign: 'start',
  },
  1920: {
    itemsToShow: 25,
    // snapAlign: 'start',
  },
});
</script>

<style scoped lang="css">
.date-card-carousel {
  /* background-color: burlywood; */
}
</style>
