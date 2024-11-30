import { useNuxtApp } from 'nuxt/app';
import type { BaseStrapiResponse, EventCreateType, userAuthentificatedData, CollectionFilters, PartnerRegistration, RegisterParams, LoginParams, EventData, EventCategory, City, CurrentUser, AboutPlatform } from '@shared/api/types.ts';
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

export const requestEventsHostList = () => {
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

export const requestEventById = (id: string): Promise<AxiosResponse<{ data: EventData }>> => {
	const { $api } = useNuxtApp();
	const params = {
		populate: {

		eventHost: {
			populate: {
				contacts: true,
				socialMedias: true,
			},
		},
		eventBanner: {
			populate: '*',
		},

		eventContacts: {
			populate: '*',
		},

		eventCategory: {
			populate: '*',
		},

		eventMediaPhotos: {
			populate: '*',
		},

		eventSocialMedias: {
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

export const requestAffiliations = (): Promise<AxiosResponse<{ data: { name: string }[] }>> => {
	const { $api } = useNuxtApp();

	return $api.get('/api/affiliations');
};

export const requestMyUser  = (): Promise<AxiosResponse<{ data: CurrentUser }>> => {
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
		sort: {
			createdAt: 'desc',
		},
	};

	return $api.get('/api/events', { params });
};

export const requestEventsHost = (id: number | string): Promise<AxiosResponse<EventHost>> => {
	const { $api } = useNuxtApp();
	const params = {
		populate: {
			cultureType: true,
			eventHostAddress: {
				populate: {
					city: true,
				},
			},
			videoBusinessCard: {
				populate: '*',
			},
			socialMedias: {
				populate: '*',
			},
			mainBanner: {
				populate: '*',
			},
			compVideoFile: {
				populate: '*',
			},
			mostPopularProduct: {
				populate: '*',
			},
			productDescriptionFile: {
				populate: '*',
			},
			galleryImages: {
				populate: '*',
			},
			contacts: {
				populate: '*',
			},
		},
	};

	return $api.get(`/api/partners/${id}`, { params });
};

export const editEventHost = (id: number | string, params: PartnerRegistration): Promise<AxiosResponse<EventHost>> => {
	const { $api } = useNuxtApp();

	return $api.put(`/api/partners/${id}`, params, { headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${localStorage.getItem('AuthToken')}` } } );
};

export const editEvent = (id: number | string, params: FormData): Promise<AxiosResponse<EventHost>> => {
	const { $api } = useNuxtApp();

	return $api.put(`/api/events/${id}`, params, { headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${localStorage.getItem('AuthToken')}` } } );
};

export const deleteMedia = (id: number | string): Promise<AxiosResponse<any>> => {
	const { $api } = useNuxtApp();

	return $api.delete(`/api/upload/files/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('AuthToken')}` } } );
};

export const requestDataAboutPlatform = (): Promise<AxiosResponse<{ data: BaseStrapiResponse<AboutPlatform> }>> => {
	const { $api } = useNuxtApp();
	const params = {
		populate: '*',
	};

	return $api.get('/api/cultural-portal-cusco', { params });
};
