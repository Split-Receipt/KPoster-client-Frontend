<template>
	<div class="partners__main">
		<cp-spinner :is-spinned="isSpin" />
		<h1 class="partners__title">
			Tu cuenta personal de organizador de eventos
		</h1>
		<v-form ref="partnerRegForm">
			<h3>{{ $t('partners_formTitle') }}</h3>

			<!-- Organization type -->
			<div class="partners__form-rowDnD">
				<div class="partners__form-row-info">
					<span>
						<strong class="partners__form-row-info-required">*</strong>
						Tipo de organización
					</span>
				</div>
				<div class="partners__form-row-input">
					<v-field
						v-slot="{ errors }"
						v-model="partnerForm.data.orgType"
						name="orgType"
						rules="required"
					>
						<cp-radio-button
							v-model="partnerForm.data.orgType"
							:options="commonDataStore.getOrgTypesOptions"
							name="orgType"
							return-value="id"
							:active-id="partnerForm.data.orgType as number"
							style="margin-left: -30px"
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

			<!-- personal activity (First name) -->
			<div
				v-if="currentPartnerType === 'persona_natural'"
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
						:model-value="partnerForm.data.personalName"
						name="commercialName"
						rules="required"
					>
						<cp-text-input
							v-model="partnerForm.data.personalName"
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
				v-if="currentPartnerType === 'persona_natural'"
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
						:model-value="partnerForm.data.personalIdentifyingDocument"
						name="orgType"
						rules="required"
					>
						<cp-radio-button
							v-model="partnerForm.data.personalIdentifyingDocument"
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
				v-if="currentPartnerType === 'persona_natural'"
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
						:model-value="partnerForm.files.personalDocumentScan"
						name="personalDocumentScan"
						rules="required_file"
					>
						<cp-drag-n-drop
							v-model="partnerForm.files.personalDocumentScan"
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
				v-if="currentPartnerType !== 'persona_natural'"
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
						:model-value="partnerForm.data.commercialName"
						name="commercialName"
						rules="required"
					>
						<cp-text-input
							v-model="partnerForm.data.commercialName"
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
				v-if="currentPartnerType !== 'persona_natural'"
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
						:model-value="partnerForm.data.compName"
						name="compName"
						rules="required"
					>
						<cp-text-input
							v-model="partnerForm.data.compName"
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
				v-if="currentPartnerType !== 'persona_natural'"
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
						:model-value="partnerForm.data.compName"
						name="ruc"
						rules="required"
					>
						<cp-text-input
							v-model="partnerForm.data.ruc"
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
						:model-value="partnerForm.data.startDate"
						name="startDate"
						rules="required"
					>
						<cp-text-input
							v-model="partnerForm.data.startDate"
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
						:model-value="partnerForm.data.personCount"
						name="personCount"
						rules="require_number"
					>
						<cp-text-input
							v-model="partnerForm.data.personCount"
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
								:model-value="partnerForm.data.middleAge"
								name="middleAge"
								rules="require_number"
							>
								<cp-text-input
									v-model="partnerForm.data.middleAge"
									type="number"
									placeholder="Numero de personas"
									:class="{
										'required-input-error-textInput': errors.length > 0,
									}"
								/>
								<span v-if="errors" class="required-input-error-info-leftSide">
									{{ errors[0] }}</span
								>
							</v-field>
						</span>
						<span>
							<v-field
								v-slot="{ errors }"
								:model-value="partnerForm.data.womenPercentage"
								name="womenPercentage"
								rules="require_number"
							>
								<cp-text-input
									v-model="partnerForm.data.womenPercentage"
									type="number"
									placeholder="porcentaje de mujeres"
									:class="{
										'required-input-error-textInput': errors.length > 0,
									}"
								/>
								<span v-if="errors" class="required-input-error-info-leftSide">
									{{ errors[0] }}</span
								>
							</v-field>
						</span>
					</div>
				</div>
			</div>

			<!-- main Banner -->
			<div class="partners__form-rowDnD">
				<div class="partners__form-rowDnD-info">
					<span> Subir el logo o imagen principal </span>
				</div>
				<div class="partners__form-rowDnD-input">
					<v-field
						v-slot="{ errors }"
						:model-value="partnerForm.files.mainBanner"
						name="banner"
						:rules="
							eventHostOriginalData &&
								eventHostOriginalData?.data?.attributes.mainBanner.data?.length >
								0
								? ''
								: 'required_file'
						"
					>
						<cp-drag-n-drop
							v-model="partnerForm.files.mainBanner"
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
			<cp-media-carousel
				v-if="
					eventHostOriginalData &&
						eventHostOriginalData.data.attributes.mainBanner?.data?.length > 0
				"
				id="mainBanner"
				is-deletable
				:media-files-objects="
					eventHostOriginalData.data.attributes.mainBanner.data.map(
						(media) => ({
							id: media.id,
							source: makeMediaUrl(media.attributes.url),
						})
					)
				"
				@delete-photo="(value: CpMediaCardProps['item']) => deleteFile(value, 'mainBanner')"
			/>

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
						:model-value="partnerForm.data.orgResume"
						name="orgResume"
						rules="required"
					>
						<cp-text-area
							v-model="partnerForm.data.orgResume"
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
								v-model="partnerForm.files.compVideoFile"
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
									v-model="partnerForm.data.compVideoLink"
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
						v-if="commonDataStore.getCultureTypesOptions.length > 0"
						v-slot="{ errors }"
						name="cultureType"
						rules="require_checkbox"
						:model-value="partnerForm.data.cultureType"
					>
						<div>
							<cp-check-box
								v-for="(item, index) in commonDataStore.getCultureTypesOptions"
								:key="item.value"
								:option="item"
								:checked="partnerForm.data.cultureType.includes(item.id)"
								return-value="id"
								@update:checkbox-update="(value) => checkboxCollectCultureType(value as number, index)"
							/>
						</div>
						<span
							v-if="errors && partnerForm.data.cultureType.length < 1"
							class="required-input-error-info-leftSide"
						>
							{{ errors[0] }}</span
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
						:model-value="partnerForm.data.orgWorkType"
						name="orgWorkType"
						rules="required"
					>
						<cp-text-area
							v-model="partnerForm.data.orgWorkType"
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
						:model-value="partnerForm.files.productDescriptionFile"
						name="productDescription"
						:rules="
							eventHostOriginalData &&
								eventHostOriginalData?.data?.attributes.productDescriptionFile
									.data?.length > 0
								? ''
								: 'required_file'
						"
					>
						<cp-drag-n-drop
							v-model="partnerForm.files.productDescriptionFile"
							:is-single="true"
							type="image"
							:max-size="5"
							:is-invalid="errors.length > 0"
						/>
						<span
							v-if="errors && mainProdValue === 'File'"
							class="required-input-error-info-center"
						>
							{{ errors[0] }}</span
						>
					</v-field>

					<v-field
						v-if="mainProdValue === 'Link'"
						v-slot="{ errors }"
						:model-value="partnerForm.data.productDescriptionLink"
						name="productDescription"
						rules="required"
					>
						<span
							class="partners__form-rowDnD-semiBlock-social-maxWidth"
							style="padding-top: 12px"
						>
							<cp-text-input2
								id="compVideo_id"
								v-model="partnerForm.data.productDescriptionLink"
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
						:model-value="partnerForm.data.productDescriptionText"
						name="productDescription"
						rules="required"
					>
						<span
							class="partners__form-rowDnD-semiBlock-social-maxWidth"
							style="padding-top: 12px"
						>
							<label class="input-laabel" for="mainProdTextArea">
								Descripción del Producto</label
							>
							<cp-text-area
								v-model="partnerForm.data.productDescriptionText"
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

			<cp-media-carousel
				v-if="
					mainProdValue === 'File' &&
						eventHostOriginalData &&
						eventHostOriginalData?.data?.attributes.productDescriptionFile.data
							?.length > 0
				"
				id="mostPopularProduct"
				is-deletable
				:media-files-objects="
					eventHostOriginalData.data.attributes.productDescriptionFile.data.map(
						(media) => ({
							id: media.id,
							source: makeMediaUrl(media.attributes.url),
						})
					)
				"
				@delete-photo="(value: CpMediaCardProps['item']) => deleteFile(value, 'productDescriptionFile')"
			/>

			<!-- webPage -->
			<div class="partners__form-rowDnD">
				<div class="partners__form-rowDnD-info">
					<span>
						Pagina web
						<cp-info-pop-up id="WebPage_info" info="Pagina web info" />
					</span>
				</div>
				<div class="partners__form-rowDnD-input">
					<div>
						<cp-text-input
							v-model="partnerForm.data.webpage"
							type="text"
							placeholder="https://"
						/>
					</div>
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
							v-model="partnerForm.data.digitalCatalog"
							type="text"
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
						:model-value="partnerForm.data.eventHostAddress.city"
						name="eventHostCity"
						rules="required"
					>
						<cp-radio-button
							v-model="partnerForm.data.eventHostAddress.city"
							:options="commonDataStore.getCityOptions"
							name="radio2"
							:active-id="partnerForm.data.eventHostAddress.city ?? ''"
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
								:model-value="partnerForm.data.contacts.place"
								name="place"
								rules="required"
							>
								<cp-text-input2
									id="place"
									v-model="partnerForm.data.contacts.place"
									label-text="País y dirección"
									placeholder="introduzca el enlace"
									:class="{
										'required-input-error-socialMedia': errors.length > 0,
									}"
								/>
								<span v-if="errors" class="required-input-error-info-leftSide">
									{{ errors[0] }}</span
								>
							</v-field>
						</span>
						<span class="partners__form-rowDnD-semiBlock-social">
							<v-field
								v-slot="{ errors }"
								:model-value="partnerForm.data.contacts.tel"
								name="tel"
								rules="required"
							>
								<cp-text-input2
									id="tel_id"
									v-model="partnerForm.data.contacts.tel"
									label-text="Teléfono de la empresa"
									placeholder="introduzca el enlace"
									:class="{
										'required-input-error-socialMedia': errors.length > 0,
									}"
								/>
								<span v-if="errors" class="required-input-error-info-leftSide">
									{{ errors[0] }}</span
								>
							</v-field>
						</span>
						<span class="partners__form-rowDnD-semiBlock-social">
							<v-field
								v-slot="{ errors }"
								:model-value="partnerForm.data.contacts.mail"
								name="mail"
								rules="required|email"
							>
								<cp-text-input2
									id="mail_id"
									v-model="partnerForm.data.contacts.mail"
									label-text="Email"
									placeholder="introduzca el enlace"
									:class="{
										'required-input-error-socialMedia': errors.length > 0,
									}"
								/>
								<span v-if="errors" class="required-input-error-info-leftSide">
									{{ errors[0] }}</span
								>
							</v-field>
						</span>
					</div>
				</div>
			</div>
			<!-- location on map -->
			<div class="partners__form-rowDnD">
				<div class="partners__form-rowDnD-info">
					<span>
						<strong class="partners__form-row-info-required">*</strong>
						Marcar la ubicación del evento
					</span>
				</div>
				<div class="partners__form-rowDnD-input fullWidth-map">
					<div class="partnerRegistration__map">
						<v-field
							v-slot="{ errors }"
							:model-value="partnerForm.data.eventHostAddress.coordinates"
							name="eventCoordinates"
							rules="require_coordinates"
						>
							<cp-map
								:coordinates-output="true"
								:center="getCoordinates"
								@update:coordinates-update="
									(coordinates) => setCoordinates(coordinates)
								"
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
							v-for="(socialMedia, index) in partnerForm.data.socialMedias"
							:key="socialMedia.socialMediaName"
							class="partners__form-rowDnD-semiBlock-social"
						>
							<cp-text-input2
								:id="socialMedia.socialMediaName + '_id'"
								v-model="partnerForm.data.socialMedias[index].socialMediaLink"
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
						:model-value="partnerForm.data.affiliations"
					>
						<div>
							<cp-check-box
								v-for="(item, index) in commonDataStore.getAffiliationsOptions"
								:key="item.value"
								:option="item"
								return-value="id"
								:checked="partnerForm.data.affiliations.includes(item.id)"
								@update:checkbox-update="(value) => checkboxCollectAffiliations(value as number, index)"
							/>
						</div>
						<span
							v-if="errors && partnerForm.data.affiliations.length < 1"
							class="required-input-error-info-leftSide"
						>
							{{ errors[0] }}</span
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
						v-model="partnerForm.files.videoBusinessCard"
						:is-single="true"
						type="video"
						:max-size="50"
					/>
				</div>
			</div>

			<cp-media-carousel
				v-if="
					eventHostOriginalData &&
						eventHostOriginalData?.data?.attributes.videoBusinessCard.data
							?.length > 0
				"
				id="videoBusinessCard"
				is-deletable
				:video-files-objects="
					eventHostOriginalData.data.attributes.videoBusinessCard.data.map(
						(media) => ({
							id: media.id,
							source: makeMediaUrl(media.attributes.url),
						})
					)
				"
				@delete-video="(value: CpMediaCardProps['item']) => deleteFile(value, 'videoBusinessCard')"
			/>

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
						v-model="partnerForm.files.mostPopularProduct"
						:is-single="true"
						type="image"
						:max-size="5"
					/>
				</div>
			</div>
			<cp-media-carousel
				v-if="
					eventHostOriginalData &&
						eventHostOriginalData?.data?.attributes.mostPopularProduct.data
							?.length > 0
				"
				id="mostPopularProduct"
				is-deletable
				:media-files-objects="
					eventHostOriginalData.data.attributes.mostPopularProduct.data.map(
						(media) => ({
							id: media.id,
							source: makeMediaUrl(media.attributes.url),
						})
					)
				"
				@delete-photo="(value: CpMediaCardProps['item']) => deleteFile(value, 'mostPopularProduct')"
			/>

			<!-- gallery Images -->
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
					<v-field
						v-slot="{ errors }"
						:model-value="partnerForm.files.galleryImages"
						name="gallery_DnD"
						:rules="
							eventHostOriginalData &&
								eventHostOriginalData?.data?.attributes.galleryImages.data
									?.length > 0
								? ''
								: 'required_file'
						"
					>
						<cp-drag-n-drop
							v-model="partnerForm.files.galleryImages"
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

			<cp-media-carousel
				v-if="
					eventHostOriginalData &&
						eventHostOriginalData?.data?.attributes.galleryImages.data?.length > 0
				"
				id="galleryImages"
				is-deletable
				:media-files-objects="
					eventHostOriginalData.data.attributes.galleryImages.data.map(
						(media) => ({
							id: media.id,
							source: makeMediaUrl(media.attributes.url),
						})
					)
				"
				@delete-photo="(value: CpMediaCardProps['item']) => deleteFile(value, 'galleryImages')"
			/>

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
						@click="submitPartnerForm"
					/>
				</div>
			</div>
		</v-form>
		<div>
			<h3 class="eventForm-row-title">Eventos</h3>
			<event-carousel
				v-if="eventHostEventsList.length > 0"
				id="eventHostEvents"
				with-edit-controls
				:event-data="eventHostEventsList"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { reactive, ref, onBeforeMount, computed } from 'vue';
import type { CoordinatesType, CpMediaCardProps } from '@shared/gui/types';
import { toast } from 'vue3-toastify';
import CpButton from '@shared/gui/CpButton.vue';
import CpRadioButton from '@shared/gui/CpRadioButton.vue';
import EventCarousel from '@widgets/event-carousel/EventCarousel.vue';
import CpTextInput from '@shared/gui/CpTextInput.vue';
import CpTextArea from '@shared/gui/CpTextArea.vue';
import CpDragNDrop from '@shared/gui/CpDragNDrop.vue';
import CpInfoPopUp from '@shared/gui/CpInfoPopUp.vue';
import CpMap from '@shared/gui/CpMap.vue';
import CpSwitcher from '@shared/gui/CpSwitcher.vue';
import { Form as VForm, Field as VField } from 'vee-validate';
import CpMediaCarousel from '@shared/gui/CpMediaCarousel.vue';
import {
	requestEventsHost,
	deleteMedia,
	requestEventsList,
	editEventHost,
} from '@shared/api';
import type {
	PartnerRegistration,
	EventHost,
	EventData,
	SocialMedia,
} from '@shared/api/types.ts';
import { useCommonDataStore } from '@stores/common-data-store';
import { useRuntimeConfig } from 'nuxt/app';
import { useUserStore } from '@stores/user-store';
import { UserRolesTypes } from '@shared/api/types';
const { locale } = useI18n();
const userStore = useUserStore();

const commonDataStore = useCommonDataStore();
const formSended = ref(false);
const { $objToFormData } = useNuxtApp();
const eventHostOriginalData = ref<EventHost | null>(null);
const config = useRuntimeConfig();
const compVideoValue = ref<string | null>('File');

onBeforeMount(async () => {
	if (!userStore.isAuth) {
		navigateTo(`/${locale.value}`);
	}
	await fetchInitialData();
});

const partnerForm = reactive<PartnerRegistration>({
	data: {
		orgType: null,
		commercialName: '',
		compName: '',
		ruc: '',
		startDate: '',
		user: null,
		personCount: 0,
		middleAge: 0,
		womenPercentage: 0,
		orgResume: '',
		cultureType: [],
		orgWorkType: '',
		eventHostAddress: {
			city: null,
			address: '',
			coordinates: '-13.527141525687806, -71.96803909279043',
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
		personalDocumentScan: null,
		videoBusinessCard: null,
		mainBanner: null,
		compVideoFile: null,
		mostPopularProduct: null,
		productDescriptionFile: null,
		galleryImages: null,
	},
});

const isSpin = ref<boolean>(false);
const partnerRegForm = ref<HTMLFormElement | null>(null);
const mainProdValue = ref<string | null>('File');
const eventHostEventsList = ref<EventData[]>([]);

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

const fetchInitialData = async () => {
	try {
		await getPartnerById();
		await getEventHostEvents();
	} catch (error) {
		toast.error('Error al cargar la información del organizador');
	}
};

const makeMediaUrl = (path: string) => {
	return config.public.apiBaseUrl + path;
};

const getEventHostEvents = async () => {
	if (!eventHostOriginalData.value) {
		return;
	}
	const filters = {
		eventHost: {
			commercialName: {
				$eq: eventHostOriginalData.value?.data.attributes.commercialName,
			},
		},
	};
	try {
		const events = await requestEventsList(filters);
		eventHostEventsList.value = events.data.data;
	} catch (error) {
		toast.error('No se pudieron obtener los eventos');
	}
};

const deleteFile = async (
	item: CpMediaCardProps['item'],
	mediaFieldPath: keyof PartnerRegistration['files']
) => {
	const eventFile =
		eventHostOriginalData.value?.data.attributes[mediaFieldPath].data;
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

const checkboxCollectCultureType = (value: number, index: number) => {
	if (value) {
		partnerForm.data.cultureType.push(value);
	} else {
		partnerForm.data.cultureType.splice(index, 1);
	}
};

const checkboxCollectAffiliations = (value: number, index: number) => {
	if (value) {
		partnerForm.data.affiliations.push(value);
	} else {
		partnerForm.data.affiliations.splice(index, 1);
	}
};
const getPartnerById = async () => {
	const currentUserEventHostId = userStore.user?.eventHostData?.id;
	try {
		if (
			!userStore.isAuth &&
			userStore.getUserRole !== UserRolesTypes.eventHost &&
			!currentUserEventHostId
		) {
			return;
		}
		const response = await requestEventsHost(currentUserEventHostId as number);
		eventHostOriginalData.value = response.data;

		// Мапим данные партнера в форму
		mapPartnerDataToForm(eventHostOriginalData.value);
	} catch (error) {
		toast.error('Error al cargar la información del organizador');
	}
};

const submitPartnerForm = async () => {
	const isValid = await partnerRegForm.value?.validate();
	if (!isValid || !isValid.valid) {
		toast.error('Algunos campos están completados incorrectamente');

		return;
	}

	isSpin.value = true;
	formSended.value = true;

	try {
		preparePartnerData();
		const partnerPayload = $objToFormData(toRaw(partnerForm));
		if (
			userStore.isAuth &&
			userStore.user &&
			userStore.user.eventHostData?.id &&
			userStore.getUserRole === UserRolesTypes.eventHost
		) {
			await editEventHost(userStore.user.eventHostData.id, partnerPayload);
		} else {
			throw new Error('No se pudo encontrar el usuario');
		}
		toast.success('Información actualizada exitosamente');
	} catch (error: any) {
		toast.error('No se pudo actualizar la información');
		formSended.value = false;
	} finally {
		isSpin.value = false;
	}
};

const preparePartnerData = () => {
	partnerForm.data.cultureType = selectedCultureTypes.value.map((item) =>
		Number(item)
	);
	partnerForm.data.affiliations = selectedAffiliations.value.map((item) =>
		Number(item)
	);

	prepareMainProductDescriptionFields();
	prepareCompVideoFields();

	if (partnerForm.data.socialMedias) {
		partnerForm.data.socialMedias = partnerForm.data.socialMedias
			.map((socialMedia: SocialMedia) => {
				return {
					socialMediaName: socialMedia.socialMediaName || '',
					socialMediaLink: socialMedia.socialMediaLink || '',
				};
			})
			.filter(
				(socialMedia) =>
					socialMedia.socialMediaLink &&
					socialMedia.socialMediaLink.trim() !== ''
			);
	}
};

const currentPartnerType = computed(() => {
	if (partnerForm.data.orgType) {
		return commonDataStore.orgTypes.find(
			(orgType) => orgType.id === partnerForm.data.orgType
		)?.attributes.orgTypeCode;
	}

	return '';
});

const prepareMainProductDescriptionFields = () => {
	switch (mainProdValue.value) {
		case 'File':
			{
				partnerForm.data.productDescriptionLink = '';
				partnerForm.data.productDescriptionText = '';
			}
			break;
		case 'Link':
			{
				partnerForm.files.productDescriptionFile = null;
				partnerForm.data.productDescriptionText = '';
			}
			break;
		case 'Text':
			{
				partnerForm.data.productDescriptionLink = '';
				partnerForm.files.productDescriptionFile = null;
			}
			break;
	}
};

const prepareCompVideoFields = () => {
	switch (compVideoValue.value) {
		case 'File':
			{
				partnerForm.data.compVideoLink = '';
			}
			break;
		case 'Link':
			{
				partnerForm.files.compVideoFile = null;
			}
			break;
	}
};

const selectedCultureTypes = computed(() => partnerForm.data.cultureType);

const selectedAffiliations = computed(() => partnerForm.data.affiliations);

const setCoordinates = (coordinatesFromMap: CoordinatesType) => {
	partnerForm.data.eventHostAddress.coordinates = `${coordinatesFromMap.coordinates[0]},${coordinatesFromMap.coordinates[1]}`;
};

const getCoordinates = computed(() => {
	return partnerForm.data.eventHostAddress.coordinates
		.split(',')
		.map((coordinate) => Number(coordinate));
});

// Функция маппинга данных партнера в форму
const mapPartnerDataToForm = (source: EventHost) => {
	const attributes = source.data.attributes || {};

	// Основные поля
	partnerForm.data.orgType = attributes.orgType.data.id || null;
	partnerForm.data.commercialName = attributes.commercialName || '';
	partnerForm.data.compName = attributes.compName || '';
	partnerForm.data.ruc = attributes.ruc || '';
	partnerForm.data.startDate = attributes.startDate || '';
	partnerForm.data.personCount = attributes.personCount || null;
	partnerForm.data.middleAge = attributes.middleAge || null;
	partnerForm.data.womenPercentage = attributes.womenPercentage || null;
	partnerForm.data.orgResume = attributes.orgResume || '';
	partnerForm.data.orgWorkType = attributes.orgWorkType || '';
	partnerForm.data.personalName = attributes.personalName || '';
	partnerForm.data.personalIdentifyingDocument =
		attributes.personalIdentifyingDocument || '';
	partnerForm.data.productDescriptionLink =
		attributes.productDescriptionLink || '';
	partnerForm.data.productDescriptionText =
		attributes.productDescriptionText || '';
	partnerForm.data.webpage = attributes.webpage || '';
	partnerForm.data.compVideoLink = attributes.compVideoLink || '';
	partnerForm.data.digitalCatalog = attributes.digitalCatalog || '';

	// Адрес
	partnerForm.data.eventHostAddress = {
		coordinates:
			attributes.eventHostAddress?.coordinates ||
			'-13.527141525687806, -71.96803909279043',
		city: attributes.eventHostAddress?.city?.data?.id || null,
		address: attributes.eventHostAddress?.address || '',
	};

	// Тип культуры
	partnerForm.data.cultureType =
		attributes.cultureType?.data?.map((item: any) => item.id) || [];

	// Аффилиации
	partnerForm.data.affiliations =
		attributes.affiliations?.data?.map((item: any) => item.id) || [];

	// Социальные сети
	if (attributes.socialMedias && attributes.socialMedias.length > 0) {
		partnerForm.data.socialMedias?.forEach((item: SocialMedia, index) => {
			if (attributes.socialMedias) {
				item.socialMediaLink =
					attributes.socialMedias[index]?.socialMediaLink ?? '';
			}
		});
	}

	// Контакты
	if (attributes.contacts) {
		partnerForm.data.contacts.place = attributes.contacts.place || '';
		partnerForm.data.contacts.tel = attributes.contacts.tel || '';
		partnerForm.data.contacts.mail = attributes.contacts.mail || '';
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

				&-authInfo {
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					align-items: flex-start !important;
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

				&-authInfo {
					width: 70%;
					margin-top: 15px;
					padding: 10px;

					@media (max-width: 720px) {
						width: 100%;
					}
				}

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
.partnerRegistration__map {
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
}
.full-width {
	&-map {
		@media screen and (max-width: 955px) {
			display: flex;
			justify-content: space-around;
			width: 100%;
		}
	}
}
</style>
