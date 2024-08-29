<template>
	<div class="partners__main">
		<h1 class="partners__title">
			{{ $t('partners_title') }}
		</h1>
		<div class="partners__subtitle">
			<h3>{{ $t('partners_subtitle') }}</h3>
			<span>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
				tempor incididunt ut labore et dolore magna aliqua. A diam maecenas sed
				enim ut sem viverra aliquet eget. Amet venenatis urna cursus eget nunc
				scelerisque.
			</span>
		</div>
		<div class="partners__form">
			<h3>{{ $t('partners_formTitle') }}</h3>
			<div class="partners__form-row">
				<div class="partners__form-row-info">
					<span>Tipo de organizaón</span>
				</div>
				<div class="partners__form-row-input">
					<cp-radio-button :options="radioOptions1" name="radio1" />
				</div>
			</div>

			<div class="partners__form-row">
				<div class="partners__form-row-info">
					<span>
						Nombre comercial
						<cp-info-pop-up id="Nombre_info" info="test info Nombre" />
					</span>
				</div>
				<div class="partners__form-row-input">
					<cp-text-input type="text" placeholder="Nombre comercial" />
				</div>
			</div>

			<div class="partners__form-row">
				<div class="partners__form-row-info">
					<span>
						Razón social
						<cp-info-pop-up id="Razón_info" info="test info Razón" />
					</span>
				</div>
				<div class="partners__form-row-input">
					<cp-text-input type="text" placeholder="Razón social" />
				</div>
			</div>

			<div class="partners__form-row">
				<div class="partners__form-row-info">
					<span>RUC</span>
				</div>
				<div class="partners__form-row-input">
					<cp-text-input type="text" placeholder="RUC" />
				</div>
			</div>

			<div class="partners__form-row">
				<div class="partners__form-row-info">
					<span>
						Dónde se ubica tu organización?
						<cp-info-pop-up id="Dónde_info" info="test info Dónde" />
					</span>
				</div>
				<div class="partners__form-row-input">
					<cp-radio-button :options="radiooptions2" name="radio2" />
				</div>
			</div>

			<div class="partners__form-rowDnD">
				<div class="partners__form-rowDnD-info">
					<span>
						Sube el video que explica su servicio y producto o incrusta el
						enlace desde Yuotube o Vimeo
					</span>
				</div>
				<div class="partners__form-rowDnD-input">
					<cp-drag-n-drop type="video" :max-size="50" />
				</div>
			</div>

			<div class="partners__form-rowDnD">
				<div class="partners__form-rowDnD-info">
					<span>Subir el banner principal</span>
				</div>
				<div class="partners__form-rowDnD-input">
					<cp-drag-n-drop type="image" :max-size="5" />
				</div>
			</div>

			<div class="partners__form-rowDnD">
				<div class="partners__form-rowDnD-info">
					<span>
						Sube el vídeo de tu empresa o incrusta un enlace desde youtube o
						vimeo
					</span>
				</div>
				<div class="partners__form-rowDnD-input">
					<span class="partners__form-rowDnD-semiBlock">
						<div>
							<cp-drag-n-drop type="video" :max-size="50" />
							<span class="partners__form-rowDnD-semiBlock-social">
								<cp-social-media
									id="test"
									:circle="true"
									label-text="YouTube"
									placeholder="https://www.youtube.com/"
								/>
							</span>
							<span class="partners__form-rowDnD-semiBlock-social">
								<cp-social-media
									id="test2"
									:circle="true"
									label-text="Vimeo"
									placeholder="https://www.vimeo.com/"
								/>
							</span>
						</div>
					</span>
				</div>
			</div>

			<div class="partners__form-rowDnD">
				<div class="partners__form-rowDnD-info">
					<span>
						Sube el vídeo de tu empresa o incrusta un enlace desde youtube o
						vimeo
						<cp-info-pop-up
							id="incrusta_info"
							info="Si subes tu propio vídeo, debe estar en formato .mp4 y no debe superar los 50 megabytes de tamaño"
						/>
					</span>
				</div>
				<div class="partners__form-rowDnD-input">
					<cp-drag-n-drop type="video" :max-size="50" />
				</div>
			</div>

			<div class="partners__form-rowDnD">
				<div class="partners__form-rowDnD-info">
					<span>
						Descargar el producto más popular
						<cp-info-pop-up
							id="Descargar_info"
							info="El banner debe cargarse a 1100 por 278 píxeles en formato .png"
						/>
					</span>
				</div>
				<div class="partners__form-rowDnD-input">
					<cp-drag-n-drop type="image" :max-size="5" />
				</div>
			</div>

			<div class="partners__form-rowDnD">
				<div class="partners__form-rowDnD-info">
					<span>
						Redes sociales
						<cp-info-pop-up
							id="Redes_info"
							info="No se admitirán redes personales"
						/>
					</span>
				</div>
				<div class="partners__form-rowDnD-input">
					<div>
						<span class="partners__form-rowDnD-semiBlock-social">
							<cp-social-media
								id="test7"
								:circle="true"
								label-text="Telegram"
								placeholder="https://www.youtube.com/"
							/>
						</span>
						<span class="partners__form-rowDnD-semiBlock-social">
							<cp-social-media
								id="test2"
								:circle="true"
								label-text="Twitter"
								placeholder="https://www.vimeo.com/"
							/>
						</span>
						<span class="partners__form-rowDnD-semiBlock-social">
							<cp-social-media
								id="test3"
								:circle="true"
								label-text="FaceBook"
								placeholder="https://www.vimeo.com/"
							/>
						</span>
						<span class="partners__form-rowDnD-semiBlock-social">
							<cp-social-media
								id="test4"
								:circle="true"
								label-text="Instagram"
								placeholder="https://www.vimeo.com/"
							/>
						</span>
						<span class="partners__form-rowDnD-semiBlock-social">
							<cp-social-media
								id="test5"
								:circle="true"
								label-text="YouTube"
								placeholder="https://www.vimeo.com/"
							/> </span
						><span class="partners__form-rowDnD-semiBlock-social">
							<cp-social-media
								id="test6"
								:circle="true"
								label-text="Linkedin"
								placeholder="https://www.vimeo.com/"
							/>
						</span>
					</div>
				</div>
			</div>

			<div class="partners__form-rowDnD">
				<div class="partners__form-rowDnD-info">
					<span>
						Catalogo digital
						<cp-info-pop-up id="Catalogo_info" info="Catalogo digital info" />
					</span>
				</div>
				<div class="partners__form-rowDnD-input">
					<div>
						<cp-text-input type="url" placeholder="https://" />
						<cp-button
							class="partners__form__button"
							width="maxLength"
							size="small"
							shape="oval"
							color="yellowGrey"
							text="Crea tu propio catalogo digital"
						/>
					</div>
				</div>
			</div>

			<div class="partners__form-rowDnD">
				<div class="partners__form-rowDnD-info">
					<span>
						Sube tus principales productos y sus descripciones
						<cp-info-pop-up
							id="principales_info"
							info="El banner debe cargarse a 1100 por 278 píxeles en formato .png"
						/>
					</span>
				</div>
				<div class="partners__form-rowDnD-input">
					<cp-drag-n-drop type="image" :max-size="5" />
				</div>
			</div>

			<div class="partners__form-soloInput">
				<div class="partners__form-soloInput__container">
					<div class="partners__form-soloInput__title">
						<span class="partners__form-soloInput__title-main">
							Primera categoría de bienes
						</span>
						<span class="partners__form-soloInput__title-second">
							introduzca el texto
						</span>
					</div>
					<div class="partners__form-soloInput__socials">
						<span class="partners__form-soloInput__socials-item">
							<cp-social-media
								id="Mercancía1"
								:circle="true"
								label-text="Mercancía 1"
								placeholder="introduzca el enlace"
							/>
						</span>
						<span class="partners__form-soloInput__socials-item">
							<cp-social-media
								id="Mercancía2"
								:circle="true"
								label-text="Mercancía 2"
								placeholder="introduzca el enlace"
							/>
						</span>
						<span class="partners__form-soloInput__socials-item">
							<cp-social-media
								id="Mercancía3"
								:circle="true"
								label-text="Mercancía 3"
								placeholder="introduzca el enlace"
							/>
						</span>
						<span class="partners__form-soloInput__socials-item">
							<cp-social-media
								id="Mercancía4"
								:circle="true"
								label-text="Mercancía 4"
								placeholder="introduzca el enlace"
							/>
						</span>
					</div>
					<cp-button
						class="partners__form__button"
						width="maxLength"
						size="small"
						shape="oval"
						color="transparent"
						text="Más información"
					/>
				</div>
			</div>

			<div class="partners__form-soloInput">
				<div class="partners__form-soloInput__container">
					<div class="partners__form-soloInput__title">
						<span class="partners__form-soloInput__title-main">
							Segunda categoría de bienes
						</span>
						<span class="partners__form-soloInput__title-second">
							introduzca el texto
						</span>
					</div>
					<div class="partners__form-soloInput__socials">
						<span class="partners__form-soloInput__socials-item">
							<cp-social-media
								id="Mercancía1"
								:circle="true"
								label-text="Mercancía 1"
								placeholder="introduzca el enlace"
							/>
						</span>
						<span class="partners__form-soloInput__socials-item">
							<cp-social-media
								id="Mercancía2"
								:circle="true"
								label-text="Mercancía 2"
								placeholder="introduzca el enlace"
							/>
						</span>
						<span class="partners__form-soloInput__socials-item">
							<cp-social-media
								id="Mercancía3"
								:circle="true"
								label-text="Mercancía 3"
								placeholder="introduzca el enlace"
							/>
						</span>
						<span class="partners__form-soloInput__socials-item">
							<cp-social-media
								id="Mercancía4"
								:circle="true"
								label-text="Mercancía 4"
								placeholder="introduzca el enlace"
							/>
						</span>
					</div>
					<cp-button
						class="partners__form__button"
						width="maxLength"
						size="small"
						shape="oval"
						color="transparent"
						text="Más información"
					/>
					<cp-button
						class="partners__form__button"
						width="maxLength"
						size="small"
						shape="oval"
						color="yellowGrey"
						text="Añadir más categorías"
					/>
				</div>
			</div>

			<div class="partners__form-rowDnD">
				<div class="partners__form-rowDnD-info">
					<span>
						Añadir fotos a la galería
						<cp-info-pop-up
							id="galería_info"
							info="Sube un máximo de 6 fotos que no excedan los 2MB"
						/>
					</span>
				</div>
				<div class="partners__form-rowDnD-input">
					<cp-drag-n-drop type="image" :max-size="2" />
				</div>
			</div>
			<div class="partners__form-rowDnD">
				<div class="partners__form-rowDnD-info">
					<span>
						Añadir datos del contacto de la empresa
						<cp-info-pop-up
							id="Redes_info"
							info="Agregar número activo para la comunicación y con formato internacional. ej: 51 933625150 "
						/>
					</span>
				</div>
				<div class="partners__form-rowDnD-input">
					<div>
						<span class="partners__form-rowDnD-semiBlock-social">
							<cp-social-media
								id="test7"
								label-text="País y ciudad"
								placeholder="introduzca el enlace"
							/>
						</span>
						<span class="partners__form-rowDnD-semiBlock-social">
							<cp-social-media
								id="test2"
								label-text="Teléfono de la empresa"
								placeholder="introduzca el enlace"
							/>
						</span>
						<span class="partners__form-rowDnD-semiBlock-social">
							<cp-social-media
								id="test3"
								label-text="Email"
								placeholder="introduzca el enlace"
							/>
						</span>
					</div>
					<cp-button
						class="partners__form__button"
						width="maxLength"
						size="small"
						shape="oval"
						color="transparent"
						text="Más información"
					/>
					<cp-button
						class="partners__form__button"
						width="maxLength"
						size="small"
						shape="oval"
						color="yellowGrey"
						text="Añadir más categorías"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import CpButton from '@shared/gui/CpButton.vue';
const radioOptions1 = [
	{ id: 'emp', value: 'Empresa', label: 'Empresa' },
	{ id: 'ong', value: 'ONG', label: 'ONG' },
];

const radiooptions2 = [
	{ id: 'Cusco', value: 'Cusco', label: 'Cusco' },
	{ id: 'Urubamba', value: 'Urubamba', label: 'Urubamba' },
	{ id: 'Anta', value: 'Anta', label: 'Anta' },
	{ id: 'Paucartambo', value: 'Paucartambo', label: 'Paucartambo' },
	{ id: 'Pisac', value: 'Pisac', label: 'Pisac' },
	{ id: 'Chinchero', value: 'Chinchero', label: 'Chinchero' },
	{ id: 'Paruro', value: 'Paruro', label: 'Paruro' },
	{ id: 'Aguas_Calientes', value: 'Aguas_Calientes', label: 'Aguas Calientes' },
];
</script>

<style scoped lang="scss">
.partners {
	&__main {
		@media #{$screen-tablet} {
			margin-top: 10px;
		}

		@media #{$screen-desktop} {
			padding: 0 5%;
			margin-top: 33px;
		}
	}

	&__title {
		margin-bottom: 45px;
		font-size: 70px;
	}

	&__subtitle {
		width: 50%;
		h3 {
			font-size: 30px;
			font-weight: 500;
			line-height: 42px;
			color: #353333;
		}

		span {
			display: inline-block;
			margin-top: 15px;
			font-size: 18px;
			font-weight: 400;
			line-height: 28.8px;
			color: #888888;
		}
	}

	&__form {
		width: 100%;
		margin-top: 100px;

		h3 {
			font-size: 34px;
			font-weight: 500;
			line-height: 47.6px;
		}

		&-row {
			display: flex;
			align-items: center;
			margin: 60px 0 60px 0;

			&-info {
				display: flex;
				align-items: center;
				width: 55%;
				padding-right: 55px;
				font-size: 24px;
				font-weight: 500;
				line-height: 33.6px;
				color: #353333;

				span {
					padding-top: 5px;
					text-align: start;
				}
			}

			&-input {
				display: flex;
				align-items: center;
				flex-direction: column;
				width: 55%;
				input {
					width: 100%;
				}
				div {
					display: flex;
					flex-wrap: wrap;
					align-items: center;
					justify-content: flex-start;
					width: 100%;
				}
			}
		}

		&-rowDnD {
			display: flex;
			align-items: flex-start;
			margin: 60px 0 60px 0;

			&-info {
				display: flex;
				align-items: center;
				width: 55%;
				padding-right: 55px;
				padding-top: 5px;
				font-size: 24px;
				font-weight: 500;
				line-height: 33.6px;
				color: #353333;

				span {
					padding-top: 5px;
					text-align: start;
				}
			}

			&-input {
				display: flex;
				align-items: center;
				flex-direction: column;
				width: 55%;
				input {
					width: 100%;
				}
				div {
					display: flex;
					flex-wrap: wrap;
					align-items: center;
					justify-content: flex-start;
					justify-content: space-between;
					width: 100%;
				}
			}

			&-semiBlock {
				display: flex !important;
				flex-direction: column !important;

				&-social {
					width: 50%;
					padding: 10px;
					margin-top: 15px;
				}
			}
		}

		&-soloInput {
			display: flex;
			justify-content: end;
			margin: 60px 0 60px 0;
			width: 100%;

			&__container {
				width: 50%;
			}

			&__socials {
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;
				margin-left: -10px;

				&-item {
					width: 50%;
					padding: 10px;
					margin-top: 15px;
				}
			}

			&__title {
				display: flex;
				flex-direction: column;

				&-main {
					font-size: 30px;
					line-height: 42px;
					font-weight: 500;
					color: #353333;
					margin-bottom: 12px;
				}

				&-second {
					font-size: 18px;
					line-height: 28.8px;
					font-weight: 400;
					color: #888888;
					margin-bottom: 20px;
				}
			}
		}
	}
}
.partners__form__button {
	margin-top: 20px;
}
</style>
