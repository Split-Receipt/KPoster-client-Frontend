<template>
	<cp-base-page :header="$t('event_host_page')">
		<template #content>
			<div class="event-host-page__filters">
				<cp-text-input
					v-model="filter.filters.commercialName.$containsi"
					class="even-host-page__search-input"
					type="text"
					rounded
					placeholder="Search"
					@update:model-value="handleSearch"
				/>
			</div>
			<div class="event-host-page__content">
				<event-host-card
					v-for="item in eventHostList"
					:key="item.id"
					:item="item"
				/>
			</div>
			<div class="pagination">
				<cp-button
					:disabled="paginationConfig.page === 1"
					class="pagination__control"
					size="small"
					type="secondary"
					shape="circle"
					left-icon="arrow-left"
					@click="previousPage"
				/>
				<p class="pagination__content">{{ paginationConfig.page }}</p>
				<cp-button
					:disabled="totalPages === paginationConfig.page"
					class="pagination__control"
					size="small"
					type="secondary"
					shape="circle"
					left-icon="arrow-right"
					@click="nextPage"
				/>
			</div>
		</template>
	</cp-base-page>
</template>

<script lang="ts" setup>
import EventHostCard from '@entities/CpEventHostCard/EventHostCard.vue';
import { requestEventsHostList } from '@shared/api';
import type { EventHost } from '@shared/api/types';
import { useDebounceFn } from '@vueuse/core';

const eventHostList = ref<EventHost['data'][]>();
const filter = reactive({
	filters: {
		commercialName: {
			$containsi: '',
		},
	},
});
const eventHostMeta = reactive({
	total: 0,
});
const paginationConfig = reactive({
	page: 1,
	pageSize: 6,
});

const nextPage = () => {
	paginationConfig.page += 1;
	getEventHostList();
};

const previousPage = () => {
	paginationConfig.page -= 1;
	getEventHostList();
};

const totalPages = computed(() =>
	Math.ceil(eventHostMeta.total / paginationConfig.pageSize)
);

const handleSearch = () => {
	if (filter.filters.commercialName.$containsi) {
		debouncedFiltersHandler(filter);
	} else {
		debouncedFiltersHandler();
	}
};

const debouncedFiltersHandler = useDebounceFn((filters = {}) => {
	getEventHostList(filters);
}, 500);

const getEventHostList = async (filters = {}) => {
	try {
		const eventHostListResponse = await requestEventsHostList({
			populate: { mainBanner: true },
			...(Object.keys(filters).length && filters),
			pagination: toRaw(paginationConfig),
		});
		eventHostList.value = eventHostListResponse.data.data;
		eventHostMeta.total = eventHostListResponse.data.meta.pagination.total;
	} catch (e) {
		console.error(e);
	}
};

onBeforeMount(() => {
	getEventHostList();
});
</script>

<style lang="scss">
.event-host-page {
	&__filters {
		margin-bottom: 25px;

		@media #{$screen-tablet} {
			max-width: 250px;
		}
	}

	&__content {
		display: grid;
		column-gap: 20px;
		row-gap: 20px;
		grid-template-columns: 1fr;

		@media #{$screen-tablet} {
			grid-template-columns: 1fr 1fr;
		}
		@media #{$screen-desktop} {
			grid-template-columns: 1fr 1fr 1fr;
		}
	}
}

.pagination {
	margin-top: 20px;
	display: flex;
	flex-direction: row;

	&__content {
		padding: 15px;
		font-size: 40px;
	}
}
</style>
