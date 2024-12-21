<template>
	<v-form
		ref="resetPassword"
		class="reset-password-form"
		@submit="resetPassword"
	>
		<v-field
			v-slot="{ errors }"
			:model-value="resetPasswordPayload.password"
			name="newPassword"
			rules="required|minLength:8"
		>
			<cp-text-input
				v-model="resetPasswordPayload.password"
				type="password"
				:placeholder="$t('new_password')"
			/>
			<span v-if="errors.length" class="reset-password-form__error-message">
				{{ errors[0] }}
			</span>
		</v-field>
		<v-field
			v-slot="{ errors }"
			:model-value="resetPasswordPayload.passwordConfirmation"
			name="newPasswordConfirmation"
			rules="required|minLength:8|confirmed:newPassword"
		>
			<cp-text-input
				v-model="resetPasswordPayload.passwordConfirmation"
				type="password"
				:placeholder="$t('new_password')"
			/>
			<span v-if="errors.length" class="reset-password-form__error-message">
				{{ errors[0] }}
			</span>
		</v-field>

		<cp-button native-type="submit" :text="$t('reset_password')" />
	</v-form>
</template>

<script setup lang="ts">
import { Form as VForm, Field as VField } from 'vee-validate';
import type { ResetPasswordPayload } from '@shared/api/types';
import { requestChangePassword } from '@shared/api';
import { toast } from 'vue3-toastify';
import { useUserStore } from '@stores/user-store';

const route = useRoute();
const { locale } = useI18n();
const userStore = useUserStore();

const resetPasswordPayload = reactive<ResetPasswordPayload>({
	password: '',
	passwordConfirmation: '',
	code: '',
});

onBeforeMount(() => {
	setUniqueCode();
});

const setUniqueCode = () => {
	resetPasswordPayload.code = route.params.code as string;
};

const resetPassword = async () => {
	try {
		const data = await requestChangePassword(toRaw(resetPasswordPayload));
		toast.success('Contraseña cambiada');
		userStore.loginWithJWT(data.data.jwt);
		setTimeout(() => {
			navigateTo(`/${locale.value}`);
		}, 2000);
	} catch (error) {
		toast.error('No se pudo cambiar la contraseña');
	}
};
</script>

<style scoped lang="scss">
.reset-password-form {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 20px;
	&__error-message {
		color: red;
		width: 100%;
		text-align: left;
	}
}
</style>
