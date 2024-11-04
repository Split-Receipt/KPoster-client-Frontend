<template>
	<div class="detailed">
		<div class="detailed__socialMedias">
			<span class="detailed__socialMedias-title">Social media:</span>
			<div v-if="eventSocialMedias.length" class="detailed__socialMedias-links">
				<cp-social-link
					v-for="value in eventSocialMedias"
					:key="value.socialMediaName"
					class="detailed__socialMedias-links-item"
					:social-media-name="value.socialMediaName"
					:social-media-link="value.socialMediaLink"
				/>
			</div>
		</div>

		<div class="detailed__relatedList">
			<cp-huge-link-btn
				v-if="event.attributes.eventDigitalCatalog"
				class="detailed__relatedList-item"
				huge-title="Tu catalogo digital"
				:huge-link="formatExternalLink(event.attributes.eventDigitalCatalog)"
			/>
			<!-- <cp-huge-link-btn
				class="detailed__relatedList-item"
				huge-title="Crea tu propio catalogo digital"
				huge-link="https://www.youtube.com/watch?v=zw79RVnlCb0"
			/> -->
			<cp-huge-link-btn
				v-if="event.attributes.eventWebSite"
				class="detailed__relatedList-item"
				huge-title="Pagina web"
				:huge-link="formatExternalLink(event.attributes.eventWebSite)"
			/>
		</div>

		<div class="detailed__EventCard">
			<h2 class="detailed__EventCard-title">
				{{ event.attributes.eventName }}
			</h2>
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

		<div ref="mainImage" class="detailed__mainImage">
			<div class="detailed__mainImage-info">
				<span class="detailed__mainImage-info-title">{{
					event.attributes.eventName
				}}</span>
				<span
					v-for="categoryName in eventCategoriesNames"
					:key="categoryName"
					class="detailed__mainImage-info-text"
				>{{ categoryName }}</span
				>
				<span class="detailed__mainImage-info-date">{{
					format(event.attributes.eventDate, 'PPPPpppp')
				}}</span>
				<span class="detailed__mainImage-info-button">
					<cp-button
						color="yellowGrey"
						shape="oval"
						text="Horarios y entradas"
						width="maxWidth"
						size="middle"
						:islink="true"
						:link-to="formatExternalLink(event.attributes.linkToBuyTicket)"
					/>
				</span>
			</div>
		</div>

		<div v-if="getEventCoordinates.center" class="detailed__map">
			<h2 class="detailed__map-title">Dirección del evento</h2>
			<cp-map
				:map-markers="getEventCoordinates.marker"
				:center="getEventCoordinates.center"
			/>
		</div>

		<div class="detailed__comment">
			<h2 class="detailed__comment-title">¿ Que le pareció nuestro evento?</h2>
			<div class="detailed__comment-textArea">
				<cp-text-area
					text-area-id="detailed-event-comments"
					text-area-placeholder="Deja tus comentarios"
				/>
				<span class="detailed__comment-textArea-submit">
					<cp-button
						shape="oval"
						color="yellowGrey"
						text="Enviar"
						size="small"
						width="extraLarge"
					/>
				</span>
			</div>

			<div class="detailed__comment__block">
				<span class="detailed__comment__block-title">
					<h3>Comentarios</h3>
					<cp-button
						shape="oval"
						size="small"
						color="transparent"
						text="Eso es todo"
						width="large"
					/>
				</span>
				<span class="detailed__comment__block-buttons">
					<cp-button
						shape="circle"
						color="transparent"
						text=""
						with-image="../public/images/sort.svg"
					/>
					<span>
						<cp-button
							class="sort-button"
							shape="oval"
							size="small"
							color="transparent"
							text="Positivos"
						/>
						<cp-button
							class="sort-button"
							shape="oval"
							size="small"
							color="transparent"
							text="Negativos"
						/>
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
		<event-detail-rec />

		<!-- <div class="detailed__carousel slider-recomended">
			<h2 class="detailed__carousel-title-recomended">
				Recomendaciones para usted
			</h2> -->
		<!-- <event-carousel
				id="detailed-carousel"
				:event-data="sectionData[0].eventData"
			/> -->
		<!-- </div> -->

		<!-- <div class="detailed__carousel slider-closestPlaces">
			<h2 class="detailed__carousel-title-closestPlaces">Lugares cercanos</h2> -->
		<!-- <event-carousel
				id="detailed-carousel"
				:event-data="sectionData[0].eventData"
			/> -->
		<!-- </div> -->
	</div>
</template>

<script setup lang="ts">
import CpSocialLink from '@shared/gui/CpSocialLink.vue';
import CpHugeLinkBtn from '@shared/gui/CpHugeLinkBtn.vue';
import CpMap from '@shared/gui/CpMap.vue';
import CpButton from '@shared/gui/CpButton.vue';
import CpMarkdownViewer from '@shared/gui/CpMarkdownViewer.vue';
import { requestEventById } from '@shared/api';
import type { Event } from '@shared/api/types';
import { EventDefaultValue } from '@shared/default-values/events';
import { formatExternalLink } from '@shared/helpers/formatText';
import { format } from 'date-fns';
import { useRuntimeConfig } from 'nuxt/app';
import EventDetailRec from '@widgets/recommendations/EventDetailRec.vue';

const route = useRoute();
const id = route.params.id as string;

const config = useRuntimeConfig();

const event = ref<Event>(EventDefaultValue);
const mainImage = ref<HTMLElement>();

onBeforeMount(async () => {
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
		event.value.attributes.eventBanner.data ??
		event.value.attributes.eventMediaPhotos.data[0].attributes.url;
	if (mainImage.value) {
		mainImage.value.style.backgroundImage = `url(${
			config.public.apiBaseUrl + imageSource
		})`;
	}
};

const getEventById = async (id: string) => {
	try {
		const response = await requestEventById(id);
		event.value = response.data.data;
	} catch (error) {
		console.error(error);
	}
};

const getEventCoordinates = computed(() => {
	if (!event.value.attributes.eventAddress.eventCoordinates) {
		return {};
	}

	return {
		marker: [
			{ coordinates: event.value.attributes.eventAddress.eventCoordinates },
		],
		center: event.value.attributes.eventAddress.eventCoordinates,
	};
});

const eventSocialMedias = computed(() => {
	if (!event.value.attributes?.socialMedias?.length) {
		return [];
	}

	return event.value.attributes.socialMedias;
});

const eventCategoriesNames = computed(() => {
	if (!event.value.attributes.eventCategory.data.length) {
		return [];
	}

	return event.value.attributes.eventCategory.data.map((category) => {
		return category.attributes.eventCategoryName;
	});
});
</script>

<style scoped lang="scss">
.detailed {
	@media #{$screen-tablet} {
		margin-top: 10px;
	}

	@media #{$screen-desktop} {
		padding: 0 5%;
		margin-top: 33px;
		color: #888888;
	}

	&__socialMedias {
		&-title {
			font-size: 22px;
			line-height: 35.2px;
			font-weight: 400;
		}

		&-links {
			display: flex;
			margin-top: 14px;

			&-item {
				margin-right: 30px;
			}
		}
	}

	&__relatedList {
		display: flex;
		margin-top: 56px;

		&-item {
			margin-right: 19px;
		}
	}

	&__EventCard {
		margin-top: 100px;

		&-title {
			font-size: 70px;
			line-height: 98px;
			font-weight: 500;
			color: #353333;
		}

		&-text {
			margin-top: 30px;

			span {
				font-size: 30px;
				line-height: 42px;
				font-weight: 500px;
				color: #353333;

				p {
					font-size: 22px;
					line-height: 35.2px;
					font-weight: 400;
					color: #888888;
					margin-top: 15px;
					max-width: 70%;
				}
			}
		}
	}

	&__mainImage {
		margin-top: 80px;
		position: relative;
		width: 100%;
		height: 30vw;
		border-radius: 40px;
		background-image: url('../../public/images/detailBg.png');
		background-repeat: no-repeat;
		background-size: cover;

		&-info {
			position: absolute;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			width: 60%;
			height: calc(85% - 40px);
			bottom: 40px;
			left: 40px;

			&-title {
				display: block;
				margin-top: 45px;
				font-size: 44px;
				line-height: 61.6px;
				font-weight: 500;
				color: #f6f6f6;
			}

			&-text {
				display: block;
				font-size: 30px;
				line-height: 42px;
				font-weight: 500;
				color: #f6f6f6;
				margin-top: -15px;
			}

			&-date {
				display: block;
				font-size: 22px;
				line-height: 35.2px;
				font-weight: 400;
				color: #f6f6f6;
				margin-top: 20px;
				margin-bottom: 25px;
			}

			&-button {
				width: 60%;
			}
		}
	}

	&__map {
		width: calc(100vw - 1.12%);
		height: 30vw;
		margin-bottom: calc(120px + 4.5em);
		margin-left: -5vw;

		&-title {
			margin-top: 100px;
			margin-left: 5vw;
			margin-bottom: 40px;
			font-size: 60px;
			line-height: 84px;
			font-weight: 500;
			color: #353333;
		}
	}

	&__comment {
		&-title {
			margin-bottom: 45px;
			display: block;
			font-size: 60px;
			line-height: 84px;
			font-weight: 500;
			color: #353333;
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

				h3 {
					display: block;
					font-size: 60px;
					line-height: 84px;
					font-weight: 500;
					color: #353333;
				}
			}

			&-buttons {
				width: 100%;
				margin-top: 40px;
				display: flex;
				align-items: center;
				justify-content: flex-start;

				span {
					display: flex;
					margin-left: 80px;

					.sort-button {
						margin-right: 25px;
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
				}

				&-info {
					height: 100%;
					margin-left: 147px;
					display: flex;
					flex-direction: column;

					&-name {
						display: block;
						font-size: 30px;
						line-height: 42px;
						font-weight: 500;
						color: #000000;
					}

					&-comment {
						display: block;
						width: 100%;
						margin-top: 30px;
						font-size: 22px;
						line-height: 35.2px;
						font-weight: 500;
						color: #888888;
					}
				}

				&-date {
					position: absolute;
					right: 10px;
					top: 15px;
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
			&-recomended {
				display: block;
				width: 75%;
				position: absolute;
				top: -125px;
				font-size: 60px;
				line-height: 84px;
				font-weight: 500;
				color: #353333;
			}

			&-closestPlaces {
				display: block;
				width: 75%;
				position: absolute;
				top: -40px;
				font-size: 60px;
				line-height: 84px;
				font-weight: 500;
				color: #353333;
			}
		}
	}
}

.slider {
	&-recomended {
		margin-top: 260px;
	}

	&-closestPlaces {
		margin-top: 160px;
	}
}
</style>
