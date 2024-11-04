<template>
	<div class="event-card__wrapper">
		<div class="event-card" :class="[eventCardSize[size]]">
			<div class="event-card__img" :class="[eventCardImageSize[size]]">
				<nuxt-img
					placeholder="/images/event-card_blured.jpg"
					loading="lazy"
					class="event-card__img-pic"
					:src="photoUrl"
				/>
			</div>
			<h4 class="event-card__title">
				{{ eventCardData.attributes.eventName }}
			</h4>
			<span class="event-card__text" :class="[eventCardTextSize[size]]">
				{{ eventCardData.attributes.eventShortDescription }}
			</span>
			<span
				class="event-card__date"
				:class="[eventCardDateSize[size as eventCardDateSizeType]]"
			>
				{{ formatedDate }}
			</span>

			<div class="event-card__controls">
				<button
					class="event-card__button event-card__button--yellow-grey"
					:class="[eventCardButtonSize[size]]"
					@click.stop="buyTicketHandler"
				>
					Buy ticket
				</button>

				<button
					class="event-card__button event-card__button--transparent"
					:class="[eventCardButtonSize[size]]"
					@click.stop="learnMoreHandler"
				>
					Learn more
				</button>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { format } from 'date-fns';
import type { EventCard } from '@widgets/event-card/types/types';
const props = withDefaults(defineProps<Props>(), {
	size: 'small',
	eventCardData: (): Props['eventCardData'] => ({
		id: 1,
		attributes: {
			linkToBuyTicket: '#',
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
	size?:
		| eventCardSizeType
		| eventCardImageSizeType
		| eventCardButtonSizeType
		| eventCardDateSizeType
		| eventCardTextSizeType;
	eventCardData: EventCard;
};

const photoUrl = computed(() => {
	const eventImageUrl =
		props.eventCardData.attributes?.eventMediaPhotos?.data[0]?.attributes.url;

	if (!eventImageUrl) {
		return '';
	}

	return config.public.apiBaseUrl + eventImageUrl;
});

// const photoUrl =
// 	config.public.apiBaseUrl +
// 	props.eventCardData.attributes.eventMediaPhotos.data[0].attributes.url;

function buyTicketHandler() {
	window.open(props.eventCardData.attributes.linkToBuyTicket, '_blank');
}

const formatedDate = computed(() => {
	return format(
		new Date(props.eventCardData.attributes.eventDate),
		'dd/MM/yyyy'
	);
});

// ...

enum eventCardSize {
	small = 'event-card--small',
	medium = 'event-card--medium',
	large = 'event-card--large',
}

enum eventCardImageSize {
	small = 'event-card__img--small',
	medium = 'event-card__img--medium',
	large = 'event-card__img--large',
}

enum eventCardTextSize {
	small = 'event-card__text--small',
	medium = 'event-card__text--medium',
	large = 'event-card__text--large',
}

enum eventCardDateSize {
	small = 'event-card__date--small',
	medium = 'event-card__date--medium',
}

enum eventCardButtonSize {
	small = 'event-card__button--small',
	medium = 'event-card__button--medium',
	large = 'event-card__button--large',
}

type eventCardSizeType = keyof typeof eventCardSize;
type eventCardImageSizeType = keyof typeof eventCardImageSize;
type eventCardButtonSizeType = keyof typeof eventCardButtonSize;
type eventCardDateSizeType = keyof typeof eventCardDateSize;
type eventCardTextSizeType = keyof typeof eventCardTextSize;
</script>

<style scoped lang="scss">
.event-card {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 100%;
	padding: $event-card-default-padding;
	border-radius: $event-card-default-border-radius;

	background-color: $event-card-text-background-color;

	&--small {
		gap: 15px;
		height: $event-card-small-height-mobile;
		border-radius: 30px;

		@media #{$screen-tablet} {
			gap: 20px;
			height: $event-card-small-height-tablet;
		}

		@media #{$screen-desktop} {
			height: $event-card-small-height-desktop;
			border-radius: 40px;
		}

		@media #{$screen-big-desktop} {
			height: $event-card-small-height-big-desktop;
		}
	}

	&--medium {
		gap: 14px;
		height: $event-card-medium-height-mobile;

		@media #{$screen-tablet} {
			gap: 20px;
			height: $event-card-medium-height-tablet;
		}

		@media #{$screen-desktop} {
			border-radius: 40px;
			height: $event-card-medium-height-desktop;
		}

		@media #{$screen-big-desktop} {
			border-radius: 35px;
			height: $event-card-medium-height-big-desktop;
		}
	}

	&--large {
		gap: 20px;
		height: $event-card-large-height;
	}

	&__img {
		position: relative;
		overflow: hidden;
		width: 100%;
		height: $event-card-image-default-height;

		&--small {
			height: $event-card-image-small-height-mobile;

			@media #{$screen-desktop} {
				height: $event-card-image-default-height;
			}
		}

		&--large {
			height: $event-card-image-large-height-mobile;
		}

		&-pic {
			width: 100%;
			height: inherit;
			object-fit: cover;
			font-family: 'object-fit: cover';
			border-radius: 30px;
		}
	}

	&__title {
		position: relative;
		top: 3px;
		display: -webkit-box;
		height: $event-card-title-default-height;
		-webkit-box-orient: vertical;
		overflow: hidden;
		line-clamp: 1;
		-webkit-line-clamp: 1;
		text-overflow: ellipsis;

		@media #{$screen-tablet} {
			top: 0;
		}

		@media #{$screen-desktop} {
			top: 3px;
			height: $event-card-title-height-desktop;
		}
	}

	&__text {
		position: relative;
		top: 5px;
		font-size: $event-card-text-default-font-size;
		line-height: $event-card-text-default-line-height;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		overflow: hidden;
		color: $event-card-text-color;
		height: $event-card-text-default-height;
		max-width: $event-card-text-default-max-width;
		line-clamp: 2;
		-webkit-line-clamp: 2;

		@media #{$screen-tablet} {
			font-size: $event-card-text-font-size-tablet;
			line-height: $event-card-text-line-height-tablet;
		}

		@media #{$screen-big-desktop} {
			font-size: $event-card-text-font-size-big-desktop;
			line-height: $event-card-text-line-height-big-desktop;
		}

		&--small {
			@media #{$screen-tablet} {
				height: $event-card-text-small-height-tablet;
				line-clamp: 3;
				-webkit-line-clamp: 3;
			}

			@media #{$screen-desktop} {
				top: -2px;
				height: $event-card-text-small-height-desktop;
				line-clamp: 4;
				-webkit-line-clamp: 4;
			}

			@media #{$screen-big-desktop} {
				top: 10px;
				height: $event-card-text-small-height-big-desktop;
				line-clamp: 5;
				-webkit-line-clamp: 5;
			}
		}

		&--medium {
			@media #{$screen-tablet} {
				height: $event-card-text-medium-height-tablet;
				line-clamp: 2;
				-webkit-line-clamp: 2;
			}

			@media #{$screen-desktop} {
				height: $event-card-text-medium-height-desktop;
				line-clamp: 4;
				-webkit-line-clamp: 4;
			}

			@media #{$screen-big-desktop} {
				height: $event-card-text-medium-height-big-desktop;
				line-clamp: 6;
				-webkit-line-clamp: 6;
			}
		}

		&--large {
			height: $event-card-text-large-height-mobile;

			@media #{$screen-tablet} {
				height: $event-card-text-large-height-desktop;
				line-clamp: 3;
				-webkit-line-clamp: 3;
			}

			@media #{$screen-big-desktop} {
				height: $event-card-text-large-height-big-desktop;
				line-clamp: 2;
				-webkit-line-clamp: 2;
			}
		}
	}

	&__date {
		position: relative;
		top: 3px;
		font-size: $event-card-date-default-font-size;
		line-height: $event-card-date-default-line-height;
		height: $event-card-date-default-height;

		@media #{$screen-tablet} {
			font-size: $event-card-date-font-size-tablet;
			line-height: $event-card-date-line-height-tablet;
			height: $event-card-date-height-tablet;
		}

		&--small {
			@media #{$screen-desktop} {
				top: 4px;
				font-size: $event-card-date-small-font-size-desktop;
				line-height: $event-card-date-small-line-height-desktop;
				height: $event-card-date-small-height-desktop;
			}

			@media #{$screen-big-desktop} {
				top: 6px;
			}
		}

		&--medium {
			@media #{$screen-desktop} {
				font-size: $event-card-date-medium-font-size-desktop;
				line-height: $event-card-date-medium-line-height-desktop;
				height: $event-card-date-medium-height-desktop;
			}

			@media #{$screen-big-desktop} {
				font-size: $event-card-date-medium-font-size-big-desktop;
				line-height: $event-card-date-medium-line-height-big-desktop;
				height: $event-card-date-small-height-big-desktop;
			}
		}
	}

	&__controls {
		display: flex;
		flex-wrap: wrap;
		gap: 15px;
	}

	&__button {
		font-size: 15px;
		line-height: 21px;
		height: 51px;
		padding: 15px 40px;
		border: none;
		cursor: pointer;
		border-radius: 99px;

		@media #{$screen-tablet} {
			font-size: 20px;
			line-height: 28px;
			height: 68px;
		}

		&--yellow-grey {
			background: $button-gradient-background-color;
		}

		&--transparent {
			background: transparent;
			border: 1px solid $button-border-dusty-gray;
		}

		&--small {
			@media #{$screen-tablet} {
				padding: 20px 50px 17px 50px;
			}

			@media #{$screen-desktop} {
				font-size: 16px;
				line-height: 22px;
				height: 62px;
			}

			@media #{$screen-big-desktop} {
				font-size: 16px;
				line-height: 22px;
				height: 62px;
			}
		}

		&--medium {
			&:nth-child(2) {
				margin-top: -5px;
			}

			@media #{$screen-tablet} {
				padding: 20px 60px;

				&:nth-child(2) {
					margin-top: 5px;
				}
			}

			@media #{$screen-desktop} {
				font-size: 18px;
				line-height: 25px;
				height: 65px;

				&:nth-child(2) {
					margin: 0 0 0 5px;
				}
			}

			@media #{$screen-big-desktop} {
				font-size: 22px;
				line-height: 31px;
				height: 71px;
			}
		}

		&--large {
			padding: 20px 60px;

			&:nth-child(2) {
				margin-top: -5px;
			}

			@media #{$screen-desktop} {
				font-size: 18px;
				line-height: 25px;
				height: 65px;

				&:nth-child(2) {
					margin: 0 0 0 5px;
				}
			}
		}

		&:disabled {
			opacity: 0.5;
			cursor: not-allowed;
		}
	}
}
</style>
