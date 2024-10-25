<template>
	<cp-drop-down
		v-model="pickedEventCategory"
		:options="formatedEventCategoryData"
		drop-down-label="Filter by category"
		:value="pickedEventCategory"
		@update:model-value="emitFilterChange"
	/>
</template>

<script setup lang="ts">
import CpDropDown from '@shared/gui/CpDropDown.vue';
import { requestEventCategories } from '@shared/api';

type Events = {
	(event: 'change:filterEventCats', value: string): void;
};

const emit = defineEmits<Events>();
const eventCategoriesData = ref();
const pickedEventCategory = ref();

const requestFilterData = async () => {
	try {
		const eventCategoriesRaw = await requestEventCategories();
		eventCategoriesData.value = eventCategoriesRaw.data;
	} catch (e) {
		console.error(e);
	}
};

requestFilterData();

const formatedEventCategoryData = computed(() => {
	const options = eventCategoriesData.value?.data;
	if (!options?.length) {
		return [];
	}

	return options.map((option: any) => {
		return {
			item_title: option.attributes.eventTypeName,
			item_UID: option.attributes.eventTypeCode,
			item_value: option.attributes.eventTypeCode,
			createdAt: option.attributes.createdAt,
			updatedAt: option.attributes.updatedAt,
			locale: option.attributes.locale,
		};
	});
});

const emitFilterChange = () => {
	emit('change:filterEventCats', pickedEventCategory.value);
};
</script>
