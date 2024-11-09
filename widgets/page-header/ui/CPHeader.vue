<template>
	<div id="upSide" class="header__wrapper">
		<!-- Модальное окно для логина -->
		<cp-login-modal
			v-if="loginModalIsOpen"
			@update:modal-update="handleModalClose"
		/>

		<!-- Кнопка для прокрутки вверх -->
		<cp-up-scroll v-model:model-value="loginModalIsOpen" up-side-id="upSide" />

		<!-- Основное изображение в заголовке -->
		<div class="header__img">
			<nuxt-img
				placeholder="/images/header-background_small_blured.jpg"
				loading="lazy"
				class="header__img-pic"
				src="/images/header-background_small.png"
			/>
		</div>

		<!-- Блок с контролами заголовка -->
		<div class="header__controls">
			<nuxt-link to="/">
				<nuxt-img
					src="/images/logo.png"
					class="icon icon-logo header__icon-logo"
				/>
			</nuxt-link>

			<!-- Бургер-меню и кнопки на десктопе -->
			<div class="header__menu">
				<div class="header__buttons header__buttons--oval">
					<cp-button
						v-if="isAllowedToCreateEvent"
						width="large"
						size="small"
						shape="oval"
						color="yellowGrey"
						:text="$t('create_event')"
						@click="$router.push('/event-form')"
					/>
					<cp-button
						width="large"
						size="small"
						shape="oval"
						color="yellowGrey"
						:text="$t('sales')"
					/>
					<cp-button
						width="large"
						size="small"
						shape="oval"
						color="yellowGrey"
						:text="$t('charity')"
					/>
				</div>

				<div class="header__buttons header__buttons--circle">
					<cp-button
						color="gray"
						with-image="/../public/images/search.svg"
						size="small"
						shape="circle"
						text=""
					/>
					<cp-button
						color="gray"
						with-image="/../public/images/login.svg"
						size="small"
						shape="circle"
						text=""
						@click="handleLoginButton"
					/>
					<lang-selector />
				</div>
			</div>

			<!-- Оверлей и мобильное меню -->
			<div v-if="isMenuOpen" class="overlay" @click="handleOutsideClick" />
			<div v-if="isMenuOpen" class="header__menu-mobile">
				<div class="header__buttons header__buttons--oval">
					<cp-button
						v-if="isAllowedToCreateEvent"
						width="large"
						size="small"
						shape="oval"
						color="yellowGrey"
						:text="$t('create_event')"
						@click="$router.push('/event-form')"
					/>
					<cp-button
						width="large"
						size="small"
						shape="oval"
						color="yellowGrey"
						:text="$t('sales')"
					/>
					<cp-button
						width="large"
						size="small"
						shape="oval"
						color="yellowGrey"
						:text="$t('charity')"
					/>
				</div>
				<div class="header__buttons header__buttons--circle">
					<cp-button
						color="gray"
						with-image="/../public/images/search.svg"
						size="small"
						shape="circle"
						text=""
					/>
					<cp-button
						color="gray"
						with-image="/../public/images/login.svg"
						size="small"
						shape="circle"
						text=""
						@click="handleLoginButton"
					/>
					<lang-selector />
				</div>
			</div>

			<img
				src="/images/burger-menu.svg"
				class="header__icon-burger-menu"
				@click="toggleMenu"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import CpButton from '@shared/gui/CpButton.vue';
import CpUpScroll from '@shared/gui/CpUpScroll.vue';
import { useRouter } from 'vue-router';

const loginModalIsOpen = ref(false);
const isMenuOpen = ref(false);
const isAuthenticated = ref(false);
const userRole = ref({});
const router = useRouter();

const handleModalOpen = () => {
	loginModalIsOpen.value = true;
};

const handleOutsideClick = () => {
	isMenuOpen.value = false;
};

const toggleMenu = () => {
	isMenuOpen.value = !isMenuOpen.value;
};

// Блокируем скролл при открытии меню
watch(isMenuOpen, (newVal) => {
	document.body.style.overflow = newVal ? 'hidden' : '';
});

const getUserDataFromLocalStorage = () => {
	if (localStorage.getItem('myUser')) {
		const myUser = JSON.parse(localStorage.getItem('myUser') as string);
		isAuthenticated.value = true;
		userRole.value = myUser.role;
	}
};

const handleLogin = (event: CustomEvent) => {
	isAuthenticated.value = true;
	userRole.value = event.detail.role;
};

onMounted(() => {
	getUserDataFromLocalStorage();
	window.addEventListener('login', handleLogin);
});

onUnmounted(() => {
	window.removeEventListener('login', handleLogin);
});

const handleLoginButton = () => {
	if (isAuthenticated.value) {
		localStorage.removeItem('myUser');
		localStorage.removeItem('AuthToken');
		isAuthenticated.value = false;
		userRole.value = '';
		router.push('/');
	} else {
		handleModalOpen();
	}
};

const handleModalClose = (newState) => {
	loginModalIsOpen.value = newState;
};

const isAllowedToCreateEvent = computed(() => {
	return (
		isAuthenticated.value && userRole.value?.name === 'Organizador de eventos'
	);
});
</script>

<style scoped lang="scss">
.overlay {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	z-index: 10;
}

.header__menu-mobile {
	position: fixed;
	gap: 20px;
	top: 0;
	right: 0;
	width: 80%;
	height: 100%;
	background-color: #ffffff;
	z-index: 20;
	padding: 20px;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	overflow-y: auto;
}

.header__icon-burger-menu {
	cursor: pointer;
}

.header {
	display: flex;

	&__img {
		position: relative;
		overflow: hidden;
		width: 100%;
		height: $header-img-height;

		&-pic {
			width: 100%;
			height: $header-pic-height;
			object-fit: cover;
		}
	}

	&__controls {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: $header-controls-height;
		padding: $header-controls-padding;

		@media #{$screen-tablet} {
			height: $header-controls-height-screen-tablet;
		}

		@media #{$screen-desktop} {
			margin-top: $header-controls-margin-top-screen-desktop;
			padding: $header-controls-padding-screen-desktop;
		}
	}

	&__icon-burger-menu {
		@media #{$screen-tablet} {
			background-color: $header-icon-burger-menu-background-color-screen-tablet;
			border-radius: $header-icon-burger-menu-border-radius-screen-tablet;
			width: $header-icon-burger-menu-width-screen-tablet;
			height: $header-icon-burger-menu-height-screen-tablet;
			padding: $header-icon-burger-menu-padding-screen-tablet;
		}

		@media #{$screen-desktop} {
			display: none;
		}
	}

	&__icon-logo {
		@media #{$screen-tablet} {
			background-color: transparent;
			width: $header-icon-logo-width-screen-tablet;
			height: $header-icon-logo-height-screen-tablet;
		}

		@media #{$screen-desktop} {
			background-color: transparent;
			width: $header-icon-logo-width-screen-desktop;
			height: $header-icon-logo-height-screen-desktop;
		}
	}

	&__menu {
		display: none;

		@media #{$screen-desktop} {
			display: flex;
			align-items: center;
			padding: $header-menu-padding-screen-desktop;
			gap: $header-menu-gap-screen-desktop;
			background-color: $header-menu-background-color-screen-desktop;
			border-radius: $header-menu-border-radius-screen-desktop;
		}
	}

	&__buttons {
		gap: $header-buttons-gap;

		&--circle {
			display: flex;

			@media #{$screen-desktop} {
				order: 2;
				display: flex;
			}
		}

		&--oval {
			order: 2;
			display: flex;
			flex-direction: column;

			@media #{$screen-desktop} {
				display: flex;
				flex-direction: row;
			}
		}
	}
}
</style>
