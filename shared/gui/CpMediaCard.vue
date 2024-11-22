<template>
	<teleport to="body">
		<cp-basic-modal :show="show" @accept="$emit('delete', item)" @close="show = false">
			<template #content>
				<h4>¿Eliminar datos?</h4>
				<span>¿Confirmar eliminación? será imposible cancelar la acción</span>
			</template>
		</cp-basic-modal>
	</teleport>
	<button v-if="editMode" class="deleteButton" @click="show = !!show">╳</button>
	<div v-if="type === 'image'">
		<nuxt-img
			style="width: 100%; height: 100%; object-fit: cover"
			:src="item.source"
			alt="No se pudo cargar el medio"
		/>
	</div>

	<div v-else-if="type === 'video'">
		<video
			style="object-fit: cover; width: 100%; height: 100%"
			:src="item.source"
			controls
			alt="No se pudo cargar el medio"
		/>
	</div>
</template>

<script setup lang="ts">
import CpBasicModal from './CpBasicModal.vue';
import type { CpMediaCardProps } from './types';

withDefaults(defineProps<CpMediaCardProps>(), {
	type: 'image',
	editMode: false,
});

const show = ref(false);
</script>

<style lang="scss" scoped></style>
