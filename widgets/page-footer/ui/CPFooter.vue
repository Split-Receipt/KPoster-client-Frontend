<template>
	<div class="footer">
		<div class="footer__list-wrapper">
			<footer-list
				v-for="(list, index) in footerLists"
				:key="index"
				class="footer__list"
				:list="list"
			/>
		</div>
		<cp-button
			class="footer__button"
			color="yellowGrey"
			shape="oval"
			text="Become a partner"
			width="maxWidth"
			size="middle"
			:islink="true"
			link-to="/partners-registration"
		/>
	</div>
</template>

<script setup lang="ts">
import FooterList from './FooterList.vue';
import CpButton from '@shared/gui/CpButton.vue';
import { footerLists } from '../model';
</script>

<style scoped lang="scss">
.footer {
	display: flex;
	background: $footer-default-background-color;
	flex-direction: column;
	row-gap: $footer-default-row-gap;
	padding: $footer-default-padding;

	@media #{$screen-tablet} {
		flex-wrap: wrap;
		column-gap: $footer-media-tablet-column-gap;
		row-gap: $footer-media-tablet-row-gap;
		padding: $footer-media-tablet-padding;
	}

	@media #{$screen-desktop} {
		column-gap: $footer-media-desktop-column-gap;
		padding: $footer-media-desktop-padding;
		justify-content: space-around;
	}

	&__list-wrapper {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
	}

	&__list {
		@media #{$screen-tablet} {
			height: $footer-media-tablet-height;
			width: $footer-media-tablet-width;
		}

		@media #{$screen-desktop} {
			min-height: $footer-media-desktop-min-height;
			width: $footer-media-desktop-width;
		}

		@media #{$screen-big-desktop} {
			width: $footer-big-desktop-width;
			&:nth-child(3) {
				width: $footer-big-desktop-width-child;
			}
		}
	}

	&__button {
		width: 300px;
		align-self: center;

		@media #{$screen-desktop} {
			width: 400px;
		}
	}
}
</style>
