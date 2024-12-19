<template>
	<div class="dropDown__container">
		<div class="dropdown__title">{{ dropDownLabel }}</div>
		<label class="popup">
			<input type="checkbox" />
			<div tabindex="0" class="burger">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="icon icon-tabler icon-tabler-chevron-down"
					width="35"
					height="35"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="#353333"
					fill="none"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path stroke="none" d="M0 0h24v24H0z" fill="none" />
					<path d="M6 9l6 6l6 -6" class="rotate" />
				</svg>
			</div>
			<nav class="popup-window">
				<ul>
					<li v-for="option in getDataForChekboxes" :key="option.id">
						<div class="checkbox-container">
							<cp-check-box
								:option="option"
								@change="dataToFilter"
							/>
						</div>
					</li>
				</ul>
			</nav>
		</label>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Option {
	item_title: string;
	item_UID: string;
	item_value: string;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
	locale: string;
}

interface Props {
	dropDownLabel: string;
	options: Option[];
	value: string[];
}

type Events = {
	(event: 'update:modelValue', eventData: string[]): void;
};

const props = defineProps<Props>();
const emit = defineEmits<Events>();

const dataArray = ref<string[]>(props.value || []);

const getDataForChekboxes = computed(() => {
	return props.options.map((option) => {
		return {
			id: option.item_UID,
			label: option.item_title,
			value: option.item_value,
		};
	});
});

const dataToFilter = (event: Event) => {
	const target = event.target as HTMLInputElement;
	const data = target.checked ? target.value : '';

	if (target.checked) {
		data ? dataArray.value.push(data) : null;
	} else {
		dataArray.value = dataArray.value.filter((e) => e !== target.value);
	}

	emit('update:modelValue', dataArray.value);
};
</script>

<style scoped lang="scss">
// dropDown menu scss ------------------------------------------

.popup {
	--burger-line-width: 50px;
	--burger-line-height: 50px;
	--burger-bg: #fff;
	--burger-color: #353333;
	--burger-line-border-radius: 0.1875em;
	--burger-diameter: 3.125em;
	--burger-btn-border-radius: calc(var(--burger-diameter) / 2);
	--burger-line-transition: 0.3s;
	--burger-transition: all 0.1s ease-in-out;
	--burger-hover-scale: 1.05;
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
	--nav-bg: #fff;
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

	input {
		display: none;
	}
}

/* popup settings 👆 */

.dropDown__container {
	display: flex;
	align-items: center;
	width: fit-content;
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
	height: 50px;
	padding: $button-default-padding;
	box-shadow: $card-shadow;
}

.burger {
	display: flex;
	position: relative;
	align-items: center;
	justify-content: center;
	width: var(--burger-diameter);
	height: var(--burger-diameter);
	border-radius: var(--burger-btn-border-radius);
	cursor: pointer;
	overflow: hidden;
	transition: var(--burger-transition);
	outline-offset: 0;
	box-shadow: $card-shadow;
}

.popup input:checked + .burger svg {
	transform: rotate(180deg);
}

.popup-window {
	overflow: scroll;
	transform: scale(var(--nav-default-scale));
	visibility: hidden;
	opacity: 0;
	z-index: 2;
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
	top: calc(
		var(--burger-diameter) + var(--burger-enable-outline-width) +
			var(--burger-enable-outline-offset)
	);
	left: var(--nav-position-left);
	right: var(--nav-position-right);
	transition: var(--burger-transition);
	margin-top: 0;

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

		li {
			&:nth-child(1) svg,
			&:nth-child(2) svg {
				color: #00bf63;
			}

			&:nth-child(4) svg,
			&:nth-child(5) svg {
				color: rgb(153, 153, 153);
			}

			&:nth-child(7) svg {
				color: red;
			}
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

		span {
			font-size: 16px;
			margin-left: 15px;
			padding-right: 15px;
			padding-top: 5px;
			line-height: 28px;
			color: var(--nav-button-text-color);

			font-family: 'NeuethingSans-MediumSemiExpanded';
		}
	}
}

/* actions */

.burger {
	&:hover {
		transform: scale(var(--burger-hover-scale));
	}

	&:active {
		transform: scale(var(--burger-active-scale));
	}

	&:focus:not(:hover) {
		outline-color: var(--burger-enable-outline-color);
		outline-offset: var(--burger-enable-outline-offset);
	}
}

.popup input:checked {
	+ .burger span {
		&:nth-child(1) {
			top: 50%;
			transform: translateY(-50%) rotate(45deg);
		}

		&:nth-child(2) {
			bottom: 50%;
			transform: translateY(50%) rotate(-45deg);
		}

		&:nth-child(3) {
			transform: translateX(
				calc(var(--burger-diameter) * -1 - var(--burger-line-width))
			);
		}
	}

	~ nav {
		transform: scale(var(--nav-active-scale));
		visibility: visible;
		opacity: 1;
	}
}
</style>
