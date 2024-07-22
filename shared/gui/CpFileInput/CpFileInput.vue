<template>
	<div
		class="file-input"
		:class="{ 'file-input_is-dragover': isDragOver }"
		@dragover.prevent="handleDragOver"
		@dragleave.prevent="handleDragLeave"
		@drop.prevent="handleDrop"
		@click="triggerFileInput"
	>
		<input
			ref="fileInput"
			type="file"
			class="file-input_hidden"
			@change="handleFiles"
		/>
		<cp-button
			v-if="!fileName"
			text="Select file"
			color="transparent"
			shape="oval"
			class="file-input__upload-button"
		/>
		<p v-if="!fileName" class="file-input__title">Drag and drop</p>
		<p v-else>{{ fileName }}</p>
	</div>
</template>

<script lang="ts" setup>
import CpButton from '@shared/gui/CpButton.vue';
const fileInput = ref(null);
const isDragOver = ref(false);
const fileName = ref('');
const isLoading = ref(false);

const handleDragOver = () => {
	isDragOver.value = true;
};

const handleDragLeave = () => {
	isDragOver.value = false;
};

const handleDrop = (event) => {
	isDragOver.value = false;
	const files = event.dataTransfer.files;
	handleFiles({ target: { files } });
};

const triggerFileInput = () => {
	fileInput.value.click();
};

const handleFiles = (event) => {
	const files = event.target.files;
	if (files.length > 0) {
		isLoading.value = true;
		fileName.value = files[0].name;
	}
};
</script>

<style scoped lang="scss">
.file-input {
	padding: 20px;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	border-radius: 20px;
	background-color: $white;

	&__title {
		display: none;
		color: $gray;
		@media #{$screen-desktop} {
			display: block;
		}
	}

	&__upload-button {
		@media #{$screen-desktop} {
			display: none;
		}
	}

	&_hidden {
		display: none;
	}

	&_is-dragover {
		border-color: #000;
	}
}
</style>
