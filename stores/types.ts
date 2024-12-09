import type { Affiliation, City, CultureType, OrgType, MyUser } from '@shared/api/types';
export type CommonDataStore = {
	cities: City[];
	affiliations: Affiliation[];
	cultureTypes: CultureType[];
	orgTypes: OrgType[]
};

export type UserStore = {
	user: MyUser | null;
	isAuth: boolean;
};
