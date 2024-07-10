<template>
  <div class="date-card-carousel">
    <!-- <swiper-container ref="swiperContainer" :init="false"> -->
    <!-- <swiper-container
      :slides-per-view="10"
      :space-between="10"
      :pagination="{
        clickable: true,
      }"
      :breakpoints="{
        '640': {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        '768': {
          slidesPerView: 4,
          spaceBetween: 40,
        },
        '1024': {
          slidesPerView: 5,
          spaceBetween: 50,
        },
      }"
    >
      <swiper-slide v-for="(card, index) in dateData" :key="index">
        <date-card
          :date="card"
          :active="!!(index === activeItem)"
          @click="activeItem = index"
          @dateClick="testHandler"
        />
      </swiper-slide>
    </swiper-container> -->

    <!-- <Swiper
      :modules="[SwiperAutoplay, SwiperEffectCreative]"
      :slides-per-view="1"
      :loop="true"
      effect="creative"
      :autoplay="{
        delay: 8000,
        disableOnInteraction: true,
      }"
      :creative-effect="{
        prev: {
          shadow: false,
          translate: ['-20%', 0, -1],
        },
        next: {
          translate: ['100%', 0, 0],
        },
      }"
    >
      <SwiperSlide v-for="slide in 10" :key="slide">
        <strong>{{ slide }}</strong>
      </SwiperSlide> -->
    <!-- </Swiper> -->

    <!-- <swiper
      :loop="true"
      :modules="modules"
      :navigation="true"
      :slides-per-view="1"
      :space-between="150"
      @slideChange="onSlideChange"
      @swiper="onSwiper"
      :pagination="true"
      :draggable="true"
    >
      <swiper-slide v-for="slide in data" :key="slide.id">
        <div class="swiper-item">
          <img loading="lazy" :alt="slide.name" :src="slide.image" />
        </div>
      </swiper-slide>
    </swiper> -->
  </div>
</template>

<script setup lang="ts">
import DateCard from '../gui/DateCard.vue';
import { ref, onMounted } from 'vue';
// import { register } from 'swiper/element/bundle';
withDefaults(defineProps<Props>(), {
  dateData: () => [
    {
      day: '1',
      day_week: 'vi',
    },
  ],
});

// register();

interface Props {
  dateData: Array<Date>;
}

interface Date {
  day: string;
  day_week: string;
}

const swiperContainer = ref(null);

const testHandler = (data: object) => {
  // console.log(data);
};

const activeItem: null | number = ref(null);

// const swiperEl = ref();

// const swiperParams = reactive({
//   slidesPerView: 5,
//   breakpoints: {
//     767: {
//       slidesPerView: 11,
//     },
//     // 1024: {
//     //   slidesPerView: 3,
//     // },
//     on: {
//       init() {
//         // ...
//       },
//     },
//   },
// });

// onMounted(() => {
//   swiperEl.value = swiperContainer.value;
//   Object.assign(swiperEl, swiperParams);
//   // swiperEl.value.initialize();
// });
</script>

<style scoped lang="css">
.date-card-carousel {
  /* width: 70%; */
  background-color: burlywood;
}
</style>
