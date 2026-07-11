export interface SecondaryProductBannerImage {
	src: string;
	width: number;
	height: number;
}

export type SecondaryProductBannerHeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export interface SecondaryProductBannerContent {
	title: string;
	ctaLabel: string;
	ctaUrl: string;
	image: SecondaryProductBannerImage;
	tabletImage: SecondaryProductBannerImage;
	desktopImage: SecondaryProductBannerImage;
	imageAlt?: string;
	ctaAccessibleLabel?: string;
	headingLevel?: SecondaryProductBannerHeadingLevel;
}

export const secondaryProductBannerReference = {
	title: 'ZX7 Speaker',
	ctaLabel: 'See Product',
	ctaUrl: '/product-zx7-speaker/',
	image: {
		src: '/assets/home/mobile/image-speaker-zx7.jpg',
		width: 654,
		height: 640,
	},
	tabletImage: {
		src: '/assets/home/tablet/image-speaker-zx7.jpg',
		width: 689,
		height: 320,
	},
	desktopImage: {
		src: '/assets/home/desktop/image-speaker-zx7.jpg',
		width: 1110,
		height: 320,
	},
	imageAlt: '',
	ctaAccessibleLabel: 'See ZX7 Speaker product',
} as const satisfies SecondaryProductBannerContent;
