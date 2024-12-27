<template>
	<div class="checkbox-wrapper">
		<div class="checkbox-wrapper-input">
			<input
				:id="props.option.value + props.option.id"
				:value="props.option.value"
				type="checkbox"
				:checked="props.checked"
				@change="checkBoxAction"
			/>
			<label :for="props.option.value + props.option.id" style="--size: 15px">
				<svg viewBox="0,0,50,50">
					<path d="M5 30 L 20 45 L 45 5" />
				</svg>
			</label>
		</div>
		<div class="checkbox-wrapper-text">
			<label
				v-if="props.option.label"
				class="checkbox-wrapper__label"
				:for="props.option.value + props.option.id"
			>{{ props.option.label }}</label
			>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { CheckOption } from './types';

type CheckEmits = {
	(event: 'update:checkboxUpdate', eventData: string | CheckOption | number): void;
};
type Props = {
	option: CheckOption;
	checked?: boolean;
	returnValue?: keyof CheckOption;
	returnObject?: boolean;
};
const props = withDefaults(defineProps<Props>(), {
	returnValue: 'value',
	returnObject: false,
	checked: false,
});
const emit = defineEmits<CheckEmits>();

const checkBoxAction = (event: Event) => {
	const target = event.target as HTMLInputElement;
	if (target.checked) {
		if (props.returnObject) {
			emit('update:checkboxUpdate', props.option);
		} else if (props.returnValue) {
			emit('update:checkboxUpdate', props.option[props.returnValue] ?? '');
		} else {
			emit('update:checkboxUpdate', target.value ?? '');
		}
	} else {
		emit('update:checkboxUpdate', '');
	}
};
</script>

<style scoped lang="scss">
.checkbox-wrapper {
	display: flex;
	align-items: center;
	position: relative;

	* {
		box-sizing: border-box;

		&:after,
		&:before {
			box-sizing: border-box;
		}
	}

	&-input {
		left: 0;
		top: 6px;
		position: absolute;
	}

	&-text {
		display: flex;
		margin-left: 15px;
	}

	input {
		position: absolute;
		z-index: -1;
		opacity: 0;

		&:checked + label svg path {
			stroke-dashoffset: 0;
		}

		&:focus + label {
			transform: scale(1.03);
		}

		+ label {
			display: block;
			border: 2px solid rgb(35, 33, 33);
			width: var(--size);
			height: var(--size);
			border-radius: 3px;
			cursor: pointer;
			transition: all 0.1s ease;
			position: relative;

			&:active {
				transform: scale(1.05);
				border-radius: 6px;
			}

			svg {
				pointer-events: none;
				padding: 5%;
				position: absolute;

				path {
					fill: none;
					stroke: rgb(35, 33, 33);
					stroke-width: 10px;
					stroke-linecap: round;
					stroke-linejoin: round;
					stroke-dasharray: 100;
					stroke-dashoffset: 101;
					transition: all 200ms cubic-bezier(1, 0, 0.37, 0.91);
				}
			}
		}
	}
	.checkbox-wrapper__label {
		margin-left: 8px;
		font-size: 16px;
		line-height: 28px;
		cursor: pointer;
	}
}
</style>
