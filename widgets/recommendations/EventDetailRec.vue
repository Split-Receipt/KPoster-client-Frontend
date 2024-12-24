<template>
	<div v-if="eventsCollections.length" class="event-detail-reco-widget">
		<div
			v-for="collection in eventsCollections"
			:key="collection.attributes.collectionCode"
			class="event-detail-reco-widget__carousel"
		>
			<h2 class="event-detail-reco-widget__carousel-title">
				{{ collection.attributes.collectionName }}
			</h2>
			<event-carousel
				:id="collection.id"
				:event-data="collection.attributes.events.data"
			/>
		</div>
	</div>
</template>

<script lang="ts" setup>
import {
	CollectionTypes,
	type CollectionFilters,
	type EventColletion,
} from '@shared/api/types';
import { requestEventsColletions } from '@shared/api';
import { startOfDay } from 'date-fns';
const filters: CollectionFilters = {
	type: {
		$eq: CollectionTypes.forSinglePages,
	},
	events: {
		eventStartDate: {
			$lte: startOfDay(new Date()),
		},
		eventEndDate: {
			$gte: startOfDay(new Date()),
		},
	},
};

const eventsCollections = ref<EventColletion[]>([]);

onBeforeMount(() => {
	getEventsCollection();
});

const getEventsCollection = async () => {
	try {
		const eventsCollectionsRequestData = await requestEventsColletions(filters);
		eventsCollections.value = eventsCollectionsRequestData.data.data;
	} catch (e) {
		console.error(e);
	}
};
</script>

<style lang="scss" scoped>
.event-detail-reco-widget {
	&__carousel {
		position: relative;
		margin-top: 260px;
		margin-bottom: 160px;

		@media #{$screen-tablet} {
			position: relative;
			bottom: 20px;
		}

		@media #{$screen-desktop} {
			bottom: 30px;
		}

		&-title {
			&-recomended {
				display: block;
				width: 75%;
				position: absolute;
				top: -125px;
				font-size: 60px;
				line-height: 84px;
				font-weight: 500;
				color: #353333;
			}

			&-closestPlaces {
				display: block;
				width: 75%;
				position: absolute;
				top: -40px;
				font-size: 60px;
				line-height: 84px;
				font-weight: 500;
				color: #353333;
			}
		}
	}
}
</style>
