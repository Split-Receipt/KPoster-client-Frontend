<template>
  <div class="header__wrapper">
    <div class="header__img">
      <img src="/images/header-background.jpeg" class="header__img-pic" />
    </div>

    <div class="header__controls">
      <img src="/images/logo.svg" class="icon icon-logo header__icon-logo" />

      <div class="header__menu">
        <div class="header__buttons header__buttons--oval">
          <c-p-button shape="oval" color="yellowGrey" text="Sales" />
          <c-p-button shape="oval" color="yellowGrey" text="News" />
          <c-p-button shape="oval" color="yellowGrey" text="Charity" />
        </div>

        <div class="header__buttons header__buttons--circle">
          <button class="header__button header__button--circle">
            <i class="icon icon-search header__button-icon" />
          </button>

          <button class="header__button header__button--circle">
            <i class="icon icon-login header__button-icon" />
          </button>

          <button class="header__button header__button--circle">
            <i
              class="icon icon-ticket header__button-icon header__button-ticket"
            />
          </button>
        </div>
      </div>

      <img src="/images/burger-menu.svg" class="header__icon-burger-menu" />
    </div>
  </div>
</template>

<script setup lang="ts">
import CPButton from '@shared/gui/CPButton.vue';
</script>

<style scoped lang="scss">
.header {
  display: flex;

  &__img {
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 150px;

    &-pic {
      width: 100%;
      height: 150px;
      object-fit: cover;
      font-family: 'object-fit: cover';
    }
  }

  &__controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 87px;
    padding: 0 10px;

    @media #{$screen-tablet} {
      height: 110px;
    }

    @media #{$screen-desktop} {
      margin-top: 25px;
      padding: 0 20px;
    }
  }

  &__icon-burger-menu {
    @media #{$screen-tablet} {
      background-color: #f6f6f6;
      border-radius: 99px;
      width: 140px;
      height: 74px;
      padding: 25px 20px;
    }

    @media #{$screen-desktop} {
      display: none;
    }
  }

  &__icon-logo {
    @media #{$screen-tablet} {
      background-color: #f6f6f6;
      border-radius: 99px;
      width: 191px;
      height: 79px;
      padding: 10px 15px;
    }

    @media #{$screen-desktop} {
      width: 241px;
      height: 104px;
      padding: 15px 20px;
    }
  }

  &__menu {
    display: none;

    @media #{$screen-desktop} {
      display: flex;
      align-items: center;
      padding: 5px 10px;
      gap: 40px;
      background-color: white;
      border-radius: 99px;
    }
  }

  &__buttons {
    gap: 15px;

    &--circle {
      display: none;

      @media #{$screen-desktop} {
        display: flex;
      }
    }

    &--oval {
      display: none;

      @media #{$screen-desktop} {
        display: flex;
      }
    }
  }

  &__button {
    border: none;
    background-color: #e7e7e7;

    &--circle {
      height: 60px;
      width: 60px;
      border-radius: 99px;
    }

    &-icon {
      font-size: 35px;
    }

    &-ticket {
      font-size: 40px;
      line-height: 10px;
    }
  }
}
</style>
