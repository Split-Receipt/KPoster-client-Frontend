<template>
	<div v-if="props.isSpinned" class="spinner">
		<div class="spinner__loader">
			<div class="spinner__load1" />
			<div class="spinner__load2" />
			<div class="spinner__load3" />
			<div class="spinner__load4" />
			<div class="spinner__load5" />
			<div class="spinner__load6" />
			<div class="spinner__load7" />
			<div class="spinner__load8" />
			<div class="spinner__load9" />
		</div>
	</div>
</template>

<script setup lang="ts">
type SpinnerProps = {
	isSpinned: boolean;
};
const props = defineProps<SpinnerProps>();
</script>

<style scoped lang="scss">
.spinner {
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 9999;
	position: fixed;
	background-color: #fff;

	&__loader {
		display: flex;
		align-items: center;
		position: absolute;
		left: 50%;
		top: 50%;
	}

	&__load1 {
		position: absolute;
		content: '';
		margin-right: 1em;
		height: 1.2em;
		width: 1.2em;
		border-radius: 5px;
		background-color: #888888;
		box-shadow: 0 1px 7px rgba(0, 0, 0, 0.3);
	}

	&__load2 {
		position: absolute;
		margin-right: 1em;
		content: '';
		height: 1.2em;
		width: 1.2em;
		border-radius: 5px;
		background-color: #888888;
		animation: 2s flow2 infinite;
	}

	&__load3 {
		position: absolute;
		margin-right: 1em;
		content: '';
		height: 1.2em;
		width: 1.2em;
		border-radius: 5px;
		background-color: #888888;
		animation: 2s flow3 infinite;
	}

	&__load4 {
		position: absolute;
		margin-right: 1em;
		content: '';
		height: 1.2em;
		width: 1.2em;
		border-radius: 5px;
		background-color: #888888;
		animation: 2s flow4 infinite;
	}

	&__load5 {
		position: absolute;
		margin-right: 1em;
		content: '';
		height: 1.2em;
		width: 1.2em;
		border-radius: 5px;
		background-color: #888888;
		animation: 2s flow5 infinite;
	}

	&__load6 {
		position: absolute;
		margin-right: 1em;
		content: '';
		height: 1.2em;
		width: 1.2em;
		border-radius: 5px;
		background-color: #888888;
		animation: 6s flow6 infinite;
	}

	&__load7 {
		position: absolute;
		margin-right: 1em;
		content: '';
		height: 1.2em;
		width: 1.2em;
		border-radius: 5px;
		background-color: #888888;
		animation: 6s flow7 infinite;
	}

	&__load8 {
		position: absolute;
		margin-right: 1em;
		content: '';
		height: 1.2em;
		width: 1.2em;
		border-radius: 5px;
		background-color: #888888;
		animation: 6s flow8 infinite;
	}

	&__load9 {
		position: absolute;
		content: '';
		height: 1.2em;
		width: 1.2em;
		border-radius: 5px;
		background-color: #888888;
		animation: 6s flow9 infinite;
	}
}

@keyframes flow2 {
	50% {
		transform: translateX(3em);
		box-shadow: 0 1px 7px rgba(0, 0, 0, 0.3);
	}

	100% {
		transform: translateX(0em);
	}
}

@keyframes flow3 {
	50% {
		transform: translateX(-3em);
		box-shadow: 0 1px 7px rgba(0, 0, 0, 0.3);
	}

	100% {
		transform: translateX(0em);
	}
}

@keyframes flow4 {
	50% {
		transform: translateY(3em);
		box-shadow: 0 1px 7px rgba(0, 0, 0, 0.3);
	}

	100% {
		transform: translateY(0em);
	}
}

@keyframes flow5 {
	50% {
		transform: translateY(-3em);
		box-shadow: 0 1px 7px rgba(0, 0, 0, 0.3);
	}

	100% {
		transform: translateY(0em);
	}
}

@keyframes flow6 {
	30% {
		transform: translateX(3em);
		box-shadow: 0 1px 7px rgba(0, 0, 0, 0.3);
	}

	60% {
		transform: translateX(3em) translateY(-3em);
		box-shadow: 0 1px 7px rgba(0, 0, 0, 0.3);
	}

	100% {
		transform: translateX(0em) translateY(0em);
	}
}

@keyframes flow7 {
	30% {
		transform: translateX(-3em);
		box-shadow: 0 1px 7px rgba(0, 0, 0, 0.3);
	}

	60% {
		transform: translateX(-3em) translateY(3em);
		box-shadow: 0 1px 7px rgba(0, 0, 0, 0.3);
	}

	100% {
		transform: translateX(0em) translateY(0em);
	}
}

@keyframes flow8 {
	30% {
		transform: translateY(3em);
		box-shadow: 0 1px 7px rgba(0, 0, 0, 0.3);
	}

	60% {
		transform: translateY(3em) translateX(3em);
		box-shadow: 0 1px 7px rgba(0, 0, 0, 0.3);
	}

	100% {
		transform: translateX(0em) translateY(0em);
	}
}

@keyframes flow9 {
	30% {
		transform: translateY(-3em);
		box-shadow: 0 1px 7px rgba(0, 0, 0, 0.3);
	}

	60% {
		transform: translateY(-3em) translateX(-3em);
		box-shadow: 0 1px 7px rgba(0, 0, 0, 0.3);
	}

	100% {
		transform: translateX(0em) translateY(0em);
	}
}
</style>
