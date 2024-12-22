<template>
	<div class="detailed">
		<cp-spinner :is-spinned="isSpin" />
		<div class="detailed__mainTitle">
			<h2>{{ event.attributes.eventName }}</h2>
		</div>
		<div ref="mainImage" class="detailed__mainImage">
			<div class="detailed__mainImage-info">
				<span class="detailed__mainImage-info-title">{{
					event.attributes.eventName
				}}</span>
				<span
					v-for="categoryName in eventCategoriesNames"
					:key="categoryName"
					class="detailed__mainImage-info-text"
				>
					{{ categoryName }}</span
				>
				<span class="detailed__mainImage-info-date">{{
					getEventDateRange
				}}</span>
			</div>
			<span class="detailed__mainImage-info-button">
				<cp-button
					v-if="event.attributes.linkToBuyTicket"
					text="Horarios y entradas"
					size="medium"
					:islink="true"
					:link-to="formatExternalLink(event.attributes.linkToBuyTicket)"
				/>
			</span>
		</div>

		<div class="detailed__EventCard">
			<h2 class="detailed__EventCard-title">Información del evento</h2>
			<div class="detailed__EventCard-text">
				<span>
					{{ event.attributes.eventHost.data.attributes.commercialName }}
					<p>
						<cp-markdown-viewer
							:markdown-text="event.attributes.eventDescription"
						/>
					</p>
				</span>
			</div>
		</div>

		<div v-if="eventSocialMedias.length" class="detailed__socialMedias">
			<span class="detailed__socialMedias-title">redes sociales:</span>
			<div class="detailed__socialMedias-links">
				<cp-social-link
					v-for="value in eventSocialMedias"
					:key="value.socialMediaName"
					:social-media-link="value.socialMediaLink"
					:social-media-name="value.socialMediaName"
				/>
			</div>
		</div>

		<div v-if="getEventCoordinates.center" class="detailed__map">
			<h2 class="detailed__map-title">Dirección del evento</h2>
			<cp-map
				:map-markers="getEventCoordinates.marker"
				:center="getEventCoordinates.center"
			/>
		</div>

		<div
			v-if="
				event.attributes.eventDigitalCatalog || event.attributes.eventWebSite
			"
		>
			<h2 class="detailed__map-title">Relacionados</h2>
			<div class="detailed__relatedList">
				<cp-huge-link-btn
					v-if="event.attributes.eventDigitalCatalog"
					class="detailed__relatedList-item"
					huge-title="Tu catalogo digital"
					:huge-link="formatExternalLink(event.attributes.eventDigitalCatalog)"
				/>
				<cp-huge-link-btn
					v-if="event.attributes.eventWebSite"
					class="detailed__relatedList-item"
					huge-title="Pagina web"
					:huge-link="formatExternalLink(event.attributes.eventWebSite)"
				/>
			</div>
		</div>

		<div
			v-if="getMediaPhotosUrls.length || getMediaVideosUrls.length"
			class="detailed__carousel slider-gallery"
		>
			<h2 class="detailed__carousel-title-gallery">Event gallery</h2>
			<cp-media-carousel
				id="qwe123"
				:media-files-urls="getMediaPhotosUrls"
				:video-files-urls="getMediaVideosUrls"
			/>
		</div>

		<div v-if="false" class="detailed__comment">
			<h2 class="detailed__comment-title">¿ Que le pareció nuestro evento?</h2>
			<div class="detailed__comment-textArea">
				<cp-text-area
					text-area-id="detailed-event-comments"
					text-area-placeholder="Deja tus comentarios"
				/>
				<span class="detailed__comment-textArea-submit">
					<cp-button text="Enviar" size="small" />
				</span>
			</div>

			<div class="detailed__comment__block">
				<span class="detailed__comment__block-title">
					<h3>Comentarios</h3>
					<cp-button size="small" text="Eso es todo&nbsp;&gt;" />
				</span>
				<span class="detailed__comment__block-buttons">
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

			<div class="detailed__comment__list">
				<div class="detailed__comment__list-item">
					<span class="detailed__comment__list-item-avatar" />
					<span class="detailed__comment__list-item-info">
						<p class="detailed__comment__list-item-info-name">Usuario afshi</p>
						<p class="detailed__comment__list-item-info-comment">
							me gustó todo el evento
						</p>
					</span>
					<span class="detailed__comment__list-item-date"> 12.07.2024 </span>
				</div>

				<div class="detailed__comment__list-item">
					<span class="detailed__comment__list-item-avatar" />
					<span class="detailed__comment__list-item-info">
						<p class="detailed__comment__list-item-info-name">Usuario afshi</p>
						<p class="detailed__comment__list-item-info-comment">
							me gustó todo el evento
						</p>
					</span>
					<span class="detailed__comment__list-item-date"> 12.07.2024 </span>
				</div>

				<div class="detailed__comment__list-item">
					<span class="detailed__comment__list-item-avatar" />
					<span class="detailed__comment__list-item-info">
						<p class="detailed__comment__list-item-info-name">Usuario afshi</p>
						<p class="detailed__comment__list-item-info-comment">
							me gustó todo el evento
						</p>
					</span>
					<span class="detailed__comment__list-item-date"> 12.07.2024 </span>
				</div>
			</div>
		</div>

		<div class="detailed-contacts">
			<div class="detailed-contacts-title">
				<h3>Contactos del organizador</h3>
				<span
					v-if="event.attributes.eventHost.data.attributes.commercialName"
					style="text-decoration: underline"
				>
					<nuxt-link :to="`/event-host/${event.attributes.eventHost.data.id}`">
						{{ event.attributes.eventHost.data.attributes.commercialName }}
					</nuxt-link>
				</span>
				<span v-if="event.attributes.eventHost.data.attributes.orgResume">
					{{ event.attributes.eventHost.data.attributes.orgResume }}
				</span>
			</div>
			<div class="detailed-contacts-referenses">
				<div
					v-if="event.attributes.eventHost.data.attributes.contacts?.mail"
					class="detailed-contacts-referenses-mail"
				>
					<span class="detailed-contacts-referenses-mail-title">E-mail</span>
					<span class="detailed-contacts-referenses-mail-ref">{{
						event.attributes.eventHost.data.attributes.contacts.mail
					}}</span>
				</div>
				<div
					v-if="event.attributes.eventHost.data.attributes.contacts?.tel"
					class="detailed-contacts-referenses-tel"
				>
					<span class="detailed-contacts-referenses-tel-title">
						Número de teléfono</span
					>
					<span class="detailed-contacts-referenses-tel-ref">{{
						event.attributes.eventHost.data.attributes.contacts.tel
					}}</span>
				</div>
				<div
					v-if="event.attributes.eventHost.data.attributes.contacts?.place"
					class="detailed-contacts-referenses-place"
				>
					<span class="detailed-contacts-referenses-place-title">
						País y ciudad</span
					>
					<span class="detailed-contacts-referenses-place-ref">{{
						event.attributes.eventHost.data.attributes.contacts.place
					}}</span>
				</div>
				<div
					v-if="event.attributes.eventHost.data.attributes.socialMedias"
					class="detailed-contacts-referenses-socials"
				>
					<cp-social-link
						v-for="value in event.attributes.eventHost.data.attributes
							.socialMedias"
						:key="value.socialMediaName"
						:social-media-link="value.socialMediaLink"
						:social-media-name="value.socialMediaName"
					/>
				</div>
			</div>
		</div>

		<event-detail-rec class="slider-recommended" />
	</div>
</template>

<script setup lang="ts">
import CpSocialLink from '@shared/gui/CpSocialLink.vue';
import CpHugeLinkBtn from '@shared/gui/CpHugeLinkBtn.vue';
import CpMap from '@shared/gui/CpMap.vue';
import CpButton from '@shared/gui/CpButton.vue';
import CpMarkdownViewer from '@shared/gui/CpMardownViewer/CpMarkdownViewer.vue';
import { requestEventById } from '@shared/api';
import { EventDefaultValue } from '@shared/default-values/events';
import { formatExternalLink } from '@shared/helpers/formatText';
import { format, isEqual } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { useRuntimeConfig } from 'nuxt/app';
import EventDetailRec from '@widgets/recommendations/EventDetailRec.vue';
import CpMediaCarousel from '@shared/gui/CpMediaCarousel.vue';
import type { EventData } from '@shared/api/types';

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
		'dd.MM.yyyy HH:mm'
	);
};

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
/** Требуется: почистить стили, переименовать классы*/
.detailed {
	padding: 0 20px;
	@media #{$screen-tablet} {
		margin-top: 10px;
		color: #888888;
	}

	@media #{$screen-desktop} {
		margin-top: 33px;
		color: #888888;
	}

	&__mainTitle {
		width: 100%;
		text-align: center;
		color: $black;

		h2 {
			font-family: 'Poppins-Medium';
			font-style: normal;
			font-size: 22px;
			font-weight: 500;
			line-height: normal;

			@media #{$screen-tablet} {
				font-size: 42px;
			}
		}
	}

	&__socialMedias {
		position: relative;

		@media screen and (max-width: 900px) {
			margin-top: 70px;
		}

		&-title {
			position: absolute;
			right: 150px;
			top: -45px;
			font-size: 22px;
			line-height: 35.2px;
			font-weight: 400;
			color: $gray;

			@media screen and (max-width: 1280px) {
				font-size: 16px;
				right: 190px;
			}

			@media screen and (max-width: 900px) {
				justify-content: flex-start;
				left: 0;
			}
		}

		&-links {
			display: flex;
			justify-content: flex-end;
			margin-top: 14px;
			gap: 20px;

			@media screen and (max-width: 900px) {
				justify-content: flex-start;
			}

			&-item {
				margin-right: 30px;
			}
		}
	}

	&__relatedList {
		display: flex;
		flex-wrap: wrap;

		&-item {
			margin: 0 19px 19px 0;
		}
	}

	&__EventCard {
		margin-top: 20px;

		&-title {
			font-size: 70px;
			font-weight: 500;
			color: #353333;
			font-family: 'Poppins-Medium';

			@media screen and (max-width: 1280px) {
				font-size: 66px;
			}

			@media screen and (max-width: 768px) {
				font-size: 32px;
			}

			@media screen and (max-width: 375px) {
				font-size: 24px;
			}
		}

		&-text {
			margin-top: 30px;

			span {
				font-size: 34px;
				line-height: 42px;
				font-weight: 500;
				color: #353333;

				@media screen and (max-width: 1280px) {
					font-size: 24px;
				}

				p {
					font-size: 22px;
					line-height: 35.2px;
					font-weight: 400;
					color: #888888;
					margin-top: 15px;
					max-width: 70%;

					@media screen and (max-width: 1280px) {
						font-size: 16px;
					}
				}
			}
		}
	}

	&__mainImage {
		margin-top: 22px;
		position: relative;
		width: 100%;
		height: 30vw;
		border-radius: 40px;
		background-image: url('../../public/images/detailBg.png');
		background-repeat: no-repeat;
		background-size: cover;
		box-shadow: inset 500px 0 150px -50px rgba(18, 18, 18, 0.5);

		@media #{$screen-tablet} {
			margin-top: 30px;
		}

		@media screen and (max-width: 700px) {
			height: 40vw;
		}

		@media screen and (max-width: 620px) {
			height: 50vw;
			box-shadow: inset 200px 0 150px -50px rgba(18, 18, 18, 0.5);
		}

		@media screen and (max-width: 515px) {
			height: 60vw;
		}

		&-info {
			position: absolute;
			display: flex;
			flex-direction: column;
			width: 60%;
			height: auto;
			bottom: 70px;
			left: 40px;

			@media screen and (max-width: 955px) {
				top: 20px;
				left: 20px;
			}

			@media screen and (max-width: 475px) {
				top: 20px;
				left: 20px;
				width: 100%;
			}

			&-title {
				display: block;
				font-size: 44px;
				line-height: normal;
				font-weight: 500;
				color: #f6f6f6;

				@media screen and (max-width: 1280px) {
					font-size: 34px;
				}

				@media screen and (max-width: 475px) {
					font-size: 24px;
				}
			}

			&-text {
				display: block;
				font-size: 22px;
				line-height: 160%;
				font-weight: 500;
				color: #f6f6f6;
				margin-top: 10px;

				@media screen and (max-width: 1280px) {
					font-size: 16px;
				}

				@media screen and (max-width: 475px) {
					font-size: 13px;
				}
			}

			&-date {
				display: block;
				font-size: 22px;
				line-height: 35.2px;
				font-weight: 400;
				color: #f6f6f6;
				margin-top: 40px;
				margin-bottom: 70px;

				@media screen and (max-width: 1280px) {
					font-size: 16px;
					margin-top: 20px;
					margin-bottom: 50px;
				}

				@media screen and (max-width: 955px) {
					margin-bottom: 0px;
				}

				@media screen and (max-width: 475px) {
					font-size: 13px;
				}

				@media screen and (max-width: 380px) {
					margin-top: 10px;
				}
			}

			&-button {
				width: 400px;
				position: absolute;
				bottom: 40px;

				@media screen and (min-width: 955px) {
					left: 40px;
				}

				@media screen and (max-width: 955px) {
					right: 20px;
					bottom: 20px;
				}

				@media screen and (max-width: 545px) {
					width: auto;
					left: 15px;
					right: 15px;
				}
			}
		}
	}

	&__map {
		width: calc(100% + 40px);
		height: 30vh;
		margin-bottom: calc(120px + 4.5em);
		margin-left: -20px;

		@media screen and (max-width: 768px) {
			height: 40vh;
		}

		@media screen and (max-width: 520px) {
			height: 50vh;
		}

		&-title {
			margin-top: 20px;
			margin-left: 5vw;
			margin-bottom: 40px;
			font-size: 60px;
			line-height: 84px;
			font-weight: 500;
			color: #353333;
			font-family: 'Poppins-Medium';

			@media screen and (max-width: 1280px) {
				font-size: 56px;
			}

			@media screen and (max-width: 768px) {
				font-size: 32px;
				margin-bottom: 30px;
			}

			@media screen and (max-width: 360px) {
				font-size: 24px;
				margin-bottom: 24px;
			}
		}
	}

	&__comment {
		&-title {
			margin: 130px 0 45px 0;
			display: block;
			font-size: 60px;
			line-height: 84px;
			font-weight: 500;
			color: #353333;
			font-family: 'Poppins-Medium';

			@media screen and (max-width: 1280px) {
				font-size: 56px;
			}

			@media screen and (max-width: 786px) {
				font-size: 32px;
			}

			@media screen and (max-width: 375px) {
				font-size: 24px;
			}
		}

		&-textArea {
			&-submit {
				margin-top: 20px;
				display: flex;
				align-items: center;
				justify-content: end;
			}
		}

		&__block {
			width: 100%;
			margin-top: 85px;
			margin-bottom: 60px;

			&-title {
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: space-between;

				@media screen and (max-width: 680px) {
					flex-direction: column;
					justify-content: flex-start;
					align-items: flex-start;
				}

				h3 {
					display: block;
					font-size: 60px;
					line-height: 84px;
					font-weight: 500;
					color: #353333;

					@media screen and (max-width: 1280px) {
						font-size: 56px;
					}

					@media screen and (max-width: 680px) {
						font-size: 24px;
					}
				}
			}

			&-buttons {
				width: 100%;
				margin-top: 40px;
				display: flex;
				align-items: center;
				justify-content: flex-start;

				@media screen and (max-width: 515px) {
					flex-direction: column;
					align-items: flex-start;
				}

				span {
					display: flex;
					margin-left: 80px;

					@media screen and (max-width: 550px) {
						margin-left: 25px;
					}

					@media screen and (max-width: 515px) {
						margin: 30px 0 0 0;
					}

					@media screen and (max-width: 370px) {
						flex-direction: column;
					}

					.sort-button {
						margin-right: 25px;

						&:last-child {
							@media screen and (max-width: 370px) {
								margin-top: 15px;
							}
						}
					}
				}
			}
		}

		&__list {
			width: 100%;
			height: 500px;
			margin-bottom: 125px;
			display: flex;
			flex-direction: column;

			&-item {
				padding: 15px;
				margin-bottom: 45px;
				width: 100%;
				display: flex;
				align-items: center;
				position: relative;

				&-avatar {
					width: 125px;
					height: 125px;
					left: 0;
					top: 10px;
					position: absolute;
					padding: 22px;
					overflow: hidden;
					border-radius: 50%;
					background-color: #f6f6f6;
					background-image: url('../../public/images/user.svg');
					background-repeat: no-repeat;
					background-position: center;
					background-size: 95px;

					@media screen and (max-width: 1280px) {
						width: 97px;
						height: 97px;
						background-size: 80px;
					}

					@media screen and (max-width: 1280px) {
						width: 97px;
						height: 97px;
					}
				}

				&-info {
					height: 100%;
					margin-left: 147px;
					display: flex;
					flex-direction: column;

					@media screen and (max-width: 1280px) {
						margin-left: 100px;
					}

					&-name {
						display: block;
						font-size: 30px;
						line-height: 42px;
						font-weight: 500;
						color: #000000;

						@media screen and (max-width: 1280px) {
							font-size: 24px;
						}

						@media screen and (max-width: 768px) {
							font-size: 22px;
						}
					}

					&-comment {
						display: block;
						width: 100%;
						margin-top: 30px;
						font-size: 22px;
						line-height: 35.2px;
						font-weight: 500;
						color: #888888;

						@media screen and (max-width: 1280px) {
							font-size: 16px;
						}

						@media screen and (max-width: 768px) {
							font-size: 12px;
						}
					}
				}

				&-date {
					position: absolute;
					right: 10px;
					top: 15px;
					font-size: 22px;

					@media screen and (max-width: 1280px) {
						font-size: 16px;
					}

					@media screen and (max-width: 768px) {
						font-size: 12px;
					}

					@media screen and (max-width: 375px) {
						font-size: 12px;
						right: -10px;
						top: 0;
					}
				}
			}
		}
	}

	&__carousel {
		position: relative;
		margin-top: 80px;

		@media #{$screen-tablet} {
			position: relative;
			bottom: 20px;
		}

		@media #{$screen-desktop} {
			bottom: 30px;
		}

		&-title {
			&-gallery {
				display: block;
				width: 75%;
				position: absolute;
				top: -40px;
				font-size: 60px;
				line-height: 84px;
				font-weight: 500;
				color: #353333;
				font-family: 'Poppins-Medium';

				@media screen and (max-width: 1280px) {
					font-size: 56px;
				}

				@media screen and (max-width: 768px) {
					width: 100%;
					font-size: 32px;
				}

				@media screen and (max-width: 768px) {
					width: 100%;
					font-size: 32px;
					top: -90px;
				}

				@media screen and (max-width: 360px) {
					width: 100%;
					font-size: 24px;
				}
			}

			&-recommended {
				margin-top: 15px;
				display: block;
				width: 75%;
				position: absolute;
				top: -40px;
				font-size: 60px;
				line-height: 84px;
				font-weight: 500;
				color: #353333;
				font-family: 'Poppins-Medium';

				@media screen and (max-width: 1280px) {
					font-size: 56px;
				}

				@media screen and (max-width: 1230px) {
					top: -110px;
					width: 70%;
				}

				@media screen and (max-width: 768px) {
					width: 100%;
					font-size: 32px;
				}

				@media screen and (max-width: 360px) {
					width: 100%;
					font-size: 24px;
				}
			}

			&-closest {
				display: block;
				width: 75%;
				position: absolute;
				top: -40px;
				font-size: 60px;
				line-height: 84px;
				font-weight: 500;
				color: #353333;
				font-family: 'Poppins-Medium';

				@media screen and (max-width: 1280px) {
					font-size: 56px;
				}

				@media screen and (max-width: 768px) {
					width: 100%;
					font-size: 32px;
					top: -95px;
				}

				@media screen and (max-width: 360px) {
					width: 100%;
					font-size: 24px;
				}
			}
		}

		&-recommended {
			position: relative;
			margin-top: 165px;
			border-bottom: 1px solid lightgray;
			padding-bottom: 70px;

			@media #{$screen-tablet} {
				position: relative;
				bottom: 20px;
			}

			@media #{$screen-desktop} {
				bottom: 30px;
			}
		}

		&-closest {
			position: relative;
			margin: 70px 0 30px 0;
			border-bottom: 1px solid lightgray;
			padding-bottom: 70px;

			@media #{$screen-tablet} {
				position: relative;
				bottom: 20px;
			}

			@media #{$screen-desktop} {
				bottom: 30px;
			}

			@media screen and (max-width: 768px) {
				margin-top: 100px;
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

			@media screen and (max-width: 1280px) {
				font-size: 56px;
			}

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
}

.slider {
	&-gallery {
		margin-top: 260px;
	}
}
</style>
