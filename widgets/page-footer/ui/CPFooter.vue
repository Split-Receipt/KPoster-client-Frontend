<template>
	<div class="footer">
		<div class="footer__list-wrapper">
			<footer-list
				v-for="(list, index) in footerListData"
				:key="index"
				class="footer__list"
				:list="list"
			/>
		</div>
		<cp-button
			v-if="showBecomePartnerButton"
			class="footer__button"
			:text="$t('partners_button_become_partner')"
			size="large"
			:islink="true"
			:link-to="`/${locale}/partners-registration`"
		/>
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

const footerListData = computed(() => {
	if (commonDataStore.platformData) {
		const formattedContacts = formatPlatformContactsContacts(
			commonDataStore.platformData.attributes.platformContacts
		);

		footerLists.contactsList.listItems = formattedContacts;
		if (commonDataStore.platformData.attributes.platformSocialMedias) {
			const formattedSocialMedias = formatPlatformSocialMedias(
				commonDataStore.platformData.attributes.platformSocialMedias
			);

			footerLists.socialList.listItems = formattedSocialMedias;
		}
	}

	return footerLists;
});

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
	return userStore.getUserRole !== UserRolesTypes.eventHost;
});
</script>

<style scoped lang="scss">
.footer {
	display: flex;
	background: $footer-default-background-color;
	flex-direction: column;
	row-gap: $footer-default-row-gap;
	padding: $footer-default-padding;

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

	&__list-wrapper {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
	}

	&__list {
		@media #{$screen-tablet} {
			height: $footer-media-tablet-height;
			width: $footer-media-tablet-width;
		}

		@media #{$screen-desktop} {
			min-height: $footer-media-desktop-min-height;
			width: $footer-media-desktop-width;
		}

		@media #{$screen-big-desktop} {
			width: $footer-big-desktop-width;
			&:nth-child(3) {
				width: $footer-big-desktop-width-child;
			}
		}
	}

	&__button {
		width: 300px;
		align-self: center;

		@media #{$screen-desktop} {
			width: 400px;
		}
	}
}
</style>
