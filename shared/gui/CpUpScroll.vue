<template>
	<a v-show="upScrollShow" :href="`#${props.upSideId}`" class="upScroll">
		<nuxt-img class="upScroll__arrowImg" src="../public/images/arrowUp.svg" />
	</a>
</template>

<script setup lang="ts">
type upSideProps = {
	upSideId: string;
};

const props = defineProps<upSideProps>();
const upScrollShow = ref<boolean>(false);

const windowPositionScan = () => {
	window.scrollY > 5
		? (upScrollShow.value = true)
		: (upScrollShow.value = false);
};

onMounted(() => {
	window.addEventListener('scroll', windowPositionScan);
});

onUnmounted(() => {
	window.removeEventListener('scroll', windowPositionScan);
});
</script>

<style scoped lang="scss">
.upScroll {
	display: flex;
	align-items: center;
	justify-content: space-evenly;
	z-index: 2;

	width: 50px;
	height: 50px;
	position: fixed;
	border-radius: 50%;
	background: $button-gradient-background-color;
	bottom: 15px;
	cursor: pointer;
	right: 15px;
	padding: 10px;

	&__arrowImg {
		width: 100%;
		height: 100%;
		cursor: pointer;
	}
}
</style>
