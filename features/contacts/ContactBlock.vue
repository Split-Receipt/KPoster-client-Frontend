<template>
	<div class="contact">
		<div class="contact__block contact__block--first">
			<h5 class="contact__title">{{ props.contact?.name }}</h5>
			<slot name="description"/>
		</div>
		<div class="contact__block">
			<div class="contact__line">
				<div class="contact__text">{{ $t('E-mail') }}</div>
				<div class="contact__text contact__text--value">{{ props.contact?.email }}</div>
			</div>
			<div class="contact__line">
				<div class="contact__text">{{ $t('Número de teléfono') }}</div>
				<div class="contact__text contact__text--value">{{ props.contact?.phone }}</div>
			</div>
			<div class="contact__line">
				<div class="contact__text">{{ $t('País y ciudad') }}</div>
				<div class="contact__text contact__text--value">{{ props.contact?.city }}</div>
			</div>
			<div class="contact__socials">
				<cp-social-link
					v-for="media in formattedMedia"
					:key="media.link"
					:social-media-link="media.link"
					:social-media-name="media.name"
				/>
			</div> 
		</div>
	</div>
</template>

<script setup lang="ts">
type Props = {
	contact: {
        name?: string;
        email?: string;
        phone?: string;
        city?: string;
        job?: string;
        social_media?: {
            instagram?: string;
            facebook?: string;
            tiktok?: string;
            linkedin?: string;
        };
    }
};

const props = defineProps<Props>();

const formattedMedia = computed(() =>
  Object.entries(props.contact?.social_media ?? {}).map(([name, link]) => ({ name, link }))
);
</script>

<style scoped lang="scss">
.contact {
    display: grid;

    &__block {
        &--first {
            margin-bottom: 20px;
        }
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