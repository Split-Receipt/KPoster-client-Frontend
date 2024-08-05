<template>
	<div class="filters">
		<drop-down
			:options="remoteCategoryOptions"
			drop-down-label="Filter by category"
			@response="
				(res) => {
					console.log(res);
				}
			"
		/>
		<drop-down
			:options="remoteCityFilterOptions"
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
import axios from 'axios';

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

interface RequestOption {
	id: number;
	attributes: {
		item_title: string;
		item_UID: string;
		item_value: string;
		createdAt: string;
		updatedAt: string;
		publishedAt: string;
		locale: string;
	};
}

// category check points

const categoryOptionsUrl =
	'https://admin-dev.culture-portal-cusco.online/api/categories';
const remoteCategoryOptions = ref<Array<RequestOption['attributes']>>([]);

// city filter checkpoint

const cityOptionsUrl =
	'https://admin-dev.culture-portal-cusco.online/api/city-filters';
const remoteCityFilterOptions = ref<Array<RequestOption['attributes']>>([]);

// function to request (1st arg: API's url, 2nd arg: ref to store response data)

const requestForAnOptions = async (url: string, dataTo: Ref) => {
	try {
		await axios
			.get(url)
			.then((response) => response.data)
			.then((result) =>
				result.data.forEach((e: RequestOption) => {
					dataTo.value.push(e.attributes);
				})
			);
	} catch (err) {
		throw new Error(`Error while requesting for an dropdown options: ${err}`);
	}
};

// function trigger (when component did mount)

onMounted(() => {
	requestForAnOptions(categoryOptionsUrl, remoteCategoryOptions);
	requestForAnOptions(cityOptionsUrl, remoteCityFilterOptions);
});
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
