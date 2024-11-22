<template>
	<div class="event-carousel__wrapper">
		<div v-if="isVisible && isDeletable" class="modal">
			<!-- ToDo separate modal window -->
			<div ref="permitModal" class="modal-window">
				<button
					type="button"
					class="modal-window-close"
					@click="modaHandleClose"
				>
					╳
				</button>
				<div class="modal-window-content">
					<h4>¿Eliminar datos?</h4>
					<span>¿Confirmar eliminación? será imposible cancelar la acción</span>
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
		<div class="event-carousel">
			<div class="event-carousel__controls">
				<cp-button
					shape="square"
					color="transparent"
					size="squareSize"
					width="squareWidth"
					left-icon="arrow-left"
					:class="[
						`button-prev__${id}`,
						'swiper-button-prev',
						'event-carousel__button',
					]"
				/>
				<cp-button
					shape="square"
					color="black"
					size="squareSize"
					width="squareWidth"
					left-icon="arrow-right"
					:class="[
						`button-next__${id}`,
						'swiper-button-next',
						'event-carousel__button',
					]"
				/>
			</div>

			<swiper
				:id="id"
				:modules="[SwiperNavigation, SwiperGrid]"
				space-between="20"
				:navigation="{
					enabled: true,
					nextEl: `.button-next__${id}`,
					prevEl: `.button-prev__${id}`,
				}"
				:breakpoints="{
					0: {
						slidesPerView: 1.5,
						grid: {
							fill: 'row',
							rows: 1,
						},
					},
					768: {
						slidesPerView: 2.5,
						grid: {
							fill: 'row',
							rows: 1,
						},
					},
					1280: {
						slidesPerView: 3,
						grid: {
							fill: 'row',
							rows: 1,
						},
					},
					1920: {
						slidesPerView: 3,
						grid: {
							fill: 'row',
							rows: 1,
						},
					},
				}"
			>
				<swiper-slide v-for="(source, index) in videoFilesUrls" :key="index">
					<video
						class="event-carousel-video"
						:src="source"
						controls
						:alt="'media' + index"
					/>
				</swiper-slide>
				<swiper-slide v-for="(source, index) in mediaFilesUrls" :key="index">
					<button
						v-if="isDeletable"
						class="deleteButton"
						@click="modaHandleOpen(source)"
					>
						╳
					</button>
					<nuxt-img
						class="event-carousel-image"
						style="width: 100%; height: auto; object-fit: cover"
						:src="source"
						:alt="'media' + index"
					/>
				</swiper-slide>
			</swiper>
		</div>
	</div>
</template>

<script setup lang="ts">
import { onClickOutside } from '@vueuse/core';
type Props = {
	mediaFilesUrls?: string[];
	videoFilesUrls?: string[];
	id: string | number;
	isDeletable?: boolean;
};

defineProps<Props>();

const emit = defineEmits<Emits>();

const objectToDelete = ref<any>(null);

type Emits = {
	(e: 'delete', objectToDelete: any): void;
};

const permitModal = ref<HTMLDivElement | null>(null);

const isVisible = ref<boolean>(false);

const modaHandleOpen = (source: any) => {
	objectToDelete.value = source;
	isVisible.value = true;
};

const modalHandleAccept = () => {
	isVisible.value = false;
	emit('delete', objectToDelete.value);
};

const modaHandleClose = () => {
	isVisible.value = false;
	objectToDelete.value = null;
};

onClickOutside(permitModal, () => modaHandleClose());
</script>

<style scoped lang="scss">
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

.deleteButton {
	position: absolute;
	display: flex;
	align-items: center;
	justify-content: center;
	border: none;
	font-size: 14px;
	right: 5px;
	top: 5px;
	width: 40px;
	height: 40px;
	background-color: $sunrise-red;
	border-radius: 50%;
	color: #fff;
	text-align: center;
	cursor: pointer;
}

.event-carousel {
	&__controls {
		position: relative;
		display: flex;
		justify-content: flex-end;
		gap: 20px;
		margin-right: 10px;

		@media #{$screen-desktop} {
			margin-right: 0px;
		}
	}

	&__button {
		position: static;
		width: auto;
		display: none;

		@media #{$screen-tablet} {
			display: block;
		}

		@media screen and (max-width: 960px) {
			display: none;
		}
	}

	&-image {
		object-fit: cover;
		width: 100%;
		height: 100%;
	}

	&-video {
		object-fit: cover;
		width: 100%;
		height: 100%;
	}
}

.swiper {
	@media #{$screen-tablet} {
		padding-top: 55px;
	}
}

.swiper-button-next {
	&::after {
		content: '';
	}
}
.swiper-button-prev {
	&::after {
		content: '';
	}
}
</style>
