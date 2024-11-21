<template>
	<c-p-header />
	<nuxt-page />
	<c-p-footer />
</template>

<script setup lang="ts">
onBeforeMount(() => {
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
