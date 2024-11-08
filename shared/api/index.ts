import { useNuxtApp } from 'nuxt/app';
import type { EventCreateType, userAuthentificatedData, CollectionFilters, PartnerRegistration, RegisterParams, LoginParams, EventData, EventCategory, City } from '@shared/api/types.ts';
import type { AxiosResponse } from 'axios';

export const registerPartner = (partnerInfo: PartnerRegistration) => {
	const { $api } = useNuxtApp();

	return $api.post('/api/partners', partnerInfo, {
		headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${localStorage.getItem('AuthToken')}` } },
	);
};

export const eventCreate = (eventInfo: EventCreateType) => {
	const { $api } = useNuxtApp();

	return $api.post('/api/events', eventInfo, {
		headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${localStorage.getItem('AuthToken')}` },
	});
};

export const requestCities = (): Promise<AxiosResponse<{ data: City[] }>> => {
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

export const requestEventCategories = (): Promise<AxiosResponse<{ data: EventCategory[] }>> => {
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

export const registerUser = (params: RegisterParams): Promise<AxiosResponse<userAuthentificatedData>> => {
	const { $api } = useNuxtApp();

	return $api.post('/api/auth/local/register', params);
};

export const loginUser = (params: LoginParams) => {
	const { $api } = useNuxtApp();

	return $api.post('/api/auth/local', params);
};

export const requestAffiliations = () => {
	const { $api } = useNuxtApp();

	return $api.get('/api/affiliations');
};

export const requestMyUser = () => {
	const { $api } = useNuxtApp();

	const params = {
		populate: {
			role: { populate: { name: true } },
			eventHostData: {
				populate: '*',
			},
		 },
	};

	return $api.get('/api/users/me', { params, headers: { Authorization: `Bearer ${localStorage.getItem('AuthToken')}` } });
};

export const requestEventsList = (filters: CollectionFilters['events']): Promise<AxiosResponse<{ data: EventData[] }>> => {
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
		},
		filters: filters,
	};

	return $api.get('/api/events', { params });
};

