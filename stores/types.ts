import type { Affiliation, City, CultureType } from '@shared/api/types';
export type CommonDataStore = {
	cities: City[];
	affiliations: Affiliation[];
	cultureTypes: CultureType[];
};
