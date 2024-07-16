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
        :modules="[SwiperNavigation, SwiperGrid]"
        space-between="20"
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
          },
          1280: {
            slidesPerView: 2,
            grid: {
              fill: 'row',
              rows: 2,
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
          <event-card :event-card-data="card" />
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script setup lang="ts">
type Props = {
  eventData: Array<CardData>;
};

type CardData = {
  image: string;
  title: string;
  text: string;
  dateEvent: string;
};

withDefaults(defineProps<Props>(), {
  eventData: () => [
    {
      image: 'event-card-1.jpg',
      title: 'Event Name',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      dateEvent: '01/01/2024',
    },
  ],
});
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
