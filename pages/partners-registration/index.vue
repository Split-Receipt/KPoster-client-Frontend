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
		<v-form ref="partnerRegForm" class="partners__form">
			<h3>{{ $t('partners_formTitle') }}</h3>
			<div class="partners__form-row">
				<div class="partners__form-row-info">
					<span>
						<strong class="partners__form-row-info-required">*</strong>
						Tipo de organizaón
					</span>
				</div>
				<div class="partners__form-row-input">
					<v-field
						v-slot="{ errors }"
						:model-value="partnerRegistrationForm.data.orgType"
						name="orgType"
						rules="required"
					>
						<cp-radio-button
							v-model="partnerRegistrationForm.data.orgType"
							:options="radioOptions1"
							name="radio1"
							style="margin-left: -30px"
						/>
						<span v-if="errors" class="required-input-error-info-leftSide">{{
							errors[0]
						}}</span>
					</v-field>
				</div>
			</div>

			<div class="partners__form-row">
				<div class="partners__form-row-info">
					<span>
						<strong class="partners__form-row-info-required">*</strong>
						Nombre comercial
						<cp-info-pop-up
							id="Nombre_comercial_info"
							info="test info Nombre"
						/>
					</span>
				</div>
				<div class="partners__form-row-input">
					<v-field
						v-slot="{ errors }"
						:model-value="partnerRegistrationForm.data.commercialName"
						name="commercialName"
						rules="required"
					>
						<cp-text-input
							v-model="partnerRegistrationForm.data.commercialName"
							type="text"
							placeholder="Nombre comercial"
							:class="{ 'required-input-error-textInput': errors.length > 0 }"
						/>
						<span v-if="errors" class="required-input-error-info-leftSide">{{
							errors[0]
						}}</span>
					</v-field>
				</div>
			</div>

			<div class="partners__form-row">
				<div class="partners__form-row-info">
					<span>
						<strong class="partners__form-row-info-required">*</strong>
						Razón social
						<cp-info-pop-up id="Razón_social_info" info="test info Razón" />
					</span>
				</div>
				<div class="partners__form-row-input">
					<v-field
						v-slot="{ errors }"
						:model-value="partnerRegistrationForm.data.compName"
						name="compName"
						rules="required"
					>
						<cp-text-input
							v-model="partnerRegistrationForm.data.compName"
							type="text"
							placeholder="Razón social"
							:class="{ 'required-input-error-textInput': errors.length > 0 }"
						/>
						<span v-if="errors" class="required-input-error-info-leftSide">{{
							errors[0]
						}}</span>
					</v-field>
				</div>
			</div>

			<div class="partners__form-row">
				<div class="partners__form-row-info">
					<span>
						<strong class="partners__form-row-info-required">*</strong>
						RUC
					</span>
				</div>
				<div class="partners__form-row-input">
					<v-field
						v-slot="{ errors }"
						:model-value="partnerRegistrationForm.data.compName"
						name="ruc"
						rules="required"
					>
						<cp-text-input
							v-model="partnerRegistrationForm.data.ruc"
							type="text"
							placeholder="RUC"
							:class="{ 'required-input-error-textInput': errors.length > 0 }"
						/>
						<span v-if="errors" class="required-input-error-info-leftSide">{{
							errors[0]
						}}</span>
					</v-field>
				</div>
			</div>

			<div class="partners__form-row">
				<div class="partners__form-row-info">
					<span>
						<strong class="partners__form-row-info-required">*</strong>
						Dónde se ubica tu organización?
						<cp-info-pop-up id="Dónde_se_ubica_info" info="test info Dónde" />
					</span>
				</div>
				<div class="partners__form-row-input">
					<v-field
						v-slot="{ errors }"
						:model-value="partnerRegistrationForm.data.orgLocation"
						name="orgLocation"
						rules="required"
					>
						<cp-radio-button
							v-model="partnerRegistrationForm.data.orgLocation"
							:options="radiooptions2"
							name="radio2"
							style="margin-left: -30px"
						/>
						<span v-if="errors" class="required-input-error-info-leftSide">{{
							errors[0]
						}}</span>
					</v-field>
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
						v-model="partnerRegistrationForm.files.videoBusinessCard"
						:is-single="true"
						type="video"
						:max-size="50"
					/>
				</div>
			</div>

			<div class="partners__form-rowDnD">
				<div class="partners__form-rowDnD-info">
					<span>
						<strong class="partners__form-rowDnD-info-required">*</strong>
						Subir el banner principal
					</span>
				</div>
				<div class="partners__form-rowDnD-input">
					<v-field
						v-slot="{ errors }"
						:model-value="partnerRegistrationForm.files.mainBanner"
						name="banner"
						rules="required_file"
					>
						<cp-drag-n-drop
							v-model="partnerRegistrationForm.files.mainBanner"
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
								v-model="compVideoValue"
								:default-option="compVideoValue"
								switcher-name="compVideo"
								:switcher-options="compVideoSwitcherOptions"
							/>
						</div>
					</span>
				</div>
				<div class="partners__form-rowDnD-input">
					<span class="partners__form-rowDnD-semiBlock">
						<div>
							<cp-drag-n-drop
								v-if="compVideoValue === 'File'"
								v-model="partnerRegistrationForm.files.compVideoFile"
								:is-single="true"
								type="video"
								:max-size="50"
							/>
							<span
								v-else
								class="partners__form-rowDnD-semiBlock-social-maxWidth"
								style="padding-top: 12px;"
							>
								<cp-text-input2
									id="compVideo_id"
									v-model="partnerRegistrationForm.data.compVideoLink"
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
						v-model="partnerRegistrationForm.files.mostPopularProduct"
						:is-single="true"
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
							<cp-text-input2
								id="telegram_id"
								v-model="partnerRegistrationForm.data.socialMedias.telegram"
								:circle="true"
								label-text="Telegram"
								placeholder="https://www.youtube.com/"
							/>
						</span>
						<span class="partners__form-rowDnD-semiBlock-social">
							<cp-text-input2
								id="twitter_id"
								v-model="partnerRegistrationForm.data.socialMedias.twitter"
								:circle="true"
								label-text="Twitter"
								placeholder="https://www.vimeo.com/"
							/>
						</span>
						<span class="partners__form-rowDnD-semiBlock-social">
							<cp-text-input2
								id="faceBook_id"
								v-model="partnerRegistrationForm.data.socialMedias.faceBook"
								:circle="true"
								label-text="FaceBook"
								placeholder="https://www.vimeo.com/"
							/>
						</span>
						<span class="partners__form-rowDnD-semiBlock-social">
							<cp-text-input2
								id="instagram_id"
								v-model="partnerRegistrationForm.data.socialMedias.instagram"
								:circle="true"
								label-text="Instagram"
								placeholder="https://www.vimeo.com/"
							/>
						</span>
						<span class="partners__form-rowDnD-semiBlock-social">
							<cp-text-input2
								id="youTube_id"
								v-model="partnerRegistrationForm.data.socialMedias.youTube"
								:circle="true"
								label-text="YouTube"
								placeholder="https://www.vimeo.com/"
							/> </span
						><span class="partners__form-rowDnD-semiBlock-social">
							<cp-text-input2
								id="linkedIn_id"
								v-model="partnerRegistrationForm.data.socialMedias.linkedIn"
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
							v-model="partnerRegistrationForm.data.digitalCatalog"
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
						<strong class="partners__form-rowDnD-info-required">*</strong>
						Sube tus principales productos y sus descripciones
						<cp-info-pop-up
							id="principales_productos_info"
							info="El banner debe cargarse a 1100 por 278 píxeles en formato .png"
						/>
						<div class="partners__form-switcherBlock">
							<cp-switcher
								v-model="mainProdValue"
								:default-option="mainProdValue"
								switcher-name="mainProd"
								:switcher-options="mainProdSwitcherOptions"
							/>
						</div>
					</span>
				</div>
				<div class="partners__form-rowDnD-input">
					<v-field
						v-if="mainProdValue === 'File'"
						v-slot="{ errors }"
						:model-value="partnerRegistrationForm.files.productDescriptionFile"
						name="productDescription"
						rules="required_file"
					>
						<cp-drag-n-drop
							v-model="partnerRegistrationForm.files.productDescriptionFile"
							:is-single="true"
							type="image"
							:max-size="5"
							:is-invalid="errors.length > 0"
						/>
						<span v-if="errors && mainProdValue === 'File'" class="required-input-error-info-center">{{
							errors[0]
						}}</span>
					</v-field>
					<v-field
						v-if="mainProdValue === 'Link'"
						v-slot="{ errors }"
						:model-value="partnerRegistrationForm.data.productDescriptionLink"
						name="productDescription"
						rules="required"
					>
						<span
							class="partners__form-rowDnD-semiBlock-social-maxWidth"
							style="padding-top: 12px;"
						>
							<cp-text-input2
								id="compVideo_id"
								v-model="partnerRegistrationForm.data.productDescriptionLink"
								:circle="true"
								label-text="Descripción del Producto"
								placeholder="Descripción del Producto"
								:class="
									{
										'required-input-error-socialMedia': errors.length > 0,
										'required-input-default-socialMedia': errors.length < 1,
									}"
							/>
							<span v-if="errors && mainProdValue === 'Link'" class="required-input-error-info-leftSide">
								{{ errors[0] }}
							</span>
						</span>
					</v-field>
					<v-field
						v-if="mainProdValue === 'Text'"
						v-slot="{ errors }"
						:model-value="partnerRegistrationForm.data.productDescriptionText"
						name="productDescription"
						rules="required"
					>
						<span
							class="partners__form-rowDnD-semiBlock-social-maxWidth"
							style="padding-top: 12px;"
						>
							<label class="input-laabel" for="mainProdTextArea">Descripción del Producto</label>
							<cp-text-area
								v-model="partnerRegistrationForm.data.productDescriptionText"
								:class="{ 'required-input-error-textInput': errors.length > 0 }"
								text-area-id="mainProdTextArea"
								text-area-label="Descripción del Producto"
								text-area-placeholder="por favor escriba una descripción del producto"
							/>
							<span v-if="errors && mainProdValue === 'Text'" class="required-input-error-info-center">
								{{ errors[0] }}
							</span>
						</span>
					</v-field>
				</div>
			</div>

			<div class="partners__form-soloInput">
				<div class="partners__form-soloInput__container">
					<div class="partners__form-soloInput__title">
						<span class="partners__form-soloInput__title-main">
							<strong class="partners__form-soloInput__title-main-required">
								*
							</strong>
							Primera categoría de bienes
						</span>
						<span class="partners__form-soloInput__title-second">
							introduzca el texto
						</span>
					</div>
					<div class="partners__form-soloInput__socials">
						<span class="partners__form-soloInput__socials-item">
							<v-field
								v-for="(category, index) in partnerRegistrationForm.data.productCategories"
								:key="category.categoryId"
								v-slot="{ errors }"
								:model-value="partnerRegistrationForm.data.productCategories[index].title"
								:name="'cat1_product' + (index + 1)"
								rules="required"
							>
								<div class="partners__form-soloInput__socials-item-block">
									<cp-text-input2
										:id="'cat1_product' + (index + 1)"
										v-model="
											partnerRegistrationForm.data.productCategories[index].title
										"
										:circle="true"
										:label-text="'Mercancía ' + (index + 1)"
										placeholder="introduzca el enlace"
										:class="{
											'required-input-error-socialMedia': errors.length > 0,
											'required-input-default-socialMedia': errors.length < 1,
										}"
									/>
									<cp-button
										v-if="
											partnerRegistrationForm.data.productCategories.length > 1
										"
										shape="circle"
										color="yellowGrey"
										text=""
										with-image="../public/images/trash.svg"
										@click="deleteCategory(index)"
									/>
								</div>
								<span
									v-if="errors.length"
									class="cascade-error-leftSide"
								>
									{{ errors[0] }}
								</span>
							</v-field>
							<cp-button
								:disabled="partnerRegistrationForm.data.productCategories.length > 14"
								shape="circle"
								color="yellowGrey"
								text=""
								with-image="../public/images/plus.svg"
								@click="addNewCategoryInput"
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
			<div class="partners__form-rowDnD">
				<div class="partners__form-rowDnD-info">
					<span>
						<strong class="partners__form-rowDnD-info-required">*</strong>
						Añadir fotos a la galería
						<cp-info-pop-up
							id="galería_info"
							info="Sube un máximo de 6 fotos que no excedan los 2MB"
						/>
					</span>
				</div>
				<div class="partners__form-rowDnD-input">
					<v-field
						v-slot="{ errors }"
						:model-value="partnerRegistrationForm.files.galleryImages"
						name="gallery_DnD"
						rules="required_file"
					>
						<cp-drag-n-drop
							v-model="partnerRegistrationForm.files.galleryImages"
							:is-multi="true"
							type="image"
							:max-size="2"
							:is-invalid="errors.length > 0"
						/>
						<span v-if="errors" class="required-input-error-info-center">{{
							errors[0]
						}}</span>
					</v-field>
				</div>
			</div>
			<div class="partners__form-rowDnD">
				<div class="partners__form-rowDnD-info">
					<span>
						<strong class="partners__form-rowDnD-info-required">*</strong>
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
							<v-field
								v-slot="{ errors }"
								:model-value="partnerRegistrationForm.data.contacts.place"
								name="place"
								rules="required"
							>
								<cp-text-input2
									id="place"
									v-model="partnerRegistrationForm.data.contacts.place"
									label-text="País y ciudad"
									placeholder="introduzca el enlace"
									:class="{
										'required-input-error-socialMedia': errors.length > 0,
									}"
								/>
								<span v-if="errors" class="required-input-error-info-leftSide">{{
									errors[0]
								}}</span>
							</v-field>
						</span>
						<span class="partners__form-rowDnD-semiBlock-social">
							<v-field
								v-slot="{ errors }"
								:model-value="partnerRegistrationForm.data.contacts.tel"
								name="tel"
								rules="required"
							>
								<cp-text-input2
									id="tel_id"
									v-model="partnerRegistrationForm.data.contacts.tel"
									label-text="Teléfono de la empresa"
									placeholder="introduzca el enlace"
									:class="{
										'required-input-error-socialMedia': errors.length > 0,
									}"
								/>
								<span v-if="errors" class="required-input-error-info-leftSide">{{
									errors[0]
								}}</span>
							</v-field>
						</span>
						<span class="partners__form-rowDnD-semiBlock-social">
							<v-field
								v-slot="{ errors }"
								:model-value="partnerRegistrationForm.data.contacts.mail"
								name="mail"
								rules="required|email"
							>
								<cp-text-input2
									id="mail_id"
									v-model="partnerRegistrationForm.data.contacts.mail"
									label-text="Email"
									placeholder="introduzca el enlace"
									:class="{
										'required-input-error-socialMedia': errors.length > 0,
									}"
								/>
								<span v-if="errors" class="required-input-error-info-leftSide">{{
									errors[0]
								}}</span>
							</v-field>
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
		</v-form>
	</div>
</template>

<script setup lang="ts">
import { toast } from 'vue3-toastify';
import CpButton from '@shared/gui/CpButton.vue';
import CpDragNDrop from '@shared/gui/CpDragNDrop.vue';
import CpTextInput from '@shared/gui/CpTextInput.vue';
import CpRadioButton from '@shared/gui/CpRadioButton.vue';
import CpInfoPopUp from '@shared/gui/CpInfoPopUp.vue';
import CpTextInput2 from '@shared/gui/CpTextInput2.vue';
import type { PartnerRegistration } from '@shared/api/types.ts';
import { registerPartner } from '@shared/api';
import { Form as VForm, Field as VField } from 'vee-validate';
import { generateUniqueId } from '@shared/helpers/generateUid';

const { $objToFormData } = useNuxtApp();
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

const compVideoSwitcherOptions = [
	{ optionName: 'Upload File', optionValue: 'File', optionKey: 'FileKey' },
	{ optionName: 'Paste Link', optionValue: 'Link', optionKey: 'LinkKey' },
];

const mainProdSwitcherOptions = [
	{ optionName: 'Upload File', optionValue: 'File', optionKey: 'FileKey' },
	{ optionName: 'Paste Link', optionValue: 'Link', optionKey: 'LinkKey' },
	{ optionName: 'Type text', optionValue: 'Text', optionKey: 'TextKey' },
];

// ----------------------------------------------------------------------

const partnerRegistrationForm = reactive<PartnerRegistration>({
	data: {
		orgType: '',
		commercialName: '',
		compName: '',
		ruc: '',
		orgLocation: '',
		productDescriptionLink: '',
		productDescriptionText: '',
		compVideoLink: '',
		socialMedias: {
			telegram: '',
			twitter: '',
			faceBook: '',
			instagram: '',
			youTube: '',
			linkedIn: '',
		},
		digitalCatalog: '',
		productCategories: [],
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

const compVideoValue = ref<string | null>('File');
const mainProdValue = ref<string | null>('File');

const isSpin = ref<boolean>(false);
const partnerRegForm = ref<HTMLFormElement | null>(null);

watch(compVideoValue, () => {
	partnerRegistrationForm.data.compVideoLink = '';
	partnerRegistrationForm.files.compVideoFile = null;
});

watch(mainProdValue, () => {
	partnerRegistrationForm.files.productDescriptionFile = null;
	partnerRegistrationForm.data.productDescriptionLink = '';
	partnerRegistrationForm.data.productDescriptionText = '';
});

onBeforeMount(() => {
	addNewCategoryInput();
});

const addNewCategoryInput = () => {
	partnerRegistrationForm.data.productCategories.push({
		categoryId: generateUniqueId(),
		title: '',
	});
};

const deleteCategory = (index: number) => {
	if (
		index > -1 &&
		index < partnerRegistrationForm.data.productCategories.length
	) {
		partnerRegistrationForm.data.productCategories.splice(index, 1);
	}
};

const sendPartnerRegistrationForm = async () => {
	isSpin.value = true;
	const isValid = await partnerRegForm.value?.validate();

	if (!isValid.valid) {
		isSpin.value = false;
		toast.error('form is invalid');

		return;
	}

	const partnerRegPayload = $objToFormData(toRaw(partnerRegistrationForm));
	try {
		await registerPartner(partnerRegPayload);
		isSpin.value = false;
		toast.success('Success!');
	} catch (error) {
		toast.error('error');
		isSpin.value = false;
	} finally {
		isSpin.value = false;
	}
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

				&-required {
					color: red;
					font-size: 32px;
					margin-left: -20px;
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

				&-required {
					color: red;
					font-size: 32px;
					margin-left: -20px;
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
						min-height: 250px
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
					width: 100%;
					padding: 10px;
					margin-top: 15px;

					&-block {
						display: flex;
						width: 100%;
						margin-bottom: 15px;
					}
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

					&-required {
						color: red;
						font-size: 32px;
						margin-left: -20px;
					}
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

.cascade-error {
	&-leftSide {
		display: flex;
		align-items: center;
		width: 100%;
		color: crimson;
		justify-content: flex-start;
		line-height: 35px;
		margin-top: -15px;
	}

	&-center {
		display: flex;
		align-items: center;
		width: 100%;
		color: crimson;
		justify-content: space-around;
		line-height: 35px;
		margin-top: -15px;
	}
}

.input-laabel {
	margin-bottom: 15px;
    font-size: 22px;
    line-height: 35.2px;
    color: #353333;
}
</style>
