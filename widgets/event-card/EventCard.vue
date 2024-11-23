<template>
	<div class="event-card__wrapper">
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
				<h4 class="event-card__title">
					{{ formattedTitle }}
				</h4>
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
						@click.stop="navigateTo(`/event-edit/${eventCardData.id}`)"
					/>

					<cp-button
						v-if="withEditControls"
						class="event-card__button"
						type="secondary"
						text="Borrar"
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
						:text="$t('Learn more')"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { format } from 'date-fns';
import type { EventCard } from '@widgets/event-card/types/types';
import { formatExternalLink } from '@shared/helpers/formatText';
import CpButton from '@shared/gui/CpButton.vue';

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
			eventDate: '01/01/2024',
			eventShortDescription:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
		},
	}),
});

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

function buyTicketHandler() {
	window.open(
		formatExternalLink(props.eventCardData.attributes.linkToBuyTicket),
		'_blank'
	);
}

const formattedDate = computed(() => {
	return format(
		new Date(props.eventCardData.attributes.eventDate),
		'dd/MM/yyyy'
	);
});

const formattedTitle = computed(() => {
	return props.eventCardData.attributes.eventName.length > 19
		? props.eventCardData.attributes.eventName.slice(0, 15) + '...'
		: props.eventCardData.attributes.eventName;
});
</script>

<style scoped lang="scss">
.event-card {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding: $event-card-default-padding;
	border-radius: $event-card-default-border-radius;
	background-color: $event-card-text-background-color;
	box-shadow: $card-shadow;
	text-align: center;
	overflow: hidden;

	&__content {
		display: flex;
		flex-direction: column;
		gap: 20px;
		margin-top: 20px;
	}

	&__img {
		position: relative;
		overflow: hidden;
		width: 100%;
		height: $event-card-image-default-height;

		&-pic {
			width: 100%;
			height: inherit;
			object-fit: cover;
			border-radius: $event-card-default-border-radius;
		}
	}

	&__title {
		white-space: nowrap;
	}

	&__text {
		font-size: $event-card-text-default-font-size;
		line-height: $event-card-text-default-line-height;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		overflow: hidden;
		color: $event-card-text-color;
		line-clamp: 3;
		-webkit-line-clamp: 3;

		@media #{$screen-tablet} {
			font-size: $event-card-text-font-size-tablet;
			line-height: $event-card-text-line-height-tablet;
		}

		@media #{$screen-big-desktop} {
			font-size: $event-card-text-font-size-big-desktop;
			line-height: $event-card-text-line-height-big-desktop;
		}
	}

	&__date {
		font-size: $event-card-date-default-font-size;
		line-height: $event-card-date-default-line-height;

		@media #{$screen-tablet} {
			font-size: $event-card-date-font-size-tablet;
			line-height: $event-card-date-line-height-tablet;
		}
	}

	&__controls {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	:deep(.button) {
		width: 100%;
	}
}

// 	&--small {
// 		gap: 15px;
// 		height: $event-card-small-height-mobile;
// 		border-radius: 30px;

// 		@media #{$screen-tablet} {
// 			gap: 20px;
// 			height: $event-card-small-height-tablet;
// 		}

// 		@media #{$screen-desktop} {
// 			height: $event-card-small-height-desktop;
// 			border-radius: 40px;
// 		}

// 		@media #{$screen-big-desktop} {
// 			height: $event-card-small-height-big-desktop;
// 		}
// 	}

// 	&--medium {
// 		gap: 14px;
// 		height: $event-card-medium-height-mobile;

// 		@media #{$screen-tablet} {
// 			gap: 20px;
// 			height: $event-card-medium-height-tablet;
// 		}

// 		@media #{$screen-desktop} {
// 			border-radius: 40px;
// 			height: $event-card-medium-height-desktop;
// 		}

// 		@media #{$screen-big-desktop} {
// 			border-radius: 35px;
// 			height: $event-card-medium-height-big-desktop;
// 		}
// 	}

// 	&--large {
// 		gap: 20px;
// 		height: $event-card-large-height;
// 	}

// 	&__title {
// 		position: relative;
// 		top: 3px;
// 		display: -webkit-box;
// 		height: $event-card-title-default-height;
// 		-webkit-box-orient: vertical;
// 		overflow: hidden;
// 		line-clamp: 1;
// 		-webkit-line-clamp: 1;
// 		text-overflow: ellipsis;

// 		@media #{$screen-tablet} {
// 			top: 0;
// 		}

// 		@media #{$screen-desktop} {
// 			top: 3px;
// 			height: $event-card-title-height-desktop;
// 		}
// 	}

// 	&__text {
// 		position: relative;
// 		top: 5px;
// 		font-size: $event-card-text-default-font-size;
// 		line-height: $event-card-text-default-line-height;
// 		display: -webkit-box;
// 		-webkit-box-orient: vertical;
// 		overflow: hidden;
// 		color: $event-card-text-color;
// 		height: $event-card-text-default-height;
// 		max-width: $event-card-text-default-max-width;
// 		line-clamp: 2;
// 		-webkit-line-clamp: 2;

// 		@media #{$screen-tablet} {
// 			font-size: $event-card-text-font-size-tablet;
// 			line-height: $event-card-text-line-height-tablet;
// 		}

// 		@media #{$screen-big-desktop} {
// 			font-size: $event-card-text-font-size-big-desktop;
// 			line-height: $event-card-text-line-height-big-desktop;
// 		}

// 		&--small {
// 			@media #{$screen-tablet} {
// 				height: $event-card-text-small-height-tablet;
// 				line-clamp: 3;
// 				-webkit-line-clamp: 3;
// 			}

// 			@media #{$screen-desktop} {
// 				top: -2px;
// 				height: $event-card-text-small-height-desktop;
// 				line-clamp: 4;
// 				-webkit-line-clamp: 4;
// 			}

// 			@media #{$screen-big-desktop} {
// 				top: 10px;
// 				height: $event-card-text-small-height-big-desktop;
// 				line-clamp: 5;
// 				-webkit-line-clamp: 5;
// 			}
// 		}

// 		&--medium {
// 			@media #{$screen-tablet} {
// 				height: $event-card-text-medium-height-tablet;
// 				line-clamp: 2;
// 				-webkit-line-clamp: 2;
// 			}

// 			@media #{$screen-desktop} {
// 				height: $event-card-text-medium-height-desktop;
// 				line-clamp: 4;
// 				-webkit-line-clamp: 4;
// 			}

// 			@media #{$screen-big-desktop} {
// 				height: $event-card-text-medium-height-big-desktop;
// 				line-clamp: 6;
// 				-webkit-line-clamp: 6;
// 			}
// 		}

// 		&--large {
// 			height: $event-card-text-large-height-mobile;

// 			@media #{$screen-tablet} {
// 				height: $event-card-text-large-height-desktop;
// 				line-clamp: 3;
// 				-webkit-line-clamp: 3;
// 			}

// 			@media #{$screen-big-desktop} {
// 				height: $event-card-text-large-height-big-desktop;
// 				line-clamp: 2;
// 				-webkit-line-clamp: 2;
// 			}
// 		}
// 	}

// 	&__date {
// 		position: relative;
// 		top: 3px;
// 		font-size: $event-card-date-default-font-size;
// 		line-height: $event-card-date-default-line-height;
// 		height: $event-card-date-default-height;

// 		@media #{$screen-tablet} {
// 			font-size: $event-card-date-font-size-tablet;
// 			line-height: $event-card-date-line-height-tablet;
// 			height: $event-card-date-height-tablet;
// 		}

// 		&--small {
// 			@media #{$screen-desktop} {
// 				top: 4px;
// 				font-size: $event-card-date-small-font-size-desktop;
// 				line-height: $event-card-date-small-line-height-desktop;
// 				height: $event-card-date-small-height-desktop;
// 			}

// 			@media #{$screen-big-desktop} {
// 				top: 6px;
// 			}
// 		}

// 		&--medium {
// 			@media #{$screen-desktop} {
// 				font-size: $event-card-date-medium-font-size-desktop;
// 				line-height: $event-card-date-medium-line-height-desktop;
// 				height: $event-card-date-medium-height-desktop;
// 			}

// 			@media #{$screen-big-desktop} {
// 				font-size: $event-card-date-medium-font-size-big-desktop;
// 				line-height: $event-card-date-medium-line-height-big-desktop;
// 				height: $event-card-date-small-height-big-desktop;
// 			}
// 		}
// 	}

// }
</style>
