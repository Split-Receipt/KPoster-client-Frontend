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
		cultureType: { cultureTypeName: string }[];
		orgWorkType: string;
		orgLocation: string;
		personalName: string;
		personalIdentifyingDocument: string;
		productDescriptionLink: string;
		productDescriptionText: string;
		compVideoLink: string;
		affiliations: { affiliationId: string, affiliationName: string }[];
		socialMedias: {
			telegram: string;
			twitter: string;
			faceBook: string;
			instagram: string;
			youTube: string;
			linkedIn: string;
		};
		digitalCatalog: string;
		contacts: {
			place: string;
			tel: string;
			mail: string;
		};
	};
	files: {
		personalDocumentScan: File[] | null;
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

export type EventCreateType = {
	eventName: string;
	eventDescription: string;
	eventCategory: { categoryCode: string }[];
	eventDate: string;
	eventHost: string;
	eventDuration: string;
	eventSocialMedias: {
		telegram: string;
		youtube: string;
		instagram: string;
		facebook: string;
		twitter: string;
		linkedin: string;
	};
	eventAddress: {
		eventCoordinates: string;
		city: { cityCode: string }[];
		address: string;
	}
	linkToBuyTicket: string;
	eventShortDescription: string;
	eventRules: string;
	eventAgeRestrictions: string;
	eventContacts: {
		place: string;
		tel: string;
		mail: string;
	};
	files: {
		eventBanner: File | null;
		eventMediaPhotos: File[] | null;
		eventMediaVideo: File | null;
	}
};
