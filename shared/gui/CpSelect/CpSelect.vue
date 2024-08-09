<template>
	<u-select-menu
		:model-value="selectedItem"
		:options="options"
		@update:model-value="selectHandler"
	/>
</template>

<script lang="ts" setup>
type Props = {
	options: any;
	selectedItem: any;
};
type Events = {
	(event: 'update:modelValue', data: any): void;
};
defineProps<Props>();
const emit = defineEmits<Events>();

const selectHandler = (selectedItem: any) => {
	emit('update:modelValue', selectedItem);
};
</script>

<style lang="scss"></style>
