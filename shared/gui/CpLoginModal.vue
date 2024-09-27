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
			<h2 class="modal-content-title">Iniciar sesión en el perfil</h2>
			<div class="modal-content-inputs">
				<div class="modal-content-inputs-email">
					<cp-text-input placeholder="email" type="text" />
					<span class="modal-content-inputs-passRestore">
						<a href="#">Recuperar contraseña?</a>
					</span>
				</div>
				<cp-text-input class="modal-content-inputs-password" placeholder="password" type="password" />
				<cp-button 
					color="yellowGrey"
					shape="oval"
					text="Entrar"
					width="maxWidth"
					size="small"
				/>
				<div class="modal-content-inputs-sideAccount">
					<span class="modal-content-inputs-sideAccount-title">O a través de una cuenta</span>
					<div class="modal-content-inputs-sideAccount-buttons">
						<nuxt-img class="modal-content-inputs-sideAccount-buttons-button" src="../public/images/google-login.svg"/>
						<nuxt-img class="modal-content-inputs-sideAccount-buttons-button" src="../public/images/facebook-login.svg"/>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { onClickOutside } from '@vueuse/core';
import CpButton from './CpButton.vue';

const emit = defineEmits<modalEvents>();

const modalMain = ref<HTMLDivElement | null>(null);

type modalEvents = {
	(event: 'update:modalUpdate', eventData: boolean): void;
};
const hanldeCloseModal = () => {
    emit('update:modalUpdate', false);
};

onClickOutside(modalMain, () => hanldeCloseModal());
</script>

<style scoped lang="scss">
    .modal {
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 9999;
        position: fixed;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba(0,0,0, 0.3);

        &-content {
            z-index: 999;
            display: flex;
            flex-direction: column;
            align-items: center;
            border-radius: 35px;
            padding: 135px 40px 40px 40px;
            width: 30%;
            min-width: 450px;
            height: 90%;
            min-height: 550px;
            opacity: 1;
            background: #EEEEEE;
            position: absolute;

            &-close {
                position: absolute;
                right: 40px;
                top: 40px;
            }

            &-title {
                margin-bottom: 40px;
                font-size: 30px;
                width: 80%;
                line-height: 42px;
                font-weight: 500;
                text-align: center;
                color: #353333;
            }

            &-inputs {
                width: 100%;

                &-email {
                    
                }

                &-passRestore {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;

                    a {
                        text-decoration: none;
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
                    }

                    &-buttons {
                        width: 30%;
                        display: flex;
                        justify-content: space-between;

                        &-button {
                            height: 50px;
                            width: 50px;
                        }
                    }
                }
            }
        }
    }
</style>