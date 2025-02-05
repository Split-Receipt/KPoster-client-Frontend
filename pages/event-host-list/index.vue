<template>
	<cp-base-page :header="$t('event_host_page')">
		<template #content>
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

const eventHostList = ref<EventHost['data'][]>();
const eventHostMeta = reactive({
	total: 0,
});
const paginationConfig = reactive({
	page: 1,
	pageSize: 10,
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

const getEventHostList = async () => {
	try {
		const eventHostListResponse = await requestEventsHostList({
			populate: { mainBanner: true },
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
	&__title {
		margin-bottom: 25px;

		@media #{$screen-tablet} {
			margin-bottom: 50px;
		}
	}
	&__content {
		display: grid;
		column-gap: 20px;
		row-gap: 20px;
		grid-template-columns: 1fr;

		@media #{$screen-desktop} {
			grid-template-columns: 1fr 1fr;
		}
	}
}

.pagination {
	display: flex;
	flex-direction: row;

	&__content {
		padding: 15px;
		font-size: 40px;
	}
}
</style>
