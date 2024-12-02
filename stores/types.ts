import type { Affiliation, City, CultureType, OrgType } from '@shared/api/types';
export type CommonDataStore = {
	cities: City[];
	affiliations: Affiliation[];
	cultureTypes: CultureType[];
	orgTypes: OrgType[]
};
