<template>
	<div class="footer-list__wrapper">
		<ul class="footer-list">
			<h5 class="footer-list__header">
				{{ list.header }}
			</h5>

			<div class="footer-list__inner">
				<li
					v-for="item in list.listItems"
					:key="item.id"
					class="footer-list__item"
				>
					<a
						v-if="!!item.href"
						:href="item.href"
						class="footer-list__text footer-list__link"
					>
						{{ item.text }}
					</a>

					<span v-else class="footer-list__text">
						{{ item.text }}
					</span>
				</li>
			</div>
		</ul>
	</div>
</template>

<script setup lang="ts">
type Props = {
	list: {
		header: string;
		listItems: Array<List>;
	};
};

type List = {
	id: number | string;
	text: string;
	href?: string;
};

defineProps<Props>();
</script>

<style scoped lang="scss">
.footer-list {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
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
