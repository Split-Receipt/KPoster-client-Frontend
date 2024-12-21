<template>
	<cp-base-page :header="$t('main_title')" class="main-page">
		<template #content>
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
				<cp-grid-layout v-if="events.length">
					<template #header>
						<h4 class="main-page__list-title">{{ $t('Eventos hoy') }}</h4>
					</template>
					<event-card
						v-for="event in events"
						:key="event.id + event.attributes.eventName"
						size="medium"
						:event-card-data="event"
						@click="navigateTo(`/${locale}/event/${event.id}`)"
					/>
				</cp-grid-layout>
				<h5 v-else class="main-page__section-placeholder">
					{{ $t('Sin eventos') }}
				</h5>
			</div>
		</template>
	</cp-base-page>
</template>

<script setup lang="ts">
import { startOfDay, endOfDay } from 'date-fns';
import CityDropDown from '@features/city-filter/CityDropDown.vue';
import EventCategoryDropDown from '@features/event-category-filter/EventCategoryDropDown.vue';
import { requestEventsColletions, requestEventsList } from '@shared/api';
import {
	CollectionTypes,
	type CollectionFilters,
	type EventData,
} from '@shared/api/types';
import CpGridLayout from '@shared/gui/CpGridLayout.vue';
import CpBasePage from '@shared/gui/CpBasePage.vue';
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
	&__list-title {
		margin-bottom: 30px;
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
		}
	}

	&__filters {
		display: flex;
		flex-wrap: wrap;
		padding: 20px;
		gap: 20px;
	}
}
</style>
