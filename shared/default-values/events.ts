import type { Event } from '@shared/api/types';

export const EventDefaultValue: Event = {
  id: 12,
  attributes: {
		eventDigitalCatalog: '#',
		eventWebSite: '#',
		eventHost: {
			data: {
				attributes: {
					commercialName: 'Event Host',
				 },
			},
		},
		eventCategory: {
			data: [{
				attributes: {
					eventCategoryName: 'Event Category',
				},
			}],
		},
    eventName: 'Event Name',
    eventDescription: 'Event Description',
    eventId: 'event-1',
    eventDate: '01/01/2024',
    createdAt: '2022-01-01T00:00:00.000Z',
    updatedAt: '2022-01-01T00:00:00.000Z',
    publishedAt: '2022-01-01T00:00:00.000Z',
    locale: 'en-US',
    linkToBuyTicket: '#',
    eventShortDescription: 'Event Short Description',
    eventDuration: '1',
    eventRules: 'Event Rules',
    eventAgeRestrictions: 'Event Age Restrictions',
		socialMedias: [
			{
				socialMediaName: 'twitter',
				socialMediaLink: 'http://twitter.com',
			},
		],
    eventAddress: {
      id: 12,
      address: 'Event Address',
      eventCoordinates: '-12.046016, -77.030554',
      city: {
        data: {
          id: 6,
          attributes: {
            cityName: 'City Name',
            cityCode: 'city-1',
            createdAt: '2022-01-01T00:00:00.000Z',
            updatedAt: '2022-01-01T00:00:00.000Z',
            publishedAt: '2022-01-01T00:00:00.000Z',
            locale: 'en-US',
          },
        },
      },
    },
    eventBanner: {
      data: {
        id: 12,
        attributes: {
          name: 'Event Banner',
          alternativeText: 'Alternative Text',
          caption: 'Caption',
          width: 123,
          height: 123,
          formats: {
            large: {
              ext: '.jpg',
              url: '#',
              hash: '#',
              mime: '#',
              name: 'media-name',
              path: '#',
              size: 123,
              width: 123,
              height: 123,
              sizeInBytes: 123,
            },
            small: {
              ext: '.jpg',
              url: '#',
              hash: '#',
              mime: '#',
              name: 'media-name',
              path: '#',
              size: 123,
              width: 123,
              height: 123,
              sizeInBytes: 123,
            },
            medium: {
              ext: '.jpg',
              url: '#',
              hash: '#',
              mime: '#',
              name: 'media-name',
              path: '#',
              size: 123,
              width: 123,
              height: 123,
              sizeInBytes: 123,
            },
            thumbnail: {
              ext: '.jpg',
              url: '#',
              hash: '#',
              mime: '#',
              name: 'media-name',
              path: '#',
              size: 123,
              width: 123,
              height: 123,
              sizeInBytes: 123,
            },
          },
          hash: '#',
          ext: '.jpg',
          mime: '#',
          size: 123,
          url: '#',
          previewUrl: '#',
          provider: '#',
          provider_metadata: '#',
          createdAt: '2022-01-01T00:00:00.000Z',
          updatedAt: '2022-01-01T00:00:00.000Z',
          related: [],
        },
      },
    },
    eventMediaPhotos: {
      data: [
        {
          id: 12,
          attributes: {
            name: 'Event Banner',
            alternativeText: 'Alternative Text',
            caption: 'Caption',
            width: 123,
            height: 123,
            formats: {
              large: {
                ext: '.jpg',
                url: '#',
                hash: '#',
                mime: '#',
                name: 'media-name',
                path: '#',
                size: 123,
                width: 123,
                height: 123,
                sizeInBytes: 123,
              },
              small: {
                ext: '.jpg',
                url: '#',
                hash: '#',
                mime: '#',
                name: 'media-name',
                path: '#',
                size: 123,
                width: 123,
                height: 123,
                sizeInBytes: 123,
              },
              medium: {
                ext: '.jpg',
                url: '#',
                hash: '#',
                mime: '#',
                name: 'media-name',
                path: '#',
                size: 123,
                width: 123,
                height: 123,
                sizeInBytes: 123,
              },
              thumbnail: {
                ext: '.jpg',
                url: '#',
                hash: '#',
                mime: '#',
                name: 'media-name',
                path: '#',
                size: 123,
                width: 123,
                height: 123,
                sizeInBytes: 123,
              },
            },
            hash: '#',
            ext: '.jpg',
            mime: '#',
            size: 123,
            url: '#',
            previewUrl: '#',
            provider: '#',
            provider_metadata: '#',
            createdAt: '2022-01-01T00:00:00.000Z',
            updatedAt: '2022-01-01T00:00:00.000Z',
            related: [],
          },
        },
      ],
    },
  },
};
