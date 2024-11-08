<template>
	<div id="upSide" class="header__wrapper">
		<cp-login-modal
			v-if="loginModalIsOpen"
			@update:modal-update="handleModalClose"
		/>
		<cp-up-scroll v-model:model-value="loginModalIsOpen" up-side-id="upSide" />
		<div class="header__img">
			<nuxt-img
				placeholder="/images/header-background_small_blured.jpg"
				loading="lazy"
				class="header__img-pic"
				src="/images/header-background_small.png"
			/>
		</div>
		<div class="header__controls">
			<nuxt-link to="/">
				<nuxt-img
					src="/images/logo.png"
					class="icon icon-logo header__icon-logo"
				/>
			</nuxt-link>
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
					<!-- <cp-button
						width="large"
						size="small"
						shape="oval"
						color="yellowGrey"
						:text="$t('news')"
					/> -->
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
			<img src="/images/burger-menu.svg" class="header__icon-burger-menu" />
		</div>
	</div>
</template>

<script setup lang="ts">
import CpButton from '@shared/gui/CpButton.vue';
import CpUpScroll from '@shared/gui/CpUpScroll.vue';

const loginModalIsOpen = ref<boolean>(false);
const router = useRouter();

const isAuthenticated = ref<boolean>(false);
const userRole = ref<any>({});

const handleModalOpen = () => {
	loginModalIsOpen.value = true;
};

onMounted(() => {
	getUserDataFromLocalStorage();
	window.addEventListener('login', handleLogin); //TODO: connect pinia and store such data in pinia, rewrite compinent when pinia is integrated
});

const getUserDataFromLocalStorage = () => {
	if (localStorage.getItem('myUser')) {
		const myUser = JSON.parse(localStorage.getItem('myUser') as string);
		isAuthenticated.value = true;
		userRole.value = myUser.role.name;
	}
};

const handleLogin = (event: CustomEvent) => {
	isAuthenticated.value = true;
	userRole.value = event.detail.role;
};

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

const handleModalClose = (newState: boolean) => {
	loginModalIsOpen.value = newState;
};

const isAllowedToCreateEvent = computed(() => {
	return isAuthenticated.value && userRole.value.name === 'Organizador de eventos';
});
</script>

<style scoped lang="scss">
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
			font-family: 'object-fit: cover';
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
			display: none;

			@media #{$screen-desktop} {
				display: flex;
			}
		}

		&--oval {
			display: none;

			@media #{$screen-desktop} {
				display: flex;
			}
		}
	}
}
</style>
