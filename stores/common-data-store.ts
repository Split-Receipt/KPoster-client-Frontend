import { defineStore, setActivePinia, createPinia } from 'pinia';
import { requestCities, requestAffiliations , requestCategories } from '@shared/api';
import type { CommonDataStore } from './types';
import type { City, Affiliation, CultureType } from '@shared/api/types';
import { get } from '@vueuse/core';

const pinia = createPinia();

export default { store: setActivePinia(pinia) };

export const useCommonDataStore = defineStore('commonData', {
	state: (): CommonDataStore => ({
		cities: [],
		affiliations: [],
		cultureTypes: [],
	}),
	getters: {
		getCityOptions: (state) => {
			return state.cities.map((city: City) => ({
				id: city.id,
				value: city.attributes.cityName,
				label: city.attributes.cityName,
			}));
		},

		getAffiliationsOptions: (state) => {
			return state.affiliations.map((affiliation: Affiliation)=> {
				return {
					id: affiliation.id,
					value: affiliation.attributes.affiliationName,
					label: affiliation.attributes.affiliationName,
				};
			});
		},

		getCultureTypesOptions: (state) => {
			return state.cultureTypes.map((cultureType: CultureType) => ({
				id: cultureType.id,
				value: cultureType.attributes.cultureTypeName,
				label: cultureType.attributes.cultureTypeName,
			}));
		},
	},
	actions: {
		async getCities() {
			try {
				this.cities = (await requestCities()).data.data;
			} catch (error) {
				throw new Error('No se pudo obtener la lista de ciudades');
			}
		},

		async getAffiliations() {

				try {
					 this.affiliations = (await requestAffiliations()).data.data;
				} catch (error) {
					 throw new Error('No se pudo obtener la lista de afiliaciones');
				}

		},

		async getCultureTypes() {
			try {
				this.cultureTypes = (await requestCategories()).data.data;
			} catch (error) {
				throw new Error('No se pudo obtener la lista de areas de culturas');
			}
		},
		getAllData() {
			return Promise.allSettled([this.getCities(), this.getAffiliations(), this.getCultureTypes()]);
	},
},
});
