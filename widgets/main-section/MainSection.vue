<template>
	<div>
		<section class="main-section__item">
			<div class="main-section__wrapper">
				<div class="main-section__info">
					<h2 v-if="size === 'medium'" class="main-section__header">
						{{ collectionData.attributes.collectionName }}
					</h2>

					<h3 v-if="size === 'small'" class="main-section__header">
						{{ collectionData.attributes.collectionName }}
					</h3>

					<p class="main-section__text">
						{{ collectionData.attributes.collectionDescription }}
					</p>
				</div>

				<div class="main-section__carousel">
					<event-carousel
						:id="collectionData.id"
						:event-data="collectionData.attributes.events.data"
					/>
				</div>
			</div>
		</section>
	</div>
</template>

<script setup lang="ts">
import type { EventColletion } from '@shared/api/types';
type Props = {
	collectionData: EventColletion;
	size?: string;
};

withDefaults(defineProps<Props>(), {
	size: 'small',
});
</script>

<style scoped lang="scss">
.main-section {
	&__item {
		position: relative;
		border-bottom: 3px solid transparent;
    	border-image: $yellow-gray-gradient-default;
    	border-image-slice: 1;
		padding-bottom: 60px;

		@media #{$screen-tablet} {
			padding-bottom: 40px;
		}

		@media #{$screen-desktop} {
			padding-bottom: 50px;
		}
	}

	&__wrapper {
		display: flex;
		flex-direction: column;
		gap: 20px;

		@media #{$screen-tablet} {
			position: relative;
			bottom: 52px;
			margin-bottom: -53px;
		}
	}

	&__info {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 5px;
		width: 98%;

		@media #{$screen-tablet} {
			gap: 20px;
			bottom: -50px;
		}

		@media #{$screen-desktop} {
			gap: 15px;
		}

		@media #{$screen-big-desktop} {
			bottom: -40px;
		}
	}

	&__header {
		@media #{$screen-desktop} {
			font-family: $font-family-medium;
		}
	}

	&__text {
		font-size: $main-section-text-font-size-mobile;
		line-height: $main-section-text-line-height-mobile;
		color: $main-section-text-color;

		@media #{$screen-tablet} {
			font-size: $main-section-text-font-size-tablet;
			line-height: $main-section-text-line-height-tablet;
			width: 48%;
		}

		@media #{$screen-big-desktop} {
			max-width: 584px;
		}
	}

	&__carousel {
		@media #{$screen-tablet} {
			position: relative;
			bottom: 20px;
		}

		@media #{$screen-desktop} {
			bottom: 30px;
		}
	}
}
</style>
