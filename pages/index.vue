<template>
	<div class="main-page">
		<main class="main-page__main">
			<h1 class="main-page__title">{{ $t('main_title') }}</h1>

			<div class="main-page__date-carousel">
				<date-card-carousel
					@change:filter-date="(value: Date) => changeFilters(value, 'date')"
				/>
			</div>

			<div class="main-page__filters">
				<city-drop-down
					@change:filter-cities="(value: string[]) => changeFilters(value, 'city')"
				/>
				<event-category-drop-down
					@change:filter-event-cats="(value: string[]) => changeFilters(value, 'eventCategory')"
				/>
			</div>
			<div v-if="eventsCollections?.length" class="main-page__section-list">
				<main-section
					v-for="eventsCollection in eventsCollections"
					:key="eventsCollection.id"
					:collection-data="eventsCollection"
				/>
			</div>
			<div>
				<h4 class="main-page__list-title">{{ formattedDate }}</h4>
				<cp-grid-layout v-if="events.length">
					<event-card
						v-for="event in events"
						:key="event.id + event.attributes.eventName"
						size="medium"
						:event-card-data="event"
						@click="navigateTo(`/${locale}/event/${event.id}`)"
					/>
				</cp-grid-layout>
				<div v-else class="main-page__section-placeholder">
					{{ $t('Sin eventos') }}
				</div>
			</div>
		</main>
	</div>
</template>

<script setup lang="ts">
import { format , startOfDay, endOfDay } from 'date-fns';
import PartnersDropDown from '@features/partners-filter/PartnersDropDown.vue';
import CityDropDown from '@features/city-filter/CityDropDown.vue';
import EventCategoryDropDown from '@features/event-category-filter/EventCategoryDropDown.vue';
import { requestEventsColletions, requestEventsList } from '@shared/api';
import {
	CollectionTypes,
	type CollectionFilters,
	type EventData,
} from '@shared/api/types';
import CpGridLayout from '@shared/gui/CpGridLayout.vue';
import EventCard from '@widgets/event-card/EventCard.vue';
import { fromZonedTime } from 'date-fns-tz';

const { locale } = useI18n();

const { availableLocales, setLocale } = useI18n();
const eventsCollections = ref();
const events = ref<EventData[]>([]);
const filters: CollectionFilters = {
	events: {
		eventDate: {
			$gte: startOfDay(new Date()),
			$lte: endOfDay(new Date()),
		},
	},
};

const filtersForCollections: CollectionFilters = {
	type: { $eq: CollectionTypes.forMainPage },
	events: {
		eventDate: {
			$gte: startOfDay(new Date()),
		},
	},
};

onBeforeMount(() => {
	requestPageData;
});

const formattedDate = computed(() => {
	return format(
		new Date(filters.events?.eventDate?.$gte),
		'EEE, do MMMM'
	);
});

const requestPageData = () => {
	getEventsCollection();
	getEvents();
};

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

const getEventsCollection = async () => {
	try {
		const eventsCollectionsRequestData = await requestEventsColletions(filtersForCollections);
		eventsCollections.value = eventsCollectionsRequestData.data.data;
	} catch (e) {
		console.error(e);
	}
};

const getEvents = async () => {
	try {
		const eventsRequestData = await requestEventsList(filters.events);
		events.value = eventsRequestData.data.data;
	} catch (e) {
		console.error(e);
	}
};

const changeFilters = (data: any, filterPath: string) => {
	switch (filterPath) {
		case 'city': {
			filters.events.eventAddress = {
				city: {
					cityCode: {
						$in: data,
					},
				},
			};
			requestPageData();
			break;
		}

		case 'eventCategory': {
			filters.events.eventCategory = { eventCategoryCode: { $in: data } };
			requestPageData();
			break;
		}

		case 'date': {
			const timezone = localStorage.getItem('timezone');
			filters.events.eventDate = {
				$gte: fromZonedTime(startOfDay(data), timezone ?? 'America/Lima'),
				$lte: fromZonedTime(endOfDay(data), timezone ?? 'America/Lima'),
			};
			requestPageData();
			break;
		}
		default: {
			requestPageData();
			break;
		}
	}
};
</script>

<style scoped lang="scss">
.main-page {
	&__main {
		margin-top: 2px;
		padding-left: 10px;

		&__title {
			@media #{$screen-desktop} {
				font-family: $font-family-medium-expanded;
			}
		}

		@media #{$screen-tablet} {
			margin-top: 10px;
		}

		@media #{$screen-desktop} {
			padding: 0 5%;
			margin-top: 25px;
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
		margin-top: 25px;
	}

	&__list-title {
		margin: 10px 20px;
	}

	&__section {
		&-list {
			display: flex;
			flex-direction: column;
			gap: 65px;
			margin-top: 60px;
			margin-bottom: 40px;
			height: 100%;

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

		&-placeholder {
			min-height: 500px;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 30px;
			padding: 20px 0;
		}
	}
}

.main-page__filters {
	display: flex;
	flex-wrap: wrap;
	padding: 20px;
}
</style>
