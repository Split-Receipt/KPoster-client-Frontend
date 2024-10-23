import { useNuxtApp } from 'nuxt/app';
import type { PartnerRegistration } from '@shared/api/types.ts';

export const registerPartner = (partnerInfo: PartnerRegistration) => {
	const { $api } = useNuxtApp();

	return $api.post('/api/partners', partnerInfo, {
		headers: { 'Content-Type': 'multipart/form-data' },
	});
};

export const requestCities = () => {
	const { $api } = useNuxtApp();

	return $api.get('api/cities');
};

export const requestCategories = () => {
	const { $api } = useNuxtApp();

	return $api.get('api/areas-de-la-culturas');
};

export const requestEventsColletions = () => {
	const { $api } = useNuxtApp();

	return $api.get('api/events-collections?populate[events][populate]=eventGallery');
};

export const requestEventsColletionByCode = (collectionCode: string) => {
	const { $api } = useNuxtApp();

	return $api.get(`api/events-collections/${collectionCode}`);
};
