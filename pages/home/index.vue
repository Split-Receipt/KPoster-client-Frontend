<template>
  <div>
    <!-- <p>Main page <i class="icon icon-arrow-down"  /></p> -->
    <p>Main page</p>
    <!-- <date-card-carousel :date-data="dateData" /> -->
    <!-- <carousel :date-data="dateData" /> -->
    <!-- <vue-carousel :date-data="dateData" /> -->
    <swiper-vue :date-data="dateData" />
  </div>
</template>

<script setup lang="ts">
import DateCardCarousel from '../../shared/gui/DateCardCarousel.vue';
import VueCarousel from '../../shared/gui/VueCarousel.vue';
import SwiperVue from '../../shared/gui/SwiperVue.vue';

const dateData = [
  {
    day: '19',
    day_week: 'su',
  },
  {
    day: '20',
    day_week: 'su',
  },
  {
    day: '21',
    day_week: 'su',
  },
  {
    day: '22',
    day_week: 'su',
  },
  {
    day: '23',
    day_week: 'su',
  },
  {
    day: '24',
    day_week: 'su',
  },
  {
    day: '25',
    day_week: 'su',
  },
  {
    day: '26',
    day_week: 'su',
  },
  {
    day: '27',
    day_week: 'su',
  },
  {
    day: '19',
    day_week: 'su',
  },
  {
    day: '20',
    day_week: 'su',
  },
  {
    day: '21',
    day_week: 'su',
  },
  {
    day: '22',
    day_week: 'su',
  },
  {
    day: '23',
    day_week: 'su',
  },
  {
    day: '24',
    day_week: 'su',
  },
  {
    day: '25',
    day_week: 'su',
  },
  {
    day: '26',
    day_week: 'su',
  },
  {
    day: '27',
    day_week: 'su',
  },
  {
    day: '19',
    day_week: 'su',
  },
  {
    day: '20',
    day_week: 'su',
  },
  {
    day: '21',
    day_week: 'su',
  },
  {
    day: '22',
    day_week: 'su',
  },
  {
    day: '23',
    day_week: 'su',
  },
  {
    day: '24',
    day_week: 'su',
  },
  {
    day: '25',
    day_week: 'su',
  },
  {
    day: '26',
    day_week: 'su',
  },
  {
    day: '27',
    day_week: 'su',
  },
  {
    day: '19',
    day_week: 'su',
  },
  {
    day: '20',
    day_week: 'su',
  },
  {
    day: '21',
    day_week: 'su',
  },
  {
    day: '22',
    day_week: 'su',
  },
  {
    day: '23',
    day_week: 'su',
  },
  {
    day: '24',
    day_week: 'su',
  },
  {
    day: '25',
    day_week: 'su',
  },
  {
    day: '26',
    day_week: 'su',
  },
  {
    day: '27',
    day_week: 'su',
  },
];
</script>
