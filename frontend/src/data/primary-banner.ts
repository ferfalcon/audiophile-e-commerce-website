export interface PrimaryBannerImageAsset {
	src: string;
	width: number;
	height: number;
}

export interface PrimaryBannerProductImage extends PrimaryBannerImageAsset {
	sources?: {
		tablet?: PrimaryBannerImageAsset;
		desktop?: PrimaryBannerImageAsset;
	};
}

export interface PrimaryBannerContent {
	productName: string;
	supportingCopy: string;
	ctaLabel: string;
	ctaHref: string;
	productImage: PrimaryBannerProductImage;
	productImageAlt: string;
	ctaAriaLabel?: string;
}

export const primaryBannerReference = {
	productName: 'ZX9 Speaker',
	supportingCopy:
		'Upgrade to premium speakers that are phenomenally built to deliver truly remarkable sound.',
	ctaLabel: 'See Product',
	ctaHref: '/product-zx9-speaker/',
	ctaAriaLabel: 'See ZX9 Speaker product',
	productImage: {
		src: '/assets/home/mobile/image-speaker-zx9.png',
		width: 320,
		height: 388,
		sources: {
			tablet: {
				src: '/assets/home/tablet/image-speaker-zx9.png',
				width: 366,
				height: 444,
			},
			desktop: {
				src: '/assets/home/desktop/image-speaker-zx9.png',
				width: 756,
				height: 918,
			},
		},
	},
	productImageAlt: 'Black ZX9 speaker with a white horn and exposed woofer',
} as const satisfies PrimaryBannerContent;
