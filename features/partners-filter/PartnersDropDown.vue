<template>
	<cp-drop-down
		v-model="pickedEventHost"
		:options="formatedEventsHostData"
		drop-down-label="Filter by event organizer"
		:value="pickedEventHost"
		@update:model-value="emitFilterChange"
	/>
</template>

<script setup lang="ts">
import CpDropDown from '@shared/gui/CpDropDown.vue';
import { requestEventsHostList } from '@shared/api';

type Events = {
	(event: 'change:eventHost', value: string[]): void;
};

const emit = defineEmits<Events>();
const eventsHostData = ref();
const pickedEventHost = ref();

const requestFilterData = async () => {
	try {
		const eventsHostRaw = await requestEventsHostList();
		eventsHostData.value = eventsHostRaw.data;
	} catch (e) {
		console.error(e);
	}
};

requestFilterData();

const formatedEventsHostData = computed(() => {
	const options = eventsHostData.value?.data;
	if (!options?.length) {
		return [];
	}

	return options.map((option: any) => {
		return {
			item_title: option.attributes.commercialName,
			item_UID: option.attributes.commercialName,
			item_value: option.attributes.commercialName,
			createdAt: option.attributes.createdAt,
			updatedAt: option.attributes.updatedAt,
			locale: option.attributes.locale,
		};
	});
});

const emitFilterChange = () => {
	emit('change:eventHost', pickedEventHost.value);
};
</script>
