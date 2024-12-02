<template>
	<c-p-header />
	<nuxt-page />
	<c-p-footer />
</template>

<script setup lang="ts">
import { useCommonDataStore } from '@stores/common-data-store';

const commonDataStore = useCommonDataStore();

onBeforeMount(() => {
	commonDataStore.getAllData();
	const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
	localStorage.setItem('timezone', timezone);
});
</script>

<style lang="scss">
:root {
	scroll-behavior: smooth;
}

body {
	background: $default-background;
}
</style>
