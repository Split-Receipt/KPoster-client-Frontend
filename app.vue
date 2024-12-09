<template>
	<c-p-header />
	<nuxt-page />
	<c-p-footer />
</template>

<script setup lang="ts">
import { useCommonDataStore } from '@stores/common-data-store';
import { useUserStore } from '@stores/user-store';
import { toast } from 'vue3-toastify';

const commonDataStore = useCommonDataStore();
const userStore = useUserStore();

const requestCommonData = async () => {
	const results = await commonDataStore.getAllData();
	const erroredRequestsMessages = results
		.filter((result) => result.status === 'rejected')
		.map((result) => result.reason);
	if (erroredRequestsMessages.length) {
		erroredRequestsMessages.forEach((message) => {
			toast.error(message);
		});
	}
};

const makeInitialRequests = async () => {
	try {
		await userStore.getMyUser();
		await requestCommonData();
	} catch (e) {
		toast.error(e as string);
	}
};

onBeforeMount(() => {
	const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
	localStorage.setItem('timezone', timezone);
	makeInitialRequests();
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
