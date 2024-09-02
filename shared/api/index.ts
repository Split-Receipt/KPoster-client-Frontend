import { useNuxtApp } from 'nuxt/app';
import type { PartnerRegistration } from '@shared/api/types.ts';

const { $api } = useNuxtApp();
export const registerPartner = (partnerInfo: PartnerRegistration) => {
	return $api.post('/api/partners', partnerInfo);
};
