import axios, { type AxiosInstance } from 'axios';

export default defineNuxtPlugin((nuxtApp) => {
	const config = useRuntimeConfig();
	const requestLibOptions = {
		baseURL: config.public.apiBaseUrl as string,
		headers: {
			Accept: 'application/json',
			'Content-type': 'application/json',
		},
	};

	const requestLibInstance = axios.create(requestLibOptions);

	return {
		provide: {
			api: requestLibInstance,
		},
	};
});
