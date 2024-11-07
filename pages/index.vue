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

				<partners-drop-down
					@change:event-host="(value: string[]) => changeFilters(value, 'eventHost')"
				/>
				<event-category-drop-down
					@change:filter-event-cats="(value: string[]) => changeFilters(value, 'eventCategory')"
				/>
			</div>
			<div class="main-page__section-list">
				<main-section
					v-for="eventsCollection in eventsCollections"
					:key="eventsCollection.id"
					:collection-data="eventsCollection"
				/>
			</div>
		</main>
	</div>
</template>

<script setup lang="ts">
import PartnersDropDown from '@features/partners-filter/PartnersDropDown.vue';
import CityDropDown from '@features/city-filter/CityDropDown.vue';
import EventCategoryDropDown from '@features/event-category-filter/EventCategoryDropDown.vue';
import { requestEventsColletions } from '@shared/api';
import { CollectionTypes, type CollectionFilters } from '@shared/api/types';

const { availableLocales, setLocale } = useI18n();
const eventsCollections = ref();
const filters: CollectionFilters = {
	type: { $eq: CollectionTypes.forMainPage },
	events: {
		eventDate: {
			$eq: new Date(),
		},
	},
};

onBeforeMount(() => {
	getEventsCollection();
});

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
		const eventsCollectionsRequestData = await requestEventsColletions(filters);
		eventsCollections.value = eventsCollectionsRequestData.data.data;
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
			getEventsCollection();
			break;
		}

		case 'eventHost': {
			filters.events.eventHost = { eventHostCode: { $in: data } };
			getEventsCollection();
			break;
		}

		case 'eventCategory': {
			filters.events.eventCategory = { eventCategoryCode: { $in: data } };
			getEventsCollection();
			break;
		}

		case 'date': {
			filters.events.eventDate = { $eq: data };
			getEventsCollection();
			break;
		}
		default: {
			getEventsCollection();
		}
	}
};
</script>

<style scoped lang="scss">
.main-page {
	height: 100%;
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
	}
}

.main-page__filters {
	display: flex;
	flex-wrap: wrap;
	margin-top: 25px;
}
</style>
