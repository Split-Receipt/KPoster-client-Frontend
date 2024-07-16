<template>
  <div class="header">
    <img src="/images/header-background.jpeg" class="header__img-pic" />
  </div>
  <div class="header__icons">
    <img src="/images/logo.svg" class="icon icon-logo header__icon-logo" />
    <div class="header__menu">
      <div class="header__ovals">
        <c-p-button
          shape="oval"
          color="yellowGrey"
          text="Sales"
          size="middle"
        />
        <c-p-button shape="oval" color="yellowGrey" text="News" size="middle" />
        <c-p-button
          shape="oval"
          color="yellowGrey"
          text="Charity"
          size="middle"
        />
      </div>
      <div class="header__circles">
        <c-p-button
          shape="circle"
          color="transparent"
          left-icon="icon icon-search"
        />
        <c-p-button
          shape="circle"
          color="transparent"
          left-icon="icon icon-login"
        />
        <c-p-button
          shape="circle"
          color="transparent"
          left-icon="icon icon-ticket"
        />
      </div>
    </div>
    <img
      src="/images/burger-menu.svg"
      class="icon icon-burger-menu header__icon-burger-menu"
    />
  </div>
</template>

<script setup lang="ts">
import CPButton from '../../../shared/gui/CPButton.vue';
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
  &__icons {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 87px;
    @media #{$screen-tablet} {
      height: 110px;
    }
    @media #{$screen-desktop} {
      margin-top: 30px;
      justify-content: space-around;
    }
  }
  &__icon-burger-menu {
    margin-right: 10px;
    @media #{$screen-tablet} {
      background-color: #f6f6f6;
      border-radius: 99px;
      margin-right: 10px;
      width: 140px;
      height: 74px;
      padding: 25px 20px;
    }
    @media #{$screen-desktop} {
      display: none;
    }
  }
  &__icon-logo {
    margin-left: 10px;
    @media #{$screen-tablet} {
      background-color: #f6f6f6;
      border-radius: 99px;
      margin-left: 10px;
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
      background-color: #f6f6f6;
      border-radius: 99px;
    }
  }
  &__circles {
    display: none;
    @media #{$screen-desktop} {
      display: flex;
      align-items: center;
      gap: 15px;
      width: 60px;
      height: 60px;
    }
  }
  &__ovals {
    display: none;
    @media #{$screen-desktop} {
      display: flex;
      justify-content: space-around;
      gap: 15px;
    }
  }
  // @media #{$screen-big-desktop} {
  // }
}
</style>
