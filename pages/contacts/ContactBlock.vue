<template>
	<div class="contact">
		<div class="contact__block">
			<h5 class="contact__title">{{ props.contact.contactName }}</h5>
		</div>
		<div class="contact__block contact__block--second">
			<div class="contact__line">
				<div class="contact__text">{{ $t('E-mail') }}</div>
				<div class="contact__text contact__text--value">
					{{ props.contact.contacts.mail }}
				</div>
			</div>
			<div class="contact__line">
				<div class="contact__text">{{ $t('Número de teléfono') }}</div>
				<div class="contact__text contact__text--value">
					{{ props.contact.contacts.tel }}
				</div>
			</div>
			<div class="contact__line">
				<div class="contact__text">{{ $t('País y ciudad') }}</div>
				<div class="contact__text contact__text--value">
					{{ props.contact.contacts.place }}
				</div>
			</div>
			<div class="contact__socials">
				<cp-social-link
					v-for="media in props.contact.contactSocialMedias"
					:key="media.socialMediaLink"
					:social-media-link="media.socialMediaLink"
					:social-media-name="media.socialMediaName"
				/>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { CulturalPortalContacts } from '@shared/api/types';
type Props = {
	contact: CulturalPortalContacts;
};

const props = defineProps<Props>();
</script>

<style scoped lang="scss">
.contact {
	display: grid;

	&__title {
		margin-bottom: 20px;
	}

	&__text {
		color: $gray;
		text-transform: uppercase;
	}

	&__line {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 5px;
	}

	&__text {
		margin-bottom: 10px;
		&--value {
			text-align: right;
		}
	}

	&__socials {
		display: flex;
		gap: 10px;
		padding-top: 10px;
	}

	@media #{$screen-tablet} {
		grid-template-columns: 1fr 1fr;
		&__socials {
			gap: 20px;
		}
	}
}
</style>
