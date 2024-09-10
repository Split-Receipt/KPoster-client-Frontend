export type PartnerRegistration = {
	data: {
		orgType: string;
		commercialName: string;
		compName: string;
		ruc: string;
		orgLocation: string;
		productDescriptionLink: string;
		productDescriptionText: string;
		socialMedias: {
			telegram: string;
			twitter: string;
			faceBook: string;
			instagram: string;
			youTube: string;
			linkedIn: string;
		};
		digitalCatalog: string;
		productCategory: { id: string, title: string }[];
		// firstProdCategory: {
		// 	cat1_product1: string;
		// 	cat1_product2: string;
		// 	cat1_product3: string;
		// 	cat1_product4: string;
		// };
		// secondProdCategory: {
		// 	cat2_product1: string;
		// 	cat2_product2: string;
		// 	cat2_product3: string;
		// 	cat2_product4: string;
		// };
		contacts: {
			place: string;
			tel: string;
			mail: string;
		};
	};
	files: {
		videoBusinessCard: File | null;
		mainBanner: File | null;
		compVideo: File | string | null;
		mostPopularProduct: File | null;
		productDescriptionFile: File | null;
		galleryImages: File | null;
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
