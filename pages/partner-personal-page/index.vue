<template>
	<div class="personal">
		<cp-spinner :is-spinned="isSpin" />
		<h2>Culture events of Peru</h2>
		<v-form ref="personalPartnerForm" class="personal___form">
			
			<div class="personal__form-rowTop">
				<div class="personal__form-rowTop-info">
					<span>
						En que areas de la cultura viva comunitaria se desenvuelve tu organización ? Elección múltiple
					</span>
				</div>
				<div class="personal__form-rowTop-input-checks">
					<cp-check-box
						v-for="(item, index) in cultureTypeVars"
						:key="index"
						:option="item" 
						return-value="id"
						@update:checkbox-update="(value: number) => checkboxCollectCultureType(value, index)"
					/>
				</div>
			</div>

			<div class="personal__form-row">
				<div class="personal__form-row-info">
					<span>
						<strong class="personal__form-row-info-required">*</strong>
						Rango de edad y porcentaje de mujeres , aprox
					</span>
				</div>
				<div class="personal__form-row-input-horizontal">
					<cp-text-input type="number" placeholder="Numero de personans"/>
					<cp-text-input type="number" placeholder="Porcenaje de mujeres"/>
				</div>
			</div>

			<div class="personal__form-rowTop">
				<div class="personal__form-rowTop-info">
					<span>
						Subir el logo o imagen principal
						<cp-info-pop-up
							id="logo_update"
							info="test info Nombre"
						/>
					</span>
				</div>
				<div class="personal__form-rowTop-input">
					<cp-drag-n-drop
						v-model="partnerPersonalForm.files.image"
						:is-single="true"
						type="image"
						:max-size="5"
					/>
				</div>
			</div>

			<div class="personal__form-rowTop">
				<div class="personal__form-rowTop-info">
					<span>
						Resume lo que hace tu organizacion
						<cp-info-pop-up
							id="resume"
							info="250-500 palabras"
						/>
					</span>
				</div>
				<div class="personal__form-rowTop-input">
					<cp-text-area v-model="partnerPersonalForm.resume" text-area-id="resume_id" text-area-placeholder="Resume lo que hace tu organizacion"/>
				</div>
			</div>

			<div class="personal__form-rowTop">
				<div class="personal__form-rowTop-info">
					<span>
						Sube el vídeo de tu empresa o incrusta un enlace desde youtube o vimeo
						<cp-info-pop-up
							id="video_id"
							info="250-500 palabras"
						/>
						<div class="personal__form-switcherBlock">
							<cp-switcher
								v-model="videoFiileValue"
								:default-option="videoFiileValue"
								switcher-name="compVideo"
								:switcher-options="compVideoSwitcherOptions"
							/>
						</div>
					</span>
				</div>
				<div class="personal__form-rowTop-input">
					<cp-drag-n-drop
						v-if="videoFiileValue === 'File'"
						v-model="partnerPersonalForm.files.video"
						:is-single="true"
						type="video"
						:max-size="50"
					/>
					<cp-text-input2
						v-else	
						id="linkVideo_id"
						v-model="partnerPersonalForm.videoLink"
						:circle="true"
						label-text="YouTube / Vimeo"
						placeholder="https://www.youtube.com/"
					/>
				</div>
			</div>

			<div class="personal__form-rowTop">
				<div class="personal__form-rowTop-info">
					<span>
						Redes sociales
						<cp-info-pop-up
							id="socials_id"
							info="No se admitirán redes personales"
						/>
					</span>
				</div>
				<div class="personal__form-rowTop-input">
					<div class="partners__form-rowTop-input-socialsAndContacts">
						<span class="personal__form-rowTop-semiBlock-social">
							<cp-text-input2
								id="telegram_id"
								v-model="partnerPersonalForm.socials.telegram"
								:circle="true"
								label-text="Telegram"
								placeholder="https://www.youtube.com/"
							/>
						</span>
						<span class="personal__form-rowTop-semiBlock-social">
							<cp-text-input2
								id="twitter_id"
								v-model="partnerPersonalForm.socials.twitter"
								:circle="true"
								label-text="Twitter"
								placeholder="https://www.youtube.com/"
							/>
						</span>
						<span class="personal__form-rowTop-semiBlock-social">
							<cp-text-input2
								id="facebook_id"
								v-model="partnerPersonalForm.socials.facebook"
								:circle="true"
								label-text="Facebook"
								placeholder="https://www.youtube.com/"
							/>
						</span>
						<span class="personal__form-rowTop-semiBlock-social">
							<cp-text-input2
								id="instagram_id"
								v-model="partnerPersonalForm.socials.instagram"
								:circle="true"
								label-text="Instagram"
								placeholder="https://www.youtube.com/"
							/>
						</span>
						<span class="personal__form-rowTop-semiBlock-social">
							<cp-text-input2
								id="youtube_id"
								v-model="partnerPersonalForm.socials.youtube"
								:circle="true"
								label-text="YouTube"
								placeholder="https://www.youtube.com/"
							/>
						</span>
						<span class="personal__form-rowTop-semiBlock-social">
							<cp-text-input2
								id="linkedin_id"
								v-model="partnerPersonalForm.socials.linkedin"
								:circle="true"
								label-text="Linkedin"
								placeholder="https://www.youtube.com/"
							/>
						</span>
					</div>
				</div>
			</div>

			<div class="personal__form-rowTop">
				<div class="personal__form-rowTop-info">
					<span>
						Añadir datos del contacto de la empresa
						<cp-info-pop-up
							id="contacts_id"
							info="Agregar número activo para la comunicación y con formato internacional. ej: 51 933625150 "
						/>
					</span>
				</div>
				<div class="personal__form-rowTop-input">
					<div class="partners__form-rowTop-input-socialsAndContacts">
						<span class="personal__form-rowTop-semiBlock-social">
							<cp-text-input2
								id="place_id"
								v-model="partnerPersonalForm.contacts.place"
								:circle="false"
								label-text="País y ciudad"
								placeholder="introduzca el enlace"
							/>
						</span>
						<span class="personal__form-rowTop-semiBlock-social">
							<cp-text-input2
								id="tel_id"
								v-model="partnerPersonalForm.contacts.tel"
								:circle="false"
								label-text="Teléfono de la empresa"
								placeholder="introduzca el enlace"
							/>
						</span>
						<span class="personal__form-rowTop-semiBlock-social">
							<cp-text-input2
								id="email_id"
								v-model="partnerPersonalForm.contacts.email"
								type="email"
								:circle="false"
								label-text="Email"
								placeholder="introduzca el enlace"
							/>
						</span>
					</div>
				</div>
			</div>

			<div class="personal__form-rowTop">
				<div class="personal__form-rowTop-info">
					<span>
						Introduce información clave sobre ti
					</span>
				</div>
				<div class="personal__form-rowTop-input">
					<cp-text-area v-model="partnerPersonalForm.selfInfo" text-area-id="selfInfo_id" text-area-placeholder="Introduzca el texto"/>
				</div>
			</div>

			<div class="personal__form-rowTop">
				<div class="personal__form-rowTop-info">
					<span>
						Sube contenido de foto 
						<cp-info-pop-up
							id="mediaContent_picture_id"
							info="El banner debe cargarse a 1100 por 278 píxeles en formato .png"
						/>
					</span>
				</div>
				<div class="personal__form-rowTop-input">
					<cp-drag-n-drop
						v-model="partnerPersonalForm.files.mediaContent.picture"
						:is-single="true"
						type="image"
						:max-size="5"
					/>
				</div>
			</div>

			<div class="personal__form-rowTop">
				<div class="personal__form-rowTop-info">
					<span>
						Sube contenido de vídeo 
						<cp-info-pop-up
							id="mediaContent_video_id"
							info="El banner debe cargarse a 1100 por 278 píxeles en formato .png"
						/>
					</span>
				</div>
				<div class="personal__form-rowTop-input">
					<cp-drag-n-drop
						v-model="partnerPersonalForm.files.mediaContent.video"
						:is-single="true"
						type="video"
						:max-size="25"
					/>
				</div>
			</div>

			<div class="personal__form-submit">
				<cp-button
					ref="submitBtn"
					class="personal__form-submit-btnContainer"
					width="maxWidth"
					size="small"
					shape="oval"
					color="yellowGrey"
					text="Publicar"
					:disabled="formSending"
					@click="sendPartnerRegistrationForm"
				/>
			</div>
		</v-form>
	</div>
</template>

<script setup lang="ts">
import { toast } from 'vue3-toastify';
import CpButton from '@shared/gui/CpButton.vue';
import CpDragNDrop from '@shared/gui/CpDragNDrop.vue';
import { Form as VForm, Field as VField } from 'vee-validate';
import type { partnerPersonalFormDataType } from '@shared/api/types';

// test variables -------------------------------

const compVideoSwitcherOptions = [
	{ optionName: 'Upload File', optionValue: 'File', optionKey: 'FileKey' },
	{ optionName: 'Paste Link', optionValue: 'Link', optionKey: 'LinkKey' },
];

const videoFiileValue = ref<string | null>('File');

watch(videoFiileValue, () => {
	partnerPersonalForm.videoLink = '';
	partnerPersonalForm.files.video = null;
});

const cultureTypeVars = [
    { id: '1', value: '1', label: 'Consciencia ambiental' },
    { id: '2', value: '2', label: 'Gestion cultural' },
    { id: '3', value: '3', label: 'Artes escénicas y danzas' },
    { id: '4', value: '4', label: 'Fotografia , audiovisual, cinematografico y nuevos medios' },
    { id: '5', value: '5', label: 'Lenguas indigenas u originarias y tradición oral' },
    { id: '6', value: '6', label: 'Artesania' },
    { id: '7', value: '7', label: 'Artes visuales' },
    { id: '8', value: '8', label: 'Galeria y espacios de arte' },
    { id: '9', value: '9', label: 'Libro y lectura' },
    { id: '10', value: '10', label: 'Gastronomia tipica' },
    { id: '11', value: '11', label: 'Creador de contenido en plataformas digitales' },
];

// ----------------------------------------------

const isSpin = ref<boolean>(false);
const formSending = ref<boolean>(false);
const personalPartnerForm = ref<HTMLFormElement | null>(null);

const partnerPersonalForm = reactive<partnerPersonalFormDataType>({
    cultureType: [],
	resume: '',
	videoLink: '',
	selfInfo: '',
	socials: {
		telegram: '',
		facebook: '',
		youtube: '',
		twitter: '',
		instagram: '',
		linkedin: '',
	},
	contacts: {
		place: '',
		tel: '',
		email: '',
	},
	files: {
		image: null,
		video: null,
		mediaContent: {
			picture: null,
			video: null,
		},
	},
});

const checkboxCollectCultureType = (value: number, index: number) => {
	if (value) {
		partnerPersonalForm.cultureType.push(value);
	} else {
		partnerPersonalForm.cultureType.splice(index, 1);
	}
};

const sendPartnerRegistrationForm = async () => {
	await personalPartnerForm.value?.validate();
    isSpin.value = true;
    formSending.value = true;
    setTimeout(() => {
        isSpin.value = false;
        formSending.value = false;
        toast.success('test submit');
    }, 1500);
};
</script>

<style scoped lang="scss">
.personal {
    box-sizing: border-box;
    padding: 0 20px 0 20px;

    h2 {
        font-family: 'Poppins-Medium';
        font-size: 82px;
        color: $soft-black;
        width: 100%;
        text-align: center;
        line-height: 123px;

        @media screen and (max-width: 1280px) {
            font-size: 72px;
            line-height: 108px;
        }

        @media screen and (max-width: 768px) {
            font-size: 40px;
            line-height: 60px;
        }

        @media screen and (max-width: 466px) {
            font-size: 30px;
            line-height: 39px;
        }
        
    }

    &__form {
		width: 100%;
		margin-top: 100px;

		h3 {
			font-size: 34px;
			font-weight: 500;
			line-height: 47.6px;

			@media (max-width: 1265px) {
				line-height: 80px;
			}

			@media (max-width: 1024px) {
				font-size: 25px;
				line-height: 35px;
			}
		}

		&-row {
			display: flex;
			align-items: center;
			margin: 60px 0 60px 0;

			@media (max-width: 955px) {
				flex-direction: column;
				align-items: flex-start;
			}

			&-info {
				display: flex;
				align-items: center;
				width: 55%;
				padding-right: 55px;
				font-size: 24px;
				font-weight: 500;
				line-height: 33.6px;
				color: $soft-black;

				@media screen and (max-width: 1280px) {
					
				}

				@media (max-width: 955px) {
					width: 100%;
				}

				span {
					padding-top: 5px;
					text-align: start;
				}

				&-required {
					color: red;
					font-size: 32px;
					margin-left: -20px;

					@media (max-width: 430px) {
						margin-left: -15px !important;
						padding-left: 5px !important;
					}
				}
			}

			&-input {
				display: flex;
				align-items: center;
				flex-direction: column;
				width: 55%;

                &-horizontal {
                    width: 55%;
                    display: flex;

                    div {
                        margin-right: 21px;
                        width: 45%;
                    }

					@media screen and (max-width: 955px) {
						margin-top: 15px;
						width: 100%;
					}

					@media screen and (max-width: 530px) {
						margin-top: 0;
						flex-direction: column;
						width: 100%;

						div {
							margin-top: 15px;
							width: 100%;
						}
					}
                }

				&-checks {
					display: flex;
					height: 250px;
					align-items: center;
					flex-direction: column;
					flex-wrap: wrap;
					width: 55%;
				}

				&-socialsAndContacts {
					span {
						@media (max-width: 720px) {
							width: 100%;
						}
					}
					@media (max-width: 720px) {
						flex-direction: column;
						align-items: flex-start !important;
					}
				}

				@media (max-width: 955px) {
					width: 100%;
					margin-top: 20px;
				}

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

		&-rowTop {
			display: flex;
			align-items: flex-start;
			margin: 60px 0 60px 0;

			@media (max-width: 955px) {
				flex-direction: column;
				align-items: flex-start;
			}

			&-info {
				display: flex;
				align-items: center;
				width: 55%;
				padding-right: 55px;
				padding-top: 5px;
				font-size: 24px;
				font-weight: 500;
				line-height: 33.6px;
				color: $soft-black;

				@media (max-width: 955px) {
					width: 100%;
					padding-right: 0;
				}

				span {
					padding-top: 5px;
					text-align: start;
				}

				&-required {
					color: red;
					font-size: 32px;
					margin-left: -20px;

					@media (max-width: 430px) {
						margin-left: -15px !important;
						padding-left: 5px !important;
					}
				}
			}

			&-input {
				display: flex;
				align-items: center;
				flex-direction: column;
				width: 55%;

                &-horizontal {
                    width: 55%;
                    display: flex;

                    div {
                        margin-right: 21px;
                        width: 45%;
                    }
                }

				&-checks {
					display: flex;
					height: 250px;
					align-items: flex-start;
					flex-direction: column;
					flex-wrap: wrap;
					width: 55%;

					div{
						width: 50%;
						margin-right: 15px
					}

					@media screen and (max-width: 1080px) {
						height: 350px;
					}

					@media screen and (max-width: 960px) {
						height: 380px;
					}

					@media screen and (max-width: 955px) {
						margin-top: 15px;
						width: 100%;
						height: 250px;
					}

					@media screen and (max-width: 560px) {
						height: 380px;
					}

					@media screen and (max-width: 430px) {
						height: auto;

						div{
							width: 100%;
							margin-right: 15px
						}
					}
				}

				&-socialsAndContacts {
					span {
						@media (max-width: 720px) {
							width: 100%;
						}
					}

					@media (max-width: 720px) {
						flex-direction: column;
						align-items: flex-start !important;
					}
				}

				@media (max-width: 955px) {
					margin-top: 20px;
					width: 100%;
				}

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
						min-height: 250px;
					}

					@media (max-width: 720px) {
						width: 100%;
					}
				}

				&-input {
					width: 50%;
					padding: 10px;
					margin-top: 15px;

					&-maxWidth {
						width: 100%;
						min-height: 250px;
					}

					&-subInputs {
						margin-top: 15px;
					}
				}
			}
		}

		&-switcherBlock {
			display: flex;
			height: 45px;
			margin-top: 30px;
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

.required-input {
	&-default {
		width: 100%;

		&-socialMedia {
			width: 100%;
			margin-right: 25px;
		}
	}

	&-error {
		&-socialMedia {
			border-bottom: 1px solid crimson;
			width: 100%;
			margin-right: 25px;
		}

		&-textInput {
			border: 1px solid crimson;
			border-radius: 12px;
		}

		&-info {
			&-leftSide {
				display: flex;
				align-items: center;
				width: 100%;
				color: crimson;
				justify-content: flex-start;
				line-height: 35px;
			}

			&-center {
				display: flex;
				align-items: center;
				width: 100%;
				color: crimson;
				justify-content: space-around;
				line-height: 35px;
			}
		}
	}
}
</style>