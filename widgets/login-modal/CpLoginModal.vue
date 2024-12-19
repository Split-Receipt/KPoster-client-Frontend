<template>
	<div class="modal">
		<div ref="modalMain" class="modal-content">
			<button class="modal-content-close" @click="hanldeCloseModal" />
			<span
				v-if="loginModalState !== 'login'"
				class="modal-content-backward"
				@click="goingToLogin"
			>Back</span
			>
			<div v-if="loginModalState === 'login'" class="modal-content-login">
				<h2 class="modal-content-title">Iniciar sesión en el perfil</h2>
				<div class="modal-content-inputs">
					<div class="modal-content-inputs-email">
						<cp-text-input
							v-model="loginData.identifier"
							placeholder="email"
							type="email"
						/>
						<span
							class="modal-content-inputs-passRestore" 
						>
							Recuperar contraseña?
						</span> 
						<!-- @click="goingToPassRestore" ToDo => open when be ready email server -->
					</div>
					<cp-text-input
						v-model="loginData.password"
						class="modal-content-inputs-password"
						placeholder="password"
						type="password"
						:with-eye="true"
					/>
					<cp-button
						text="Entrar"
						size="small"
						:disabled="!loginData.identifier || !loginData.password"
						@click="login"
					/>
				</div>
			</div>
			<cp-registration v-if="loginModalState === 'registration'" />
			<div
				v-if="loginModalState === 'login'"
				class="modal-content-registrationBtn"
			>
				<span @click="goingToRegistration">Registrarse</span>
			</div>
			<!-- <cp-restore-pass v-if="loginModalState === 'passRestore'"/> ToDo => open when be ready email server -->
		</div>
	</div>
</template>

<script setup lang="ts">
import { onClickOutside } from '@vueuse/core';
import CpButton from '@shared/gui/CpButton.vue';
import CpTextInput from '@shared/gui/CpTextInput.vue';
import type { LoginParams } from '@shared/api/types';
import { toast } from 'vue3-toastify';
import { useUserStore } from '@stores/user-store';
const emit = defineEmits<modalEvents>();
const { locale } = useI18n();
const userStore = useUserStore();

// import CpRestorePass from './CpRestorePass.vue';

const loginData = reactive<LoginParams>({
	identifier: '',
	password: '',
});

const loginModalState = ref<string>('login');
const modalMain = ref<HTMLDivElement | null>(null);

type modalEvents = {
	(event: 'update:modalUpdate', eventData: boolean): void;
};
const hanldeCloseModal = () => {
	emit('update:modalUpdate', false);
};

const goingToRegistration = () => {
	loginModalState.value = 'registration';
};
const goingToPassRestore = () => {
	loginModalState.value = 'passRestore';
};

const goingToLogin = () => {
	loginModalState.value = 'login';
};

const login = async () => {
	try {
		await userStore.login(loginData);
		toast.success('Autorización exitosa');
		hanldeCloseModal();
		navigateTo(`/${locale.value}/`);
	} catch (error) {
		toast.error(error as string);
	}
};

onClickOutside(modalMain, () => hanldeCloseModal());
</script>

<style scoped lang="scss">
/** Требуется: почистить стили, переименовать классы*/
.modal {
	width: 100%;
	height: 100%;
	z-index: 998;
	position: fixed;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: rgba(0, 0, 0, 0.3);
	overflow: auto;
	scrollbar-width: none;
	overscroll-behavior: contain;

	&::-webkit-scrollbar {
		display: none;
	}

	&-content {
		z-index: 999;
		display: flex;
		flex-direction: column;
		align-items: center;
		border-radius: 35px;
		padding: 40px;
		min-width: 480px;
		background: $white;
		position: absolute;
		scrollbar-width: none;

		// media height

		@media (max-height: 700px) {
			max-height: 700px;
		}

		@media (max-height: 680px) {
			max-height: 680px;
		}

		// media wdith

		@media (max-width: 700px) {
			min-width: 380px;
		}

		@media (max-width: 530px) {
			min-width: 350px;
		}

		@media (max-width: 420px) {
			min-width: 310px;
		}

		&::-webkit-scrollbar {
			display: none;
		}

		&-close {
			position: absolute;
			right: 40px;
			top: 40px;
			width: 55px;
			height: 55px;
			background-size: 30px;
			border: 1.5px solid #000;
			padding: 5px;
			border-radius: 50%;
			background-color: $white;
			background-image: url('/public/images/close.svg');
			background-position: center;
			background-repeat: no-repeat;
			cursor: pointer;
			@media screen and (max-height: 630px) {
				right: 15px;
				top: 15px;
				width: 40px;
				height: 40px;
				background-size: 26px;
			}
			@media screen and (max-width: 376px) and (max-height: 800px) {
				right: 15px;
				top: 15px;
				width: 40px;
				height: 40px;
				background-size: 26px;
			}
		}

		&-backward {
			position: absolute;
			left: 40px;
			top: 50px;
			font-size: 22px;
			line-height: 35px;
			color: #353333;
			cursor: pointer;
			@media screen and (max-height: 630px) {
				left: 40px;
				top: 20px;
				background-size: 26px;
			}
			@media screen and (max-width: 376px) and (max-height: 800px) {
				left: 40px;
				top: 20px;
				background-size: 26px;
			}
		}

		&-title {
			margin-bottom: 40px;
			margin-top: 80px;
			font-size: 30px;
			width: 80%;
			line-height: 42px;
			font-weight: 600;
			text-align: center;
			color: #353333;
			cursor: default;
			@media (max-width: 530px) and (max-height: 630px) {
				margin-top: 0px;
			}
			@media (max-height: 670px) {
				margin-top: 0px;
			}
		}

		&-login {
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
		}

		&-passRestore {
			height: 100%;
			width: 100%;
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			align-items: center;

			&-info {
				text-align: center;
				font-size: 22px;
				line-height: 35px;
				color: #888888;
			}

			&-email {
				margin-top: 25px;
				margin-bottom: 25px;
			}

			&-btn {
				width: 100%;
			}
		}

		&-registration {
			height: 100%;
			width: 100%;
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			align-items: center;

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
					font-weight: 600;
					color: #353333;
				}
			}
		}

		&-inputs {
			width: 100%;

			&-passRestore {
				display: flex;
				justify-content: flex-end;
				cursor: pointer;
				color: #888888;
				font-size: 14px;
				line-height: 22px;
				margin-top: 5px;
			}

			&-password {
				margin: 20px 0 25px 0;
			}

			&-sideAccount {
				width: 100%;
				display: flex;
				flex-direction: column;
				align-items: center;
				margin-top: 40px;

				&-title {
					width: 100%;
					display: block;
					text-align: center;
					font-size: 22px;
					color: #888888;
					margin-bottom: 25px;
				}

				&-buttons {
					display: flex;
					justify-content: space-between;
					gap: 34px;

					&-google {
						height: 50px;
						width: 50px;
						transition: all 0.3s;
						cursor: pointer;

						&:hover {
							transition: all 0.3s;
							transform: scale(1.1);
						}
					}

					&-facebook {
						height: 55px;
						width: 55px;
						margin-top: -3px;
						transition: all 0.3s;
						cursor: pointer;

						&:hover {
							transition: all 0.3s;
							transform: scale(1.1);
						}
					}
				}
			}
		}

		&-registrationBtn {
			margin-top: 40px;
			display: flex;
			align-items: center;
			justify-content: center;
			@media (max-height: 700px) {
				margin-top: 25px;
			}
			@media (max-height: 680px) {
				margin-top: 10px;
			}
			@media (max-height: 650px) {
				margin-top: 5px;
			}
			span {
				font-size: 22px;
				line-height: 35px;
				color: #353333;
				cursor: pointer;
				border-bottom: 1px solid #353333;
			}
		}
	}
}
</style>
