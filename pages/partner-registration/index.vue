<template>
	<div class="partner-registration-page">
		<h2>Sistema de gestión de contenidos del proveedor</h2>
		<h2>Aquí puede editar a información de la tarjeta de empresa</h2>
		<p>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
			tempor incididunt ut labore et dolore magna aliqua. A diam maecenas sed
			enim ut sem viverra aliquet eget. Amet venenatis urna cursus eget nunc
			scelerisque.
		</p>
		<h2>Cambiar la información</h2>

		<div>
			<h2>Suba su foto o el logotipo de su empresa</h2>
			<p>La imagen debe cargarse a 500 por 500 píxeles en formato .png</p>
			<cp-file-input />
		</div>
		<div>
			<h2>Subir el banner principal</h2>
			<p>El banner debe cargarse a 1100 por 278 píxeles en formato .png</p>
			<cp-file-input />
		</div>
		<div>
			<h2>
				Sube el vídeo de tu empresa o incrusta un enlace desde youtube o vimeo
			</h2>
			<p>
				Si subes tu propio vídeo, debe estar en formato .mp4 y no debe superar
				los 50 megabytes de tamaño
			</p>
			<cp-file-input />
			<cp-input
				placeholder="https://youtube.com"
				input-name="youtube"
				label="You Tube"
			/>
			<cp-input
				input-name="vimeo"
				label="Vimeo"
				placeholder="https://vimeo.com"
			/>
		</div>
		<div>
			<h2>Descargar el producto más popular</h2>
			<p>El banner debe cargarse a 1100 por 278 píxeles en formato .png</p>
			<cp-file-input />
		</div>
		<div>
			<h2>Redes sociales</h2>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
				tempor incididunt ut labore et dolore magna aliqua.
			</p>
			<cp-input
				placeholder="https://www.youtube.com"
				input-name="telegram"
				label="Telegram"
			/>
			<cp-input
				placeholder="https://www.youtube.com"
				input-name="twitter"
				label="Twitter"
			/>
			<cp-input
				placeholder="https://www.youtube.com"
				input-name="facebook"
				label="Facebook"
			/>
			<cp-input
				placeholder="https://www.youtube.com"
				input-name="youtube"
				label="Youtube"
			/>
		</div>
		<div>
			<h2>Sube tus principales productos y sus descripciones</h2>
			<p>El banner debe cargarse a 1100 por 278 píxeles en formato .png</p>
			<cp-file-input />
		</div>
		<div>
			<h2>Primera categoría de bienes</h2>
			<cp-input placeholder="introduzca el texto" />
			<cp-input
				placeholder="introduzca el enlace"
				input-name="Mercancía-1"
				label="Mercancía 1"
			/>
			<cp-input
				placeholder="introduzca el enlace"
				input-name="Mercancía-2"
				label="Mercancía 2"
			/>
			<cp-input
				placeholder="introduzca el enlace"
				input-name="Mercancía-3"
				label="Mercancía 3"
			/>
			<cp-input
				placeholder="introduzca el enlace"
				input-name="Mercancía-4"
				label="Mercancía 4"
			/>
			<cp-button shape="oval" color="transparent" text="Más información" />
		</div>
		<div>
			<h2>Segunda categoría de bienes</h2>
			<cp-input placeholder="introduzca el texto" />
			<cp-input
				placeholder="introduzca el enlace"
				input-name="Mercancía-1"
				label="Mercancía 1"
			/>
			<cp-input
				placeholder="introduzca el enlace"
				input-name="Mercancía-2"
				label="Mercancía 2"
			/>
			<cp-input
				placeholder="introduzca el enlace"
				input-name="Mercancía-3"
				label="Mercancía 3"
			/>
			<cp-input
				placeholder="introduzca el enlace"
				input-name="Mercancía-4"
				label="Mercancía 4"
			/>
			<cp-button shape="oval" color="transparent" text="Más información" />
			<cp-button shape="oval" color="yellowGrey" text="Añadir más categorías" />
		</div>
		<div>
			<h2>Añadir fotos a la galería</h2>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
				tempor incididunt ut labore et dolore magna aliqua.
			</p>
			<cp-file-input />
		</div>
		<section-with-inputs
			v-for="section in sectionsWithInputs"
			:key="section.blockCode"
			:config="section"
		/>

		<cp-footer />
	</div>
</template>

<script lang="ts" setup>
import CpFileInput from '@shared/gui/CpFileInput/CpFileInput.vue';
import CpInput from '@shared/gui/CpInput/CpInput.vue';
import { CpFooter } from '@widgets/page-footer';
import CpButton from '@shared/gui/CpButton.vue';
import SectionWithInputs from '@widgets/partner-registration-sections/SectionWithInput.vue';

const sectionsWithInputs = [
	{
		blockCode: 'AñadirDatos',
		title: 'Añadir datos de contacto de la empresa',
		description:
			'	Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod	tempor incididunt ut labore et dolore magna aliqua.',
		inputs: [
			{
				placeholder: 'introduzca el texto',
			},
			{
				placeholder: 'introduzca el enlace',
				inputName: 'País-y-ciudad',
				label: 'País y ciudad',
			},
			{
				placeholder: 'introduzca el enlace',
				inputName: 'Dirección de correo electrónico',
				label: 'Dirección de correo electrónico',
			},
		],
		buttons: [
			{
				buttonText: 'Más información',
				color: 'transparent',
			},
			{
				buttonText: 'Añadir más categorías',
				color: 'yellowGrey',
			},
		],
	},
];
</script>

<style scoped lang="scss">
.partner-registration-page {
	background-color: $main-page-background-color;
}
</style>
