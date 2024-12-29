<template>
	<cp-base-page :header="$t('how_to_become_event_host')" class="about-us">
		<template #content>
			<div v-if="instructions" class="about-us-text">
				<cp-markdown-viewer :markdown-text="instructions" />
			</div>
		</template>
	</cp-base-page>
</template>

<script setup lang="ts">
import { toast } from 'vue3-toastify';
import CpBasePage from '@shared/gui/CpBasePage.vue';
import { requestEventHostInstructions } from '@shared/api';

const instructions = ref<string>('');

const getInstructions = async () => {
	try {
		instructions.value = (
			await requestEventHostInstructions()
		).data.data.attributes.instructions;
	} catch (e) {
		toast.error('Error al obtener la información de la página');
	}
};

onBeforeMount(() => {
	getInstructions();
});
</script>
