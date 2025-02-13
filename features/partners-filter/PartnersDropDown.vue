<template>
	<cp-drop-down
		v-model="pickedEventHost"
		:options="formatedEventsHostData"
		:drop-down-label="$t('event_host_filter_placeholder')"
		:value="pickedEventHost"
		:can-load-more="canLoadMore"
		@load-more="loadMoreCb"
		@update:model-value="emitFilterChange"
	/>
</template>

<script setup lang="ts">
import CpDropDown from '@shared/gui/CpDropDown.vue';
import { requestEventsHostList } from '@shared/api';
import type { EventHost, ResponseMeta } from '@shared/api/types';

type Events = {
	(event: 'change:eventHost', value: string[]): void;
};

const emit = defineEmits<Events>();
const eventsHostData = ref<{ data: EventHost['data'][]; meta: ResponseMeta }>();
const pickedEventHost = ref([]);
const filters = reactive({
	sort: ['publishedAt:desc'],
	pagination: {
		page: 1,
		pageSize: 25,
	},
});

const loadMoreCb = () => {
	filters.pagination.page++;
	requestFilterData();
};

const canLoadMore = computed(
	() =>
		(eventsHostData.value?.meta.pagination.pageCount ?? 0) >
		filters.pagination.page
);

const requestFilterData = async () => {
	try {
		const eventsHostRaw = await requestEventsHostList({
			sort: filters.sort,
			pagination: filters.pagination,
		});
		if (filters.pagination.page > 1 && eventsHostData.value) {
			eventsHostData.value = {
				...eventsHostData.value,
				...{ data: [...eventsHostData.value.data, ...eventsHostRaw.data.data] },
			};
		} else {
			eventsHostData.value = eventsHostRaw.data;
		}
	} catch (e) {
		console.error(e);
	}
};

onBeforeMount(() => {
	requestFilterData();
});

const formatedEventsHostData = computed(() => {
	const options = eventsHostData.value?.data;
	if (!options?.length) {
		return [];
	}

	return options.map((option: EventHost['data']) => {
		return {
			item_title: option.attributes.commercialName,
			item_UID: option.attributes.commercialName,
			item_value: option.attributes.commercialName,
			createdAt: option.attributes.createdAt,
			updatedAt: option.attributes.updatedAt,
			locale: option.attributes.locale,
			publishedAt: option.attributes.publishedAt,
		};
	});
});

const emitFilterChange = () => {
	emit('change:eventHost', pickedEventHost.value);
};
</script>
