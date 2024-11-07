export function formatExternalLink(link: string): string {
	if (!link.startsWith('http://') && !link.startsWith('https://')) {
		return 'https://' + link;
	}

	return link;
}

export function formatNameToBeCode(name: string): string {
	return name.toLowerCase().replace(/ /g, '-');
}
