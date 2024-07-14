<template>
  <div>
    <input
      :type="inputType"
      @focus="$emit('focus', $event)"
      @blur="$emit('blur', $event)"
      @input="inputHandler"
    />
  </div>
</template>

<script lang="ts" setup>
type Props = {
  inputType: string;
  modelValue: string;
};

type Events = {
  (event: 'blur' | 'focus', eventData: FocusEvent): void;
  (event: 'input' | 'update:modelValue', eventData: Event): void;
};

defineProps<Props>();
const emit = defineEmits<Events>();

const inputHandler = (event: Event) => {
  emit('input', event);
  emit('update:modelValue', event);
};
</script>
