<template>
	<div class="dashboard">
		<cp-spinner :is-spinned="isSpin" />
		<h2 class="dashboard-mainTitle">Culture events of Peru</h2>
		<v-form ref="dashboard_form" class="dashboard-form">
			<div class="dashboard-form-row">
				<div class="dashboard-form-row-info">
					<span>
						<strong class="dashboard-form-row-info-required">*</strong>
						Introduce información clave sobre ti
						<cp-info-pop-up id="org_resume" info="250-500 palabras" />
					</span>
				</div>

				<div class="dashboard-form-row-input">
					<v-field
						v-slot="{ errors }"
						:model-value="testTextArea"
						name="orgResume"
						rules="required"
					>
						<cp-text-area
							v-model="testTextArea"
							text-area-id="orgResume"
							text-area-placeholder="Introduce información clave sobre ti"
						/>
						<span v-if="errors" class="required-input-error-info-center">{{
							errors[0]
						}}</span>
					</v-field>
				</div>  
			</div>

			<div class="dashboard-form-row">
				<div class="dashboard-form-row-info">
					<span>
						<strong class="dashboard-form-row-info-required">*</strong>
						Sube contenido de foto, vídeo o audio
					</span>
				</div>
				<div class="dashboard-form-row-input">
					<v-field
						v-slot="{ errors }"
						:model-value="testFileRef"
						name="personalDocumentScan"
						rules="required_file"
					>
						<cp-drag-n-drop
							v-model="testFileRef"
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
		</v-form>
		<cp-button
			class="partners__form__button"
			width="extraLarge"
			size="small"
			shape="oval"
			color="yellowGrey"
			text="submit"
			@click="sendPartnerDashboardForm"
		/>
	</div>
</template>

<script setup lang="ts">
    import { toast } from 'vue3-toastify';
    import CpButton from '@shared/gui/CpButton.vue';
    import CpDragNDrop from '@shared/gui/CpDragNDrop.vue';
    import CpTextArea from '@shared/gui/CpTextArea.vue';
    import CpInfoPopUp from '@shared/gui/CpInfoPopUp.vue';
    import { Form as VForm, Field as VField } from 'vee-validate';

    const dashboard_form = ref<HTMLFormElement | null>(null);

    const testTextArea = ref<string>('');
    const testFileRef = ref<File | null>(null);
    const isSpin = ref<boolean>(false);

    const sendPartnerDashboardForm = async () => {
        const isValid = await dashboard_form.value?.validate();
	    isSpin.value = true;

	if (!isValid.valid) {
		isSpin.value = false;
		toast.error('form is invalid');

		return;
	}

    try {
		isSpin.value = false;
		toast.success('Nuestro administrador se comunicará conusted por correo electrónico');
	} catch (error) {
		toast.error('error');
		isSpin.value = false;
	} finally {
		isSpin.value = false;
	}
};
</script>

<style scoped lang="scss">
    .dashboard {
        width: 100%;
        padding: 0 20px 0 20px;

        &-mainTitle {
            font-size: 82px;
            width: 100%;
            text-align: center;
            font-family: 'Poppins-Medium';
            font-weight: 500;
            line-height: 123px;
        }

        &-form {

            &-row {
                display: flex;
                align-items: center;
                margin: 70px 0 70px 0;
                height: 250px;

                @media (max-width: 955px) {
                    flex-direction: column;
                    align-items: flex-start;
                }

                &-info {
                    display: flex;
                    width: 55%;
                    height: 100%;
                    padding-right: 55px;
                    font-size: 24px;
                    font-weight: 500;
                    line-height: 33.6px;
                    color: #353333;

                    @media (max-width: 955px) {
                        width: 100%;
                        margin-top: 50px;
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
                        margin-top: 10px;
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
        }

    }

    .required-input {
        &-error {
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