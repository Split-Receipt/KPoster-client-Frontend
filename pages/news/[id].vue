<template>
	<cp-base-page :header="newsData?.attributes.title ?? 'Noticia'" class="news-detail-page">
		<template #content>
			<nuxt-img
				v-if="newsData?.attributes.newsMainBanner?.data"
				class="news-detail-page__img"
				:src="getMediaUrl"
			/>
			<cp-markdown-viewer :markdown-text="newsData?.attributes.newsText ?? ''" />
		</template>
	</cp-base-page>
</template>

<script setup lang="ts">
import { requestPlatformNewsById } from '@shared/api';
import type { NewsOne } from '@shared/api/types';
import CpMarkdownViewer from '@shared/gui/CpMarkdownViewer/CpMarkdownViewer.vue';
import CpBasePage from '@shared/gui/CpBasePage.vue';
import { useRuntimeConfig } from 'nuxt/app';

const route = useRoute();
const config = useRuntimeConfig();

const id = route.params.id as string;
const newsData = ref<NewsOne>();

onBeforeMount(() => {
	getNewsById();
});
const getNewsById = async () => {
	try {
		const { data } = await requestPlatformNewsById(Number(id));
		newsData.value = data.data;
	} catch (error) {
		console.error(error);
	}
};

const getMediaUrl = computed(() => {
	if (newsData.value?.attributes?.newsMainBanner?.data) {
		return (
			config.public.apiBaseUrl +
			newsData.value.attributes.newsMainBanner.data.attributes.url
		);
	} else {
		return '';
	}
});
</script>

<style scoped lang="scss">
.news-detail-page {
	&__img {
		border-radius: 30px;
	}
}
</style>
