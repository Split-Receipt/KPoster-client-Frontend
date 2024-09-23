<template>
	<div>
		<a :href="socialLink" target="_blank" class="animatedLink">
			<span class="animatedLink__logo">
				<nuxt-img
					v-if="socialName === 'instagram'"
					class="animatedLink__logo-instagram"
					src="../public/images/instagram.svg"
				/>
				<nuxt-img
					v-if="socialName === 'facebook'"
					class="animatedLink__logo-facebook"
					src="../public/images/facebook.svg"
				/>
				<nuxt-img
					v-if="socialName === 'linkedin'"
					class="animatedLink__logo-linkedin"
					src="../public/images/linkedin.svg"
				/>
				<nuxt-img
					v-if="socialName === 'tiktok'"
					class="animatedLink__logo-tiktok"
					src="../public/images/tiktok.svg"
				/>
			</span>
			<span
				:class="{
					'animatedLink__bg-instagram': socialName === 'instagram',
					'animatedLink__bg-facebook': socialName === 'facebook',
					'animatedLink__bg-linkedin': socialName === 'linkedin',
					'animatedLink__bg-tiktok': socialName === 'tiktok',
				}"
			/>
		</a>
	</div>
</template>

<script setup lang="ts">
// expected social names: instagram \ facebook \ linkedin \ tiktok

type SocialLinkProps = {
	socialName: string;
	socialLink: string;
};

defineProps<SocialLinkProps>();
</script>

<style scoped lang="scss">
.animatedLink {
	z-index: 1;
	padding: 0;
	width: 45px;
	height: 45px;
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

	&:hover .animatedLink__logo {
		background-color: rgba(156, 156, 156, 0.466);
		backdrop-filter: blur(4px);
	}

	&__logo {
		z-index: 1;
		padding: 0;
		width: 45px;
		height: 45px;
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
	}
}
</style>
