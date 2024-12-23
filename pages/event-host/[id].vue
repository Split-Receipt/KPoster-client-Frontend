<template>
	<cp-base-page class="host">
		<template #content>
			<cp-section>
				<template #section-content>
					<div class="cover">
						<div class="cover__subtitle">
							{{ $t('Creador de contenido en plataformas digitales') }}
						</div>
						<div ref="eventHostMainImage" class="cover__image" />
						<h4 class="cover__title">
							{{ eventHost?.data.attributes.commercialName }}
						</h4>
						<div class="cover__desc">
							{{ eventHost?.data.attributes.orgResume }}
						</div>
					</div>
				</template>
			</cp-section>
			<cp-section v-if="events.length" :header="$t('Calendario de eventos')">
				<template #section-content>
					<div class="host__calendar">
						<date-card-carousel />
						<city-drop-down
							@change:filter-cities="(value: string[]) => changeFilters(value, 'city')"
						/>
						<event-category-drop-down
							@change:filter-event-cats="(value: string[]) => changeFilters(value, 'eventCategory')"
						/>
						<event-carousel id="organizer-events-carousel" :event-data="events" />
					</div>
				</template>
			</cp-section>
			<cp-media-carousel
				id="qwe123"
				:media-files-urls="getMediaPhotosUrls"
				:video-files-urls="getMediaVideosUrls"
			/>

			<div v-if="eventHost?.data?.attributes?.compVideoLink">
				<iframe :src="eventHost?.data?.attributes?.compVideoLink" class="host__video"/>
			</div>

			<cp-section v-if="eventHost?.data?.attributes" class="host__contacts">
				<template #section-content>
					<contact-block :contact="formattedContact(eventHost.data.attributes)">
						<template #description>
							<h3>{{ $t('Contactos del organizador') }}</h3>
							<span>{{ $t('Siempre puedes contactarnos usando estos contactos') }}</span>
						</template>
					</contact-block>
				</template>
			</cp-section>

			<div class="host__map">
				<cp-map :map-markers="testMarkers" :center="testMapCenter" />
			</div>
		</template>
	</cp-base-page>
</template>

<script setup lang="ts">
import {
	CollectionTypes,
	type EventHost,
	type CollectionFilters,
	type StrapiMediaDefaultType,
} from '@shared/api/types';
import type { EventCard } from '@widgets/event-card/types/types';
import { requestEventsHost, requestEventsList } from '@shared/api';
import { useRuntimeConfig } from 'nuxt/app';
import { toast } from 'vue3-toastify';
import CityDropDown from '@features/city-filter/CityDropDown.vue';
import EventCategoryDropDown from '@features/event-category-filter/EventCategoryDropDown.vue';
import { startOfDay, endOfDay } from 'date-fns';
import CpBasePage from '@shared/gui/CpBasePage.vue';
import CpSection from '@shared/gui/CpSection.vue';
import ContactBlock from '@features/contacts/ContactBlock.vue';

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
			commercialName: { $eq: eventHost.value?.data.attributes.commercialName },
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

const formattedContact = (host: EventHost['data']['attributes']) => {
	let result = {
		mail: '',
		tel: '',
		place: '',
		socialMedia: [],
	};
	if (host) {
		result = {
			mail: host.contacts?.mail,
			tel: host.contacts?.tel,
			place: host.contacts?.place,
			socialMedia: host.socialMedias,
		};
	}

	return result;
};

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
	let everyPossibleVideoOfEventHost: StrapiMediaDefaultType[] = [];
	if (eventHostData) {
		if (
			eventHostData.videoBusinessCard.data &&
			eventHostData.compVideoFile.data
		) {
			everyPossibleVideoOfEventHost = [
				...eventHostData.videoBusinessCard.data,
				...eventHostData.compVideoFile.data,
			];
		} else if (eventHostData.compVideoFile.data) {
			everyPossibleVideoOfEventHost = [...eventHostData.compVideoFile.data];
		} else if (eventHostData.videoBusinessCard.data) {
			everyPossibleVideoOfEventHost = [...eventHostData.videoBusinessCard.data];
		}

		if (!everyPossibleVideoOfEventHost.length) {
			return [];
		}

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
.host {
	.cover {
		display: grid;
		gap: 10px;
		color: $gray;
		grid-template-areas: 
		"b"
		"d"
		"a"
		"c"
		;

		&__title {
			color: $black;
			grid-area: a;
			align-self: flex-end;
		}

		&__subtitle {
			text-transform: uppercase;
			letter-spacing: 0.5px;
			grid-area: b;
		}

		&__desc {
			grid-area: c;
		}

		&__image {
			width: 100%;
			height: 160px;
			background: $gray;
			border-radius: 10px;
			margin-bottom: 10px;
			grid-area: d;
			object-fit: cover;
			background-size: cover;
		}

		@media #{$screen-tablet} {
			grid-template-areas: 
			"b d d"
			"b d d"
			"b d d"
			"a d d"
			"c d d"
			;
			column-gap: 20px;

			&__image {
				min-height: 350px;
				min-width: 450px;
				border-radius: 30px;
			}
		}
	}

	&__video {
		width: 100%;
		border: none;
		border-radius: 16px;
		min-height: 300px;
		margin-bottom: 30px;

		@media #{$screen-tablet} {
			min-height: 600px;
			margin-bottom: 50px;
		}
	}

	&__map {
		width: 100%;
		height: 300px;
	}
}
</style>
