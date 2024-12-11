<template>
	<div class="contacts">
		<h3 class="contacts-mainTitle">Culture events of Peru</h3>
		<h3 class="contacts-pageTitle">Contactos del organizador</h3>
		<div class="contacts-referenseBlock">
			<div class="contacts-referenseBlock-title">Organizador</div>
			<div class="contacts-referenses">
				<div class="contacts-referenses-mail">
					<span class="contacts-referenses-mail-title">E-mail</span>
					<span class="contacts-referenses-mail-ref">
						organizador@cusco.com</span
					>
				</div>
				<div class="contacts-referenses-tel">
					<span class="contacts-referenses-tel-title">Número de teléfono</span>
					<span class="contacts-referenses-tel-ref">+ 111 81959 193491</span>
				</div>
				<div class="contacts-referenses-place">
					<span class="contacts-referenses-place-title">País y ciudad</span>
					<span class="contacts-referenses-place-ref">cusco, peru</span>
				</div>
				<div class="contacts-referenses-socials">
					<cp-social-link
						social-media-link="http://localhost:3000/esevent-host"
						social-media-name="instagram"
					/>
					<cp-social-link
						social-link="http://localhost:3000/esevent-host"
						social-name="linkedin"
					/>
					<cp-social-link
						social-link="http://localhost:3000/esevent-host"
						social-name="tiktok"
					/>
					<cp-social-link
						social-link="http://localhost:3000/esevent-host"
						social-name="facebook"
					/>
				</div>
			</div>
		</div>
		<div class="contacts-referenseBlock">
			<div class="contacts-referenseBlock-title">Organizador</div>
			<div class="contacts-referenses">
				<div class="contacts-referenses-mail">
					<span class="contacts-referenses-mail-title">E-mail</span>
					<span class="contacts-referenses-mail-ref">
						organizador@cusco.com</span
					>
				</div>
				<div class="contacts-referenses-tel">
					<span class="contacts-referenses-tel-title">Número de teléfono</span>
					<span class="contacts-referenses-tel-ref">+ 111 81959 193491</span>
				</div>
				<div class="contacts-referenses-place">
					<span class="contacts-referenses-place-title">País y ciudad</span>
					<span class="contacts-referenses-place-ref">cusco, peru</span>
				</div>
				<div class="contacts-referenses-socials">
					<cp-social-link
						social-link="http://localhost:3000/esevent-host"
						social-name="instagram"
					/>
					<cp-social-link
						social-link="http://localhost:3000/esevent-host"
						social-name="linkedin"
					/>
					<cp-social-link
						social-link="http://localhost:3000/esevent-host"
						social-name="tiktok"
					/>
					<cp-social-link
						social-link="http://localhost:3000/esevent-host"
						social-name="facebook"
					/>
				</div>
			</div>
		</div>
		<div class="contacts-referenseBlock">
			<div class="contacts-referenseBlock-title">Organizador</div>
			<div class="contacts-referenses">
				<div class="contacts-referenses-mail">
					<span class="contacts-referenses-mail-title">E-mail</span>
					<span class="contacts-referenses-mail-ref">
						organizador@cusco.com</span
					>
				</div>
				<div class="contacts-referenses-tel">
					<span class="contacts-referenses-tel-title">Número de teléfono</span>
					<span class="contacts-referenses-tel-ref">+ 111 81959 193491</span>
				</div>
				<div class="contacts-referenses-place">
					<span class="contacts-referenses-place-title">País y ciudad</span>
					<span class="contacts-referenses-place-ref">cusco, peru</span>
				</div>
				<div class="contacts-referenses-socials">
					<cp-social-link
						social-link="http://localhost:3000/esevent-host"
						social-name="instagram"
					/>
					<cp-social-link
						social-link="http://localhost:3000/esevent-host"
						social-name="linkedin"
					/>
					<cp-social-link
						social-link="http://localhost:3000/esevent-host"
						social-name="tiktok"
					/>
					<cp-social-link
						social-link="http://localhost:3000/esevent-host"
						social-name="facebook"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.contacts {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 100%;
	padding: 0 20px 0 20px;
	margin-bottom: 70px;

	@media screen and (max-width: 865px) {
		flex-direction: column;
		margin-bottom: 0;
	}

	&-pageTitle {
		width: 100%;
		text-align: start;
		margin-bottom: 40px;
		font-size: 60px;

		@media screen and (max-width: 1350px) {
			font-size: 56px;
		}
		@media screen and (max-width: 1280px) {
			font-size: 56px;
		}
		@media screen and (max-width: 1030px) {
			font-size: 45px;
			font-weight: 600;
		}
		@media screen and (max-width: 965px) {
			font-size: 32px;
		}
		@media screen and (max-width: 435px) {
			font-size: 28px;
		}
	}

	&-referenseBlock {
		display: flex;
		margin-bottom: 70px;

		@media screen and (max-width: 670px) {
			flex-direction: column;
		}

		&-title {
			font-size: 44px;
			font-weight: 500;
			color: $black;
			font-family: 'Poppins-Medium';
			width: 50%;
			line-height: 78px;

			@media screen and (max-width: 1350px) {
				font-size: 34px;
			}
			@media screen and (max-width: 1280px) {
				font-size: 34px;
			}
			@media screen and (max-width: 1030px) {
				font-size: 34px;
			}
			@media screen and (max-width: 965px) {
				font-size: 28px;
			}
			@media screen and (max-width: 435px) {
				font-size: 22px;
			}
		}
	}

	&-mainTitle {
		margin: 50px 0 70px 0;
		font-size: 82px;
		font-style: normal;
		font-weight: 500;
		line-height: 120%;
		color: $black;
		text-align: center;
		font-family: 'Poppins-Medium';

		@media screen and (max-width: 1350px) {
			font-size: 72px;
		}
		@media screen and (max-width: 1280px) {
			font-size: 76px;
		}
		@media screen and (max-width: 1030px) {
			font-size: 45px;
		}
		@media screen and (max-width: 965px) {
			text-align: center;
			font-size: 40px;
		}
		@media screen and (max-width: 435px) {
			font-size: 30px;
		}
	}

	&-referenses {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		padding-left: 20px;
		width: 50%;

		@media screen and (max-width: 865px) {
			width: 100%;
			margin-top: 41px;
			padding-left: 0;
		}

		@media screen and (max-width: 670px) {
			margin-top: 0px;
		}

		&-mail {
			display: flex;
			justify-content: space-between;
			margin-bottom: 10px;

			&-title {
				font-size: 30px;
				font-style: normal;
				font-weight: 400;
				line-height: normal;
				letter-spacing: 0.9px;
				text-transform: uppercase;
				color: $gray;

				@media screen and (max-width: 1350px) {
					font-size: 26px;
				}
				@media screen and (max-width: 1280px) {
					font-size: 22px;
				}
				@media screen and (max-width: 1030px) {
					font-size: 20px;
				}
				@media screen and (max-width: 965px) {
					font-size: 18px;
				}
				@media screen and (max-width: 435px) {
					font-size: 15px;
				}
			}

			&-ref {
				font-size: 30px;
				font-style: normal;
				font-weight: 400;
				line-height: normal;
				letter-spacing: 0.9px;
				text-transform: uppercase;
				color: $gray;
				@media screen and (max-width: 1350px) {
					font-size: 26px;
				}
				@media screen and (max-width: 1280px) {
					font-size: 22px;
				}
				@media screen and (max-width: 1030px) {
					font-size: 20px;
				}
				@media screen and (max-width: 965px) {
					font-size: 18px;
				}
				@media screen and (max-width: 435px) {
					font-size: 15px;
				}
			}
		}
		&-tel {
			display: flex;
			justify-content: space-between;
			margin-bottom: 10px;

			&-title {
				font-size: 30px;
				font-style: normal;
				font-weight: 400;
				line-height: normal;
				letter-spacing: 0.9px;
				text-transform: uppercase;
				color: $gray;
				@media screen and (max-width: 1350px) {
					font-size: 26px;
				}
				@media screen and (max-width: 1280px) {
					font-size: 22px;
				}
				@media screen and (max-width: 1030px) {
					font-size: 20px;
				}
				@media screen and (max-width: 965px) {
					font-size: 18px;
				}
				@media screen and (max-width: 435px) {
					font-size: 15px;
				}
			}

			&-ref {
				font-size: 30px;
				font-style: normal;
				font-weight: 400;
				line-height: normal;
				letter-spacing: 0.9px;
				text-transform: uppercase;
				color: $gray;
				@media screen and (max-width: 1350px) {
					font-size: 26px;
				}
				@media screen and (max-width: 1280px) {
					font-size: 22px;
				}
				@media screen and (max-width: 1030px) {
					font-size: 20px;
				}
				@media screen and (max-width: 965px) {
					font-size: 18px;
				}
				@media screen and (max-width: 435px) {
					font-size: 15px;
				}
			}
		}

		&-place {
			display: flex;
			justify-content: space-between;
			margin-bottom: 10px;

			&-title {
				font-size: 30px;
				font-style: normal;
				font-weight: 400;
				line-height: normal;
				letter-spacing: 0.9px;
				text-transform: uppercase;
				color: $gray;
				@media screen and (max-width: 1350px) {
					font-size: 26px;
				}
				@media screen and (max-width: 1280px) {
					font-size: 22px;
				}
				@media screen and (max-width: 1030px) {
					font-size: 20px;
				}
				@media screen and (max-width: 965px) {
					font-size: 18px;
				}
				@media screen and (max-width: 435px) {
					font-size: 15px;
				}
			}

			&-ref {
				font-size: 30px;
				font-style: normal;
				font-weight: 400;
				line-height: normal;
				letter-spacing: 0.9px;
				text-transform: uppercase;
				color: $gray;
				@media screen and (max-width: 1350px) {
					font-size: 26px;
				}
				@media screen and (max-width: 1280px) {
					font-size: 22px;
				}
				@media screen and (max-width: 1030px) {
					font-size: 20px;
				}
				@media screen and (max-width: 965px) {
					font-size: 18px;
				}
				@media screen and (max-width: 435px) {
					font-size: 15px;
				}
			}
		}

		&-socials {
			display: flex;
			justify-content: flex-start;
			width: 100%;
			margin-top: 20px;

			@media screen and (max-width: 865px) {
				margin: 20px 0 30px 0;
			}

			div {
				margin-right: 20px;
			}
		}
	}
}
</style>
