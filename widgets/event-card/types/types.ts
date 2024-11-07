import type { EventData, StrapiMediaDefaultType } from '@shared/api/types';
export type EventCard = {
	id: number
	attributes: Pick<
			EventData['attributes'],
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
