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
			<h2 class="header__mainTitle">{{ $t('name_of_platform') }}</h2>
		</div>

		<!-- Блок с контролами заголовка -->
		<div class="header__controls">
			<nuxt-link to="/">
				<nuxt-img
					src="/images/logo.svg"
					class="icon icon-logo header__icon-logo"
				/>
			</nuxt-link>

			<!-- Бургер-меню и кнопки на десктопе -->
			<div class="header__menu">
				<div class="header__buttons header__buttons--oval">
					<cp-button
						v-if="isAllowedToCreateEvent"
						size="small"
						:text="$t('create_event')"
						@click="navigateTo(`/${locale}/create-event`)"
					/>
					<to-main v-if="route.path !== `/${locale}`" @click="toggleMenu" />
					<cp-button
						size="small"
						:text="$t('news')"
						@click="navigateTo(`/${locale}/news`)"
					/>
					<cp-button
						size="small"
						:text="$t('about_us_title')"
						@click="navigateTo(`/${locale}/about-us`)"
					/>
					<cp-button
						v-if="userStore.isAuth"
						type="ghost"
						size="small"
						:text="$t('sign_out')"
						@click="logoutUser"
					/>
				</div>

				<div class="header__buttons header__buttons--circle">
					<cp-button
						with-image="/../public/images/login.svg"
						size="small"
						control="true"
						shape="circle"
						type="secondary"
						@click="handleLoginButton"
					/>
					<lang-selector />
				</div>
			</div>

			<!-- Оверлей и мобильное меню -->
			<div v-if="isMenuOpen" class="overlay" @click="toggleMenu" />
			<div v-if="isMenuOpen" class="header__menu-mobile">
				<div class="header__buttons header__buttons--oval">
					<cp-button
						v-if="isAllowedToCreateEvent"
						size="small"
						:text="$t('create_event')"
						@click="
							mobileMenuActionsDecorator(navigateTo, `/${locale}/create-event`)
						"
					/>
					<to-main v-if="route.path !== `/${locale}`" @click="toggleMenu" />
					<cp-button
						size="small"
						:text="$t('news')"
						@click="mobileMenuActionsDecorator(navigateTo, `/${locale}/news`)"
					/>
					<cp-button
						size="small"
						:text="$t('about_us_title')"
						@click="mobileMenuActionsDecorator(navigateTo, `/${locale}/about-us`)"
					/>
					<cp-button
						v-if="userStore.isAuth"
						type="ghost"
						size="small"
						:text="$t('sign_out')"
						@click="mobileMenuActionsDecorator(logoutUser)"
					/>
				</div>
				<div class="header__buttons header__buttons--circle">
					<cp-button
						with-image="/../public/images/login.svg"
						size="small"
						type="secondary"
						shape="circle"
						@click="mobileMenuActionsDecorator(handleLoginButton)"
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
import { ref, computed, watch } from 'vue';
import CpButton from '@shared/gui/CpButton.vue';
import CpUpScroll from '@shared/gui/CpUpScroll.vue';
import { useUserStore } from '@stores/user-store';
import { UserRolesTypes } from '@shared/api/types';
import ToMain from '@features/to-main/ToMain.vue';

const { locale } = useI18n();

const userStore = useUserStore();
const loginModalIsOpen = ref(false);
const isMenuOpen = ref(false);
const route = useRoute();

const handleModalOpen = () => {
	loginModalIsOpen.value = true;
};

const logoutUser = () => {
	userStore.logout();
	navigateTo(`/${locale.value}`);
};
const mobileMenuActionsDecorator = (
	cb: (argument?: string) => void,
	cbArgs?: string
) => {
	toggleMenu();
	if (cbArgs) {
		return cb(cbArgs);
	} else {
		return cb();
	}
};

const toggleMenu = () => {
	isMenuOpen.value = !isMenuOpen.value;
};

// Блокируем скролл при открытии меню
watch(isMenuOpen, (newVal) => {
	document.body.style.overflow = newVal ? 'hidden' : '';
});
const handleLoginButton = () => {
	if (userStore.isAuth) {
		navigateTo(`/${locale.value}/partner-personal-page`);
	} else {
		handleModalOpen();
	}
};

const handleModalClose = (newState: boolean) => {
	loginModalIsOpen.value = newState;
};

const isAllowedToCreateEvent = computed(() => {
	return userStore.isAuth && userStore.getUserRole === UserRolesTypes.eventHost;
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
	background-color: $white;
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

	&__mainTitle {
		position: absolute;
		height: 100%;
		width: 100%;
		top: 0;
		left: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 30px;
		color: #fff;
		z-index: 10;

		@media #{$screen-tablet} {
			font-size: 50px;
		}

		@media #{$screen-desktop} {
			font-size: 80px;
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
		width: 60px;
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
