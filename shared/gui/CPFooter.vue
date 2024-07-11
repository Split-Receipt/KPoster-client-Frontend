<template>
  <div class="footer">
    <div>
      <FooterList />
    </div>
    <CPButton
      color="yellowGrey"
      shape="oval"
      text="Become a partner"
      size="middle"
    />
  </div>
</template>

<script setup lang="ts">
import FooterList from '../gui/FooterList.vue';
import CPButton from '../gui/CPButton.vue';

type Props = {
  infoList: Info;
};

type Info = {
  header: string;
  list?: Array<object>;
};
</script>

<style scoped lang="scss">
.footer {
  display: flex;
  flex-direction: column;
  background: #222121;

  @media #{screen-tablet} {

  }
}
</style>
