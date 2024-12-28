<template>
	<div>
		<nuxt-link
			:to="socialMediaFormattedValues.socialMediaLink"
			class="animatedLink"
			target="_blank"
			external
		>
			<span class="animatedLink__logo">
				<nuxt-img
					v-if="socialMediaFormattedValues.socialMediaName"
					:class="['animatedLink__logo-img', `animatedLink__logo-${socialMediaFormattedValues.socialMediaName}`]"
					:src="
						'../public/images/' +
							socialMediaFormattedValues.socialMediaName +
							'.svg'
					"
				/>
			</span>
			<span
				:class="['animatedLink__bg-img', `animatedLink__bg-${socialMediaFormattedValues.socialMediaName}`]"
			/>
		</nuxt-link>
	</div>
</template>

<script setup lang="ts">
import type { SocialMedia } from '@shared/api/types';
import {
	formatExternalLink,
	formatNameToBeCode,
} from '@shared/helpers/formatText';
// expected social names: instagram \ facebook \ linkedin \ tiktok

const props = defineProps<SocialMedia>();

const socialMediaFormattedValues = computed(() => {
	if (!props.socialMediaName) {
		return {
			socialMediaName: '',
			socialMediaLink: '',
		};
	}

	return {
		socialMediaName: formatNameToBeCode(props.socialMediaName),
		socialMediaLink: formatExternalLink(props.socialMediaLink),
	};
});
</script>

<style scoped lang="scss">
.animatedLink {
	z-index: 1;
	padding: 0;
	width: 36px;
	height: 36px;
	display: flex;
	align-items: center;
	justify-content: center;
	border: none;
	background-color: transparent;
	position: relative;
	border-radius: 7px;
	cursor: pointer;
	transition: all 0.3s;

	&:hover .animatedLink__bg-img {
		transform: scale(1.05);
		transform-origin: bottom;
	}

	&__logo {
		z-index: 1;
		padding: 0;
		width: 35px;
		height: 35px;
		display: flex;
		align-items: center;
		justify-content: center;
		border: none;
		background-color: transparent;
		position: relative;
		border-radius: 7px;
		cursor: pointer;
		transition: all 0.3s;

		&-facebook {
			position: absolute;
			bottom: -1px;
			height: 30px;
		}

		&-instagram {
			height: 30px;
			width: 30px;
		}

		&-linkedin {
			height: 30px;
			width: 30px;
		}

		&-tiktok {
			height: 30px;
			width: 30px;
		}
		&-youtube {
			height: 100%;
			width: 100%;
		}
	}

	&__bg {
		&-instagram {
			position: absolute;
			content: '';
			width: 100%;
			height: 100%;
			background: #f09433;
			background: -moz-linear-gradient(
				45deg,
				#f09433 0%,
				#e6683c 25%,
				#dc2743 50%,
				#cc2366 75%,
				#bc1888 100%
			);
			background: -webkit-linear-gradient(
				45deg,
				#f09433 0%,
				#e6683c 25%,
				#dc2743 50%,
				#cc2366 75%,
				#bc1888 100%
			);
			background: linear-gradient(
				45deg,
				#f09433 0%,
				#e6683c 25%,
				#dc2743 50%,
				#cc2366 75%,
				#bc1888 100%
			);
			z-index: -1;
			border-radius: 9px;
			pointer-events: none;
			transition: all 0.3s;
		}

		&-facebook {
			position: absolute;
			content: '';
			width: 100%;
			height: 100%;
			background: #1877f2;
			z-index: -1;
			border-radius: 10px;
			pointer-events: none;
			transition: all 0.3s;
		}

		&-linkedin {
			position: absolute;
			content: '';
			width: 100%;
			height: 100%;
			background: #0288d1;
			z-index: -1;
			border-radius: 10px;
			pointer-events: none;
			transition: all 0.3s;
		}

		&-tiktok {
			position: absolute;
			content: '';
			width: 100%;
			height: 100%;
			background: #000000;
			z-index: -1;
			border-radius: 10px;
			pointer-events: none;
			transition: all 0.3s;
		}

		&-youtube {
			position: absolute;
			content: '';
			width: 100%;
			height: 100%;
			z-index: -1;
			background: red;
			border-radius: 10px;
			pointer-events: none;
			transition: all 0.3s;
		}
	}
}
</style>
