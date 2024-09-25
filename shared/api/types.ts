export type PartnerRegistration = {
	data: {
		orgType: string;
		commercialName: string;
		compName: string;
		ruc: string;
		startDate: string;
		personCount: number | null;
		middleAge: number | null;
		womenPercentage: number | null;
		orgResume: string;
		cultureType: string[];
		orgWorkType: string;
		orgLocation: string;
		productDescriptionLink: string;
		productDescriptionText: string;
		compVideoLink: string;
		socialMedias: {
			telegram: string;
			twitter: string;
			faceBook: string;
			instagram: string;
			youTube: string;
			linkedIn: string;
		};
		digitalCatalog: string;
		productCategories: { categoryId: string, title: string }[];
		contacts: {
			place: string;
			tel: string;
			mail: string;
		};
	};
	files: {
		videoBusinessCard: File[] | null;
		mainBanner: File[] | null;
		compVideoFile: File[] | null;
		mostPopularProduct: File[] | null;
		productDescriptionFile: File | null;
		galleryImages: File[] | null;
	};
};

export type RequestOption = {
	id: number;
	attributes: {
		item_title: string;
		item_UID: string;
		item_value: string;
		createdAt: string;
		updatedAt: string;
		publishedAt: string;
		locale: string;
	};
};
