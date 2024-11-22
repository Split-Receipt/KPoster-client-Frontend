export type CheckOption = {
	id: string | number;
	value: string;
	label?: string;
};

export type CpMediaCardProps = {
	editMode?: boolean;
	type?: 'image' | 'video';
	item: {
		id: string | number;
		source: string;
	};
};
