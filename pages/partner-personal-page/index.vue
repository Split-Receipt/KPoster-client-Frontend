<template>
	<div class="personal">
		<cp-spinner :is-spinned="isSpin" />
		<h2>Culture events of Peru</h2>
		<v-form ref="personalPartnerForm" class="personal___form">
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
					<v-field
						v-slot="{ errors }"
						:model-value="partnerPersonalForm.image"
						name="testDnD"
						rules="required_file"
					>
						<cp-drag-n-drop
							v-model="partnerPersonalForm.image"
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
					<cp-text-area text-area-id="qwe" text-area-placeholder="Resume lo que hace tu organizacion"/>
				</div>
			</div>
			<cp-button
				ref="submitBtn"
				class="personal__form__button"
				width="maxWidth"
				size="small"
				shape="oval"
				color="yellowGrey"
				text="submit"
				:disabled="formSending"
				@click="sendPartnerRegistrationForm"
			/>
		</v-form>
	</div>
</template>

<script setup lang="ts">
import { toast } from 'vue3-toastify';
import CpButton from '@shared/gui/CpButton.vue';
import CpDragNDrop from '@shared/gui/CpDragNDrop.vue';
import { Form as VForm, Field as VField } from 'vee-validate';

// test variables -------------------------------

// const cultureTypeVars = [
//     { id: '1', value: '1', label: 'Consciencia ambiental' },
//     { id: '2', value: '2', label: 'Gestion cultural' },
//     { id: '3', value: '3', label: 'Artes escénicas y danzas' },
//     { id: '4', value: '4', label: 'Fotografia , audiovisual, cinematografico y nuevos medios' },
//     { id: '5', value: '5', label: 'Lenguas indigenas u originarias y tradición oral' },
//     { id: '6', value: '6', label: 'Artesania' },
//     { id: '7', value: '7', label: 'Artes visuales' },
//     { id: '8', value: '8', label: 'Galeria y espacios de arte' },
//     { id: '9', value: '9', label: 'Libro y lectura' },
//     { id: '10', value: '10', label: 'Gastronomia tipica' },
//     { id: '11', value: '11', label: 'Creador de contenido en plataformas digitales' },
// ];

type testFormDataType = {
    image: File | null;
    cultureType: number[]
};

// ----------------------------------------------

const isSpin = ref<boolean>(false);
const formSending = ref<boolean>(false);
const personalPartnerForm = ref<HTMLFormElement | null>(null);

const partnerPersonalForm = reactive<testFormDataType>({
    image: null,
    cultureType: [],
});

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

                &-horizontal {
                    width: 55%;
                    display: flex;

                    div {
                        margin-right: 21px;
                        width: 45%;
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