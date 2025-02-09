<template>
	<cp-base-page :header="pageHeader" class="contacts">
		<template v-if="contactList.length" #content>
			<contact-block
				v-for="contact in contactList"
				:key="contact.id"
				:contact="contact"
				class="contacts__block"
			/>
		</template>
	</cp-base-page>
</template>

<script setup lang="ts">
import CpBasePage from '@shared/gui/CpBasePage.vue';
import ContactBlock from '@features/contacts/ContactBlock.vue';
import { useCommonDataStore } from '@stores/common-data-store';
const commonDataStore = useCommonDataStore();
const { t } = useI18n();

const pageHeader = computed(() => {
	if (contactList.value.length) {
		return t('organisator_contact');
	} else {
		return t('no_contacts');
	}
});

const contactList = computed(() => {
	if (commonDataStore.platformData) {
		return commonDataStore.platformData.attributes.culturalPortalContacts;
	}

	return [];
});
</script>

<style scoped lang="scss">
.contacts {
	&__block {
		margin-bottom: 50px;
		@media #{$screen-tablet} {
			margin-bottom: 70px;
		}

		&:last-of-type {
			margin-bottom: 0;
		}
	}
}
</style>
