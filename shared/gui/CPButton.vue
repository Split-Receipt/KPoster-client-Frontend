<template>
	<div class="button__wrapper">
		<button
			:disabled="disabled"
			:type="type"
			:class="[
				'button',
				buttonColors[color],
				buttonShapes[shape],
				buttonSizes[size],
			]"
			@click="(event) => handleClick(event)"
		>
			<i
				v-if="leftIcon"
				:class="['icon', `icon-${leftIcon}`, 'button__icon']"
			/>
			<span v-if="!leftIcon">
				{{ text }}
			</span>
		</button>
	</div>
</template>

<script setup lang="ts">
type Props = {
	type?: HTMLButtonElement['type'];
	shape: keyof typeof buttonShapes;
	disabled?: boolean;
	size?: keyof typeof buttonSizes;
	color: keyof typeof buttonColors;
	leftIcon?: string;
	text?: string;
};

type Emits = {
	(event: 'click', eventData: MouseEvent): void;
};

withDefaults(defineProps<Props>(), {
	type: 'button',
	disabled: false,
	text: 'button',
	leftIcon: '',
	size: 'middle',
});

const emit = defineEmits<Emits>();

const handleClick = (clickEvent: MouseEvent) => {
	emit('click', clickEvent);
};

enum buttonShapes {
	circle = 'button--circle',
	oval = 'button--oval',
	square = 'button--square',
}

enum buttonSizes {
	small = 'button--small',
	middle = 'button--middle',
	big = 'button--big',
	huge = 'button--huge',
}

enum buttonColors {
	yellowGrey = 'button--yellow-grey',
	black = 'button--black',
	white = 'button--white',
	transparent = 'button--transparent',
}
</script>

<style scoped lang="scss">
.button {
	display: flex;
	justify-content: center;
	align-items: center;
	padding: $button-default-padding;
	border: none;
	background-color: transparent;
	cursor: pointer;

	&:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	&--circle {
		border-radius: $button-circle-border-radius;
		padding: 0;
		height: $button-circle-height;
		width: $button-circle-width;

		.button__icon {
			font-size: $button-icon-circle-font-size;
		}
	}

	&--square {
		border-radius: $button-square-border-radius;
		height: $button-square-height;
		width: $button-square-width;
		padding: 0;

		.button__icon {
			font-size: $button-icon-square-font-size;
		}
	}

	&--oval {
		border-radius: $button-oval-border-radius;
		padding: $button-oval-padding;
	}

	&--small {
		height: $button-size-small;
		line-height: $button-line-height-small;
		font-size: $button-font-size-small;
		padding: $button-small-padding;
	}

	&--middle {
		height: $button-size-middle;
		line-height: $button-line-height-middle;
		font-size: $button-font-size-middle;
		padding: $button-middle-padding;
	}

	&--big {
		height: $button-size-big;
		line-height: $button-line-height-big;
		font-size: $button-font-size-big;
	}

	&--huge {
		height: $button-size-huge;
		line-height: $button-line-height-huge;
		font-size: $button-font-size-huge;
	}

	&--white {
		background: $button-white-background-color;
	}

	&--black {
		background: $button-black-background-color;
		color: $button-white-background-color;
	}

	&--yellow-grey {
		background: $button-gradient-background-color;
	}

	&--transparent {
		background: transparent;
		border: 1px solid $button-border-dusty-gray;
	}
}
</style>
