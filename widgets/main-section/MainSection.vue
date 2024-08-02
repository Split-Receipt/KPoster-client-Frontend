<template>
	<div class="filters">
		<drop-down
			:options="[
				{ text: 'Any city6', id: 'testId1' },
				{ text: 'Any city4', id: 'testId2' },
				{ text: 'Any city5', id: 'testId3' },
			]"
			drop-down-label="Filter by category"
			@response="
				(res) => {
					console.log(res);
				}
			"
		/>
		<drop-down
			:options="[
				{ text: 'Any city1', id: 'testId11' },
				{ text: 'Any city2', id: 'testId22' },
				{ text: 'Any city3', id: 'testId33' },
			]"
			drop-down-label="Filter by city"
			@response="
				(res) => {
					console.log(res);
				}
			"
		/>
	</div>
	<div>
		<section class="main-section__item">
			<div class="main-section__wrapper">
				<div class="main-section__info">
					<h2 v-if="size === 'medium'" class="main-section__header">
						{{ title }}
					</h2>

					<h3 v-if="size === 'small'" class="main-section__header">
						{{ title }}
					</h3>

					<p class="main-section__text">
						{{ text }}
					</p>
				</div>

				<div class="main-section__carousel">
					<event-carousel :id="id" :event-data="eventData" />
				</div>
			</div>
		</section>
	</div>
</template>

<script setup lang="ts">
import DropDown from '@shared/gui/DropDown.vue';

type Props = {
	title: string;
	text?: string;
	eventData: Array<CardData>;
	size?: string;
	id: string | number;
};

type CardData = {
	image: string;
	title: string;
	text: string;
	dateEvent: string;
};

withDefaults(defineProps<Props>(), {
	title: 'List of events',
	text: '',
	eventData: () => [
		{
			image: 'event-card-1.jpg',
			title: 'Event Name',
			text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
			dateEvent: '01/01/2024',
		},
	],
	size: 'small',
});

// request for an options for dropdowns
// fetch('https://admin-dev.culture-portal-cusco.online/api/categories')
// 	.then((response) => response.json())
// 	.then((result) => console.log(result.data));
</script>

<style scoped lang="scss">
.main-section {
	&__item {
		position: relative;
		border-bottom: 1px solid $main-section-border-color;
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
			font-family: $font-family-medium-extra-expanded;
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

.filters {
	display: flex;
}
</style>
