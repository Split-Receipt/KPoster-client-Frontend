<template>
	<div class="partners__main">
		<cp-spinner :is-spinned="isSpin" />
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
					<cp-radio-button
						v-model="formData.orgType"
						:options="radioOptions1"
						name="radio1"
					/>
				</div>
			</div>

			<div class="partners__form-row">
				<div class="partners__form-row-info">
					<span>
						Nombre comercial
						<cp-info-pop-up
							id="Nombre_comercial_info"
							info="test info Nombre"
						/>
					</span>
				</div>
				<div class="partners__form-row-input">
					<cp-text-input
						v-model="formData.commercialName"
						type="text"
						placeholder="Nombre comercial"
					/>
				</div>
			</div>

			<div class="partners__form-row">
				<div class="partners__form-row-info">
					<span>
						Razón social
						<cp-info-pop-up id="Razón_social_info" info="test info Razón" />
					</span>
				</div>
				<div class="partners__form-row-input">
					<cp-text-input
						v-model="formData.compName"
						type="text"
						placeholder="Razón social"
					/>
				</div>
			</div>

			<div class="partners__form-row">
				<div class="partners__form-row-info">
					<span>RUC</span>
				</div>
				<div class="partners__form-row-input">
					<cp-text-input v-model="formData.ruc" type="text" placeholder="RUC" />
				</div>
			</div>

			<div class="partners__form-row">
				<div class="partners__form-row-info">
					<span>
						Dónde se ubica tu organización?
						<cp-info-pop-up id="Dónde_se_ubica_info" info="test info Dónde" />
					</span>
				</div>
				<div class="partners__form-row-input">
					<cp-radio-button
						v-model="formData.orgLocation"
						:options="radiooptions2"
						name="radio2"
					/>
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
					<cp-drag-n-drop
						v-model="formData.videoBusinessСard"
						type="video"
						:max-size="50"
					/>
				</div>
			</div>

			<div class="partners__form-rowDnD">
				<div class="partners__form-rowDnD-info">
					<span>Subir el banner principal</span>
				</div>
				<div class="partners__form-rowDnD-input">
					<cp-drag-n-drop
						v-model="formData.mainBanner"
						type="image"
						:max-size="5"
					/>
				</div>
			</div>

			<div class="partners__form-rowDnD">
				<div class="partners__form-rowDnD-info">
					<span>
						Sube el vídeo de tu empresa o incrusta un enlace desde youtube o
						vimeo
						<cp-info-pop-up
							id="youtube_o_vimeo_info"
							info="Si subes tu propio vídeo, debe estar en formato .mp4 y no debe superar los 50 megabytes de tamaño"
						/>
						<div class="partners__form-switcherBlock">
							<cp-switcher
								v-model="switcherValue"
								:default-option="switcherValue"
								switcher-name="qwe"
								:switcher-options="switcherOptions"
							/>
						</div>
					</span>
				</div>
				<div class="partners__form-rowDnD-input">
					<span class="partners__form-rowDnD-semiBlock">
						<div>
							<cp-drag-n-drop
								v-if="switcherValue === 'File'"
								v-model="formData.compVideo"
								type="video"
								:max-size="50"
							/>
							<span
								v-else
								class="partners__form-rowDnD-semiBlock-social-maxWidth"
							>
								<cp-social-media
									id="compVideo_id"
									v-model="formData.compVideo"
									:circle="true"
									label-text="YouTube / Vimeo"
									placeholder="https://www.youtube.com/"
								/>
							</span>
						</div>
					</span>
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
					<cp-drag-n-drop
						v-model="formData.mostPopularProduct"
						type="image"
						:max-size="5"
					/>
				</div>
			</div>

			<div class="partners__form-rowDnD">
				<div class="partners__form-rowDnD-info">
					<span>
						Redes sociales
						<cp-info-pop-up
							id="Redes_sociales_info"
							info="No se admitirán redes personales"
						/>
					</span>
				</div>
				<div class="partners__form-rowDnD-input">
					<div>
						<span class="partners__form-rowDnD-semiBlock-social">
							<cp-social-media
								id="telegram_id"
								v-model="formData.socialMedias.telegram"
								:circle="true"
								label-text="Telegram"
								placeholder="https://www.youtube.com/"
							/>
						</span>
						<span class="partners__form-rowDnD-semiBlock-social">
							<cp-social-media
								id="twitter_id"
								v-model="formData.socialMedias.twitter"
								:circle="true"
								label-text="Twitter"
								placeholder="https://www.vimeo.com/"
							/>
						</span>
						<span class="partners__form-rowDnD-semiBlock-social">
							<cp-social-media
								id="faceBook_id"
								v-model="formData.socialMedias.faceBook"
								:circle="true"
								label-text="FaceBook"
								placeholder="https://www.vimeo.com/"
							/>
						</span>
						<span class="partners__form-rowDnD-semiBlock-social">
							<cp-social-media
								id="instagram_id"
								v-model="formData.socialMedias.instagram"
								:circle="true"
								label-text="Instagram"
								placeholder="https://www.vimeo.com/"
							/>
						</span>
						<span class="partners__form-rowDnD-semiBlock-social">
							<cp-social-media
								id="youTube_id"
								v-model="formData.socialMedias.youTube"
								:circle="true"
								label-text="YouTube"
								placeholder="https://www.vimeo.com/"
							/> </span
						><span class="partners__form-rowDnD-semiBlock-social">
							<cp-social-media
								id="linkedIn_id"
								v-model="formData.socialMedias.linkedIn"
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
						<cp-info-pop-up
							id="Catalogo_digital_info"
							info="Catalogo digital info"
						/>
					</span>
				</div>
				<div class="partners__form-rowDnD-input">
					<div>
						<cp-text-input
							v-model="formData.digitalCatalog"
							type="url"
							placeholder="https://"
						/>
						<cp-button
							class="partners__form__button"
							width="maxWidth"
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
							id="principales_productos_info"
							info="El banner debe cargarse a 1100 por 278 píxeles en formato .png"
						/>
					</span>
				</div>
				<div class="partners__form-rowDnD-input">
					<cp-drag-n-drop
						v-model="formData.mainProducts"
						type="image"
						:max-size="5"
					/>
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
								id="cat1_product1"
								v-model="formData.firstProdCategory.cat1_product1"
								:circle="true"
								label-text="Mercancía 1"
								placeholder="introduzca el enlace"
							/>
						</span>
						<span class="partners__form-soloInput__socials-item">
							<cp-social-media
								id="cat1_product2"
								v-model="formData.firstProdCategory.cat1_product2"
								:circle="true"
								label-text="Mercancía 2"
								placeholder="introduzca el enlace"
							/>
						</span>
						<span class="partners__form-soloInput__socials-item">
							<cp-social-media
								id="cat1_product3"
								v-model="formData.firstProdCategory.cat1_product3"
								:circle="true"
								label-text="Mercancía 3"
								placeholder="introduzca el enlace"
							/>
						</span>
						<span class="partners__form-soloInput__socials-item">
							<cp-social-media
								id="cat1_product4"
								v-model="formData.firstProdCategory.cat1_product4"
								:circle="true"
								label-text="Mercancía 4"
								placeholder="introduzca el enlace"
							/>
						</span>
					</div>
					<cp-button
						class="partners__form__button"
						width="maxWidth"
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
								id="cat2_product1"
								v-model="formData.secondProdCategory.cat2_product1"
								:circle="true"
								label-text="Mercancía 1"
								placeholder="introduzca el enlace"
							/>
						</span>
						<span class="partners__form-soloInput__socials-item">
							<cp-social-media
								id="cat2_product2"
								v-model="formData.secondProdCategory.cat2_product2"
								:circle="true"
								label-text="Mercancía 2"
								placeholder="introduzca el enlace"
							/>
						</span>
						<span class="partners__form-soloInput__socials-item">
							<cp-social-media
								id="cat2_product3"
								v-model="formData.secondProdCategory.cat2_product3"
								:circle="true"
								label-text="Mercancía 3"
								placeholder="introduzca el enlace"
							/>
						</span>
						<span class="partners__form-soloInput__socials-item">
							<cp-social-media
								id="cat2_product4"
								v-model="formData.secondProdCategory.cat2_product4"
								:circle="true"
								label-text="Mercancía 4"
								placeholder="introduzca el enlace"
							/>
						</span>
					</div>
					<cp-button
						class="partners__form__button"
						width="maxWidth"
						size="small"
						shape="oval"
						color="transparent"
						text="Más información"
					/>
					<cp-button
						class="partners__form__button"
						width="maxWidth"
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
					<cp-drag-n-drop
						v-model="formData.gelaryImages"
						type="image"
						:max-size="2"
					/>
				</div>
			</div>
			<div class="partners__form-rowDnD">
				<div class="partners__form-rowDnD-info">
					<span>
						Añadir datos del contacto de la empresa
						<cp-info-pop-up
							id="contact_info"
							info="Agregar número activo para la comunicación y con formato internacional. ej: 51 933625150 "
						/>
					</span>
				</div>
				<div class="partners__form-rowDnD-input">
					<div>
						<span class="partners__form-rowDnD-semiBlock-social">
							<cp-social-media
								id="place_id"
								v-model="formData.contacts.place"
								label-text="País y ciudad"
								placeholder="introduzca el enlace"
							/>
						</span>
						<span class="partners__form-rowDnD-semiBlock-social">
							<cp-social-media
								id="tel_id"
								v-model="formData.contacts.tel"
								label-text="Teléfono de la empresa"
								placeholder="introduzca el enlace"
							/>
						</span>
						<span class="partners__form-rowDnD-semiBlock-social">
							<cp-social-media
								id="mail_id"
								v-model="formData.contacts.mail"
								label-text="Email"
								placeholder="introduzca el enlace"
							/>
						</span>
					</div>
					<cp-button
						class="partners__form__button"
						width="maxWidth"
						size="small"
						shape="oval"
						color="transparent"
						text="Más información"
					/>
					<cp-button
						class="partners__form__button"
						width="maxWidth"
						size="small"
						shape="oval"
						color="yellowGrey"
						text="Añadir más categorías"
					/>
				</div>
			</div>
			<div class="partners__form-submit">
				<div class="partners__form-submit-btnContainer">
					<cp-button
						class="partners__form__button"
						width="maxWidth"
						size="small"
						shape="oval"
						color="yellowGrey"
						text="submit"
						@click="sendPartnerRegistrationForm"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import CpButton from '@shared/gui/CpButton.vue';
import CpDragNDrop from '@shared/gui/CpDragNDrop.vue';
import CpTextInput from '@shared/gui/CpTextInput.vue';
import CpRadioButton from '@shared/gui/CpRadioButton.vue';
import CpInfoPopUp from '@shared/gui/CpInfoPopUp.vue';
import CpSocialMedia from '@shared/gui/CpSocialMedia.vue';
import type { PartnerRegistration } from '@shared/api/types.ts';
import { registerPartner } from '@shared/api';

// test values ----------------------------------------------------------
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

const switcherOptions = [
	{ optionName: 'Upload File', optionValue: 'File', optionKey: 'FileKey' },
	{ optionName: 'Paste Link', optionValue: 'Link', optionKey: 'LinkKey' },
];

// ----------------------------------------------------------------------

const formData = reactive<PartnerRegistration>({
	orgType: '',
	commercialName: '',
	compName: '',
	ruc: '',
	orgLocation: '',
	videoBusinessСard: null,
	mainBanner: null,
	compVideo: null,
	mostPopularProduct: null,
	socialMedias: {
		telegram: '',
		twitter: '',
		faceBook: '',
		instagram: '',
		youTube: '',
		linkedIn: '',
	},
	digitalCatalog: '',
	mainProducts: null,
	firstProdCategory: {
		cat1_product1: '',
		cat1_product2: '',
		cat1_product3: '',
		cat1_product4: '',
	},
	secondProdCategory: {
		cat2_product1: '',
		cat2_product2: '',
		cat2_product3: '',
		cat2_product4: '',
	},
	gelaryImages: null,
	contacts: {
		place: '',
		tel: '',
		mail: '',
	},
});

const switcherValue = ref<string | null>('File');
const isSpin = ref<boolean>(false);

watch(switcherValue, () => {
	formData.compVideo = null;
});

/*Функция ниже отправит запрос на бэк с данными регистрации партнiера,
 тем самым создавая его, исполнение этой функции цепляем на кнопку отправки формы
 */
const sendPartnerRegistrationForm = async () => {
	/*Тут внедрить валидаци формы с помощью vee-validate и в идеале запустить лоадер на страницу,
	если валидация не пройдена, делать простой ретурн без превент дефолт, так проще) . */
	try {
		await registerPartner(formData);
	} catch (error) {
		console.error(error); //Заменить вывод в консоль на всплывающее предупреждение об ошибке
	} finally {
		// Тут отключать лоадер
	}
};

const testFunc = () => {
	isSpin.value = true;
	setTimeout(() => {
		isSpin.value = false;
	}, 1500);
};
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
				min-width: 100%;
				min-height: 250px;

				&-social {
					width: 50%;
					padding: 10px;
					margin-top: 15px;

					&-maxWidth {
						width: 100%;
					}
				}
			}
		}

		&-switcherBlock {
			display: flex;
			height: 45px;
			margin-top: 30px;
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

		&-submit {
			margin-bottom: 60px;
			padding: 0 15%;
			display: flex;
			justify-content: space-around;
			align-items: center;

			&-btnContainer {
				width: 45%;
			}
		}
	}
}
.partners__form__button {
	margin-top: 20px;
}
</style>
