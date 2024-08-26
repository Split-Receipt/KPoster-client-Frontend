<template>
	<div class="dragNdrop">
		<div
			v-if="!isSizeError && !isExpectedTypeError && !isExtensionError"
			class="dragNdrop__container"
			v-bind="getRootProps()"
		>
			<input v-bind="getInputProps()" />
			<p v-if="isDragActive">{{ $t('file_drop') }}</p>
			<div v-if="chosenFile && !isDragActive" class="dragNdrop__loaded">
				<div class="dragNdrop__preview">
					<img
						v-if="isImage"
						:src="previewUrl ? previewUrl : undefined"
						alt="Preview"
						class="preview-image"
					/>
					<span v-if="isApplication" class="preview-application" />
					<video v-if="isVideo" class="preview-video" controls>
						<source
							:src="previewUrl ? previewUrl : undefined"
							:type="chosenFile.type"
						/>
					</video>
					<cp-button
						v-if="chosenFile"
						width="short"
						size="small"
						shape="oval"
						color="yellowGrey"
						:text="$t('clear')"
						@click="clearInput"
					/>
				</div>
				<div class="dragNdrop__info">
					<audio v-if="isAudio" class="preview-audio" controls>
						<source
							:src="previewUrl ? previewUrl : undefined"
							:type="chosenFile.type"
						/>
					</audio>
					<span>{{ chosenFile.name }}</span>
					<p v-if="chosenFile.size < 1000000">
						{{ `${(chosenFile.size / 1000).toFixed(2)} KB` }}
					</p>
					<p v-if="chosenFile.size > 1000000">
						{{ `${(chosenFile.size / 1000000).toFixed(2)} MB` }}
					</p>
				</div>
			</div>
			<div v-if="!isDragActive && !chosenFile" class="dragNdrop__title">
				<span>
					{{ $t('drag_n_drop') }}
				</span>
				<p v-if="props.type == 'image'">
					{{ $t('dnd_imageUpload') }}
					{{ $t('dnd_upTo') }} {{ props.maxSize }} mb <br />
					{{ $t('dnd_resolution_min') }} 800*900 <br />
					{{ $t('dnd_resolution_max') }} 4000*3000
				</p>
				<p v-if="props.type == 'video'">
					{{ $t('dnd_videoUpload') }}
					{{ $t('dnd_upTo') }} {{ props.maxSize }} MB <br />
					Resolution at least 800*900 <br />
					Maximum 4000*3000
				</p>
				<p v-if="props.type == 'audio'">
					{{ $t('dnd_audioUpload') }} up to {{ props.maxSize }} MB
				</p>
				<p v-if="props.type == 'application'">
					{{ $t('dnd_applicationUpload') }} up to {{ props.maxSize }} MB
				</p>
			</div>
		</div>
		<div
			v-if="isSizeError || isExpectedTypeError || isExtensionError"
			class="dragNdrop__error"
		>
			<p v-if="isSizeError">{{ $t('size_exceeded') }}</p>
			<p v-if="isExpectedTypeError">{{ $t('file_dropTypeError') }}</p>
			<p v-if="isExtensionError">
				{{ $t('file_extenisionError') }}: <br />
				<span v-for="(ext, i) in props.extensions" :key="i">
					{{ ext }}&nbsp;/
				</span>
			</p>
		</div>
	</div>
</template>

<script setup lang="ts">
import CpButton from './CpButton.vue';
import { useDropzone } from 'vue3-dropzone';
import { ref, computed } from 'vue';

interface DnDProps {
	type: string;
	maxSize: number;
	extensions?: string[];
}

type Events = {
	(event: 'update:modelValue', eventData: File | null): void;
};

const props = defineProps<DnDProps>();
const emit = defineEmits<Events>();

const chosenFile = ref<File | null>(null);
const previewUrl = ref<string | null>(null);
const maxFileSize: number = props.maxSize * 1048576;
const isSizeError = ref<boolean>(false);
const isExpectedTypeError = ref<boolean>(false);
const isExtensionError = ref<boolean>(false);

// expected types: image | video | audio | application
// expected extensions: mp3 | wav | mpeg | mp4 | svg | png | jpeg | jpg | pdf

const isImage = computed(() => {
	return chosenFile.value && chosenFile.value.type.startsWith('image/');
});

const isVideo = computed(() => {
	return chosenFile.value && chosenFile.value.type.startsWith('video/');
});

const isAudio = computed(() => {
	return chosenFile.value && chosenFile.value.type.startsWith('audio/');
});

const isApplication = computed(() => {
	return (
		chosenFile.value &&
		!chosenFile.value.type.startsWith('image/') &&
		!chosenFile.value.type.startsWith('video/') &&
		!chosenFile.value.type.startsWith('audio/')
	);
});

const onDrop = (acceptedFiles: File[]) => {
	const file = acceptedFiles[0];

	if (file.size > maxFileSize) {
		isSizeError.value = true;
		setTimeout(() => {
			isSizeError.value = false;
		}, 2000);

		return;
	}
	if (!file.type.startsWith(`${props.type}/`)) {
		isExpectedTypeError.value = true;
		setTimeout(() => {
			isExpectedTypeError.value = false;
		}, 2000);

		return;
	}
	if (props.extensions && !props.extensions.includes(file.type.split('/')[1])) {
		isExtensionError.value = true;
		setTimeout(() => {
			isExtensionError.value = false;
		}, 2000);

		return;
	}

	chosenFile.value = acceptedFiles[0];
	previewUrl.value = URL.createObjectURL(chosenFile.value);

	emit('update:modelValue', chosenFile.value);
};

const clearInput = (e: Event) => {
	e.stopPropagation();
	chosenFile.value = null;
	previewUrl.value = null;
	emit('update:modelValue', null);
};

const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
</script>

<style scoped lang="scss">
.dragNdrop {
	box-sizing: border-box;
	// padding: 15px;
	position: relative;
	width: 800px;
	height: 250px;

	&__container {
		overflow: auto;
		display: flex;
		align-items: center;
		justify-content: space-around;
		background-color: #f6f6f6;
		cursor: pointer;
		padding: 10px 15px 10px 15px;
		width: 100%;
		height: 100%;
		border: 2px dashed #9b9494;
		border-radius: 40px;
	}

	&__error {
		overflow: auto;
		display: flex;
		align-items: center;
		justify-content: space-around;
		background-color: #f6f6f6;
		cursor: pointer;
		padding: 10px;
		width: 100%;
		height: 200px;
		color: crimson;
		border: 2px dashed crimson;
		border-radius: 40px;

		p {
			text-align: center;
		}
	}

	&__preview {
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		height: 100%;
		width: 40%;
	}

	&__title {
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-evenly;

		span {
			text-align: center;
			color: #353333;
			font-size: 22px;
		}

		p {
			font-size: 18px;
			text-align: center;
			color: #888888;
		}
	}

	.preview {
		border-radius: 30px;
		position: absolute;
		top: 0;
		left: 0;

		&-image {
			width: 120px;
			height: 115px;
			border-radius: 30px;
			position: absolute;
			top: 0;
			left: 0;
		}

		&-video {
			width: 200px;
			height: 115px;
			border-radius: 30px;
			position: absolute;
			top: 0;
			left: 0;
		}

		&-audio {
			width: 100%;
			padding: 0 15px 0 15px;
			height: 50px;
			border-radius: 30px;
			position: absolute;
			bottom: 0;
			right: 0;
		}

		&-application {
			width: 120px;
			height: 115px;
			background-image: url('/public/images/application-preview.svg');
			background-size: cover;
			background-repeat: no-repeat;
			border-radius: 30px;
			position: absolute;
			top: 0;
			left: 0;
		}
	}

	&__info {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: space-evenly;
		width: 60%;
		height: 100%;

		span {
			color: #353333;
			font-size: 22px;
			width: 100%;
			text-align: center;
		}

		p {
			width: 100%;
			font-size: 18px;
			text-align: center;
			width: 100%;
			color: #888888;
		}
	}

	&__loaded {
		display: flex;
		align-items: center;
		width: 100%;
		height: 100%;
	}
}
</style>
