<template>
	<div class="eventForm">
		<cp-spinner :is-spinned="isSpin" />
		<h2 class="eventForm-title">Editar el evento</h2>
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
						:model-value="eventCreateForm.data.eventName"
						name="eventName"
						rules="required"
					>
						<cp-text-input
							v-model="eventCreateForm.data.eventName"
							placeholder="nombre del evento"
							type="text"
							:class="{ 'required-input-error-textInput': errors.length > 0 }"
						/>
						<span v-if="errors.length" class="required-input-error-info-center">
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
						v-slot="{ handleChange, errors }"
						name="eventCategory"
						rules="require_checkbox"
					>
						<cp-check-box
							v-for="(item, index) in categoryCheckBoxes"
							:key="item.id + item.value"
							:option="item"
							:checked="eventCreateForm.data.eventCategory.includes(item.id)"
							return-value="id"
							@update:checkbox-update="(value: string | CheckOption) => {
								checkboxCollectCategories(value as string, index)
								handleChange(eventCreateForm.data.eventCategory)
							}"
						/>
						<span
							v-if="errors.length"
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
					>
						<cp-drag-n-drop
							v-model="eventCreateForm.files.eventBanner"
							:is-single="true"
							type="image"
							:max-size="5"
							:is-invalid="errors.length > 0"
						/>
						<span v-if="errors.length" class="required-input-error-info-center">
							{{ errors[0] }}</span
						>
					</v-field>

					<cp-media-card
						v-if="eventData?.attributes.eventBanner?.data"
						:edit-mode="true"
						:item="{
							id: eventData?.attributes.eventBanner?.data.id,
							source: makeMediaUrl(
								eventData?.attributes.eventBanner?.data.attributes.url
							),
						}"
						@delete="(value: CpMediaCardProps['item']) => deleteFile(value, 'eventBanner')"
					/>
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
							v-for="(item, index) in eventCreateForm.data.eventSocialMedias"
							:key="item.socialMediaName"
							class="eventForm-upperPositionRow-input-socialsAndContacts-social"
						>
							<cp-text-input2
								:id="item.socialMediaName"
								v-model="
									eventCreateForm.data.eventSocialMedias[index].socialMediaLink
								"
								:circle="true"
								:label-text="item.socialMediaName"
								placeholder="https://www.example.com/"
							/>
						</span>
					</div>
				</div>
			</div>

			<div class="eventForm-upperPositionRow">
				<div class="eventForm-upperPositionRow-info">
					<span>
						Pagina web del evento
						<cp-info-pop-up
							id="webPage"
							info="Indique la dirección de la página web dedicada a su evento"
						/>
					</span>
				</div>
				<div class="eventForm-upperPositionRow-input fullWidth-socials">
					<div class="eventForm-upperPositionRow-input-socialsAndContacts">
						<span
							class="eventForm-upperPositionRow-input-socialsAndContacts-social"
						>
							<cp-text-input2
								id="eventWebsite"
								v-model="eventCreateForm.data.eventWebSite"
								:circle="true"
								label-text="Pagina web"
								placeholder="https://www.example.com/"
							/>
						</span>
					</div>
				</div>
			</div>

			<div class="eventForm-upperPositionRow">
				<div class="eventForm-upperPositionRow-info">
					<span>
						Catalogo digital
						<cp-info-pop-up
							id="digitalCatalog"
							info="Indique el enlace al catálogo digital de su evento"
						/>
					</span>
				</div>
				<div class="eventForm-upperPositionRow-input fullWidth-socials">
					<div class="eventForm-upperPositionRow-input-socialsAndContacts">
						<span
							class="eventForm-upperPositionRow-input-socialsAndContacts-social"
						>
							<cp-text-input2
								id="eventWebsite"
								v-model="eventCreateForm.data.eventDigitalCatalog"
								:circle="true"
								label-text="Pagina web"
								placeholder="https://www.example.com/"
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
							<v-field
								v-slot="{ errors }"
								v-model="eventCreateForm.data.eventContacts.place"
								name="place"
								rules="required"
							>
								<cp-text-input2
									id="event_place_id"
									v-model="eventCreateForm.data.eventContacts.place"
									:circle="false"
									label-text="Ubicación del evento"
									placeholder="introduzca el enlace"
									:tooltip="true"
									required-field
									tooltip-text="Ingrese al lugar del evento. Por ejemplo, un club u otro establecimiento."
								/>
								<span
									v-if="errors.length"
									class="required-input-error-info-center"
								>
									{{ errors[0] }}</span
								>
							</v-field>
						</span>
						<span class="eventForm-upperPositionRow-input-details-input">
							<v-field
								v-slot="{ errors }"
								v-model="eventDate.date"
								name="eventDate"
								rules="required"
							>
								<cp-text-input2
									id="event_date_id"
									v-model="eventDate.date"
									type="date"
									:circle="false"
									required-field
									:min="new Date().toISOString().split('T')[0]"
									label-text="Fecha"
									placeholder="introduzca el enlace"
								/>

								<span
									v-if="errors.length"
									class="required-input-error-info-center"
								>
									{{ errors[0] }}</span
								>
							</v-field>
						</span>
						<span class="eventForm-upperPositionRow-input-details-input">
							<v-field
								v-slot="{ errors }"
								v-model="eventDate.time"
								name="eventTime"
								rules="required"
							>
								<cp-text-input2
									id="event_date_id"
									v-model="eventDate.time"
									type="time"
									:circle="false"
									required-field
									:min="new Date().toISOString().split('T')[0]"
									label-text="Hora de inicio del evento"
									placeholder="introduzca el enlace"
								/>

								<span
									v-if="errors.length"
									class="required-input-error-info-center"
								>
									{{ errors[0] }}</span
								>
							</v-field>
						</span>
						<span class="eventForm-upperPositionRow-input-details-input">
							<cp-text-input2
								id="duration_id"
								v-model="eventCreateForm.data.eventDuration"
								:circle="false"
								label-text="Duración en minutos"
								placeholder="introduzca el enlace"
							/>
						</span>
						<span class="eventForm-upperPositionRow-input-details-input">
							<cp-text-input2
								id="rules_id"
								v-model="eventCreateForm.data.eventRules"
								:circle="false"
								label-text="Reglas de visita"
								placeholder="introduzca el enlace"
							/>
						</span>
						<span class="eventForm-upperPositionRow-input-details-input">
							<cp-text-input2
								id="age_restrictions_id"
								v-model="eventCreateForm.data.eventAgeRestrictions"
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
						:model-value="eventCreateForm.data.linkToBuyTicket"
						name="tickets"
						rules="required"
					>
						<cp-text-input
							v-model="eventCreateForm.data.linkToBuyTicket"
							placeholder="http://tickets.com"
							type="text"
							:class="{ 'required-input-error-textInput': errors.length > 0 }"
						/>
						<span v-if="errors.length" class="required-input-error-info-center">
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
							:model-value="eventCreateForm.data.eventDescription"
							name="decription"
							rules="required"
						>
							<v-md-editor
								v-model="eventCreateForm.data.eventDescription"
								text-area-id="event_description_id"
								height="500px"
								:class="{ 'required-input-error-textInput': errors.length > 0 }"
							/>
							<span
								v-if="errors.length"
								class="required-input-error-info-center"
							>
								{{ errors[0] }}
							</span>
						</v-field>
					</div>
				</div>
			</div>

			<div class="eventForm-upperPositionRow">
				<div class="eventForm-upperPositionRow-info">
					<span>
						<strong class="eventForm-upperPositionRow-info-required">*</strong>
						Descripción breve del evento
					</span>
				</div>
				<div class="eventForm-upperPositionRow-input fullWidth-details">
					<div class="eventForm-upperPositionRow-input-details">
						<v-field
							v-slot="{ errors }"
							:model-value="eventCreateForm.data.eventShortDescription"
							name="decription"
							rules="required"
						>
							<cp-text-area
								v-model="eventCreateForm.data.eventShortDescription"
								text-area-id="event_description_id"
								text-area-placeholder="Descripción breve del evento"
								:class="{ 'required-input-error-textInput': errors.length > 0 }"
							/>

							<span
								v-if="errors.length"
								class="required-input-error-info-center"
							>
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
						Sube contenido de foto o sobre tu evento
						<cp-info-pop-up
							id="media_id"
							info="El banner debe cargarse a 1100 por 278 píxeles en formato .png"
						/>
					</span>
				</div>
				<div class="eventForm-upperPositionRow-input fullWidth-banner">
					<cp-drag-n-drop
						v-model="eventCreateForm.files.eventMediaPhotos"
						:is-multi="true"
						type="image"
						:max-size="5"
					/>
				</div>
			</div>
			<cp-media-carousel
				v-if="eventData"
				id="foto o sobre tu evento"
				is-deletable
				:media-files-objects="
					eventData.attributes.eventMediaPhotos.data.map((media) => ({
						id: media.id,
						source: makeMediaUrl(media.attributes.url),
					}))
				"
				@delete-photo="(value: CpMediaCardProps['item']) => deleteFile(value, 'eventMediaPhotos')"
			/>

			<div class="eventForm-upperPositionRow">
				<div class="eventForm-upperPositionRow-info">
					<span>
						Sube contenido de video o sobre tu evento
						<cp-info-pop-up
							id="media_id"
							info="Vídeo no mayor a 25 megas en formato .mp4"
						/>
					</span>
				</div>
				<div class="eventForm-upperPositionRow-input fullWidth-banner">
					<cp-drag-n-drop
						v-model="eventCreateForm.files.eventMediaVideos"
						:is-multi="true"
						type="video"
						:max-size="50"
					/>
				</div>
			</div>

			<cp-media-carousel
				v-if="eventData"
				id="video o sobre tu evento"
				is-deletable
				:video-files-objects="
					eventData.attributes.eventMediaVideos.data.map((media) => ({
						id: media.id,
						source: makeMediaUrl(media.attributes.url),
					}))
				"
				@delete-video="(value: CpMediaCardProps['item']) => deleteFile(value, 'eventMediaVideos')"
			/>

			<!-- Event city -->
			<div v-if="eventCreateForm.data.eventAddress.city" class="eventForm-upperPositionRow">
				<div class="eventForm-upperPositionRow-info">
					<span>
						<strong class="eventForm-upperPositionRow-info-required">*</strong>
						Seleccione la ciudad donde se realizará el evento
					</span>
				</div>
				<div class="eventForm-upperPositionRow-input">
					<v-field
						v-slot="{ errors }"
						name="cityRadio"
						rules="required"
						:model-value="eventCreateForm.data.eventAddress.city"
					>
						<cp-radio-button
							v-model="eventCreateForm.data.eventAddress.city"
							:options="cityRadioButtons"
							:active-id="eventCreateForm.data.eventAddress.city"
							name="cityRadio"
							return-value="id"
						/>
						<span
							v-if="errors.length && !eventCreateForm.data.eventAddress.city"
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
						:model-value="eventCreateForm.data.eventAddress.address"
						name="eventAdres"
						rules="required"
					>
						<cp-text-input
							v-model="eventCreateForm.data.eventAddress.address"
							placeholder="dirección del evento"
							type="text"
							:class="{ 'required-input-error-textInput': errors.length > 0 }"
						/>
						<span v-if="errors.length" class="required-input-error-info-center">
							{{ errors[0] }}
						</span>
					</v-field>
				</div>
			</div>

			<!-- maplocation  -->
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
							:model-value="eventCreateForm.data.eventAddress.coordinates"
							name="eventHostCoordinates"
							rules="require_coordinates"
						>
							<cp-map
								:coordinates-output="true"
								:center="getCoordinates"
								@update:coordinates-update="setCoordinates"
							/>
							<span
								v-if="errors.length"
								class="required-input-error-info-center"
							>
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
								:model-value="eventCreateForm.data.eventContacts.tel"
								name="eventTel"
								rules="required"
							>
								<cp-text-input2
									id="tel_id"
									v-model="eventCreateForm.data.eventContacts.tel"
									:circle="false"
									label-text="Número de teléfono"
									placeholder="introduzca el enlace"
									:class="{
										'required-input-error-socialMedia': errors.length > 0,
									}"
								/>
								<span
									v-if="errors.length"
									class="required-input-error-info-leftSide"
								>
									{{ errors[0] }}
								</span>
							</v-field>
						</span>
						<span class="eventForm-upperPositionRow-input-details-input">
							<v-field
								v-slot="{ errors }"
								:model-value="eventCreateForm.data.eventContacts.mail"
								name="eventMail"
								rules="required"
							>
								<cp-text-input2
									id="E-mail_id"
									v-model="eventCreateForm.data.eventContacts.mail"
									:circle="false"
									label-text="E-mail"
									placeholder="introduzca el enlace"
									:class="{
										'required-input-error-socialMedia': errors.length > 0,
									}"
								/>
								<span
									v-if="errors.length"
									class="required-input-error-info-leftSide"
								>
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
						size="medium"
						native-type="submit"
						:disabled="disableSubmit"
						@click="sendCreateEventForm"
					/>
				</span>
				<span class="eventForm-buttons-clear">
					<cp-button
						color="transparent"
						shape="oval"
						text="Borrar"
						width="maxWidth"
						size="medium"
						@click="resetForm"
					/>
				</span>
			</div>
		</v-form>
	</div>
</template>

<script setup lang="ts">
import { Form as VForm, Field as VField } from 'vee-validate';
import { toast } from 'vue3-toastify';
import CpMediaCard from '@shared/gui/CpMediaCard.vue';
import CpMediaCarousel from '@shared/gui/CpMediaCarousel.vue';
import CpButton from '@shared/gui/CpButton.vue';
import CpTextInput from '@shared/gui/CpTextInput.vue';
import CpTextInput2 from '@shared/gui/CpTextInput2.vue';
import CpTextArea from '@shared/gui/CpTextArea.vue';
import CpDragNDrop from '@shared/gui/CpDragNDrop.vue';
import CpCheckBox from '@shared/gui/CpCheckBox.vue';
import CpInfoPopUp from '@shared/gui/CpInfoPopUp.vue';
import CpMap from '@shared/gui/CpMap.vue';
import type {
	City,
	EventCategory,
	EventCreateType,
	EventData,
} from '@shared/api/types';
import { fromZonedTime, toDate } from 'date-fns-tz';
import type { CheckOption, CpMediaCardProps } from '@shared/gui/types';
import {
	requestEventCategories,
	editEvent,
	requestCities,
	requestEventById,
	deleteMedia,
} from '@shared/api';
import { useRuntimeConfig } from 'nuxt/app';
import { useUserStore } from '@stores/user-store';
import { UserRolesTypes } from '@shared/api/types';

const userStore = useUserStore();

const config = useRuntimeConfig();

// Form Data ------------------------------------

const eventCreateForm = reactive<EventCreateType>({
	data: {
		eventName: '',
		eventDescription: '',
		eventCategory: [],
		eventDate: '',
		eventHost: '',
		eventSocialMedias: [
			{ socialMediaName: 'TikTok', socialMediaLink: '' },
			{ socialMediaName: 'Facebook', socialMediaLink: '' },
			{ socialMediaName: 'Instagram', socialMediaLink: '' },
			{ socialMediaName: 'LinkedIn', socialMediaLink: '' },
			{ socialMediaName: 'YouTube', socialMediaLink: '' },
		],
		eventDuration: '',
		eventAddress: {
			coordinates: '-13.527141525687806, -71.96803909279043',
			city: null,
			address: '',
		},
		linkToBuyTicket: '',
		eventDigitalCatalog: '',
		eventWebSite: '',
		eventShortDescription: '',
		eventRules: '',
		eventAgeRestrictions: '',
		eventContacts: {
			place: '',
			tel: '',
			mail: '',
		},
	},
	files: {
		eventBanner: null,
		eventMediaPhotos: null,
		eventMediaVideos: null,
	},
});

const disableSubmit = ref<boolean>(false);
// Variables ------------------------------------
const eventCategories = ref<EventCategory[]>([]);
const cities = ref<City[]>([]);

const eventCreateFormTemplate = ref<HTMLFormElement | null>(null);

const isSpin = ref<boolean>(false);
const route = useRoute();
const eventData = ref<EventData | null>(null);

const eventDate = reactive({
	date: '',
	time: '',
});

watch(eventDate, () => {
	if (eventDate.date && eventDate.time) {
		eventCreateForm.data.eventDate = new Date(
			`${eventDate.date}T${eventDate.time}`
		);
	}
});

// New function to map event data to form
const mapEventDataToForm = (source: EventData) => {
	const attributes = source.attributes || {};

	eventCreateForm.data.eventName = attributes.eventName || '';
	eventCreateForm.data.eventDescription = attributes.eventDescription || '';
	eventCreateForm.data.eventShortDescription =
		attributes.eventShortDescription || '';
	eventCreateForm.data.eventDate = attributes.eventDate || '';
	eventCreateForm.data.eventDuration = attributes.eventDuration || '';
	eventCreateForm.data.linkToBuyTicket = attributes.linkToBuyTicket || '';
	eventCreateForm.data.eventDigitalCatalog =
		attributes.eventDigitalCatalog || '';
	eventCreateForm.data.eventWebSite = attributes.eventWebSite || '';
	eventCreateForm.data.eventRules = attributes.eventRules || '';
	eventCreateForm.data.eventAgeRestrictions =
		attributes.eventAgeRestrictions || '';

	// Map eventHost as ID
	eventCreateForm.data.eventHost = attributes.eventHost.data.id;

	// Map eventAddress
	eventCreateForm.data.eventAddress = {
		coordinates:
			attributes.eventAddress?.coordinates || '-12.046016, -77.030554',
		city: attributes.eventAddress?.city?.data?.id || null,
		address: attributes.eventAddress?.address || '',
	};

	// Map eventCategory as array of IDs
	if (!attributes.eventCategory && attributes.eventCategory) {
		eventCreateForm.data.eventCategory = [];
	} else {
		eventCreateForm.data.eventCategory = attributes.eventCategory.data.map(
			(item: EventCategory) => item.id
		);
	}

	// Map eventSocialMedias, filtering out empty links
	if (attributes.eventSocialMedias && attributes.eventSocialMedias.length > 0) {
		eventCreateForm.data.eventSocialMedias = attributes.eventSocialMedias
			.map((item: any) => ({
				socialMediaName: item.socialMediaName || '',
				socialMediaLink: item.socialMediaLink || '',
			}))
			.filter(
				(item: any) =>
					item.socialMediaLink && item.socialMediaLink.trim() !== ''
			);
	}

	// Map eventContacts
	if (attributes.eventContacts) {
		eventCreateForm.data.eventContacts.place =
			attributes.eventContacts.place || '';
		eventCreateForm.data.eventContacts.tel = attributes.eventContacts.tel || '';
		eventCreateForm.data.eventContacts.mail =
			attributes.eventContacts.mail || '';
	}

	// Map eventDate to separate date and time for your date pickers
	if (attributes.eventDate) {
		const eventDateTime = new Date(attributes.eventDate);
		eventDate.date = eventDateTime.toISOString().split('T')[0];
		eventDate.time = eventDateTime.toTimeString().split(' ')[0].slice(0, 5);
	}
};

const makeMediaUrl = (path: string) => {
	return config.public.apiBaseUrl + path;
};

// New function to prepare data before sending to backend
const prepareDataForBackend = () => {
	const dataToSend: any = { ...eventCreateForm.data };

	// eventHost as ID
	dataToSend.eventHost = dataToSend.eventHost || null;

	// eventAddress as ID
	dataToSend.eventAddress.city = dataToSend.eventAddress.city || null;

	// eventCategory as array of IDs
	dataToSend.eventCategory = dataToSend.eventCategory || [];

	// Filter out empty social media links
	dataToSend.eventSocialMedias = eventCreateForm.data.eventSocialMedias.filter(
		(item: any) => item.socialMediaLink && item.socialMediaLink.trim() !== ''
	);

	// Remove eventContacts if empty
	if (
		!dataToSend.eventContacts.place &&
		!dataToSend.eventContacts.tel &&
		!dataToSend.eventContacts.mail
	) {
		delete dataToSend.eventContacts;
	}

	// Return prepared data
	return { data: dataToSend };
};

// Update function to fetch and map event data
const getEvent = async () => {
	const eventId = route.params.id as string;
	try {
		const { data } = await requestEventById(eventId);
		eventData.value = data.data;

		// Map the event data to the form
		mapEventDataToForm(eventData.value);
	} catch (error) {
		console.error('Error fetching event data:', error);
	}
};

onBeforeMount(async () => {
	await getEvent();
	await getEventCategories();
	await getCities();
});

const getCoordinates = computed(() => {
	return eventCreateForm.data.eventAddress.coordinates
		.split(',')
		.map((coordinate) => {
			return Number(coordinate);
		});
});

const setCoordinates = (coordinatesFromMap: { coordinates: number[] }) => {
	eventCreateForm.data.eventAddress.coordinates = `${coordinatesFromMap.coordinates[0]},${coordinatesFromMap.coordinates[1]}`;
};

const categoryCheckBoxes = computed(() => {
	if (!eventCategories.value.length) {
		return [];
	}

	return eventCategories.value.map((category) => {
		return {
			id: category.id,
			value: category.attributes.eventCategoryCode,
			label: category.attributes.eventCategoryName,
			checked: eventCreateForm.data.eventCategory.includes(category.id),
		};
	});
});

const cityRadioButtons = computed(() => {
	if (!cities.value?.length) {
		return [];
	}

	return cities.value.map((city) => {
		return {
			id: city.id,
			value: city.attributes.cityCode,
			label: city.attributes.cityName,
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

const checkboxCollectCategories = (value: number | string, index: number) => {
	if (value) {
		if (!eventCreateForm.data.eventCategory.includes(value as number)) {
			eventCreateForm.data.eventCategory.push(value as number);
		}
	} else {
		eventCreateForm.data.eventCategory.splice(index, 1);
	}
};

const clearFileInputs = () => {
	Object.keys(eventCreateForm.files).forEach((key) => {
		eventCreateForm.files[key as keyof EventCreateType['files']] = null;
	});
};

const resetForm = () => {
	clearFileInputs();
	if (eventData.value) {
		mapEventDataToForm(eventData.value);
	} else {
		getEvent();
	}
};
// Request data ---------------------------------

const sendCreateEventForm = async () => {
	const isValid = await eventCreateFormTemplate.value?.validate();

	if (!isValid.valid) {
		isSpin.value = false;
		toast.error('El formulario no es válido');

		return;
	}

	if (userStore.getUserRole !== UserRolesTypes.eventHost) {
		toast.error('Sólo los organizadores pueden crear eventos');
		navigateTo('/');

		return;
	}

	try {
		prepareEventCreationData();
		const dataToSend = prepareDataForBackend();

		// If you have files to send, use FormData
		const formData = new FormData();
		formData.append('data', JSON.stringify(dataToSend.data));

		// Append files if they have been changed

		if (
			eventCreateForm.files.eventBanner &&
			Array.isArray(eventCreateForm.files.eventBanner)
		) {
			eventCreateForm.files.eventBanner.forEach((file: File) => {
				formData.append('files.eventBanner', file);
			});
		}

		if (eventCreateForm.files.eventMediaPhotos) {
			eventCreateForm.files.eventMediaPhotos.forEach((file: File) => {
				formData.append('files.eventMediaPhotos', file);
			});
		}

		if (eventCreateForm.files.eventMediaVideos) {
			eventCreateForm.files.eventMediaVideos.forEach((file: File) => {
				formData.append('files.eventMediaVideos', file);
			});
		}

		disableSubmit.value = true;
		isSpin.value = true;

		// Send PUT request to update the event
		const eventId = route.params.id as string;

		await editEvent(eventId, formData);

		await getEvent();
		clearFileInputs();

		isSpin.value = false;
		toast.success('Evento actualizado exitosamente');
	} catch (error) {
		console.error(error);
		toast.error('Error al actualizar el evento');
	} finally {
		disableSubmit.value = false;
		isSpin.value = false;
	}
};

const prepareEventCreationData = () => {
	const currentUserEventHostId = userStore.user?.eventHostData?.id;
	if (!userStore.isAuth && currentUserEventHostId) {
		throw new Error('Tu usuario no pudo ser identificado');
	}
	const timezone = localStorage.getItem('timezone');
	eventCreateForm.data.eventHost = currentUserEventHostId as number;
	eventCreateForm.data.eventDate = fromZonedTime(
		toDate(eventCreateForm.data.eventDate),
		timezone ?? 'America/Lima'
	);
	eventCreateForm.data.eventSocialMedias =
		eventCreateForm.data.eventSocialMedias.filter(
			(socialMedia) => socialMedia.socialMediaLink !== ''
		);
};

const deleteFile = async (
	item: CpMediaCardProps['item'],
	mediaFieldPath: keyof EventCreateType['files']
) => {
	const eventFile = eventData.value?.attributes[mediaFieldPath].data;
	let fileId = null;
	if (eventFile) {
		if (Array.isArray(eventFile)) {
			const fileInArray = eventFile.find((file) => file.id === item.id);
			if (fileInArray) {
				fileId = fileInArray.id;
			}
		} else if ('id' in eventFile) {
			fileId = eventFile.id;
		}
	}

	if (fileId === undefined || fileId === null) {
		return;
	}
	try {
		await deleteMedia(fileId);
	} catch (error) {
		toast.error('No se pudo eliminar el medio');
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
