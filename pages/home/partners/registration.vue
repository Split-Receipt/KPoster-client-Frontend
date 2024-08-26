<template>
	<div class="partners__main">
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
		<div class="partners__form">
			<h3>{{ $t('partners_formTitle') }}</h3>
			<div class="partners__form-row">
				<div class="partners__form-row-info">Tipo de organizaón</div>
				<div class="partners__form-row-input">
					<cp-radio-button v-model="testRadioValue1" :options="radiooptions1" />
				</div>
			</div>

			<div class="partners__form-row">
				<div class="partners__form-row-info">Nombre comercial</div>
				<div class="partners__form-row-input">
					<input id="" type="text" name="" />
				</div>
			</div>

			<div class="partners__form-row">
				<div class="partners__form-row-info">Razón social</div>
				<div class="partners__form-row-input">
					<input id="" type="text" name="" />
				</div>
			</div>

			<div class="partners__form-row">
				<div class="partners__form-row-info">RUC</div>
				<div class="partners__form-row-input">
					<input id="" type="text" name="" />
				</div>
			</div>

			<div class="partners__form-row">
				<div class="partners__form-row-info">Tipo de organizaón</div>
				<div class="partners__form-row-input">
					<cp-radio-button v-model="testRadioValue2" :options="radiooptions2" />
				</div>
			</div>

			<div class="partners__form-row">
				<div class="partners__form-row-info">
					Sube el video que explica su servicio y producto o incrusta el enlace
					desde Yuotube o Vimeo
				</div>
				<div class="partners__form-row-input">
					<cp-drag-n-drop type="video" :max-size="50" />
				</div>
			</div>

			<div class="partners__form-row">
				<div class="partners__form-row-info">Subir el banner principal</div>
				<div class="partners__form-row-input">
					<cp-drag-n-drop type="image" :max-size="5" />
				</div>
			</div>

			<div class="partners__form-row">
				<div class="partners__form-row-info">
					Sube el vídeo de tu empresa o incrusta un enlace desde youtube o vimeo
				</div>
				<div class="partners__form-row-input">
					<cp-drag-n-drop type="video" :max-size="50" />
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
const radiooptions1 = [
	{ id: 'emp', value: 'Empresa', label: 'Empresa' },
	{ id: 'ong', value: 'ONG', label: 'ONG' },
];
const testRadioValue1 = ref<any | null>(null);

// watch(testRadioValue1, (newVal) => {
// 	console.log(newVal);
// });

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

const testRadioValue2 = ref<any | null>(null);

// watch(testRadioValue2, (newVal) => {
// 	console.log(newVal);
// });
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
			margin: 60px 0 60px 0;

			&-info {
				width: 40%;
				font-size: 24px;
				font-weight: 500;
				line-height: 33.6px;
				color: #353333;
			}

			&-input {
				width: 60%;
				input {
					width: 100%;
				}
				div {
					display: flex;
					flex-wrap: wrap;
					align-items: center;
					justify-content: flex-start;
					width: 100%;
					margin-left: -15px;
				}
			}
		}
	}
}
</style>
