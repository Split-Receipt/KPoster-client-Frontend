<template>
	<div class="textArea">
		<textarea
			:id="textAreaId"
			:value="modelValue"
			class="textArea__input"
			:placeholder="textAreaPlaceholder"
			@input="handleUpdateValue"
		/>
	</div>
</template>

<script setup lang="ts">
type TextAreaProps = {
	modelValue: string;
	textAreaId: string;
	textAreaPlaceholder: string;
};

type Events = {
	(event: 'update:modelValue', eventData: string): void;
};

defineProps<TextAreaProps>();
const emit = defineEmits<Events>();

const handleUpdateValue = (e: Event) => {
	const target = e.target as HTMLInputElement;
	emit('update:modelValue', target.value);
};
</script>

<style scoped lang="scss">
.textArea {
	&__input {
		width: 100%;
		padding: 20px;
		border: none;
		background-color: #f6f6f6;
		border-radius: 12px;
		color: #353333;
		height: 250px;
		resize: none;

		&:focus {
			outline: none;
		}
	}

	&__label {
		margin-bottom: 15px;
		font-size: 22px;
		line-height: 35.2px;
		color: #353333;
	}
}
</style>
