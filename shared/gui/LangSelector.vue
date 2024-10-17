<template>
	<div class="dropDown__container">
		<label class="popup">
			<input
				ref="menuTrigger"
				class="isMenuTrigger"
				type="checkbox"
				@change="menuToggle"
			/>
			<div tabindex="0" class="burger">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="icon icon-tabler icon-tabler-world"
					width="36"
					height="36"
					viewBox="0 0 24 24"
					stroke-width="1"
					stroke="#000000"
					fill="none"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path stroke="none" d="M0 0h24v24H0z" fill="none" />
					<path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
					<path d="M3.6 9h16.8" />
					<path d="M3.6 15h16.8" />
					<path d="M11.5 3a17 17 0 0 0 0 18" />
					<path d="M12.5 3a17 17 0 0 1 0 18" />
				</svg>
				<span>{{ locale }}</span>
			</div>
			<nav ref="isOpenMenu" class="popup-window isClosed">
				<ul>
					<li
						v-for="option in availableLanguages"
						:key="option.item_UID + '-key'"
					>
						<div class="checkbox-container">
							<div class="checkbox-wrapper">
								<input
									:id="option.item_UID"
									v-model="currentLang"
									name="radio_name"
									:value="option.item_value"
									type="radio"
									@change="closeMenu"
								/>
								<label :for="option.item_UID" style="--size: 22px">
									<svg viewBox="0,0,50,50">
										<path d="M5 30 L 20 45 L 45 5" />
									</svg>
								</label>
								<label class="radioLabel" :for="option.item_UID">{{
									option.item_title
								}}</label>
							</div>
						</div>
					</li>
				</ul>
			</nav>
		</label>
	</div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

const { locale, setLocale } = useI18n();

const currentLang = ref<string>('');
const isOpenMenu = ref<HTMLDivElement | null>(null);
const itIsOpen = ref<boolean>(false);
const menuTrigger = ref<HTMLInputElement | null>(null);

const handleHideDropdown = (e: Event) => {
	isOpenMenu.value?.classList.remove('isOpen');
	isOpenMenu.value?.classList.add('isClosed');
	itIsOpen.value = false;
	if (menuTrigger.value && e.target && e.target instanceof HTMLElement) {
		e.target.className !== 'isMenuTrigger'
			? (menuTrigger.value.checked = false)
			: null;
	}
};

onMounted(() => {
	currentLang.value = localStorage.getItem('KPoster_selected-language') || '';
	document.addEventListener('click', handleHideDropdown);
});

const menuToggle = (e: Event) => {
	const target = e.target as HTMLInputElement;
	if (!itIsOpen.value && target.checked) {
		isOpenMenu.value?.classList.remove('isClosed');
		isOpenMenu.value?.classList.add('isOpen');
		itIsOpen.value = true;
	} else if (itIsOpen.value && !target.checked) {
		isOpenMenu.value?.classList.remove('isOpen');
		isOpenMenu.value?.classList.add('isClosed');
		itIsOpen.value = false;
	}
};

const closeMenu = () => {
	isOpenMenu.value?.classList.remove('isOpen');
	isOpenMenu.value?.classList.add('isClosed');
	itIsOpen.value = false;
};

const availableLanguages = [
	{ item_title: 'Español', item_UID: 'es_id', item_value: 'es' },
	{ item_title: 'English', item_UID: 'en_id2', item_value: 'en' },
	{ item_title: 'Русский', item_UID: 'ru_id3', item_value: 'ru' },
	{ item_title: 'Quechua', item_UID: 'qu_id4', item_value: 'qu' },
	{ item_title: '中國人', item_UID: 'zh_id5', item_value: 'zh' },
];

watch(currentLang, (newLang) => {
	localStorage.setItem('KPoster_selected-language', newLang);
	setLocale(newLang);
});

onBeforeUnmount(() => {
	document.removeEventListener('click', handleHideDropdown);
});
</script>

<style scoped lang="scss">
// checkbox scss -----------------------------------------------

.checkbox-wrapper {
	display: flex;
	align-items: center;
	* {
		box-sizing: border-box;

		&:after,
		&:before {
			box-sizing: border-box;
		}
	}

	input {
		position: absolute;
		opacity: 0;

		&:checked + label svg path {
			stroke-dashoffset: 0;
		}

		&:focus + label {
			transform: scale(1.03);
		}

		+ label {
			display: block;
			border: 2px solid rgb(35, 33, 33);
			width: var(--size);
			height: var(--size);
			border-radius: 50%;
			cursor: pointer;
			transition: all 0.2s ease;

			&:active {
				transform: scale(1.05);
				border-radius: 12px;
			}

			svg {
				pointer-events: none;
				padding: 13%;

				path {
					fill: none;
					stroke: rgb(35, 33, 33);
					stroke-width: 7px;
					stroke-linecap: round;
					stroke-linejoin: round;
					stroke-dasharray: 100;
					stroke-dashoffset: 101;
					transition: all 250ms cubic-bezier(1, 0, 0.37, 0.91);
				}
			}
		}
	}
}

// dropDown menu scss ------------------------------------------

.popup {
	--burger-line-width: 50px;
	--burger-line-height: 50px;
	--burger-bg: #eeeeee;
	--burger-color: #353333;
	--burger-line-border-radius: 0.1875em;
	--burger-diameter: 30px;
	--burger-btn-border-radius: calc(var(--burger-diameter) / 2);
	--burger-line-transition: 0.3s;
	--burger-transition: all 0.1s ease-in-out;
	--burger-active-scale: 0.95;
	--burger-enable-outline-color: var(--burger-bg);
	--burger-enable-outline-width: 0.125em;
	--burger-enable-outline-offset: var(--burger-enable-outline-width);

	/* nav */
	--nav-padding-x: 0.25em;
	--nav-padding-y: 0.625em;
	--nav-border-radius: 20px;
	--nav-border-color: #9b9494;
	--nav-border-width: 1px;
	--nav-bg: #f6f6f6;
	--nav-font-family: 'Poppins', sans-serif;
	--nav-default-scale: 0.8;
	--nav-active-scale: 1;
	--nav-position-left: 0;
	--nav-position-right: unset;

	/* title */
	--nav-title-size: 0.625em;
	--nav-title-color: #777;
	--nav-title-padding-x: 1rem;
	--nav-title-padding-y: 0.25em;

	/* nav button */
	--nav-button-padding-x: 1rem;
	--nav-button-padding-y: 0.375em;
	--nav-button-border-radius: 0.375em;
	--nav-button-font-size: 17px;
	--nav-button-distance: 0.875em;
	--nav-button-text-color: #353333;

	/* underline */
	--underline-border-width: 0.0625em;
	--underline-border-color: #ccc;
	--underline-margin-y: 0.3125em;
	display: inline-block;
	text-rendering: optimizeLegibility;
	width: 100%;
	height: 100%;

	input {
		display: none;
	}
}

/* popup settings 👆 */

.dropDown__container {
	width: 100px;
	display: flex;
	align-items: center;
	position: relative;
}

.dropdown__title {
	width: fit-content;
	display: flex;
	font-size: 18px;
	line-height: 28px;
	justify-content: space-between;
	align-items: center;
	border-radius: 30px;
	background-color: #f6f6f6;
	height: 50px;
	padding: 5px 20px 5px 20px;
}

.burger {
	display: flex;
	position: relative;
	align-items: center;
	justify-content: space-around;
	background: var(--burger-bg);
	width: 100%;
	height: 100%;
	padding: 0 13px 0 13px;
	border-radius: var(--burger-diameter);
	cursor: pointer;
	overflow: hidden;
	transition: var(--burger-transition);
	outline-offset: 0;

	span {
		padding-top: 5px;
	}
}

.popup-window {
	transform: scale(var(--nav-default-scale));
	visibility: hidden;
	opacity: 0;
	z-index: 2;
	min-width: 175px;
	width: 100%;
	position: absolute;
	padding: var(--nav-padding-y) var(--nav-padding-x);
	background: var(--nav-bg);
	font-family: var(--nav-font-family);
	color: var(--nav-text-color);
	border-radius: var(--nav-border-radius);
	-webkit-box-shadow: 0px 0px 29px -9px rgba(34, 60, 80, 0.2);
	-moz-box-shadow: 0px 0px 29px -9px rgba(34, 60, 80, 0.2);
	box-shadow: 0px 0px 29px -9px rgba(34, 60, 80, 0.2);
	top: 30px;
	right: 0;
	transition: var(--burger-transition);
	margin-top: 35px;

	legend {
		padding: var(--nav-title-padding-y) var(--nav-title-padding-x);
		margin: 0;
		color: var(--nav-title-color);
		font-size: var(--nav-title-size);
		text-transform: uppercase;
	}

	ul {
		margin: 0;
		padding: 0;
		list-style-type: none;

		button {
			outline: none;
			width: 100%;
			border: none;
			background: none;
			display: flex;
			align-items: center;
			color: var(--burger-color);
			font-size: var(--nav-button-font-size);
			padding: var(--nav-button-padding-y) var(--nav-button-padding-x);
			white-space: nowrap;
			border-radius: var(--nav-button-border-radius);
			cursor: pointer;
			column-gap: var(--nav-button-distance);
		}
	}

	hr {
		margin: var(--underline-margin-y) 0;
		border: none;
		border-bottom: var(--underline-border-width) solid
			var(--underline-border-color);
	}

	div.checkbox-container {
		padding-left: 15px;
		display: flex;
		align-items: center;

		.radioLabel {
			font-size: 18px;
			margin-left: 15px;
			font-weight: 400;
			cursor: pointer;
			padding-right: 15px;
			padding-top: 6px;
			line-height: 28px;
			color: var(--nav-button-text-color);

			font-family: 'NeuethingSans-MediumExpanded';
		}
	}
}

/* actions */

.burger {
	&:active {
		transform: scale(var(--burger-active-scale));
	}

	&:focus:not(:hover) {
		outline-color: var(--burger-enable-outline-color);
		outline-offset: var(--burger-enable-outline-offset);
	}
}

.popup input:checked {
	~ nav {
		transform: scale(var(--nav-active-scale));
		visibility: visible;
		opacity: 1;
	}
}

.popup-window input:checked {
	~ nav {
		visibility: hidden;
		opacity: 0;
	}
}

.isOpen {
	transform: scale(var(--nav-active-scale)) !important;
	visibility: visible !important;
	opacity: 1 !important;
}

.isClosed {
	transform: scale(var(--nav-default-scale)) !important;
	visibility: hidden !important;
	opacity: 0 !important;
}
</style>
