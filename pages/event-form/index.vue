<template>
	<div class="eventForm">
		<cp-spinner :is-spinned="isSpin" />
		<h2 class="eventForm-title">Crear un nuevo evento</h2>
		<v-form ref="eventCreateFormTemplate">
			<!-- Event Name -->
			<div class="eventForm-row">
				<div class="eventForm-row-info">
					<span>
						<strong class="eventForm-row-info-required">*</strong>
						Introduce el nombre de tu evento
					</span>
				</div>
				<div class="eventForm-row-input fullWidth-eventName">
					<v-field
						v-slot="{ errors }"
						:model-value="eventCreateForm.eventName"
						name="eventName"
						rules="required"
					>
						<cp-text-input
							v-model="eventCreateForm.eventName"
							placeholder="nombre del evento"
							type="text"
							:class="{ 'required-input-error-textInput': errors.length > 0 }"
						/>
						<span v-if="errors" class="required-input-error-info-center">
							{{ errors[0] }}
						</span>
					</v-field>
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
					<v-field
						v-slot="{ errors }"
						name="eventCategory"
						rules="require_checkbox"
						:model-value="eventCreateForm.eventCategory"
					>
						<cp-check-box
							v-for="item in categoryCheckBoxes"
							:id="item.id"
							:key="item.id"
							:value="item.value"
							:title="item.title"
							@change="checkboxCollectCategories"
						/>
						<span
							v-if="errors && eventCreateForm.eventCategory.length < 1"
							class="required-input-error-info-leftSide"
						>
							{{ errors[0] }}
						</span>
					</v-field>
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
						:model-value="eventCreateForm.files.eventBanner"
						name="eventBanner"
						rules="required_file"
					>
						<cp-drag-n-drop
							v-model="eventCreateForm.files.eventBanner"
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
						Eventos de redes sociales
						<cp-info-pop-up
							id="socials"
							info="Selecciona redes sociales donde podrás compartir el enlace del evento."
						/>
					</span>
				</div>
				<div class="eventForm-upperPositionRow-input fullWidth-socials">
					<div class="eventForm-upperPositionRow-input-socialsAndContacts">
						<span
							class="eventForm-upperPositionRow-input-socialsAndContacts-social"
						>
							<cp-text-input2
								id="telegram_id"
								v-model="eventCreateForm.eventSocialMedias.telegram"
								:circle="true"
								label-text="Telegram"
								placeholder="https://www.youtube.com/"
							/>
						</span>
						<span
							class="eventForm-upperPositionRow-input-socialsAndContacts-social"
						>
							<cp-text-input2
								id="facebook_id"
								v-model="eventCreateForm.eventSocialMedias.facebook"
								:circle="true"
								label-text="Facebook"
								placeholder="https://www.youtube.com/"
							/>
						</span>
						<span
							class="eventForm-upperPositionRow-input-socialsAndContacts-social"
						>
							<cp-text-input2
								id="youtube_id"
								v-model="eventCreateForm.eventSocialMedias.youtube"
								:circle="true"
								label-text="Youtube"
								placeholder="https://www.youtube.com/"
							/>
						</span>
						<span
							class="eventForm-upperPositionRow-input-socialsAndContacts-social"
						>
							<cp-text-input2
								id="twitter_id"
								v-model="eventCreateForm.eventSocialMedias.twitter"
								:circle="true"
								label-text="Twitter"
								placeholder="https://www.youtube.com/"
							/>
						</span>
						<span
							class="eventForm-upperPositionRow-input-socialsAndContacts-social"
						>
							<cp-text-input2
								id="instagram_id"
								v-model="eventCreateForm.eventSocialMedias.instagram"
								:circle="true"
								label-text="Instagram"
								placeholder="https://www.youtube.com/"
							/>
						</span>
						<span
							class="eventForm-upperPositionRow-input-socialsAndContacts-social"
						>
							<cp-text-input2
								id="linkedin_id"
								v-model="eventCreateForm.eventSocialMedias.linkedin"
								:circle="true"
								label-text="Linkedin"
								placeholder="https://www.youtube.com/"
							/>
						</span>
					</div>
				</div>
			</div>

			<!-- Event details info -->
			<div class="eventForm-upperPositionRow">
				<div class="eventForm-upperPositionRow-info">
					<span>
						Complete los siguientes detalles del evento
						<cp-info-pop-up
							id="details"
							info="Selecciona redes sociales donde podrás compartir el enlace del evento."
						/>
					</span>
				</div>
				<div class="eventForm-upperPositionRow-input fullWidth-details">
					<div class="eventForm-upperPositionRow-input-details">
						<span class="eventForm-upperPositionRow-input-details-input">
							<cp-text-input2
								id="event_place_id"
								v-model="eventCreateForm.eventContacts.place"
								:circle="false"
								label-text="Ubicación del evento"
								placeholder="introduzca el enlace"
								:tooltip="true"
								tooltip-text="Ingrese al lugar del evento. Por ejemplo, un club u otro establecimiento."
							/>
						</span>
						<span class="eventForm-upperPositionRow-input-details-input">
							<cp-text-input2
								id="event_date_id"
								v-model="eventCreateForm.eventDate"
								:circle="false"
								label-text="Fecha y hora"
								placeholder="introduzca el enlace"
							/>
						</span>
						<span class="eventForm-upperPositionRow-input-details-input">
							<cp-text-input2
								id="duration_id"
								v-model="eventCreateForm.eventDuration"
								:circle="false"
								label-text="Duración en minutos"
								placeholder="introduzca el enlace"
							/>
						</span>
						<span class="eventForm-upperPositionRow-input-details-input">
							<cp-text-input2
								id="rules_id"
								v-model="eventCreateForm.eventRules"
								:circle="false"
								label-text="Reglas de visita"
								placeholder="introduzca el enlace"
							/>
						</span>
						<span class="eventForm-upperPositionRow-input-details-input">
							<cp-text-input2
								id="age_restrictions_id"
								v-model="eventCreateForm.eventAgeRestrictions"
								:circle="false"
								label-text="Restricciones de edad"
								placeholder="introduzca el enlace"
							/>
						</span>
					</div>
				</div>
			</div>

			<!-- Event ticket -->
			<div class="eventForm-row">
				<div class="eventForm-row-info">
					<span>
						<strong class="eventForm-row-info-required">*</strong>
						Enlace para comprar entradas
					</span>
				</div>
				<div class="eventForm-row-input fullWidth-tickets">
					<v-field
						v-slot="{ errors }"
						:model-value="eventCreateForm.linkToBuyTicket"
						name="tickets"
						rules="required"
					>
						<cp-text-input
							v-model="eventCreateForm.linkToBuyTicket"
							placeholder="http://tickets.com"
							type="text"
							:class="{ 'required-input-error-textInput': errors.length > 0 }"
						/>
						<span v-if="errors" class="required-input-error-info-center">
							{{ errors[0] }}
						</span>
					</v-field>
				</div>
			</div>

			<!-- Event description -->
			<div class="eventForm-upperPositionRow">
				<div class="eventForm-upperPositionRow-info">
					<span>
						<strong class="eventForm-upperPositionRow-info-required">*</strong>
						Introduce una descripción de tu evento
					</span>
				</div>
				<div class="eventForm-upperPositionRow-input fullWidth-details">
					<div class="eventForm-upperPositionRow-input-details">
						<v-field
							v-slot="{ errors }"
							:model-value="eventCreateForm.eventDescription"
							name="decription"
							rules="required"
						>
							<cp-text-area
								v-model="eventCreateForm.eventDescription"
								text-area-id="event_description_id"
								text-area-placeholder="input"
								:class="{ 'required-input-error-textInput': errors.length > 0 }"
							/>
							<span v-if="errors" class="required-input-error-info-center">
								{{ errors[0] }}
							</span>
						</v-field>
					</div>
				</div>
			</div>

			<!-- Media b'out event -->
			<div class="eventForm-upperPositionRow">
				<div class="eventForm-upperPositionRow-info">
					<span>
						Sube contenido de foto, video o sobre tu evento
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
					<cp-drag-n-drop
						v-if="defaultMediaValue === 'photo'"
						v-model="eventCreateForm.files.eventMediaPhotos"
						:is-single="true"
						type="image"
						:max-size="5"
					/>
					<cp-drag-n-drop
						v-if="defaultMediaValue === 'video'"
						v-model="eventCreateForm.files.eventMediaVideo"
						:is-single="true"
						type="video"
						:max-size="25"
					/>
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
					<v-field
						v-slot="{ errors }"
						name="eventCity"
						rules="require_checkbox"
						:model-value="eventCreateForm.eventAddress.city"
					>
						<cp-check-box
							v-for="item in cityCheckBoxes"
							:id="item.id"
							:key="item.id"
							:value="item.value"
							:title="item.title"
							@change="checkboxCollectCities"
						/>
						<span
							v-if="errors && eventCreateForm.eventAddress.city.length < 1"
							class="required-input-error-info-leftSide"
						>
							{{ errors[0] }}
						</span>
					</v-field>
				</div>
			</div>

			<!-- Event Adres -->
			<div class="eventForm-row">
				<div class="eventForm-row-info">
					<span>
						<strong class="eventForm-row-info-required">*</strong>
						Introduce la dirección del evento
					</span>
				</div>
				<div class="eventForm-row-input fullWidth-eventName">
					<v-field
						v-slot="{ errors }"
						:model-value="eventCreateForm.eventAddress.address"
						name="eventAdres"
						rules="required"
					>
						<cp-text-input
							v-model="eventCreateForm.eventAddress.address"
							placeholder="dirección del evento"
							type="text"
							:class="{ 'required-input-error-textInput': errors.length > 0 }"
						/>
						<span v-if="errors" class="required-input-error-info-center">
							{{ errors[0] }}
						</span>
					</v-field>
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
						<v-field
							v-slot="{ errors }"
							:model-value="eventCreateForm.eventAddress.eventCoordinates"
							name="eventCoordinates"
							rules="require_coordinates"
						>
							<cp-map
								v-model:coordinates-update="
									eventCreateForm.eventAddress.eventCoordinates
								"
								:coordinates-output="true"
								:center="eventCreateForm.eventAddress.eventCoordinates"
							/>
							<span v-if="errors" class="required-input-error-info-center">
								{{ errors[0] }}
							</span>
						</v-field>
					</div>
				</div>
			</div>

			<!-- Contacts -->
			<div class="eventForm-upperPositionRow">
				<div class="eventForm-upperPositionRow-info">
					<span>
						<strong class="eventForm-upperPositionRow-info-required">*</strong>
						Complete los datos de contacto del organizador y del servicio de
						soporte.
					</span>
				</div>
				<div class="eventForm-upperPositionRow-input fullWidth-details">
					<div class="eventForm-upperPositionRow-input-details">
						<span class="eventForm-upperPositionRow-input-details-input">
							<v-field
								v-slot="{ errors }"
								:model-value="eventCreateForm.eventContacts.tel"
								name="eventTel"
								rules="required"
							>
								<cp-text-input2
									id="tel_id"
									v-model="eventCreateForm.eventContacts.tel"
									:circle="false"
									label-text="Número de teléfono"
									placeholder="introduzca el enlace"
									:class="{
										'required-input-error-socialMedia': errors.length > 0,
									}"
								/>
								<span v-if="errors" class="required-input-error-info-leftSide">
									{{ errors[0] }}
								</span>
							</v-field>
						</span>
						<span class="eventForm-upperPositionRow-input-details-input">
							<v-field
								v-slot="{ errors }"
								:model-value="eventCreateForm.eventContacts.mail"
								name="eventMail"
								rules="required"
							>
								<cp-text-input2
									id="E-mail_id"
									v-model="eventCreateForm.eventContacts.mail"
									:circle="false"
									label-text="E-mail"
									placeholder="introduzca el enlace"
									:class="{
										'required-input-error-socialMedia': errors.length > 0,
									}"
								/>
								<span v-if="errors" class="required-input-error-info-leftSide">
									{{ errors[0] }}
								</span>
							</v-field>
						</span>
					</div>
				</div>
			</div>

			<!-- Event form buttons -->
			<div class="eventForm-buttons">
				<span class="eventForm-buttons-submit">
					<cp-button
						color="yellowGrey"
						shape="oval"
						text="Publicar"
						width="maxWidth"
						size="middle"
						@click="sendCreateEventForm"
					/>
				</span>
				<span class="eventForm-buttons-clear">
					<cp-button
						color="transparent"
						shape="oval"
						text="Borrar"
						width="maxWidth"
						size="middle"
					/>
				</span>
			</div>
		</v-form>
	</div>
</template>

<script setup lang="ts">
import { Form as VForm, Field as VField } from 'vee-validate';
import { toast } from 'vue3-toastify';
import CpButton from '@shared/gui/CpButton.vue';
import CpTextInput from '@shared/gui/CpTextInput.vue';
import CpTextInput2 from '@shared/gui/CpTextInput2.vue';
import CpTextArea from '@shared/gui/CpTextArea.vue';
import CpDragNDrop from '@shared/gui/CpDragNDrop.vue';
import CpCheckBox from '@shared/gui/CpCheckBox.vue';
import CpInfoPopUp from '@shared/gui/CpInfoPopUp.vue';
import CpMap from '@shared/gui/CpMap.vue';
import type { EventCreateType } from '@shared/api/types';
import {
	requestEventCategories,
	eventCreate,
	requestCities,
} from '@shared/api';
const { $objToFormData } = useNuxtApp();

// Form Data ------------------------------------

const eventCreateForm = reactive<EventCreateType>({
	eventName: '',
	eventDescription: '',
	eventCategory: [],
	eventDate: '',
	eventHost: '',
	eventSocialMedias: {
		telegram: '',
		youtube: '',
		instagram: '',
		facebook: '',
		twitter: '',
		linkedin: '',
	},
	eventDuration: '',
	eventAddress: {
		eventCoordinates: '-12.046016, -77.030554',
		city: [],
		address: '',
	},
	linkToBuyTicket: '',
	eventShortDescription: '',
	eventRules: '',
	eventAgeRestrictions: '',
	eventContacts: {
		place: '',
		tel: '',
		mail: '',
	},
	files: {
		eventBanner: null,
		eventMediaPhotos: null,
		eventMediaVideo: null,
	},
});

// Variables ------------------------------------
const eventCategories = ref([]);
const cities = ref([]);

const eventCreateFormTemplate = ref<HTMLFormElement | null>(null);

const isSpin = ref<boolean>(false);

type CheckboxTypes = {
	id: string;
	value: string;
	title: string;
}[];

onBeforeMount(() => {
	getEventCategories();
	getCities();
});

const categoryCheckBoxes = computed(() => {
	if (!eventCategories.value?.length) {
		return [];
	}

	return eventCategories.value.map((category) => {
		return {
			id: category.attributes.eventCategoryCode,
			value: category.attributes.eventCategoryCode,
			title: category.attributes.eventCategoryName,
		};
	});
});

const defaultMediaValue = ref<string>('photo');

const compMediaSwitcherOptions = [
	{ optionName: 'Upload photo', optionValue: 'photo', optionKey: 'photoKey' },
	{ optionName: 'Upload video', optionValue: 'video', optionKey: 'videoKey' },
];

const cityCheckBoxes = computed(() => {
	if (!cities.value?.length) {
		return [];
	}

	return cities.value.map((city) => {
		return {
			id: city.attributes.cityCode,
			value: city.attributes.cityCode,
			title: city.attributes.cityName,
		};
	});
});

// Functions ------------------------------------

const getEventCategories = async () => {
	try {
		eventCategories.value = (await requestEventCategories()).data.data;
	} catch (e) {
		console.error(e);
	}
};

const getCities = async () => {
	try {
		cities.value = (await requestCities()).data.data;
	} catch (e) {
		console.error(e);
	}
};

const checkboxCollectCategories = (e: Event) => {
	const target = e.target as HTMLInputElement;
	if (target.checked) {
		eventCreateForm.eventCategory.push({ categoryName: target.value });
	} else {
		eventCreateForm.eventCategory = eventCreateForm.eventCategory.filter(
			(e) => e.categoryName !== target.value
		);
	}
};

const checkboxCollectCities = (e: Event) => {
	const target = e.target as HTMLInputElement;
	if (target.checked) {
		eventCreateForm.eventCity.push({ cityName: target.value });
	} else {
		eventCreateForm.eventCity = eventCreateForm.eventCity.filter(
			(e) => e.cityName !== target.value
		);
	}
};

// Request data ---------------------------------

const sendCreateEventForm = async () => {
	isSpin.value = true;
	const isValid = await eventCreateFormTemplate.value?.validate();

	if (!isValid.valid) {
		isSpin.value = false;
		toast.error('form is invalid');

		return;
	}

	const eventCreatePayload = $objToFormData(toRaw(eventCreateForm));
	try {
		await eventCreate(eventCreatePayload);
		isSpin.value = false;
		toast.success('Evento creado exitosamente');
	} catch (error) {
		toast.error('error');
		isSpin.value = false;
	} finally {
		isSpin.value = false;
	}
};
</script>

<style scoped lang="scss">
.eventForm {
	padding: 0 20px 0 20px;
	margin-top: 33px;

	&-title {
		width: 100%;
		font-family: 'Poppins-Medium';
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
			position: relative;

			@media screen and (max-width: 955px) {
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
				width: 100%;
			}

			&-socialsAndContacts {
				&-social {
					width: 50%;
					padding: 10px;
					margin-top: 15px;

					&-maxWidth {
						width: 100%;
						min-height: 250px;
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
			position: relative;

			@media screen and (max-width: 955px) {
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
				width: 100%;
			}

			&-socialsAndContacts {
				margin-top: -10px;

				&-social {
					width: 50%;
					padding: 20px;

					&-maxWidth {
						width: 100%;
						min-height: 250px;
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
				flex-direction: flex-start;
				align-items: flex-start !important;
				width: 100%;

				@media screen and (max-width: 955px) {
					flex-direction: column;
					width: 100%;
				}

				&-input {
					width: 50%;
					padding: 10px;

					&-maxWidth {
						width: 100%;
						min-height: 250px;
					}

					@media screen and (max-width: 955px) {
						width: 100%;
					}
				}

				&-input:first-child {
					width: 50%;
					padding: 10px;
					margin-top: 0;

					&-maxWidth {
						width: 100%;
						min-height: 250px;
					}

					@media screen and (max-width: 955px) {
						width: 100%;
					}
				}
			}
		}
	}

	&__map {
		width: 100%;
		height: 40vh;

		main {
			border-radius: 30px;
			overflow: hidden;
		}

		@media screen and (max-width: 600px) {
			height: 50vh;
		}

		@media screen and (max-width: 520px) {
			height: 40vh;
		}

		&-title {
			margin-top: 20px;
			margin-bottom: 40px;
			font-size: 60px;
			line-height: 84px;
			font-weight: 500;
			color: #353333;
		}
	}

	&-buttons {
		width: 100%;
		display: flex;
		justify-content: center;
		margin-bottom: 70px;

		@media screen and (max-width: 780px) {
			flex-direction: column;
			align-items: center;
		}

		&-submit {
			display: block;
			width: 30%;
			margin-right: 15px;

			@media screen and (max-width: 780px) {
				width: 60%;
				margin: 0 0 16px 0;
			}

			@media screen and (max-width: 485px) {
				width: 100%;
			}
		}

		&-clear {
			display: block;
			width: 30%;
			margin-left: 15px;

			@media screen and (max-width: 780px) {
				width: 60%;
				margin: 0 0 -20px 0;
			}

			@media screen and (max-width: 485px) {
				width: 100%;
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

	&-tickets {
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
				margin-bottom: -35px;
			}

			&-center {
				display: flex;
				align-items: center;
				width: 100%;
				color: crimson;
				justify-content: space-around;
				line-height: 35px;
				margin-bottom: -35px;
			}
		}
	}
}
</style>
