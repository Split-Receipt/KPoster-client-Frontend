<template>
	<div class="modal">
		<div ref="modalMain" class="modal-content">
			<cp-button
				class="modal-content-close"
				shape="circle"
				text=""
				size="middle"
				width="short"
				color="transparent"
				with-image="/../public/images/close.svg"
				@click="hanldeCloseModal"
			/>
			<div v-if="loginModalState === 'login'" class="modal-content-login">
				<h2 class="modal-content-title">Iniciar sesión en el perfil</h2>
				<div class="modal-content-inputs">
					<div class="modal-content-inputs-email">
						<cp-text-input placeholder="email" type="email" />
						<span class="modal-content-inputs-passRestore">
							<span @click="goingToPassRestore">Recuperar contraseña?</span>
						</span>
					</div>
					<cp-text-input
						class="modal-content-inputs-password"
						placeholder="password"
						type="password"
						:with-eye="true" />
					<cp-button 
						color="yellowGrey"
						shape="oval"
						text="Entrar"
						width="maxWidth"
						size="small"
					/>
                    
				</div>
			</div>
			<div v-if="loginModalState === 'registration'" class="modal-content-registration">
				<h2 class="modal-content-title">Registro</h2>
				<div class="modal-content-inputs">
					<cp-text-input type="text" placeholder="name" />
					<cp-text-input style="margin-top: 25px;" type="email" placeholder="email" />
					<cp-text-input
						style="margin-top: 25px;"
						type="password"
						placeholder="password"
						:with-eye="true"
						@input="passInputValue"/>
					<div class="modal-content-registration-passConfirm">
						<cp-text-input
							style="margin-top: 25px;  margin-bottom: 5px;"
							type="password"
							placeholder="password"
							:with-eye="true"
							@input="passInputValueconfirm"/>
						<span class="modal-content-registration-passConfirm-info">Repita la contraseña de nuevo</span>
						<nuxt-img v-if="passInput === passConfirm && passConfirm !== ''" class="modal-content-registration-passConfirm-image"  src="../public/images/success.svg"/>
					</div>
					<cp-button 
						style="margin-top: 25px;"
						color="yellowGrey"
						shape="oval"
						text="Entrar"
						width="maxWidth"
						size="small"
					/>
				</div>
			</div>
			<div v-if="loginModalState !== 'passRestore'" class="modal-content-inputs-sideAccount">
				<span class="modal-content-inputs-sideAccount-title">O a través de una cuenta</span>
				<div class="modal-content-inputs-sideAccount-buttons">
					<nuxt-img class="modal-content-inputs-sideAccount-buttons-google" src="../public/images/google-login.svg"/>
					<nuxt-img class="modal-content-inputs-sideAccount-buttons-facebook" src="../public/images/facebook-login.svg"/>
				</div>
			</div>
			<div v-if="loginModalState === 'login'" class="modal-content-registrationBtn">
				<span @click="goingToRegistration">Registrarse</span>
			</div>
			<div v-if="loginModalState === 'passRestore'" class="modal-content-passRestore">
				<h2 class="modal-content-title">Recuperación de contraseña</h2>
				<span class="modal-content-passRestore-info">Se enviará un correo electrónico con instrucciones para restablecer la contraseña.</span>
				<cp-text-input class="modal-content-passRestore-email" type="email" placeholder="email"/>
				<cp-button 
					class="modal-content-passRestore-btn"
					color="yellowGrey"
					shape="oval"
					text="Recuperar contraseña"
					width="maxWidth"
					size="small"
				/>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { onClickOutside } from '@vueuse/core';
import CpButton from '@shared/gui/CpButton.vue';
import CpTextInput from '@shared/gui/CpTextInput.vue';

const emit = defineEmits<modalEvents>();

const loginModalState = ref<string>('login');
const modalMain = ref<HTMLDivElement | null>(null);
const passInput = ref<string>('');
const passConfirm = ref<string>('');

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

const passInputValue = (e: Event) => {
    const target = e.target as HTMLInputElement;
    passInput.value = target.value;
};

const passInputValueconfirm = (e: Event) => {
    const target = e.target as HTMLInputElement;
    passConfirm.value = target.value;
};

onClickOutside(modalMain, () => hanldeCloseModal());
</script>

<style scoped lang="scss">
    .modal {
        width: 100%;
        height: 100%;
        // top: 0;
        // left: 0;
        // right: 0;
        // bottom: 0;
        z-index: 9999;
        position: fixed;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba(0,0,0, 0.3);
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
            min-width: 450px;
            width: 30%;
            height: auto;
            opacity: 1;
            background: #EEEEEE;
            position: absolute;
            scrollbar-width: none;

            &::-webkit-scrollbar {
                display: none;
            }

            &-close {
                position: absolute;
                right: 40px;
                top: 40px;
            }

            &-title {
                margin-bottom: 40px;
                margin-top: 80px;
                font-size: 30px;
                width: 80%;
                line-height: 42px;
                font-weight: 500;
                text-align: center;
                color: #353333;
                cursor: default
            }

            &-login {
                height: 100%;
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
                    line-height: 35.2px;
                    font-weight: 400;
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
                    font-weight: 500;
                    color: #353333;
                   }
                }
            }

            &-inputs {
                width: 100%;

                &-passRestore {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;

                    span {
                        text-decoration: none;
                        cursor: pointer;
                        color: #888888;
                        font-size: 14px;
                        font-weight: 500;
                        line-height: 22.4px;
                        margin-top: 5px;
                    }
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
                        font-weight: 400;
                        line-height: 35.2px;
                        color: #888888;
                        cursor: default;
                    }

                    &-buttons {
                        width: 30%;
                        display: flex;
                        justify-content: space-between;

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

                 span {
                    font-size: 22px;
                    font-weight: 400;
                    line-height: 35.2px;
                    color: #353333;
                    padding: 5px;
                    cursor: pointer;
                    text-decoration: none;
                    border-bottom: 1px solid #353333;
                 }
            }
        }
    }
</style>