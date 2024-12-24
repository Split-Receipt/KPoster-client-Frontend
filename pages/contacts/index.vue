<template>
	<cp-base-page :header="$t('Contactos del organizador')" class="contacts">
		<template #content>
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
import ContactBlock from './ContactBlock.vue';
import { useCommonDataStore } from '@stores/common-data-store';
const commonDataStore = useCommonDataStore();

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
