<template>
  <div class="date-card-carousel__wrapper">
    <div v-if="dateLoaded" class="date-card-carousel">
      <c-p-button
        shape="circle"
        color="transparent"
        left-icon="arrow-left"
        class="swiper-button-prev date-card-carousel__button"
      />

      <swiper
        :modules="[SwiperNavigation, SwiperMousewheel]"
        :mousewheel="true"
        slides-per-view="auto"
        space-between="15"
        :breakpoints="{
          0: {
            slidesPerGroup: 3,
            navigation: {
              enabled: false,
            },
          },
          768: {
            slidesPerGroup: 5,
          },
          1280: {
            slidesPerGroup: 7,
            navigation: {
              enabled: true,
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
          },
        }"
      >
        <swiper-slide
          v-for="(card, index) in allDaysOfInterval"
          :key="index"
          class="date-card-carousel__item"
        >
          <div v-if="card.day == '1'" class="date-card-carousel__month">
            {{ card.mounth }}
          </div>
          <div>
            <date-card
              class="date-card-carousel__day"
              :date="card"
              :disabled="card.disabled"
              :active="!!(index === activeItem)"
              @date-click="$emit('activeItemHandler', card.dateString)"
              @click="activeItem = index"
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
import {
  eachDayOfInterval,
  format,
  setDefaultOptions,
  startOfDay,
  addDays,
  addMonths,
} from 'date-fns';
import { es } from 'date-fns/locale';

const props = withDefaults(defineProps<Props>(), {
  dateStart: () => addDays(new Date(), -3),
  dateEnd: () => addMonths(new Date(), 3),
});

defineEmits<Events>();

type Props = {
  dateStart?: Date;
  dateEnd?: Date;
};

type AllDaysOfInterval = {
  dateString: Date;
  day: string;
  weekDay: string;
  mounth: string;
  disabled: boolean;
};

type Events = {
  (event: 'activeItemHandler', eventData: Date): void;
};

const activeItem: Ref<number | null> = ref(null);

const dateLoaded = ref(false);
const allDaysOfInterval: Ref<Array<AllDaysOfInterval>> = ref([]);
const dateNow = new Date();

setDefaultOptions({ locale: es }); // #TODO - вынести date fns в отдельный модуль

const createAllDaysOfInterval = () => {
  eachDayOfInterval({
    start: props.dateStart,
    end: props.dateEnd,
  }).forEach((date) => {
    return allDaysOfInterval.value.push({
      dateString: date,
      day: format(date, 'd'),
      weekDay: format(date, 'EEEEEE').toLowerCase(),
      mounth: format(date, 'MMMM'),
      disabled:
        startOfDay(date).getTime() < startOfDay(dateNow).getTime()
          ? true
          : false,
    });
  });

  dateLoaded.value = true;
};

onMounted(async () => {
  createAllDaysOfInterval();
});
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
  overflow: hidden;
  margin-left: 0;
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
