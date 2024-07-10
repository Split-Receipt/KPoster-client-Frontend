<template>
  <div class="date-card-carousel__wrapper">
    <div class="date-card-carousel">
        <button class="swiper-button-prev date-card-carousel__button" />
      <swiper
        ref="test"
        :modules="[
          SwiperAutoplay,
          SwiperNavigation,
          SwiperMousewheel,
          SwiperEffectCreative,
        ]"
        :mousewheel="true"
        :slides-per-view="'auto'"
        :breakpoints="{
          0: {
            slidesPerView: 5,
            spaceBetween: 25,
          },
          360: {
            slidesPerView: 5.5,
            spaceBetween: 25,
          },
          425: {
            slidesPerView: 7,
            spaceBetween: 25,
          },
          767: {
            slidesPerView: 11,
            spaceBetween: 25,
          },
        }"
        :navigation="{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
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
      </swiper>
      <button class="swiper-button-next date-card-carousel__button" />
    </div>
    <!-- <button class="swiper-button-next" />
    <button class="swiper-button-prev" /> -->
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

const test = ref(null);
onMounted(()=> {
    console.log(JSON.stringify(test.value))
})
</script>

<style scoped lang="scss">
.date-card-carousel {
  position: relative;
  display: flex;
  align-items: center;
  gap: 25px;
  background-color: rgb(135, 202, 222);
  width: 100%;
//   left: 50px;

  &__wrapper {
    // display: flex;
    // justify-content: center;
  background-color: burlywood;

  }

  &__button {
    position: static;
    margin: 0;
    border: none;
    background: none;
  }
}

// .swiper,
// .swiper-wrapper {
//   width: 80%;
// }
.swiper-button-next,
.swiper-rtl .swiper-button-prev {
  right: -35px;
}

.swiper-button-prev,
.swiper-rtl .swiper-button-prev {
  left: -35px;
}
</style>
