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
		</template>
	</cp-base-page>
</template>

<script lang="ts" setup>
import EventHostCard from '@entities/CpEventHostCard/EventHostCard.vue';
import { requestEventsHostList } from '@shared/api';
import type { EventHost } from '@shared/api/types';

const eventHostList = ref<EventHost['data'][]>();

const getEventHostList = async () => {
	try {
		const { data } = await requestEventsHostList({
			populate: { mainBanner: true },
		});
		eventHostList.value = data.data;
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
</style>
