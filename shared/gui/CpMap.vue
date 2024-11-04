<template>
	<main class="map">
		<!-- Display location only (with markers) -->
		<l-map
			v-if="!props.coordinatesOutput"
			ref="map"
			v-model:zoom="zoom"
			v-model:center="getCenter"
			:use-global-leaflet="false"
		>
			<l-tile-layer
				url="https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}@2x.png"
				layer-type="base"
				name="Stadia Maps Basemap"
			/>
			<l-marker
				v-for="(mark, index) in getMapMarkers"
				:key="index"
				:lat-lng="mark.coordinates"
			/>
		</l-map>

		<!-- Output coordinates -->
		<l-map
			v-if="props.coordinatesOutput"
			ref="map"
			v-model:zoom="zoom"
			v-model:center="getCenter"
			:use-global-leaflet="false"
			@click="getCoordinates"
		>
			<l-tile-layer
				url="https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}@2x.png"
				layer-type="base"
				name="Stadia Maps Basemap"
			/>
			<l-marker :lat-lng="markers ? markers.coordinates : props.center" />
		</l-map>
	</main>
</template>

<script setup lang="ts">
import 'leaflet/dist/leaflet.css';
import { LMap, LTileLayer, LMarker } from '@vue-leaflet/vue-leaflet';

type CoordinatesType = {
	coordinates: number[] | string;
};

type mapProps = {
	center: number[] | string;
	mapMarkers?: CoordinatesType[];
	coordinatesOutput?: boolean;
};

const props = defineProps<mapProps>();
const emit = defineEmits<MapEmits>();

const handleCoords = (coords: number[] | string) => {
	if (!coords) {
		return [];
	} else if (Array.isArray(coords) && !coords.length) {
		return [];
	} else if (Array.isArray(coords)) {
		return coords;
	} else {
		return coords.split(',').map((coord) => {
			return parseFloat(coord);
		});
	}
};
const getMapMarkers = computed(() => {
	if (!props.mapMarkers?.length) {
		return [];
	}

	return props.mapMarkers?.map((marker: CoordinatesType) => {
		return {
			coordinates: handleCoords(marker.coordinates),
		};
	});
});

const getCenter = computed(() => handleCoords(props.center));
type MapEmits = {
	(event: 'update:coordinatesUpdate', eventData: CoordinatesType): void;
};

const zoom = ref<number>(8);
const markers = ref<CoordinatesType | null>(null);

const getCoordinates = (event: any) => {
	const { lat, lng } = event.latlng;
	if (props.coordinatesOutput) {
		markers.value = { coordinates: [lat, lng] };
		emit('update:coordinatesUpdate', { coordinates: [lat, lng] });
	}
};
</script>

<style scoped lang="scss">
.map {
	width: 100%;
	height: 100%;
}
</style>
