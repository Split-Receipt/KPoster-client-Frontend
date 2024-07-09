<template>
  <div class="date-card-carousel">
    <swiper-container :init="false">
      <swiper-slide
        v-for="(card, index) in [
          dateData,
          dateData,
          dateData,
          dateData,
          dateData,
          dateData,
          dateData,
        ]"
        :key="index"
      >
        <DateCard
          :date="card"
          :active="!!(index === activeItem)"
          @click="activeItem = index"
          @dateClick="testHandler"
        />
      </swiper-slide>
    </swiper-container>
  </div>
</template>

<script setup lang="ts">
import DateCard from '../gui/DateCard.vue';
import { register } from 'swiper/element/bundle';
import { ref, onMounted } from 'vue';

register();

const dateData = {
  day: '25',
  day_week: 'su',
};

const testHandler = (data: object) => {
  console.log(data);
};

const activeItem: null | number = ref(null);

const swiperEl = ref();
onMounted(() => {
  swiperEl.value = document.querySelector("swiper-container");
});

const swiperParams = {
  slidesPerView: 3,
  breakpoints: {
    640: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
    on: {
      init() {
        // ...
      },
    },
  },
};
// Object.assign(swiperEl, swiperParams);
// swiperEl.value.initialize();
</script>

<style scoped lang="css">
.date-card-carousel {
}
</style>
