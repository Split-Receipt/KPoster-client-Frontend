<template>
	<div class="checkbox-wrapper">
		<input
			:id="props.id"
			:value="props.value"
			type="checkbox"
			@change="checkBoxAction"
		/>
		<label :for="props.id" style="--size: 22px">
			<svg viewBox="0,0,50,50">
				<path d="M5 30 L 20 45 L 45 5" />
			</svg>
		</label>
		<label v-if="props.title" class="checkbox-wrapper__label" :for="props.id">{{
			props.title
		}}</label>
	</div>
</template>

<script setup lang="ts">
type CheckProps = {
	id: string;
	value: string;
	title?: string;
};

type CheckEmits = {
	(event: 'update:checkboxUpdate', eventData: string): void;
};

const props = defineProps<CheckProps>();
const emit = defineEmits<CheckEmits>();

const checkBoxAction = (e: Event) => {
	const target = e.target as HTMLInputElement;
	if (target.checked) {
		emit('update:checkboxUpdate', target.value);
	} else {
		emit('update:checkboxUpdate', '');
	}
};
</script>

<style scoped lang="scss">
.checkbox-wrapper {
	display: flex;
	align-items: center;
	* {
		box-sizing: border-box;

		&:after,
		&:before {
			box-sizing: border-box;
		}
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
			border-radius: 6px;
			cursor: pointer;
			transition: all 0.2s ease;

			&:active {
				transform: scale(1.05);
				border-radius: 12px;
			}

			svg {
				pointer-events: none;
				padding: 10%;

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
	.checkbox-wrapper__label {
		margin-left: 15px;
		font-size: 16px;
		padding-right: 15px;
		padding-top: 5px;
		line-height: 28px;
		cursor: pointer;
		font-family: 'NeuethingSans-MediumSemiExpanded';
	}
}
</style>
