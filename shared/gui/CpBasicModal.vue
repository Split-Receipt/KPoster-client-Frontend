<template>
	<div v-if="show" class="modal">
		<!-- ToDo separate modal window -->
		<div ref="permitModal" class="modal-window">
			<button type="button" class="modal-window-close" @click="modaHandleClose">
				╳
			</button>
			<div class="modal-window-content">
				<slot
					name="content"
					@data-sended="(value: any) => modalInnerData = value"
				/>
				<div class="modal-window-content-controls">
					<cp-button
						class="modal-window-content-controls-accept"
						width="maxWidth"
						size="small"
						shape="oval"
						color="yellowGrey"
						text="Sí"
						@click="modalHandleAccept"
					/>
					<cp-button
						class="modal-window-content-controls-decline"
						width="maxWidth"
						size="small"
						shape="oval"
						color="transparent"
						text="No"
						@click="modaHandleClose"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { onClickOutside } from '@vueuse/core';
type Props = {
	show: boolean;
};
defineProps<Props>();
const emit = defineEmits<Events>();
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
		box-sizing: border-box;
		position: relative;
		width: 50%;
		height: 35%;
		min-height: 275px;
		padding: 30px;
		border-radius: 40px;
		background: #fff;

		@media screen and (max-width: 1450px) {
			width: 60%;
		}

		@media screen and (max-width: 1150px) {
			width: 65%;
		}

		@media screen and (max-width: 875px) {
			width: 75%;
		}

		@media screen and (max-width: 575px) {
			height: 45%;
			padding: 15px;
		}

		@media screen and (max-width: 445px) {
			width: 90%;
		}

		&-close {
			position: absolute;
			right: 30px;
			top: 30px;
			height: 46px;
			width: 46px;
			border-radius: 50%;
			color: $black;
			font-size: 14px;
			font-weight: 600;
			z-index: 999;
			border: 1px solid $black;
			background-color: #fff;
			cursor: pointer;

			@media screen and (max-width: 575px) {
				right: 15px;
				top: 15px;
			}
		}

		&-content {
			padding: 40px 0 100px 0;
			box-sizing: border-box;
			position: relative;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			height: 100%;

			@media screen and (max-width: 575px) {
				justify-content: flex-start;
				padding: 50px 0 90px 0;
			}

			h4 {
				box-sizing: border-box;
				font-family: 'Poppins-Medium';
				color: $soft-black;
				line-height: 66px;
				text-align: center;
				font-size: 44px;
				margin-bottom: 15px;
				cursor: default;

				@media screen and (max-width: 1280px) {
					font-size: 34px;
					line-height: 51px;
				}

				@media screen and (max-width: 768px) {
					font-size: 28px;
					line-height: 42px;
				}

				@media screen and (max-width: 430px) {
					font-size: 22px;
					line-height: 33px;
				}
			}

			span {
				box-sizing: border-box;
				color: $gray;
				font-size: 22px;
				line-height: 35px;
				text-align: center;
				cursor: default;
				width: 65%;

				@media screen and (max-width: 1280px) {
					font-size: 16px;
					line-height: 25px;
				}

				@media screen and (max-width: 1030px) {
					width: 75%;
				}

				@media screen and (max-width: 910px) {
					width: 80%;
				}

				@media screen and (max-width: 768px) {
					font-size: 12px;
					line-height: 19px;
				}

				@media screen and (max-width: 751px) {
					width: 85%;
				}
			}

			&-controls {
				position: absolute;
				bottom: 0;
				box-sizing: border-box;
				display: flex;
				justify-content: space-between;
				width: 100%;

				@media screen and (max-width: 575px) {
					flex-direction: column;
				}

				&-accept {
					width: 100%;
					margin-right: 15px;

					@media screen and (max-width: 575px) {
						margin-right: 0;
						margin-bottom: 15px;
					}
				}

				&-decline {
					width: 100%;
				}
			}
		}
	}
}
</style>
