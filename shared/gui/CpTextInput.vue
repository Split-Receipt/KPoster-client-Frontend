<template>
	<div class="inputContainer">
		<input
			:id="props.id"
			:type="props.type"
			:placeholder="props.placeholder"
			@input="handleTextValueUpdate"
		/>
	</div>
</template>

<script setup lang="ts">
type textInputProps = {
	type: string;
	placeholder: string;
	id?: string;
};

type Events = {
	(event: 'update:modelValue', eventData: string): void;
};

const props = defineProps<textInputProps>();
const emit = defineEmits<Events>();

const handleTextValueUpdate = (e: Event) => {
	const target = e.target as HTMLInputElement;
	emit('update:modelValue', target.value);
};
</script>

<style scoped lang="scss">
.inputContainer {
	width: 100%;
	input {
		width: 100%;
		padding: 15px 15px 10px 15px;
		border: none;
		background-color: #f6f6f6;
		border-radius: 12px;
		color: #353333;

		&:focus {
			outline-color: #888888;
		}
	}
}
</style>
