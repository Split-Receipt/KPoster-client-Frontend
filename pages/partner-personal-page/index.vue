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
					<span class="required-field">
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
					<span class="required-field">
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
					<span class="required-field">
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
					<span class="required-field">
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
					<span  class="required-field">
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
					<span class="required-field">
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
					<span class="required-field">
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
					<span class="required-field">
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
					<span class="required-field">
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
					<span class="required-field">
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
					<span class="required-field">
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
					<span class="required-field">
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
					<span class="required-field">
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
					<span class="required-field">
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
					<span class="required-field">
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
					<span class="required-field">
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
					<span class="required-field">
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
					<span class="required-field">
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
						text="Submit"
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
import EventHostPersonalPageContent from '@widgets/event-host-personal-form/EventHostPersonalPageContent.vue';
import ClientPersonalPageContent from '@widgets/client-personal-form/ClientPersonalPageContent.vue';
import { UserRolesTypes } from '@shared/api/types';
import { useUserStore } from '@stores/user-store';

const userStore = useUserStore();
</script>

<style scoped lang="scss"></style>
