<template>
	<div ref="infoBlock" class="popup">
		<nuxt-img :id="props.id" class="trigger" src="../public/images/info.svg" />
		<span v-show="isShown" class="popup__title">{{ props.info }}</span>
	</div>
</template>

<script setup lang="ts">
const props = defineProps<popUpprops>();
const isShown = ref<boolean>(false);
const infoBlock = ref<HTMLElement | null>(null);

type popUpprops = {
	id: string;
	info: string;
};
const handlePopUpTrigger = (e: Event) => {
	const target = e.target as HTMLElement;

	if (target.id === props.id) {
		isShown.value = true;
	} else {
		isShown.value = false;
	}
};

onMounted(() => {
	document.addEventListener('mouseover', handlePopUpTrigger);
});

onUnmounted(() => {
	document.removeEventListener('mouseover', handlePopUpTrigger);
});
</script>

<style scoped lang="scss">
.popup {
	position: relative;
	display: inline-block;
	margin-left: 5px;
	width: 30px;
	height: 30px;

	.trigger {
		cursor: pointer;
		width: 30px;
		height: 30px;
		margin-bottom: -6px;
	}

	&__title {
		min-width: 200px;
		max-width: 450px;
		width: auto;
		text-align: left;
		color: #888888;
		font-size: 16px;
		background-color: #f6f6f6;
		border: 1px solid #ccc;
		padding: 10px;
		border-radius: 0 15px 15px 15px;
		z-index: 2;
		position: absolute;
		top: 25px;
		left: 25px;
		-webkit-box-shadow: 0px 0px 29px -9px rgba(34, 60, 80, 0.2);
		-moz-box-shadow: 0px 0px 29px -9px rgba(34, 60, 80, 0.2);
		box-shadow: 0px 0px 29px -9px rgba(34, 60, 80, 0.2);
	}
}
</style>
