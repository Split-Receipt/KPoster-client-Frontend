<template>
	<div class="button__wrapper">
		<button
			v-if="!islink"
			:type="nativeType"
			:disabled="disabled"
			:class="[
				'button',
				`button--${type}`,
				`button--${size}`,
				`button--${shape}`,
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
				`button--${type}`,
				`button--${size}`,
				`button--${shape}`,
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
	nativeType?: HTMLButtonElement['type'];
	type?: 'primary' | 'secondary' | 'ghost';
	shape?: 'square' | 'circle' | 'oval';
	disabled?: boolean;
	size?: 'small' | 'medium' | 'large' | 'huge';
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
	nativeType: 'button',
	type: 'primary',
	disabled: false,
	leftIcon: '',
	text: '',
	size: 'medium',
	shape: 'oval',
	withImage: '',
	linkTo: '',
});

const emit = defineEmits<Emits>();

const handleClick = (clickEvent: MouseEvent) => {
	emit('click', clickEvent);
};
</script>

<style scoped lang="scss">
.button {
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: $button-default-padding;
	border: none;
	text-decoration: none;
	color: $black;
	background-color: $white;
	font-family: $font-family-medium;
	cursor: pointer;

	&:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	&--primary {
		background: $button-gradient-background-color;
		animation: 0.3s reverseButtonAnimation backwards;
		transition: all 0.3s ease;
		&:hover {
			animation: 0.3s defaultButtonAnimation forwards;
			transition: all 0.3s ease;
		}
	}

	&--secondary {
		border: 1px solid $dusty-gray;
		&:hover {
			border: 1px solid $black;
		}
	}

	&--ghost {
		box-shadow: $button-shadow;
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
	}

	&--small {
		height: $button-size-small;
		line-height: $button-line-height-small;
		font-size: $button-font-size-small;
	}

	&--medium {
		height: $button-size-medium;
		line-height: $button-line-height-medium;
		font-size: $button-font-size-medium;
	}

	&--large {
		height: $button-size-large;
		line-height: $button-line-height-large;
		font-size: $button-font-size-large;
	}

	&--huge {
		height: $button-size-huge;
		line-height: $button-line-height-huge;
		font-size: $button-font-size-huge;
	}

	&--medium {
		min-width: $button-width-medium;
	}

	&--large {
		min-width: $button-width-large;
	}
}
</style>
