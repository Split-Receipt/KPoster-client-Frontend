<template>
	<div v-bind="$attrs">
		<div
			v-for="(option, index) in props.options"
			:key="index"
			class="checkbox-wrapper"
		>
			<input
				:id="option.id"
				:name="props.name"
				:value="option.value"
				type="radio"
				@change="handleRadioCheck"
			/>
			<label :for="option.id" style="--size: 22px">
				<svg viewBox="0,0,50,50">
					<path d="M5 30 L 20 45 L 45 5" />
				</svg>
			</label>
			<label v-if="option.label" :for="option.id" class="redioLabel">{{
				option.label
			}}</label>
		</div>
	</div>
</template>

<script setup lang="ts">
type RadioVar = {
	id: string;
	value: string;
	label?: string;
};

type RadioProps = {
	options: RadioVar[];
	name: string;
};

type Events = {
	(event: 'update:modelValue', eventData: string): void;
};
const props = defineProps<RadioProps>();
const emit = defineEmits<Events>();

const handleRadioCheck = (e: Event) => {
	const target = e.target as HTMLInputElement;
	emit('update:modelValue', target.value);
};
</script>

<style scoped lang="scss">
.checkbox-wrapper {
	display: flex;
	align-items: center;
	margin: 0 15px 0 15px;

	* {
		box-sizing: border-box;

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
				padding: 15%;

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
	.redioLabel {
		margin-left: 15px;
		padding-top: 5px;
		cursor: pointer;
	}
}
</style>
