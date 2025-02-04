<template>
	<div class="footer">
		<teleport to="body">
			<cp-basic-modal
				:show="show"
				:cancel-button="false"
				@accept="handleAccept"
				@close="show = false"
			>
				<template #content>
					<h5>{{ $t('event_host_registration_redirect') }}</h5>
					<span>{{ $t('event_host_registration_redirect_content') }}</span>
				</template>
			</cp-basic-modal>
		</teleport>
		<div class="footer__list-wrapper">
			<footer-list
				v-for="(list, index) in footerListData"
				:key="index"
				class="footer__list"
				:list="list"
			/>
		</div>
		<div class="footer__content">
			<cp-button
				v-if="showBecomePartnerButton"
				class="footer__button"
				:text="$t('partners_button_become_partner')"
				size="large"
				@click="show = true"
			/>
			<div class="footer__logos">
				<nuxt-img src="/images/logo-hatun.png" class="footer__icon-logo" />
				<nuxt-img src="/images/logo-cusco.png" class="footer__icon-logo" />
				<nuxt-img src="/images/culturaviva.png" class="footer__icon-logo" />
				<nuxt-img src="/images/casadecultura.png" class="footer__icon-logo" />
			</div>
			<div class="footer__credit">
				<nuxt-link to="https://uya.digital/" target="_blank" external>
					made by UYA Digital</nuxt-link
				>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import FooterList from './FooterList.vue';
import CpButton from '@shared/gui/CpButton.vue';
import { footerLists, type FooterListItem } from '../model';
import { useUserStore } from '@stores/user-store';
import { useCommonDataStore } from '@stores/common-data-store';
import {
	UserRolesTypes,
	type BaseStrapiResponse,
	type AboutPlatform,
} from '@shared/api/types';
import { formatExternalLink } from '@shared/helpers/formatText';
const { locale } = useI18n();
const userStore = useUserStore();
const commonDataStore = useCommonDataStore();
const footerListData = reactive({ ...footerLists });
const show = ref<boolean>(false);

watch(
	() => commonDataStore.platformData,
	() => {
		if (commonDataStore.platformData) {
			const formattedContacts = formatPlatformContactsContacts(
				commonDataStore.platformData.attributes.platformContacts
			);

			footerListData.contactsList.listItems = formattedContacts;
			if (commonDataStore.platformData.attributes.platformSocialMedias) {
				const formattedSocialMedias = formatPlatformSocialMedias(
					commonDataStore.platformData.attributes.platformSocialMedias
				);

				footerListData.socialList.listItems = formattedSocialMedias;
			}
		}
	}
);

const handleAccept = () => {
	show.value = false;
	navigateTo(`/${locale.value}/partners-registration`);
};

const formatPlatformContactsContacts = (
	platformContacts: BaseStrapiResponse<AboutPlatform>['attributes']['platformContacts']
) => {
	return Object.keys(platformContacts).reduce(
		(acc: FooterListItem[], key, index: number) => {
			if (key !== 'id') {
				acc.push({
					id: index,
					text: platformContacts[
						key as keyof typeof platformContacts
					] as string,
				});
			}

			return acc;
		},
		[]
	);
};

const formatPlatformSocialMedias = (
	platformSocialMedias: BaseStrapiResponse<AboutPlatform>['attributes']['platformSocialMedias']
) => {
	return platformSocialMedias.reduce((acc: FooterListItem[], item) => {
		acc.push({
			id: item.id,
			text: item.socialMediaName,
			href: formatExternalLink(item.socialMediaLink),
			linkType: 'external',
		});

		return acc;
	}, []);
};
const showBecomePartnerButton = computed(() => {
	return (
		userStore.getUserRole === UserRolesTypes.client ||
		userStore.getUserRole === UserRolesTypes.authenticated
	);
});
</script>

<style scoped lang="scss">
.footer {
	display: flex;
	background: $footer-default-background-color;
	flex-direction: column;
	row-gap: $footer-default-row-gap;
	padding: $footer-default-padding;
	position: relative;

	@media #{$screen-tablet} {
		flex-wrap: wrap;
		column-gap: $footer-media-tablet-column-gap;
		row-gap: $footer-media-tablet-row-gap;
		padding: $footer-media-tablet-padding;
	}

	@media #{$screen-desktop} {
		column-gap: $footer-media-desktop-column-gap;
		padding: $footer-media-desktop-padding;
		justify-content: space-around;
	}

	&__content {
		display: flex;
		width: 100%;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 50px;
	}

	&__logos {
		display: flex;
		gap: 10px;
	}

	&__icon-logo {
		width: auto;
		height: 35px;
		opacity: 0.5;
		@media #{$screen-desktop} {
			height: 50px;
		}
	}

	&__list-wrapper {
		display: flex;
		flex-wrap: wrap;
		gap: 25px;

		@media #{$screen-tablet} {
			gap: 70px;
		}
	}

	&__button {
		width: 300px;
		justify-self: center;
		align-self: center;

		@media #{$screen-desktop} {
			width: 400px;
		}
	}

	&__credit {
		color: $footer-list-item-color;
	}
}
</style>
