<template>
	<cp-base-page class="event">
		<template #content>
			<cp-spinner :is-spinned="isSpin" />
			<div ref="mainImage" class="event__cover">
				<div class="event__cover-info">
					<div class="event__cover-text">
						{{ eventCategoriesNames.join(', ') }}
					</div>
					<h3 class="event__cover-title">
						{{ event.attributes.eventName }}
					</h3>
					<div class="event__cover-date">{{
						formatDateByTZ(new Date(event.attributes.eventDate))
					}}</div>
				</div>
				<cp-button
					v-if="event.attributes.linkToBuyTicket"
					:text="$t('Horarios y entradas')"
					size="medium"
					class="event__cover-button"
					:islink="true"
					:link-to="formatExternalLink(event.attributes.linkToBuyTicket)"
				/>
			</div>

			<div class="event__card event__section">
				<h3 class="event__section-title">{{ $t('Información del evento') }}</h3>
				<div class="event__card-text">
					<p>
						<cp-markdown-viewer
							:markdown-text="event.attributes.eventDescription"
						/>
					</p>
				</div>
			</div>

			<div v-if="eventSocialMedias.length" class="event__media event__section">
				<div class="event__media-title">{{ $t('Redes sociales:')}}</div>
				<div class="event__media-links">
					<cp-social-link
						v-for="value in eventSocialMedias"
						:key="value.socialMediaName"
						:social-media-link="value.socialMediaLink"
						:social-media-name="value.socialMediaName"
					/>
				</div>
			</div>

			<div v-if="getEventCoordinates.center" class="event__map event__section">
				<h3 class="event__section-title">{{ $t('Dirección del evento')}}</h3>
				<cp-map
					class="event__map-map"
					:map-markers="getEventCoordinates.marker"
					:center="getEventCoordinates.center"
				/>
			</div>

			<div v-if="event.attributes.eventDigitalCatalog || event.attributes.eventWebSite" class="event__section">
				<h3 class="event__section-title">{{ $t('Relacionados')}}</h3>
				<div class="event__related">
					<cp-link-btn
						v-if="event.attributes.eventDigitalCatalog"
						class="event__related-item"
						title="Tu catalogo digital"
						:link="formatExternalLink(event.attributes.eventDigitalCatalog)"
					/>
					<cp-link-btn
						v-if="event.attributes.eventWebSite"
						class="event__related-item"
						title="Pagina web"
						:link="formatExternalLink(event.attributes.eventWebSite)"
					/>
				</div>
			</div>

			<div
				v-if="getMediaPhotosUrls.length || getMediaVideosUrls.length"
				class="event__carousel slider-gallery event__section"
			>
				<h3 class="event__section-title">{{ $t('Event gallery')}}</h3>
				<cp-media-carousel
					id="qwe123"
					:media-files-urls="getMediaPhotosUrls"
					:video-files-urls="getMediaVideosUrls"
				/>
			</div>

			<div class="event__contacts event__section">
				<h3 class="event__section-title">{{ $t('Contactos del organizador')}}</h3>
				<contact-block
					:contact="formattedContact"
				>
					<template #description>
						{{ event.attributes.eventHost.data.attributes.orgResume }}
						<div
							v-if="event.attributes.eventHost.data.attributes.commercialName"
							style="text-decoration: underline"
						>
							<nuxt-link :to="`/event-host/${event.attributes.eventHost.data.id}`">
								{{ $t('Página del organizador') }}
							</nuxt-link>
						</div>
					</template>
				</contact-block>
			</div>

			<!-- <div v-if="false" class="event__comment">
				<h2 class="event__comment-title">¿ Que le pareció nuestro evento?</h2>
				<div class="event__comment-textArea">
					<cp-text-area
						text-area-id="event-event-comments"
						text-area-placeholder="Deja tus comentarios"
					/>
					<span class="event__comment-textArea-submit">
						<cp-button text="Enviar" size="small" />
					</span>
				</div>

				<div class="event__comment__block">
					<span class="event__comment__block-title">
						<h3>Comentarios</h3>
						<cp-button size="small" text="Eso es todo&nbsp;&gt;" />
					</span>
					<span class="event__comment__block-buttons">
						<cp-button
							shape="circle"
							color="transparent"
							text=""
							with-image="../public/images/sort.svg"
						/>
						<span>
							<cp-button class="sort-button" size="small" text="Positivos" />
							<cp-button class="sort-button" size="small" text="Negativos" />
						</span>
					</span>
				</div>

				<div class="event__comment__list">
					<div class="event__comment__list-item">
						<span class="event__comment__list-item-avatar" />
						<span class="event__comment__list-item-info">
							<p class="event__comment__list-item-info-name">Usuario afshi</p>
							<p class="event__comment__list-item-info-comment">
								me gustó todo el evento
							</p>
						</span>
						<span class="event__comment__list-item-date"> 12.07.2024 </span>
					</div>

					<div class="event__comment__list-item">
						<span class="event__comment__list-item-avatar" />
						<span class="event__comment__list-item-info">
							<p class="event__comment__list-item-info-name">Usuario afshi</p>
							<p class="event__comment__list-item-info-comment">
								me gustó todo el evento
							</p>
						</span>
						<span class="event__comment__list-item-date"> 12.07.2024 </span>
					</div>

					<div class="event__comment__list-item">
						<span class="event__comment__list-item-avatar" />
						<span class="event__comment__list-item-info">
							<p class="event__comment__list-item-info-name">Usuario afshi</p>
							<p class="event__comment__list-item-info-comment">
								me gustó todo el evento
							</p>
						</span>
						<span class="event__comment__list-item-date"> 12.07.2024 </span>
					</div>
				</div>
			</div> -->

			<event-detail-rec class="slider-recommended  event__section" />
			
		</template>
	</cp-base-page>
</template>

<script setup lang="ts">
import CpBasePage from '@shared/gui/CpBasePage.vue';
import CpSocialLink from '@shared/gui/CpSocialLink.vue';
import CplinkBtn from '@shared/gui/CpLinkBtn.vue';
import CpMap from '@shared/gui/CpMap.vue';
import CpButton from '@shared/gui/CpButton.vue';
import CpMarkdownViewer from '@shared/gui/CpMarkdownViewer/CpMarkdownViewer.vue';
import { requestEventById } from '@shared/api';
import { EventDefaultValue } from '@shared/default-values/events';
import { formatExternalLink } from '@shared/helpers/formatText';
import { format, isEqual } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { useRuntimeConfig } from 'nuxt/app';
import ContactBlock from '@features/contacts/ContactBlock.vue';
import EventDetailRec from '@widgets/recommendations/EventDetailRec.vue';
import CpMediaCarousel from '@shared/gui/CpMediaCarousel.vue';
import type { EventData } from '@shared/api/types';
import { get } from 'lodash';
 
const route = useRoute();
const id = route.params.id as string;

const config = useRuntimeConfig();

const event = ref<EventData>(EventDefaultValue);
const mainImage = ref<HTMLElement>();
const isSpin = ref<boolean>(true);

onMounted(async () => {
	await getEventById(id);
	changeMainImage();
});

const changeMainImage = () => {
	if (
		!event.value.attributes.eventBanner &&
		!event.value.attributes.eventMediaPhotos.data.length
	) {
		return;
	}

	const imageSource =
		event.value.attributes.eventBanner.data?.attributes.url ??
		event.value.attributes.eventMediaPhotos.data[0].attributes.url;

	if (mainImage.value) {
		mainImage.value.style.backgroundImage = `url(${
			config.public.apiBaseUrl + imageSource
		})`;
	}
};

const getEventById = async (id: string) => {
	isSpin.value = true;
	try {
		const response = await requestEventById(id);
		event.value = response.data.data;
	} catch (error) {
		console.error(error);
	} finally {
		isSpin.value = false;
	}
};

const getEventDateRange = computed(() => {
	if (
		event.value.attributes.eventEndDate &&
		event.value.attributes.eventStartDate
	) {
		const endDate = new Date(event.value.attributes.eventEndDate);
		const startDate = new Date(event.value.attributes.eventStartDate);
		if (isEqual(endDate, startDate)) {
			return formatDateByTZ(startDate);
		}

		return `${formatDateByTZ(startDate)} - ${formatDateByTZ(endDate)}`;
	}

	return '';
});

const formatDateByTZ = (eventDate: Date) => {
	return format(
		toZonedTime(eventDate, localStorage.getItem('timezone') ?? 'America/Lima'),
		'EEE do MMMM, HH:mm'
	);
};

const formattedContact = computed(() => {
	const host = event.value.attributes.eventHost.data.attributes;

	return {
		name: host.commercialName,
		tel: host.contacts?.tel,
		mail: host.contacts?.mail,
		place: host.contacts?.place,
		social_media: host.socialMedias,
	};
});

const getMediaPhotosUrls = computed(() => {
	if (!event.value.attributes.eventMediaPhotos?.data?.length) {
		return [];
	}

	return event.value.attributes.eventMediaPhotos.data.map((photo) => {
		return config.public.apiBaseUrl + photo.attributes.url;
	});
});

const getMediaVideosUrls = computed(() => {
	if (!event.value.attributes.eventMediaVideos?.data?.length) {
		return [];
	}

	return event.value.attributes.eventMediaVideos.data.map((video) => {
		return config.public.apiBaseUrl + video.attributes.url;
	});
});

const getEventCoordinates = computed(() => {
	if (!event.value.attributes.eventAddress.coordinates) {
		return {};
	}

	return {
		marker: [{ coordinates: event.value.attributes.eventAddress.coordinates }],
		center: event.value.attributes.eventAddress.coordinates,
	};
});

const eventSocialMedias = computed(() => {
	if (!event.value.attributes?.eventSocialMedias?.length) {
		return [];
	}

	return event.value.attributes.eventSocialMedias;
});

const eventCategoriesNames = computed(() => {
	if (!event.value.attributes.eventCategory?.data.length) {
		return [];
	}

	return event.value.attributes.eventCategory.data.map((category) => {
		return category.attributes.eventCategoryName;
	});
});
</script>

<style scoped lang="scss">
.event {
	&__cover {
		min-height: 280px;
		border-radius: 25px;
		color: $wild-sand;
		box-shadow: inset 2000px 0 150px -50px rgba(18, 18, 18, 0.6);
		padding: 15px;
		display: flex;
		justify-content: flex-end;
		flex-direction: column;
		margin-bottom: 40px;
		background-repeat: no-repeat;
		background-size: cover;

		@media #{$screen-tablet} {
			padding: 25px;
			min-height: 380px;
		}

		@media #{$screen-desktop} {
			padding: 40px;
		}
	}

	&__cover-button {
		:deep(.button--medium) {
			font-size: 18px;
		}

		width: 255px;

		@media #{$screen-tablet} {
			width: 330px;
		}

		@media #{$screen-desktop} {
			width: 465px;
		}
	}

	&__cover-date {
		margin: 25px 0 15px;
		@media #{$screen-tablet} {
			margin: 40px 0 25px;
		}
	}

	&__section {
		margin-bottom: 30px;
		@media #{$screen-tablet} {
			margin-bottom: 50px;
		}
	}

	&__section-title {
		margin-bottom: 10px;
		@media #{$screen-tablet} {
			margin-bottom: 20px;
		}
	}

	&__media {
		position: relative;
		display: flex;
		flex-direction: column;
		text-align: left;

		&-title {
			color: $gray;
		}

		&-links {
			display: flex;
			margin-top: 10px;
			gap: 10px;
		}
	}

	&__related {
		display: flex;
		gap: 20px;
		flex-wrap: nowrap;

		@media screen and (max-width: 600px) {
			gap: 10px;
			flex-wrap: wrap;
			:deep(.link) {
			width: 100%;
		}
		}
	}

	&__map {
		width: 100%;
		height: 30vh;
		margin-bottom: calc(50px + 4.5em);

		@media screen and (max-width: 768px) {
			height: 40vh;
			margin-bottom: calc(30px + 4.5em);
		}

		&-map {
			:deep(.leaflet-container){
				border-radius: 16px;
			}
		}
	}
}
</style>
