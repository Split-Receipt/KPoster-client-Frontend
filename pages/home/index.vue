<template>
  <div>
    <p>Main page <i class="icon icon-arrow-down main-page__icon" /></p>
    <div class="conteiner">
      <event-card
        size="medium"
        :event-card-data="eventData"
        @buy-ticket-click="test"
        @learn-more-click="test2"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const test = () => {
  console.log('1');
};
const test2 = () => {
  console.log('2');
};

const eventData = {
  image:
    'https://s3-alpha-sig.figma.com/img/da4c/cedc/5ab62e1bc1d2765cbfcf1da88b70f3bd?Expires=1721606400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=WK~j6fBKPugQ2cJxRPsiL2EpG8a-C04lICJDdOKVL76RfHlm04BhnxLWjq3npC4~t68QIPVt2MP4zMauV5YFf4978arvj51jbH200qrHphqqnz67A0F2n9441XkWyd9hiRwowPrYeC8VlzEf6QgInybZQKx0GrIoo8zIaSST1Q6AVgIi0lnMoX2JfTeU~gilPeaDQhEojG6OkLxBovAeafOWNWJsdwgUyCrDySWA7Xh-EzBmxuv8rZ9xgm6LDnhwvwMr9nPmXhjhrIUyUcTSGM0uYJOHTYpCVnK-XTKFxnuvMup5y6DjQH8bvqVIvUDewDYAxDYwuUuuqAYIsP00pA__',
  title: 'Event Name',
  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut',
  dateEvent: '20/12/2024',
};
</script>

<style lang="scss" scoped>
.conteiner {
  background-color: antiquewhite;
  padding: 20px;
}
</style>
