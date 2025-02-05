<template>
	<teleport to="body">
		<cp-basic-modal
			:show="show"
			@accept="deleteEvent(eventCardData.id)"
			@close="show = false"
		>
			<template #content>
				<h4>¿Eliminar Evento?</h4>
				<span>¿Confirmar eliminación? será imposible cancelar la acción</span>
			</template>
		</cp-basic-modal>
	</teleport>
	<div class="event-card" :class="`event-card--${size}`">
		<div class="event-card__img" :class="`event-card__img--${size}`">
			<nuxt-img
				placeholder="/images/event-card_blured.jpg"
				loading="lazy"
				class="event-card__img-pic"
				:src="photoUrl"
			/>
		</div>
		<div class="event-card__content">
			<h5 class="event-card__title">
				{{ props.eventCardData.attributes.eventName }}
			</h5>
			<div class="event-card__text">
				{{ eventCardData.attributes.eventShortDescription }}
			</div>
			<span class="event-card__date">
				{{ formattedDate }}
			</span>

			<div class="event-card__controls">
				<cp-button
					v-if="withEditControls"
					class="event-card__button"
					:class="`event-card__button--${size}`"
					text="Editar evento"
					@click.stop="navigateTo(`/${locale}/event-edit/${eventCardData.id}`)"
				/>

				<cp-button
					v-if="withEditControls"
					class="event-card__button"
					type="secondary"
					text="Borrar"
					@click="handleDeleteEvent"
				/>

				<cp-button
					v-if="eventCardData.attributes.linkToBuyTicket && !withEditControls"
					class="event-card__button"
					:class="`event-card__button--${size}`"
					:text="$t('Buy ticket')"
					@click.stop="buyTicketHandler"
				/>

				<cp-button
					v-if="!withEditControls"
					class="event-card__button"
					type="secondary"
					:class="`event-card__button--${size}`"
					:text="$t('learn_more')"
				/>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { format } from 'date-fns';
import type { EventCard } from '@widgets/event-card/types/types';
import { formatExternalLink } from '@shared/helpers/formatText';
import CpButton from '@shared/gui/CpButton.vue';
import { deleteEvent } from '@shared/api';

const props = withDefaults(defineProps<Props>(), {
	size: 'small',
	withEditControls: false,
	eventCardData: (): Props['eventCardData'] => ({
		id: 1,
		attributes: {
			linkToBuyTicket: '#',
			eventBanner: {
				data: {
					id: 1,
					attributes: {
						url: 'event-card-1.png',
					},
				},
			},
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
			eventName: 'Event Name',
			eventStartDate: '01/01/2024',
			eventEndDate: '01/01/2024',
			eventShortDescription:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
		},
	}),
});

const show = ref(false);

const { locale } = useI18n();

const config = useRuntimeConfig();
type Props = {
	size?: string;
	eventCardData: EventCard;
	withEditControls?: boolean;
};

const photoUrl = computed(() => {
	const eventBannerImageUrl = props.eventCardData.attributes?.eventBanner?.data;
	const eventImageUrl = props.eventCardData.attributes?.eventMediaPhotos?.data;

	if (eventBannerImageUrl) {
		return config.public.apiBaseUrl + eventBannerImageUrl?.attributes?.url;
	} else if (eventImageUrl?.length) {
		return config.public.apiBaseUrl + eventImageUrl[0]?.attributes?.url;
	}

	return '';
});

const handleDeleteEvent = () => {
	show.value = true;
};

function buyTicketHandler() {
	window.open(
		formatExternalLink(props.eventCardData.attributes.linkToBuyTicket),
		'_blank'
	);
}

const formattedDate = computed(() => {
	if (
		props.eventCardData.attributes.eventEndDate &&
		props.eventCardData.attributes.eventStartDate
	) {
		const endDate = format(
			new Date(props.eventCardData.attributes.eventEndDate),
			'dd/MM/yyyy'
		);
		const startDate = format(
			new Date(props.eventCardData.attributes.eventStartDate),
			'dd/MM/yyyy'
		);
		if (endDate === startDate) {
			return startDate;
		} else {
			return `${startDate} - ${endDate}`;
		}
	} else {
		return '';
	}
});
</script>

<style scoped lang="scss">
.event-card {
	min-width: 290px;
	max-width: 500px;
	height: 620px;
	overflow: hidden;
	padding: 15px;
	border-radius: $event-card-default-border-radius;
	background-color: $event-card-text-background-color;
	box-shadow: $card-shadow;
	text-align: center;
	display: grid;
	grid-template-rows: 250px auto;
	gap: 8px;

	@media #{$screen-tablet} {
		height: 640px;
	}

	&__content {
		display: grid;
		gap: 5px;
		@media #{$screen-tablet} {
			gap: 8px;
		}
	}

	&__title {
		display: -webkit-box;
		-webkit-box-orient: vertical;
		overflow: hidden;
		line-height: 26px;
		line-clamp: 3;
		-webkit-line-clamp: 3;

		@media #{$screen-tablet} {
			line-height: 30px;
		}
	}

	&__img {
		height: 250px;

		&-pic {
			height: 250px;
			width: 100%;
			border-radius: $event-card-default-border-radius;
			object-fit: fill;
		}
	}

	&__controls {
		width: 100%;
		height: 130px;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		gap: 8px;
		justify-self: flex-end;
	}

	&__text {
		display: -webkit-box;
		-webkit-box-orient: vertical;
		overflow: hidden;
		color: $event-card-text-color;
		line-clamp: 3;
		-webkit-line-clamp: 3;
		line-height: 20px;
		@media #{$screen-tablet} {
			line-height: 24px;
		}
	}

	&__date {
		font-size: $event-card-date-default-font-size;

		@media #{$screen-tablet} {
			font-size: $event-card-date-font-size-tablet;
		}
	}
}
</style>
