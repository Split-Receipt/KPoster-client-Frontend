<template>
	<div class="footer-list__wrapper">
		<ul class="footer-list">
			<h5 class="footer-list__header">
				{{ $t(list.header) }}
			</h5>

			<div class="footer-list__inner">
				<li
					v-for="item in list.listItems"
					:key="item.id"
					class="footer-list__item"
				>
					<nuxt-link
						v-if="!!item.href"
						:to="item.href"
						class="footer-list__text footer-list__link"
						:target="item.linkType === 'external' ? '_blank' : '_self'"
						:external="item.linkType === 'external'"
					>
						{{ $t(item.text) ?? item.text }}
					</nuxt-link>

					<span v-else class="footer-list__text">
						{{ $t(item.text) ?? item.text }}
					</span>
				</li>
			</div>
		</ul>
	</div>
</template>

<script setup lang="ts">
import type { FooterListItem } from '../model';
type Props = {
	list: {
		header: string;
		listItems: FooterListItem[];
	};
};

defineProps<Props>();
</script>

<style scoped lang="scss">
.footer-list {
	display: flex;
	flex-direction: column;
	gap: 20px;
	height: 100%;

	@media #{$screen-big-desktop} {
		gap: 5px;
	}

	&__wrapper {
		background-color: $footer-list-default-background-color;
	}

	&__inner {
		display: flex;
		flex-direction: column;
		gap: 5px;
	}

	&__header {
		color: $footer-list-header-color;
	}

	&__item {
		display: flex;
		align-items: center;
		height: $footer-list-item-height;
		color: $footer-list-item-color;

		@media #{$screen-desktop} {
			height: $footer-list-item-height-desktop;
		}

		@media #{$screen-big-desktop} {
			height: $footer-list-item-height-big-desktop;
		}
	}

	&__text {
		font-size: $footer-list-item-text-font-size-tablet;
		line-height: $footer-list-item-text-line-height-tablet;

		@media #{$screen-desktop} {
			font-size: $footer-list-item-text-font-size-desktop;
			line-height: $footer-list-item-text-line-height-desktop;
		}

		@media #{$screen-big-desktop} {
			font-size: $footer-list-item-text-font-size-big-desktop;
			line-height: $footer-list-item-text-line-height-big-desktop;
		}
	}

	&__link {
		text-decoration: none;

		&:hover,
		&:focus,
		&:active {
			text-decoration-line: underline;
			outline: 0;
		}

		&:link,
		&:visited {
			color: $footer-list-item-color;
		}
	}
}
</style>
