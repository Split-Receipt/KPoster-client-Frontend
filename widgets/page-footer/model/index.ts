export type FooterLists = {
	generalInfo: FooterListType,
	contactsList: FooterListType,
	socialList: FooterListType
};
export type FooterListItem = {
	id: number,
	text: string,
	href?: string
	linkType?: string
};

export type FooterListType = {
	header: string,
	listItems: FooterListItem[]
};
export const footerLists: FooterLists = {
	generalInfo: {
		header: 'footer_title_addition_info',
		listItems: [
			{
				id: 1,
				text: 'about_us_title',
				href: '/about-us',
			},
			{
				id: 2,
				text: 'news',
				href: '/news',
			},
			{
				id: 3,
				text: 'contacts_title',
				href: '/contacts',
			},
		],
	},
	contactsList: {
		header: 'contacts_title',
		listItems: [
			{
				id: 1,
				text: '+ 99 9492 94929',
			},
			{
				id: 2,
				text: 'dirección dirección dirección ',
				href: '#',
			},
			{
				id: 3,
				text: 'persona jurídica',
			},
		],
	},
	socialList: {
		header: 'footer_title_our_socials',
		listItems: [
			{
				id: 1,
				text: 'facebook',
				href: '#',
			},
			{
				id: 2,
				text: 'tikTok',
				href: '#',
			},
			{
				id: 3,
				text: 'linkedIn',
				href: '#',
			},
		],
	},
};
