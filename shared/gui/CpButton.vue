<template>
	<div class="button__wrapper">
		<button
			v-if="!islink"
			:disabled="disabled"
			:type="type"
			:class="[
				'button',
				buttonColors[color],
				buttonShapes[shape],
				buttonSizes[size],
				buttonWidth[width],
			]"
			@click="(event) => handleClick(event)"
		>
			<nuxt-img v-if="withImage" class="button--circle--withImage" :src="withImage"/>
			<i
				v-if="leftIcon"
				:class="['icon', `icon-${leftIcon}`, 'button__icon']"
			/>
			<span v-if="!leftIcon">
				{{ text }}
			</span>
		</button>
		<nuxt-link
			v-if="islink"
			:disabled="disabled"
			:class="[
				'button',
				buttonColors[color],
				buttonShapes[shape],
				buttonSizes[size],
				buttonWidth[width],
			]"
			:to="linkTo"
		>
			<nuxt-img v-if="withImage" class="button--circle--withImage" :src="withImage"/>
			<i
				v-if="leftIcon"
				:class="['icon', `icon-${leftIcon}`, 'button__icon']"
			/>
			<span v-if="!leftIcon">
				{{ text }}
			</span>
		</nuxt-link>
	</div>
</template>

<script setup lang="ts">
type Props = {
	type?: HTMLButtonElement['type'];
	shape: keyof typeof buttonShapes;
	disabled?: boolean;
	size?: keyof typeof buttonSizes;
	color: keyof typeof buttonColors;
	width?: keyof typeof buttonWidth;
	leftIcon?: string;
	withImage?: string;
	text?: string;
	islink?: boolean;
	linkTo?: string;
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
	width: 'medium',
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

enum buttonWidth {
	short = 'button--short',
	medium = 'button--medium',
	large = 'button--large',
	extraLarge = 'button--extra-large',
	maxWidth = 'button--maxWidth',
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
	text-decoration: none;
	color: #000000;
	cursor: pointer;

	&:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	&--circle {
		border-radius: $button-circle-border-radius;
		padding: 0 !important;
		height: $button-circle-height;
		width: $button-circle-width;

		.button__icon {
			font-size: $button-icon-circle-font-size;
		}

		&--withImage {
			z-index: 2;
			width: $button-circle-withImage-width;
			height: $button-circle-withImage-height;
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

		span {
			padding-top: 5px;
		}
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

	&--short {
		width: $button-width-short;
	}

	&--medium {
		width: $button-width-medium;
	}

	&--large {
		width: $button-width-large;
	}

	&--extra-large {
		width: $button-width-Extra-large;
	}

	&--maxWidth {
		width: $button-width-maxWidth;
	}
}
</style>
