<template>
	<cp-drop-down
		v-model="pickedCultureCategories"
		:options="formatedCultureCategoriesData"
		:drop-down-label="$t('culture_area_filter_placeholder')"
		:value="pickedCultureCategories"
		@update:model-value="emitFilterChange"
	/>
</template>

<script setup lang="ts">
import CpDropDown from '@shared/gui/CpDropDown.vue';
import { requestCategories } from '@shared/api';

type Events = {
	(event: 'change:filterCultureCats', value: string[]): void;
};

const emit = defineEmits<Events>();
const cultureCategoriesData = ref();
const pickedCultureCategories = ref();

const requestFilterData = async () => {
	try {
		const cultureCategoriesRaw = await requestCategories();
		cultureCategoriesData.value = cultureCategoriesRaw.data;
	} catch (e) {
		console.error(e);
	}
};

requestFilterData();

const formatedCultureCategoriesData = computed(() => {
	const options = cultureCategoriesData.value?.data;
	if (!options?.length) {
		return [];
	}

	return options.map((option: any) => {
		return {
			item_title: option.attributes.cultureTypeName,
			item_UID: option.attributes.cultureTypeCode,
			item_value: option.attributes.cultureTypeCode,
			createdAt: option.attributes.createdAt,
			updatedAt: option.attributes.updatedAt,
			locale: option.attributes.locale,
		};
	});
});

const emitFilterChange = () => {
	emit('change:filterCultureCats', pickedCultureCategories.value);
};
</script>
