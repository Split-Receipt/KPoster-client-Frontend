<template>
	<div class="about-us">
		<div class="about-us-main-title">
			<h1>{{ $t('main_title') }}</h1>
		</div>
		<h2 class="about-us-sub-title">{{ $t('about_us_title') }}</h2>
		<span v-if="aboutPlatform" class="about-us-text">
			<cp-markdown-viewer :markdown-text="aboutPlatform" />
		</span>
	</div>
</template>

<script setup lang="ts">
import type { AboutPlatform } from '@shared/api/types';
import { requestDataAboutPlatform } from '@shared/api';
import { toast } from 'vue3-toastify';
import CpMarkdownViewer from '@shared/gui/CpMarkdownViewer.vue';
const aboutPlatform = ref<AboutPlatform['aboutUs']['aboutUsText']>();

const getInfoAboutPlatform = async () => {
	try {
		aboutPlatform.value = (
			await requestDataAboutPlatform()
		).data.data.attributes.aboutUs.aboutUsText;
	} catch (e) {
		toast.error('Error al obtener la información de la página');
	}
};

onBeforeMount(() => {
	getInfoAboutPlatform();
});
</script>

<style scoped lang="scss">
.about-us {
	padding: 0 20px 0 20px;
	color: $black;

	&-main-title {
		width: 100%;
		margin-top: 50px;

		h1 {
			width: 100%;
			font-family: $font-family-medium-expanded;
			text-align: center;
			font-size: 82px;
			font-style: normal;
			font-weight: 500;
			line-height: normal;
			text-align: center;

			@media screen and (max-width: 1280px) {
				font-size: 72px;
			}

			@media screen and (max-width: 768px) {
				font-size: 40px;
			}

			@media screen and (max-width: 360px) {
				font-size: 30px;
			}
		}
	}

	&-sub-title {
		margin-bottom: 0.5em;
		font-family: $font-family-medium-expanded;
		font-size: 70px;
		font-style: normal;
		font-weight: 500;
		line-height: 120%;
		margin-top: 70px;

		@media screen and (max-width: 1280px) {
			font-size: 66px;
		}

		@media screen and (max-width: 768px) {
			font-size: 32px;
		}

		@media screen and (max-width: 360px) {
			font-size: 28px;
		}
	}

	&-text {
		font-size: 22px;
		font-style: normal;
		font-weight: 400;
		line-height: 160%;
		display: block;
		margin: 0 15% 140px 0;

		&-top {
			margin-bottom: 2em;
			display: block;
		}

		&-mid {
			margin-bottom: 2em;
			display: block;
		}

		&-bottom {
			display: block;
		}

		@media screen and (max-width: 1280px) {
			font-size: 16px;
		}

		@media screen and (max-width: 768px) {
			font-size: 12px;
		}

		@media screen and (max-width: 360px) {
			font-size: 13px;
		}
	}
}
</style>
