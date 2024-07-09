<template>
  <div class="button__wrapper" @click="buttonClick">
    <button
      :disabled="disabled"
      :type="type" 
      :class="[, 'button', , ]"
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

const figure = {circle: 'button--circle', 
                oval: 'button--oval',
                square: 'button--square'
         }

const size = {small: 'button--small', 
              middle: 'button--middle', 
              big: 'button--big', huge: 'button--huge'
       }

const color = {yellow-grey: 'button--yellow-grey', 
              black: 'button--black', 
              white: 'button--white', 
              transperent: 'button--transperent', 
              grey: 'button--grey'
        } 

</script>

<style scoped lang="scss">
.button {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  border: none;
  background-color: transparent;

  &:disabled {
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
    &--xs {
      line-height: 21px;
    }
    &--xl {
      line-height: 31px;
    }
  }

  &--middle {
    height: 60px;
    &--xxs {
      line-height: 17px;
    }
    &--xs {
      line-height: 21px;
    }
    &--s {
      line-height: 22px;
    }
  }

  &--big {
    height: 65;
    &--m {
      line-height: 25px;
    }
  }

  &--huge {
    height: 70px;
    &--l {
      line-height: 28px;
    }
    &--xl {
      line-height: 31px;
    }
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

  &--yellow-grey {
    background: linear-gradient(82.62deg, #ffd600 0.76%, #aaaaaa 92.06%);
  }

  &--transperent {
    background: transparent;
  }
}
</style>
