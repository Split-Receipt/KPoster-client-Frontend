<template>
	<div class="dropdown">
		<div class="dropdown__title">{{ dropDownLabel }}</div>
		<div tabindex="0" class="dropdown__icon" @click="showList = !showList">
			<input type="checkbox" />
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
		<label class="popup" :class="{ 'popup--shown': showList }">
			<nav class="popup__window">
				<div v-for="option in getDataForChekboxes" :key="option.id" class="checkbox-container">
					<cp-check-box
						:option="option"
						@change="dataToFilter"
					/>
				</div>
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

const showList = ref(false);

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
.dropdown {
	display: flex;
	align-items: center;
	position: relative;

	&__title {
		min-width: 205px;
		display: flex;
		font-size: 18px;
		justify-content: space-between;
		align-items: center;
		border-radius: 30px;
		height: 50px;
		padding: $button-default-padding;
		box-shadow: $card-shadow;
	}

	&__icon {
		display: flex;
		position: relative;
		align-items: center;
		justify-content: center;
		width: 45px;
		height: 45px;
		border-radius: 100%;
		cursor: pointer;
		transition: var(--burger-transition);
		outline-offset: 0;
		box-shadow: $card-shadow;

			&:hover {
				transform: scale(1.05);
			}

			&:active {
				transform: scale(0.95);
			}
		
	}

	.popup input:checked + .dropdown__icon svg {
		transform: rotate(180deg);
	}
	input {
		display: none;
	}	

	.popup {
		opacity: 0;
		min-width: 250px;
		position: absolute;
		top: 60px;
		background: $white;
		z-index: 10;
		padding: 10px;
		border-radius: 20px;
		-webkit-box-shadow: 0px 0px 29px -9px rgba(34, 60, 80, 0.2);
		-moz-box-shadow: 0px 0px 29px -9px rgba(34, 60, 80, 0.2);
		box-shadow: 0px 0px 29px -9px rgba(34, 60, 80, 0.2);
		overflow: hidden;
		&__window {
			overflow: scroll;
		}

		&--shown {
			opacity: 1;
			transition: opacity .2s ease-in-out;
		}
	}
}
</style>
