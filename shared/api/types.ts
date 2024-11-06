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
		user: number | null;
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
export type Event = {
	id: number,
	attributes: {
			eventDigitalCatalog?: string,
			eventWebSite?: string,
			eventName: string,
			eventHost: EventHost
			eventDescription: string,
			eventCategory:{
				data: {
					attributes: {
						eventCategoryName: string
					}
				}[] },
			eventId: string,
			eventDate: string,
			createdAt: string,
			updatedAt: string,
			publishedAt: string,
			locale: string,
			linkToBuyTicket: string,
			eventShortDescription: string,
			eventDuration: string | null,
			eventRules: string | null,
			eventAgeRestrictions: string | null,
			socialMedias: SocialMedia[]
			eventAddress: {
					id: number,
					address: string,
					eventCoordinates: string,
					city: {
							data: City
					}
			}
			eventBanner: {
					data: StrapiMediaDefaultType
			}
			eventMediaPhotos: {
				data: StrapiMediaDefaultType[]
			}
			eventMediaVideos: {
					data: StrapiMediaDefaultType[]
			}
	}
};

export type City = {
	id: number,
	attributes: {
			cityName: string,
			cityCode: string,
			createdAt: string,
			updatedAt: string,
			publishedAt: string,
			locale: string,
	}
};

export type EventColletion = {
	id: 1,
	attributes: {
			collectionName: string,
			createdAt: string,
			updatedAt: string,
			publishedAt: string,
			collectionCode: string,
			collectionDescription: string,
			events: {
				data: Event[]
			}
	}
};

export type StrapiMediaDefaultType =	{
				id: number,
				attributes: {
						name: string,
						alternativeText: string | null,
						caption: string | null,
						width: number,
						height: number,
						formats: {
								large: StrapiMediaFormat,
								small: StrapiMediaFormat,
								medium: StrapiMediaFormat,
								thumbnail: StrapiMediaFormat,
						},
						hash: string,
						ext: string,
						mime: string,
						size: number,
						url: string,
						previewUrl: string | null,
						provider: string,
						provider_metadata: string | null,
						createdAt: string,
						updatedAt: string,
						related: any[]
					}
};

type StrapiMediaFormat = {
	ext: string,
	url: string,
	hash: string,
	mime: string,
	name: string,
	path: string | null,
	size: number,
	width: number,
	height: number,
	sizeInBytes: number
};

export type CollectionFilters = {
	type: {
		$eq: typeof CollectionTypes[keyof typeof CollectionTypes]
	};
	events: {
		eventDate: {
			$eq?: Date;
			$gte?: Date;
		};
		eventAddress?: {
			city: {
				cityCode: {
					$in: string[];
				};
			};
		};
		eventHost?: {
			eventHostCode: {
				$in: string[];
			};
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
			ruc: string
			videoBusinessCard: {
				data: StrapiMediaDefaultType[]
			}
			mainBanner: {
				data: StrapiMediaDefaultType
			}
			compVideoFile: {
				data: StrapiMediaDefaultType
			}
			mostPopularProduct: {
				data: StrapiMediaDefaultType
			}
			digitalCatalog: string
			productDescriptionFile: {
				data: StrapiMediaDefaultType
			}
			galleryImages: {
				data: StrapiMediaDefaultType[]
			}
			contacts: {
						id: number
						place: string
						tel: string
						mail: string
					}
			productDescriptionText: string
			productDescriptionLink: string
			compVideoLink: string
			startDate: Date
			personCount: number
			middleAge: number
			womenPercentage: number
			orgWorkType: string
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
			orgLocation: {
				data: City[]
		}
		events: {
			data: Event[]
		}
		orgType: string
		eventHostCode: string
		createdAt: string
		updatedAt: string
		publishedAt: string
		locale: string
		}
	}
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

export type userAuthentificatedData = {
	jwt: string;
	user: {
		blocked: boolean
		confirmed: true
		createdAt: Date
		email: string
		id: number
		provider: string
		updatedAt: Date
		username: string
	}
};

