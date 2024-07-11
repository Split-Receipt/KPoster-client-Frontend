<template>
  <div class="footer">
    <footer-list
      v-for="list in footerLists"
      :key="list.id"
      class="footer__list"
      :list="list"
    />
    <c-p-button
      class="footer__button"
      color="yellowGrey"
      shape="oval"
      text="Become a partner"
      size="middle"
    />
  </div>
</template>

<script setup lang="ts">
import FooterList from './FooterList.vue';
import CPButton from '@shared/gui/CPButton.vue';
import { footerLists } from '../model';
</script>

<style scoped lang="scss">
.footer {
  display: flex;
  background: #222121;
  flex-direction: column;
  row-gap: 40px;
  padding: 60px 15px 60px 10px;

  @media #{$screen-tablet} {
    flex-wrap: wrap;
    flex-direction: row;
    column-gap: 78px;
    row-gap: 30px;
    padding: 60px 74px 60px 10px;
  }

  @media #{$screen-desktop} {
    column-gap: 10px;
    padding: 60px 20px 85px;
    justify-content: space-around;
  }

  &__list {
    @media #{$screen-tablet} {
      height: 149px;
      width: 300px;
    }

    @media #{$screen-desktop} {
      min-height: 176px;
      width: 307px;
    }

    @media #{$screen-big-desktop} {
      width: 307px;
      &:nth-child(3) {
        width: 505px;
      }
    }
  }

  &__button {
    @media #{$screen-desktop} {
      align-self: end;
    }
  }
}
</style>
