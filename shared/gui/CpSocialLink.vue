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
					:class="
						'animatedLink__logo-' + socialMediaFormattedValues.socialMediaName
					"
					:src="
						'../public/images/' +
							socialMediaFormattedValues.socialMediaName +
							'.svg'
					"
				/>
			</span>
			<span
				:class="
					'animatedLink__bg-' + socialMediaFormattedValues.socialMediaName
				"
			/>
		</nuxt-link>
	</div>
</template>

<script setup lang="ts">
import type { SocialMedia } from '@shared/api/types';
import { formatExternalLink, formatNameToBeCode } from '@shared/helpers/formatText';
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

	&:hover .animatedLink__bg-instagram {
		transform: rotate(35deg);
		transform-origin: bottom;
	}

	&:hover .animatedLink__bg-facebook {
		transform: rotate(35deg);
		transform-origin: bottom;
	}

	&:hover .animatedLink__bg-linkedin {
		transform: rotate(35deg);
		transform-origin: bottom;
	}

	&:hover .animatedLink__bg-tiktok {
		transform: rotate(35deg);
		transform-origin: bottom;
	}

	&:hover .animatedLink__bg-youtube {
		transform: rotate(35deg);
		transform-origin: bottom;
	}

	&:hover .animatedLink__logo {
		background-color: rgba(156, 156, 156, 0.466);
		backdrop-filter: blur(4px);
	}

	&__logo {
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

		&-instagram {
			height: 35px;
			width: 35px;
		}

		&-facebook {
			position: absolute;
			bottom: 0;
			height: 36px;
		}

		&-linkedin {
			height: 35px;
			width: 35px;
		}

		&-tiktok {
			height: 25px;
			width: 25px;
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
			border-radius: 10px;
			pointer-events: none;
			transition: all 0.3s;
		}
	}
}
</style>
