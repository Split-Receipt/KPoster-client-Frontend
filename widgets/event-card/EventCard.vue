<template>
  <div class="event-card__wrapper">
    <div class="event-card" :class="[eventCardSize[size]]">
      <div class="event-card__img" :class="[eventCardImageSize[size]]">
        <img class="event-card__img-pic" :src="eventCardData.image" />
      </div>
      <h4 class="event-card__title">
        {{ eventCardData.title }}
      </h4>
      <span class="event-card__text" :class="[eventCardTextSize[size]]">
        {{ eventCardData.text }}
      </span>
      <span
        class="event-card__date"
        :class="[eventCardDateSize[size as eventCardDateSizeType]]"
      >
        {{ eventCardData.dateEvent }}
      </span>

      <div class="event-card__controls">
        <button
          class="event-card__button event-card__button--yellow-grey"
          :class="[eventCardButtonSize[size]]"
          @click="$emit('buyTicketClick')"
        >
          Buy ticket
        </button>

        <button
          class="event-card__button event-card__button--transparent"
          :class="[eventCardButtonSize[size]]"
          @click="$emit('learnMoreClick')"
        >
          Learn more
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
type Props = {
  size?:
  | eventCardSizeType
  | eventCardImageSizeType
  | eventCardButtonSizeType
  | eventCardDateSizeType
  | eventCardTextSizeType;
  eventCardData: CardData;
};

type CardData = {
  image: string;
  title: string;
  text: string;
  dateEvent: string | number;
};

withDefaults(defineProps<Props>(), {
  size: 'small',
  eventCardData: () => ({
    image: '',
    title: 'Event Name',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    dateEvent: '01/01/2024',
  }),
});

defineEmits<Events>();

type Events = {
  (event: 'buyTicketClick' | 'learnMoreClick'): void;
};

enum eventCardSize {
  small = 'event-card--small',
  medium = 'event-card--medium',
  large = 'event-card--large',
}

enum eventCardImageSize {
  small = 'event-card__img--small',
  medium = 'event-card__img--medium',
  large = 'event-card__img--large',
}

enum eventCardTextSize {
  small = 'event-card__text--small',
  medium = 'event-card__text--medium',
  large = 'event-card__text--large',
}

enum eventCardDateSize {
  small = 'event-card__date--small',
  medium = 'event-card__date--medium',
}

enum eventCardButtonSize {
  small = 'event-card__button--small',
  medium = 'event-card__button--medium',
  large = 'event-card__button--large',
}

type eventCardSizeType = keyof typeof eventCardSize;
type eventCardImageSizeType = keyof typeof eventCardImageSize;
type eventCardButtonSizeType = keyof typeof eventCardButtonSize;
type eventCardDateSizeType = keyof typeof eventCardDateSize;
type eventCardTextSizeType = keyof typeof eventCardTextSize;
</script>

<style scoped lang="scss">
.event-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  padding: $event-card-default-padding;
  border-radius: $event-card-default-border-radius;

  background-color: $event-card-text-background-color;

  &--small {
    gap: 15px;
    height: 565px;
    border-radius: 30px;

    @media #{$screen-tablet} {
      gap: 20px;
      height: 674px;
    }

    @media #{$screen-desktop} {
      height: 676px;
      border-radius: 40px;
    }

    @media #{$screen-big-desktop} {
      height: 761px;
    }
  }

  &--medium {
    gap: 14px;
    height: 605px;

    @media #{$screen-tablet} {
      gap: 20px;
      height: 698px;
    }

    @media #{$screen-desktop} {
      border-radius: 40px;
      height: 665px;
    }

    @media #{$screen-big-desktop} {
      border-radius: 35px;
      height: 805px;
    }
  }

  &--large {
    gap: 20px;
    height: 800px;
  }

  &__img {
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 300px;

    &--small {
      height: 255px;

      @media #{$screen-desktop} {
        height: 300px;
      }
    }

    &--large {
      height: 460px;
    }

    &-pic {
      width: 100%;
      height: inherit;
      object-fit: cover;
      font-family: 'object-fit: cover';
      border-radius: 30px;
    }
  }

  &__title {
    position: relative;
    top: 3px;
    display: -webkit-box;
    height: 29px;
    -webkit-box-orient: vertical;
    overflow: hidden;
    line-clamp: 1;
    -webkit-line-clamp: 1;
    text-overflow: ellipsis;

    @media #{$screen-tablet} {
      top: 0;
    }

    @media #{$screen-desktop} {
      top: 3px;
      height: 48px;
    }
  }

  &__text {
    position: relative;
    top: 5px;
    font-size: 13px;
    line-height: 21px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    color: $event-card-text-color;
    height: 42px;
    max-width: 80%;
    line-clamp: 2;
    -webkit-line-clamp: 2;

    @media #{$screen-tablet} {
      font-size: 16px;
      line-height: 26px;
    }

    @media #{$screen-big-desktop} {
      font-size: 22px;
      line-height: 35px;
    }

    &--small {
      @media #{$screen-tablet} {
        height: 78px;
        line-clamp: 3;
        -webkit-line-clamp: 3;
      }

      @media #{$screen-desktop} {
        top: -2px;
        height: 98px;
        line-clamp: 4;
        -webkit-line-clamp: 4;
      }

      @media #{$screen-big-desktop} {
        top: 10px;
        height: 175px;
        line-clamp: 5;
        -webkit-line-clamp: 5;
      }
    }

    &--medium {
      @media #{$screen-tablet} {
        height: 52px;
        line-clamp: 2;
        -webkit-line-clamp: 2;
      }

      @media #{$screen-desktop} {
        height: 104px;
        line-clamp: 4;
        -webkit-line-clamp: 4;
      }

      @media #{$screen-big-desktop} {
        height: 210px;
        line-clamp: 6;
        -webkit-line-clamp: 6;
      }
    }

    &--large {
      height: 60px;

      @media #{$screen-tablet} {
        height: 78px;
        line-clamp: 3;
        -webkit-line-clamp: 3;
      }

      @media #{$screen-big-desktop} {
        height: 60px;
        line-clamp: 2;
        -webkit-line-clamp: 2;
      }
    }
  }

  &__date {
    position: relative;
    top: 3px;
    font-size: 15px;
    line-height: 21px;
    height: 21px;

    @media #{$screen-tablet} {
      font-size: 22px;
      line-height: 31px;
      height: 31px;
    }

    &--small {
      @media #{$screen-desktop} {
        top: 4px;
        font-size: 30px;
        line-height: 42px;
        height: 42px;
      }

      @media #{$screen-big-desktop} {
        top: 6px;
      }
    }

    &--medium {
      @media #{$screen-desktop} {
        font-size: 20px;
        line-height: 28px;
        height: 28px;
      }

      @media #{$screen-big-desktop} {
        font-size: 30px;
        line-height: 42px;
        height: 42px;
      }
    }
  }

  &__controls {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
  }

  &__button {
    font-size: 15px;
    line-height: 21px;
    height: 51px;
    padding: 15px 40px;
    border: none;
    cursor: pointer;
    border-radius: 99px;

    @media #{$screen-tablet} {
      font-size: 20px;
      line-height: 28px;
      height: 68px;
    }

    &--yellow-grey {
      background: $button-gradient-background-color;
    }

    &--transparent {
      background: transparent;
      border: 1px solid $button-border-dusty-gray;
    }

    &--small {
      @media #{$screen-tablet} {
        padding: 20px 50px;
      }

      @media #{$screen-desktop} {
        font-size: 16px;
        line-height: 22px;
        height: 62px;
      }

      @media #{$screen-big-desktop} {
        font-size: 16px;
        line-height: 22px;
        height: 62px;
      }
    }

    &--medium {
      &:nth-child(2) {
        margin-top: -5px;
      }

      @media #{$screen-tablet} {
        padding: 20px 60px;

        &:nth-child(2) {
          margin-top: 5px;
        }
      }

      @media #{$screen-desktop} {
        font-size: 18px;
        line-height: 25px;
        height: 65px;

        &:nth-child(2) {
          margin: 0 0 0 5px;
        }
      }

      @media #{$screen-big-desktop} {
        font-size: 22px;
        line-height: 31px;
        height: 71px;
      }
    }

    &--large {
      padding: 20px 60px;

      &:nth-child(2) {
        margin-top: -5px;
      }

      @media #{$screen-desktop} {
        font-size: 18px;
        line-height: 25px;
        height: 65px;

        &:nth-child(2) {
          margin: 0 0 0 5px;
        }
      }
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
}
</style>
