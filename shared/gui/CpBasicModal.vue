<template>
	<div v-if="show" class="modal">
		<!-- ToDo separate modal window -->
		<div
			ref="permitModal"
			:class="['modal-window', { 'modal-window_fit-content': fitContent }]"
		>
			<button
				v-if="!fitContent"
				type="button"
				class="modal-window-close"
				@click="modaHandleClose"
			/>
			<span v-else class="modal-window-close_fit-content" @click="modaHandleClose"/>
			<div
				:class="[
					'modal-window-content',
					{ 'modal-window-content_fit-content': fitContent },
				]"
			>
				<slot
					name="content"
					@data-sended="(value: any) => modalInnerData = value"
				/>
				<div v-if="!fitContent" class="modal-window-content-controls">
					<cp-button
						v-if="acceptButton"
						class="modal-window-content-controls-accept"
						width="maxWidth"
						size="small"
						shape="oval"
						color="yellowGrey"
						:text="$t('yes')"
						@click="modalHandleAccept"
					/>
					<cp-button
						v-if="cancelButton"
						class="modal-window-content-controls-decline"
						width="maxWidth"
						size="small"
						shape="oval"
						color="transparent"
						:text="$t('no')"
						@click="modaHandleClose"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { onClickOutside, useScrollLock } from '@vueuse/core';

const props = withDefaults(defineProps<Props>(), {
	acceptButton: true,
	cancelButton: true,
	fitContent: false,
});

const emit = defineEmits<Events>();
const element = ref<HTMLElement | null>(null);
const isLocked = useScrollLock(element);
type Props = {
	fitContent?: boolean;
	show: boolean;
	acceptButton?: boolean;
	cancelButton?: boolean;
};

watch(
	() => props.show,
	(value) => {
		if (value) {
			isLocked.value = true;
		} else {
			isLocked.value = false;
		}
	}
);

onMounted(() => {
	element.value = document.body;
});

type Events = {
	(event: 'close' | 'accept', data: any): void;
};
const permitModal = ref(null);
const modalInnerData = ref<any>(null);
const modalHandleAccept = () => {
	if (modalInnerData.value) {
		emit('accept', modalInnerData.value);
	}
	emit('accept', true);
};

const modaHandleClose = () => {
	emit('close', false);
};

onClickOutside(permitModal, () => modaHandleClose());
</script>

<style lang="scss" scoped>
.modal {
	position: fixed;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0 20px 0 20px;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	z-index: 998;
	background-color: rgb(0 0 0 / 0.2);

	&-window {
		position: relative;
		padding: 15px;
		background: $white;
		border-radius: 20px;
		max-width: 90vw;

		@media #{$screen-tablet} {
			max-width: 70vw;
		}

		@media #{$screen-desktop} {
			padding: 30px;
			max-width: 45vw;
		}

		&_fit-content {
			height: auto;
			padding: 0;

			@media screen and (max-width: 575px) {
				height: auto !important;
				padding: 0px !important;
				min-height: unset;
			}
		}

		&-close {
			position: absolute;
			right: 10px;
			top: 10px;
			height: 25px;
			width: 25px;
			border-radius: 50%;
			color: $black;
			font-size: 16px;
			font-weight: 700;
			z-index: 999;
			border: 1px solid $black;
			background-color: #fff;
			cursor: pointer;

			@media #{$screen-tablet} {
				height: 30px;
				width: 30px;
			}

			@media #{$screen-desktop} {
				font-size: 18px;
				height: 35px;
				width: 35px;
			}

			&::before {
				content: '⨉';
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
			}

			&_fit-content {
				position: absolute;
				border-radius: 50%;
				right: 15px;
				top: 15px;
				height: 25px;
				width: 25px;
				cursor: pointer;
				font-size: 16px;
				font-weight: 700;
				border: 1px solid $black;
				background-color: rgba(255, 255, 255, 0.5);
				z-index: 999;

					&::before {
						content: '⨉';
						position: absolute;
						top: 50%;
						left: 50%;
						transform: translate(-50%, -50%);
				}
			}
		}

		&-content {
			padding: 25px 0 0;
			display: flex;
			flex-direction: column;
			gap: 15px;

			&_fit-content {
				padding: 0;
			}

			&-controls {
				margin-top: 8px;	
			}
		}
	}
}
</style>
