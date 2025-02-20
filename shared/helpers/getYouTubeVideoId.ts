export const getYouTubeVideoId = (link: string) => {
		const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
		const match = link.match(regex);

		return match ? match[1] : null;
};
