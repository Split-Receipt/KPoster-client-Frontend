<template>
	<cp-base-page :header="$t('email_confirmed')">
		<template #content>
			<div class="email-confirmation__content">
				<p class="email-confirmation__text">{{ $t('email_confirmed') }}</p>
			</div>
		</template>
	</cp-base-page>
</template>

<script setup lang="ts">
import { confirmEmail } from '@shared/api';
import { toast } from 'vue3-toastify';
const route = useRoute();
const { locale } = useI18n();

onMounted(() => {
	sendRequestToConfirmEmail();
});

const sendRequestToConfirmEmail = async () => {
	try {
		await confirmEmail({
			confirmation: route.query.confirmation as string,
		});
		setTimeout(() => {
			navigateTo(`/${locale.value}/email-confirmation`);
		});
	} catch (error) {
		toast.error(error as string);
	}
};
</script>
