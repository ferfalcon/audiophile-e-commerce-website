export interface FooterNavigationItem {
	label: string;
	href: string;
	current?: boolean;
}

export type FooterSocialIcon = 'facebook' | 'twitter' | 'instagram';

export interface FooterSocialLink {
	platform: string;
	href: string;
	icon: FooterSocialIcon;
}

export interface SiteFooterContent {
	logoHref: string;
	navigation: readonly FooterNavigationItem[];
	description: string;
	copyright: string;
	socialLinks: readonly FooterSocialLink[];
}

export const siteFooterContent = {
	logoHref: '/',
	navigation: [
		{ label: 'Home', href: '/' },
		{ label: 'Headphones', href: '/headphones/' },
		{ label: 'Speakers', href: '/speakers/' },
		{ label: 'Earphones', href: '/earphones/' },
	],
	description:
		"Audiophile is an all in one stop to fulfill your audio needs. We're a small team of music lovers and sound specialists who are devoted to helping you get the most out of personal audio. Come and visit our demo facility - we’re open 7 days a week.",
	copyright: 'Copyright 2021. All Rights Reserved',
	// Prototype fallbacks only. Replace these roots with approved Audiophile accounts
	// before integrating the footer into a real storefront page.
	socialLinks: [
		{
			platform: 'Facebook',
			href: 'https://www.facebook.com/',
			icon: 'facebook',
		},
		{
			platform: 'Twitter',
			href: 'https://twitter.com/',
			icon: 'twitter',
		},
		{
			platform: 'Instagram',
			href: 'https://www.instagram.com/',
			icon: 'instagram',
		},
	],
} as const satisfies SiteFooterContent;
