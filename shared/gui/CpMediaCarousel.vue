<template>
	<div class="event-carousel__wrapper">
		<div class="event-carousel">
			<div class="event-carousel__controls">
				<cp-button
					shape="square"
					color="transparent"
					size="squareSize"
					width="squareWidth"
					left-icon="arrow-left"
					:class="[
						`button-prev__${id}`,
						'swiper-button-prev',
						'event-carousel__button',
					]"
				/>
				<cp-button
					shape="square"
					color="black"
					size="squareSize"
					width="squareWidth"
					left-icon="arrow-right"
					:class="[
						`button-next__${id}`,
						'swiper-button-next',
						'event-carousel__button',
					]"
				/>
			</div>

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
						:edit-mode="isDeletable"
						:item="{ id: index, source }"
						@delete="(value: CpMediaCardProps['item']) => emit('deleteVideo', value)"
					/>
				</swiper-slide>
				<swiper-slide v-for="(source, index) in mediaFilesUrls" :key="index">
					<cp-media-card
						:edit-mode="isDeletable"
						:item="{ id: index, source }"
						@delete="(value: CpMediaCardProps['item']) => emit('deletePhoto', value)"
					/>
				</swiper-slide>
			</swiper>
		</div>
	</div>
</template>

<script setup lang="ts">
import CpMediaCard from './CpMediaCard.vue';
import type { CpMediaCardProps } from './types';
type Props = {
	mediaFilesUrls?: string[];
	videoFilesUrls?: string[];
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
		position: relative;
		display: flex;
		justify-content: flex-end;
		gap: 20px;
		margin-right: 10px;

		@media #{$screen-desktop} {
			margin-right: 0px;
		}
	}

	&__button {
		position: static;
		width: auto;
		display: none;

		@media #{$screen-tablet} {
			display: block;
		}

		@media screen and (max-width: 960px) {
			display: none;
		}
	}

	&-image {
		object-fit: cover;
		width: 100%;
		height: 100%;
	}

	&-video {
		object-fit: cover;
		width: 100%;
		height: 100%;
	}
}

.swiper {
	@media #{$screen-tablet} {
		padding-top: 55px;
	}
}

.swiper-button-next {
	&::after {
		content: '';
	}
}
.swiper-button-prev {
	&::after {
		content: '';
	}
}
</style>
