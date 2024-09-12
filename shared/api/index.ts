import { useNuxtApp } from 'nuxt/app';
import type { PartnerRegistration, RequestOption } from '@shared/api/types.ts';

export const registerPartner = (partnerInfo: PartnerRegistration) => {
	const { $api } = useNuxtApp();

	return $api.post('/api/partners', partnerInfo, {
		headers: { 'Content-Type': 'multipart/form-data' },
	});
};

export const requestForAnOptions = async (url: string, dataTo: Ref) => {
	const { $api } = useNuxtApp();

	const response = await $api.get(url);
	const result = response.data;

	if (Array.isArray(result.data)) {
		result.data.forEach((e: RequestOption) => {
			dataTo.value.push(e.attributes);
		});
	}
};
