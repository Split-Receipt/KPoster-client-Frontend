<template>
	<div class="main-page">
		<main class="main-page__main">
			<h1 class="main-page__title">{{ $t('main_title') }}</h1>

			<div class="main-page__date-carousel">
				<date-card-carousel />
			</div>

			<div class="main-page__filters">
				<cp-drop-down
					v-model="categoriesToFilter"
					:options="testFilterOptions1"
					drop-down-label="Filter by category"
					:value="categoriesToFilter"
				/>
				<cp-drop-down
					v-model="citiesToFilter"
					:options="testFilterOptions2"
					drop-down-label="Filter by city"
					:value="citiesToFilter"
				/>
				<cp-drop-down
					v-model="organizersToFilter"
					:options="testFilterOptions3"
					drop-down-label="Filter by event organizer"
					:value="organizersToFilter"
				/>
			</div>
			<div class="main-page__section-list">
				<main-section
					v-for="(sectionItem, index) in sectionData"
					:id="sectionItem.id"
					:key="index"
					:title="sectionItem.title"
					:text="sectionItem.text"
					:event-data="sectionItem.eventData"
				/>
			</div>
		</main>
	</div>
</template>

<script setup lang="ts">
import CpDropDown from '@shared/gui/CpDropDown.vue';
import type { RequestOption } from '@shared/api/types';
import { requestCities, requestCategories } from '@shared/api';

const categoriesToFilter: string[] = [];
const citiesToFilter: string[] = [];
const organizersToFilter: string[] = [];
const { availableLocales, setLocale } = useI18n();

onMounted(() => {
	const selected_language = localStorage.getItem('KPoster_selected-language');

	if (availableLocales.includes(navigator.language) && !selected_language) {
		setLocale(navigator.language);
	} else if (selected_language) {
		setLocale(selected_language);
	} else {
		setLocale('es');
	}
});

const sectionData = [
	{
		id: '1',
		title: 'Popular events',
		eventData: [
			{
				image: 'event-card-1.png',
				title: 'Event Name',
				text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut',
				dateEvent: '20/12/2024',
			},
			{
				image: 'event-card-2.png',
				title: 'Event Name',
				text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut',
				dateEvent: '20/12/2024',
			},
			{
				image: 'event-card-4.png',
				title: 'Event Name',
				text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut',
				dateEvent: '20/12/2024',
			},
			{
				image: 'event-card-13.png',
				title: 'Event Name',
				text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut',
				dateEvent: '20/12/2024',
			},
			{
				image: 'event-card-14.png',
				title: 'Event Name',
				text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut',
				dateEvent: '20/12/2024',
			},
			{
				image: 'event-card-15.png',
				title: 'Event Name',
				text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut',
				dateEvent: '20/12/2024',
			},
		],
	},
	{
		id: '2',
		title: 'List of events 1',
		text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exerc',
		eventData: [
			{
				image: 'event-card-3.png',
				title: 'Event Name',
				text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut',
				dateEvent: '20/12/2024',
			},
			{
				image: 'event-card-5.png',
				title: 'Event Name',
				text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut',
				dateEvent: '20/12/2024',
			},
			{
				image: 'event-card-6.png',
				title: 'Event Name',
				text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut',
				dateEvent: '20/12/2024',
			},
			{
				image: 'event-card-7.png',
				title: 'Event Name',
				text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut',
				dateEvent: '20/12/2024',
			},
			{
				image: 'event-card-8.png',
				title: 'Event Name',
				text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut',
				dateEvent: '20/12/2024',
			},
			{
				image: 'event-card-9.png',
				title: 'Event Name',
				text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut',
				dateEvent: '20/12/2024',
			},
			{
				image: 'event-card-10.png',
				title: 'Event Name',
				text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut',
				dateEvent: '20/12/2024',
			},
			{
				image: 'event-card-11.png',
				title: 'Event Name',
				text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut',
				dateEvent: '20/12/2024',
			},
		],
	},
	{
		id: '3',
		title: 'List of events 2',
		text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exerc',
		eventData: [
			{
				image: 'event-card-3.png',
				title: 'Event Name',
				text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut',
				dateEvent: '20/12/2024',
			},
			{
				image: 'event-card-5.png',
				title: 'Event Name',
				text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut',
				dateEvent: '20/12/2024',
			},
			{
				image: 'event-card-6.png',
				title: 'Event Name',
				text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut',
				dateEvent: '20/12/2024',
			},
			{
				image: 'event-card-7.png',
				title: 'Event Name',
				text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut',
				dateEvent: '20/12/2024',
			},
			{
				image: 'event-card-8.png',
				title: 'Event Name',
				text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut',
				dateEvent: '20/12/2024',
			},
			{
				image: 'event-card-9.png',
				title: 'Event Name',
				text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut',
				dateEvent: '20/12/2024',
			},
			{
				image: 'event-card-10.png',
				title: 'Event Name',
				text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut',
				dateEvent: '20/12/2024',
			},
			{
				image: 'event-card-11.png',
				title: 'Event Name',
				text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut',
				dateEvent: '20/12/2024',
			},
		],
	},
	{
		id: '4',
		title: 'List of events 3',
		text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exerc',
		eventData: [
			{
				image: 'event-card-3.png',
				title: 'Event Name',
				text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut',
				dateEvent: '20/12/2024',
			},
			{
				image: 'event-card-5.png',
				title: 'Event Name',
				text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut',
				dateEvent: '20/12/2024',
			},
			{
				image: 'event-card-6.png',
				title: 'Event Name',
				text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut',
				dateEvent: '20/12/2024',
			},
			{
				image: 'event-card-7.png',
				title: 'Event Name',
				text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut',
				dateEvent: '20/12/2024',
			},
			{
				image: 'event-card-8.png',
				title: 'Event Name',
				text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut',
				dateEvent: '20/12/2024',
			},
			{
				image: 'event-card-9.png',
				title: 'Event Name',
				text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut',
				dateEvent: '20/12/2024',
			},
			{
				image: 'event-card-10.png',
				title: 'Event Name',
				text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut',
				dateEvent: '20/12/2024',
			},
			{
				image: 'event-card-11.png',
				title: 'Event Name',
				text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut',
				dateEvent: '20/12/2024',
			},
		],
	},
];

// category check points

const remoteCategoryFilterOptions = ref<Array<RequestOption['attributes']>>([]);

// city filter checkpoint

const remoteCityFilterOptions = ref<Array<RequestOption['attributes']>>([]);

// organizers filter checkpoint

const remoteOrganizersFilterOptions = ref<Array<RequestOption['attributes']>>([]);

// test filter values

// item_title: string;
// 	item_UID: string;
// 	item_value: string;
// 	createdAt: string;
// 	updatedAt: string;
// 	publishedAt: string;
// 	locale: string;

const testFilterOptions1 = [
	{
		item_title: 'title1',
	 	item_UID: 'id1',
	  	item_value: 'value1',
		createdAt: 'created1',
		updatedAt: 'updated1',
		publishedAt: 'published1',
		locale: 'locale1',
	},
	{
		item_title: 'title2',
	 	item_UID: 'id2',
	  	item_value: 'value2',
		createdAt: 'created2',
		updatedAt: 'updated2',
		publishedAt: 'published2',
		locale: 'locale2',
	},
];

const testFilterOptions2 = [
	{
		item_title: 'title3',
	 	item_UID: 'id3',
	  	item_value: 'value3',
		createdAt: 'created3',
		updatedAt: 'updated3',
		publishedAt: 'published3',
		locale: 'locale3',
	},
	{
		item_title: 'title4',
	 	item_UID: 'id4',
	  	item_value: 'value4',
		createdAt: 'created4',
		updatedAt: 'updated4',
		publishedAt: 'published4',
		locale: 'locale4',
	},
];

const testFilterOptions3 = [
	{
		item_title: 'title5',
	 	item_UID: 'id5',
	  	item_value: 'value5',
		createdAt: 'created5',
		updatedAt: 'updated5',
		publishedAt: 'published5',
		locale: 'locale5',
	},
	{
		item_title: 'title6',
	 	item_UID: 'id6',
	  	item_value: 'value6',
		createdAt: 'created6',
		updatedAt: 'updated6',
		publishedAt: 'published6',
		locale: 'locale6',
	},
];
// function trigger (when component did mount)

const requestForAnFilters = async (
	requestCallback: () => Promise<any>,
	dataTo: Ref<any>
) => {
	try {
		const response = await requestCallback();
		const result = response.data;

		if (Array.isArray(result.data)) {
			result.data.forEach((e: RequestOption) => {
				dataTo.value.push(e.attributes);
			});
		}
	} catch (e) {
		console.error(e);
	}
};

onMounted(() => {
	requestForAnFilters(requestCategories, remoteCategoryFilterOptions);
	requestForAnFilters(requestCities, remoteCityFilterOptions);
	requestForAnFilters(requestCities, remoteOrganizersFilterOptions);
});
</script>

<style scoped lang="scss">
.main-page {
	&__main {
		margin-top: 2px;
		padding-left: 10px;

		@media #{$screen-tablet} {
			margin-top: 10px;
		}

		@media #{$screen-desktop} {
			padding: 0 5%;
			margin-top: 33px;
		}
	}

	&__title {
		text-align: center;
		@media #{$screen-tablet} {
			max-width: 55%;
			font-family: $font-family-medium-expanded;
		}

		@media #{$screen-desktop} {
			max-width: 100%;
			font-family: $font-family-medium-expanded;
		}
	}

	&__date-carousel {
		@media #{$screen-tablet} {
			margin-top: 30px;
		}

		@media #{$screen-desktop} {
			margin-top: 40px;
		}

		@media #{$screen-big-desktop} {
			margin-top: 32px;
		}
	}

	&__section {
		&-list {
			display: flex;
			flex-direction: column;
			gap: 65px;
			margin-top: 60px;
			margin-bottom: 40px;

			@media #{$screen-tablet} {
				margin-top: 45px;
			}

			@media #{$screen-desktop} {
				gap: 37px;
				margin-top: 55px;
			}

			@media #{$screen-big-desktop} {
				gap: 100px;
				margin-top: 85px;
			}
		}
	}
}

.main-page__filters {
	display: flex;
	margin-top: 25px;
}
</style>
