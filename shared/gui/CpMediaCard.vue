<template>
	<teleport to="body">
		<cp-basic-modal
			:show="show"
			@accept="handleAccept(item)"
			@close="show = false"
		>
			<template #content>
				<h4>¿Eliminar datos?</h4>
				<span>¿Confirmar eliminación? será imposible cancelar la acción</span>
			</template>
		</cp-basic-modal>
	</teleport>
	<div :class="['media-card', { 'media-card_deleted': isMediaDeleted }]">
		<p v-if="isMediaDeleted" class="media-card__deleted-notification">Archivo eliminado</p>
		<button
			v-if="editMode"
			type="button"
			:disabled="isMediaDeleted"
			class="deleteButton"
			@click="show = true"
		>
			╳
		</button>
		<div v-if="type === 'image'">
			<nuxt-img
				class="media-card__media-item"
				:src="item.source"
				alt="No se pudo cargar el medio"
			/>
		</div>

		<div v-else-if="type === 'video'">
			<video
				class="media-card__media-item"
				:src="item.source"
				controls
				alt="No se pudo cargar el medio"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import CpBasicModal from './CpBasicModal.vue';
import type { CpMediaCardProps } from './types';

const props = withDefaults(defineProps<CpMediaCardProps>(), {
	type: 'image',
	isMediaDeleted: null,
	editMode: false,
});

const emit = defineEmits<Events>();

const localDeletionMediaStatus = ref(false);

const isMediaDeleted = computed(() => {
	if (props.isMediaDeleted === null) {
		return localDeletionMediaStatus.value;
	}

	return props.isMediaDeleted;
});

type Events = {
	(event: 'delete', item: CpMediaCardProps['item']): void;
};

const handleAccept = (item: CpMediaCardProps['item']) => {
	emit('delete', item);
	show.value = false;
	localDeletionMediaStatus.value = true;
};
const show = ref(false);
</script>

<style lang="scss" scoped>
.deleteButton {
	position: absolute;
	display: flex;
	align-items: center;
	justify-content: center;
	border: none;
	font-size: 14px;
	right: 5px;
	top: 5px;
	width: 40px;
	height: 40px;
	background-color: $sunrise-red;
	border-radius: 50%;
	color: #fff;
	text-align: center;
	cursor: pointer;
	z-index: 1;
}

.media-card {
	position: relative;

	&__deleted-notification {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		color: #fff;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 2;
	}

	&__media-item {
		width: 100%;
		height: 300px;
		object-fit: cover;
		border: 1px solid transparent;
		border-radius: 16px;
	}
}
</style>
