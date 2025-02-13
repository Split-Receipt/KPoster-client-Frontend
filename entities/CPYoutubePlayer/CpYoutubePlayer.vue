<script setup lang="ts">
import { getYouTubeVideoId } from '@shared/helpers/getYouTubeVideoId';
import { ref, onMounted } from 'vue';
interface Props {
	videoUrl: string;
}

const props = defineProps<Props>();
const player = ref(null);

const videoError = ref(false);

const videoId = computed(() => {
	return getYouTubeVideoId(props.videoUrl);
});

const loadYouTubePlayer = () => {
	const tag = document.createElement('script');

	tag.src = 'https://www.youtube.com/iframe_api';
	const firstScriptTag = document.getElementsByTagName('script')[0];
	if (!firstScriptTag.parentNode) {
		return;
	}
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	window.onYouTubeIframeAPIReady = function () {
		player.value = new window.YT.Player('youtube-player', {
			videoId: videoId.value,
			events: {
				onError: (event) => {
					console.error('Ошибка загрузки видео:', event.data);
					videoError.value = true;
				},
			},
		});
	};
};

// Загружаем YouTube API
onMounted(() => {
	const script = document.createElement('script');
	script.src = 'https://www.youtube.com/iframe_api';
	script.async = true;
	document.body.appendChild(script);
	script.onload = loadYouTubePlayer;
});
</script>

<template>
	<div>
		<div v-if="videoError" class="video-player">
			<p>
				⚠ Видео не найдено или недоступно. Возможно выбран неверный формат
				ссылки
			</p>
		</div>
		<div v-else id="youtube-player" class="video-player" />
	</div>
</template>

<style scoped lang="scss">
.video-player iframe {
	width: 100%;
}
</style>
