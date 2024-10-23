<template>  
	<main class="map">  
		<l-map  
			ref="map"  
			v-model:zoom="zoom"  
			v-model:center="center"  
			:use-global-leaflet="false"  
			@click="handleMapClick"  
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
	</main>  
</template>  

<script setup lang="ts">  
import 'leaflet/dist/leaflet.css';  
import { ref } from 'vue';  
import { LMap, LTileLayer, LMarker } from '@vue-leaflet/vue-leaflet';  

type CoordinatesType = {  
	coordinates?: number[];  
};  

type mapProps = {  
	center: number[];  
	mapMarkers?: CoordinatesType[];  
};  

const props = defineProps<mapProps>();  
const zoom = ref<number>(8);  
const center = ref<number[]>(props.center ? props.center : []);  

const handleMapClick = (event: any) => {  
	const { lat, lng } = event.latlng; 
	// console.log(`Кликнули по координатам: ${lat}, ${lng}`);  
};  
</script>  

<style scoped lang="scss">  
.map {  
	width: 100%;  
	height: 100%;  
}  
</style>