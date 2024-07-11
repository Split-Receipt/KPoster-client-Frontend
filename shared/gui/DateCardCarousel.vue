<template>
  <div class="date-card-carousel__wrapper">
    <div class="date-card-carousel">
      <c-p-button
        shape="circle"
        color="transparent"
        left-icon="arrow-left"
        class="swiper-button-prev date-card-carousel__button"
      />

      <swiper
        :modules="[SwiperNavigation, SwiperMousewheel, SwiperEffectCreative]"
        :mousewheel="true"
        slides-per-view="auto"
        space-between="15"
        :breakpoints="{
          0: {
            navigation: {
              enabled: false,
            },
          },
          1280: {
            navigation: {
              enabled: true,
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
          },
        }"
      >
        <swiper-slide
          v-for="(card, index) in dateData"
          :key="index"
          class="date-card-carousel__item"
        >
          <div v-if="card.day == '1'" class="date-card-carousel__month">
            August
          </div>
          <div>
            <date-card
              class="date-card-carousel__day"
              :date="card"
              :size="sizeCard"
              :active="!!(index === activeItem)"
              @click="activeItem = index"
              @date-click="$emit('activeItemHandler', card)"
            />
          </div>
        </swiper-slide>
      </swiper>

      <c-p-button
        shape="circle"
        color="black"
        left-icon="arrow-right"
        class="swiper-button-next date-card-carousel__button"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Ref } from 'vue';
import { ref, onMounted } from 'vue';

withDefaults(defineProps<Props>(), {
  dateData: () => [
    {
      day: '1',
      day_week: 'vi',
    },
  ],
});

defineEmits<Events>();

interface Props {
  dateData?: Array<Date>;
}

interface Date {
  day: string;
  day_week: string;
}

type Events = {
  (event: 'activeItemHandler', eventData: Date): void;
};

const activeItem: Ref<number | null> = ref(null);

const sizeCard: Ref<string> = ref('');

onMounted(() => {
  window.addEventListener('resize', resizeHandler);

  resizeHandler();
});

const resizeHandler = () => {
  const width = document.body.clientWidth;

  if (width > 767 && width < 1279) {
    sizeCard.value = 'medium';
  } else {
    sizeCard.value = 'small';
  }
};
</script>

<style scoped lang="scss">
.date-card-carousel {
  position: relative;
  display: flex;
  align-items: center;
  gap: 15px;
  width: 100%;
  height: 100%;

  &__wrapper {
    height: $date-card-carousel-wrapper-height;
  }

  &__button {
    position: static;
    display: none;
    width: auto;
    margin: 0;
    border: none;
    background: none;

    @media #{$screen-desktop} {
      display: block;
      margin: $date-card-carousel-button-margin;
    }
  }

  &__item {
    position: relative;
  }

  &__month {
    position: absolute;
    bottom: $date-card-carousel-month-bottom;
    font-size: $date-card-carousel-month-font-size;
    line-height: $date-card-carousel-month-line-height;
    border-bottom: 1px solid $date-card-carousel-month-border-color;
    color: $date-card-carousel-month-color;
  }
}

.swiper {
  height: 100%;
}

.swiper-button-next {
  &::after {
    content: '';
  }

  .swiper-rtl .swiper-button-next {
    right: $date-card-carousel-button-next-right;
  }
}

.swiper-button-prev {
  &::after {
    content: '';
  }

  .swiper-rtl .swiper-button-prev {
    left: $date-card-carousel-button-prev-left;
  }
}

.swiper-slide {
  width: auto;
  padding: $date-card-carousel-swiper-slide-padding-mobile;

  @media #{$screen-tablet} {
    padding: $date-card-carousel-swiper-slide-padding-tablet;
  }
}
</style>
