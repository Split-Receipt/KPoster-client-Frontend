<template>
	<div>
		<nuxt-link :to="`/${locale}`">
			<cp-button :text="$t('to_main_page')" size="small" />
		</nuxt-link>
	</div>
</template>

<script setup lang="ts">
import CpButton from '@shared/gui/CpButton.vue';
const { locale } = useI18n();
</script>
