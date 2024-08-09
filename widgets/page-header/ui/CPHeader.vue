<template>
	<div class="header__wrapper">
		<div class="header__img">
			<img src="/images/header-background.jpeg" class="header__img-pic" />
		</div>

		<div class="header__controls">
			<img src="/images/logo.svg" class="icon icon-logo header__icon-logo" />

			<div class="header__menu">
				<div class="header__buttons header__buttons--oval">
					<cp-button
						width="large"
						size="small"
						shape="oval"
						color="yellowGrey"
						:text="$t('sales')"
					/>
					<cp-button
						width="large"
						size="small"
						shape="oval"
						color="yellowGrey"
						:text="$t('sales')"
					/>
					<cp-button
						width="large"
						size="small"
						shape="oval"
						color="yellowGrey"
						:text="$t('charity')"
					/>
				</div>

				<div class="header__buttons header__buttons--circle">
					<button class="header__button header__button--circle">
						<i class="icon icon-search header__button-icon" />
					</button>

					<button class="header__button header__button--circle">
						<i class="icon icon-login header__button-icon" />
					</button>

					<button class="header__button header__button--circle">
						<i
							class="icon icon-ticket header__button-icon header__button-ticket"
						/>
					</button>
					<lang-selector />
				</div>
			</div>

			<img src="/images/burger-menu.svg" class="header__icon-burger-menu" />
		</div>
	</div>
</template>

<script setup lang="ts">
import CpButton from '@shared/gui/CpButton.vue';
</script>

<style scoped lang="scss">
.header {
	display: flex;

	&__img {
		position: relative;
		overflow: hidden;
		width: 100%;
		height: $header-img-height;

		&-pic {
			width: 100%;
			height: $header-pic-height;
			object-fit: cover;
			font-family: 'object-fit: cover';
		}
	}

	&__controls {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: $header-controls-height;
		padding: $header-controls-padding;

		@media #{$screen-tablet} {
			height: $header-controls-height-screen-tablet;
		}

		@media #{$screen-desktop} {
			margin-top: $header-controls-margin-top-screen-desktop;
			padding: $header-controls-padding-screen-desktop;
		}
	}

	&__icon-burger-menu {
		@media #{$screen-tablet} {
			background-color: $header-icon-burger-menu-background-color-screen-tablet;
			border-radius: $header-icon-burger-menu-border-radius-screen-tablet;
			width: $header-icon-burger-menu-width-screen-tablet;
			height: $header-icon-burger-menu-height-screen-tablet;
			padding: $header-icon-burger-menu-padding-screen-tablet;
		}

		@media #{$screen-desktop} {
			display: none;
		}
	}

	&__icon-logo {
		@media #{$screen-tablet} {
			background-color: transparent;
			border-radius: $header-icon-logo-border-radius-screen-tablet;
			width: $header-icon-logo-width-screen-tablet;
			height: $header-icon-logo-height-screen-tablet;
			padding: $header-icon-logo-padding-screen-tablet;
		}

		@media #{$screen-desktop} {
			width: $header-icon-logo-width-screen-desktop;
			height: $header-icon-logo-height-screen-desktop;
			padding: $header-icon-logo-padding-screen-desktop;
		}
	}

	&__menu {
		display: none;

		@media #{$screen-desktop} {
			display: flex;
			align-items: center;
			padding: $header-menu-padding-screen-desktop;
			gap: $header-menu-gap-screen-desktop;
			background-color: $header-menu-background-color-screen-desktop;
			border-radius: $header-menu-border-radius-screen-desktop;
		}
	}

	&__buttons {
		gap: $header-buttons-gap;

		&--circle {
			display: none;

			@media #{$screen-desktop} {
				display: flex;
			}
		}

		&--oval {
			display: none;

			@media #{$screen-desktop} {
				display: flex;
			}
		}
	}

	&__button {
		border: none;
		background-color: $header-button-background-color;

		&--circle {
			height: $header-button-circle-height;
			width: $header-button-circle-width;
			border-radius: $header-button-circle-border-radius;
		}

		&-icon {
			font-size: $header-button-icon-font-size;
		}

		&-ticket {
			font-size: $header-button-ticket-font-size;
			line-height: $header-button-ticket-line-height;
		}
	}
}
</style>
