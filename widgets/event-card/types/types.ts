import type { Event, StrapiMediaDefaultType } from '@shared/api/types';
export type EventCard = {
	id: number
	attributes: Pick<
			Event['attributes'],
			| 'linkToBuyTicket'
			| 'eventDate'
			| 'eventName'
			| 'eventShortDescription'
		> & {
			eventMediaPhotos: {
				data: Array<Pick<StrapiMediaDefaultType, 'id'> & {
					attributes: Pick<StrapiMediaDefaultType['attributes'], 'url'>
				}>
			}
		};
};
