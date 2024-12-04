<template>
	<div v-bind="$attrs">
		<div
			v-for="option in props.options"
			:key="option.value + props.name"
			class="checkbox-wrapper"
		>
			<input
				:id="option.value"
				:name="props.name"
				:value="option.value"
				type="radio"
				:checked="option.id === props.activeId"
				@change="handleRadioCheck"
			/>
			<label :for="option.value" style="--size: 22px">
				<svg viewBox="0,0,50,50">
					<path d="M5 30 L 20 45 L 45 5" />
				</svg>
			</label>
			<label v-if="option.label" :for="option.value" class="radioLabel">{{
				option.label
			}}</label>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { CheckOption } from './types';

type RadioProps = {
	activeId?: string | number;
	options: CheckOption[];
	name: string;
	returnObject?: boolean;
	returnValue?: keyof CheckOption;
};

type Events = {
	(event: 'update:modelValue', eventData: string | CheckOption | number): void;
};
const props = withDefaults(defineProps<RadioProps>(), {
	returnObject: false,
	returnValue: 'value',
	activeId: '',
});
const emit = defineEmits<Events>();

const handleRadioCheck = (event: Event) => {
	const target = event.target as HTMLInputElement;
	const pickedOption = props.options.find(
		(option) => option.value === target.value
	);
	if (pickedOption) {
		if (props.returnObject && pickedOption) {
			emit('update:modelValue', pickedOption);
		} else if (props.returnValue) {
			emit('update:modelValue', pickedOption[props.returnValue] ?? '');
		} else {
			emit('update:modelValue', target.value);
		}
	}
};
</script>

<style scoped lang="scss">
.checkbox-wrapper {
	display: flex;
	align-items: center;
	margin: 0 15px 0 15px;

	* {
		box-sizing: border-box;
		line-height: 35px;

		&:after,
		&:before {
			box-sizing: border-box;
		}
	}

	input {
		position: absolute;
		opacity: 0;

		&:checked + label svg path {
			stroke-dashoffset: 0;
		}

		&:focus + label {
			transform: scale(1.03);
		}

		+ label {
			z-index: 2;
			display: block;
			border: 2px solid rgb(35, 33, 33);
			width: var(--size);
			height: var(--size);
			border-radius: 50%;
			cursor: pointer;
			transition: all 0.2s ease;

			&:active {
				transform: scale(1.05);
				border-radius: 12px;
			}

			svg {
				pointer-events: none;
				padding: 14%;
				margin-bottom: 4px;

				path {
					fill: none;
					stroke: rgb(35, 33, 33);
					stroke-width: 7px;
					stroke-linecap: round;
					stroke-linejoin: round;
					stroke-dasharray: 100;
					stroke-dashoffset: 101;
					transition: all 250ms cubic-bezier(1, 0, 0.37, 0.91);
				}
			}
		}
	}
	.radioLabel {
		margin-left: 15px;
		padding-top: 5px;
		cursor: pointer;
	}
}
</style>
