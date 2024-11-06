import { useNuxtApp } from 'nuxt/app';
import type { EventCreateType, userAuthentificatedData, CollectionFilters, PartnerRegistration, RegisterParams, LoginParams } from '@shared/api/types.ts';
import type { AxiosResponse } from 'axios';

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

	return $api.get('api/cities');
};

export const requestCategories = () => {
	const { $api } = useNuxtApp();

	return $api.get('api/areas-de-la-culturas');
};

export const requestEventsHost = () => {
	const { $api } = useNuxtApp();

	return $api.get('/api/partners');
};

export const requestEventCategories = () => {
	const { $api } = useNuxtApp();

	return $api.get('/api/event-categories');
};

export const requestEventsColletions = (filters: CollectionFilters) => {
	const { $api } = useNuxtApp();
	const params = {
		populate: {
			events: {
				populate: {
					eventAddress: {
						populate: {
							city: true,
						},
					},
					eventBanner: {
						populate: '*',
					},
					eventSocialMedias: {
						populate: '*',
					},
					eventMediaPhotos: {
						populate: '*',
					},
				},
			},
		},
		filters: filters,
	};

	return $api.get('api/events-collections', { params });
};

export const requestEventsColletionByCode = (collectionCode: string) => {
	const { $api } = useNuxtApp();

	return $api.get(`api/events-collections/${collectionCode}`);
};

export const requestEventById = (id: string) => {
	const { $api } = useNuxtApp();
	const params = {
		populate: {

		eventHost: {
			populate: {
				contacts: true,
			},
		},
		eventBanner: {
			populate: '*',
		},

		eventMediaPhotos: {
			populate: '*',
		},

		socialMedias: {
			populate: '*',
		},

		eventMediaVideos: {
			populate: '*',
		},

		eventAddress: {
			populate: {
				city: true,
			},
		},
		},
	};

	return $api.get(`api/events/${id}`, { params });
};

export const registerUser = (params: RegisterParams): Promise<userAuthentificatedData> => {
	const { $api } = useNuxtApp();

	return $api.post('/api/auth/local/register', params);
};

export const loginUser = (params: LoginParams) => {
	const { $api } = useNuxtApp();

	return $api.post('/api/auth/local', params);
};

