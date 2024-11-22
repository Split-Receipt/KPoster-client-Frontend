<template>
	<div class="socialMedia">
		<label class="socialMedia__label" :for="props.id">
			<span v-if="props.circle" class="socialMedia__label-circle" />
			{{ props.labelText }}
			<cp-info-pop-up
				v-if="props.tooltip"
				:id="props.id"
				info="Selecciona redes sociales donde podrás compartir el enlace del evento."
			/>
			<strong
				v-if="props.requiredField"
				class="socialMedia__label-info-required"
			>
				*</strong
			>
		</label>
		<input
			:id="props.id"
			:value="props.modelValue"
			class="socialMedia__input"
			:type="props.type"
			v-bind="$attrs"
			:placeholder="props.placeholder"
			@input="inputValueUpdate"
		/>
	</div>
</template>

<script setup lang="ts">
type socialMediaProps = {
	modelValue: string;
	id: string;
	type?: string;
	placeholder: string;
	labelText: string;
	circle?: boolean;
	tooltip?: boolean;
	tooltipText?: string;
	requiredField?: boolean;
};

type Events = {
	(event: 'update:modelValue', eventData: string): void;
};

const props = withDefaults(defineProps<socialMediaProps>(), {
	type: 'text',
	tooltipText: '',
	requiredField: false,
});
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

		&-info-required {
			margin-top: -5px;
			text-align: start;
			font-size: 32px;
			font-style: normal;
			font-weight: 500;
			line-height: normal;
			color: red;
		}

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
