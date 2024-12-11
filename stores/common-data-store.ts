import { defineStore, setActivePinia, createPinia } from 'pinia';
import { requestCities, requestAffiliations , requestCategories, requestOrganisationTypes, requestDataAboutPlatform } from '@shared/api';
import type { CommonDataStore } from './types';
import type { City, Affiliation, CultureType } from '@shared/api/types';

const pinia = createPinia();

export default { store: setActivePinia(pinia) };

export const useCommonDataStore = defineStore('commonData', {
	state: (): CommonDataStore => ({
		cities: [],
		affiliations: [],
		cultureTypes: [],
		orgTypes: [],
		platformData: null,
	}),
	getters: {
		getCityOptions: (state) => {
			return state.cities.map((city: City) => ({
				id: city.id,
				value: city.attributes.cityName,
				label: city.attributes.cityName,
			}));
		},

		getOrgTypesOptions: (state) => {
			return state.orgTypes.map((orgType) => ({
				id: orgType.id,
				value: orgType.attributes.orgTypeName,
				label: orgType.attributes.orgTypeName,
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
				return Promise.reject('No se pudo obtener la lista de ciudades');
			}
		},

		async getAffiliations() {

				try {
					 this.affiliations = (await requestAffiliations()).data.data;
				} catch (error) {
					 return Promise.reject('No se pudo obtener la lista de afiliaciones');
				}

		},

		async getCultureTypes() {
			try {
				this.cultureTypes = (await requestCategories()).data.data;
			} catch (error) {
				return Promise.reject('No se pudo obtener la lista de areas de culturas');
			}
		},

		async getOrganisationTypes() {
			try {
				this.orgTypes = (await requestOrganisationTypes()).data.data;
			} catch (error) {
				return Promise.reject('No se pudo obtener la lista de tipos de organizaciones');
			}
		},

		async getInfoAboutPlatform() {
			try {
					const { data } = await requestDataAboutPlatform();
					this.platformData = data.data;

			} catch (e) {
				return Promise.reject('Error al obtener la información de la página');
			}
		},
		getAllData() {
			return Promise.allSettled([ this.getInfoAboutPlatform(),
				 this.getCities(),
				 this.getAffiliations(),
				 this.getCultureTypes(),
				 this.getOrganisationTypes(),
				]);
	},
},
});
