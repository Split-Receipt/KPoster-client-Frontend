import axios from 'axios';
import qs from 'qs';

export default defineNuxtPlugin((nuxtApp) => {
	const config = useRuntimeConfig();
	const requestLibOptions = {
		baseURL: config.public.apiBaseUrl as string,
		paramsSerializer: (params: Record<string, any>) => {
			return qs.stringify(params, { encodeValuesOnly: true });
		},
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
