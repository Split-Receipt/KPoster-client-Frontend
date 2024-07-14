<template>
  <div class="cp-input-wrapper">
    <input
      class="cp-input-wrapper__input"
      :type="type"
      v-bind="inputAttrs"
      @focus="$emit('focus', $event)"
      @blur="$emit('blur', $event)"
      @input="inputHandler"
    />
  </div>
</template>

<script lang="ts" setup>
type Props = {
  type?: string;
  modelValue: string | number;
  placeholder?: string;
  disabled?: boolean;
};

type Events = {
  (event: 'blur' | 'focus', eventData: FocusEvent): void;
  (event: 'input' | 'update:modelValue', eventData: Event): void;
};

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  placeholder: '',
  disabled: false,
});
const emit = defineEmits<Events>();

const inputHandler = (event: Event) => {
  emit('input', event);
  emit('update:modelValue', event);
};

//Добавил на будущее для обработки присвоения атрибутов
const inputAttrs = computed(() => {
  const acc: Record<string, string | number> = {
    placeholder: props.placeholder,
  };

  if (props.type !== 'textarea') {
    acc.type = props.type;
  }
  if (props.disabled) {
    acc.disabled = '';
    acc['aria-disabled'] = 'true';
  }

  return acc;
});
</script>

<style lang="scss"></style>
