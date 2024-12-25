export type PartnerRegistration = {
	data: {
		orgType: number | null;
		webpage: string;
		eventHostAddress: Address<number>;
		commercialName: string;
		compName: string;
		ruc: string;
		startDate: Date | string;
		personCount: number | null;
		middleAge: number | null;
		womenPercentage: number | null;
		orgResume: string;
		cultureType: number[];
		orgWorkType: string;
		personalName: string;
		personalIdentifyingDocument: string;
		productDescriptionLink: string;
		productDescriptionText: string;
		compVideoLink: string;
		user: number | null;
		affiliations: number[];
		socialMedias: SocialMedia[];
		digitalCatalog: string;
		contacts: Contacts;
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
	data: {
		eventName: string;
		eventStartDate: Date | string;
		eventDescription: string;
		eventCategory: number[];
		eventEndDate: Date | string;
		eventHost: number | string;
		eventDuration: string;
		eventDigitalCatalog: string;
		eventWebSite: string;
		eventSocialMedias: { socialMediaName: string; socialMediaLink: string }[];
		eventAddress: {
			coordinates: string;
			city: number | null;
			address: string;
		}
		linkToBuyTicket: string;
		eventShortDescription: string;
		eventRules: string;
		eventAgeRestrictions: string;
		eventContacts: Contacts;
	}
	files: {
		eventBanner: File | null | File[];
		eventMediaPhotos: File[] | null;
		eventMediaVideos: File[] | null;
	}
};

export type EventCategory = {
	id: number;
	attributes: {
		eventCategoryName: string
		eventCategoryCode: string
		createdAt: string
		updatedAt: string
		publishedAt: string
		locale: string
	}
};
export type EventData = {
	id: number;
	attributes: {
			eventDigitalCatalog?: string;
			eventWebSite?: string;
			eventName: string;
			eventHost: EventHost
			eventDescription: string;
			eventCategory:{
				data: EventCategory[] };
			eventId: string;
			eventEndDate: string;
			eventStartDate: string;
			createdAt: string;
			updatedAt: string;
			publishedAt: string;
			locale: string;
			linkToBuyTicket: string;
			eventShortDescription: string;
			eventDuration: string | null;
			eventRules: string | null;
			eventAgeRestrictions: string | null;
			eventSocialMedias: SocialMedia[]
			eventAddress: {
					id: number;
					address: string;
					coordinates: string;
					city: {
							data: City
					}
			}
			eventBanner: {
					data: StrapiMediaDefaultType
			}
			eventContacts: { id: number } & Contacts
			eventMediaPhotos: {
				data: StrapiMediaDefaultType[]
			}
			eventMediaVideos: {
					data: StrapiMediaDefaultType[]
			}
		}
	};

export type City = {
	id: number;
	attributes: {
		cityName: string;
		cityCode: string;
		createdAt: string;
		updatedAt: string;
		publishedAt: string;
		locale: string;
	}
};

export type EventColletion = {
	id: 1;
	attributes: {
		collectionName: string;
		createdAt: string;
		updatedAt: string;
		publishedAt: string;
		collectionCode: string;
		collectionDescription: string;
		events: {
			data: EventData[]
		}
	}
};

export type StrapiMediaDefaultType = {
	id: number;
	attributes: {
		name: string;
		alternativeText: string | null;
		caption: string | null;
		width: number;
		height: number;
		formats: {
			large: StrapiMediaFormat;
			small: StrapiMediaFormat;
			medium: StrapiMediaFormat;
			thumbnail: StrapiMediaFormat;
		};
		hash: string;
		ext: string;
		mime: string;
		size: number;
		url: string;
		previewUrl: string | null;
		provider: string;
		provider_metadata: string | null;
		createdAt: string;
		updatedAt: string;
		related: any[]
	}
};

type StrapiMediaFormat = {
	ext: string;
	url: string;
	hash: string;
	mime: string;
	name: string;
	path: string | null;
	size: number;
	width: number;
	height: number;
	sizeInBytes: number
};

export type CollectionFilters = {
	type?: {
		$eq: typeof CollectionTypes[keyof typeof CollectionTypes]
	};
	events: {
		eventEndDate?: {
			$eq?: Date;
			$gte?: Date;
			$lte?: Date;
		};
		eventStartDate?: {
			$eq?: Date;
			$gte?: Date;
			$lte?: Date;
		}
		eventAddress?: {
			city: {
				cityCode: {
					$in: string[];
				};
			};
		};
		eventHost?: {
			eventHostCode?: {
				$in?: string[];
			};
			commercialName?: {
				$eq?: string;
				$in?: string[]
			}
		};
		eventCategory?: {
			eventCategoryCode: {
				$in: string[];
			};
		};
	};
};

export type SocialMedia = {
	socialMediaName: string;
	socialMediaLink: string;
};

export enum CollectionTypes {
	forMainPage = 'Para principal',
	forSinglePages = 'Para páginas individuales'
}

export type EventHost = {
	data: {
		attributes: {
			commercialName: string
			compName: string
			webpage: string
			ruc: string
			videoBusinessCard: {
				data: StrapiMediaDefaultType[]
			}
			mainBanner: {
				data: StrapiMediaDefaultType[]
			}
			compVideoFile: {
				data: StrapiMediaDefaultType[]
			}
			mostPopularProduct: {
				data: StrapiMediaDefaultType[]
			}
			digitalCatalog: string
			productDescriptionFile: {
				data: StrapiMediaDefaultType[]
			}
			galleryImages: {
				data: StrapiMediaDefaultType[]
			}
			contacts: Contacts;
			productDescriptionText: string
			productDescriptionLink: string
			compVideoLink: string
			startDate: Date
			personCount: number
			middleAge: number
			womenPercentage: number
			orgWorkType: string
			cultureType: {
				data: CultureType[]
			}
			socialMedias?: SocialMedia[]
			personalName: string
			personalIdentifyingDocument: string
			personalDocumentScan: {
				data: StrapiMediaDefaultType
			}
			orgResume: string
			affiliations: {
				data: {
					attributes: {
						affiliationName: string
					}
				}[]
			}
			areas_de_la_cultura: {
				data: {
					attributes: {
						cultureTypeName: string
					}
				}[]
			}
		eventHostAddress: Address<{ data: City }>;
		events: {
			data: EventData[]
		}
		orgType: {
			data: OrgType
		}
		eventHostCode: string
		createdAt: string
		updatedAt: string
		publishedAt: string
		locale: string
		};
		id: number
	};
};

export type RegisterParams = {
	username: string;
	email: string;
	password: string;
};

export type LoginParams = {
	identifier: string;
	password: string;
};

export type LoginData = {
	jwt: string;
	user: MyUser;
};

export type MyUser = {
	blocked: boolean
	confirmed: true
	createdAt: Date
	email: string
	id: number
	provider: string
	updatedAt: Date
	username: string
	role: UserRole
	eventHostData?: { id: EventHost['data']['id'] }
};

export type UserRole = {
	id: number;
	type: UserRolesTypes;
	name: UserRolesNames
	description: string
	createdAt: Date
	updatedAt: Date
};

export enum UserRolesTypes {
	eventHost = 'organizador_de_eventos',
	client = 'cliente',
	authenticated = 'authenticated'
}

export enum UserRolesNames {
	eventHost = 'Organizador de eventos',
	client = 'Cliente'
}

export type partnerPersonalFormDataType = {
	cultureType: number[];
	resume: string;
	videoLink: string;
	selfInfo: string;
	socials: {
		telegram: string;
		facebook: string;
		youtube: string;
		twitter: string;
		instagram: string;
		linkedin: string;
	};
	contacts: Contacts;
	files: {
		image: File | null;
		video: File | null;
		mediaContent: {
			picture: File | null;
			video: File | null;
		}
	};
};

	type Address<T> = {
			coordinates: string;
			city: T | null;
			address: string;
		};

export type CultureType = {
		id: number;
		attributes: {
			cultureTypeName: string;
			createdAt: string;
			updatedAt: string;
			publishedAt: string;
			locale: string;
			cultureTypeCode: string
		}
	};

export type Contacts = {
		place: string;
		tel: string;
		mail: string;
	};

export type AboutPlatform = {
		aboutUs: {
			aboutUsText: string;
		};
		culturalPortalContacts: CulturalPortalContacts[];
		platformContacts: { id: number } & Contacts;
		platformSocialMedias: ({ id: number } & SocialMedia)[]
};

export type CulturalPortalContacts = {
	id: number;
	contactName: string;
	contactSocialMedias?: SocialMedia[];
	contacts: Contacts;
};

export type BaseStrapiResponse<T> = {
	id: number;
	attributes: T;
};

export type Affiliation = {
	id: number;
	attributes: {
		affiliationName: string;
		createdAt: string;
		updatedAt: string;
		publishedAt: string;
		locale: string;
		affiliationCode: string
	}
};

export type OrgType = {
	id: number;
	attributes: {
		orgTypeName: string;
		createdAt: string;
		updatedAt: string;
		publishedAt: string;
		locale: string;
		orgTypeCode: string
	}
};

export type NewsOne = BaseStrapiResponse<
	 {
		title: string;
		newsText: string;
		newsMedia: {
			data: StrapiMediaDefaultType[]
		}
		createdAt: string;
		updatedAt: string;
		newsMainBanner: {
			data: StrapiMediaDefaultType
		}
		publishedAt: string;
		locale: string
	}>;

	export type RequestResetPasswordPayload = {
		email: string;
	};

export type ResetPasswordPayload = {
	password: string;
	passwordConfirmation: string;
	code: string;
};
