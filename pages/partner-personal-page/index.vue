<template>
	<div class="personal">
		<cp-spinner :is-spinned="isSpin" />
		<h2>Culture events of Peru</h2>
		<v-form ref="personalPartnerForm" class="personal___form">
			<div class="personal__form-rowTop">
				<div class="personal__form-rowTop-info">
					<span>
						En que areas de la cultura viva comunitaria se desenvuelve tu
						organización ? Elección múltiple
					</span>
				</div>
				<div class="personal__form-rowTop-input-checks">
					<cp-check-box
						v-for="(item, index) in orgSphereChecks"
						:key="index"
						:option="item"
						:checked="partnerPersonalForm.data.cultureType.includes(item.id)"
						return-value="id"
						@update:checkbox-update="(value: number) => checkboxCollectCultureType(value, index)"
					/>
				</div>
			</div>

			<div class="personal__form-rowTop">
				<div class="personal__form-rowTop-info">
					<span> Dónde se ubica tu organización? </span>
				</div>
				<v-field
					v-slot="{ errors }"
					v-model="partnerPersonalForm.data.eventHostAddress.city"
					name="eventHostCity"
					rules="required"
				>
					<cp-radio-button
						:active-id="partnerPersonalForm.data.eventHostAddress.city ?? ''"
						:options="cityRadioButtons"
						class="personal__form-rowTop-input-checks"
						name="radio2"
						return-value="id"
						style="margin-left: -30px"
						@update:model-value="
							(value) =>
								(partnerPersonalForm.data.eventHostAddress.city = value)
						"
					/>
					<span v-if="errors" class="required-input-error-info-leftSide">{{
						errors[0]
					}}</span>
				</v-field>
			</div>

			<div class="personal__form-row">
				<div class="personal__form-row-info">
					<span>
						<strong class="personal__form-row-info-required">*</strong>
						Rango de edad y porcentaje de mujeres , aprox
					</span>
				</div>
				<div class="personal__form-row-input-horizontal">
					<cp-text-input
						v-model="partnerPersonalForm.data.personCount"
						type="number"
						placeholder="Numero de personans"
					/>
					<cp-text-input
						v-model="partnerPersonalForm.data.womenPercentage"
						type="number"
						placeholder="Porcenaje de mujeres"
					/>
				</div>
			</div>

			<div class="personal__form-rowTop">
				<div class="personal__form-rowTop-info">
					<span>
						Subir el logo o imagen principal
						<cp-info-pop-up id="logo_update" info="test info Nombre" />
					</span>
				</div>
				<div class="personal__form-rowTop-input">
					<cp-drag-n-drop
						v-model="partnerPersonalForm.files.mainBanner"
						:is-single="true"
						type="image"
						:max-size="5"
					/>
				</div>
				<nuxt-img :src="partnerPersonalForm.files.mainBanner" />
			</div>

			<div class="personal__form-rowTop">
				<div class="personal__form-rowTop-info">
					<span>
						Resume lo que hace tu organizacion
						<cp-info-pop-up id="resume" info="250-500 palabras" />
					</span>
				</div>
				<div class="personal__form-rowTop-input">
					<cp-text-area
						v-model="partnerPersonalForm.data.orgResume"
						text-area-id="resume_id"
						text-area-placeholder="Resume lo que hace tu organizacion"
					/>
				</div>
			</div>

			<div class="personal__form-rowTop">
				<div class="personal__form-rowTop-info">
					<span>
						Sube el vídeo de tu empresa o incrusta un enlace desde youtube o
						vimeo
						<cp-info-pop-up id="video_id" info="250-500 palabras" />
						<div class="personal__form-switcherBlock">
							<cp-switcher
								v-model="videoFileValue"
								:default-option="videoFileValue"
								switcher-name="compVideo"
								:switcher-options="formVideoSwitcherOptions"
								@update:model-value="(value) => toggleVideoFormat(value)"
							/>
						</div>
					</span>
				</div>
				<div class="personal__form-rowTop-input">
					<cp-drag-n-drop
						v-if="videoFileValue === 'File'"
						v-model="partnerPersonalForm.files.compVideoFile"
						:is-single="true"
						type="video"
						:max-size="50"
					/>
					<cp-text-input2
						v-else
						id="linkVideo_id"
						v-model="partnerPersonalForm.data.compVideoLink"
						:circle="true"
						label-text="YouTube / Vimeo"
						placeholder="https://www.youtube.com/"
					/>
				</div>
			</div>

			<div
				v-if="partnerPersonalForm.data.socialMedias?.length"
				class="personal__form-rowTop"
			>
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
						<span
							v-for="(socialMedia, index) in partnerPersonalForm.data
								.socialMedias"
							:key="socialMedia.socialMediaName"
							class="personal__form-rowTop-semiBlock-social"
						>
							<cp-text-input2
								:id="socialMedia.socialMediaName + '_id'"
								v-model="
									partnerPersonalForm.data.socialMedias[index].socialMediaLink
								"
								:circle="true"
								:label-text="socialMedia.socialMediaName"
								:placeholder="`https://www.${socialMedia.socialMediaName}.com/`"
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
								v-model="partnerPersonalForm.data.contacts.place"
								:circle="false"
								label-text="País y ciudad"
								placeholder="introduzca el enlace"
							/>
						</span>
						<span class="personal__form-rowTop-semiBlock-social">
							<cp-text-input2
								id="tel_id"
								v-model="partnerPersonalForm.data.contacts.tel"
								:circle="false"
								label-text="Teléfono de la empresa"
								placeholder="introduzca el enlace"
							/>
						</span>
						<span class="personal__form-rowTop-semiBlock-social">
							<cp-text-input2
								id="email_id"
								v-model="partnerPersonalForm.data.contacts.mail"
								type="email"
								:circle="false"
								label-text="Email"
								placeholder="introduzca el enlace"
							/>
						</span>
					</div>
				</div>
			</div>

			<!-- <div class="personal__form-rowTop">
				<div class="personal__form-rowTop-info">
					<span> Introduce información clave sobre ti </span>
				</div>
				<div class="personal__form-rowTop-input">
					<cp-text-area
						v-model="partnerPersonalForm.data.selfInfo"
						text-area-id="selfInfo_id"
						text-area-placeholder="Introduzca el texto"
					/>
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
			</div> -->

			<div class="personal__form-submit">
				<cp-button
					ref="submitBtn"
					class="personal__form-submit-btnContainer"
					width="maxWidth"
					size="small"
					disabled
					shape="oval"
					color="yellowGrey"
					text="Publicar"
					@click="sendPartnerPersonalForm"
				/>
			</div>
		</v-form>

		<div v-if="getMedias.photos.length" class="personal__gallery">
			<h3>Tu contenido fotográfico</h3>
			<span>Aquí puedes gestionar el contenido de tus fotos.</span>
		</div>
		<cp-media-carousel
			v-if="getMedias.photos.length"
			id="gallery_pictures"
			:is-deletable="true"
			:media-files-urls="getMedias.photos.map((photo) => photo.file)"
		/>

		<div v-if="getMedias.videos.length" class="personal__gallery">
			<h3>Tu contenido de vídeo</h3>
			<span>Aquí puedes gestionar el contenido de tus vídeos </span>
		</div>
		<cp-media-carousel
			v-if="getMedias.photos.length"
			id="gallery_videos"
			:is-deletable="true"
			:media-files-urls="getMedias.videos.map((video) => video.file)"
			@delete="deleteMedia"
		/>

		<div v-if="eventsList?.length" class="personal__event-title">
			<h3>Eventos que creaste</h3>
			<span>Ver y editar tus eventos </span>
		</div>
		<event-carousel
			id="organizer-events-carousel"
			:with-edit-controls="true"
			class="personal__event-carousel"
			:event-data="eventsList"
		/>
	</div>
</template>

<script setup lang="ts">
import { toast } from 'vue3-toastify';
import CpButton from '@shared/gui/CpButton.vue';
import CpDragNDrop from '@shared/gui/CpDragNDrop.vue';
import {
	requestAffiliations,
	requestMyUser,
	requestEventsList,
	requestEventsHost,
	editEventHost,
} from '@shared/api';
import { Form as VForm, Field as VField } from 'vee-validate';

onMounted(() => {
	isSpin.value = false;
});

// test variables -------------------------------

const testImages = [
	'https://images.pexels.com/lib/api/pexels.png',
	'https://images.pexels.com/lib/api/pexels.png',
	'https://images.pexels.com/lib/api/pexels.png',
	'https://images.pexels.com/lib/api/pexels.png',
	'https://images.pexels.com/lib/api/pexels.png',
	'https://images.pexels.com/lib/api/pexels.png',
];

// ----------------------------------------------

const formVideoSwitcherOptions = [
	{ optionName: 'Upload File', optionValue: 'File', optionKey: 'FileKey' },
	{ optionName: 'Paste Link', optionValue: 'Link', optionKey: 'LinkKey' },
];

const videoFileValue = ref<string | null>('File');

watch(videoFileValue, () => {
	partnerPersonalForm.data.compVideoLink = '';
	partnerPersonalForm.files.compVideoFile = null;
});

const isSpin = ref<boolean>(true);
const formSending = ref<boolean>(false);
const personalPartnerForm = ref<HTMLFormElement | null>(null);
const eventsList = ref<EventCard[] | null>(null);
const partnerPersonalForm = reactive({
	data: {
		orgType: '',
		commercialName: '',
		compName: '',
		ruc: '',
		startDate: '',
		user: null,
		personCount: '',
		middleAge: '',
		womenPercentage: '',
		orgResume: '',
		cultureType: [],
		orgWorkType: '',
		eventHostAddress: {
			city: null,
			address: '',
			coordinates: '-13.534793, -71.979812',
		},
		personalName: '',
		personalIdentifyingDocument: '',
		productDescriptionLink: '',
		productDescriptionText: '',
		webpage: '',
		compVideoLink: '',
		affiliations: [],
		socialMedias: [
			{ socialMediaName: 'TikTok', socialMediaLink: '' },
			{ socialMediaName: 'Facebook', socialMediaLink: '' },
			{ socialMediaName: 'Instagram', socialMediaLink: '' },
			{ socialMediaName: 'LinkedIn', socialMediaLink: '' },
			{ socialMediaName: 'YouTube', socialMediaLink: '' },
		],
		digitalCatalog: '',
		contacts: {
			place: '',
			tel: '',
			mail: '',
		},
	},
	files: {
		videoBusinessCard: null,
		mainBanner: null,
		compVideoFile: null,
		mostPopularProduct: null,
		productDescriptionFile: null,
		galleryImages: null,
	},
});

const orgSphereChecks = ref([]);
const userData = ref();

const affiliationChecks = ref([]);
const cityRadioButtons = ref([]);
const eventHost = ref<EventHost>();

const getMedias = computed(() => {
	const photoPaths = ['mainBanner', 'mostPopularProduct'];
	const videoPaths = ['videoBusinessCard', 'compVideoFile'];

	return {
		photos: photoPaths.reduce((acc: { path: string; file: string }[], path) => {
			if (partnerPersonalForm.files[path]) {
				acc.push({
					path: path,
					file: partnerPersonalForm.files[path],
				});
			}

			return acc;
		}, []),
		videos: videoPaths.reduce((acc: { path: string; file: string }[], path) => {
			if (partnerPersonalForm.files[path]) {
				acc.push({
					path: path,
					file: partnerPersonalForm.files[path],
				});
			}

			return acc;
		}, []),
	};
});

onBeforeMount(async () => {
	await requestPageData();
});

const toggleVideoFormat = () => {
	if (videoFileValue.value === 'File') {
		partnerPersonalForm.data.compVideoLink = '';
	} else {
		partnerPersonalForm.files.compVideoFile = null;
	}
};

const requestPageData = async () => {
	try {
		const storedUserData = localStorage.getItem('myUser');
		if (!storedUserData) {
			return;
		}
		await getCurrentUser();
		await getEventHostData();
		await getCities();
		await getCategories();
		await getAffiliations();
		getEventsList();
		isSpin.value = true;
	} catch (error) {
		toast.error(
			'Nuestro administrador se comunicará conusted por correo electrónico'
		);
	} finally {
		isSpin.value = false;
	}
};

const deleteMedia = async (
	mediaUrl: string,
	mediaType: 'videos' | 'photos'
) => {
	const deletionKey = getMedias.value[mediaType].find(
		(media) => media.file === mediaUrl
	);

	if (!deletionKey) {
		return;
	}

	partnerPersonalForm.files[deletionKey.path] = null;

	try {
		await editEventHost(userData.value.eventHostData.id, {
			files: {
				[deletionKey.path]: null,
			},
		});
	} catch (error) {
		toast.error('No se pudo eliminar el medio');
	}
};

const getCurrentUser = async () => {
	try {
		const requestedUserData = await requestMyUser();
		userData.value = requestedUserData.data;
	} catch (error) {
		toast.error('No se pudo obtener información del usuario');
		navigateTo('/');
	}
};

const getEventHostData = async () => {
	try {
		eventHost.value = (
			await requestEventsHost(userData.value.eventHostData.id)
		).data;

		Object.assign(partnerPersonalForm, buildPartnerEditForm());
	} catch (error) {
		toast.error(
			'Nuestro administrador se comunicará conusted por correo electrónico'
		);
	}
};

const getEventsList = async () => {
	if (!userData.value?.eventHostData) {
		return;
	}
	const filters: CollectionFilters['events'] = {
		eventHost: {
			commercialName: {
				$eq: userData.value.eventHostData.commercialName,
			},
		},
	};

	try {
		const events = await requestEventsList(filters);
		eventsList.value = events.data.data;
	} catch (error) {
		toast.error('No se pudieron cargar eventos');
	}
};

const buildPartnerEditForm = () => {
	if (!eventHost.value) {
		return partnerPersonalForm;
	}

	return {
		data: {
			orgType: eventHost.value.data.attributes.orgType || '',
			commercialName: eventHost.value.data.attributes?.commercialName || '',
			compName: eventHost.value.data.attributes?.compName || '',
			ruc: eventHost.value.data.attributes?.ruc || '',
			startDate: eventHost.value.data.attributes?.startDate || '',
			personCount: eventHost.value.data.attributes?.personCount || null,
			middleAge: eventHost.value.data.attributes?.middleAge || null,
			womenPercentage: eventHost.value.data.attributes?.womenPercentage || null,
			orgResume: eventHost.value.data.attributes?.orgResume || '',
			cultureType:
				eventHost.value.data.attributes?.cultureType?.data.map(
					(item: any) => item.id
				) || [],
			orgWorkType: eventHost.value.data.attributes?.orgWorkType || '',
			eventHostAddress: {
				city:
					eventHost.value.data.attributes?.eventHostAddress?.city.data.id ||
					null,
				address: '', // Default value as it's not in eventHost.value.data
				coordinates: '-13.534793, -71.979812', // Static value
			},
			personalName: eventHost.value.data.attributes?.personalName || '',
			personalIdentifyingDocument:
				eventHost.value.data.attributes?.personalIdentifyingDocument || '',
			productDescriptionLink:
				eventHost.value.data.attributes?.productDescriptionLink || '',
			productDescriptionText:
				eventHost.value.data.attributes?.productDescriptionText || '',
			webpage: eventHost.value.data.attributes?.webpage || '',
			compVideoLink: eventHost.value.data.attributes?.compVideoLink || '',
			affiliations:
				eventHost.value.data.attributes?.affiliations?.data.map(
					(item: any) => item.id
				) || [],
			socialMedias: [
				'TikTok',
				'Facebook',
				'Instagram',
				'YouTube',
				'LinkedIn',
			].map((name) => ({
				socialMediaName: name,
				socialMediaLink:
					eventHost.value?.data.attributes.socialMedias?.find(
						(media: any) => media.socialMediaName === name
					)?.socialMediaLink || '',
			})),
			digitalCatalog: eventHost.value.data.attributes?.digitalCatalog || '',
			contacts: {
				place: eventHost.value.data.attributes?.contacts?.place || '',
				tel: eventHost.value.data.attributes?.contacts?.tel || '',
				mail: eventHost.value.data.attributes?.contacts?.mail || '',
			},
		},
		files: {
			personalDocumentScan: null,
			videoBusinessCard: null,
			mainBanner: null,
			compVideoFile: null,
			mostPopularProduct: null,
			productDescriptionFile: null,
			galleryImages: null,
		},
	};
};

const getCategories = async () => {
	try {
		const categories = await requestCategories();
		orgSphereChecks.value = categories.data.data.map((category: any) => ({
			id: category.id,
			value: category.attributes.cultureTypeName,
			label: category.attributes.cultureTypeName,
		}));
	} catch (error) {
		toast.error(
			'Nuestro administrador se comunicará conusted por correo electrónico'
		);
	}
};

const getAffiliations = async () => {
	try {
		const affiliations = await requestAffiliations();
		affiliationChecks.value = affiliations.data.data.map(
			(affiliation: any) => ({
				id: affiliation.id,
				value: affiliation.attributes.affiliationName,
				label: affiliation.attributes.affiliationName,
			})
		);
	} catch (error) {
		toast.error(
			'Nuestro administrador se comunicará conusted por correo electrónico'
		);
	}
};

const getCities = async () => {
	try {
		const cities = await requestCities();
		cityRadioButtons.value = cities.data.data.map((city: any) => ({
			id: city.id,
			value: city.attributes.cityName,
			label: city.attributes.cityName,
		}));
	} catch (error) {
		toast.error(
			'Nuestro administrador se comunicará conusted por correo electrónico'
		);
	}
};
const checkboxCollectCultureType = (value: number, index: number) => {
	if (value) {
		partnerPersonalForm.data.cultureType.push(value);
	} else {
		partnerPersonalForm.data.cultureType.splice(index, 1);
	}
};

const sendPartnerPersonalForm = async () => {
	await personalPartnerForm.value?.validate();
	isSpin.value = true;
	formSending.value = true;

	try {
		await editEventHost(userData.value.eventHostData.id, {
			data: partnerPersonalForm.data,
		});
	} catch (error) {
		toast.error(
			'Nuestro administrador se comunicará conusted por correo electrónico'
		);
	} finally {
		isSpin.value = true;
		formSending.value = true;
	}
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

					div {
						width: 50%;
						margin-right: 15px;
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

						div {
							width: 100%;
							margin-right: 15px;
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
			box-sizing: border-box;
			padding: 0 15%;
			display: flex;
			justify-content: space-around;
			align-items: center;

			&-btnContainer {
				width: 45%;
			}
		}
	}

	&__gallery {
		box-sizing: border-box;

		h3 {
			color: $soft-black;
			font-size: 34px;
			line-height: 51px;
			margin-top: 70px;
		}

		span {
			color: $gray;
			font-size: 16px;
			line-height: 29px;
		}

		@media screen and (max-width: 768px) {
			margin-bottom: 35px;
		}
	}

	&__event {
		&-title {
			h3 {
				color: $soft-black;
				font-size: 34px;
				line-height: 51px;
				margin-top: 70px;
			}

			span {
				color: $gray;
				font-size: 16px;
				line-height: 29px;

				@media screen and (max-width: 768px) {
					margin-bottom: 35px;
				}
			}
		}
		&-carousel {
			margin-bottom: 70px;
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
