<template>
	<div class="eventForm">
		<h2 class="eventForm-title">Crear un nuevo evento</h2>
		<v-form>

			<!-- Event Name -->
			<div class="eventForm-row">
				<div class="eventForm-row-info">
					<span>
						<!-- <strong class="eventForm-row-info-required">*</strong> -->
						Introduce el nombre de tu evento
					</span>
				</div>
				<div class="eventForm-row-input fullWidth-eventName">
					<cp-text-input v-model="eventName" placeholder="input" type="text"/>
				</div>
			</div>

			<!-- Event Category -->
			<div class="eventForm-upperPositionRow">
				<div class="eventForm-upperPositionRow-info">
					<span>
						<strong class="eventForm-upperPositionRow-info-required">*</strong>
						Seleccionar categoría de evento
					</span>
				</div>
				<div class="eventForm-upperPositionRow-input">
					<cp-check-box 
						v-for="item in categoryCheckBoxes"
						:id="item.id"
						:key="item.id" 
						:value="item.value"
						:title="item.title"
					/>
				</div>
			</div>

			<!-- Event Poster/Banner -->
			<div class="eventForm-upperPositionRow">
				<div class="eventForm-upperPositionRow-info">
					<span>
						<strong class="eventForm-upperPositionRow-info-required">*</strong>
						Sube un banner o póster del evento
						<cp-info-pop-up
							id="banner_poster"
							info="El banner debe cargarse a 1100 por 278 píxeles en formato .png"
						/>
					</span>
				</div>
				<div class="eventForm-upperPositionRow-input fullWidth-banner">
					<v-field
						v-slot="{ errors }"
						:model-value="testFileBanner"
						name="productDescription"
						rules="required_file"
					>
						<cp-drag-n-drop
							v-model="testFileBanner"
							:is-single="true"
							type="image"
							:max-size="5"
							:is-invalid="errors.length > 0"
						/>
						<span v-if="errors" class="required-input-error-info-center">{{
							errors[0]
						}}</span>
					</v-field>
				</div>
			</div>

			<!-- Socials  -->
			<div class="eventForm-upperPositionRow">
				<div class="eventForm-upperPositionRow-info">
					<span>
						<strong class="eventForm-upperPositionRow-info-required">*</strong>
						Eventos de redes sociales
						<cp-info-pop-up
							id="socials"
							info="Selecciona redes sociales donde podrás compartir el enlace del evento."
						/>
					</span>
				</div>
				<div class="eventForm-upperPositionRow-input fullWidth-socials">
					<div class="eventForm-upperPositionRow-input-socialsAndContacts">
						<span class="eventForm-upperPositionRow-input-socialsAndContacts-social">
							<cp-text-input2
								id="telegram_id"
								v-model="socials.telegram"
								:circle="true"
								label-text="Telegram"
								placeholder="https://www.youtube.com/"
							/>
						</span>
						<span class="eventForm-upperPositionRow-input-socialsAndContacts-social">
							<cp-text-input2
								id="facebook_id"
								v-model="socials.facebook"
								:circle="true"
								label-text="Facebook"
								placeholder="https://www.youtube.com/"
							/>
						</span>
						<span class="eventForm-upperPositionRow-input-socialsAndContacts-social">
							<cp-text-input2
								id="youtube_id"
								v-model="socials.youtube"
								:circle="true"
								label-text="Youtube"
								placeholder="https://www.youtube.com/"
							/>
						</span>
						<span class="eventForm-upperPositionRow-input-socialsAndContacts-social">
							<cp-text-input2
								id="twitter_id"
								v-model="socials.twitter"
								:circle="true"
								label-text="Twitter"
								placeholder="https://www.youtube.com/"
							/>
						</span>
						<span class="eventForm-upperPositionRow-input-socialsAndContacts-social">
							<cp-text-input2
								id="instagram_id"
								v-model="socials.instagram"
								:circle="true"
								label-text="Instagram"
								placeholder="https://www.youtube.com/"
							/>
						</span>
						<span class="eventForm-upperPositionRow-input-socialsAndContacts-social">
							<cp-text-input2
								id="linkedin_id"
								v-model="socials.linkedin"
								:circle="true"
								label-text="Linkedin"
								placeholder="https://www.youtube.com/"
							/>
						</span>
					</div>
				</div>
			</div>

			<!-- Event details -->
			<div class="eventForm-upperPositionRow">
				<div class="eventForm-upperPositionRow-info">
					<span>
						<strong class="eventForm-upperPositionRow-info-required">*</strong>
						Complete los siguientes detalles del evento
						<cp-info-pop-up
							id="socials"
							info="Selecciona redes sociales donde podrás compartir el enlace del evento."
						/>
					</span>
				</div>
				<div class="eventForm-upperPositionRow-input fullWidth-details">
					<div class="eventForm-upperPositionRow-input-details">
						<span class="eventForm-upperPositionRow-input-details-input">
							<cp-text-input2
								id="event_date_id"
								v-model="socials.telegram"
								:circle="false"
								label-text="Fecha y hora"
								placeholder="introduzca el enlace"
							/>
						</span>
						<span class="eventForm-upperPositionRow-input-details-input">
							<cp-text-input2
								id="tickets_buy_id"
								v-model="socials.facebook"
								:circle="false"
								label-text="Enlace para comprar entradas"
								placeholder="introduzca el enlace"
							/>
						</span>
						<span class="eventForm-upperPositionRow-input-details-input">
							<cp-text-input2
								id="event_place_id"
								v-model="socials.youtube"
								:circle="false"
								label-text="Ubicación del evento"
								placeholder="introduzca el enlace"
							/>
						</span>
					</div>
				</div>
			</div>

			<!-- Event description -->
			<div class="eventForm-upperPositionRow">
				<div class="eventForm-upperPositionRow-info">
					<span>
						Introduce una descripción de tu evento
					</span>
				</div>
				<div class="eventForm-upperPositionRow-input fullWidth-details">
					<div class="eventForm-upperPositionRow-input-details">
						<cp-text-area
							v-model="testDescription"
							text-area-id="event_description_id"
							text-area-placeholder="input"
						/>
					</div>
				</div>
			</div>

			<!-- Media b'out event -->
			<div class="eventForm-upperPositionRow">
				<div class="eventForm-upperPositionRow-info">
					<span>
						<strong class="eventForm-upperPositionRow-info-required">*</strong>
						Sube contenido de foto, video o audio sobre tu evento
						<cp-info-pop-up
							id="media_id"
							info="El banner debe cargarse a 1100 por 278 píxeles en formato .png"
						/>
						<div class="eventForm-upperPositionRow-info-switcherBlock">
							<cp-switcher
								v-model="defaultMediaValue"
								:default-option="defaultMediaValue"
								switcher-name="compVideo"
								:switcher-options="compMediaSwitcherOptions"
							/>
						</div>
					</span>
				</div>
				<div class="eventForm-upperPositionRow-input fullWidth-banner">
					<v-field
						v-if="defaultMediaValue === 'photo'"
						v-slot="{ errors }"
						:model-value="testFileMediaPhoto"
						name="eventMediaPhoto"
						rules="required_file"
					>
						<cp-drag-n-drop
							
							v-model="testFileMediaPhoto"
							:is-single="true"
							type="image"
							:max-size="5"
							:is-invalid="errors.length > 0"
						/>
						<span v-if="errors" class="required-input-error-info-center">
							{{ errors[0]}}
						</span>
					</v-field>

					<v-field
						v-if="defaultMediaValue === 'video'"
						v-slot="{ errors }"
						:model-value="testFileMediaVideo"
						name="eventMediaVideo"
						rules="required_file"
					>
						<cp-drag-n-drop
							
							v-model="testFileMediaVideo"
							:is-single="true"
							type="video"
							:max-size="5"
							:is-invalid="errors.length > 0"
						/>
						<span v-if="errors" class="required-input-error-info-center">
							{{ errors[0]}}
						</span>
					</v-field>
				</div>
			</div>

			<!-- Event info -->
			<div class="eventForm-upperPositionRow">
				<div class="eventForm-upperPositionRow-info">
					<span>
						<strong class="eventForm-upperPositionRow-info-required">*</strong>
						Complete los siguientes detalles del evento
					</span>
				</div>
				<div class="eventForm-upperPositionRow-input fullWidth-details">
					<div class="eventForm-upperPositionRow-input-details">
						<span class="eventForm-upperPositionRow-input-details-input">
							<cp-text-input2
								id="duration_id"
								v-model="eventInfo.duration"
								:circle="false"
								label-text="Duración en minutos"
								placeholder="introduzca el enlace"
							/>
						</span>
						<span class="eventForm-upperPositionRow-input-details-input">
							<cp-text-input2
								id="rules_id"
								v-model="eventInfo.rules"
								:circle="false"
								label-text="Reglas de visita"
								placeholder="introduzca el enlace"
							/>
						</span>
						<span class="eventForm-upperPositionRow-input-details-input">
							<cp-text-input2
								id="age_restrictions_id"
								v-model="eventInfo.age_restrictions"
								:circle="false"
								label-text="Restricciones de edad"
								placeholder="introduzca el enlace"
							/>
						</span>
					</div>
				</div>
			</div>

			<!-- Event city -->
			<div class="eventForm-upperPositionRow">
				<div class="eventForm-upperPositionRow-info">
					<span>
						<strong class="eventForm-upperPositionRow-info-required">*</strong>
						Seleccione la ciudad donde se realizará el evento
					</span>
				</div>
				<div class="eventForm-upperPositionRow-input">
					<cp-check-box 
						v-for="item in cityCheckBoxes"
						:id="item.id"
						:key="item.id" 
						:value="item.value"
						:title="item.title"
					/>
				</div>
			</div>
			
			<div class="eventForm-row">
				<div class="eventForm-row-info">
					<span>
						Introduce la dirección del evento
					</span>
				</div>
				<div class="eventForm-row-input fullWidth-eventName">
					<cp-text-input v-model="eventAdres" placeholder="input" type="text"/>
				</div>
			</div>

			<!-- map\location  -->
			<div class="eventForm-upperPositionRow">
				<div class="eventForm-upperPositionRow-info">
					<span>
						<strong class="eventForm-upperPositionRow-info-required">*</strong>
						Marcar la ubicación del evento
					</span>
				</div>
				<div class="eventForm-upperPositionRow-input fullWidth-map">
					<div class="eventForm__map">
						<cp-map :map-markers="testMarkers" :center="testMapCenter"/>
					</div>
				</div>
			</div>

			<!-- Contacts -->
			<div class="eventForm-upperPositionRow">
				<div class="eventForm-upperPositionRow-info">
					<span>
						<strong class="eventForm-upperPositionRow-info-required">*</strong>
						Complete los datos de contacto del organizador y del servicio de soporte.
					</span>
				</div>
				<div class="eventForm-upperPositionRow-input fullWidth-details">
					<div class="eventForm-upperPositionRow-input-details">
						<span class="eventForm-upperPositionRow-input-details-input">
							<cp-text-input2
								id="tel_id"
								v-model="contacts.tel"
								:circle="false"
								label-text="Número de teléfono"
								placeholder="introduzca el enlace"
							/>
						</span>
						<span class="eventForm-upperPositionRow-input-details-input">
							<cp-text-input2
								id="E-mail_id"
								v-model="contacts.mail"
								:circle="false"
								label-text="E-mail"
								placeholder="introduzca el enlace"
							/>
						</span>
					</div>
				</div>
			</div>
		</v-form>
	</div>
</template>

<script setup lang="ts">
import { Form as VForm, Field as VField } from 'vee-validate';
import { generateUniqueId } from '@shared/helpers/generateUid';
import { toast } from 'vue3-toastify';
import CpButton from '@shared/gui/CpButton.vue';
import CpTextInput from '@shared/gui/CpTextInput.vue';
import CpTextInput2 from '@shared/gui/CpTextInput2.vue';
import CpTextArea from '@shared/gui/CpTextArea.vue';
import CpDragNDrop from '@shared/gui/CpDragNDrop.vue';
import CpCheckBox from '@shared/gui/CpCheckBox.vue';
import CpInfoPopUp from '@shared/gui/CpInfoPopUp.vue';
import CpMap from '@shared/gui/CpMap.vue';

// TEST VARIABLES -------------------------------

type CheckboxTypes = {
	id: string;
	value: string;
	title: string;
}[];

type SocialsType = {
	telegram: string;
	facebook: string;
	youtube: string;
	twitter: string;
	instagram: string;
	linkedin: string;
};

type EventInfoType = {
	duration: string;
	rules: string;
	age_restrictions: string;
};

type ContactsType = {
	mail: string;
	tel: string;
};

const socials = ref<SocialsType>({
	telegram: '',
	facebook: '',
	youtube: '',
	twitter: '',
	instagram: '',
	linkedin: '',
});

const eventInfo = ref<EventInfoType>({
	duration: '',
	rules: '',
	age_restrictions: '',
});

const eventName = ref<string>('');
const testFileBanner = ref<File | null>(null);
const testFileMediaPhoto = ref<File | null>(null);
const testFileMediaVideo = ref<File | null>(null);
const testDescription = ref<string>('');
const eventAdres = ref<string>('');

const categoryCheckBoxes:CheckboxTypes = [
	{ id: 'environmental_awareness', value: 'environmental_awareness', title: 'Consciencia ambiental' },
	{ id: 'cultural_management', value: 'cultural_management', title: 'Gestion cultural' },
	{ id: 'performing_arts_dance', value: 'performing_arts_dance', title: 'Artes escenicas y danzas' },
	{ id: 'photography_audiovisual_cinematography_new_media', value: 'photography_audiovisual_cinematography_new_media', title: 'Fotografia, audiovisual, cinematografico y nuevos medios' },
	{ id: 'craft', value: 'craft', title: 'Artesania' },
	{ id: 'visual_art', value: 'visual_art', title: 'Artes visuales' },
	{ id: 'gallery_art_spaces', value: 'gallery_art_spaces', title: 'Galeria y espacios de arte' },
	{ id: 'indigenous_native_languages_oral_tradition', value: 'indigenous_native_languages_oral_tradition', title: 'Lenguas indigenas u originarias y tradición oral' },
	{ id: 'books', value: 'books', title: 'Libro y lectura' },
	{ id: 'gastronomy', value: 'gastronomy', title: 'Gastronomia tipica' },
	{ id: 'digital_content_create', value: 'digital_content_create', title: 'Creador de contenido en plataformas digitales' },
];

const defaultMediaValue = ref<string>('photo');

const compMediaSwitcherOptions = [
	{ optionName: 'Upload photo', optionValue: 'photo', optionKey: 'photoKey' },
	{ optionName: 'Upload video', optionValue: 'video', optionKey: 'videoKey' },
];

const cityCheckBoxes:CheckboxTypes = [
	{ id: 'Acomayo', value: 'Acomayo', title: 'Acomayo' },
	{ id: 'Anta', value: 'Anta', title: 'Anta' },
	{ id: 'Calca', value: 'Calca', title: 'Calca' },
	{ id: 'Canas', value: 'Canas', title: 'Canas' },
	{ id: 'Espinar', value: 'Espinar', title: 'Espinar' },
	{ id: 'Canchis', value: 'Canchis', title: 'Canchis' },
	{ id: 'Cusco', value: 'Cusco', title: 'Cusco' },
	{ id: 'Chumbivilcas', value: 'Chumbivilcas', title: 'Chumbivilcas' },
	{ id: 'La Convención', value: 'La Convención', title: 'La Convención' },
	{ id: 'Paruro', value: 'Paruro', title: 'Paruro' },
	{ id: 'Paucartambo', value: 'Paucartambo', title: 'Paucartambo' },
	{ id: 'Quispicanchis', value: 'Quispicanchis', title: 'Quispicanchis' },
	{ id: 'Urubamba', value: 'Urubamba', title: 'Urubamba' },
];

const testMarkers = [{ coordinates: [-12.046016, -77.030554] }];
const testMapCenter = [-12.046016, -77.030554];

const contacts = ref<ContactsType>({
	mail: '',
	tel: '',
});

// ----------------------------------------------

// const checkboxCollectCategories = (e: Event) => {
// 	const target = e.target as HTMLInputElement;
// 	if (target.checked) {

// 	} else {

// 	}
// };

// const checkboxCollectCities = (e: Event) => {
// 	const target = e.target as HTMLInputElement;
// 	if (target.checked) {

// 	} else {
		
// 	}
// };
</script>

<style scoped lang="scss">
    .eventForm {
        padding: 0 20px 0 20px;
        margin-top: 33px;

        &-title {
            width: 100%;
            font-family: "Poppins-Medium";
            text-align: center;
            font-size: 70px;
            font-style: normal;
            font-weight: 500;
            line-height: 120%; 
            margin-bottom: 50px;
        }

        &-row {
			display: flex;
			align-items: center;
			margin: 70px 0 70px 0;

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

				@media screen and (max-width: 955px) {
					width: 100%;
				}

				span {
					padding-top: 5px;
					text-align: start;
					font-size: 34px;
					font-style: normal;
					font-weight: 500;
					line-height: normal;

					@media screen and (max-width: 955px) {
						width: 100%;
					}
				}

				&-required {
					color: red;
					font-size: 32px;
				}

				&-switcherBlock {
					display: flex;
					height: 45px;
					margin-top: 30px;
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

				&-socialsAndContacts {
					&-social {
						width: 50%;
						padding: 10px;
						margin-top: 15px;

						&-maxWidth {
							width: 100%;
							min-height: 250px
						}
					}

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
			}
		}

		&-upperPositionRow {
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
				font-size: 24px;
				font-weight: 500;
				line-height: 33.6px;
				color: $soft-black;

				@media screen and (max-width: 955px) {
					width: 100%;
				}

				span {
					margin-top: -5px;
					text-align: start;
					font-size: 34px;
					font-style: normal;
					font-weight: 500;
					line-height: normal;

					@media screen and (max-width: 955px) {
						width: 100%;
					}
				}

				&-required {
					color: red;
					font-size: 32px;
				}

				&-switcherBlock {
					display: flex;
					height: 45px;
					margin-top: 30px;
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

				&-socialsAndContacts {
					&-social {
						width: 50%;
						padding: 10px;
						margin-top: 15px;

						&-maxWidth {
							width: 100%;
							min-height: 250px
						}
					}

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

				&-details {
					display: flex;
					flex-direction: column;
					align-items: flex-start !important;
					width: 100%;

					@media screen and (max-width: 955px) {
						width: 100%;
					}

					&-input {
						display: inline-block;
						width: 50%;
						margin-bottom: 35px;

						@media screen and (max-width: 955px) {
							width: 100%;
						}
					}
				}
			}
		}

		&__map {
            width: 100%;
            height: 30vw;
			border-radius: 30px;
			overflow: hidden;

            &-title {
                margin-top: 20px;
                margin-bottom: 40px;
                font-size: 60px;
                line-height: 84px;
                font-weight: 500;
                color: #353333;
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

	.fullWidth {
		&-details {
			@media screen and (max-width: 955px) {
				width: 100%;
			}
		}

		&-socials {
			@media screen and (max-width: 955px) {
				width: 100%;
			}
		}

		&-banner {
			@media screen and (max-width: 955px) {
				display: flex;
				justify-content: space-around;
				width: 100%;
			}
		}

		&-eventName {
			@media screen and (max-width: 955px) {
				display: flex;
				justify-content: space-around;
				width: 100%;
			}
		}

		&-map {
			@media screen and (max-width: 955px) {
				display: flex;
				justify-content: space-around;
				width: 100%;
			}
		}
	}
</style>