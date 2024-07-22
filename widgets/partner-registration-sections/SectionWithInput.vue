<template>
	<h2>{{ config.title }}</h2>
	<p>
		{{ config.description }}
	</p>
	<cp-input
		v-for="(inputElement, index) of config.inputs"
		:key="index"
		:placeholder="inputElement.placeholder"
		:label="inputElement.label"
		:name="inputElement.inputName"
		v-bind="inputElement.additionalAttrs"
	/>
	<cp-button
		v-for="button of config.buttons"
		:key="button.buttonText"
		:text="button.buttonText"
		shape="oval"
		:color="button.color"
		v-bind="button.additionalAttrs"
		@click="(event) => $emit('click', event)"
	/>
</template>

<script lang="ts" setup>
type Props = {
	config: {
		blockCode: string;
		title: string;
		description: string;
		inputs: {
			inputName?: string;
			placeholder: string;
			label?: string;
			additionalAttrs?: any;
		}[];
		buttons: {
			buttonText: string;
			color: string;
			additionalAttrs?: any;
		}[];
	};
};

type Events = {
	(event: 'click', eventData: any): void;
};

defineProps<Props>();
defineEmits<Events>();
</script>
