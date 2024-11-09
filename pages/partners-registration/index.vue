<template>
	<div class="partners__main">
		<cp-spinner :is-spinned="isSpin" />
		<h1 class="partners__title">
			Ingresa tus datos para registrarte en el Portal Cultural del Cusco
		</h1>
		<div class="partners__subtitle">
			<h3>Llene el formulario de registro</h3>
		</div>
		<v-form ref="partnerRegForm" class="partners__form">
			<h3>{{ $t('partners_formTitle') }}</h3>

			<!-- Organization type -->
			<div class="partners__form-rowDnD">
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
							name="orgType"
							style="margin-left: -30px"
						/>
						<span v-if="errors" class="required-input-error-info-leftSide">{{
							errors[0]
						}}</span>
					</v-field>
				</div>
			</div>

			<!-- personal activity (First name) -->
			<div
				v-if="partnerRegistrationForm.data.orgType === 'Persona_Natural'"
				class="partners__form-row"
			>
				<div class="partners__form-row-info">
					<span>
						<strong class="partners__form-row-info-required">*</strong>
						Nombre
						<cp-info-pop-up
							id="Nombre_comercial_info"
							info="test info Nombre"
						/>
					</span>
				</div>
				<div class="partners__form-row-input">
					<v-field
						v-slot="{ errors }"
						:model-value="partnerRegistrationForm.data.personalName"
						name="commercialName"
						rules="required"
					>
						<cp-text-input
							v-model="partnerRegistrationForm.data.personalName"
							type="text"
							placeholder="ingrese el nombre"
							:class="{ 'required-input-error-textInput': errors.length > 0 }"
						/>
						<span v-if="errors" class="required-input-error-info-leftSide">{{
							errors[0]
						}}</span>
					</v-field>
				</div>
			</div>

			<!-- Persona lIdentifying Document  -->
			<div
				v-if="partnerRegistrationForm.data.orgType === 'Persona_Natural'"
				class="partners__form-rowDnD"
			>
				<div class="partners__form-row-info">
					<span>
						<strong class="partners__form-row-info-required">*</strong>
						Tipo de documento de identidad
					</span>
				</div>
				<div class="partners__form-row-input">
					<v-field
						v-slot="{ errors }"
						:model-value="
							partnerRegistrationForm.data.personalIdentifyingDocument
						"
						name="orgType"
						rules="required"
					>
						<cp-radio-button
							v-model="partnerRegistrationForm.data.personalIdentifyingDocument"
							:options="docTypeOptions"
							name="PersonalIdentifyingDocument"
							style="margin-left: -30px"
						/>
						<span v-if="errors" class="required-input-error-info-leftSide">{{
							errors[0]
						}}</span>
					</v-field>
				</div>
			</div>

			<!-- Persona lIdentifying Document scan -->
			<div
				v-if="partnerRegistrationForm.data.orgType === 'Persona_Natural'"
				class="partners__form-rowDnD"
			>
				<div class="partners__form-rowDnD-info">
					<span>
						<strong class="partners__form-rowDnD-info-required">*</strong>
						Escaneo de un documento de identidad
					</span>
				</div>
				<div class="partners__form-rowDnD-input">
					<v-field
						v-slot="{ errors }"
						:model-value="partnerRegistrationForm.files.personalDocumentScan"
						name="personalDocumentScan"
						rules="required_file"
					>
						<cp-drag-n-drop
							v-model="partnerRegistrationForm.files.personalDocumentScan"
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

			<!-- Organization name -->
			<div
				v-if="partnerRegistrationForm.data.orgType !== 'Persona_Natural'"
				class="partners__form-row"
			>
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

			<!-- Company name -->
			<div
				v-if="partnerRegistrationForm.data.orgType !== 'Persona_Natural'"
				class="partners__form-row"
			>
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

			<!-- Pay number -->
			<div
				v-if="partnerRegistrationForm.data.orgType !== 'Persona_Natural'"
				class="partners__form-row"
			>
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

			<!-- activity start date -->
			<div class="partners__form-row">
				<div class="partners__form-row-info">
					<span>
						<strong class="partners__form-row-info-required">*</strong>
						Fecha de inicio de actividades
						<cp-info-pop-up id="startDate_info" info="start date info" />
					</span>
				</div>
				<div class="partners__form-row-input">
					<v-field
						v-slot="{ errors }"
						:model-value="partnerRegistrationForm.data.startDate"
						name="startDate"
						rules="required"
					>
						<cp-text-input
							v-model="partnerRegistrationForm.data.startDate"
							type="date"
							placeholder="ingrese la fecha"
							:class="{ 'required-input-error-textInput': errors.length > 0 }"
						/>
						<span v-if="errors" class="required-input-error-info-leftSide">{{
							errors[0]
						}}</span>
					</v-field>
				</div>
			</div>

			<!-- people count in organization -->
			<div class="partners__form-row">
				<div class="partners__form-row-info">
					<span>
						<strong class="partners__form-row-info-required">*</strong>
						Numero de personas de tu organización
						<cp-info-pop-up id="personCount" info="person count info" />
					</span>
				</div>
				<div class="partners__form-row-input">
					<v-field
						v-slot="{ errors }"
						:model-value="partnerRegistrationForm.data.personCount"
						name="personCount"
						rules="require_number"
					>
						<cp-text-input
							v-model="partnerRegistrationForm.data.personCount"
							type="number"
							placeholder="Numero de personas"
							:class="{ 'required-input-error-textInput': errors.length > 0 }"
						/>
						<span v-if="errors" class="required-input-error-info-leftSide">{{
							errors[0]
						}}</span>
					</v-field>
				</div>
			</div>

			<!-- Age range and woman percentage -->
			<div class="partners__form-row">
				<div class="partners__form-row-info">
					<span>
						<strong class="partners__form-row-info-required">*</strong>
						Rango de edad y porcentaje de mujeres, aprox
						<cp-info-pop-up
							id="middleAge"
							info="tmiddle age and woman percentage info"
						/>
					</span>
				</div>
				<div class="partners__form-row-input">
					<div class="partners__form-row-input-flexBlock">
						<span>
							<v-field
								v-slot="{ errors }"
								:model-value="partnerRegistrationForm.data.middleAge"
								name="middleAge"
								rules="require_number"
							>
								<cp-text-input
									v-model="partnerRegistrationForm.data.middleAge"
									type="number"
									placeholder="Numero de personas"
									:class="{
										'required-input-error-textInput': errors.length > 0,
									}"
								/>
								<span
									v-if="errors"
									class="required-input-error-info-leftSide"
								>{{ errors[0] }}</span
								>
							</v-field>
						</span>
						<span>
							<v-field
								v-slot="{ errors }"
								:model-value="partnerRegistrationForm.data.womenPercentage"
								name="womenPercentage"
								rules="require_number"
							>
								<cp-text-input
									v-model="partnerRegistrationForm.data.womenPercentage"
									type="number"
									placeholder="porcentaje de mujeres"
									:class="{
										'required-input-error-textInput': errors.length > 0,
									}"
								/>
								<span
									v-if="errors"
									class="required-input-error-info-leftSide"
								>{{ errors[0] }}</span
								>
							</v-field>
						</span>
					</div>
				</div>
			</div>

			<!-- main Banner -->
			<div class="partners__form-rowDnD">
				<div class="partners__form-rowDnD-info">
					<span>
						<strong class="partners__form-rowDnD-info-required">*</strong>
						Subir el logo o imagen principal
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

			<!-- organization Resume -->
			<div class="partners__form-rowDnD">
				<div class="partners__form-rowDnD-info">
					<span>
						<strong class="partners__form-rowDnD-info-required">*</strong>
						Resume lo que hace tu organización
						<cp-info-pop-up id="org_resume" info="250-500 palabras" />
					</span>
				</div>
				<div class="partners__form-rowDnD-input">
					<v-field
						v-slot="{ errors }"
						:model-value="partnerRegistrationForm.data.orgResume"
						name="orgResume"
						rules="required"
					>
						<cp-text-area
							v-model="partnerRegistrationForm.data.orgResume"
							text-area-id="orgResume"
							text-area-placeholder="resume lo que hace tu organización"
							:class="{ 'required-input-error-textInput': errors.length > 0 }"
						/>
						<span v-if="errors" class="required-input-error-info-center">{{
							errors[0]
						}}</span>
					</v-field>
				</div>
			</div>

			<!-- company Video File -->
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
								style="padding-top: 12px"
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

			<!-- culture Type -->
			<div class="partners__form-rowDnD">
				<div class="partners__form-row-info">
					<span>
						<strong class="partners__form-row-info-required">*</strong>
						En que areas de la cultura viva comunitaria se desenvuelve tu
						organización ? Elección múltiple
					</span>
				</div>
				<div class="partners__form-row-input">
					<v-field
						v-if="orgSphereChecks.length > 0"
						v-slot="{ errors }"
						name="cultureType"
						rules="require_checkbox"
						:model-value="partnerRegistrationForm.data.cultureType"
					>
						<div>
							<cp-check-box
								v-for="(item, index) in orgSphereChecks"
								:key="item.value"
								:option="item"
								return-value="id"
								@update:checkbox-update="(value: number) => checkboxCollectCultureType(value, index)"
							/>
						</div>
						<span
							v-if="
								errors && partnerRegistrationForm.data.cultureType.length < 1
							"
							class="required-input-error-info-leftSide"
						>{{ errors[0] }}</span
						>
					</v-field>
				</div>
			</div>

			<!-- organization Work Type -->
			<div class="partners__form-rowDnD">
				<div class="partners__form-rowDnD-info">
					<span>
						<strong class="partners__form-rowDnD-info-required">*</strong>
						Especificar la labor que realiza en el área seleccionada de cultura
						viva comunitaria
						<cp-info-pop-up id="org_Work_Type" info="orgWorkType info" />
					</span>
				</div>
				<div class="partners__form-rowDnD-input">
					<v-field
						v-slot="{ errors }"
						:model-value="partnerRegistrationForm.data.orgWorkType"
						name="orgWorkType"
						rules="required"
					>
						<cp-text-area
							v-model="partnerRegistrationForm.data.orgWorkType"
							text-area-id="orgWorkType"
							text-area-placeholder="describe los detalles del texto de tu industria"
							:class="{ 'required-input-error-textInput': errors.length > 0 }"
						/>
						<span v-if="errors" class="required-input-error-info-center">{{
							errors[0]
						}}</span>
					</v-field>
				</div>
			</div>

			<!-- Product description -->
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
						<span
							v-if="errors && mainProdValue === 'File'"
							class="required-input-error-info-center"
						>{{ errors[0] }}</span
						>
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
							style="padding-top: 12px"
						>
							<cp-text-input2
								id="compVideo_id"
								v-model="partnerRegistrationForm.data.productDescriptionLink"
								:circle="true"
								label-text="Descripción del Producto"
								placeholder="Descripción del Producto"
								:class="{
									'required-input-error-socialMedia': errors.length > 0,
									'required-input-default-socialMedia': errors.length < 1,
								}"
							/>
							<span
								v-if="errors && mainProdValue === 'Link'"
								class="required-input-error-info-leftSide"
							>
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
							style="padding-top: 12px"
						>
							<label
								class="input-laabel"
								for="mainProdTextArea"
							>Descripción del Producto</label
							>
							<cp-text-area
								v-model="partnerRegistrationForm.data.productDescriptionText"
								:class="{ 'required-input-error-textInput': errors.length > 0 }"
								text-area-id="mainProdTextArea"
								text-area-label="Descripción del Producto"
								text-area-placeholder="por favor escriba una descripción del producto"
							/>
							<span
								v-if="errors && mainProdValue === 'Text'"
								class="required-input-error-info-center"
							>
								{{ errors[0] }}
							</span>
						</span>
					</v-field>
				</div>
			</div>

			<!-- digital Catalog -->
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

			<!-- organization location -->
			<div class="partners__form-rowDnD">
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
							:options="cityRadioButtons"
							name="radio2"
							return-value="id"
							style="margin-left: -30px"
						/>
						<span v-if="errors" class="required-input-error-info-leftSide">{{
							errors[0]
						}}</span>
					</v-field>
				</div>
			</div>

			<!-- contacts -->
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
					<div class="partners__form-rowDnD-input-socialsAndContacts">
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
								<span
									v-if="errors"
									class="required-input-error-info-leftSide"
								>{{ errors[0] }}</span
								>
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
								<span
									v-if="errors"
									class="required-input-error-info-leftSide"
								>{{ errors[0] }}</span
								>
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
								<span
									v-if="errors"
									class="required-input-error-info-leftSide"
								>{{ errors[0] }}</span
								>
							</v-field>
						</span>
					</div>
				</div>
			</div>

			<!-- social Medias -->
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
					<div class="partners__form-rowDnD-input-socialsAndContacts">
						<span
							v-for="(socialMedia, index) in partnerRegistrationForm.data
								.socialMedias"
							:key="socialMedia.socialMediaName"
							class="partners__form-rowDnD-semiBlock-social"
						>
							<cp-text-input2
								:id="socialMedia.socialMediaName + '_id'"
								v-model="
									partnerRegistrationForm.data.socialMedias[index]
										.socialMediaLink
								"
								:circle="true"
								:label-text="socialMedia.socialMediaName"
								:placeholder="`https://www.${socialMedia.socialMediaName}.com/`"
							/>
						</span>
					</div>
				</div>
			</div>

			<!-- culture Type -->
			<div class="partners__form-rowDnD">
				<div class="partners__form-row-info">
					<span>
						<strong class="partners__form-row-info-required">*</strong>
						Afiliaciones o in incitativas
					</span>
				</div>
				<div class="partners__form-row-input">
					<v-field
						v-slot="{ errors }"
						name="Affiliations"
						rules="require_checkbox"
						:model-value="partnerRegistrationForm.data.affiliations"
					>
						<div>
							<cp-check-box
								v-for="(item, index) in affiliationChecks"
								:key="item.value"
								:option="item"
								return-value="id"
								@update:checkbox-update="(value: number) => checkboxCollectAffiliations(value, index)"
							/>
						</div>
						<span
							v-if="
								errors && partnerRegistrationForm.data.affiliations.length < 1
							"
							class="required-input-error-info-leftSide"
						>{{ errors[0] }}</span
						>
					</v-field>
				</div>
			</div>

			<!-- video Business Card -->
			<div class="partners__form-rowDnD">
				<div class="partners__form-rowDnD-info">
					<span>
						Sube el video que explica su servicio y producto o incrusta el
						enlace desde Youtube o Vimeo
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

			<!-- most Popular Product -->
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

			<!-- gallery Images -->
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

			<!-- Registration Data -->
			<div class="partners__form-rowDnD">
				<div class="partners__form-rowDnD-info">
					<span>
						<strong class="partners__form-rowDnD-info-required">*</strong>
						Detalles de inicio de sesión
						<cp-info-pop-up
							id="user_registration_info"
							info="No se admitirán redes personales"
						/>
					</span>
				</div>
				<div class="partners__form-rowDnD-input">
					<div class="partners__form-rowDnD-input-socialsAndContacts">
						<span class="partners__form-rowDnD-semiBlock-social">
							<cp-text-input2
								id="username_id"
								v-model="userRegistrationData.username"
								:circle="true"
								label-text="Nombre de usuario"
								placeholder="Nombre"
							/>
						</span>
						<span class="partners__form-rowDnD-semiBlock-social">
							<cp-text-input2
								id="email_id"
								v-model="userRegistrationData.email"
								:circle="true"
								label-text="Email"
								placeholder="example@example.com"
							/>
						</span>
						<span class="partners__form-rowDnD-semiBlock-social">
							<cp-text-input2
								id="pass_id"
								v-model="userRegistrationData.password"
								:circle="true"
								type="password"
								label-text="Password"
								placeholder="Password"
							/>
						</span>
						<span class="partners__form-rowDnD-semiBlock-social">
							<cp-text-input2
								id="confirmPass_id"
								v-model="passwordConfirmationValue"
								:circle="true"
								type="password"
								label-text="Confirm Password"
								placeholder="Password again"
							/>
						</span>
					</div>
				</div>
			</div>

			<div class="partners__form-submit">
				<div class="partners__form-submit-btnContainer">
					<cp-button
						ref="submitBtn"
						class="partners__form__button"
						width="maxWidth"
						size="small"
						shape="oval"
						color="yellowGrey"
						text="submit"
						:disabled="formSended"
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
import {
	registerPartner,
	requestCities,
	requestCategories,
	requestAffiliations,
} from '@shared/api';
import registerUserForPartner from '@features/register-user';
import { Form as VForm, Field as VField } from 'vee-validate';
import CpTextArea from '@shared/gui/CpTextArea.vue';

const formSended = ref(false);
const { $objToFormData } = useNuxtApp();
const router = useRouter();
onBeforeMount(async () => {
	await getCities();
	await getCategories();
	await getAffiliations();
});

// test values ----------------------------------------------------------
const radioOptions1 = [
	{ id: 'emp', value: 'Empresa', label: 'Empresa' },
	{ id: 'ong', value: 'ONG', label: 'ONG' },
	{
		id: 'Organizacion Cultural',
		value: 'Organizacion_Cultural',
		label: 'Organizacion Cultural',
	},
	{ id: 'Persona Natural', value: 'Persona_Natural', label: 'Persona Natural' },
];

const cityRadioButtons = ref([]);

const docTypeOptions = [
	{
		id: 'Permiso_de_residencia',
		value: 'Permiso_de_residencia',
		label: 'Permiso de residencia',
	},
	{
		id: 'Licencia_de_conducir',
		value: 'Licencia_de_conducir',
		label: 'Licencia de conducir',
	},
	{
		id: 'Pasaporte_extranjero',
		value: 'Pasaporte_extranjero',
		label: 'Pasaporte extranjero',
	},
	{ id: 'Pasaporte_local', value: 'Pasaporte_local', label: 'Pasaporte local' },
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

const orgSphereChecks = ref([]);

const affiliationChecks = ref([]);

// ----------------------------------------------------------------------

const partnerRegistrationForm = reactive<PartnerRegistration>({
	data: {
		orgType: '',
		commercialName: '',
		compName: '',
		ruc: '',
		startDate: '',
		user: null,
		personCount: null,
		middleAge: null,
		womenPercentage: null,
		orgResume: '',
		cultureType: [],
		orgWorkType: '',
		orgLocation: '',
		personalName: '',
		personalIdentifyingDocument: '',
		productDescriptionLink: '',
		productDescriptionText: '',
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
		personalDocumentScan: null,
		videoBusinessCard: null,
		mainBanner: null,
		compVideoFile: null,
		mostPopularProduct: null,
		productDescriptionFile: null,
		galleryImages: null,
	},
});

const userRegistrationData = reactive({
	username: '',
	email: '',
	password: '',
});

const passwordConfirmationValue = ref<string>('');

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

const checkboxCollectCultureType = (value: number, index: number) => {
	if (value) {
		partnerRegistrationForm.data.cultureType.push(value);
	} else {
		partnerRegistrationForm.data.cultureType.splice(index, 1);
	}
};

const checkboxCollectAffiliations = (value: number, index: number) => {
	if (value) {
		partnerRegistrationForm.data.affiliations.push(value);
	} else {
		partnerRegistrationForm.data.affiliations.splice(index, 1);
	}
};

const sendPartnerRegistrationForm = async () => {
	const isValid = await partnerRegForm.value?.validate();

	if (localStorage.getItem('AuthToken')) {
		toast.error('Primero debe cerrar sesión en su cuenta actual');

		return;
	}

	if (!isValid.valid) {
		isSpin.value = false;
		toast.error('Form is invalid');

		return;
	}

	try {
		isSpin.value = true;
		formSended.value = true;
		const newUserId = await registerUserForPartner(userRegistrationData);
		if (!newUserId) {
			throw new Error('No se pudo encontrar el usuario');
		}
		partnerRegistrationForm.data.user = newUserId;
		await createPartner();
		toast.success('El registro fue exitoso');
		setTimeout(() => {
			router.push('/');
		}, 1000);
	} catch (error) {
		if (error.error) {
			toast.error(error.error.message);
		} else {
			toast.error(
				'Nuestro administrador se comunicará conusted por correo electrónico'
			);
		}
		formSended.value = false;
	} finally {
		isSpin.value = false;
	}
};

const createPartner = async () => {
	const partnerRegPayload = $objToFormData(toRaw(partnerRegistrationForm));
	try {
		await registerPartner(partnerRegPayload);
	} catch (error) {
		toast.error('error');
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
</script>

<style scoped lang="scss">
.partners {
	&__main {
		padding: 0 5%;
		@media #{$screen-tablet} {
			margin-top: 10px;
		}

		@media #{$screen-desktop} {
			margin-top: 33px;
		}
	}

	&__title {
		margin-bottom: 45px;
		font-size: 70px;
		font-family: $font-family-medium-expanded;

		@media (max-width: 1265px) {
			line-height: 80px;
		}

		@media (max-width: 1024px) {
			font-size: 35px;
			line-height: 45px;
		}

		@media (max-width: 645px) {
			font-size: 25px;
			line-height: 35px;
		}
	}

	&__subtitle {
		width: 50%;
		h3 {
			font-size: 30px;
			font-weight: 500;
			line-height: 42px;
			color: #353333;

			@media (max-width: 1265px) {
				line-height: 80px;
			}

			@media (max-width: 1024px) {
				font-size: 30px;
				line-height: 35px;
			}

			@media (max-width: 645px) {
				font-size: 20px;
				line-height: 30px;
			}
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
				color: #353333;

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

				&-flexBlock {
					span {
						width: calc(50% - 7.5px);
						&:last-child {
							margin-left: 15px;
						}

						@media (max-width: 610px) {
							// width: 100%;
							&:last-child {
								margin-left: 0;
								margin-top: 5px;
							}
						}
					}

					@media (max-width: 610px) {
						flex-direction: column;
						align-items: flex-start !important;
					}
				}

				&-subInputs {
					margin-top: 15px;

					&-item {
						margin-top: 20px;
					}
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

		&-rowDnD {
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
				color: #353333;

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

				&-subInputs {
					margin-top: 15px;
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
						@media (max-width: 430px) {
							margin-left: -15px !important;
							padding-left: 5px !important;
						}
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
