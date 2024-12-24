<template>
	<div>
		<event-host-personal-page-content
			v-if="userStore.user.role.type === UserRolesTypes.eventHost && userStore.user?.eventHostData"
		/>
		<client-personal-page-content v-else />
	</div>
</template>

<script setup lang="ts">
import EventHostPersonalPageContent from '@widgets/event-host-personal-form/EventHostPersonalPageContent.vue';
import ClientPersonalPageContent from '@widgets/client-personal-form/ClientPersonalPageContent.vue';
import { UserRolesTypes } from '@shared/api/types';
import { useUserStore } from '@stores/user-store';

const userStore = useUserStore();
</script>

<style scoped lang="scss"></style>
