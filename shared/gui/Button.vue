<template>
  <div class="button__wrapper" @click="buttonClick">
    <button
      :disabled="disabled"
      :type="type" 
      :class="[classFigure, 'button', classSize, classColor]"
      @click="$emit('buttonClick')"
    >
      Sales
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  type: {
    type: String,
    default: 'button',
  },

  figure: {
    type: String,
  },

  disabled: {
    type: boolean,
    default: false,
  },

  size: {
    type: String,
  },

  color: {
    type: String,
  },

  leftIcon: {
    type: String,
  },
});

const classFigure = computed(() => {
  props.figure === 'circle' ? 'button--circle' : props.figure === 'oval' ? 'button--oval' : 'button--square'
})

const classSize = computed(() => {
  props.size === 'small' ? 'button--small' : props.size === 'middle' ? 'button--middle' : 'button--big'
})

const classColor = computed(() => {
  props.color === 'gradient' ? 'button--gradient' : props.color === 'black' ? 'button--black' : props.color === 'white' ? 'button--white' : props.color === 'transperent' ? 'button--transperent' : 'button--grey'
})

</script>

<style scoped lang="scss">
.button {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  border: none;
  background-color: transparent;

  &__wrapper {
  }

  &--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &--circle {
    border-radius: 99px;
    padding: 20px 7px;
  }

  &--square {
    padding: 5px 12px;
    border-radius: 15px;
  }

  &--oval {
    border-radius: 99px;
    padding: 10px 60px;
  }

  &--small {
    height: 50px;
  }

  &--middle {
    height: 60px;
  }

  &--aboveMiddle {
    height: 65;
  }

  &--big {
    height: 70px;
  }

  &--white {
    background: #f6f6f6;
  }

  &--black {
    background: #353333;
    color: #f6f6f6;
  }

  &--grey {
    background: #e7e7e7;
  }

  &--gradient {
    background: linear-gradient(82.62deg, #ffd600 0.76%, #aaaaaa 92.06%);
  }

  &--transperent {
    background: transparent;
  }

  &--17Text {
    line-height: 17px;
  }

  &--21Text {
    line-height: 21px;
  }

  &--22Text {
    line-height: 22px;
  }

  &--25Text {
    line-height: 25px;
  }

  &--28Text {
    line-height: 28px;
  }

  &--31Text {
    line-height: 31px;
  }
}
</style>
