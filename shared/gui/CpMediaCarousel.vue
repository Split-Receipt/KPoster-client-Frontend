<template>
	<cp-section :header="$t('Galería del organizador')">
		<template #controls>
			<div class="event-carousel__controls">
				<cp-button
					shape="square"
					size="small"
					left-icon="arrow-left"
					:class="[
						`button-prev__${id}`,
						'swiper-button-prev',
						'event-carousel__button',
					]"
				/>
				<cp-button
					shape="square"
					size="small"
					left-icon="arrow-right"
					:class="[
						`button-next__${id}`,
						'swiper-button-next',
						'event-carousel__button',
					]"
				/>
			</div>
		</template>
		<template #section-content>
			<swiper
				:id="id"
				:modules="[SwiperNavigation, SwiperGrid]"
				space-between="20"
				:navigation="{
					enabled: true,
					nextEl: `.button-next__${id}`,
					prevEl: `.button-prev__${id}`,
				}"
				:breakpoints="{
					0: {
						slidesPerView: 1.5,
						grid: {
							fill: 'row',
							rows: 1,
						},
					},
					768: {
						slidesPerView: 2.5,
						grid: {
							fill: 'row',
							rows: 1,
						},
					},
					1280: {
						slidesPerView: 3,
						grid: {
							fill: 'row',
							rows: 1,
						},
					},
					1920: {
						slidesPerView: 3,
						grid: {
							fill: 'row',
							rows: 1,
						},
					},
				}"
			>

				<swiper-slide v-for="(source, index) in videoFilesUrls" :key="index">
					<cp-media-card
						type="video"
						:item="{ id: index, source }"
						@delete="(value: CpMediaCardProps['item']) => emit('deleteVideo', value)"
					/>
				</swiper-slide>
				<swiper-slide v-for="(source, index) in mediaFilesUrls" :key="index">
					<cp-media-card
						:item="{ id: index, source }"
						@delete="(value: CpMediaCardProps['item']) => emit('deletePhoto', value)"
					/>
				</swiper-slide>
				<swiper-slide v-for="item in videoFilesObjects" :key="item.id">
					<cp-media-card
						type="video"
						:item="item"
						:edit-mode="isDeletable"
						@delete="(value: CpMediaCardProps['item']) => emit('deleteVideo', value)"
					/>
				</swiper-slide>
				<swiper-slide v-for="item in mediaFilesObjects" :key="item.id">
					<cp-media-card
						:edit-mode="isDeletable"
						:item="item"
						@delete="(value: CpMediaCardProps['item']) => emit('deletePhoto', value)"
					/>
				</swiper-slide>
			</swiper>
		</template>
	</cp-section>
</template>

<script setup lang="ts">
import CpMediaCard from './CpMediaCard.vue';
import CpSection from '@shared/gui/CpSection.vue';
import type { CpMediaCardProps } from './types';
type Props = {
	mediaFilesUrls?: string[];
	videoFilesUrls?: string[];
	mediaFilesObjects?: CpMediaCardProps['item'][];
	videoFilesObjects?: CpMediaCardProps['item'][];
	id: string | number;
	isDeletable?: boolean;
};
type Emits = {
	(
		e: 'deletePhoto' | 'deleteVideo',
		objectToDelete: CpMediaCardProps['item']
	): void;
};

defineProps<Props>();

const emit = defineEmits<Emits>();
</script>

<style scoped lang="scss">
.event-carousel {
	&__controls {
		display: none;
		@media #{$screen-tablet} {
			display: flex;
			gap: 20px;
		}
	}

	&__button {
		width: auto;
		display: none;

		@media #{$screen-tablet} {
			display: block;
		}
	}

	&-image, &-video {
		object-fit: cover;
		width: 100%;
		height: 100%;
	}
}

.swiper-button-prev, .swiper-button-next {
	position: static;
	&::after {
		content: '';
	}
}
</style>
