<template>
	<cp-drop-down
		v-model="pickedCities"
		:options="formatedCitiesData"
		drop-down-label="Filter by cities"
		:value="pickedCities"
		@update:model-value="emitFilterChange"
	/>
</template>

<script setup lang="ts">
import CpDropDown from '@shared/gui/CpDropDown.vue';
import { requestCities } from '@shared/api';

type Events = {
	(event: 'change:filterCities', value: string): void;
};

const emit = defineEmits<Events>();
const citiesData = ref();
const pickedCities = ref();

const requestFilterData = async () => {
	try {
		const citiesRaw = await requestCities();
		citiesData.value = citiesRaw.data;
	} catch (e) {
		console.error(e);
	}
};

requestFilterData();

const formatedCitiesData = computed(() => {
	const options = citiesData.value?.data;
	if (!options?.length) {
		return [];
	}

	return options.map((option: any) => {
		return {
			item_title: option.attributes.cityName,
			item_UID: option.attributes.cityCode,
			item_value: option.attributes.cityCode,
			createdAt: option.attributes.createdAt,
			updatedAt: option.attributes.updatedAt,
			locale: option.attributes.locale,
		};
	});
});

const emitFilterChange = () => {
	emit('change:filterCities', pickedCities.value);
};
</script>
