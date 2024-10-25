<template>  
	<main class="map">  
	
		<!-- Display location only (with markers) -->
		<l-map  
			v-if="!props.coordinatesOutput" 
			ref="map"  
			v-model:zoom="zoom"  
			v-model:center="center"  
			:use-global-leaflet="false"  
		>  
			<l-tile-layer  
				url="https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}@2x.png"  
				layer-type="base"  
				name="Stadia Maps Basemap"  
			/>  
			<l-marker  
				v-for="(mark, index) in mapMarkers"  
				:key="index"  
				:lat-lng="mark.coordinates"  
			/>  
		</l-map> 

		<!-- Output coordinates -->
		<l-map  
			v-if="props.coordinatesOutput" 
			ref="map"  
			v-model:zoom="zoom"  
			v-model:center="center"  
			:use-global-leaflet="false"  
			@click="getCoordinates"  
		>  
			<l-tile-layer  
				url="https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}@2x.png"  
				layer-type="base"  
				name="Stadia Maps Basemap"  
			/>  
			<l-marker  
				:lat-lng="markers ? markers.coordinates : props.center"  
			/>  
		</l-map>
	</main>  
</template>  

<script setup lang="ts">  
import 'leaflet/dist/leaflet.css';  
import { ref } from 'vue';  
import { LMap, LTileLayer, LMarker } from '@vue-leaflet/vue-leaflet';  

type CoordinatesType = {  
    coordinates: number[];  
};  

type mapProps = {  
    center: number[];  
    mapMarkers?: CoordinatesType[];  
    coordinatesOutput?: boolean;   
};  

type MapEmits = {
	(event: 'update:coordinatesUpdate', eventData: string): void;
};

const props = defineProps<mapProps>();
const emit = defineEmits<MapEmits>();
const zoom = ref<number>(8);  
const center = ref<number[]>(props.center || []);   
const markers = ref<CoordinatesType | null>(null);   

const getCoordinates = (event: any) => {  
    const { lat, lng } = event.latlng;   
    if (props.coordinatesOutput) {  
        markers.value = { coordinates: [lat, lng] };  
		emit('update:coordinatesUpdate', `${lat} ${lng}`);
    }  
};  
</script>  

<style scoped lang="scss">  
.map {  
    width: 100%;  
    height: 100%;  
}  
</style>