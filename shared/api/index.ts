import { useNuxtApp } from 'nuxt/app';
import type { PartnerRegistration } from '@shared/api/types.ts';
import type { EventCreateType } from '@shared/api/types';

export const registerPartner = (partnerInfo: PartnerRegistration) => {
	const { $api } = useNuxtApp();

	return $api.post('/api/partners', partnerInfo, {
		headers: { 'Content-Type': 'multipart/form-data' },
	});
};

export const eventCreate = (eventInfo: EventCreateType) => {
	const { $api } = useNuxtApp();

	return $api.post('/api/events', eventInfo, {
		headers: { 'Content-Type': 'multipart/form-data' },
	});
};

export const requestCities = () => {
	const { $api } = useNuxtApp();

	return $api.get('api/city-filters');
};

export const requestCategories = () => {
	const { $api } = useNuxtApp();

	return $api.get('api/categories');
};
