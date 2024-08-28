<template>
	<div class="socialMedia">
		<label class="socialMedia__label" :for="props.id">
			<span v-if="props.circle" class="socialMedia__label-circle" />
			{{ props.labelText }}
		</label>
		<input
			:id="props.id"
			class="socialMedia__input"
			type="text"
			:placeholder="props.placeholder"
			@input="inputValueUpdate"
		/>
	</div>
</template>

<script setup lang="ts">
type socialMediaProps = {
	id: string;
	type?: string;
	placeholder: string;
	labelText: string;
	circle?: boolean;
};

type Events = {
	(event: 'update:modelValue', eventData: string): void;
};

const props = defineProps<socialMediaProps>();
const emit = defineEmits<Events>();

const inputValueUpdate = (e: Event) => {
	const target = e.target as HTMLInputElement;
	emit('update:modelValue', target.value);
};
</script>

<style scoped lang="scss">
.socialMedia {
	display: flex !important;
	flex-direction: column !important;
	align-items: flex-start !important;

	&__label {
		font-size: 22px;
		line-height: 35.2px;
		color: #353333;
		display: flex;
		align-items: center;

		&-circle {
			height: 20px;
			width: 20px;
			display: block;
			border-radius: 50%;
			background: $button-gradient-background-color;
			margin-right: 7.5px;
			margin-bottom: 4px;
		}
	}

	&__input {
		outline: none;
		border: none;
		width: 100%;
		background: $default-background;
		border-bottom: 1px solid #d9d9d9;
		color: #888888;
		font-size: 18px;

		&:focus {
			border-bottom: 1px solid #888888;
		}
	}
}
</style>
