<template>
  <div class="event-carousel__wrapper">
    <div class="event-carousel">
      <div class="event-carousel__controls">
        <c-p-button
          shape="square"
          color="transparent"
          left-icon="arrow-left"
          class="swiper-button-prev event-carousel__button"
        />
        <c-p-button
          shape="square"
          color="black"
          left-icon="arrow-right"
          class="swiper-button-next event-carousel__button"
        />
      </div>

      <swiper
        :modules="[SwiperNavigation, SwiperGrid, SwiperMousewheel]"
        space-between="20"
        :observer="true"
        :observe-parents="true"
        :navigation="{
          enabled: true,
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }"
        :breakpoints="{
          0: {
            slidesPerView: 1.5,
            navigation: {
              enabled: true,
            },
            grid: {
              fill: 'row',
              rows: 1,
            },
            mousewheel: {
              enabled: true,
            },
          },
          768: {
            slidesPerView: 2.5,
            navigation: {
              enabled: true,
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
            grid: {
              fill: 'row',
              rows: 1,
            },
            mousewheel: {
              enabled: false,
            },
          },
          1280: {
            slidesPerView: 2,
            grid: {
              fill: 'row',
              rows: 2,
            },
            mousewheel: {
              enabled: false,
            },
          },
          1920: {
            slidesPerView: 4,
            grid: {
              fill: 'row',
              rows: 1,
            },
          },
        }"
      >
        <swiper-slide v-for="(card, index) in eventData" :key="index">
          <event-card :event-card-data="card" :size="sizeCard" />
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUpdated } from 'vue';
type Props = {
  sizeCard?: string;
};

withDefaults(defineProps<Props>(), {
  sizeCard: 'small',
});

const eventData = [
  {
    image: 'event-card-1.jpg',
    title: 'Event Name',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut',
    dateEvent: '20/12/2024',
  },
  {
    image: 'event-card-2.jpg',
    title: 'Event Name',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut',
    dateEvent: '20/12/2024',
  },
  {
    image: 'event-card-3.jpg',
    title: 'Event Name',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut',
    dateEvent: '20/12/2024',
  },
  {
    image: 'event-card-4.jpg',
    title: 'Event Name',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut',
    dateEvent: '20/12/2024',
  },
  {
    image: 'event-card-5.jpg',
    title: 'Event Name',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut',
    dateEvent: '20/12/2024',
  },
  {
    image: 'event-card-6.jpg',
    title: 'Event Name',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut',
    dateEvent: '20/12/2024',
  },
  {
    image: 'event-card-7.jpg',
    title: 'Event Name',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut',
    dateEvent: '20/12/2024',
  },
  {
    image: 'event-card-8.jpg',
    title: 'Event Name',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut',
    dateEvent: '20/12/2024',
  },
  {
    image: 'event-card-9.jpg',
    title: 'Event Name',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut',
    dateEvent: '20/12/2024',
  },
  {
    image: 'event-card-10.jpg',
    title: 'Event Name',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut',
    dateEvent: '20/12/2024',
  },
  {
    image: 'event-card-11.jpg',
    title: 'Event Name',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut',
    dateEvent: '20/12/2024',
  },
  {
    image: 'event-card-12.jpg',
    title: 'Event Name',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut',
    dateEvent: '20/12/2024',
  },
];
</script>

<style scoped lang="scss">
.event-carousel {
  &__controls {
    position: relative;
    display: flex;
    justify-content: flex-end;
    gap: 20px;
  }

  &__button {
    position: static;
    width: auto;
    display: none;

    @media #{$screen-tablet} {
      display: block;
    }
  }
}

.swiper {
  padding-top: 55px;
}

.swiper-button-next {
  &::after {
    content: '';
  }
}
.swiper-button-prev {
  &::after {
    content: '';
  }
}
</style>
