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
				<swiper-slide v-for="(card, index) in eventData" :key="index">
					<event-card
						:with-edit-controls="props.withEditControls"
						:event-card-data="card"
						@click="toEventDetailPage(card.id)"
					/>
				</swiper-slide>
			</swiper>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { EventCard } from '@widgets/event-card/types/types';
type Props = {
	eventData: Array<EventCard>;
	id: string | number;
	withEditControls?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
	withEditControls: false,
	eventData: (): Props['eventData'] => [
		{
			id: 1,
			attributes: {
				linkToBuyTicket: '#',
				eventDate: '01/01/2024',
				eventName: 'Event Name',
				eventShortDescription:
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
				eventMediaPhotos: {
					data: [
						{
							id: 1,
							attributes: {
								url: 'event-card-1.png',
							},
						},
					],
				},
			},
		},
	],
});

const toEventDetailPage = (cardId: number) => {
	navigateTo(`/event/${cardId}`);
};
</script>

<style scoped lang="scss">
.event-carousel {
	&__controls {
		position: relative;
		display: flex;
		justify-content: flex-end;
		gap: 10px;
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
