<template>
	<cp-base-page :header="$t('about_us_title')" class="about-us">
		<template #content>
			<div v-if="aboutPlatform" class="about-us-text">
				<cp-markdown-viewer :markdown-text="aboutPlatform" />
			</div>
		</template>
	</cp-base-page>
</template>

<script setup lang="ts">
import type { AboutPlatform } from '@shared/api/types';
import CpBasePage from '@shared/gui/CpBasePage.vue';
import { requestDataAboutPlatform } from '@shared/api';
import { toast } from 'vue3-toastify';
import CpMarkdownViewer from '@shared/gui/CpMardownViewer/CpMarkdownViewer.vue';
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
	font-family: $font-family-medium-expanded;

	&-sub-title {
		margin-bottom: 0.5em;
		line-height: 120%;
		margin-top: 20px;
	}

	&-text {
		font-size: 22px;
		line-height: 160%;

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
