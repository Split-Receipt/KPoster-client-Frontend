<template>
	<cp-base-page :header="$t('news')">
		<template #content>
			<div v-if="news.length > 0" class="news-page__content">
				<cp-news-card v-for="item in news" :key="item.id" :item="item"/>
			</div>
		</template>
	</cp-base-page>
</template>

<script setup lang="ts">
import CpNewsCard from '@entities/CpNewsCard/CpNewsCard.vue';
import CpBasePage from '@shared/gui/CpBasePage.vue';
import { requestPlatformNews } from '@shared/api';
import type { NewsOne } from '@shared/api/types';

const news = ref<NewsOne[]>([]);

const getNews = async () => {
	try {
		const { data } = await requestPlatformNews();

		news.value = data.data;
	} catch (e) {
		console.error(e);
	}
};

onBeforeMount(() => {
	getNews();
});
</script>

<style lang="scss" scoped>
.news-page {
	&__title {
		margin-bottom: 25px;

		@media #{$screen-tablet} {
			margin-bottom: 50px;
		}
	}
	&__content {
		display: grid;
		column-gap: 20px;
		row-gap: 20px;
		grid-template-columns: 1fr;

		@media #{$screen-desktop} {
			grid-template-columns: 1fr 1fr;
		}
	}
}
</style>
