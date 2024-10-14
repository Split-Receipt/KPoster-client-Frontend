<template>
	<div class="switcher">
		<div class="switcher__container">
			<label v-for="option in props.switcherOptions" :key="option.optionKey">
				<input
					:value="option.optionValue"
					type="radio"
					:name="props.switcherName"
					:checked="isChecked(option.optionValue)"
					@change="handleSwitch"
				/>
				<span>{{ option.optionName }}</span>
			</label>
		</div>
	</div>
</template>

<script setup lang="ts">
type switcherOption = {
	optionName: string;
	optionValue: string;
	optionKey: string;
};

type switcherOptionsProps = {
	switcherName: string;
	defaultOption: string | null;
	switcherOptions: switcherOption[];
};

type Events = {
	(event: 'update:modelValue', eventData: string): void;
};

const props = defineProps<switcherOptionsProps>();
const emit = defineEmits<Events>();

const handleSwitch = (e: Event) => {
	const target = e.target as HTMLInputElement;
	emit('update:modelValue', target.value);
};

const isChecked = (optionValue: string) => {
	return optionValue === props.defaultOption;
};
</script>

<style scoped lang="scss">
.switcher {
	&__container {
		display: flex;
		// flex-wrap: wrap;
		justify-content: center;
		width: 100%;
		height: 100%;

		label {
			input[type='radio'] {
				clip: rect(0 0 0 0);
				clip-path: inset(100%);
				height: 1px;
				overflow: hidden;
				position: absolute;
				white-space: nowrap;
				width: 1px;

				&:checked + span {
					box-shadow: 0 0 0 0.0625em #888888;
					background: $button-gradient-background-color;
					z-index: 1;
					color: #353333;
				}
			}

			span {
				display: block;
				cursor: pointer;
				background-color: #f6f6f6;
				font-size: 18px;
				padding: 8px 15px 5px 15px;
				position: relative;
				margin-left: 0.0625em;
				box-shadow: 0 0 0 0.0625em #b5bfd9;
				letter-spacing: 0.05em;
				color: #888888;
				text-align: center;
				transition: background-color 0.5s ease;
				@media (max-width: 500px) {
					font-size: 16px;
				}
				@media (max-width: 460px) {
					font-size: 14px;
				}
				@media (max-width: 415px) {
					font-size: 12px;
				}
				@media (max-width: 370px) {
					font-size: 11px;
				}
				@media (max-width: 348px) {
					font-size: 10px;
				}
			}

			&:first-child span {
				border-radius: 99px 0 0 99px;
			}

			&:last-child span {
				border-radius: 0 99px 99px 0;
			}
		}
	}
}
</style>
