<template>
	<div class="organizer">
		<h1>Culture events of Peru</h1>
		<div class="organizer-greet">
			<div class="organizer-greet-text">
				<span class="organizer-greet-text-top">
					Creador de contenido en plataformas digitales
				</span>
				<div class="organizer-greet-text-desctop">
					<h3 class="organizer-greet-text-middle">
						{{ eventHost?.data.attributes.compName }}
					</h3>
					<span class="organizer-greet-text-bottom">
						{{ eventHost?.data.attributes.orgResume }}
					</span>
				</div>
			</div>
			<div ref="eventHostMainImage" class="organizer-greet-image" />
			<div class="organizer-greet-text-mobile">
				<h3 class="organizer-greet-text-middle">
					{{ eventHost?.data.attributes.compName }}
				</h3>
				<span class="organizer-greet-text-bottom">
					{{ eventHost?.data.attributes.orgResume }}
				</span>
			</div>
		</div>

		<div v-if="events.length" class="organizer-calendar">
			<h3 class="organizer-calendar-title">
				Calendario de eventos <br />
				del organizador
			</h3>
			<date-card-carousel />
		</div>

		<div v-if="events.length" class="organizer-filters">
			<city-drop-down
				@change:filter-cities="(value: string[]) => changeFilters(value, 'city')"
			/>
			<event-category-drop-down
				@change:filter-event-cats="(value: string[]) => changeFilters(value, 'eventCategory')"
			/>
		</div>

		<div v-if="events.length" class="organizer-events">
			<event-carousel id="organizer-events-carousel" :event-data="events" />
		</div>

		<div class="organizer-infoImage">
			<h3 class="organizer-calendar-title">
				Galería del <br />
				organizador
			</h3>
			<cp-media-carousel
				id="qwe123"
				:media-files-urls="getMediaPhotosUrls"
				:video-files-urls="getMediaVideosUrls"
			/>
		</div>
		<div class="organizer-contacts">
			<div class="organizer-contacts-title">
				<h3>Contactos del organizador</h3>
				<span> Siempre puedes contactarnos usando estos contactos </span>
			</div>
			<div class="organizer-contacts-referenses">
				<div class="organizer-contacts-referenses-mail">
					<span class="organizer-contacts-referenses-mail-title">E-mail</span>
					<span class="organizer-contacts-referenses-mail-ref">
						{{ eventHost?.data.attributes.contacts.mail }}</span
					>
				</div>
				<div class="organizer-contacts-referenses-tel">
					<span class="organizer-contacts-referenses-tel-title">
						Número de teléfono</span
					>
					<span class="organizer-contacts-referenses-tel-ref">
						{{ eventHost?.data.attributes.contacts.tel }}</span
					>
				</div>
				<div class="organizer-contacts-referenses-place">
					<span class="organizer-contacts-referenses-place-title">
						País y ciudad</span
					>
					<span class="organizer-contacts-referenses-place-ref">
						{{ eventHost?.data.attributes.contacts.place }}</span
					>
				</div>
				<div
					v-if="eventHost?.data.attributes.socialMedias"
					class="organizer-contacts-referenses-socials"
				>
					<cp-social-link
						v-for="socialMedia in eventHost.data.attributes.socialMedias"
						:key="socialMedia.socialMediaName"
						:social-media-link="socialMedia.socialMediaLink"
						:social-media-name="socialMedia.socialMediaName"
					/>
				</div>
			</div>
		</div>

		<div v-if="eventHost?.data.attributes.compVideoLink" class="organizer-video">
			<iframe
				:src="eventHost.data.attributes.compVideoLink"
				title="YouTube or Vimeo video player"
			/>
		</div>

		<div class="organizer-map">
			<cp-map :map-markers="testMarkers" :center="testMapCenter" />
		</div>
	</div>
</template>

<script setup lang="ts">
import type { EventHost } from '@shared/api/types';
import type { EventCard } from '@widgets/event-card/types/types';
import { requestEventsHost, requestEventsList } from '@shared/api';
import { useRuntimeConfig } from 'nuxt/app';
import { toast } from 'vue3-toastify';
import CityDropDown from '@features/city-filter/CityDropDown.vue';
import EventCategoryDropDown from '@features/event-category-filter/EventCategoryDropDown.vue';
import { startOfDay, endOfDay } from 'date-fns';

const route = useRoute();
const eventHostId = route.params.id as string;

const eventHost = ref<EventHost>();
const events = ref<EventCard[]>([]);

const eventHostMainImage = ref<HTMLElement | null>(null);
const config = useRuntimeConfig();

const filters: CollectionFilters = {
	type: { $eq: CollectionTypes.forMainPage },
	events: {
		eventDate: {
			$gte: startOfDay(new Date()),
			$lte: endOfDay(new Date()),
		},
	},
};

const getEventHostById = async () => {
	try {
		eventHost.value = (await requestEventsHost(eventHostId)).data;
	} catch (e) {
		toast.error('Error al obtener el organizador');
	}
};

const getEvents = async () => {
	try {
		filters.events.eventHost = {
			eventHostCode: { $eq: eventHost.value?.data.attributes.commercialName },
		};
		const eventsRequestData = await requestEventsList(filters.events);
		events.value = eventsRequestData.data.data;
	} catch (e) {
		console.error(e);
	}
};

const changeFilters = (data: any, filterPath: string) => {
	switch (filterPath) {
		case 'city': {
			filters.events.eventAddress = {
				city: {
					cityCode: {
						$in: data,
					},
				},
			};
			getEvents();
			break;
		}

		case 'eventCategory': {
			filters.events.eventCategory = { eventCategoryCode: { $in: data } };
			getEvents();
			break;
		}

		case 'date': {
			filters.events.eventDate = {
				$gte: startOfDay(data),
				$lte: endOfDay(data),
			};
			getEvents();
			break;
		}
		default: {
			getEvents();
			break;
		}
	}
};

const requestPageData = async () => {
	await getEventHostById();
	await getEvents();
};

onMounted(async () => {
	await requestPageData();
	changeMainImage();
});

const getMediaPhotosUrls = computed(() => {
	const eventHostData = eventHost.value?.data.attributes;
	if (eventHostData) {
		const everyPossibleImageOfEventHost = [
			...eventHostData.galleryImages.data,
			...eventHostData.mainBanner.data,
			...eventHostData.mostPopularProduct.data,
		];

		return everyPossibleImageOfEventHost.map((image) => {
			return config.public.apiBaseUrl + image.attributes.url;
		});
	}

	return [];
});

const getMediaVideosUrls = computed(() => {
	const eventHostData = eventHost.value?.data.attributes;
	if (eventHostData) {
		const everyPossibleVideoOfEventHost = [
			...eventHostData.videoBusinessCard.data,
			...eventHostData.compVideoFile.data,
		];

		return everyPossibleVideoOfEventHost.map((image) => {
			return config.public.apiBaseUrl + image.attributes.url;
		});
	}

	return [];
});
const changeMainImage = () => {
	const mainBanner = eventHost.value?.data.attributes.mainBanner;
	if (eventHostMainImage.value) {
		if (mainBanner) {
			eventHostMainImage.value.style.backgroundImage = `url(${
				config.public.apiBaseUrl +
				eventHost.value?.data.attributes.mainBanner.data[0].attributes.url
			})`;
		}
	}
};

const testMarkers = [{ coordinates: [-12.046016, -77.030554] }];
const testMapCenter = [-12.046016, -77.030554];
</script>

<style scoped lang="scss">
.organizer {
	padding: 0 20px 0 20px;

	h1 {
		width: 100%;
		font-size: 72px;
		font-style: normal;
		font-weight: 500;
		line-height: normal;
		color: $soft-black;
		text-align: center;
		@media screen and (max-width: 769px) {
			font-size: 40px;
		}
	}

	h3 {
		line-height: 84px;
		font-size: 70px;
		font-weight: 500;
		font-style: normal;
		color: $black;
		@media screen and (max-width: 769px) {
			font-size: 32px;
			line-height: 50px;
		}
	}

	&-greet {
		width: 100%;
		display: flex;
		justify-content: space-between;
		padding: 70px 0 70px 0;
		@media screen and (max-width: 1005px) {
			flex-direction: column;
		}

		&-text {
			width: 35%;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			@media screen and (max-width: 1280px) {
				width: 45%;
			}
			@media screen and (max-width: 1005px) {
				width: 100%;
			}

			&-desctop {
				@media screen and (max-width: 1005px) {
					display: none;
				}
			}

			&-mobile {
				display: none;
				width: 100%;
				@media screen and (max-width: 1005px) {
					display: block;
					width: 100%;
				}
			}

			&-top {
				display: flex;
				height: 90px;
				align-items: center;
				align-self: stretch;
				font-size: 30px;
				font-weight: 400;
				line-height: normal;
				letter-spacing: 0.9px;
				text-transform: uppercase;
				color: $gray;
				margin-bottom: 82px;
				@media screen and (max-width: 1320px) {
					margin-bottom: 65px;
				}
				@media screen and (max-width: 1280px) {
					margin-bottom: 55px;
				}
				@media screen and (max-width: 1005px) {
					width: 100%;
					margin-bottom: 10px;
				}
				@media screen and (max-width: 769px) {
					font-size: 16px;
				}
			}

			&-middle {
				margin-bottom: 20px;
				@media screen and (max-width: 1005px) {
					margin-bottom: 10px;
				}
			}

			&-bottom {
				color: $gray;
				font-size: 22px;
				font-style: normal;
				font-weight: 400;
				line-height: 35.2px;
				@media screen and (max-width: 769px) {
					font-size: 16px;
				}
			}
		}

		&-image {
			display: block;
			width: 60%;
			height: auto;
			border-radius: 35px;
			background-image: url('/public/images/organizer-image.jpg');
			background-size: cover;
			background-repeat: no-repeat;
			background-position: center;
			@media screen and (max-width: 1280px) {
				width: 50%;
			}
			@media screen and (max-width: 1005px) {
				width: 100%;
				min-height: 60vh;
				height: 100% !important;
				margin-bottom: 20px;
			}
		}
	}

	&-calendar {
		margin-top: 140px;
		&-title {
			text-wrap: wrap;
		}
	}

	&-filters {
		display: flex;
		margin: 35px 0 0 85px;
		@media screen and (max-width: 675px) {
			flex-direction: column;
			margin: 35px 0 10px 5px;
		}
	}

	&-events {
		display: block;
		line-height: 84px;
		font-weight: 500;
		color: #353333;
	}

	&-infoImage {
		width: calc(100% + 40px);
		height: auto;
		border-radius: 0 0 30px 30px;
		margin: 140px 0 70px -20px;
		@media screen and (max-width: 700px) {
			margin-bottom: 60px;
		}
		@media screen and (max-width: 540px) {
			margin-bottom: 50px;
		}
		@media screen and (max-width: 420px) {
			margin-bottom: 40px;
		}

		img {
			width: 100%;
			height: 100%;
			@media screen and (max-width: 700px) {
				height: 80%;
			}
			@media screen and (max-width: 540px) {
				height: 70%;
			}
			@media screen and (max-width: 420px) {
				height: 60%;
			}
		}
	}

	&-contacts {
		display: flex;
		justify-content: space-between;
		width: 100%;
		padding: 0 20px 0 20px;
		margin-bottom: 70px;

		@media screen and (max-width: 865px) {
			flex-direction: column;
			margin-bottom: 0;
		}

		&-title {
			width: 50%;
			padding-right: 20px;
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			@media screen and (max-width: 865px) {
				width: 100%;
				padding-right: 0;
			}

			h3 {
				margin-bottom: 20px;
				font-size: 70px;
				font-style: normal;
				font-weight: 500;
				line-height: 120%;
				color: $black;

				@media screen and (max-width: 1350px) {
					font-size: 62px;
				}
				@media screen and (max-width: 1280px) {
					font-size: 56px;
				}
				@media screen and (max-width: 1030px) {
					font-size: 45px;
					font-weight: 600;
				}
				@media screen and (max-width: 965px) {
					text-align: center;
					font-size: 38px;
				}
				@media screen and (max-width: 435px) {
					font-size: 24px;
				}
			}

			span {
				font-size: 22px;
				font-style: normal;
				font-weight: 400;
				line-height: 160%;
				color: $gray;

				@media screen and (max-width: 1350px) {
					font-size: 18px;
				}
				@media screen and (max-width: 1280px) {
					font-size: 16px;
				}
				@media screen and (max-width: 1030px) {
					font-size: 14px;
				}
				@media screen and (max-width: 435px) {
					font-size: 13px;
				}
			}
		}

		&-referenses {
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			padding-left: 20px;
			width: 50%;

			@media screen and (max-width: 865px) {
				width: 100%;
				margin-top: 41px;
				padding-left: 0;
			}

			&-mail {
				display: flex;
				justify-content: space-between;
				margin-bottom: 10px;

				&-title {
					font-size: 30px;
					font-style: normal;
					font-weight: 400;
					line-height: normal;
					letter-spacing: 0.9px;
					text-transform: uppercase;
					color: $gray;

					@media screen and (max-width: 1350px) {
						font-size: 26px;
					}
					@media screen and (max-width: 1280px) {
						font-size: 22px;
					}
					@media screen and (max-width: 1030px) {
						font-size: 20px;
					}
					@media screen and (max-width: 965px) {
						font-size: 18px;
					}
					@media screen and (max-width: 435px) {
						font-size: 15px;
					}
				}

				&-ref {
					font-size: 30px;
					font-style: normal;
					font-weight: 400;
					line-height: normal;
					letter-spacing: 0.9px;
					text-transform: uppercase;
					color: $gray;
					@media screen and (max-width: 1350px) {
						font-size: 26px;
					}
					@media screen and (max-width: 1280px) {
						font-size: 22px;
					}
					@media screen and (max-width: 1030px) {
						font-size: 20px;
					}
					@media screen and (max-width: 965px) {
						font-size: 18px;
					}
					@media screen and (max-width: 435px) {
						font-size: 15px;
					}
				}
			}
			&-tel {
				display: flex;
				justify-content: space-between;
				margin-bottom: 10px;

				&-title {
					font-size: 30px;
					font-style: normal;
					font-weight: 400;
					line-height: normal;
					letter-spacing: 0.9px;
					text-transform: uppercase;
					color: $gray;
					@media screen and (max-width: 1350px) {
						font-size: 26px;
					}
					@media screen and (max-width: 1280px) {
						font-size: 22px;
					}
					@media screen and (max-width: 1030px) {
						font-size: 20px;
					}
					@media screen and (max-width: 965px) {
						font-size: 18px;
					}
					@media screen and (max-width: 435px) {
						font-size: 15px;
					}
				}

				&-ref {
					font-size: 30px;
					font-style: normal;
					font-weight: 400;
					line-height: normal;
					letter-spacing: 0.9px;
					text-transform: uppercase;
					color: $gray;
					@media screen and (max-width: 1350px) {
						font-size: 26px;
					}
					@media screen and (max-width: 1280px) {
						font-size: 22px;
					}
					@media screen and (max-width: 1030px) {
						font-size: 20px;
					}
					@media screen and (max-width: 965px) {
						font-size: 18px;
					}
					@media screen and (max-width: 435px) {
						font-size: 15px;
					}
				}
			}

			&-place {
				display: flex;
				justify-content: space-between;
				margin-bottom: 10px;

				&-title {
					font-size: 30px;
					font-style: normal;
					font-weight: 400;
					line-height: normal;
					letter-spacing: 0.9px;
					text-transform: uppercase;
					color: $gray;
					@media screen and (max-width: 1350px) {
						font-size: 26px;
					}
					@media screen and (max-width: 1280px) {
						font-size: 22px;
					}
					@media screen and (max-width: 1030px) {
						font-size: 20px;
					}
					@media screen and (max-width: 965px) {
						font-size: 18px;
					}
					@media screen and (max-width: 435px) {
						font-size: 15px;
					}
				}

				&-ref {
					font-size: 30px;
					font-style: normal;
					font-weight: 400;
					line-height: normal;
					letter-spacing: 0.9px;
					text-transform: uppercase;
					color: $gray;
					@media screen and (max-width: 1350px) {
						font-size: 26px;
					}
					@media screen and (max-width: 1280px) {
						font-size: 22px;
					}
					@media screen and (max-width: 1030px) {
						font-size: 20px;
					}
					@media screen and (max-width: 965px) {
						font-size: 18px;
					}
					@media screen and (max-width: 435px) {
						font-size: 15px;
					}
				}
			}

			&-socials {
				display: flex;
				justify-content: flex-start;
				width: 100%;
				margin-top: 20px;

				@media screen and (max-width: 865px) {
					margin: 20px 0 30px 0;
				}

				div {
					margin-right: 20px;
				}
			}
		}
	}

	&-video {
		position: relative;
		width: calc(100% + 40px);
		height: 75vh;
		margin: 0 0 70px -20px;
		display: flex;
		justify-content: space-around;

		iframe {
			border-radius: 8px;
			height: 100%;
			width: 95%;
		}

		@media screen and (max-width: 875px) {
			height: 60vh;
		}

		@media screen and (max-width: 600px) {
			height: 50vh;
		}

		@media screen and (max-width: 550px) {
			height: 40vh;
		}

		@media screen and (max-width: 505px) {
			height: 30vh;
		}
	}

	&-map {
		width: calc(100% + 40px);
		margin-left: -20px;
		height: 400px;
	}
}
</style>
