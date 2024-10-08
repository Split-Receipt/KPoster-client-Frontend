<template>
	<div class="cpInput">
		<label v-if="props.type === 'text' && props.labelText" class="" :for="props.id">
			<strong v-if="props.isRequired">*</strong>
			{{ props.labelText }}
		</label>
		<input
			v-if="props.type === 'text'"
			:id="props.id"
			type="text"
			:placeholder="props.placeholder"
			@input="handleInputValueUpdate"
		/>
		<label v-if="props.type === 'date' && props.labelText" :for="props.id">
			<strong v-if="props.isRequired">*</strong>
			{{ props.labelText }}
		</label>
		<input
			v-if="props.type === 'date'"
			:id="props.id"
			type="text"
			placeholder="ingrese la fecha"
			@focus="dateInputFocus"
			@blur="dateInputBlur"
			@input="handleInputValueUpdate"
		/>
		<label v-if="props.type === 'number' && props.labelText" :for="props.id">
			<strong v-if="props.isRequired">*</strong>
			{{ props.labelText }}
		</label>
		<input
			v-if="props.type === 'number'"
			:id="props.id"
			type="number"
			min="0"
			:placeholder="props.placeholder"
			@input="handleInputValueUpdate"
		/>
	</div>
</template>

<script setup lang="ts">
type textInputProps = {
	type: string;
	placeholder: string;
	id?: string;
	labelText?: string;
	isRequired?: boolean;
};

type Events = {
	(event: 'update:modelValue', eventData: string): void;
};

const props = defineProps<textInputProps>();
const emit = defineEmits<Events>();

const dateInputFocus = (e: Event) => {
	const target = e.target as HTMLInputElement;
	target.type = 'date';
};

const  dateInputBlur = (e: Event) => {
	const target = e.target as HTMLInputElement;
	target.type = 'text';
};

const handleInputValueUpdate = (e: Event) => {
	const target = e.target as HTMLInputElement;
	emit('update:modelValue', target.value);
};
</script>

<style scoped lang="scss">
.cpInput {
	width: 100%;

	label {
		font-size: 22px;
		line-height: 33.6px;
		color: #353333;
		display: flex;
		align-items: center;
		margin-bottom: 5px;

		strong {
			color: red;
			font-size: 32px;
			margin-left: -15px;
			margin-right: 5px;
		}
	}

	input {
		width: 100%;
		padding: 15px 15px 10px 15px;
		border: none;
		background-color: #f6f6f6;
		border-radius: 12px;
		color: #353333;

		&:focus {
			outline: none;
		}

	}
}
</style>
