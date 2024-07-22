<template>
	<div class="cp-input-container">
		<label v-if="label" class="cp-input__label" :for="inputName">
			<span v-if="labelWithDecor" class="cp-input__label-decor" />
			{{ label }}
		</label>
		<input
			:name="inputName"
			:model-value="modelValue"
			v-bind="$attrs"
			class="cp-input"
			@update:modelValue="handleInput"
		/>
	</div>
</template>

<script lang="ts" setup>
type Props = {
	modelValue: string | number;
	inputName: string;
	label: string;
	labelWithDecor: boolean;
};

type Events = {
	(event: 'update:modelValue', data: string | number): void;
};

withDefaults(defineProps<Props>(), {
	labelWithDecor: true,
});
const emit = defineEmits<Events>();

const handleInput = (inputData: string | number) => {
	emit('update:modelValue', inputData);
};
</script>

<style scoped lang="scss">
.cp-input-container {
	display: flex;
	flex-direction: column;
}

.cp-input {
	border-bottom: 1px solid #d9d9d9;
	font-size: 18px;
	background-color: transparent;

	&::placeholder {
		color: $gray;
	}

	&:focus-visible {
		outline: none;
	}

	&__label {
		display: flex;
		gap: 8px;
	}

	&__label-decor {
		align-self: center;
		display: block;
		border-radius: 50%;
		background: $yellow-gray-gradient;
		width: 20px;
		height: 20px;
	}
}
</style>
