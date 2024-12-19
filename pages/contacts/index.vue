<template>
	<cp-base-page :header="$t('Contactos del organizador')" class="contacts">
		<template #content>
			<contact-block
				v-for="contact in contactList"
				:key="contact.email"
				:contact="contact"
				class="contacts__block"
			/>
		</template>
	</cp-base-page>
</template>

<script setup lang="ts">
import CpBasePage from '@shared/gui/CpBasePage.vue';
import ContactBlock from '@features/contacts/ContactBlock.vue';

const contactMock = {
	name: 'John Doe',
	job: 'organizador',
	email: 'organizador@cusco.com',	
	phone: '+ 111 81959 193491',
	city: 'Cusco, peru',
	social_media: {
		instagram: 'http://localhost:3000/esevent-host',
		linkedin: 'http://localhost:3000/esevent-host',
		tiktok: 'http://localhost:3000/esevent-host',
		facebook: 'http://localhost:3000/esevent-host',
	},
};

const contactList = computed(() => Array(3).fill(contactMock));
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
