<template>
  <div class="date-card__wrapper">
    <button
      type="button"
      :class="[cardSize[size], { 'date-card--active': active }, 'date-card']"
      :disabled="disabled"
      @click="$emit('dateClick', date)"
    >
      <span
        v-if="size !== 'mini'"
        :class="[cardSizeDay[size as cardSizeDayType], 'date-card__day']"
      >
        {{ date.day }}
      </span>
      <span class="date-card__day-week">
        {{ date.day_week }}
      </span>
    </button>
  </div>
</template>

<script setup lang="ts">
interface Props {
  date: Date;
  size?: cardSizeType | cardSizeDayType;
  active?: boolean;
  disabled?: boolean;
}

interface Date {
  day: string;
  day_week: string;
}

withDefaults(defineProps<Props>(), {
  date: () => ({
    day: '1',
    day_week: 'vi',
  }),
  size: () => 'small',
  active: false,
  disabled: false,
});

defineEmits<Events>();

type Events = {
  (event: 'dateClick', eventData: Date): void;
};

enum cardSize {
  mini = 'date-card--mini',
  small = 'date-card--small',
  medium = 'date-card--medium',
  large = 'date-card--large',
}

enum cardSizeDay {
  medium = 'date-card__day--medium',
}

type cardSizeType = keyof typeof cardSize;
type cardSizeDayType = keyof typeof cardSizeDay;
</script>

<style scoped lang="scss">
.date-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: $date-card-default-width;
  padding: $date-card-default-padding;
  background-color: $date-card-default-background-color;
  border-radius: $date-card-default-border-radius;
  border: 1px solid $date-card-default-border-color;
  cursor: pointer;

  &__wrapper {
    display: inline-block;
  }

  &--mini {
    height: $date-card-height-mini;
  }

  &--small {
    height: $date-card-height-small;
  }

  &--medium {
    height: $date-card-height-medium;
  }

  &--large {
    height: $date-card-height-large;
    padding: $date-card-large-padding;
  }

  &--active {
    background: $date-card-active-background-color;
    border: none;
  }

  &__day {
    font-size: $date-card-day-font-size;
    line-height: $date-card-day-line-height;
    color: $date-card-day-color;

    &--medium {
      font-size: $date-card-day-font-size-medium;
      line-height: $date-card-day-line-height-medium;
    }

    &-week {
      font-size: $date-card-day-week-font-size;
      line-height: $date-card-day-week-line-height;
      color: $date-card-day-week-color;
    }
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    background-color: $date-card-disabled-background-color;
  }
}
</style>
