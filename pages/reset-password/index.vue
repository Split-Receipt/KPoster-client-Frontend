<template>
	<cp-base-page :header="$t('reset_password')">
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
	&__form {
		margin: auto;
		width: 100%;

		@media #{$screen-tablet} {
			width: 350px;
		}
	}
}
</style>
