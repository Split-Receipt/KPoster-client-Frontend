<template>
	<div class="event-host-card">
		<nuxt-img class="event-host-card__img" :src="getMediaUrl" placeholder />
		<div class="event-host-card__content-secondary">
			<h4>{{ item.attributes.commercialName }}</h4>
			<cp-button
				class="event-host-card__more-info"
				type="secondary"
				:text="$t('more_info')"
				@click="navigateTo(`/${locale}/event-host/${item.id}`)"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { EventHost } from '@shared/api/types';
import { useRuntimeConfig } from 'nuxt/app';
import CpButton from '@shared/gui/CpButton.vue';
const props = defineProps<{ item: EventHost['data'] }>();

const { locale } = useI18n();

const config = useRuntimeConfig();

const getMediaUrl = computed(() => {
	if (props.item.attributes?.mainBanner?.data) {
		return (
			config.public.apiBaseUrl +
			props.item.attributes?.mainBanner.data[0].attributes.url
		);
	} else {
		return '../public/images/event-card_blured.jpg';
	}
});
</script>

<style scoped lang="scss">
.event-host-card {
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
