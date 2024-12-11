import type { BaseStrapiResponse,Affiliation, City, CultureType, OrgType, MyUser, AboutPlatform } from '@shared/api/types';
export type CommonDataStore = {
	cities: City[];
	affiliations: Affiliation[];
	cultureTypes: CultureType[];
	orgTypes: OrgType[]
	platformData: BaseStrapiResponse<AboutPlatform> | null
};

export type UserStore = {
	user: MyUser | null;
	isAuth: boolean;
};
