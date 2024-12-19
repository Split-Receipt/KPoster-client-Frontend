<template>
	<div class="news-card">
		<nuxt-img class="news-card__img" :src="getMediaUrl" placeholder />
		<div class="news-card__content-secondary">
			<h4>{{ item.attributes.title }}</h4>
			<cp-button
				class="news-card__more-info"
				type="secondary"
				:text="$t('more_info')"
				@click="navigateTo(`/${locale}/news/${item.id}`)"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { NewsOne } from '@shared/api/types';
import { useRuntimeConfig } from 'nuxt/app';
import CpButton from '@shared/gui/CpButton.vue';
const props = defineProps<{ item: NewsOne }>();

const { locale } = useI18n();

const config = useRuntimeConfig();

const getMediaUrl = computed(() => {
	if (props.item.attributes?.newsMainBanner?.data) {
		return (
			config.public.apiBaseUrl +
			props.item.attributes.newsMainBanner.data.attributes.url
		);
	} else {
		return '../public/images/event-card_blured.jpg';
	}
});
</script>

<style scoped lang="scss">
.news-card {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding: $event-card-default-padding;
	border-radius: $event-card-default-border-radius;
	background-color: $event-card-text-background-color;
	box-shadow: $card-shadow;
	overflow: hidden;
	gap: 20px;

	&__content-secondary {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		gap: 20px;
	}

	&__img {
		position: relative;
		overflow: hidden;
		width: 100%;
		border-radius: 30px;
		height: $event-card-image-default-height;
		object-fit: cover;
	}

	&__title {
		white-space: nowrap;
		text-align: left;
	}

	@media #{$screen-tablet} {
		flex-direction: row;
		font-size: $event-card-text-font-size-big-desktop;
		line-height: $event-card-text-line-height-big-desktop;
	}
}
</style>
