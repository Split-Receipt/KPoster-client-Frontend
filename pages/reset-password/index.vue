<template>
	<cp-base-page class="reset-password-page" :header="$t('reset_password')">
		<template #content>
			<reset-password-form class="reset-password-page__form" />
		</template>
	</cp-base-page>
</template>

<script setup lang="ts">
import ResetPasswordForm from '@widgets/reset-password-form/ResetPasswordFrom.vue';
import CpBasePage from '@shared/gui/CpBasePage.vue';
</script>

<style lang="scss" scoped>
.reset-password-page {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 20px;
}
</style>
