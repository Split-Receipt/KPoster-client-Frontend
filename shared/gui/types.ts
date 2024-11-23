export type CheckOption = {
	id: string | number;
	value: string;
	label?: string;
};

export type CpMediaCardProps = {
	isMediaDeleted?: boolean | null;
	editMode?: boolean;
	type?: 'image' | 'video';
	item: {
		id: string | number;
		source: string;
	};
};
