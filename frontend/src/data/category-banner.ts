export interface CategoryBannerItem {
	name: string;
	href: string;
	image: {
		src: string;
		width: number;
		height: number;
		alt: string;
	};
	actionLabel: string;
	current?: boolean;
}

export const categoryBannerItems = [
	{
		name: 'Headphones',
		href: '/headphones/',
		image: {
			src: '/assets/shared/desktop/image-category-thumbnail-headphones.png',
			width: 438,
			height: 422,
			alt: '',
		},
		actionLabel: 'Shop',
	},
	{
		name: 'Speakers',
		href: '/speakers/',
		image: {
			src: '/assets/shared/desktop/image-category-thumbnail-speakers.png',
			width: 438,
			height: 408,
			alt: '',
		},
		actionLabel: 'Shop',
	},
	{
		name: 'Earphones',
		href: '/earphones/',
		image: {
			src: '/assets/shared/desktop/image-category-thumbnail-earphones.png',
			width: 438,
			height: 380,
			alt: '',
		},
		actionLabel: 'Shop',
	},
] as const satisfies readonly CategoryBannerItem[];
