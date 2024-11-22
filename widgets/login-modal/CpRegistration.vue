<template>
	<div class="registration">
		<h2 class="registration-title">Registro</h2>
		<div class="registration-inputs">
			<cp-text-input v-model="username" type="text" placeholder="name" />
			<cp-text-input
				v-model="email"
				style="margin-top: 25px"
				type="email"
				placeholder="email"
			/>
			<cp-text-input
				v-model="passInput"
				style="margin-top: 25px"
				type="password"
				placeholder="password"
				:with-eye="true"
			/>
			<div class="registration-passConfirm">
				<cp-text-input
					v-model="passConfirm"
					style="margin-top: 25px; margin-bottom: 5px"
					type="password"
					placeholder="password"
					:with-eye="true"
				/>
				<span class="registration-passConfirm-info"
				>Repita la contraseña de nuevo</span
				>
				<nuxt-img
					v-if="passInput === passConfirm && passConfirm !== ''"
					class="registration-passConfirm-image"
					src="../public/images/success.svg"
				/>
			</div>
			<cp-button
				style="margin-top: 25px"
				:disabled="passInput !== passConfirm || passConfirm === ''"
				text="Entrar"
				size="small"
				@click="register"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { RegisterParams } from '@shared/api/types';
import { registerUser } from '@shared/api';

const passInput = ref<string>('');
const passConfirm = ref<string>('');
const username = ref<string>('');
const email = ref<string>('');

const register = async () => {
	const registerParams: RegisterParams = {
		username: username.value,
		email: email.value,
		password: passInput.value,
	};
	if (Object.values(registerParams).some((value) => !value)) {
		return;
	}
	try {
		await registerUser(registerParams);
	} catch (e) {
		console.error(e);
	}
};
</script>

<style scoped lang="scss">
.registration {
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;

	&-title {
		margin-bottom: 40px;
		margin-top: 80px;
		font-size: 30px;
		width: 80%;
		line-height: 42px;
		font-weight: 500;
		text-align: center;
		color: #353333;
		cursor: default;
		@media (max-width: 376px) and (max-height: 800px) {
			margin-top: 40px;
		}
	}

	&-inputs {
		width: 100%;
	}

	&-passConfirm {
		position: relative;

		&-image {
			position: absolute;
			width: 20px;
			right: -25px;
			top: 20px;
		}

		&-info {
			margin-top: 5px;
			font-size: 14px;
			line-height: 22.4px;
			font-weight: 500;
			color: #353333;
		}
	}
}
</style>
