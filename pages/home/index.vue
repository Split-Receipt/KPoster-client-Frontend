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
					:options="categoryFilterOptions"
					drop-down-label="Filter by category"
					:value="categoriesToFilter"
				/>
				<cp-drop-down
					v-model="citiesToFilter"
					:options="cityFilterOptions"
					drop-down-label="Filter by city"
					:value="citiesToFilter"
				/>
				<cp-drop-down
					v-model="organizersToFilter"
					:options="
						formatFiltersOptions(remoteOrganizersFilterOptions, 'organizer')
					"
					drop-down-label="Filter by event organizer"
					:value="organizersToFilter"
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
import CpDropDown from '@shared/gui/CpDropDown.vue';
import type { RequestOption } from '@shared/api/types';
import {
	requestCities,
	requestCategories,
	requestEventsColletions,
} from '@shared/api';
import { ca } from 'date-fns/locale/ca';

const categoriesToFilter: string[] = [];
const citiesToFilter: string[] = [];
const organizersToFilter: string[] = [];
const { availableLocales, setLocale } = useI18n();
const eventsCollections = ref();

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

onMounted(() => {
	requestForFilters(requestCategories, remoteCategoryFilterOptions);
	requestForFilters(requestCities, remoteCityFilterOptions);
	requestForFilters(requestCities, remoteOrganizersFilterOptions);
});
const getEventsCollection = async () => {
	try {
		const eventsCollectionsRequestData = await requestEventsColletions();
		eventsCollections.value = eventsCollectionsRequestData.data.data;
	} catch (e) {
		console.error(e);
	}
};
getEventsCollection();

// category check points

const remoteCategoryFilterOptions = ref<Array<RequestOption['attributes']>>([]);

// city filter checkpoint

const remoteCityFilterOptions = ref<Array<RequestOption['attributes']>>([]);

// organizers filter checkpoint

const remoteOrganizersFilterOptions = ref<Array<RequestOption['attributes']>>(
	[]
);

const cityFilterOptions = computed(() => {
	return formatFiltersOptions(remoteCityFilterOptions, 'city');
});

const categoryFilterOptions = computed(() => {
	return formatFiltersOptions(remoteCategoryFilterOptions, 'cultureType');
});

const hostFilterOptions = computed(() => {
	return formatFiltersOptions(remoteCityFilterOptions, 'city');
});

const formatFiltersOptions = (options: any, prefix: string) => {
	if (!options.value) {
		return [];
	}

	return options.value.map((option: any) => {
		return {
			item_title: option[`${prefix}Name`],
			item_UID: option[`${prefix}Code`],
			item_value: option[`${prefix}Code`],
			createdAt: option.createdAt,
			updatedAt: option.updatedAt,
			locale: option.locale,
		};
	});
};

// function trigger (when component did mount)

const requestForFilters = async (
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
	flex-wrap: wrap;
	margin-top: 25px;
}
</style>
