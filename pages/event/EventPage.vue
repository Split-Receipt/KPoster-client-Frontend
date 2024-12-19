<template>
	<div class="">
		l
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
import { format } from 'date-fns';
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

const formatDateByTZ = (eventDate: Date) => {
	return format(
		toZonedTime(eventDate, localStorage.getItem('timezone') ?? 'America/Lima'),
		'dd.MM HH:mm'
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